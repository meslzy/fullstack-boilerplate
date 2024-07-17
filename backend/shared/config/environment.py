from enum import StrEnum
from os import environ


class Environment(StrEnum):
    PRODUCTION = "production"
    DEVELOPMENT = "development"
    TESTING = "testing"


ENVIRONMENT = Environment(environ.get("ENVIRONMENT", Environment.PRODUCTION))


def is_production() -> bool:
    return ENVIRONMENT == Environment.PRODUCTION


def is_development() -> bool:
    return ENVIRONMENT == Environment.DEVELOPMENT


def is_testing() -> bool:
    return ENVIRONMENT == Environment.TESTING
