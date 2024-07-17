import { XiorError } from "xior";

import { InternalServerError, ServerError, ValidationError } from "./exceptions";

const errorInterceptor = async (error: XiorError) => {
  if ( error.response ) {
    const status = error.response.status;
    const data = error.response.data;

    if ( status === 400 ) {
      if ( data.code === ValidationError.code ) {
        return Promise.reject(ValidationError.fromResponse(error.response));
      }
    }

    if ( status === 500 ) {
      if ( data.code === InternalServerError.code ) {
        return Promise.reject(InternalServerError.fromResponse(error.response));
      }
    }

    return Promise.reject(new ServerError("There was an error. Please try again later."));
  } else if ( error.request ) {
    return Promise.reject(new ServerError("Server is not responding. Please try again later."));
  }

  return Promise.reject(new ServerError("There was a network error. Please try again later."));
};

export {
  errorInterceptor,
};
