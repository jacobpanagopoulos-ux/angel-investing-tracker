export interface Pillar {
  id: number;
  name: string;
  subtitle: string;
  sort_order: number;
}

export type ConceptStatus = 'not_started' | 'learning' | 'practiced' | 'mastered';

export interface Concept {
  id: string;
  pillar_id: number;
  number: number;
  title: string;
  status: ConceptStatus;
  notes: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type FlagType = 'green' | 'red';
export type FlagStatus = 'not_started' | 'aware' | 'learning' | 'practiced' | 'mastered';

export interface Flag {
  id: string;
  type: FlagType;
  number: number;
  signal: string;
  status: FlagStatus;
  notes: string | null;
  sort_order: number;
}

export type Verdict = 'green' | 'yellow' | 'red';

export type OpportunityType = 'invest' | 'build' | 'watch';

export interface CompanyAnalysis {
  id: string;
  date: string;
  company_name: string;
  vertical: string | null;
  verdict: Verdict;
  key_insight: string;
  detailed_notes: string | null;
  opportunity_type: OpportunityType;
  created_at: string;
}

export interface CompanyAnalysisFlag {
  id: string;
  company_analysis_id: string;
  flag_id: string;
}

export interface CompanyAnalysisWithFlags extends CompanyAnalysis {
  company_analysis_flags: { flag_id: string }[];
}

export type ResearchPriority = 'priority' | 'backlog';

export interface ResearchItem {
  id: string;
  priority: ResearchPriority;
  sort_order: number;
  source_name: string;
  source_type: string;
  why: string;
  is_complete: boolean;
  completed_at: string | null;
  notes: string | null;
}

export interface SessionEntry {
  id: string;
  date: string;
  what_studied: string;
  key_insight: string;
  pillar_id: number | null;
  created_at: string;
}

export type ThesisStatus = 'researching' | 'conviction' | 'watching' | 'passed';

export interface Thesis {
  id: string;
  name: string;
  description: string | null;
  sector: string | null;
  status: ThesisStatus;
  key_data_points: string | null;
  created_at: string;
  updated_at: string;
}

export interface ThesisCompany {
  id: string;
  thesis_id: string;
  company_name: string;
  ticker: string | null;
  role: string | null;
  notes: string | null;
}

export interface WatchlistItem {
  id: string;
  company_name: string;
  ticker: string | null;
  sector: string | null;
  opportunity_type: OpportunityType;
  why_watching: string | null;
  thesis_id: string | null;
  price_when_added: string | null;
  added_date: string;
  is_analyzed: boolean;
  company_analysis_id: string | null;
  created_at: string;
}

export type MilestoneStatus = 'not_started' | 'in_progress' | 'complete';

export interface Milestone {
  id: string;
  title: string;
  target: string;
  status: MilestoneStatus;
  sort_order: number;
  completed_at: string | null;
}
