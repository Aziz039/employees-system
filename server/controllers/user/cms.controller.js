const constants = require("../../core/app_constants"),
	m = require("../../models/user/cms.model"),
	res = require("../../core/response");

module.exports = {
	get_all_user_customers: async (request, response, next) => {
		// get all customers by username
		try {
			response.body = await m.get_all_user_customers(request.params.collecterUsername);
			response.status(200).send(response.body);
			next();
		} catch (error) {
			response.body = res.error(error);
			response.status(500).send(response.body);
			next();
		}
	},
	get_user_customer: async (request, response, next) => {
		// get one customer from a user by id
		try {
			response.body = await m.get_user_customer(request.params);
			response.status(200).send(response.body);
			next();
		} catch (error) {
			response.body = res.error(error);
			response.status(500).send(response.body);
			next();
		}
	},
	modify_user_customer: async (request, response, next) => {
		// modify one customer from a user by id
		try {
			response.body = await m.modify_user_customer(request.body);
			response.status(200).send(response.body);
			next();
		} catch (error) {
			response.body = res.error(error);
			response.status(500).send(response.body);
			next();
		}
	},
	send_sms_customer: async (request, response, next) => {
		// send an sms to the customer
		try {
			response.body = await m.send_sms_customer(request.body.content);
			response.status(200).send(response.body);
			next();
		} catch (error) {
			response.body = res.error(error);
			response.status(500).send(response.body);
			next();
		}
	},
};
