'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Pillar, Concept, ConceptStatus } from '@/lib/types';
import { statusColors, pillarTextColors, pillarColors, calculateProgress } from '@/lib/utils';
import ProgressRing from '@/components/progress-ring';
import Link from 'next/link';

export default function PillarDetailPage() {
  const params = useParams();
  const pillarId = Number(params.pillarId);
  const [pillar, setPillar] = useState<Pillar | null>(null);
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const [p, c] = await Promise.all([
        supabase.from('pillars').select('*').eq('id', pillarId).single(),
        supabase.from('concepts').select('*').eq('pillar_id', pillarId).order('sort_order'),
      ]);
      setPillar(p.data);
      setConcepts(c.data || []);
    }
    load();
  }, [pillarId]);

  async function updateStatus(id: string, status: ConceptStatus) {
    setConcepts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    await supabase.from('concepts').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
  }

  async function updateNotes(id: string, notes: string) {
    setConcepts(prev => prev.map(c => c.id === id ? { ...c, notes } : c));
    await supabase.from('concepts').update({ notes, updated_at: new Date().toISOString() }).eq('id', id);
  }

  if (!pillar) {
    return <div className="flex items-center justify-center h-64"><p style={{ color: 'var(--text-muted)' }}>Loading...</p></div>;
  }

  const progress = calculateProgress(concepts, ['practiced', 'mastered']);

  return (
    <div className="max-w-4xl animate-in">
      <div className="mb-2">
        <Link href="/pillars" className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Pillars
        </Link>
      </div>
      <div className="flex items-center gap-6 mb-8">
        <ProgressRing progress={progress} color={pillarColors[pillarId]} size={80} strokeWidth={5} />
        <div>
          <h1 className={`text-2xl font-bold ${pillarTextColors[pillarId]}`}>{pillar.name}</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{pillar.subtitle}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {concepts.map(concept => {
          const sc = statusColors[concept.status];
          const isExpanded = expandedId === concept.id;
          return (
            <div key={concept.id} className="card">
              <div className="flex items-start justify-between gap-4">
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : concept.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                      {concept.number}.
                    </span>
                    <h3 className="text-sm font-medium">{concept.title}</h3>
                  </div>
                  {concept.notes && !isExpanded && (
                    <p className="text-xs mt-1.5 ml-7" style={{ color: 'var(--text-muted)' }}>
                      {concept.notes.length > 80 ? concept.notes.slice(0, 80) + '...' : concept.notes}
                    </p>
                  )}
                </div>
                <select
                  value={concept.status}
                  onChange={e => updateStatus(concept.id, e.target.value as ConceptStatus)}
                  className={`shrink-0 text-xs px-2 py-1 rounded-full border-0 ${sc.bg} ${sc.text}`}
                >
                  <option value="not_started">Not Started</option>
                  <option value="learning">Learning</option>
                  <option value="practiced">Practiced</option>
                  <option value="mastered">Mastered</option>
                </select>
              </div>

              {isExpanded && (
                <div className="mt-4 ml-7">
                  <textarea
                    value={concept.notes || ''}
                    onChange={e => updateNotes(concept.id, e.target.value)}
                    placeholder="Add notes..."
                    rows={3}
                    className="text-sm"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
