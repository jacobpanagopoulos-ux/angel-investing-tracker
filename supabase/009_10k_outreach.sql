-- 10-K intelligence and PSC registration milestone

-- Update Digital Realty with 10-K data
UPDATE watchlist SET why_watching = '111 8th Ave, NYC, 100MW+. REIT. RISK SCORE: 40/50. 10-K: Science-Based Target 42% Scope 1&2 reduction by 2030. 69% ENERGY STAR certified. 1,240 GWh EACs BUT may not meet NY Tier 4 REC requirements. 14% WUE reduction. HOOK: "Are you still relying on manual RDP certification, or have you automated the High Intensity adjustment (§ 28-320.7)?"' WHERE company_name = 'Digital Realty' AND sector = 'Data Center (REIT)';

-- Update TeraWulf with 10-K data
UPDATE watchlist SET why_watching = 'Lake Mariner, 70MW. Public (WULF). RISK SCORE: 28/50. 10-K: 522 MW HPC/AI pipeline. S9144 = existential threat to expansion. "Regulatory changes in NY" is top-tier risk factor. Uses NYPA hydro + nuclear. Hardware refresh 3-5 years (e-waste exposure). HOOK: "With 522 MW in pipeline, S9144 moratorium is a massive bottleneck for Lake Mariner."' WHERE company_name = 'TeraWulf';

-- Add PSC registration as urgent milestone
INSERT INTO milestones (title, target, status, sort_order) VALUES
('Call surety bond agent (SuretyBonds.com or JW Surety)', 'Apr 7, 2026', 'not_started', 12),
('File NY PSC Energy Consultant registration (Matter 23-01227)', 'Apr 14, 2026', 'not_started', 13);

-- Session log
INSERT INTO session_log (date, what_studied, key_insight, pillar_id) VALUES
('2026-04-05', '10-K analysis (DLR + WULF), PSC registration mechanics, 3 LinkedIn posts drafted', 'DLR 10-K: 42% SBT by 2030 but EACs may not meet LL97 Tier 4. WULF 10-K: 522MW pipeline, S9144 listed as top risk factor. PSC registration: Form + $50K bond ($500-$1,500 actual) + file via DMM into Matter 23-01227. Approval 15-30 days. Three LinkedIn posts drafted in 67K voice adapted for energy vertical.', NULL);
