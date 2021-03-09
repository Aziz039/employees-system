const constants = require("../core/app_constants"),
	m = require("../models/cms.model"),
	res = require("../core/response");

module.exports = {
	auth_register: async (request, response, next) => {
		if (1) {
			try {
				// register a user
				response.body = await m.auth_register(request.body.content);
				response.status(200).send(response.body);
				next();
			} catch (error) {
				response.body = res.error(error);
				response.status(500).send(response.body);
				next();
			}
		} else {
			console.log("error", token_error);
		}
	},
};
