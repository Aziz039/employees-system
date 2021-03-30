const constants = require("../../core/app_constants"),
	m = require("../../models/admin/cms.model"),
	res = require("../../core/response");

module.exports = {
	get_all_customers: async (request, response, next) => {
		// get all customers by username
		try {
			response.body = await m.get_all_customers();
			response.status(200).send(response.body);
			next();
		} catch (error) {
			response.body = res.error(error);
			response.status(500).send(response.body);
			next();
		}
	},
	get_all_user_customers: async (request, response, next) => {
		// get user customers
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
	add_customer: async (request, response, next) => {
		// add one customer
		try {
			response.body = await m.add_customer(request.body.content);
			response.status(200).send(response.body);
			next();
		} catch (error) {
			response.body = res.error(error);
			response.status(500).send(response.body);
			next();
		}
	},
	modify_customer: async (request, response, next) => {
		// modify a customer by id
		try {
			response.body = await m.modify_customer(request.body);
			response.status(200).send(response.body);
			next();
		} catch (error) {
			response.body = res.error(error);
			response.status(500).send(response.body);
			next();
		}
	},
	delete_customer: async (request, response, next) => {
		// delete a customer
		try {
			response.body = await m.delete_customer(request.body.content);
			response.status(200).send(response.body);
			next();
		} catch (error) {
			response.body = res.error(error);
			response.status(500).send(response.body);
			next();
		}
	},
	get_customers_count: async (request, response, next) => {
		// count customers status
		try {
			response.body = await m.get_customers_count();
			response.status(200).send(response.body);
			next();
		} catch (error) {
			response.body = res.error(error);
			response.status(500).send(response.body);
			next();
		}
	},
	get_customers_billCostAfterDiscount: async (request, response, next) => {
		// count total bills from customers
		try {
			response.body = await m.get_customers_billCostAfterDiscount();
			response.status(200).send(response.body);
			next();
		} catch (error) {
			response.body = res.error(error);
			response.status(500).send(response.body);
			next();
		}
	},
	get_collected_money: async (request, response, next) => {
		// sum of total collected money
		try {
			response.body = await m.get_collected_money();
			response.status(200).send(response.body);
			next();
		} catch (error) {
			response.body = res.error(error);
			response.status(500).send(response.body);
			next();
		}
	},
	get_pending_money: async (request, response, next) => {
		// sum of total pending money
		try {
			response.body = await m.get_pending_money();
			response.status(200).send(response.body);
			next();
		} catch (error) {
			response.body = res.error(error);
			response.status(500).send(response.body);
			next();
		}
	},
	upload_csv: async (request, response, next) => {
		// sum of total pending money
		try {
			if (!request.files || Object.keys(request.files).length === 0) {
				response.body = res.error({message:'No files were uploaded', code: 400});
				response.status(400).send(response.body);
				next();
			} else {
				response.body = await m.upload_csv(request.files.csv_file);
				response.status(200).send(response.body);
				next();
			}
		} catch (error) {
			response.body = res.error(error);
			response.status(500).send(response.body);
			next();
		}
	},
};