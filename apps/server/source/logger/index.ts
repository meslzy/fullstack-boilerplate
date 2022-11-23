import Winston from "winston";

import config from "@/config";

import * as path from "path";

const transports = () => {
	const consoleTransport = new Winston.transports.Console();

	if (config.mode === "development") return [
		consoleTransport
	];

	const fileTransport = new Winston.transports.File({
		filename: path.join(config.logs.path, "logs.log")
	});

	return [
		consoleTransport, fileTransport
	];
};

const format = () => {
	return Winston.format.combine(
		(config.mode === "development" ? Winston.format.colorize() : Winston.format.uncolorize()),
		Winston.format.timestamp(),
		Winston.format.printf((info) => {
			return `${info["timestamp"]} | ${info["level"]}: ${info["message"]}`;
		})
	);
};

const logger = Winston.createLogger({
	transports: transports(),
	format: format()
});

export default logger;