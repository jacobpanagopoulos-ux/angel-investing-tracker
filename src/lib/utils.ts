import { ConceptStatus, FlagStatus, Verdict, MilestoneStatus } from './types';

export const statusColors: Record<ConceptStatus, { bg: string; text: string; label: string }> = {
  not_started: { bg: 'bg-zinc-700/50', text: 'text-zinc-400', label: 'Not Started' },
  learning: { bg: 'bg-amber-900/40', text: 'text-amber-400', label: 'Learning' },
  practiced: { bg: 'bg-blue-900/40', text: 'text-blue-400', label: 'Practiced' },
  mastered: { bg: 'bg-emerald-900/40', text: 'text-emerald-400', label: 'Mastered' },
};

export const flagStatusColors: Record<FlagStatus, { bg: string; text: string; label: string }> = {
  not_started: { bg: 'bg-zinc-700/50', text: 'text-zinc-400', label: 'Not Started' },
  aware: { bg: 'bg-purple-900/40', text: 'text-purple-400', label: 'Aware' },
  learning: { bg: 'bg-amber-900/40', text: 'text-amber-400', label: 'Learning' },
  practiced: { bg: 'bg-blue-900/40', text: 'text-blue-400', label: 'Practiced' },
  mastered: { bg: 'bg-emerald-900/40', text: 'text-emerald-400', label: 'Mastered' },
};

export const verdictColors: Record<Verdict, { bg: string; text: string; label: string }> = {
  green: { bg: 'bg-emerald-900/40', text: 'text-emerald-400', label: 'Green' },
  yellow: { bg: 'bg-amber-900/40', text: 'text-amber-400', label: 'Yellow' },
  red: { bg: 'bg-red-900/40', text: 'text-red-400', label: 'Red' },
};

export const milestoneStatusColors: Record<MilestoneStatus, { bg: string; text: string; label: string }> = {
  not_started: { bg: 'bg-zinc-700/50', text: 'text-zinc-400', label: 'Not Started' },
  in_progress: { bg: 'bg-blue-900/40', text: 'text-blue-400', label: 'In Progress' },
  complete: { bg: 'bg-emerald-900/40', text: 'text-emerald-400', label: 'Complete' },
};

export const pillarColors: Record<number, string> = {
  1: '#10b981', // emerald for Deal Evaluation
  2: '#8b5cf6', // purple for AI Pattern Recognition
  3: '#3b82f6', // blue for Infrastructure Literacy
};

export const pillarBgColors: Record<number, string> = {
  1: 'bg-emerald-500/10 border-emerald-500/20',
  2: 'bg-purple-500/10 border-purple-500/20',
  3: 'bg-blue-500/10 border-blue-500/20',
};

export const pillarTextColors: Record<number, string> = {
  1: 'text-emerald-400',
  2: 'text-purple-400',
  3: 'text-blue-400',
};

export function calculateProgress(items: { status: string }[], countStatuses: string[]): number {
  if (items.length === 0) return 0;
  const completed = items.filter(i => countStatuses.includes(i.status)).length;
  return Math.round((completed / items.length) * 100);
}
