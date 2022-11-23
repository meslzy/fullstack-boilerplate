import Express from "express";

import logger from "@/logger";

export enum StatusCodes {
	OK = 200,
	CREATED = 201,
	ACCEPTED = 202,
	NO_CONTENT = 204,
	MOVED_PERMANENTLY = 301,
	FOUND = 302,
	NOT_MODIFIED = 304,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	NOT_ACCEPTABLE = 406,
	CONFLICT = 409,
	UNPROCESSABLE_ENTITY = 422,
	INTERNAL_SERVER_ERROR = 500,
	NOT_IMPLEMENTED = 501,
	SERVICE_UNAVAILABLE = 503,
}

export enum ErrorTypes {
	/**
	 * @description The request could not be understood by the server due to malformed syntax.
	 **/
	SyntaxError = "SyntaxError",
	/**
	 * @description The server encountered an unexpected condition that prevented it from fulfilling the request.
	 **/
	InternalError = "InternalError",
	/**
	 * @description The request was well-formed but was unable to be followed due to semantic errors.
	 **/
	ValidationError = "ValidationError",
	/**
	 * @description Unknown errors
	 **/
	UnknownError = "UnknownError",
}

export class RequestError {
	status: StatusCodes;
	type: ErrorTypes;

	constructor(status: StatusCodes, type: ErrorTypes) {
		this.status = status;
		this.type = type;
	}

	[key: string]: any;
}

const loggerHandler = (error: unknown, request: Express.Request, response: Express.Response, next: Express.NextFunction) => {
	if (error instanceof Error) {
		logger.error(error.stack);
	} else {
		logger.error(error);
	}

	return next(error);
};

const requestHandler = (error: unknown, request: Express.Request, response: Express.Response, next: Express.NextFunction) => {
	if (error instanceof RequestError) {
		return response.status(error.status).json(error);
	}

	if (error instanceof SyntaxError && "body" in error) {
		const requestError = new RequestError(StatusCodes.BAD_REQUEST, ErrorTypes.SyntaxError);
		return response.status(requestError.status).json(error);
	}

	return next(error);
};

const safeHandler = (error: unknown, request: Express.Request, response: Express.Response, next: Express.NextFunction) => {
	return response.status(500).send(error);
};

export default {
	loggerHandler,
	requestHandler,
	safeHandler
};