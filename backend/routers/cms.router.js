const constants = require("../core/app_constants"),
	router = constants.express.Router();
c = require("../controllers/cms.controller");
router
	.post("/auth/register", constants.verify_token, c.auth_register)
	.get("/user_customers/:collecterName", constants.verify_token, c.get_all_user_customers) 
	.get("/user_customers/:collecterName/:contractId", constants.verify_token, c.get_user_customer)
	.post("/user_customers", constants.verify_token, c.add_user_customer)
	.put("/user_customers", constants.verify_token, c.modify_user_customer)
	.delete("/user_customers/:contractId", constants.verify_token, c.delete_user_customer)
	;

module.exports = router;
