-- Seed: Energy Thesis Data from Michael Dell / AI Energy Gap research

-- Thesis 1: Nuclear Baseload for AI
INSERT INTO theses (id, name, description, sector, status, key_data_points) VALUES
('a1b2c3d4-1111-4000-8000-000000000001',
'Nuclear Baseload for AI Data Centers',
'AI data centers need 24/7 "baseload" power. Wind and solar can''t keep a data center running at night. Nuclear is the only carbon-free source that runs around the clock. Companies positioning to sell nuclear power directly to data centers (bypassing utilities) are the toll booth.',
'Nuclear Power',
'researching',
'- 24/7 uptime required for AI training and inference
- Wind/solar intermittency makes them insufficient as sole power source
- SMR (Small Modular Reactor) laws passing in NJ and TX
- Oklo attempting direct-to-data-center nuclear sales (bypassing utility)
- Nuclear is carbon-free, satisfying ESG requirements simultaneously');

-- Thesis 2: Data Center Cooling
INSERT INTO theses (id, name, description, sector, status, key_data_points) VALUES
('a1b2c3d4-2222-4000-8000-000000000002',
'AI Chip Cooling Infrastructure',
'AI chips generate extreme heat. 40% of a data center''s energy is wasted on cooling. Companies building advanced liquid cooling and heat recovery systems are critical infrastructure. Every new GPU cluster needs cooling, regardless of which AI model wins.',
'Cooling Tech',
'researching',
'- 40% of data center energy goes to cooling alone
- AI chips (H100, B200) run hotter than traditional servers
- Liquid cooling replacing air cooling as standard
- Heat recovery opportunity: waste heat can warm homes/greenhouses
- Every new GPU deployment = guaranteed cooling demand');

-- Thesis 3: Grid Modernization
INSERT INTO theses (id, name, description, sector, status, key_data_points) VALUES
('a1b2c3d4-3333-4000-8000-000000000003',
'Grid Modernization for AI Load',
'The public power grid is too slow to build out for AI demand. Software that manages massive new loads without crashing the grid is essential. AI-native grid planning tools that predict where to put batteries and transformers are white space.',
'Grid Infrastructure',
'researching',
'- Public grid build-out takes 5-10 years, AI demand is NOW
- Utility companies using outdated software for grid planning
- AI can predict exactly where to place batteries/transformers
- Companies bringing "off-grid" power directly to data center sites
- Edge computing spreads AI load away from centralized data centers');

-- Thesis 4: Energy Compliance SaaS (BUILD opportunity)
INSERT INTO theses (id, name, description, sector, status, key_data_points) VALUES
('a1b2c3d4-4444-4000-8000-000000000004',
'Energy Compliance SaaS for Data Centers',
'Same compliance-as-a-service pattern as Sentinel (FMLA) applied to energy. Data centers face massive regulatory burden: carbon reporting, grid impact statements, permit compliance. No one has built the guided workflow engine for this. Natural extension of existing compliance logic architecture.',
'Energy Compliance',
'researching',
'- NY Senate Bill S9144: 3-year moratorium on new data centers without grid impact proof
- Local Law 97: $268/metric ton carbon penalty in NYC
- Every data center needs Environmental Impact Statements and Rate-Impact Reviews
- PSEG Long Island offers data center incentives for off-peak usage
- Energy Consultant registration: only $500 + surety bond via NY PSC
- Same vertical SaaS pattern as Sentinel. Compliance rule engine is the moat.
- "Energy is just HR for electricity" -- same regulatory complexity, same workflow automation opportunity');

-- Thesis Companies: Nuclear
INSERT INTO thesis_companies (thesis_id, company_name, ticker, role, notes) VALUES
('a1b2c3d4-1111-4000-8000-000000000001', 'Constellation Energy', 'CEG', 'Key player', 'Largest nuclear fleet in the US. Already signing deals with data centers for dedicated nuclear power.'),
('a1b2c3d4-1111-4000-8000-000000000001', 'Vistra', 'VST', 'Key player', 'Major power producer with nuclear assets. Benefiting from AI-driven electricity demand.'),
('a1b2c3d4-1111-4000-8000-000000000001', 'Oklo', 'OKLO', 'Emerging', 'Building small modular reactors (SMRs) for direct-to-customer nuclear power. Bypassing utility middleman -- the Dell Direct Model of energy.'),
('a1b2c3d4-1111-4000-8000-000000000001', 'Bloom Energy', 'BE', 'Key player', 'Fuel cells for off-grid power. Companies "bring their own power" to the data center site when the grid is too slow.');

-- Thesis Companies: Cooling
INSERT INTO thesis_companies (thesis_id, company_name, ticker, role, notes) VALUES
('a1b2c3d4-2222-4000-8000-000000000002', 'Vertiv', 'VRT', 'Key player', 'Leading data center cooling and power management. Critical infrastructure for every AI deployment.'),
('a1b2c3d4-2222-4000-8000-000000000002', 'Modine', 'MOD', 'Key player', 'Thermal management solutions. Growing data center cooling segment.');

-- Thesis Companies: Grid
INSERT INTO thesis_companies (thesis_id, company_name, ticker, role, notes) VALUES
('a1b2c3d4-3333-4000-8000-000000000003', 'Edison International', 'EIX', 'Key player', 'Utility investing in grid modernization to handle AI loads.'),
('a1b2c3d4-3333-4000-8000-000000000003', 'NextEra Energy', 'NEE', 'Key player', 'Largest generator of renewable energy. Grid-scale battery storage.');

-- Thesis Companies: Energy Compliance (white space)
INSERT INTO thesis_companies (thesis_id, company_name, ticker, role, notes) VALUES
('a1b2c3d4-4444-4000-8000-000000000004', 'Enity', NULL, 'White-label option', 'Offers white-label energy management software. Could brand as own product while they handle the technical backend.'),
('a1b2c3d4-4444-4000-8000-000000000004', 'GreenPocket', NULL, 'White-label option', 'White-label energy management platform. Alternative to building from scratch.');

-- Watchlist entries
INSERT INTO watchlist (company_name, ticker, sector, opportunity_type, why_watching, thesis_id) VALUES
('Constellation Energy', 'CEG', 'Nuclear Power', 'invest', 'Largest US nuclear fleet. Every AI data center needs 24/7 baseload power. Nuclear is the only carbon-free option that runs at night.', 'a1b2c3d4-1111-4000-8000-000000000001'),
('Vistra', 'VST', 'Nuclear Power', 'invest', 'Major power producer with nuclear + natural gas. Direct beneficiary of AI electricity demand surge.', 'a1b2c3d4-1111-4000-8000-000000000001'),
('Oklo', 'OKLO', 'Nuclear Power', 'watch', 'SMR play. Pre-revenue. High risk but if SMR regulation passes, this is the Dell Direct Model of energy -- selling nuclear power directly to data centers, bypassing utilities.', 'a1b2c3d4-1111-4000-8000-000000000001'),
('Bloom Energy', 'BE', 'Off-Grid Power', 'watch', 'Fuel cells for when the grid is too slow. Companies "bring their own power" to the site. Interesting model but check unit economics.', 'a1b2c3d4-1111-4000-8000-000000000001'),
('Vertiv', 'VRT', 'Cooling Tech', 'invest', '40% of data center energy is cooling. Every new GPU cluster needs cooling regardless of which AI model wins. Pure toll booth.', 'a1b2c3d4-2222-4000-8000-000000000002'),
('Modine', 'MOD', 'Cooling Tech', 'watch', 'Thermal management. Growing data center segment. Smaller than Vertiv but potentially higher growth rate.', 'a1b2c3d4-2222-4000-8000-000000000002'),
('Edison International', 'EIX', 'Grid Infrastructure', 'watch', 'Utility investing in grid modernization. Slower growth but defensive play on grid demand.', 'a1b2c3d4-3333-4000-8000-000000000003'),
('NextEra Energy', 'NEE', 'Grid Infrastructure', 'watch', 'Largest renewable generator. Grid-scale batteries. Beneficiary of energy transition but priced in?', 'a1b2c3d4-3333-4000-8000-000000000003'),
('Energy Compliance SaaS', NULL, 'Energy Compliance', 'build', 'White space. No one has built the guided compliance workflow for data center energy reporting. Same pattern as Sentinel. NY Bill S9144 creates urgent demand. 30-day validation: talk to 5 data center managers on LinkedIn.', 'a1b2c3d4-4444-4000-8000-000000000004');

-- Session log entry
INSERT INTO session_log (date, what_studied, key_insight, pillar_id) VALUES
('2026-04-05', 'Michael Dell AI energy gap research via Gemini', 'The most valuable position in the AI energy bottleneck is not generating power but organizing the rules, data, and delivery around it. Compliance-as-a-service for energy = same pattern as Sentinel for FMLA. "Energy is just HR for electricity."', 3);
