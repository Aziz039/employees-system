const constants = require("../../core/app_constants"),
	m = require("../../models/user/users.model"),
	res = require("../../core/response");

module.exports = {
	get_user: async (request, response, next) => {
		// get a user
		try {
			response.body = await m.get_user(request.params.username);
			response.status(200).send(response.body);
			next();
		} catch (error) {
			response.body = res.error(error);
			response.status(500).send(response.body);
			next();
		}
	},
	modify_user: async (request, response, next) => {
		// modify a user
		try {
			response.body = await m.modify_user({
				username: request.params.username,
				content: request.body.content,
			});
			response.status(200).send(response.body);
			next();
		} catch (error) {
			response.body = res.error(error);
			response.status(500).send(response.body);
			next();
		}
	},
};