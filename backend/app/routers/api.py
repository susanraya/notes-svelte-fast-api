"""Routes for API.

Endpoints the approved API spec declares without naming a component that owns them.

Every handler is a stub returning a typed placeholder. The shape comes from
the approved API spec; the behaviour does not exist yet.
"""

from fastapi import APIRouter

from app.schemas import StubResponse

router = APIRouter(tags=["API"])


@router.get("/health")
async def get_health() -> StubResponse:
    """Liveness/health check for the provisioned FastAPI service. Returns service status only; no
    note or personal data."""
    return StubResponse(endpoint="GET /health")
