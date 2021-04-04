const   constants = require("../../core/app_constants"),
        router = constants.express.Router(),
        cms_router = require("./cms.router"),
        users_router = require("./users.router"),
        mw = require("../../core/mw");


router
        .use("/cms", 
                mw.headers_setup,
                mw.api_key,
                cms_router)
        .use("/users", 
                mw.headers_setup,
                mw.api_key,
                users_router);




module.exports = router;