'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { WatchlistItem, OpportunityType, Thesis } from '@/lib/types';
import { opportunityTypeColors } from '@/lib/utils';
import StatusBadge from '@/components/status-badge';
import Link from 'next/link';

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [theses, setTheses] = useState<Thesis[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<OpportunityType | 'all'>('all');
  const [form, setForm] = useState({
    company_name: '',
    ticker: '',
    sector: '',
    opportunity_type: 'watch' as OpportunityType,
    why_watching: '',
    thesis_id: '',
    price_when_added: '',
  });

  useEffect(() => {
    async function load() {
      const [w, t] = await Promise.all([
        supabase.from('watchlist').select('*').order('created_at', { ascending: false }),
        supabase.from('theses').select('*').order('name'),
      ]);
      setItems(w.data || []);
      setTheses(t.data || []);
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { data } = await supabase.from('watchlist').insert({
      company_name: form.company_name,
      ticker: form.ticker || null,
      sector: form.sector || null,
      opportunity_type: form.opportunity_type,
      why_watching: form.why_watching || null,
      thesis_id: form.thesis_id || null,
      price_when_added: form.price_when_added || null,
    }).select().single();
    if (data) setItems(prev => [data, ...prev]);
    setForm({ company_name: '', ticker: '', sector: '', opportunity_type: 'watch', why_watching: '', thesis_id: '', price_when_added: '' });
    setShowForm(false);
  }

  async function removeItem(id: string) {
    setItems(prev => prev.filter(i => i.id !== id));
    await supabase.from('watchlist').delete().eq('id', id);
  }

  async function updateType(id: string, opportunity_type: OpportunityType) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, opportunity_type } : i));
    await supabase.from('watchlist').update({ opportunity_type }).eq('id', id);
  }

  const filtered = filter === 'all' ? items : items.filter(i => i.opportunity_type === filter);
  const sectors = [...new Set(items.map(i => i.sector).filter(Boolean))];

  return (
    <div className="max-w-5xl animate-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Watchlist</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Companies and opportunities you're tracking
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add to Watchlist'}
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(['all', 'invest', 'build', 'watch'] as const).map(f => {
          const isActive = filter === f;
          const activeClass = f !== 'all' && isActive
            ? `${opportunityTypeColors[f].bg} ${opportunityTypeColors[f].text} border-current`
            : isActive ? 'border-current' : 'border-[var(--border)]';
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${activeClass}`}
              style={!isActive ? { color: 'var(--text-muted)' } : f === 'all' ? { color: 'var(--text-primary)' } : undefined}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'all' ? ` (${items.length})` : ` (${items.filter(i => i.opportunity_type === f).length})`}
            </button>
          );
        })}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-6">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Company Name</label>
              <input type="text" required value={form.company_name} onChange={e => setForm(p => ({ ...p, company_name: e.target.value }))} placeholder="e.g. Constellation Energy" />
            </div>
            <div>
              <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Ticker</label>
              <input type="text" value={form.ticker} onChange={e => setForm(p => ({ ...p, ticker: e.target.value }))} placeholder="e.g. CEG" />
            </div>
            <div>
              <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Sector</label>
              <input type="text" value={form.sector} onChange={e => setForm(p => ({ ...p, sector: e.target.value }))} placeholder="e.g. Nuclear Power" list="sectors" />
              <datalist id="sectors">
                {sectors.map(s => <option key={s} value={s!} />)}
              </datalist>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Type</label>
              <select value={form.opportunity_type} onChange={e => setForm(p => ({ ...p, opportunity_type: e.target.value as OpportunityType }))}>
                <option value="invest">Invest (buy shares / angel)</option>
                <option value="build">Build (start this yourself)</option>
                <option value="watch">Watch (monitor for now)</option>
              </select>
            </div>
            <div>
              <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Link to Thesis</label>
              <select value={form.thesis_id} onChange={e => setForm(p => ({ ...p, thesis_id: e.target.value }))}>
                <option value="">None</option>
                {theses.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Price When Added</label>
              <input type="text" value={form.price_when_added} onChange={e => setForm(p => ({ ...p, price_when_added: e.target.value }))} placeholder="e.g. $245.00" />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Why are you watching this?</label>
            <textarea value={form.why_watching} onChange={e => setForm(p => ({ ...p, why_watching: e.target.value }))} placeholder="What makes this interesting? What signal would make you act?" rows={2} />
          </div>
          <button type="submit" className="btn btn-primary">Add to Watchlist</button>
        </form>
      )}

      {filtered.length === 0 ? (
        <div className="card text-center py-12">
          <p style={{ color: 'var(--text-muted)' }}>
            {filter === 'all' ? 'Watchlist is empty.' : `No ${filter} opportunities yet.`}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map(item => {
            const otc = opportunityTypeColors[item.opportunity_type];
            const linkedThesis = theses.find(t => t.id === item.thesis_id);
            return (
              <div key={item.id} className="card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-medium">{item.company_name}</h3>
                    {item.ticker && (
                      <span className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ background: 'var(--border)', color: 'var(--text-secondary)' }}>
                        {item.ticker}
                      </span>
                    )}
                    {item.sector && (
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
                        {item.sector}
                      </span>
                    )}
                    {linkedThesis && (
                      <Link href={`/theses/${linkedThesis.id}`} className="text-xs" style={{ color: 'var(--accent-blue)' }}>
                        {linkedThesis.name}
                      </Link>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {item.price_when_added && (
                      <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{item.price_when_added}</span>
                    )}
                    <select
                      value={item.opportunity_type}
                      onChange={e => updateType(item.id, e.target.value as OpportunityType)}
                      className={`text-xs px-2 py-1 rounded-full border-0 ${otc.bg} ${otc.text}`}
                    >
                      <option value="invest">Invest</option>
                      <option value="build">Build</option>
                      <option value="watch">Watch</option>
                    </select>
                    <button onClick={() => removeItem(item.id)} className="text-xs" style={{ color: 'var(--text-muted)' }}>x</button>
                  </div>
                </div>
                {item.why_watching && (
                  <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>{item.why_watching}</p>
                )}
                <span className="text-xs mt-1 block" style={{ color: 'var(--text-muted)' }}>Added {item.added_date}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

