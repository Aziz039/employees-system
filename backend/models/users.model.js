const constants = require("../core/app_constants"),
	res = require("../core/response");

module.exports = {
	get_all_users: async () => {
		return new Promise((resolve, reject) => {
			try {
				constants.sql.query(
					"SELECT username, nationalID, name, role, nationality, supervisor, branch, userType, timestamp FROM users",
					(error, data) => {
						return error
							? reject({ code: 1000, message: error.code })
							: resolve(
									res.create(
										data.length > 0
											? "users fetched successfully"
											: "no users found",
										data.length > 0 ? data : null
									)
							  );
					}
				);
			} catch (error) {
				return reject({ code: 1001, message: error.code });
			}
		});
	},
	get_user: async (username) => {
		return new Promise((resolve, reject) => {
			try {
				constants.sql.query(
					"SELECT username, nationalID, name, role, nationality, supervisor, branch, userType, timestamp FROM users WHERE username=?",
					[username],
					(error, data) => {
						return error
							? reject({ code: 1002, message: "could not perform transaction" })
							: resolve(
									res.create(
										data.length > 0
											? "user fetched successfully"
											: "user not found",
										data.length > 0 ? data : null
									)
							  );
					}
				);
			} catch (error) {
				return reject({ code: 1003, message: "could not perform transaction" });
			}
		});
	},
	register_user: async (content) => {
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
	modify_user: async (content) => {
		return new Promise((resolve, reject) => {
			try {
				constants.sql.query(
					"UPDATE users SET ? WHERE username=?",
					[content.content, content.username],
					(error, data) => {
						return error
							? reject({ code: 1008, message: error.code })
							: resolve(
									res.create(
										data.affectedRows > 0
											? "user was modified successfully"
											: "user could not be modified",
										null
									)
							  );
					}
				);
			} catch (error) {
				return reject({ code: 1008, message: "could not perform transaction" });
			}
		});
	},
	delete_user: async (username) => {
		return new Promise((resolve, reject) => {
			try {
				constants.sql.query(
					"DELETE FROM users WHERE username=?",
					[username],
					(error, data) => {
						return error
							? reject({ code: 1007, message: error.code })
							: resolve(
									res.create(
										data.affectedRows > 0
											? "user deleted successfully"
											: "user has already been deleted or does not exist",
										null
									)
							  );
					}
				);
			} catch (error) {
				return reject({ code: 1008, message: "could not perform transaction" });
			}
		});
	},
	modify_pass: async (content) => {
		return new Promise(async (resolve, reject) => {
			try {
				const passwordPromise = constants.hash(content.content.password);
				let password;
				passwordPromise.then(async res => {
					password = res;
				})
				await passwordPromise;
				content.content.password = password;
				constants.sql.query(
					"UPDATE users SET ? WHERE username=?",
					[content.content, content.username],
					(error, data) => {
						return error
							? reject({ code: 1008, message: error.code })
							: resolve(
									res.create(
										data.affectedRows > 0
											? "user password was modified successfully"
											: "user password could not be modified",
										null
									)
							  );
					}
				);
			} catch (error) {
				return reject({ code: 1008, message: "could not perform transaction" });
			}
		});
	},
};