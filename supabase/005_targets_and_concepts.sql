-- Add verified targets and updated concepts from Gemini deep dive

-- Update Energy Compliance thesis with verified operational data
UPDATE theses SET
  key_data_points = '- NY Senate Bill S9144: REAL, introduced Feb 6 2026, in Environmental Conservation Committee. Sponsor: Sen. Liz Krueger + 10 co-sponsors.
- LL97 fine for 10MW data center: $5.9M/year (verified math: 22,781 tons CO2e - 634 ton allowance = 22,147 excess × $268)
- RDP certification cost: $10K-$25K per filing. RDPs spend 70% of time cleaning meter data.
- High Intensity Use Exemption: $3,540 application fee, requires sub-metered proof of >50% industrial load
- BEAM Portal filing deadline: May 1 each year
- Energy broker commission: $0.002/kWh = $156K/year per 10MW client
- Surety bond real cost: ~$1,000/year (not $50K-$100K out of pocket)
- Adjacent state bills: VA SB 288, NJ S4001/A5649, CA SB 1305
- Enity white-label does NOT handle LL97-specific coefficients natively. Custom layer needed.
- 8 operating major data centers + 13 planned in NY (~3,200 MW total)',
  updated_at = now()
WHERE id = 'a1b2c3d4-4444-4000-8000-000000000004';

-- Add the 5 verified target companies to watchlist
INSERT INTO watchlist (company_name, ticker, sector, opportunity_type, why_watching, thesis_id) VALUES
('TeraWulf', 'WULF', 'Data Center (Crypto/AI)', 'watch', 'Lake Mariner facility, Niagara, 70MW. Public company. Potential early target for LL97 compliance SaaS or energy brokerage. Check 2025/2026 sustainability report.', 'a1b2c3d4-4444-4000-8000-000000000004'),
('DataBank', NULL, 'Data Center (Colocation)', 'watch', 'LGA3 facility, Rockland County, 40MW. Private. Mid-market colo = ideal ICP. Director of Environmental Compliance is the buyer.', 'a1b2c3d4-4444-4000-8000-000000000004'),
('Sabey Data Centers', NULL, 'Data Center (Colocation)', 'watch', '375 Pearl St, Manhattan, 40MW. Private. NYC location = LL97 applies directly. Facility Manager / Energy Engineer is the contact.', 'a1b2c3d4-4444-4000-8000-000000000004'),
('Digital Realty', 'DLR', 'Data Center (REIT)', 'watch', '111 8th Ave, NYC, 100MW+. Public REIT. Must report LL97 liabilities to SEC. VP of Global Energy & Sustainability is the buyer. Enterprise sale.', 'a1b2c3d4-4444-4000-8000-000000000004'),
('Equinix', 'EQIX', 'Data Center (REIT)', 'watch', 'NY4/NY5, Secaucus/Edge. Massive capacity. Public REIT. Director of Energy Procurement. Largest colo provider globally. Enterprise sale, long cycle.', 'a1b2c3d4-4444-4000-8000-000000000004');

-- Add to Energy Compliance thesis companies
INSERT INTO thesis_companies (thesis_id, company_name, ticker, role, notes) VALUES
('a1b2c3d4-4444-4000-8000-000000000004', 'TeraWulf', 'WULF', 'Target customer', '70MW Lake Mariner. Public. Crypto-to-AI pivot. First outreach candidate.'),
('a1b2c3d4-4444-4000-8000-000000000004', 'DataBank', NULL, 'Target customer', '40MW LGA3 Rockland. Private mid-market colo. Ideal ICP size.'),
('a1b2c3d4-4444-4000-8000-000000000004', 'Sabey Data Centers', NULL, 'Target customer', '40MW 375 Pearl St Manhattan. LL97 applies directly. High pain.'),
('a1b2c3d4-4444-4000-8000-000000000004', 'Digital Realty', 'DLR', 'Target customer', '100MW+ 111 8th Ave. REIT. SEC reporting requirement amplifies urgency.'),
('a1b2c3d4-4444-4000-8000-000000000004', 'Equinix', 'EQIX', 'Target customer', 'NY4/NY5. Largest global colo. Enterprise sale.'),
('a1b2c3d4-4444-4000-8000-000000000004', 'NRG', NULL, 'ESCO (broker partner)', 'Potential ESCO to send RFPs to when brokering energy deals.'),
('a1b2c3d4-4444-4000-8000-000000000004', 'Constellation Energy', 'CEG', 'ESCO (broker partner)', 'Both a nuclear investment thesis AND a potential ESCO partner for brokerage deals.');

-- Session log
INSERT INTO session_log (date, what_studied, key_insight, pillar_id) VALUES
('2026-04-05', 'Gemini operational deep dive: BEAM Portal, RDP bottleneck, 5 named targets, broker first-deal mechanics, adjacent state bills', 'The RDP certification bottleneck ($10-25K, 70% time on data cleanup) is the exact wedge for software. Discovery question targets May 1 LL97 deadline. S9144 hearings expected May 11 week. Written testimony = free credibility play. Broker first deal = LOA + ESCO RFP + $13K/month commission.', 3);
