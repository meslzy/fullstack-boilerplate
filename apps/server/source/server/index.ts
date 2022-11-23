import { Application } from "express";

import logger from "@/logger";

import * as http from "node:http";
import { AddressInfo } from "node:net";

const createServer = (app: Application) => {
	const server = http.createServer(app);

	server.on("listening", () => {
		const address = server.address();

		if (address) {
			const { port } = address as AddressInfo;
			logger.info(`Server listening on port ${port}`);
		}
	});

	return server;
};

export default createServer;