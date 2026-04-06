-- REC Strategy Simulator data and connection request milestones

-- Update REC concept with verified formula
UPDATE concepts SET
  status = 'learning',
  notes = 'VERIFIED FORMULA: Delta_P = Q_REC × (C_elec × 1000) × 268. Only Tier 4 RECs qualify (Zone J delivery). Break-even: $77.44/REC. Example: 1,000 RECs at $30 = $30K spend, $77K savings, 257% ROI. LIMITATION: RECs only offset electricity, not on-site gas. Product must flag "Residual Gas Gap." 2030-2034 coefficient drops to 0.000145 (half current). Full formula at projects/energy-compliance/rec-simulator-formula.md.'
WHERE title = 'Carbon credit and REC (Renewable Energy Credit) markets';

-- Add milestone for sending connection requests
INSERT INTO milestones (title, target, status, sort_order) VALUES
('Send LinkedIn connection requests to 5 named targets', 'Apr 13-15, 2026', 'not_started', 17),
('Verify all 5 contact names on LinkedIn (Gemini may have approximations)', 'Apr 10, 2026', 'not_started', 18);

-- Session log
INSERT INTO session_log (date, what_studied, key_insight, pillar_id) VALUES
('2026-04-06', 'REC Tier 4 formula (Rule 103-14), PSC cover letter, 5 personalized connection requests drafted', 'Only Tier 4 RECs work for LL97 (Zone J delivery). Break-even price: $77.44/REC. At $30/REC the ROI is 257%. RECs cannot offset on-site gas = "Residual Gas Gap" feature needed. PSC cover letter drafted with pending-DOS language. Connection requests ready but need LinkedIn verification + shortening to 300-char limit.', 3);
