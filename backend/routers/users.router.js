const constants = require("../core/app_constants"),
	router = constants.express.Router(),
	c = require("../controllers/users.controller");

router
	.get("/", constants.verify_token, c.get_all_users)
	.get("/:username", constants.verify_token, c.get_user)
	.post("/", constants.verify_token, c.register_user)
	.put("/:username", constants.verify_token, c.modify_user)
	.delete("/:username", constants.verify_token, c.delete_user)
	.put("/change_pass/:username", constants.verify_token, c.modify_pass);

module.exports = router;