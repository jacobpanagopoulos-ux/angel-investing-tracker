'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { CompanyAnalysis, Flag, Verdict } from '@/lib/types';
import { verdictColors } from '@/lib/utils';
import StatusBadge from '@/components/status-badge';
import Link from 'next/link';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<CompanyAnalysis[]>([]);
  const [flags, setFlags] = useState<Flag[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    company_name: '',
    vertical: '',
    verdict: 'yellow' as Verdict,
    key_insight: '',
    detailed_notes: '',
    date: new Date().toISOString().split('T')[0],
    selectedFlags: [] as string[],
  });

  useEffect(() => {
    async function load() {
      const [c, f] = await Promise.all([
        supabase.from('company_analyses').select('*').order('date', { ascending: false }),
        supabase.from('flags').select('*').order('sort_order'),
      ]);
      setCompanies(c.data || []);
      setFlags(f.data || []);
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { data: company } = await supabase.from('company_analyses').insert({
      company_name: form.company_name,
      vertical: form.vertical || null,
      verdict: form.verdict,
      key_insight: form.key_insight,
      detailed_notes: form.detailed_notes || null,
      date: form.date,
    }).select().single();

    if (company && form.selectedFlags.length > 0) {
      await supabase.from('company_analysis_flags').insert(
        form.selectedFlags.map(flag_id => ({
          company_analysis_id: company.id,
          flag_id,
        }))
      );
    }

    if (company) {
      setCompanies(prev => [company, ...prev]);
    }
    setForm({
      company_name: '', vertical: '', verdict: 'yellow', key_insight: '',
      detailed_notes: '', date: new Date().toISOString().split('T')[0], selectedFlags: [],
    });
    setShowForm(false);
  }

  function toggleFlag(flagId: string) {
    setForm(prev => ({
      ...prev,
      selectedFlags: prev.selectedFlags.includes(flagId)
        ? prev.selectedFlags.filter(id => id !== flagId)
        : [...prev.selectedFlags, flagId],
    }));
  }

  const greenFlags = flags.filter(f => f.type === 'green');
  const redFlags = flags.filter(f => f.type === 'red');

  return (
    <div className="max-w-4xl animate-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Company Analysis</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Log AI companies you evaluate using the frameworks
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Analyze Company'}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Company Name</label>
              <input
                type="text"
                required
                value={form.company_name}
                onChange={e => setForm(p => ({ ...p, company_name: e.target.value }))}
                placeholder="e.g. Anthropic"
              />
            </div>
            <div>
              <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Vertical</label>
              <input
                type="text"
                value={form.vertical}
                onChange={e => setForm(p => ({ ...p, vertical: e.target.value }))}
                placeholder="e.g. Foundation Models"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Date</label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Verdict</label>
              <div className="flex gap-2 mt-1">
                {(['green', 'yellow', 'red'] as Verdict[]).map(v => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setForm(p => ({ ...p, verdict: v }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      form.verdict === v
                        ? `${verdictColors[v].bg} ${verdictColors[v].text} border-current`
                        : 'border-[var(--border)]'
                    }`}
                    style={form.verdict !== v ? { color: 'var(--text-muted)' } : undefined}
                  >
                    {verdictColors[v].label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Key Insight</label>
            <input
              type="text"
              required
              value={form.key_insight}
              onChange={e => setForm(p => ({ ...p, key_insight: e.target.value }))}
              placeholder="One-line takeaway"
            />
          </div>
          <div className="mb-4">
            <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Detailed Notes</label>
            <textarea
              value={form.detailed_notes}
              onChange={e => setForm(p => ({ ...p, detailed_notes: e.target.value }))}
              placeholder="Full analysis..."
              rows={4}
            />
          </div>

          {/* Flag Tagging */}
          <div className="mb-4">
            <label className="text-xs block mb-2" style={{ color: 'var(--text-secondary)' }}>Tag Flags</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs mb-1" style={{ color: 'var(--accent-emerald)' }}>Green Flags</p>
                <div className="flex flex-wrap gap-1.5">
                  {greenFlags.map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => toggleFlag(f.id)}
                      className={`text-xs px-2 py-1 rounded-md border transition-all ${
                        form.selectedFlags.includes(f.id)
                          ? 'bg-emerald-900/40 text-emerald-400 border-emerald-500/40'
                          : 'border-[var(--border)]'
                      }`}
                      style={!form.selectedFlags.includes(f.id) ? { color: 'var(--text-muted)' } : undefined}
                    >
                      {f.signal.length > 30 ? f.signal.slice(0, 30) + '...' : f.signal}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: 'var(--accent-red)' }}>Red Flags</p>
                <div className="flex flex-wrap gap-1.5">
                  {redFlags.map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => toggleFlag(f.id)}
                      className={`text-xs px-2 py-1 rounded-md border transition-all ${
                        form.selectedFlags.includes(f.id)
                          ? 'bg-red-900/40 text-red-400 border-red-500/40'
                          : 'border-[var(--border)]'
                      }`}
                      style={!form.selectedFlags.includes(f.id) ? { color: 'var(--text-muted)' } : undefined}
                    >
                      {f.signal.length > 30 ? f.signal.slice(0, 30) + '...' : f.signal}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Save Analysis</button>
        </form>
      )}

      {/* Company List */}
      {companies.length === 0 && !showForm ? (
        <div className="card text-center py-12">
          <p style={{ color: 'var(--text-muted)' }}>No companies analyzed yet.</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Click "Analyze Company" to log your first evaluation.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {companies.map(c => (
            <Link href={`/companies/${c.id}`} key={c.id}>
              <div className="card cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{c.company_name}</h3>
                    {c.vertical && (
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
                        {c.vertical}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{c.date}</span>
                    <StatusBadge {...verdictColors[c.verdict]} />
                  </div>
                </div>
                <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>{c.key_insight}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
