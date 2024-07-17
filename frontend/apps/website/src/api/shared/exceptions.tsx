import { XiorResponse } from "xior";

interface ValidationFieldError {
  location: "body";
  reference: (string | number)[];
  path: string;
  message: string;
  type: string;
}

class ValidationError extends Error {
  static code = "VALIDATION_ERROR";

  fields: ValidationFieldError[];

  static fromResponse(response: XiorResponse) {
    const validationError = new ValidationError(response.data.message);

    validationError.fields = response.data.errors.map((error: any): ValidationFieldError => {
      const reference = Array.from<string | number>(error.loc.slice(1));

      return {
        location: error.loc.at(0),
        reference,
        path: reference.reduce<string>((path, reference) => {
          if ( !path ) {
            return String(reference);
          }

          return path + (typeof reference === "number" ? `[${reference}]` : `.${reference}`);
        }, null),
        message: error.msg,
        type: error.type,
      };
    });

    return validationError;
  }
}

class InternalServerError extends Error {
  static code = "INTERNAL_SERVER_ERROR";

  static fromResponse(response: XiorResponse) {
    return new InternalServerError(response.data.message);
  }
}

class ServerError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export {
  ValidationError,
  InternalServerError,
  ServerError,
};
