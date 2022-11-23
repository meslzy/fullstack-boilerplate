import {Sequelize} from "sequelize";

import config from "@/config";
import logger from "@/logger";

import users from "@database/models/user";

export const sequelize = new Sequelize(config.database.name, config.database.user, config.database.pass, {
  logging: (message) => logger.info(message),
  dialect: "postgres"
});

export const models = {
  users: users(sequelize, "users"),
};

interface Database {
  connect: () => Promise<any>;
}

const connect = async () => {
  return sequelize.authenticate().then(() => {
    return sequelize.sync();
  });
};

const database: Database = {
  connect
};

export default database;