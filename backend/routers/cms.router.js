const constants = require("../core/app_constants"),
	router = constants.express.Router();
c = require("../controllers/cms.controller");
router
	.post("/auth/register", c.auth_register);
    
module.exports = router;
