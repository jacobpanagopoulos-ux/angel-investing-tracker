-- Migration: Add Theses, Watchlist, and enhance Company Analyses

-- Theses (macro investment theses that group companies)
CREATE TABLE theses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  sector text,
  status text NOT NULL DEFAULT 'researching' CHECK (status IN ('researching','conviction','watching','passed')),
  key_data_points text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Join table: thesis <-> companies
CREATE TABLE thesis_companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thesis_id uuid NOT NULL REFERENCES theses(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  ticker text,
  role text, -- e.g. "Key player", "Emerging", "White space"
  notes text
);

-- Watchlist (lightweight company tracking before full analysis)
CREATE TABLE watchlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  ticker text,
  sector text,
  opportunity_type text NOT NULL DEFAULT 'watch' CHECK (opportunity_type IN ('invest','build','watch')),
  why_watching text,
  thesis_id uuid REFERENCES theses(id) ON DELETE SET NULL,
  price_when_added text,
  added_date date DEFAULT CURRENT_DATE,
  is_analyzed boolean DEFAULT false,
  company_analysis_id uuid REFERENCES company_analyses(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Add opportunity_type to company_analyses
ALTER TABLE company_analyses ADD COLUMN opportunity_type text DEFAULT 'invest' CHECK (opportunity_type IN ('invest','build','watch'));

-- Indexes
CREATE INDEX idx_thesis_companies_thesis ON thesis_companies(thesis_id);
CREATE INDEX idx_watchlist_sector ON watchlist(sector);
CREATE INDEX idx_watchlist_thesis ON watchlist(thesis_id);
CREATE INDEX idx_theses_status ON theses(status);
