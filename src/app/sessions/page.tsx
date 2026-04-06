'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { SessionEntry, Pillar } from '@/lib/types';
import { pillarTextColors } from '@/lib/utils';

export default function SessionsPage() {
  const [sessions, setSessions] = useState<SessionEntry[]>([]);
  const [pillars, setPillars] = useState<Pillar[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    what_studied: '',
    key_insight: '',
    pillar_id: '' as string,
  });

  useEffect(() => {
    async function load() {
      const [s, p] = await Promise.all([
        supabase.from('session_log').select('*').order('date', { ascending: false }),
        supabase.from('pillars').select('*').order('sort_order'),
      ]);
      setSessions(s.data || []);
      setPillars(p.data || []);
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { data } = await supabase.from('session_log').insert({
      date: form.date,
      what_studied: form.what_studied,
      key_insight: form.key_insight,
      pillar_id: form.pillar_id ? Number(form.pillar_id) : null,
    }).select().single();
    if (data) setSessions(prev => [data, ...prev]);
    setForm({ date: new Date().toISOString().split('T')[0], what_studied: '', key_insight: '', pillar_id: '' });
    setShowForm(false);
  }

  function getPillarName(pillarId: number | null) {
    if (!pillarId) return 'All';
    return pillars.find(p => p.id === pillarId)?.name || 'Unknown';
  }

  function getPillarColor(pillarId: number | null) {
    if (!pillarId) return '';
    return pillarTextColors[pillarId] || '';
  }

  return (
    <div className="max-w-4xl animate-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Session Log</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Track research sessions and key insights
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Log Session'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Date</label>
              <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Pillar</label>
              <select value={form.pillar_id} onChange={e => setForm(p => ({ ...p, pillar_id: e.target.value }))}>
                <option value="">All / General</option>
                {pillars.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>What was studied</label>
            <input type="text" required value={form.what_studied} onChange={e => setForm(p => ({ ...p, what_studied: e.target.value }))} placeholder="e.g. Chamath on AI company evaluation" />
          </div>
          <div className="mb-4">
            <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Key Insight</label>
            <textarea required value={form.key_insight} onChange={e => setForm(p => ({ ...p, key_insight: e.target.value }))} placeholder="What was the most important takeaway?" rows={3} />
          </div>
          <button type="submit" className="btn btn-primary">Log Session</button>
        </form>
      )}

      {sessions.length === 0 ? (
        <div className="card text-center py-12">
          <p style={{ color: 'var(--text-muted)' }}>No sessions logged yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sessions.map(s => (
            <div key={s.id} className="card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.date}</span>
                  <span className={`text-xs font-medium ${getPillarColor(s.pillar_id)}`}>
                    {getPillarName(s.pillar_id)}
                  </span>
                </div>
              </div>
              <h3 className="text-sm font-medium">{s.what_studied}</h3>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{s.key_insight}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
