-- 30-Day Sprint milestones and session log

-- New milestones for the energy validation sprint
INSERT INTO milestones (title, target, status, sort_order) VALUES
('Read S9144 Sections 2-3 + LL97 § 28-320.3.1.1', 'Apr 6-10, 2026', 'not_started', 6),
('Submit S9144 Written Testimony', 'Apr 13, 2026', 'not_started', 7),
('Publish first energy compliance LinkedIn post', 'Apr 19-25, 2026', 'not_started', 8),
('Complete 5 discovery conversations with data center operators', 'May 1-15, 2026', 'not_started', 9),
('BUILD / BROKER / WALK decision on energy compliance', 'Jun 5, 2026', 'not_started', 10);

-- Add communities to research queue
INSERT INTO research_queue (priority, sort_order, source_name, source_type, why, is_complete) VALUES
('priority', 6, '7x24 Exchange (Metro NY Chapter)', 'Community', 'Gold standard for NY data center professionals. Join LinkedIn group, attend Penn/Yale Club meetups. Primary networking venue for ICP.', false),
('priority', 7, 'Data Center Dynamics (DCD) North America', 'Community', 'Sustainability & Energy Efficiency subgroups. Where compliance conversations happen.', false),
('backlog', 11, 'Clean Energy New York (CENY) Slack', 'Community', 'Renewable devs + AI Power Gap focus. Secondary network for energy broker connections.', false),
('backlog', 12, 'EnergyWatch / Amerex (Broker Aggregators)', 'Research', 'If broker path: work under their license for commission split while building own capital. Understand terms before PSC registration.', false);

-- Update watchlist with broker partner options
INSERT INTO watchlist (company_name, ticker, sector, opportunity_type, why_watching, thesis_id) VALUES
('EnergyWatch', NULL, 'Energy Brokerage', 'watch', 'Broker aggregator. If pursuing broker path, can work under their license for commission split instead of posting own $50K-$100K surety bond.', 'a1b2c3d4-4444-4000-8000-000000000004'),
('Amerex', NULL, 'Energy Brokerage', 'watch', 'Alternative broker aggregator. Same aggregator model as EnergyWatch. Compare terms.', 'a1b2c3d4-4444-4000-8000-000000000004'),
('WattCarbon', NULL, 'Energy Tech', 'watch', 'API-first energy tracking. Gemini suggested as better white-label alternative to Enity. Evaluate API capabilities.', 'a1b2c3d4-4444-4000-8000-000000000004'),
('Dexma', NULL, 'Energy Tech', 'watch', 'Modular white-label EMS. Alternative to Enity/GreenPocket. Very modular = easier to layer LL97 logic on top.', 'a1b2c3d4-4444-4000-8000-000000000004');

-- Session log
INSERT INTO session_log (date, what_studied, key_insight, pillar_id) VALUES
('2026-04-05', 'Complete 30-day energy compliance validation sprint plan from Gemini', 'Three phases: knowledge (Apr 5-30), post-LL97-filing outreach (May 1-15), BUILD/BROKER/WALK decision (May 15-Jun 5). S9144 testimony submission by Apr 13 = free credibility. May 11 hearing window = free VOC research. Decision matrix: 3+ manual reconciliation complaints = build SaaS, rate complaints = broker, "we pay the fine" = walk away.', NULL);
