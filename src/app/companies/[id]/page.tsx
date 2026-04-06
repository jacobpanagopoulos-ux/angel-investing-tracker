'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { CompanyAnalysis, Flag } from '@/lib/types';
import { verdictColors } from '@/lib/utils';
import StatusBadge from '@/components/status-badge';
import Link from 'next/link';

export default function CompanyDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [company, setCompany] = useState<CompanyAnalysis | null>(null);
  const [taggedFlagIds, setTaggedFlagIds] = useState<string[]>([]);
  const [allFlags, setAllFlags] = useState<Flag[]>([]);

  useEffect(() => {
    async function load() {
      const [c, cf, f] = await Promise.all([
        supabase.from('company_analyses').select('*').eq('id', id).single(),
        supabase.from('company_analysis_flags').select('flag_id').eq('company_analysis_id', id),
        supabase.from('flags').select('*').order('sort_order'),
      ]);
      setCompany(c.data);
      setTaggedFlagIds((cf.data || []).map((r: { flag_id: string }) => r.flag_id));
      setAllFlags(f.data || []);
    }
    load();
  }, [id]);

  if (!company) {
    return <div className="flex items-center justify-center h-64"><p style={{ color: 'var(--text-muted)' }}>Loading...</p></div>;
  }

  const taggedGreen = allFlags.filter(f => f.type === 'green' && taggedFlagIds.includes(f.id));
  const taggedRed = allFlags.filter(f => f.type === 'red' && taggedFlagIds.includes(f.id));

  return (
    <div className="max-w-3xl animate-in">
      <div className="mb-2">
        <Link href="/companies" className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Companies
        </Link>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">{company.company_name}</h1>
        <StatusBadge {...verdictColors[company.verdict]} />
        {company.vertical && (
          <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
            {company.vertical}
          </span>
        )}
      </div>

      <div className="card mb-4">
        <h3 className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Key Insight</h3>
        <p className="text-sm">{company.key_insight}</p>
      </div>

      {company.detailed_notes && (
        <div className="card mb-4">
          <h3 className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Detailed Notes</h3>
          <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>{company.detailed_notes}</p>
        </div>
      )}

      {(taggedGreen.length > 0 || taggedRed.length > 0) && (
        <div className="card">
          <h3 className="text-xs font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Tagged Flags</h3>
          <div className="flex flex-wrap gap-2">
            {taggedGreen.map(f => (
              <span key={f.id} className="text-xs px-2 py-1 rounded-md bg-emerald-900/40 text-emerald-400">
                {f.signal}
              </span>
            ))}
            {taggedRed.map(f => (
              <span key={f.id} className="text-xs px-2 py-1 rounded-md bg-red-900/40 text-red-400">
                {f.signal}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
        Analyzed on {company.date}
      </p>
    </div>
  );
}
