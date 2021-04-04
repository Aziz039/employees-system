const constants = require("../core/app_constants"),
	router = constants.express.Router(),
	c = require("../controllers/auth.controller");

	router
		.post("/login", c.auth_login);


module.exports = router;