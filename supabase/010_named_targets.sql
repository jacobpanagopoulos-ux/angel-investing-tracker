-- Named target contacts and PSC registration milestones

-- Update watchlist with specific contact names
UPDATE watchlist SET why_watching = '111 8th Ave, NYC, 100MW+. REIT. RISK SCORE: 40/50. CONTACT: Sormeh McCullough, Director of Sustainability (~2yr). 10-K: 42% SBT by 2030, 1,240 GWh EACs but may not meet LL97 Tier 4. HOOK: "Are you still relying on manual RDP certification, or have you automated the High Intensity adjustment (§ 28-320.7)?"' WHERE company_name = 'Digital Realty' AND sector = 'Data Center (REIT)';

UPDATE watchlist SET why_watching = '375 Pearl St, Manhattan, 40MW. Private. RISK SCORE: 40/50. CONTACT: Dan Meltzer, Managing Director RE/Ops (12+ yr). HOOK: "375 Pearl is classified Group B (strictest LL97 limits). Sentinel automates the Industrial Load reclassification to bypass Group B emission caps."' WHERE company_name = 'Sabey Data Centers';

UPDATE watchlist SET why_watching = 'LGA3, Rockland, 40MW. Private. RISK SCORE: 33/50. CONTACT: Eric Swartz, VP Sustainability (~1yr). HOOK: "LGA3 compliance score directly impacts your Green Financing credit facility covenants."' WHERE company_name = 'DataBank' AND sector = 'Data Center (Colocation)';

UPDATE watchlist SET why_watching = 'Lake Mariner, 70MW. Public (WULF). RISK SCORE: 28/50. CONTACT: Kerri Langlais, Chief Strategy Officer (4+ yr). 10-K: 522MW HPC pipeline, "NY regulatory changes" = top risk factor. HOOK: "S9144 moratorium is a massive expansion bottleneck for Lake Mariner. Automated sub-metered Industrial Load proof."' WHERE company_name = 'TeraWulf';

UPDATE watchlist SET why_watching = 'NY4/NY5 Secaucus NJ. Massive. REIT (EQIX). RISK SCORE: 22/50. CONTACT: Raouf Abdel, EVP Global Operations (10+ yr). HOOK: "At your scale, manual LL97 reporting for NY4/NY5 is impossible. RDP Evidence Locker cuts PE certification costs."' WHERE company_name = 'Equinix' AND sector = 'Data Center (REIT)';

-- Update milestones with legal filing sequence
INSERT INTO milestones (title, target, status, sort_order) VALUES
('Order Alabama Certificate of Existence (Good Standing)', 'Apr 7, 2026', 'not_started', 14),
('File NY Form DOS-1361 (Certificate of Authority for Vulture Capital LLC)', 'Apr 10, 2026', 'not_started', 15),
('Get NY Registered Agent (Northwest or ZenBusiness, ~$100/yr)', 'Apr 10, 2026', 'not_started', 16);

-- Session log
INSERT INTO session_log (date, what_studied, key_insight, pillar_id) VALUES
('2026-04-06', '5 named contacts with LinkedIn hooks + NY foreign qualification legal sequence for Vulture Capital LLC', 'Targets: Sormeh McCullough (DLR), Dan Meltzer (Sabey), Eric Swartz (DataBank), Kerri Langlais (WULF), Raouf Abdel (EQIX). Legal: AL Certificate of Existence first, then NY DOS-1361 (Certificate of Authority, $250), then surety bond, then PSC filing. Can file PSC while DOS pending with cover letter. Long pole = AL Good Standing certificate.', NULL);
