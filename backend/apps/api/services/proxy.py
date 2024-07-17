import urllib.parse

from fastapi import Request, Response
from httpx import AsyncClient
from starlette.datastructures import MutableHeaders

from ..settings.services import Service
from ..utils.logger import logger


class ProxyService:
    def __init__(self, request: Request, service: Service, path: str):
        self.request = request
        self.service = service
        self.path = path

    async def proxy(self):
        url = urllib.parse.urljoin(self.service.url, self.path)

        logger.info(f"Proxying request to {url}")

        method = self.request.method
        params = self.request.query_params

        content = await self.request.body()

        headers = MutableHeaders()

        async with AsyncClient() as client:
            response = await client.request(
                method,
                url,
                headers=headers,
                params=params,
                content=content,
            )

            return Response(
                content=response.content,
                status_code=response.status_code,
                headers=response.headers,
            )
