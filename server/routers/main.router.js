const   constants = require("../core/app_constants"),
        router = constants.express.Router(),
        auth_router = require("./auth.router"),
        admin_router = require("./admin/admin.router"),
        // supervisor_router = require("./supervisor/supervisor.router"),
        user_router = require("./user/user.router"),
        mw = require("../core/mw");


router
        .use("/api/admin", 
                mw.headers_setup,
                mw.api_key,
                admin_router)
        .use("/api/user", 
                mw.headers_setup,
                mw.api_key,
                user_router)
        .use("/api/auth", auth_router);

        // .use("/api/supervisor", 
        //         mw.headers_setup,
        //         mw.api_key,
        //         supervisor_router)


module.exports = router;