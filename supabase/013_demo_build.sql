-- Demo build session log and milestone update

INSERT INTO session_log (date, what_studied, key_insight, pillar_id) VALUES
('2026-04-06', 'Gemini: Tailwind/Tremor component code, Hudson Digital SQL seed, real-time ticker math', 'Penalty ticker: $0.86/sec at 40MW (11.11 kWh/s × 0.000288962 × $268). setInterval at 100ms, +$0.086 per tick. Exemption dial: Recharts half-donut PieChart. Demo flow: show $5.2M bleeding -> show 48% ineligible -> slide to 51% -> $3.4M swing. Hudson Digital seed SQL corrected for actual schema columns. Components: Tremor Card+Metric for ticker, Recharts PieChart for gauge.', NULL);

UPDATE milestones SET status = 'in_progress' WHERE title = 'Build Sentinel Energy Module MVP (5 screens, demo-ready)';
