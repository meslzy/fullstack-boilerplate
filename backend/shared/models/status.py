from pydantic import BaseModel


class Status(BaseModel):
    status: bool
    service: str
