FROM python:3.12.1-slim as base

ARG APP_NAME=${APP_NAME}

# Python environment variables
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Poetry environment variables
ENV POETRY_VIRTUALENVS_CREATE=false
ENV POETRY_NO_INTERACTION=1

WORKDIR /app

COPY poetry.lock pyproject.toml ./

# Install Poetry
RUN pip install poetry==1.8.3

RUN poetry lock


# Setup dev stage
FROM base as development

RUN poetry install --with ${APP_NAME}

# Setup production stage
FROM base as production

COPY apps/ ./apps
COPY shared/ ./shared

RUN poetry install --with ${APP_NAME} --without dev
