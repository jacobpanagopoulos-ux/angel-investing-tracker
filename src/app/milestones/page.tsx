'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Milestone, MilestoneStatus } from '@/lib/types';
import { milestoneStatusColors } from '@/lib/utils';

export default function MilestonesPage() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('milestones').select('*').order('sort_order');
      setMilestones(data || []);
    }
    load();
  }, []);

  async function updateStatus(id: string, status: MilestoneStatus) {
    const update = {
      status,
      completed_at: status === 'complete' ? new Date().toISOString() : null,
    };
    setMilestones(prev => prev.map(m => m.id === id ? { ...m, ...update } : m));
    await supabase.from('milestones').update(update).eq('id', id);
  }

  return (
    <div className="max-w-3xl animate-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Milestones</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Checkpoints on the path to angel investing readiness
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: 'var(--border)' }} />

        <div className="flex flex-col gap-6">
          {milestones.map((m, i) => {
            const sc = milestoneStatusColors[m.status];
            const isComplete = m.status === 'complete';
            return (
              <div key={m.id} className="flex items-start gap-4 relative">
                {/* Timeline dot */}
                <div
                  className="w-3 h-3 rounded-full mt-1.5 shrink-0 z-10"
                  style={{
                    background: isComplete ? 'var(--accent-emerald)' : m.status === 'in_progress' ? 'var(--accent-blue)' : 'var(--border)',
                    marginLeft: '18px',
                    boxShadow: '0 0 0 4px var(--bg)',
                  }}
                />

                <div className="card flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-sm font-medium ${isComplete ? 'line-through' : ''}`}
                        style={isComplete ? { color: 'var(--text-muted)' } : undefined}>
                        {m.title}
                      </h3>
                      <span className="text-xs mt-1 block" style={{ color: 'var(--text-muted)' }}>
                        Target: {m.target}
                      </span>
                    </div>
                    <select
                      value={m.status}
                      onChange={e => updateStatus(m.id, e.target.value as MilestoneStatus)}
                      className={`shrink-0 text-xs px-2 py-1 rounded-full border-0 ${sc.bg} ${sc.text}`}
                    >
                      <option value="not_started">Not Started</option>
                      <option value="in_progress">In Progress</option>
                      <option value="complete">Complete</option>
                    </select>
                  </div>
                  {m.completed_at && (
                    <p className="text-xs mt-2" style={{ color: 'var(--accent-emerald)' }}>
                      Completed {new Date(m.completed_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
