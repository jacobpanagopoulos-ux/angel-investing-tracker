'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Flag, FlagStatus } from '@/lib/types';
import { flagStatusColors, calculateProgress } from '@/lib/utils';
import ProgressRing from '@/components/progress-ring';

export default function FlagsPage() {
  const [flags, setFlags] = useState<Flag[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('flags').select('*').order('sort_order');
      setFlags(data || []);
    }
    load();
  }, []);

  async function updateStatus(id: string, status: FlagStatus) {
    setFlags(prev => prev.map(f => f.id === id ? { ...f, status } : f));
    await supabase.from('flags').update({ status }).eq('id', id);
  }

  async function updateNotes(id: string, notes: string) {
    setFlags(prev => prev.map(f => f.id === id ? { ...f, notes } : f));
    await supabase.from('flags').update({ notes }).eq('id', id);
  }

  const greenFlags = flags.filter(f => f.type === 'green');
  const redFlags = flags.filter(f => f.type === 'red');
  const progress = calculateProgress(flags, ['practiced', 'mastered']);

  return (
    <div className="max-w-5xl animate-in">
      <div className="flex items-center gap-6 mb-8">
        <ProgressRing progress={progress} color="#8b5cf6" size={80} strokeWidth={5} />
        <div>
          <h1 className="text-2xl font-bold text-purple-400">AI Pattern Recognition</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Green and red flags for evaluating AI companies</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Green Flags */}
        <div>
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Green Flags (What to Look For)
          </h2>
          <div className="flex flex-col gap-3">
            {greenFlags.map(flag => {
              const sc = flagStatusColors[flag.status];
              const isExpanded = expandedId === flag.id;
              return (
                <div key={flag.id} className="card" style={{ borderLeft: '3px solid var(--accent-emerald)' }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : flag.id)}>
                      <p className="text-sm">{flag.signal}</p>
                      {flag.notes && !isExpanded && (
                        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                          {flag.notes.length > 60 ? flag.notes.slice(0, 60) + '...' : flag.notes}
                        </p>
                      )}
                    </div>
                    <select
                      value={flag.status}
                      onChange={e => updateStatus(flag.id, e.target.value as FlagStatus)}
                      className={`shrink-0 text-xs px-2 py-1 rounded-full border-0 ${sc.bg} ${sc.text}`}
                    >
                      <option value="not_started">Not Started</option>
                      <option value="aware">Aware</option>
                      <option value="learning">Learning</option>
                      <option value="practiced">Practiced</option>
                      <option value="mastered">Mastered</option>
                    </select>
                  </div>
                  {isExpanded && (
                    <textarea
                      value={flag.notes || ''}
                      onChange={e => updateNotes(flag.id, e.target.value)}
                      placeholder="Add notes..."
                      rows={2}
                      className="mt-3 text-sm"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Red Flags */}
        <div>
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Red Flags (What to Avoid)
          </h2>
          <div className="flex flex-col gap-3">
            {redFlags.map(flag => {
              const sc = flagStatusColors[flag.status];
              const isExpanded = expandedId === flag.id;
              return (
                <div key={flag.id} className="card" style={{ borderLeft: '3px solid var(--accent-red)' }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : flag.id)}>
                      <p className="text-sm">{flag.signal}</p>
                      {flag.notes && !isExpanded && (
                        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                          {flag.notes.length > 60 ? flag.notes.slice(0, 60) + '...' : flag.notes}
                        </p>
                      )}
                    </div>
                    <select
                      value={flag.status}
                      onChange={e => updateStatus(flag.id, e.target.value as FlagStatus)}
                      className={`shrink-0 text-xs px-2 py-1 rounded-full border-0 ${sc.bg} ${sc.text}`}
                    >
                      <option value="not_started">Not Started</option>
                      <option value="aware">Aware</option>
                      <option value="learning">Learning</option>
                      <option value="practiced">Practiced</option>
                      <option value="mastered">Mastered</option>
                    </select>
                  </div>
                  {isExpanded && (
                    <textarea
                      value={flag.notes || ''}
                      onChange={e => updateNotes(flag.id, e.target.value)}
                      placeholder="Add notes..."
                      rows={2}
                      className="mt-3 text-sm"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
