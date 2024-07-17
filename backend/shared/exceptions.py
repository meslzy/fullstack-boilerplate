import abc
from http import HTTPStatus

from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from pydantic import ValidationError as PydanticValidationError


class CustomException(Exception, metaclass=abc.ABCMeta):
    code: str
    status_code: int
    description: str

    @property
    @abc.abstractmethod
    def json(self):
        pass


# client error | 400 <= status <= 499
class BadRequest(CustomException):
    code = "BAD_REQUEST"
    status_code = HTTPStatus.BAD_REQUEST
    description = HTTPStatus.BAD_REQUEST.description

    def __init__(self, message: str):
        self.message = message

    @property
    def json(self):
        return {
            "code": self.code,
            "message": self.message,
            "status_code": self.status_code,
            "description": self.description,
        }

    @staticmethod
    def handler(request: Request, exception: HTTPException):
        exception = BadRequest(exception.detail)

        return JSONResponse(
            status_code=exception.status_code,
            content=exception.json,
        )


class ValidationError(BadRequest):
    code = "VALIDATION_ERROR"

    def __init__(self, message: str, errors: list):
        super().__init__(message)
        self.errors = errors

    @staticmethod
    def handler(request: Request, exception: PydanticValidationError):
        exception = ValidationError(
            message="Validation Error",
            errors=exception.errors(),
        )

        return JSONResponse(
            status_code=exception.status_code,
            content=exception.to_dict,
        )

    @property
    def to_dict(self):
        return {
            "code": self.code,
            "message": self.message,
            "status_code": self.status_code,
            "description": self.description,
            "errors": self.errors,
        }


class NotFound(CustomException):
    code = "NOT_FOUND"
    status_code = HTTPStatus.NOT_FOUND
    description = HTTPStatus.NOT_FOUND.description

    def __init__(self, message: str):
        self.message = message

    @property
    def json(self):
        return {
            "code": self.code,
            "message": self.message,
            "status_code": self.status_code,
            "description": self.description,
        }

    @staticmethod
    def handler(request: Request, exception: HTTPException):
        exception = NotFound(exception.detail)

        return JSONResponse(
            status_code=exception.status_code,
            content=exception.json,
        )


class MethodNotAllowed(CustomException):
    code = "METHOD_NOT_ALLOWED"
    status_code = HTTPStatus.METHOD_NOT_ALLOWED
    description = HTTPStatus.METHOD_NOT_ALLOWED.description

    def __init__(self, message: str):
        self.message = message

    @property
    def json(self):
        return {
            "code": self.code,
            "message": self.message,
            "status_code": self.status_code,
            "description": self.description,
        }

    @staticmethod
    def handler(request: Request, exception: HTTPException):
        exception = MethodNotAllowed(exception.detail)

        return JSONResponse(
            status_code=exception.status_code,
            content=exception.json,
        )


# server error | 500 <= status <= 599
class InternalServerError(CustomException):
    code = "INTERNAL_SERVER_ERROR"
    status_code = HTTPStatus.INTERNAL_SERVER_ERROR
    description = HTTPStatus.INTERNAL_SERVER_ERROR.description

    def __init__(self, message: str):
        self.message = message

    @property
    def json(self):
        return {
            "code": self.code,
            "message": self.message,
            "status_code": self.status_code,
            "description": self.description,
        }

    @staticmethod
    def handler(request: Request, exception: HTTPException):
        exception = InternalServerError(exception.detail)

        return JSONResponse(
            status_code=exception.status_code,
            content=exception.json,
        )


exception_handlers = {
    # client error | 400 <= status <= 499
    400: BadRequest.handler,
    404: NotFound.handler,
    405: MethodNotAllowed.handler,
    # server error | 500 <= status <= 599
    500: InternalServerError.handler,
}
