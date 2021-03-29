const constants = require("../../core/app_constants"),
	m = require("../../models/admin/users.model"),
	res = require("../../core/response");

module.exports = {
	get_all_users: async (request, response, next) => {
		// get all users
		try {
			response.body = await m.get_all_users();
			response.status(200).send(response.body);
			next();
		} catch (error) {
			response.body = res.error(error);
			response.status(500).send(response.body);
			next();
		}
	},
	get_a_user: async (request, response, next) => {
		// get a user
		try {
			response.body = await m.get_a_user(request.params.username);
			response.status(200).send(response.body);
			next();
		} catch (error) {
			response.body = res.error(error);
			response.status(500).send(response.body);
			next();
		}
	},
	get_supervisor_users: async (request, response, next) => {
		// get supervisor users
		try {
			response.body = await m.get_supervisor_users(request.params.supervisor);
			response.status(200).send(response.body);
			next();
		} catch (error) {
			response.body = res.error(error);
			response.status(500).send(response.body);
			next();
		}
	},
	register_user: async (request, response, next) => {
		// register a user
		try {
			response.body = await m.register_user(request.body.content);
			response.status(200).send(response.body);
			next();
		} catch (error) {
			response.body = res.error(error);
			response.status(500).send(response.body);
			next();
		}
	},
};

// get_all_users: async (request, response, next) => {
	// 	// get all users
	// 	try {
	// 		response.body = await m.get_all_users();
	// 		response.status(200).send(response.body);
	// 		next();
	// 	} catch (error) {
	// 		response.body = res.error(error);
	// 		response.status(500).send(response.body);
	// 		next();
	// 	}
	// },
	// get_user: async (request, response, next) => {
	// 	// get a user
	// 	try {
	// 		response.body = await m.get_user(request.params.username);
	// 		response.status(200).send(response.body);
	// 		next();
	// 	} catch (error) {
	// 		response.body = res.error(error);
	// 		response.status(500).send(response.body);
	// 		next();
	// 	}
	// },
	// register_user: async (request, response, next) => {
	// 	// register a user
	// 	try {
	// 		response.body = await m.register_user(request.body.content);
	// 		response.status(200).send(response.body);
	// 		next();
	// 	} catch (error) {
	// 		response.body = res.error(error);
	// 		response.status(500).send(response.body);
	// 		next();
	// 	}
	// },
	// modify_user: async (request, response, next) => {
	// 	// modify a user
	// 	try {
	// 		response.body = await m.modify_user({
	// 			username: request.params.username,
	// 			content: request.body.content,
	// 		});
	// 		response.status(200).send(response.body);
	// 		next();
	// 	} catch (error) {
	// 		response.body = res.error(error);
	// 		response.status(500).send(response.body);
	// 		next();
	// 	}
	// },
	// delete_user: async (request, response, next) => {
	// 	// delete a user
	// 	try {
	// 		response.body = await m.delete_user(request.params.username);
	// 		response.status(200).send(response.body);
	// 		next();
	// 	} catch (error) {
	// 		response.body = res.error(error);
	// 		response.status(500).send(response.body);
	// 		next();
	// 	}
	// },
	// modify_pass: async (request, response, next) => {
	// 	// modify a user
	// 	try {
	// 		response.body = await m.modify_pass({
	// 			username: request.params.username,
	// 			content: request.body.content,
	// 		});
	// 		response.status(200).send(response.body);
	// 		next();
	// 	} catch (error) {
	// 		response.body = res.error(error);
	// 		response.status(500).send(response.body);
	// 		next();
	// 	}
	// },