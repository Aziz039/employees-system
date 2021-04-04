const constants = require("../../core/app_constants"),
	router = constants.express.Router(),
	c = require("../../controllers/user/users.controller");

router
	.get("/:username", constants.verify_token, c.get_user) // get a user
	.put("/:username", constants.verify_token, c.modify_user); // modify a user


module.exports = router;