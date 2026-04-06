'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Pillar, Concept, Flag, SessionEntry, Milestone, CompanyAnalysis } from '@/lib/types';
import { pillarColors, pillarBgColors, pillarTextColors, calculateProgress, milestoneStatusColors } from '@/lib/utils';
import ProgressRing from '@/components/progress-ring';
import StatusBadge from '@/components/status-badge';
import Link from 'next/link';

interface DashboardData {
  pillars: Pillar[];
  concepts: Concept[];
  flags: Flag[];
  sessions: SessionEntry[];
  milestones: Milestone[];
  companies: CompanyAnalysis[];
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function load() {
      const [pillars, concepts, flags, sessions, milestones, companies] = await Promise.all([
        supabase.from('pillars').select('*').order('sort_order'),
        supabase.from('concepts').select('*').order('sort_order'),
        supabase.from('flags').select('*').order('sort_order'),
        supabase.from('session_log').select('*').order('date', { ascending: false }).limit(5),
        supabase.from('milestones').select('*').order('sort_order'),
        supabase.from('company_analyses').select('*').order('created_at', { ascending: false }),
      ]);
      setData({
        pillars: pillars.data || [],
        concepts: concepts.data || [],
        flags: flags.data || [],
        sessions: sessions.data || [],
        milestones: milestones.data || [],
        companies: companies.data || [],
      });
    }
    load();
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
      </div>
    );
  }

  const pillarProgress = data.pillars.map(p => {
    if (p.id === 2) {
      return {
        pillar: p,
        progress: calculateProgress(data.flags, ['practiced', 'mastered']),
        total: data.flags.length,
        completed: data.flags.filter(f => ['practiced', 'mastered'].includes(f.status)).length,
      };
    }
    const concepts = data.concepts.filter(c => c.pillar_id === p.id);
    return {
      pillar: p,
      progress: calculateProgress(concepts, ['practiced', 'mastered']),
      total: concepts.length,
      completed: concepts.filter(c => ['practiced', 'mastered'].includes(c.status)).length,
    };
  });

  const totalConcepts = data.concepts.length + data.flags.length;
  const totalMastered = data.concepts.filter(c => c.status === 'mastered').length +
    data.flags.filter(f => f.status === 'mastered').length;
  const totalLearning = data.concepts.filter(c => c.status === 'learning').length +
    data.flags.filter(f => ['learning', 'aware'].includes(f.status)).length;
  const nextMilestone = data.milestones.find(m => m.status !== 'complete');

  return (
    <div className="max-w-5xl animate-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          AI angel investing skill acquisition
        </p>
      </div>

      {/* Progress Rings */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {pillarProgress.map(({ pillar, progress, total, completed }) => (
          <Link href={pillar.id === 2 ? '/flags' : `/pillars/${pillar.id}`} key={pillar.id}>
            <div className={`card flex flex-col items-center gap-4 cursor-pointer border ${pillarBgColors[pillar.id]}`}>
              <ProgressRing progress={progress} color={pillarColors[pillar.id]} />
              <div className="text-center">
                <h3 className={`font-semibold ${pillarTextColors[pillar.id]}`}>{pillar.name}</h3>
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  {pillar.subtitle}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  {completed} / {total} mastered
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="card text-center">
          <p className="text-2xl font-bold" style={{ color: 'var(--accent-emerald)' }}>{totalConcepts}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Total Skills</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold" style={{ color: 'var(--accent-amber)' }}>{totalLearning}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Learning</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold" style={{ color: 'var(--accent-blue)' }}>{totalMastered}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Mastered</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold" style={{ color: 'var(--accent-purple)' }}>{data.companies.length}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Companies Analyzed</p>
        </div>
      </div>

      {/* Next Milestone + Recent Sessions */}
      <div className="grid grid-cols-2 gap-6">
        {/* Next Milestone */}
        <div className="card">
          <h3 className="font-semibold mb-3">Next Milestone</h3>
          {nextMilestone ? (
            <div>
              <p className="text-sm">{nextMilestone.title}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Target: {nextMilestone.target}</span>
                <StatusBadge {...milestoneStatusColors[nextMilestone.status]} />
              </div>
            </div>
          ) : (
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>All milestones complete</p>
          )}
          <Link href="/milestones" className="text-xs mt-3 inline-block" style={{ color: 'var(--accent-blue)' }}>
            View all milestones
          </Link>
        </div>

        {/* Recent Sessions */}
        <div className="card">
          <h3 className="font-semibold mb-3">Recent Sessions</h3>
          {data.sessions.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No sessions logged yet</p>
          ) : (
            <div className="flex flex-col gap-2">
              {data.sessions.map(s => (
                <div key={s.id} className="flex items-start gap-3 text-sm">
                  <span className="text-xs shrink-0 mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.date}</span>
                  <div>
                    <p style={{ color: 'var(--text-secondary)' }}>{s.what_studied}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.key_insight}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link href="/sessions" className="text-xs mt-3 inline-block" style={{ color: 'var(--accent-blue)' }}>
            View all sessions
          </Link>
        </div>
      </div>
    </div>
  );
}
