from pydantic import BaseModel, EmailStr, constr


class ContactBody(BaseModel):
    name: constr(min_length=1)
    message: constr(min_length=1)
    email: EmailStr
