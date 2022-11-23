import createServer from "@/server";

import application from "@server/application";
import database from "@server/database";

import config from "@/config";

const server = createServer(application);

database.connect().then(() => {
  return server.listen(config.server.port);
});