# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `a327729` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
This is a generated two-app repository: a Svelte 5 + Vite frontend containing the approved, reviewed UI screens for a login-free notes app, currently running entirely on seeded sample data; and a FastAPI backend that only provides a health check, since no backend architecture had been approved when the repo was created. The backend uses SQLAlchemy over SQLite by default (via DATABASE_URL) and ships a docker-compose file for a local PostgreSQL 16 instance for when the approved Postgres architecture is wired up.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js (for Vite 6 / Svelte 5 frontend tooling)
- Python 3.12 (matches backend/Dockerfile base image)
- pip
- Docker and Docker Compose (for the PostgreSQL service in docker-compose.yml)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository
2. cd frontend && npm install
3. cd backend && pip install -r requirements.txt
4. (optional) docker compose up -d db -- starts PostgreSQL 16 if DATABASE_URL will point at Postgres instead of the default SQLite
5. cd backend && uvicorn app.main:app --reload -- starts the API on http://localhost:8000
6. cd frontend && npm run dev -- starts the Vite dev server on http://localhost:5173
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev | `npm run dev` | Starts the Vite dev server for the Svelte frontend |
| frontend build | `npm run build` | Bundles the app with Vite (does not typecheck) |
| frontend preview | `npm run preview` | Serves the production build locally |
| backend dev | `uvicorn app.main:app --reload` | Runs the FastAPI app with auto-reload (run from backend/) |
| db up | `docker compose up -d db` | Starts the PostgreSQL 16 container defined in docker-compose.yml |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `frontend/` | Vite + Svelte 5 app containing the approved screens, running on seeded sample data |
| `frontend/src` | App source: screens, shared lib (API client, router, brand), UI component vocabulary |
| `frontend/e2e` | Playwright acceptance tests run against a built/served frontend and the backend |
| `backend/` | FastAPI service scaffold: only a health endpoint is implemented |
| `backend/app` | Application package: main.py entrypoint, database.py (engine/session), models.py, schemas.py, routers/ |
| `backend/tests` | Pytest suite (currently covers the health check) |
| `backend/scripts` | Operational scripts, e.g. check_connections.py |
| `docker-compose.yml` | Defines a local PostgreSQL 16 service for development |
| `.devcontainer/` | VS Code devcontainer configuration |
| `README.md / ENVIRONMENT.md` | Top-level setup and environment documentation |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend: one APIRouter per approved architecture component under backend/app/routers/, registered endpoints return a typed StubResponse until implemented
- Backend models inherit SQLAlchemy's Base from app.database; schemas are separate Pydantic models in schemas.py
- Database tables are created from models at app startup (Base.metadata.create_all in the lifespan handler), not via migrations
- DATABASE_URL env var selects the database; defaults to local SQLite (sqlite:///./app.db) when unset
- CORS origins come from the ALLOWED_ORIGINS env var (comma-separated), falling back to the local Vite dev server origins
- Frontend screens live one-per-file under src/screens/, routed via a path table in App.svelte and src/lib/router.svelte.ts
- Frontend currently renders seeded sample data; src/lib/api.ts is the prepared seam (apiFetch, bearer auth, VITE_API_BASE_URL) for wiring screens to the real API
- Shared UI primitives live under frontend/src/lib/ui/, one Svelte component per file
- Frontend component tests live beside the component they cover (e.g. Notes.svelte / Notes.test.ts); Playwright specs live separately under e2e/
- Brand/theme values are centralized in src/lib/brand.ts and CSS variables in src/index.css
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| frontend unit tests | `npm run test` | Runs Vitest component tests (Testing Library for Svelte) under src/ |
| frontend typecheck | `npm run typecheck` | Runs svelte-check over the TypeScript in the app |
| frontend lint | `npm run lint` | Runs ESLint over the whole frontend app (CI gate) |
| frontend format check | `npm run format:check` | Checks formatting with Prettier |
| frontend e2e install | `npm run test:e2e:install` | Installs the Chromium browser for Playwright |
| frontend e2e | `npm run test:e2e` | Runs Playwright acceptance tests from e2e/, booting backend and frontend if E2E_BASE_URL is unset |
| backend tests | `pytest` | Runs the backend test suite (run from backend/, uses pytest.ini's pythonpath=.) |
| backend lint | `ruff check .` | Lints the backend with Ruff |
| backend format | `ruff format .` | Formats backend code with Ruff |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| `pytest` fails with ModuleNotFoundError: app | Run pytest from the backend/ directory so pytest.ini's `pythonpath = .` takes effect |
| Frontend calls to the backend are blocked by CORS | Set the ALLOWED_ORIGINS env var on the backend to the frontend's origin (comma-separated if multiple); defaults only allow localhost:5173/127.0.0.1:5173 |
| `npm run test:e2e` fails to start the backend webServer | The Playwright config expects a virtualenv at backend/.venv with dependencies installed (`cd backend && python -m venv .venv && .venv/bin/pip install -r requirements.txt`), since it runs `.venv/bin/python -m uvicorn ...` |
| Backend fails to start when DATABASE_URL points at Postgres | Ensure the Postgres container is up first: `docker compose up -d db`, and that DATABASE_URL matches its user/password/db (app/app/app) and port 5432 |
<!-- sdlc:auto:end troubleshooting -->
