import { Router } from "express";

const v1 = Router();

v1.get("/", (request, response) => {
	return response.json({
		status: "success"
	});
});

export default v1;