const constants = require("../core/app_constants"),
	m = require("../models/auth.model"),
	res = require("../core/response");

	module.exports = {
		auth_login: async (request, response, next) => {
			if (1) {
				try {
					// login
					response.body = await m.auth_login(request.body.content);
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