from fastapi import APIRouter, Request

from shared.exceptions import NotFound
from ..services.proxy import ProxyService
from ..settings.services import services


router = APIRouter(tags=["proxy"])

methods = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD", "TRACE"]


@router.api_route("/{app}/{path:path}", methods=methods, include_in_schema=False)
async def proxy(request: Request, app: str, path: str):
    service = next((service for service in services if service == app), None)

    if not service:
        raise NotFound(f"Service '{app}' not found")

    proxy_service = ProxyService(
        request=request,
        service=service,
        path=path,
    )

    return await proxy_service.proxy()
