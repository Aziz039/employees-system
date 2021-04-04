const constants = require("../../core/app_constants"),
	router = constants.express.Router(),
	c = require("../../controllers/user/users.controller");

router
	.get("/:supervisor", constants.verify_token, c.get_user) // get all users by supervisor name
	.get("/:username", constants.verify_token, c.get_user) // get one user 
	.put("/:username", constants.verify_token, c.modify_user) // modify user 
	.put("/change_pass/:username", constants.verify_token, c.modify_pass); // change user password


module.exports = router;