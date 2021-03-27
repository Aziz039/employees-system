const constants = require("../../core/app_constants"),
	router = constants.express.Router();
c = require("../../controllers/admin/cms.controller");

router
	.get("/customers", constants.verify_token, c.get_all_customers) // get all customers
	

module.exports = router;

// 
// 	.get("/user_customers/:collecterUsername/:id", constants.verify_token, c.get_user_customer) // get a customer by collecterUsername and id 
// 	.post("/user_customers", constants.verify_token, c.add_user_customer) // add customer
// 	.put("/user_customers", constants.verify_token, c.modify_user_customer) // modify a customer
// 	.delete("/user_customers", constants.verify_token, c.delete_user_customer) // delete customer
// 	;
