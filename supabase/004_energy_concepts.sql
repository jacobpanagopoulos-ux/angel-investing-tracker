-- Add energy-specific concepts to existing pillars

-- Pillar 3: Infrastructure Literacy (new energy concepts)
INSERT INTO concepts (pillar_id, number, title, status, notes, sort_order) VALUES
(3, 11, 'NYC Local Law 97 compliance mechanics', 'not_started', 'BEAM Portal filing, RDP certification, May 1 deadline, Group B limits, High Intensity Use exemption. $268/ton penalty. A 10MW data center faces $5.9M/year in fines.', 11),
(3, 12, 'NY Senate Bill S9144 and data center moratorium landscape', 'not_started', 'Sponsored by Sen. Liz Krueger. 3-year moratorium on new data center permits. Currently in Environmental Conservation Committee. Track hearings.', 12),
(3, 13, 'Energy brokerage and ESCO regulations (NY PSC)', 'not_started', 'PSL §66-t registration. $500 fee + $50K surety bond for consultants, $100K for brokers. $0.001-$0.003/kWh commission. Cannot take ownership of electricity.', 13),
(3, 14, 'PUE (Power Usage Effectiveness) and data center efficiency metrics', 'not_started', 'Industry standard efficiency metric. PUE 1.0 = perfect. Average is 1.58. Google claims 1.1. Directly impacts LL97 emissions calculations.', 14),
(3, 15, 'Carbon credit and REC (Renewable Energy Credit) markets', 'not_started', 'RECs are the "out" for LL97 compliance. Understanding REC pricing, verification, and bundled vs unbundled RECs is critical for both SaaS and brokerage.', 15);

-- Pillar 1: Deal Evaluation (energy-specific)
INSERT INTO concepts (pillar_id, number, title, status, notes, sort_order) VALUES
(1, 11, 'Compliance SaaS TAM calculation methodology', 'not_started', 'Small building count (21 in NY) but massive per-customer value ($100K+/year). How to evaluate markets with few customers but high ARPU. NY first, then NJ/CA/VA expansion.', 11),
(1, 12, 'Service-to-software pipeline for regulated industries', 'not_started', 'Becker pattern: start as consultant, productize the workflow. Energy broker registration -> manual compliance work -> automate into SaaS. Validate demand before writing code.', 12);

-- New green flags for energy vertical
INSERT INTO flags (type, number, signal, status, notes, sort_order) VALUES
('green', 9, 'Regulatory tailwind creating forced demand', 'learning', 'LL97 fines are real and hitting Q2 2026. S9144 in committee. When the government forces compliance, customers MUST buy. No discretionary budget debate.', 9),
('green', 10, 'Pain measurable in exact dollar amounts', 'not_started', '$5.9M/year for a 10MW data center. When you can calculate the exact cost of non-compliance, the ROI sells itself. Same pattern as FMLA lawsuit cost.', 10);

-- New red flag
INSERT INTO flags (type, number, signal, status, notes, sort_order) VALUES
('red', 9, 'Regulation-dependent demand (bill might not pass)', 'not_started', 'If the product only works because of one bill, political risk kills the business. Must have multiple regulatory drivers (LL97 + S9144 + state expansions).', 9);

-- Update session log
INSERT INTO session_log (date, what_studied, key_insight, pillar_id) VALUES
('2026-04-05', 'Gemini pressure test: LL97 math, S9144 verification, competitive landscape, energy broker economics', 'A 10MW data center faces $5.9M/year in LL97 fines. The compliance workflow pattern is identical to Sentinel. Energy brokerage yields $78K-$234K/year per client. S9144 is real and in committee. Gap: no fine avoidance engine exists for NY data centers.', 3);
