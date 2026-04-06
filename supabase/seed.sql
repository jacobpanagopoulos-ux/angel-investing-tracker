-- Seed data from skill-tracker.md

-- Pillars
INSERT INTO pillars (id, name, subtitle, sort_order) VALUES
(1, 'Deal Evaluation', 'Hormozi Lens', 1),
(2, 'AI Pattern Recognition', 'Green & Red Flags', 2),
(3, 'Infrastructure Literacy', 'Picks & Shovels', 3);

-- Pillar 1 Concepts: Deal Evaluation
INSERT INTO concepts (pillar_id, number, title, status, notes, sort_order) VALUES
(1, 1, 'Value equation as due diligence filter', 'not_started', 'Already know from $100M Offers. Need to practice applying to external companies.', 1),
(1, 2, 'Money model analysis (attraction, upsell, downsell, continuity)', 'not_started', 'Already know from Money Models. Need to evaluate 5+ real companies.', 2),
(1, 3, 'LTV architecture assessment', 'not_started', '6 LTV levers research complete. Need to apply to AI company financials.', 3),
(1, 4, 'Churn diagnostics on external companies', 'not_started', 'Churn playbook complete. Need to learn how to spot churn signals from outside.', 4),
(1, 5, 'Sales funnel health from limited data', 'not_started', '5-metric framework known. How do you assess this without internal access?', 5),
(1, 6, 'Unit economics and margin analysis', 'not_started', NULL, 6),
(1, 7, 'Founder evaluation framework', 'not_started', 'What separates founders who can execute from those who can''t?', 7),
(1, 8, 'Enterprise value injection (Hormozi portfolio model)', 'not_started', 'How to identify what to inject (offer, ops, distribution) to grow EV post-investment.', 8),
(1, 9, 'Deal structure basics (SAFEs, convertible notes, priced rounds)', 'not_started', NULL, 9),
(1, 10, 'Cap table literacy', 'not_started', NULL, 10);

-- Pillar 3 Concepts: Infrastructure Literacy
INSERT INTO concepts (pillar_id, number, title, status, notes, sort_order) VALUES
(3, 1, 'Vector databases (Pinecone, Weaviate, Chroma, Qdrant)', 'not_started', 'What they do, when they matter, market dynamics.', 1),
(3, 2, 'GPU cloud providers (CoreWeave, Lambda, Together AI)', 'not_started', 'Business models, pricing, competitive landscape.', 2),
(3, 3, 'Foundation model economics (training vs. inference costs)', 'not_started', 'Cost curves, who benefits from price drops, margin structures.', 3),
(3, 4, 'Hardware supply chain (NVIDIA, TSMC, custom silicon)', 'not_started', 'AMD, Intel, AWS Graviton, Google TPU, Apple Silicon.', 4),
(3, 5, 'Energy and data centers', 'not_started', 'Power contracts, nuclear/SMR plays, cooling tech, geographic constraints.', 5),
(3, 6, 'Model hosting and serving (inference optimization)', 'not_started', 'vLLM, TensorRT, quantization, distillation.', 6),
(3, 7, 'Data infrastructure (labeling, cleaning, synthetic data)', 'not_started', 'Scale AI, Snorkel, synthetic data companies.', 7),
(3, 8, 'AI developer tools (eval frameworks, observability, orchestration)', 'not_started', 'LangSmith, Braintrust, Weights & Biases, Helicone.', 8),
(3, 9, 'Edge AI and on-device inference', 'not_started', 'Qualcomm, MediaTek, Apple Neural Engine.', 9),
(3, 10, 'Regulatory landscape (EU AI Act, US executive orders)', 'not_started', 'How regulation creates moats and kills companies.', 10);

