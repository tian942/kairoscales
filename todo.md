# Project TODO

- [x] Upgrade project to full-stack (db, server, user features)
- [x] Add `leads` table to drizzle schema and push migration
- [x] Add `insertLead` and `getAllLeads` helpers to server/db.ts
- [x] Add `leads.submit` tRPC mutation (validates input, saves to DB, notifies owner)
- [x] Add `leads.list` tRPC query
- [x] Build LeadPopup component (dark space ninja theme, 4 fields, Calendly redirect on submit)
- [x] Replace all Calendly CTA buttons on Home.tsx with "First 10 AI Optimised Ads On Us →" popup triggers
- [x] Replace navbar "Book a Call" button with popup trigger
- [x] Replace footer "Book a Call" nav link with popup trigger
- [x] Write and pass vitest tests for leads logic
