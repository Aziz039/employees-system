const constants = require("../../core/app_constants"),
	router = constants.express.Router(),
	c = require("../../controllers/admin/users.controller");

router
	.get("/", constants.verify_token, c.get_all_users) // get all users
	.get("/:username", constants.verify_token, c.get_a_user) // get one user by username
	.get("/supervisor/:supervisor", constants.verify_token, c.get_supervisor_users) // get all users by supervisor name
	.post("/", constants.verify_token, c.register_user) // add user
	.put("/:username", constants.verify_token, c.modify_user) // modify a user
	.delete("/:username", constants.verify_token, c.delete_user) // delete a user
	.put("/change_pass/:username", constants.verify_token, c.modify_pass); // change user password
	
module.exports = router;