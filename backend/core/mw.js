
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
        if (request.headers.api_key === constants.dotenv.parsed.api_key && 
            request.headers.user_token && request.headers.user_token.split(" ").length === 2) {
                const api_key = request.headers.api_key;
                const user_token = request.headers.user_token.split(" ")[1];
                try {
                    const userTimeLeft = constants.jwt.verify(user_token, api_key);
                    if (userTimeLeft.expireTime < Date.now()) {
                        response.json({
                            is_successful: false,
                            error_code: 403,
                            message: "Token has expired",
                            body: [],
                        });
                        return;
                    }
                    next();
                } catch (error) {
                    response.json({
                        is_successful: false,
                        error_code: 403,
                        message: "jwt malformed",
                        body: [],
                    });
                }
        } else {
            response.json({
                is_successful: false,
                message: "api key or token missing",
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