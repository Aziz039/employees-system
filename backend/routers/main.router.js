
const   constants = require("../core/app_constants"),
        router = constants.express.Router(),
        users_router = require("./users.router"),
        cms_router = require("./cms.router"),
        mw = require("../core/mw");

router
    .use("/api/cms", 
            mw.headers_setup,
            mw.api_key,
            cms_router)
    .use("/api/users", users_router);

module.exports = router;