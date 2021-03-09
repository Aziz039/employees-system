const constants = require("../core/app_constants"),
	res = require("../core/response");

module.exports = {
	auth_register: async (content) => {
		return new Promise((resolve, reject) => {
			try {
				// name - username - password - role - nationality - nationalID - branch - supervisor - userType 
				if (!content.username || !content.password || !content.name || !content.role || 
					!content.nationality || !content.nationalID || !content.branch || !content.supervisor 
					|| !content.userType) {
					return reject({ code: 400, message: "Request body invalid - missing fields" });
				} else {
					const passwordPromise = constants.hash(content.password);
					const 	username = content.username,
							name = content.name,
							role = content.role,
							nationality = content.nationality,
							nationalID = content.nationalID,
							branch = content.branch,
							supervisor = content.supervisor,
							userType = content.userType;
					// Check if user exist
					constants.sql.query(
						"SELECT * FROM users WHERE username=?",
						[username],
						async (error, data) => {
							if (data.length != 0) {
								return reject({ code: 401, message: "Username exists" });
							} else {
								let password;
								passwordPromise.then(res => {
									password = res;
								})
								await passwordPromise;
								constants.sql.query(
									"INSERT INTO users (username, nationalID, name, role, password, nationality, supervisor, branch, userType)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
									[
										username,
										nationalID,
										name,
										role,
										password,
										nationality,
										supervisor,
										branch,
										userType
									],
									(error, data) => {
										return error
											? reject({ code: 1005, message: error.code })
											: resolve(
													res.create("user added successfully", data.name)
											  );
									}
								);
							}
					});
				}
			} catch (error) {
				return reject({ code: 2001, message: error.code });
			}
		});
	},
	get_all_user_customers: async (collecterName) => {
		return new Promise((resolve, reject) => {
			try {
				constants.sql.query(
					"SELECT * FROM customersdata WHERE collecterName=?",
					[collecterName],
					(error, data) => {
						return error
							? reject({ code: 2000, message: error.code })
							: resolve(
									res.create(
										data.length > 0
											? `Collecter's customers fetched successfully`
											: `Collector does not have customers`,
										data.length > 0 ? data : null
									)
							  );
					}
				);
			} catch (error) {
				return reject({ code: 2001, message: error.code });
			}
		});
	},
	get_user_customer: async (content) => {
		return new Promise((resolve, reject) => {
			try {
				console.log(content);
				constants.sql.query(
					"SELECT * FROM customersdata WHERE collecterName=? AND contractId=?",
					[content.collecterName, content.contractId], 
					(error, data) => {
						return error
							? reject({ code: 2000, message: error.code })
							: resolve(
									res.create(
										data.length > 0
											? `Collecter's customer fetched successfully`
											: `Collector does not have a customer with this contact ID`,
										data.length > 0 ? data : null
									)
							  );
					}
				);
			} catch (error) {
				return reject({ code: 2001, message: error.code });
			}
		});
	},
	modify_user_customer: async (content) => {
	
	},
	add_user_customer: async (content) => {
	
	},
	delete_user_customer: async (content) => {
	
	},
};
