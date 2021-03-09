
const constants = require("./app_constants"),
_response = require("./response");

module.exports = {
headers_setup: (request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
        "Access-Control-Allow-Headers",
        "content-type, user_token, api_key, Authorization"
    );
    next();
},
api_key: (request, response, next) => {
    if (request.method !== "OPTIONS") {
        if (request.headers.api_key) {
            // console.log("hi");
            next();
        } else {
            response.json({
                is_successful: false,
                message: "api key missing",
                body: [],
            });
        }
    } else {
        next();
    }
},
logger: async (request, response) => {
    next();
},
};