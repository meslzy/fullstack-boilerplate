from fastapi import APIRouter

from ..models.sender import ContactBody
from ..services.sender import send_contact_email


router = APIRouter(tags=["sender"])


@router.post("/contact", status_code=200)
def contact(body: ContactBody):
    response = send_contact_email(body.name, body.message, body.email)
    return response
