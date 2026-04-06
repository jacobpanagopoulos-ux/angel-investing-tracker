-- Add regulatory risk scores to watchlist and update thesis with pricing/product data

-- Update the 5 target companies with risk scores and notes
-- Digital Realty: NYC(15) + >10MW(10) + Partial sub-metering(5) + First-time(5) + S9144(5) = 40
UPDATE watchlist SET why_watching = '111 8th Ave, NYC, 100MW+. REIT (SEC reporting). RISK SCORE: 40/50 ("On Fire"). NYC location = full LL97 exposure. Must report liabilities to SEC. VP of Global Energy & Sustainability is buyer. FIRST CALL TARGET.' WHERE company_name = 'Digital Realty' AND sector = 'Data Center (REIT)';

-- Sabey: NYC(15) + 40MW(10) + Partial(5) + First-time(5) + S9144(5) = 40
UPDATE watchlist SET why_watching = '375 Pearl St, Manhattan, 40MW. Private. RISK SCORE: 40/50 ("On Fire"). NYC location = full LL97 exposure. Older converted building = likely poor sub-metering. Mid-market = no internal compliance army. FIRST CALL TARGET.' WHERE company_name = 'Sabey Data Centers';

-- DataBank: NYS(8) + 40MW(10) + Unknown(5) + First-time(5) + S9144(5) = 33
UPDATE watchlist SET why_watching = 'LGA3, Rockland County, 40MW. Private. RISK SCORE: 33/50 ("At Risk"). Not in NYC (no LL97) but S9144 applies statewide. Mid-market = ideal ICP. Director of Environmental Compliance is buyer.' WHERE company_name = 'DataBank' AND sector = 'Data Center (Colocation)';

-- TeraWulf: NYS(8) + 70MW(10) + Unknown(5) + First-time(5) + Exempt?(0) = 28
UPDATE watchlist SET why_watching = 'Lake Mariner, Niagara, 70MW. Public (WULF). RISK SCORE: 28/50 ("At Risk"). Upstate = no LL97 but potential S9144 impact. Crypto-to-AI pivot. Check sustainability report for current compliance posture.' WHERE company_name = 'TeraWulf';

-- Equinix: NJ(2) + massive(10) + Likely full(0) + First-time(5) + S9144(5) = 22
UPDATE watchlist SET why_watching = 'NY4/NY5, Secaucus NJ. Massive capacity. Public REIT (EQIX). RISK SCORE: 22/50 ("Stable"). NJ location = not LL97 subject, but NJ S4001 emerging. Largest global colo. Enterprise sale, long cycle. Content marketing target, not first call.' WHERE company_name = 'Equinix' AND sector = 'Data Center (REIT)';

-- Update Energy Compliance thesis with pricing and product spec data
UPDATE theses SET
  description = 'Same compliance-as-a-service pattern as Sentinel FMLA applied to energy. PRODUCT: Liability Dashboard (real-time LL97 fine), 50% Exemption Dial (tenant vs house load), S9144 Moratorium Proof (e-waste + water audit), RDP Collaboration Portal, Multi-State Heatmap. PRICING: $4,500/month/facility ($54K/year). ROI: 1% of $5.9M fine = trivial. Alt: 5% success fee on fine avoided. SCHEMA: 5 tables (data_centers, energy_metrics, water_metrics, e_waste_inventory, compliance_milestones).',
  updated_at = now()
WHERE id = 'a1b2c3d4-4444-4000-8000-000000000004';

-- Session log
INSERT INTO session_log (date, what_studied, key_insight, pillar_id) VALUES
('2026-04-05', 'Gemini product spec: schema, MVP screens, demo script, pricing, risk scoring', 'MVP = 5 screens. Lead with Liability Dashboard ($4.2M fine counter) and Exemption Dial (50% threshold = $0 fine). Pricing: $4,500/mo/facility. Demo holy-shit moment: "Generate RDP Packet" saves 40 hours in 4 seconds. Risk scoring: Digital Realty + Sabey = 40/50 (first calls), DataBank = 33, TeraWulf = 28, Equinix = 22.', NULL);
