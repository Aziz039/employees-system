const constants = require("./core/app_constants"),
	express = require("express"),
	app = express();
	main_router = require("./routers/main.router"),
    cors = require('cors'),
    fileUpload = require('express-fileupload');


const port = process.env.PORT || 5000;

app.use(cors());
app.use(fileUpload());

app.use(
    express.json(),
    constants.bodyParser.json(),
    ("/api", main_router),
);

app.listen(port, () => console.log(`Server running on port ${port}`));