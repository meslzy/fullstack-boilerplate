from fastapi import APIRouter

from shared.models.status import Status


router = APIRouter(tags=["status"])


@router.get("/", status_code=200, response_model=Status)
def status():
    return Status(status=True, service="mail")
