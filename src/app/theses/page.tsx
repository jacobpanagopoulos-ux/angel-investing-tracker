'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Thesis, ThesisStatus, ThesisCompany } from '@/lib/types';
import { thesisStatusColors } from '@/lib/utils';
import StatusBadge from '@/components/status-badge';
import Link from 'next/link';

export default function ThesesPage() {
  const [theses, setTheses] = useState<(Thesis & { companies: ThesisCompany[] })[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    sector: '',
    status: 'researching' as ThesisStatus,
    key_data_points: '',
  });

  useEffect(() => {
    async function load() {
      const { data: thesesData } = await supabase.from('theses').select('*').order('created_at', { ascending: false });
      if (!thesesData) return;

      const withCompanies = await Promise.all(
        thesesData.map(async (t: Thesis) => {
          const { data: companies } = await supabase.from('thesis_companies').select('*').eq('thesis_id', t.id);
          return { ...t, companies: companies || [] };
        })
      );
      setTheses(withCompanies);
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { data } = await supabase.from('theses').insert({
      name: form.name,
      description: form.description || null,
      sector: form.sector || null,
      status: form.status,
      key_data_points: form.key_data_points || null,
    }).select().single();
    if (data) setTheses(prev => [{ ...data, companies: [] }, ...prev]);
    setForm({ name: '', description: '', sector: '', status: 'researching', key_data_points: '' });
    setShowForm(false);
  }

  const grouped = {
    conviction: theses.filter(t => t.status === 'conviction'),
    researching: theses.filter(t => t.status === 'researching'),
    watching: theses.filter(t => t.status === 'watching'),
    passed: theses.filter(t => t.status === 'passed'),
  };

  return (
    <div className="max-w-5xl animate-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Investment Theses</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Macro bets with companies grouped under them
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Thesis'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Thesis Name</label>
              <input type="text" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Nuclear Baseload for AI" />
            </div>
            <div>
              <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Sector</label>
              <input type="text" value={form.sector} onChange={e => setForm(p => ({ ...p, sector: e.target.value }))} placeholder="e.g. Energy, Cooling, Infrastructure" />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Description</label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Why is this a macro bet? What's the bottleneck being solved?" rows={3} />
          </div>
          <div className="mb-4">
            <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Key Data Points</label>
            <textarea value={form.key_data_points} onChange={e => setForm(p => ({ ...p, key_data_points: e.target.value }))} placeholder="Numbers, facts, and evidence supporting this thesis..." rows={3} />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <label className="text-xs" style={{ color: 'var(--text-secondary)' }}>Status:</label>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as ThesisStatus }))}>
              <option value="researching">Researching</option>
              <option value="conviction">Conviction</option>
              <option value="watching">Watching</option>
              <option value="passed">Passed</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Save Thesis</button>
        </form>
      )}

      {theses.length === 0 && !showForm ? (
        <div className="card text-center py-12">
          <p style={{ color: 'var(--text-muted)' }}>No theses yet.</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Click "New Thesis" to track your first macro investment bet.
          </p>
        </div>
      ) : (
        <>
          {(['conviction', 'researching', 'watching', 'passed'] as ThesisStatus[]).map(status => {
            const items = grouped[status];
            if (items.length === 0) return null;
            const sc = thesisStatusColors[status];
            return (
              <div key={status} className="mb-8">
                <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${sc.bg}`} />
                  <span className={sc.text}>{sc.label}</span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>({items.length})</span>
                </h2>
                <div className="flex flex-col gap-3">
                  {items.map(thesis => (
                    <Link href={`/theses/${thesis.id}`} key={thesis.id}>
                      <div className="card cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-medium">{thesis.name}</h3>
                            {thesis.sector && (
                              <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
                                {thesis.sector}
                              </span>
                            )}
                          </div>
                          <StatusBadge {...sc} />
                        </div>
                        {thesis.description && (
                          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            {thesis.description.length > 120 ? thesis.description.slice(0, 120) + '...' : thesis.description}
                          </p>
                        )}
                        {thesis.companies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {thesis.companies.map(c => (
                              <span key={c.id} className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'var(--surface-2)', color: 'var(--text-secondary)' }}>
                                {c.ticker ? `${c.company_name} (${c.ticker})` : c.company_name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
