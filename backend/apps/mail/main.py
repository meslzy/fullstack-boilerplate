from fastapi import FastAPI

from shared.exceptions import exception_handlers
from shared.setup import setup_app
from .routers import status, sender


app = FastAPI(
    root_path="/api/mail",
    docs_url=None,
    redoc_url=None,
    exception_handlers=exception_handlers
)

app.include_router(status.router)
app.include_router(sender.router)

setup_app(app)
