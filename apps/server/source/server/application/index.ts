import express from "express";

import cookieParser from "cookie-parser";
import compression from "compression";
import nocache from "nocache";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import v1 from "@application/routes/v1";
import errors from "@application/middleware/errors";

import config from "@/config";
import logger from "@/logger";

const application = express();

// application settings
application.set("trust proxy", 1);
application.set("x-powered-by", false);

// default middlewares
application.use(express.json());
application.use(express.urlencoded({extended: true}));

// security middlewares
application.use(cookieParser());
application.use(compression());
application.use(nocache());
application.use(helmet());
application.use(cors());

// development middlewares
if (config.mode === "development") {
  const morganOptions = {
    stream: {
      write: (message: string) => {
        return logger.info(message);
      }
    }
  };

  application.use(morgan("dev", morganOptions));
}

// production middlewares
if (config.mode === "production") {
  const morganOptions = {
    stream: {
      write: (message: string) => {
        return logger.info(message);
      }
    }
  };

  application.use(morgan("combined", morganOptions));
}

// routes
application.use("/v1", v1);

// errors
application.use(errors.loggerHandler);
application.use(errors.requestHandler);
application.use(errors.safeHandler);

export default application;