const constants = require("../../core/app_constants"),
	router = constants.express.Router();
c = require("../../controllers/admin/cms.controller");

router
	.get("/customers", constants.verify_token, c.get_all_customers) // get all customers
	.get("/customers/user/:collecterUsername", constants.verify_token, c.get_all_user_customers) // get a user customers
	.get("/customers/user/:collecterUsername/:id", constants.verify_token, c.get_user_customer) // get a customer by collecterUsername and id 
	.post("/customers", constants.verify_token, c.add_customer) // add customer
	.put("/customers", constants.verify_token, c.modify_customer) // modify a customer
	.delete("/customers", constants.verify_token, c.delete_customer) // delete a customer
	.get("/customers_count", constants.verify_token, c.get_customers_count) // get customers count
	.get("/customers_bill_cost", constants.verify_token, c.get_customers_billCostAfterDiscount) // get customers bills cost After Discount total
	.get("/users_collected_money", constants.verify_token, c.get_collected_money) // get collected money total
	.get("/users_pending_money", constants.verify_token, c.get_pending_money) // get pending money total

	

module.exports = router;