const constants = require("../../core/app_constants"),
	router = constants.express.Router();
c = require("../../controllers/cms.controller");
router
	.get("/user_customers/:collecterUsername", constants.verify_token, c.get_all_user_customers) // get all customers by collecterUsername
	.get("/user_customers/:collecterUsername/:id", constants.verify_token, c.get_user_customer) // get a customer by collecterUsername and id 
	.post("/user_customers", constants.verify_token, c.add_user_customer) // add customer
	.put("/user_customers", constants.verify_token, c.modify_user_customer) // modify a customer
	.delete("/user_customers", constants.verify_token, c.delete_user_customer) // delete customer
	;

module.exports = router;
