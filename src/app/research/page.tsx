'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ResearchItem } from '@/lib/types';

export default function ResearchPage() {
  const [items, setItems] = useState<ResearchItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    source_name: '',
    source_type: '',
    why: '',
    priority: 'backlog' as 'priority' | 'backlog',
  });

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('research_queue').select('*').order('sort_order');
      setItems(data || []);
    }
    load();
  }, []);

  async function toggleComplete(id: string, currentValue: boolean) {
    const update = currentValue
      ? { is_complete: false, completed_at: null }
      : { is_complete: true, completed_at: new Date().toISOString() };
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...update } : i));
    await supabase.from('research_queue').update(update).eq('id', id);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const maxSort = Math.max(0, ...items.map(i => i.sort_order));
    const { data } = await supabase.from('research_queue').insert({
      source_name: form.source_name,
      source_type: form.source_type,
      why: form.why,
      priority: form.priority,
      sort_order: maxSort + 1,
    }).select().single();
    if (data) setItems(prev => [...prev, data]);
    setForm({ source_name: '', source_type: '', why: '', priority: 'backlog' });
    setShowForm(false);
  }

  const priorityItems = items.filter(i => i.priority === 'priority');
  const backlogItems = items.filter(i => i.priority === 'backlog');

  function renderSection(title: string, sectionItems: ResearchItem[]) {
    return (
      <div className="mb-8">
        <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>{title}</h2>
        <div className="flex flex-col gap-2">
          {sectionItems.map(item => (
            <div key={item.id} className="card flex items-start gap-4">
              <button
                onClick={() => toggleComplete(item.id, item.is_complete)}
                className="mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all"
                style={{
                  borderColor: item.is_complete ? 'var(--accent-emerald)' : 'var(--border)',
                  background: item.is_complete ? 'var(--accent-emerald)' : 'transparent',
                }}
              >
                {item.is_complete && <span className="text-xs text-black">&#10003;</span>}
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm font-medium ${item.is_complete ? 'line-through' : ''}`}
                    style={item.is_complete ? { color: 'var(--text-muted)' } : undefined}>
                    {item.source_name}
                  </h3>
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
                    {item.source_type}
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{item.why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl animate-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Research Queue</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Sources to study for angel investing skill acquisition
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Source'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Source Name</label>
              <input type="text" required value={form.source_name} onChange={e => setForm(p => ({ ...p, source_name: e.target.value }))} placeholder="e.g. Chamath (All-In Podcast)" />
            </div>
            <div>
              <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Type</label>
              <input type="text" required value={form.source_type} onChange={e => setForm(p => ({ ...p, source_type: e.target.value }))} placeholder="e.g. Podcast, Book, Blog" />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Why study this?</label>
            <input type="text" required value={form.why} onChange={e => setForm(p => ({ ...p, why: e.target.value }))} placeholder="What will you learn?" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <label className="text-xs" style={{ color: 'var(--text-secondary)' }}>Priority:</label>
            <select value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value as 'priority' | 'backlog' }))}>
              <option value="priority">Priority</option>
              <option value="backlog">Backlog</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Add to Queue</button>
        </form>
      )}

      {renderSection('Priority (Start Here)', priorityItems)}
      {renderSection('Backlog', backlogItems)}
    </div>
  );
}