-- Green Flags
INSERT INTO flags (type, number, signal, status, notes, sort_order) VALUES
('green', 1, 'Proprietary data flywheel (more users = better model)', 'learning', NULL, 1),
('green', 2, 'Workflow is the product, not the model', 'learning', 'Sentinel is an example: compliance logic is the moat, not the LLM.', 2),
('green', 3, 'Defensible against foundation model price drops', 'not_started', 'If GPT-5 is 10x cheaper, does the company get stronger or weaker?', 3),
('green', 4, 'High switching costs / deep integration', 'not_started', NULL, 4),
('green', 5, 'Domain expertise on the team (not just ML engineers)', 'not_started', NULL, 5),
('green', 6, 'Gross margin trajectory improving over time', 'not_started', 'Inference costs dropping = margins expanding? Or are they passing savings to customers?', 6),
('green', 7, 'Clear wedge into a specific vertical', 'not_started', 'Horizontal AI = race to the bottom. Vertical AI = defensible.', 7),
('green', 8, 'Network effects (two-sided or data)', 'not_started', NULL, 8);

-- Red Flags
INSERT INTO flags (type, number, signal, status, notes, sort_order) VALUES
('red', 1, 'Thin wrapper over an API (no proprietary logic)', 'aware', NULL, 1),
('red', 2, '"AI" label on a rules-based system', 'not_started', NULL, 2),
('red', 3, 'No clear moat when model costs drop 10x', 'not_started', NULL, 3),
('red', 4, 'Team is all ML, no domain experts', 'not_started', NULL, 4),
('red', 5, 'Metrics are vanity (users, not revenue or retention)', 'not_started', NULL, 5),
('red', 6, 'Customer concentration risk (1-2 big clients)', 'not_started', NULL, 6),
('red', 7, 'Burn rate with no path to profitability', 'not_started', NULL, 7),
('red', 8, 'Competing directly with foundation model providers', 'not_started', 'Building what OpenAI/Anthropic/Google will bundle for free.', 8);

-- Research Queue: Priority
INSERT INTO research_queue (priority, sort_order, source_name, source_type, why, is_complete) VALUES
('priority', 1, 'Chamath Palihapitiya (All-In Podcast)', 'Podcast / clips', 'How he evaluates AI companies, SPAC frameworks, macro AI thesis.', false),
('priority', 2, 'Elad Gil (High Growth Handbook)', 'Book / interviews', 'Angel investing mechanics, AI-specific deal flow, startup evaluation.', false),
('priority', 3, 'a16z AI content (AI playbook, market maps)', 'Blog / reports', 'Infrastructure layer maps, where value accrues, market structure.', false),
('priority', 4, 'Jason Calacanis (This Week in Startups)', 'Podcast', 'Angel investing tactics, deal flow, red flag pattern matching.', false),
('priority', 5, 'David Friedberg (All-In Podcast)', 'Podcast / clips', 'Science-based AI investing, infrastructure plays, energy + AI.', false);

-- Research Queue: Backlog
INSERT INTO research_queue (priority, sort_order, source_name, source_type, why, is_complete) VALUES
('backlog', 6, 'Benchmark Capital (Bill Gurley essays)', 'Blog', 'Unit economics, marketplace dynamics, enterprise SaaS evaluation.', false),
('backlog', 7, 'Sequoia "Crucible Moments" series', 'Video', 'How iconic companies were evaluated early. Pattern recognition.', false),
('backlog', 8, 'NVIDIA earnings calls + Jensen Huang talks', 'Earnings / talks', 'Infrastructure demand signals, supply chain dynamics.', false),
('backlog', 9, 'Lenny Rachitsky (Lenny''s Podcast)', 'Podcast', 'Product-market fit evaluation, growth metrics, AI product patterns.', false),
('backlog', 10, 'Sam Altman blog posts (pre-OpenAI CEO era)', 'Blog', 'How YC evaluated startups, AI thesis formation.', false);

-- Milestones
INSERT INTO milestones (title, target, status, sort_order) VALUES
('Complete first 3 research breakdowns (any pillar)', 'Q2 2026', 'not_started', 1),
('Evaluate 5 real AI companies using the frameworks', 'Q3 2026', 'not_started', 2),
('Build a 1-page personal investment thesis', 'Q4 2026', 'not_started', 3),
('Evaluate 15+ companies, refine red/green flag list', 'Q1 2027', 'not_started', 4),
('First angel investment (if capital available)', '2027+', 'not_started', 5);

-- Session Log: Initial entry
INSERT INTO session_log (date, what_studied, key_insight, pillar_id) VALUES
('2026-03-31', 'Initial setup', 'Defined three pillars, built tracker, identified first research sources.', NULL);
