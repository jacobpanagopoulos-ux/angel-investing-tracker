-- Regulatory corrections and updated product data from Gemini deep dive

-- Update concepts with corrected regulatory references
UPDATE concepts SET
  notes = 'CORRECTION: § 103-12 is for healthcare. Data centers use § 28-320.7 (Adjustment to Emissions Limits). The argument: critical infrastructure serving NYC digital economy. Also: Group B occupancy trap -- most data centers classified as Office (strictest limits). Need to prove 51% Industrial load for reclassification. Floor-Area-to-Load ratio calculator needed.'
WHERE title = 'NYC Local Law 97 compliance mechanics';

-- Add new concepts for newly discovered regulatory edges
INSERT INTO concepts (pillar_id, number, title, status, notes, sort_order) VALUES
(3, 16, 'LL97 REC (Renewable Energy Credit) strategy and Rule 103-14', 'not_started', 'Tier 4 RECs can offset LL97 penalties. Rules just tightened. Need to understand: REC pricing, Tier 1-4 distinctions, verification requirements, ROI calculation ($ spent on RECs vs penalty avoided). Product feature: REC Strategy Simulator slider.', 16),
(3, 17, 'ConEd Green Button / UtilityAPI for automatic data ingestion', 'not_started', 'As registered energy consultant, LOA access enables automatic utility data pull. ConEd Green Button and UtilityAPI are the integration points. This eliminates CSV upload and creates a technical moat: our software pulls data directly while competitors ask customers to email spreadsheets.', 17),
(3, 18, 'NY PSC Grid Connection Agreements and S9144 shadow regulation', 'not_started', 'S9144 gives PSC power to deny Grid Connection Agreements even if building permit is active. You can have a permit but no power. Product feature: Grid Availability Headroom tracker per zip code.', 18);

-- Add April 30 bond deadline as urgent milestone
INSERT INTO milestones (title, target, status, sort_order) VALUES
('Register as NY PSC Energy Consultant ($500 + $50K bond)', 'Apr 30, 2026 DEADLINE', 'not_started', 11);

-- Session log
INSERT INTO session_log (date, what_studied, key_insight, pillar_id) VALUES
('2026-04-05', 'Gemini product design + regulatory depth: occupancy groups, RDP Evidence Locker, consultant strategy', 'Three corrections: (1) High Intensity exemption for DCs is § 28-320.7, not § 103-12. (2) Group B occupancy trap -- data centers classified as Office face strictest limits, need Floor-Area-to-Load reclassification argument. (3) S9144 shadow regulation gives PSC power to deny grid connections even with permits. New MVP features: RDP Evidence Locker (one-click ZIP), REC Strategy Simulator, Grid Availability Headroom. URGENT: register as consultant by April 30 bond deadline.', 3);
