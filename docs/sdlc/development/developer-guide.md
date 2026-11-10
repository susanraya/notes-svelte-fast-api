# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `8cf9f17` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
This is a generated 'notes' app scaffold with two independent apps in one repo: a Svelte 5 + Vite frontend that renders all approved screens against seeded sample data, and a FastAPI backend that currently exposes only a health check (its real routes/models were not yet approved when generated). The backend uses SQLAlchemy with a SQLite file by default (swap in Postgres via DATABASE_URL), and docker-compose provides a local Postgres 16 container for when that wiring happens.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js (for npm/Vite, Svelte 5, Vitest, Playwright)
- Python 3.12 (matches backend/Dockerfile base image)
- pip
- Docker and Docker Compose (optional, for the Postgres service in docker-compose.yml)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository
2. cd backend && pip install -r requirements.txt
3. cd frontend && npm install
4. (optional) docker compose up -d to start the local Postgres 16 database
5. (optional) set DATABASE_URL to point the backend at Postgres instead of the default SQLite file
6. (optional) set VITE_API_BASE_URL / VITE_API_SECRET_KEY for the frontend if pointing at a real backend
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev | `npm run dev` | Starts the Vite dev server for the Svelte frontend (run from frontend/) |
| frontend build | `npm run build` | Bundles the app for production (does not typecheck) |
| frontend preview | `npm run preview` | Serves the production build locally |
| backend dev | `uvicorn app.main:app --reload` | Runs the FastAPI backend with auto-reload (run from backend/) |
| db up | `docker compose up -d` | Starts the Postgres 16 container defined in docker-compose.yml |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `frontend` | Svelte 5 + Vite SPA; approved screens running on seeded sample data |
| `frontend/src` | App source: routing shell, screens, UI components, API client |
| `frontend/src/screens` | One Svelte component per approved screen (Notes, NoteDetail, Backup) |
| `frontend/src/lib` | Shared logic: API client (api.ts), notes logic, router, UI component library (ui/) |
| `frontend/e2e` | Playwright acceptance test specs |
| `backend` | FastAPI service; scaffolded with health check only, stub routes pending architecture approval |
| `backend/app` | Application code: main.py entrypoint, database.py engine/session, models.py, schemas.py, routers/ |
| `backend/tests` | Pytest test suite for the backend |
| `backend/scripts` | Utility scripts (e.g. check_connections.py) |
| `.devcontainer` | VS Code devcontainer configuration |
| `.quorq` | Quorq platform metadata (handoff/prepared state) |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend routes are organized one router per architecture component under app/routers/, registered with tags
- Unimplemented backend routes return a typed StubResponse (endpoint, status, detail) rather than erroring, so OpenAPI stays complete before handlers exist
- SQLAlchemy models all inherit from the shared Base in app/database.py; tables are created via Base.metadata.create_all on app startup (no migrations yet)
- Backend DB connection defaults to local SQLite (sqlite:///./app.db) and is overridden entirely via the DATABASE_URL env var
- CORS allowed origins are read from ALLOWED_ORIGINS (comma-separated) with localhost:5173 as the dev fallback
- Frontend screens are plain Svelte 5 components under src/screens/, one per approved screen, routed via src/lib/router.svelte.ts and registered in App.svelte
- Frontend component tests live beside the components they test (e.g. Notes.test.ts next to Notes.svelte)
- Frontend API calls go through the single apiFetch helper in src/lib/api.ts, which attaches a bearer token (session token or shared API secret)
- UI building blocks live in frontend/src/lib/ui/ as a shared component vocabulary; brand tokens in src/lib/brand.ts and CSS variables in src/index.css
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| frontend unit tests | `npm run test` | Runs Vitest component tests (jsdom) located beside components in src/ |
| frontend lint | `npm run lint` | Runs ESLint over the frontend app (gate used by the platform) |
| frontend typecheck | `npm run typecheck` | Runs svelte-check over the TypeScript in the frontend |
| frontend e2e | `npm run test:e2e` | Runs Playwright specs from frontend/e2e; builds/serves the app locally unless E2E_BASE_URL is set |
| frontend e2e browser install | `npm run test:e2e:install` | Installs the Chromium browser Playwright needs |
| backend tests | `pytest` | Runs the backend pytest suite (pytest.ini sets pythonpath=. and testpaths=tests) |
| backend lint | `ruff check .` | Lints the backend Python code |
| backend format | `ruff format .` | Formats the backend Python code |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Frontend can't reach the backend / CORS errors in the browser console | Set ALLOWED_ORIGINS on the backend to include the frontend's origin, and/or set VITE_API_BASE_URL on the frontend to point at the running backend (defaults to http://localhost:8000) |
| Backend fails to connect to Postgres | Ensure docker compose up -d has started the db service and set DATABASE_URL accordingly; with no DATABASE_URL the backend falls back to a local SQLite file (app.db), so it still runs without Postgres |
| `pytest` fails with ImportError for `app` | Run pytest from the backend/ directory so pytest.ini's pythonpath=. setting applies |
| Playwright e2e tests fail to launch a browser | Run `npm run test:e2e:install` first to fetch Chromium |
| `npm run build` succeeds but TypeScript errors are hidden | Build does not typecheck; run `npm run typecheck` separately to catch TS issues |
<!-- sdlc:auto:end troubleshooting -->
