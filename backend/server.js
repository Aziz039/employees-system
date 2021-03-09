const constants = require("./core/app_constants"),
	express = require("express"),
	app = express();
	main_router = require("./routers/main.router");

    app.use(
        express.json(),
        constants.bodyParser.json(),
        ("/api", main_router),
    );



app.listen(2030);