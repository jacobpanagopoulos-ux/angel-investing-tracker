-- Hudson Digital sample data and MVP screen spec session log

INSERT INTO session_log (date, what_studied, key_insight, pillar_id) VALUES
('2026-04-06', 'Full MVP screen specs (5 screens) + Hudson Digital sample data (12mo electricity, water, 5 e-waste)', 'THE SALES HOOK: 48% tenant load (INELIGIBLE) -> slide to 51% (ELIGIBLE) = $3.4M penalty swing. Screen 1 shows $5.2M ticker. Screen 2 exemption dial flips red->green. Screen 3 RDP Evidence Locker one-click ZIP. Screen 4 REC simulator 257% ROI. Screen 5 map with moratorium zones. Hudson Digital: 40MW Manhattan, 353,900 MWh/yr, 105M gal water (just over S9144 threshold), one e-waste record PENDING (S9144 risk). Use Tremor or Shadcn for enterprise charts.', NULL);

-- Update Energy Compliance thesis with build status
UPDATE theses SET
  status = 'conviction',
  description = 'CONVICTION: Full product spec designed, sample data ready, 5 named targets with hooks, PSC registration in progress. PRODUCT: 5 MVP screens (Liability Dashboard, Exemption Dial, RDP Evidence Locker, REC Simulator, S9144 Expansion Risk). PRICING: $4,500/month/facility. DEMO: Hudson Digital 40MW Manhattan, $3.4M swing as sales hook. BUILD TARGET: demo-ready by May 15.',
  updated_at = now()
WHERE id = 'a1b2c3d4-4444-4000-8000-000000000004';

-- Update milestone
INSERT INTO milestones (title, target, status, sort_order) VALUES
('Build Sentinel Energy Module MVP (5 screens, demo-ready)', 'May 15, 2026', 'not_started', 19);
