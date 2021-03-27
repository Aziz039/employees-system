const constants = require("../../core/app_constants"),
	router = constants.express.Router(),
	c = require("../../controllers/admin/users.controller");

router
	.get("/", constants.verify_token, c.get_all_users) // get all users
	

module.exports = router;

// .get("/", constants.verify_token, c.get_all_users) // get all users
// 	.get("/:supervisor", constants.verify_token, c.get_user) // get all users by supervisor name
// 	.get("/:username", constants.verify_token, c.get_user) // get one user by username
// 	.post("/", constants.verify_token, c.register_user) // add user
// 	.put("/:username", constants.verify_token, c.modify_user) // modify a user
// 	.delete("/:username", constants.verify_token, c.delete_user) // delete a user
// 	.put("/change_pass/:username", constants.verify_token, c.modify_pass); // change user password