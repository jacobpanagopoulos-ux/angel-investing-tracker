-- AI Angel Investing Skill Tracker -- Schema

-- Pillars (reference table)
CREATE TABLE pillars (
  id int2 PRIMARY KEY,
  name text NOT NULL,
  subtitle text NOT NULL,
  sort_order int2 NOT NULL
);

-- Concepts (skill items under each pillar)
CREATE TABLE concepts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pillar_id int2 NOT NULL REFERENCES pillars(id),
  number int2 NOT NULL,
  title text NOT NULL,
  status text NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started','learning','practiced','mastered')),
  notes text,
  sort_order int2 NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Flags (green flags and red flags for AI company evaluation)
CREATE TABLE flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('green','red')),
  number int2 NOT NULL,
  signal text NOT NULL,
  status text NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started','aware','learning','practiced','mastered')),
  notes text,
  sort_order int2 NOT NULL
);

-- Company analyses
CREATE TABLE company_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL DEFAULT CURRENT_DATE,
  company_name text NOT NULL,
  vertical text,
  verdict text NOT NULL CHECK (verdict IN ('green','yellow','red')),
  key_insight text NOT NULL,
  detailed_notes text,
  created_at timestamptz DEFAULT now()
);

-- Join table: company analysis <-> flags
CREATE TABLE company_analysis_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_analysis_id uuid NOT NULL REFERENCES company_analyses(id) ON DELETE CASCADE,
  flag_id uuid NOT NULL REFERENCES flags(id)
);

-- Research queue
CREATE TABLE research_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  priority text NOT NULL CHECK (priority IN ('priority','backlog')),
  sort_order int2 NOT NULL,
  source_name text NOT NULL,
  source_type text NOT NULL,
  why text NOT NULL,
  is_complete boolean NOT NULL DEFAULT false,
  completed_at timestamptz,
  notes text
);

-- Session log
CREATE TABLE session_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL DEFAULT CURRENT_DATE,
  what_studied text NOT NULL,
  key_insight text NOT NULL,
  pillar_id int2 REFERENCES pillars(id),
  created_at timestamptz DEFAULT now()
);

-- Milestones
CREATE TABLE milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  target text NOT NULL,
  status text NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started','in_progress','complete')),
  sort_order int2 NOT NULL,
  completed_at timestamptz
);

-- Indexes
CREATE INDEX idx_concepts_pillar ON concepts(pillar_id);
CREATE INDEX idx_flags_type ON flags(type);
CREATE INDEX idx_company_analysis_flags_company ON company_analysis_flags(company_analysis_id);
CREATE INDEX idx_session_log_date ON session_log(date DESC);
CREATE INDEX idx_research_queue_priority ON research_queue(priority, sort_order);
