# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `918f1d7` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
This is a generated starter for a simple notes app with two independently runnable parts in one repo: a Svelte 5 + Vite frontend containing approved, reviewed screens that currently render seeded sample data, and a FastAPI backend scaffold that only exposes a health check endpoint (no data model or business routes have been approved/generated yet). The approved stack targets PostgreSQL 16 and AWS, but the backend defaults to a local SQLite file so it runs with zero external services, and a docker-compose file is provided to run Postgres locally when wiring the frontend to real endpoints begins.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js (for Vite 6 / npm scripts)
- npm
- Python 3.12
- pip
- Docker and Docker Compose (optional, for a local Postgres instance via docker-compose.yml)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository.
2. Backend: cd backend && pip install -r requirements.txt
3. Frontend: cd frontend && npm install
4. (Optional, for Postgres instead of the SQLite default) from the repo root run: docker-compose up -d db
5. Start the backend API: cd backend && uvicorn app.main:app --reload
6. Start the frontend dev server: cd frontend && npm run dev
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| backend dev | `uvicorn app.main:app --reload` | Runs the FastAPI app from backend/ with auto-reload; serves /health and the OpenAPI docs. |
| frontend dev | `npm run dev` | Starts the Vite dev server for the Svelte app (run from frontend/). |
| frontend build | `npm run build` | Bundles the frontend for production (does not typecheck). |
| frontend preview | `npm run preview` | Serves the production build locally. |
| db (compose) | `docker-compose up -d db` | Starts a local PostgreSQL 16 container (user/pass/db: app) for when DATABASE_URL is pointed at Postgres. |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `backend/` | FastAPI service scaffold: app package, routers, models, schemas, tests, Dockerfile. |
| `backend/app` | Application code: main.py (entrypoint + /health), database.py (engine/session), models.py, schemas.py, routers/. |
| `backend/tests` | Pytest suite and fixtures (conftest.py), currently covering the health check. |
| `frontend/` | Vite + Svelte 5 app: approved screens, design-system UI components, router, API client. |
| `frontend/src/lib` | Shared frontend code: api.ts (API client), router.svelte.ts/navigate.ts, and the ui/ component library. |
| `frontend/e2e` | Playwright end-to-end specs. |
| `.devcontainer` | VS Code/devcontainer configuration for a consistent dev environment. |
| `.quorq` | Quorq platform metadata (handoff.json) for this generated project. |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend: one router per architecture component that owns endpoints; every generated route currently returns a typed StubResponse until implemented.
- Backend: SQLAlchemy models declare tables by inheriting the shared `Base` in app/database.py; `main.py` imports models before calling create_all.
- Backend: request-scoped DB sessions via the `get_db` dependency generator, one session per request.
- Backend: DATABASE_URL env var selects the database (SQLite file by default, Postgres in production); ALLOWED_ORIGINS env var (comma-separated) configures CORS, defaulting to the local Vite origins.
- Frontend: one Svelte component per approved screen; `src/lib/ui/` holds the shared component/icon vocabulary all screens are built against.
- Frontend: `apiFetch` in src/lib/api.ts centralizes API calls, base URL (VITE_API_BASE_URL) and bearer auth (VITE_API_SECRET_KEY / session token in localStorage) — screens do not yet call it, they render seeded data.
- Frontend: Prettier + ESLint (flat config) enforce formatting/lint rules across the app.
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| backend test | `cd backend && pytest` | Runs the pytest suite (pythonpath=. set in pytest.ini) against the FastAPI app, with pytest-cov available for coverage. |
| backend lint | `cd backend && ruff check .` | Lints the backend Python code with Ruff. |
| backend format | `cd backend && ruff format .` | Formats backend Python code with Ruff. |
| frontend test | `cd frontend && npm test` | Runs Vitest component tests (Testing Library for Svelte) in jsdom, with v8 coverage. |
| frontend lint | `cd frontend && npm run lint` | Runs ESLint over the whole frontend app; this is the gate the platform checks during development. |
| frontend format check | `cd frontend && npm run format:check` | Checks formatting with Prettier without writing changes. |
| frontend e2e | `cd frontend && npm run test:e2e` | Runs Playwright acceptance tests from e2e/; without E2E_BASE_URL set it boots the backend (uvicorn) and the built/previewed frontend itself. |
| install e2e browsers | `cd frontend && npm run test:e2e:install` | Installs the Chromium browser Playwright needs before running e2e tests. |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Frontend dev server calls fail with a CORS error. | Ensure the backend is running and, if the frontend isn't served from localhost:5173/127.0.0.1:5173, set the backend's ALLOWED_ORIGINS env var to a comma-separated list including the frontend's origin. |
| `pytest` run from backend/ fails to `import app`. | Run pytest from the backend/ directory so pytest.ini's `pythonpath = .` applies, or run it as `cd backend && pytest`. |
| Frontend never reaches the real backend (always seeded data / wrong host). | Set VITE_API_BASE_URL (and VITE_API_SECRET_KEY if the API requires the shared bearer) before building/running the frontend; it defaults to http://localhost:8000. |
| `npm run test:e2e` fails because Chromium isn't installed. | Run `npm run test:e2e:install` once before running the e2e suite. |
| Backend can't connect to Postgres. | Start it with `docker-compose up -d db` from the repo root and point DATABASE_URL at it; otherwise the backend falls back to a local SQLite file (app.db) with no server needed. |
<!-- sdlc:auto:end troubleshooting -->
