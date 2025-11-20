## SchoolAgent

AI-powered Next.js 14 web app that helps parents centralize every school communication. Features:

- Marketing landing page showcasing the agent workflow
- Supabase authentication + child profile management
- Gemini-powered parsing of Gmail, PDFs, and attachments
- Secure Gmail + Google Calendar integrations
- Dashboard for reviewing tasks/events before syncing

### Getting Started

```bash
npm install
npm run dev
```

### Environment variables

Create `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
GEMINI_MODEL=gemini-1.5-pro
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
GOOGLE_REFRESH_TOKEN=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Supabase schema

Apply `supabase/schema.sql` to provision:

- `profiles` (1:1 with `auth.users`)
- `children` (per-child metadata)
- `tasks` (AI to-dos)
- `events` (calendar items)
- `documents` (uploaded PDFs)

### Deployment

- Frontend: Vercel (Next.js App Router, edge-friendly routes)
- Database + auth + storage: Supabase
- Secrets: configure in Vercel dashboard + Supabase project settings

### Integrations overview

| Integration | Purpose | Where |
|-------------|---------|-------|
| Gemini API | Parse emails & PDFs into structured tasks/events | `lib/ai.ts`, `/api/agent`, `/api/upload` |
| Supabase | Auth, profiles, children, tasks, events, storage | `lib/supabase/*`, dashboard server components |
| Gmail API | Read school emails via OAuth | `/api/google/gmail`, `lib/google.ts` |
| Google Calendar API | Insert approved events | `/api/google/calendar`, dashboard actions |
| Supabase Storage | Store uploaded PDFs securely | `/api/upload` |

### Scripts

- `npm run dev` – local dev server
- `npm run build && npm start` – production build
- `npm run lint` – Next.js linting
- `npm run format` – Prettier

### Folder structure

```
app/
  (auth)/login|signup
  (dashboard)/dashboard
  api/agent|google|upload
  globals.css, layout.tsx, page.tsx
components/
  dashboard/*, forms/*, landing/*, layout/*
lib/
  ai.ts, constants.ts, google.ts, supabase/, types/, utils.ts
supabase/schema.sql
```
