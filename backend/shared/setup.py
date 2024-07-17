import time

from fastapi import FastAPI, Request
from fastapi.exceptions import HTTPException, RequestValidationError
from fastapi.openapi.docs import (
    get_swagger_ui_html,
    get_redoc_html
)
from fastapi.responses import JSONResponse
from pydantic import ValidationError as PydanticValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from shared.config.environment import is_development
from shared.exceptions import CustomException, ValidationError, InternalServerError


def setup_app(app: FastAPI):
    if is_development():
        @app.get("/docs", include_in_schema=False)
        async def docs():
            return get_swagger_ui_html(
                openapi_url="openapi.json",
                title="Swagger UI",
            )

        @app.get("/redoc", include_in_schema=False)
        async def redoc():
            return get_redoc_html(
                openapi_url="openapi.json",
                title="ReDoc",
            )

    @app.middleware("http")
    async def add_process_time_header(request: Request, call_next):
        start_time = time.time()
        response = await call_next(request)
        process_time = time.time() - start_time
        response.headers["X-Process-Time"] = str(process_time)
        return response

    @app.exception_handler(PydanticValidationError)
    def handle_pydantic_validation_error(request: Request, exception: PydanticValidationError):
        exception = ValidationError(
            message=f"Validation Error: {exception.error_count()}",
            errors=exception.errors(),
        )

        return JSONResponse(
            status_code=exception.status_code,
            content=exception.to_dict,
        )

    @app.exception_handler(CustomException)
    def handle_custom_exception(request: Request, exception: CustomException):
        return JSONResponse(
            status_code=exception.status_code,
            content=exception.json,
        )

    @app.exception_handler(RequestValidationError)
    def handle_request_validation_error(request: Request, exception: RequestValidationError):
        exception = ValidationError(
            message=f"Validation Error: {len(exception.errors())}",
            errors=list(exception.errors()),
        )

        return JSONResponse(
            status_code=exception.status_code,
            content=exception.to_dict,
        )

    @app.exception_handler(StarletteHTTPException)
    def handle_starlette_http_exception(request: Request, exception: StarletteHTTPException):
        return JSONResponse(
            status_code=exception.status_code,
            content={
                "type": "StarletteHTTPException",
                "message": exception.detail,
            },
        )

    @app.exception_handler(HTTPException)
    def handle_http_exception(request: Request, exception: HTTPException):
        return JSONResponse(
            status_code=exception.status_code,
            content={
                "type": "HTTPException",
                "message": exception.detail,
            },
        )

    @app.exception_handler(Exception)
    def handle_exception(request: Request, exception: Exception):
        exception = InternalServerError(str(exception))

        return JSONResponse(
            status_code=exception.status_code,
            content=exception.json,
        )
