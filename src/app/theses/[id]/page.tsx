'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Thesis, ThesisStatus, ThesisCompany } from '@/lib/types';
import { thesisStatusColors } from '@/lib/utils';
import StatusBadge from '@/components/status-badge';
import Link from 'next/link';

export default function ThesisDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [thesis, setThesis] = useState<Thesis | null>(null);
  const [companies, setCompanies] = useState<ThesisCompany[]>([]);
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [companyForm, setCompanyForm] = useState({ company_name: '', ticker: '', role: '', notes: '' });

  useEffect(() => {
    async function load() {
      const [t, c] = await Promise.all([
        supabase.from('theses').select('*').eq('id', id).single(),
        supabase.from('thesis_companies').select('*').eq('thesis_id', id),
      ]);
      setThesis(t.data);
      setCompanies(c.data || []);
    }
    load();
  }, [id]);

  async function updateStatus(status: ThesisStatus) {
    if (!thesis) return;
    setThesis({ ...thesis, status });
    await supabase.from('theses').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
  }

  async function updateField(field: string, value: string) {
    if (!thesis) return;
    setThesis({ ...thesis, [field]: value });
    await supabase.from('theses').update({ [field]: value, updated_at: new Date().toISOString() }).eq('id', id);
  }

  async function addCompany(e: React.FormEvent) {
    e.preventDefault();
    const { data } = await supabase.from('thesis_companies').insert({
      thesis_id: id,
      company_name: companyForm.company_name,
      ticker: companyForm.ticker || null,
      role: companyForm.role || null,
      notes: companyForm.notes || null,
    }).select().single();
    if (data) setCompanies(prev => [...prev, data]);
    setCompanyForm({ company_name: '', ticker: '', role: '', notes: '' });
    setShowAddCompany(false);
  }

  async function removeCompany(companyId: string) {
    setCompanies(prev => prev.filter(c => c.id !== companyId));
    await supabase.from('thesis_companies').delete().eq('id', companyId);
  }

  if (!thesis) {
    return <div className="flex items-center justify-center h-64"><p style={{ color: 'var(--text-muted)' }}>Loading...</p></div>;
  }

  const sc = thesisStatusColors[thesis.status];

  return (
    <div className="max-w-4xl animate-in">
      <div className="mb-2">
        <Link href="/theses" className="text-xs" style={{ color: 'var(--text-muted)' }}>Theses</Link>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">{thesis.name}</h1>
        <select
          value={thesis.status}
          onChange={e => updateStatus(e.target.value as ThesisStatus)}
          className={`text-xs px-2 py-1 rounded-full border-0 ${sc.bg} ${sc.text}`}
        >
          <option value="researching">Researching</option>
          <option value="conviction">Conviction</option>
          <option value="watching">Watching</option>
          <option value="passed">Passed</option>
        </select>
        {thesis.sector && (
          <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
            {thesis.sector}
          </span>
        )}
      </div>

      {/* Description */}
      <div className="card mb-4">
        <h3 className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Description</h3>
        <textarea
          value={thesis.description || ''}
          onChange={e => updateField('description', e.target.value)}
          placeholder="Why is this a macro bet?"
          rows={3}
          className="text-sm"
        />
      </div>

      {/* Key Data Points */}
      <div className="card mb-4">
        <h3 className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Key Data Points</h3>
        <textarea
          value={thesis.key_data_points || ''}
          onChange={e => updateField('key_data_points', e.target.value)}
          placeholder="Numbers, facts, evidence..."
          rows={4}
          className="text-sm"
        />
      </div>

      {/* Companies */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Companies in This Thesis</h3>
          <button className="btn text-xs" onClick={() => setShowAddCompany(!showAddCompany)}>
            {showAddCompany ? 'Cancel' : '+ Add Company'}
          </button>
        </div>

        {showAddCompany && (
          <form onSubmit={addCompany} className="mb-4 p-4 rounded-lg" style={{ background: 'var(--surface-2)' }}>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <label className="text-xs block mb-1" style={{ color: 'var(--text-muted)' }}>Company</label>
                <input type="text" required value={companyForm.company_name} onChange={e => setCompanyForm(p => ({ ...p, company_name: e.target.value }))} placeholder="e.g. Constellation Energy" />
              </div>
              <div>
                <label className="text-xs block mb-1" style={{ color: 'var(--text-muted)' }}>Ticker</label>
                <input type="text" value={companyForm.ticker} onChange={e => setCompanyForm(p => ({ ...p, ticker: e.target.value }))} placeholder="e.g. CEG" />
              </div>
              <div>
                <label className="text-xs block mb-1" style={{ color: 'var(--text-muted)' }}>Role</label>
                <input type="text" value={companyForm.role} onChange={e => setCompanyForm(p => ({ ...p, role: e.target.value }))} placeholder="e.g. Key player, Emerging" />
              </div>
            </div>
            <div className="mb-3">
              <label className="text-xs block mb-1" style={{ color: 'var(--text-muted)' }}>Notes</label>
              <input type="text" value={companyForm.notes} onChange={e => setCompanyForm(p => ({ ...p, notes: e.target.value }))} placeholder="Why this company fits the thesis" />
            </div>
            <button type="submit" className="btn btn-primary text-xs">Add</button>
          </form>
        )}

        {companies.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No companies linked yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {companies.map(c => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--surface-2)' }}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{c.company_name}</span>
                    {c.ticker && (
                      <span className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ background: 'var(--border)', color: 'var(--text-secondary)' }}>
                        {c.ticker}
                      </span>
                    )}
                    {c.role && (
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{c.role}</span>
                    )}
                  </div>
                  {c.notes && <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{c.notes}</p>}
                </div>
                <button onClick={() => removeCompany(c.id)} className="text-xs px-2 py-1 rounded" style={{ color: 'var(--accent-red)' }}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
