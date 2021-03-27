const constants = require("../../core/app_constants"),
	res = require("../../core/response");

module.exports = {
	get_user: async (username) => {
		return new Promise((resolve, reject) => {
			try {
				constants.sql.query(
					`SELECT username, nationalID, name, role, nationality, supervisor, branch, userType, totalCustomersCount, todoCustomers, inProgressCustomers, doneCustomers, pendingMoney, collectedMoney, timestamp FROM ${constants.dotenv.parsed.table_users} WHERE username=?`,
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
	modify_user: async (content) => {
		return new Promise((resolve, reject) => {
			try {
				constants.sql.query(
					`UPDATE ${constants.dotenv.parsed.table_users} SET ? WHERE username=?`,
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
};