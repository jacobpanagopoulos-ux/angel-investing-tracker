'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Pillar, Concept, Flag } from '@/lib/types';
import { pillarColors, pillarBgColors, pillarTextColors, calculateProgress } from '@/lib/utils';
import ProgressRing from '@/components/progress-ring';
import Link from 'next/link';

export default function PillarsPage() {
  const [pillars, setPillars] = useState<Pillar[]>([]);
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [flags, setFlags] = useState<Flag[]>([]);

  useEffect(() => {
    async function load() {
      const [p, c, f] = await Promise.all([
        supabase.from('pillars').select('*').order('sort_order'),
        supabase.from('concepts').select('*').order('sort_order'),
        supabase.from('flags').select('*').order('sort_order'),
      ]);
      setPillars(p.data || []);
      setConcepts(c.data || []);
      setFlags(f.data || []);
    }
    load();
  }, []);

  return (
    <div className="max-w-5xl animate-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Pillars</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Three skill areas to master before deploying capital
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {pillars.map(pillar => {
          const isFlags = pillar.id === 2;
          const items = isFlags ? flags : concepts.filter(c => c.pillar_id === pillar.id);
          const progress = isFlags
            ? calculateProgress(flags, ['practiced', 'mastered'])
            : calculateProgress(items, ['practiced', 'mastered']);
          const total = items.length;
          const learning = isFlags
            ? flags.filter(f => ['aware', 'learning'].includes(f.status)).length
            : (items as Concept[]).filter(c => c.status === 'learning').length;
          const practiced = items.filter(i => i.status === 'practiced').length;
          const mastered = items.filter(i => i.status === 'mastered').length;

          return (
            <Link href={isFlags ? '/flags' : `/pillars/${pillar.id}`} key={pillar.id}>
              <div className={`card cursor-pointer border ${pillarBgColors[pillar.id]}`}>
                <div className="flex items-center gap-6">
                  <ProgressRing progress={progress} color={pillarColors[pillar.id]} size={100} strokeWidth={6} />
                  <div className="flex-1">
                    <h2 className={`text-lg font-semibold ${pillarTextColors[pillar.id]}`}>{pillar.name}</h2>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{pillar.subtitle}</p>
                    <div className="flex gap-4 mt-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <span>{total} total</span>
                      <span>{learning} learning</span>
                      <span>{practiced} practiced</span>
                      <span>{mastered} mastered</span>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%`, background: pillarColors[pillar.id] }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
