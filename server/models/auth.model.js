const constants = require("../core/app_constants"),
	res = require("../core/response");

module.exports = {
	auth_login: async (content) => {
		return new Promise((resolve, reject) => {
            console.log(content);
			try {
                if (!content.username || !content.password) {
                    return reject({ code: 400, message: "Request body invalid - username and password are required" });
                } else { 
					const username = content.username;
                	const password = content.password;
                    constants.sql.query(
                        `SELECT * FROM ${constants.dotenv.parsed.table_users} WHERE username=?`,
                        [username],
                        async (error, data) => {
                            if (data.length == 0) {
                                return reject({ code: 401, message: "Incorrect username" });
                            } else {
                                if ( await constants.unhash(password, data[0].password)) {
                                    const tokenKey = constants.sign_token(username);
                                    resolve(
                                        res.create("logged in", { username: username, role: data[0].role,  token_type:"Bearer", token: tokenKey, expires_in : "7 hours" })
                                    );
                                } else {
                                    return reject({ code: 401, message: "Incorrect password" });
                                }
                            }
                        }
                    );
                }
			} catch (error) {
				return reject({ code: 2001, message: error.code });
			}
		});
	},
};