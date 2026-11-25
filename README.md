# EsportsArena — Neon Arena Edition

React + Vite multi-game esports tournament portal with an interactive Three.js hero, tournament rulebook, existing player/admin screens, and an optional Express + MongoDB Atlas API.

## Included
- Existing EsportsArena pages: tournament discovery/details, registration demo flows, teams, leaderboards, player dashboard, admin dashboard, login and signup.
- Futuristic neon Three.js arena on the landing page (pointer-responsive camera, animated core/rings, floating objects, particle field and lighting).
- `/rulebook`: searchable, expandable competition rules; player acknowledgement stored in browser localStorage; Print / Save as PDF uses the browser print dialog.
- Express API in `server/`: MongoDB connection, JWT authentication, bcrypt password hashing, admin authorization, tournament CRUD, rulebook version endpoints, rate limiting, Helmet and CORS.
- Vercel SPA rewrite retained.

## Frontend setup
```bash
npm install
npm run dev
```
Open the Vite URL. Rulebook: `http://localhost:5173/rulebook`.

Production frontend build:
```bash
npm run build
npm run preview
```

## Backend + MongoDB Atlas setup
1. Create a MongoDB Atlas cluster and database user.
2. In Atlas Network Access, allow the IP address of the machine hosting the API (avoid `0.0.0.0/0` for production unless you understand the exposure).
3. Copy `server/.env.example` to `server/.env`.
4. Set `MONGODB_URI`, a long random `JWT_SECRET`, and unique `ADMIN_EMAIL` / `ADMIN_PASSWORD`. Never commit `.env`.
5. Install and run the API:
   ```bash
   cd server
   npm install
   npm run dev
   ```
6. Verify `http://localhost:5000/api/health`.
7. To point the frontend API helper at the backend, copy root `.env.example` to `.env` and set `VITE_API_BASE_URL=http://localhost:5000/api`, then restart Vite.

### API endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (Bearer token)
- `GET /api/tournaments`
- `GET /api/tournaments/:id`
- `POST /api/tournaments/:id/register` (authenticated player)
- `GET /api/teams`
- `POST /api/teams` (authenticated player)
- `DELETE /api/teams/:id` (captain or admin)
- `POST /api/tournaments` (admin)
- `PATCH /api/tournaments/:id` (admin)
- `DELETE /api/tournaments/:id` (admin)
- `GET /api/rulebook`
- `PUT /api/rulebook` (admin; creates a new version)

## Important integration boundary
The existing React application currently uses its original localStorage demo context for its screens. The new API and `src/services/api.js` are included as a secure backend foundation, but the existing UI authentication/tournament context has **not** been migrated to API-backed async state yet. Do not treat localStorage demo login or client-side admin role checks as production security. Before a public launch, wire the React context and admin UI to these endpoints, add server-side tournament registration/team membership rules, validate tournament-specific rules, and add tests.

## Deployment
- Frontend: deploy the project root to Vercel; `vercel.json` rewrites client-side routes to `index.html`.
- Backend: deploy `server/` separately to a Node hosting provider. Set its environment variables there, use the deployed frontend origin in `CLIENT_ORIGIN`, and set the frontend `VITE_API_BASE_URL` to the deployed API URL.
- Never expose MongoDB credentials or JWT secrets in frontend environment variables.

## Security
Demo accounts and mock data from the original frontend may still be present in localStorage. Clear old browser data when testing fresh behavior. Use unique strong credentials. The admin account is provisioned only from server environment variables; no default admin password is hard-coded in the API.

## Emerald Neon visual update
- Dark forest / emerald-green palette across navigation, cards, forms, dialogs, dashboards and the rulebook.
- Frosted translucent glass panels with green edge lighting and blur.
- Original generated sci-fi esports character artwork at `public/images/arena-heroes.webp` (generic original characters, not official game character assets).
- Shared lightweight Three.js ambient layer runs behind every route; the landing hero retains its animated Three.js centerpiece.
- Reduced-motion preference is respected by CSS. The global 3D layer is decorative and does not intercept clicks.

The new character artwork is an original visual inspired by the esports genre, not licensed character art from Valorant, BGMI, Apex, or other game publishers. Replace it with assets you have permission to use if you need official characters/logos.


## Admin trust & safety features

### Frontend demo
The Admin Dashboard includes:
- **Team Bans:** ban/unban teams with a mandatory reason and visible status.
- **Cheating Detection Center:** log a player, game, suspicion category, severity, description and evidence reference; move reports through Pending Review, Under Review, Resolved or Dismissed.
- Demo moderation state is persisted in browser localStorage (`gdt_teams` and `gdt_cheat_reports`).

### Backend endpoints (MongoDB persistence; admin JWT required)
- `PATCH /api/teams/:id/ban` with `{ "reason": "..." }`
- `PATCH /api/teams/:id/unban`
- `GET /api/admin/moderation/cheat-reports`
- `POST /api/admin/moderation/cheat-reports`
- `PATCH /api/admin/moderation/cheat-reports/:id`

**Integration status:** The React Admin Dashboard currently uses its localStorage demo context for moderation actions. The protected MongoDB endpoints are implemented as the production API foundation, but the UI has not yet been switched to call them. Wire the UI/context to these endpoints before multi-admin or production use; localStorage changes are browser-local and are not shared with other administrators.

**Cheating detection limitation:** This is an evidence/report review workflow, not an anti-cheat engine. It does not inspect processes, game memory, network packets or player input. Do not treat a report or heuristic flag as proof. Review match recordings, server telemetry and the game publisher's anti-cheat evidence before taking action.
"# Frontend_hackathon" 
