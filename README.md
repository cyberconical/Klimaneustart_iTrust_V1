# Klimaneustart — Civic Dialogue Web App

Short: A full‑stack web app to collect civic dialogue input for urban/climate planning in Berlin. Frontend is a React + TypeScript app (Vite + MUI + styled‑components). Backend (in `server/`) is an Express API that stores dialogues and handles GDPR‑aware PII separation.

---

## Quick links
- Source root: [package.json](package.json)  
- Frontend entry: [index.tsx](src/index.tsx) (served by Vite)
- Styling: [index.css](index.css)  
- Constants & data: [constants.ts](constants.ts)  
- Translations / strings: [strings.js](strings.js)  
- Types: [types.ts](types.ts)  
- Steps / UI: [components/steps/](components/steps/)  
- UI components: [components/ui/](components/ui/)  
- Icons (public): [public/icons/](public/icons/) and [public/index.html](index.html)  
- Backend docs: [server/README.md](server/README.md)  
- Server code: [server/src/](server/src/)

---

## Tech stack
- Frontend: React 18 + TypeScript, Vite, Material UI (MUI), styled‑components, qrcode.react
- Backend: Node.js + Express (server/), MongoDB + Mongoose (current), planned PostgreSQL migration
- Deployment: Frontend on Vercel, Backend on Render
- Email: Nodemailer / SendGrid (example integration)
- Other: i18n via local `strings.js` + React Context

---

## Folder structure (high level)
- /src — frontend source (components, pages, services)
  - /components/steps — step flow UIs (Welcome, Topics, Initiatives, Consent, Metrics, Summary, ThankYou)
  - /components/ui — shared UI components (BottomNavigationBar, NavigationButton, etc.)
  - /services — API service wrappers (e.g., conversationService)
  - index.css — global fonts & CSS variables
  - constants.ts — colors, data constants, topics, initiatives, districts
  - strings.js — i18n strings
  - types.ts — shared TypeScript types
- /public — static assets (icons, fonts)
- /server — Express backend (separate repo area)
  - server/src/models — Mongoose models (Conversation, PIIContact)
  - server/src/routes — API routes (conversations)
  - server/README.md — server run & API details

---

## Run locally (frontend)
1. Install:
   ```
   npm install
   ```
2. Dev:
   ```
   npm run dev
   ```
3. Build:
   ```
   npm run build
   npm run preview
   ```

See [package.json](package.json) for scripts.

Run backend (from `server/`):
1. Copy `.env.example` → `.env`, fill values (DB URI, email keys).
2. Install and run:
   ```
   cd server
   npm install
   npm run dev
   ```

See [server/README.md](server/README.md) for detailed API and GDPR notes.

---

## Environment variables (summary)
Frontend may use `.env.local` for runtime flags (Vite). Backend `.env` (server) commonly contains:
- MONGO_URI (or DATABASE_URL for Postgres migration)
- SENDER_EMAIL / SENDGRID_API_KEY (for email)
- Other app secrets

Always keep credentials out of source control.

---

## API (brief)
Primary ingestion endpoint (server):
- `POST /api/v1/conversations` — create/update conversation. If `shareContact` true and PII provided, PII is stored encrypted in separate collection and linked by reference.
- `GET /api/v1/conversations/:id` — returns conversation without PII.
- `DELETE /api/v1/conversations/:id/pii` — erase PII for a conversation.
- `DELETE /api/v1/conversations/:id` — delete conversation and linked PII.

See [server/README.md](server/README.md) and [server/src/routes/conversations.js](server/src/routes/conversations.js) for implementation.

---

## Notable implementation points
- i18n: `strings.js` + `LanguageContext` — all UI text uses translation keys.
- Fonts: custom fonts loaded via `@font-face` in `index.css`; MUI theme should be configured to use them for MUI components.
- Icons: app mixes MUI SVG icons and static image icons (`public/icons/`) — components detect string path vs. component and render `<img>` or MUI icon accordingly.
- GDPR: PII (contact info) is stored separately and encrypted. Server has endpoints to delete PII.
- QR codes: `qrcode.react` generates scannable thumbnails in the initiatives list and full modal view.
- Centralized navigation styling: `components/ui/NavigationButton.tsx` (single source for Back/Next button styles) — replace repetitive styled definitions across steps.

---

## Responsive & accessibility notes
- MUI `sx` used for responsive breakpoints (`flexDirection: { xs: 'column', sm: 'row' }`) in cards and layout.
- Inputs: number inputs use local string state to avoid "stubborn 0" UX issue on mobile.
- Ensure icons/images in `public/icons` are properly sized and accessible via correct paths (`/icons/...`).

---

## Deployment
- Frontend built and deployed to **Vercel** (connected to repo).
- Backend deployed to **Render** (Express + MongoDB). Configure CORS and environment vars so frontend (Vercel) can call backend endpoints.
- Mail sending configured via SendGrid / Nodemailer on server; add `SENDGRID_API_KEY` and `SENDER_EMAIL` on Render.

---

## Migration notes (MongoDB → PostgreSQL)
- The project currently uses Mongoose models and MongoDB. Migration will require:
  - Designing relational schema (conversations, pii_contacts, initiatives, topics, users).
  - Rewriting models (Sequelize / Knex) and queries in `server/src/routes`.
  - Updating environment variables (`DATABASE_URL`) and connection logic.
- See `db and tables.md` for a drafted schema.

---

## Troubleshooting & tips
- If custom fonts don't load: ensure font files are in `public/assets/fonts/` and `@font-face` paths in `index.css` use `/assets/fonts/...`.
- If icons show MUI defaults: check `constants.ts` — ensure icon fields are either MUI components or string paths and rendering logic in components handles both.
- To change Back button color globally: update `components/ui/NavigationButton.tsx` rather than multiple step files.

---

## Contributors / commits
Primary development by Sanket (GitHub: `Sanket758`, `sanketingermany`). See Git history for per‑commit details. (For a weekly changelog, run `git log --pretty=format:'%ad %h %s' --date=short` and group by date ranges.)

---

## Changelog (summary)
High level weekly summary (example — replace with real git-derived entries):
- Week 1: Project scaffolded (Vite + React + MUI), initial step flow implemented.
- Week 2: Topics & initiatives lists added; i18n strings added.
- Week 3: QR code thumbnails + modal; PII separation and server endpoints added.
- Week 4: UX fixes (responsive cards, number inputs), centralized NavigationButton refactor.
- Week 5: Email "send summary" integration added (Nodemailer/SendGrid), deployments configured (Vercel + Render).
*(Use git history to refine exact dates and messages.)*

---

## How to contribute
1. Fork and create a feature branch.
2. Follow existing coding patterns (TypeScript types in `types.ts`, i18n keys in `strings.js`).
3. Add unit tests where appropriate.
4. Open a PR with summary and testing steps.

---

## License
For this phase we have chosen the MIT License. We want to build and grow with the community!
