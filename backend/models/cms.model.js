const { json } = require("body-parser");
const constants = require("../core/app_constants"),
	res = require("../core/response");

module.exports = {
	get_all_user_customers: async (collecterUsername) => {
		return new Promise((resolve, reject) => {
			try {
				constants.sql.query(
					`SELECT * FROM ${constants.dotenv.parsed.table_customers} WHERE collecterUsername=?`,
					[collecterUsername],
					(error, data) => {
						return error
							? reject({ code: 2000, message: error.code })
							: resolve(
									res.create(
										data.length > 0
											? `Collecter's customers fetched successfully`
											: `Collector does not have customers`,
										data.length > 0 ? data : null
									),
									helper_updateCustomerCount(collecterUsername, data.length),
									helper_updateUserCollectionMoney(collecterUsername)
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
				constants.sql.query(
					`SELECT * FROM ${constants.dotenv.parsed.table_customers} WHERE collecterUsername=? AND contractId=?`,
					[content.collecterUsername, content.contractId], 
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
	modify_user_customer: async (contents) => {
		return new Promise((resolve, reject) => {
			try {
				constants.sql.query(
					`UPDATE ${constants.dotenv.parsed.table_customers} SET ? WHERE contractId=?`,
					[ 
						contents.contents, 
						contents.contractId 
					],
					(error, data) => {
						return error
							? reject({ code: 2000, message: error.code })
							: resolve(
									res.create(
										data.affectedRows > 0
											? `Customer was modified successfully`
											: `Customer could not be modified`,
										data.affectedRows > 0 ? data : null
									)
							  );
					}
				);
			} catch (error) {
				return reject({ code: 2001, message: error.code });
			}
		});
	},
	add_user_customer: async (content) => {
		return new Promise((resolve, reject) => {
			try {
				console.log(content);
				constants.sql.query(
					`INSERT INTO ${constants.dotenv.parsed.table_customers} (contractId, name, nationalID, cost, discount, costAfterDiscount, lastBillDate, firstBillDate, phone1, phone2, phone3, phone4, phone5, phone6, phone7, phone8, collecterUsername, attributionDate, status, notes, paymentDate, newCondition, secondPaymentDate, secondNotes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
					[
						content.contractId, content.name , content.nationalID ,
						content.cost , content.discount , content.costAfterDiscount,
						content.lastBillDate, content.firstBillDate , content.phone1 ,
						content.phone2 , content.phone3 , content.phone4,
						content.phone5, content.phone6 , content.phone7 ,
						content.phone8 , content.collecterUsername , content.attributionDate,
						content.status, content.notes , content.paymentDate ,
						content.newCondition , content.secondPaymentDate , content.secondNotes
					],
					(error, data) => {
						return error
							? reject({ code: 2000, message: error.code })
							: resolve(
								res.create(
									data.affectedRows > 0
										? `Customer added successfully`
										: `Could not add customer`,
									data.affectedRows > 0 ? data : null
								)
							);
					}
				);
			} catch (error) {
				return reject({ code: 2001, message: error.code });
			}
		});
	},
	delete_user_customer: async (content) => {
		return new Promise((resolve, reject) => {
			try {
				constants.sql.query(
					`DELETE FROM ${constants.dotenv.parsed.table_customers} WHERE contractId=?`,
					[content.contractId],
					(error, data) => {
						return error
							? reject({ code: 1007, message: error.code })
							: resolve(
									res.create(
										data.affectedRows > 0
											? "Customer deleted successfully"
											: "Customer has already been deleted or does not exist",
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


const helper_updateCustomerCount = (username, countCustomers) => {
	constants.sql.query(
		`UPDATE ${constants.dotenv.parsed.table_users} SET ? WHERE username=?`,
		[{"totalCustomersCount":countCustomers}, username],
		(error, data) => {
			error
				? console.log("Error updating user's customer count")
				: data.affectedRows > 0 ? 
					console.log("customer count updated for ", username)
					: console.log("No customers updated")
		}
	);
	constants.sql.query(
		`SELECT COUNT(*) FROM ${constants.dotenv.parsed.table_customers} WHERE collecterUsername=? AND customerStatus=?`,
		[username, 'to do'],
		(error, data) => {
			error
				? console.log(error)
				: 	constants.sql.query(
						`UPDATE ${constants.dotenv.parsed.table_users} SET ? WHERE username=?`,
							[{"todoCustomers":data[0]['COUNT(*)']}, username],
							(error, data) => {
								error
									? console.log("Error updating user's customer count")
									: data.affectedRows > 0 ? 
										console.log("customer to do count updated for ", username)
										: console.log("No customers updated")
							}
					);	
		}
	);

	constants.sql.query(
		`SELECT COUNT(*) FROM ${constants.dotenv.parsed.table_customers} WHERE collecterUsername=? AND customerStatus=?`,
		[username, 'in progress'],
		(error, data) => {
			error
				? console.log(error)
				: 	constants.sql.query(
						`UPDATE ${constants.dotenv.parsed.table_users} SET ? WHERE username=?`,
							[{"inProgressCustomers":data[0]['COUNT(*)']}, username],
							(error, data) => {
								error
									? console.log("Error updating user's customer count")
									: data.affectedRows > 0 ? 
										console.log("customer in progress count updated for ", username)
										: console.log("No customers updated")
							}
					);	
		}
	);

	constants.sql.query(
		`SELECT COUNT(*) FROM ${constants.dotenv.parsed.table_customers} WHERE collecterUsername=? AND customerStatus=?`,
		[username, 'done'],
		(error, data) => {
			error
				? console.log(error)
				: 	constants.sql.query(
						`UPDATE ${constants.dotenv.parsed.table_users} SET ? WHERE username=?`,
							[{"doneCustomers":data[0]['COUNT(*)']}, username],
							(error, data) => {
								error
									? console.log("Error updating user's customer count")
									: data.affectedRows > 0 ? 
										console.log("customer done count updated for ", username)
										: console.log("No customers updated")
							}
					);	
		}
	);
	
}

const helper_updateUserCollectionMoney = (username) => {
	constants.sql.query(
		`SELECT costAfterDiscount FROM ${constants.dotenv.parsed.table_customers} WHERE collecterUsername=? AND  (customerStatus=? OR customerStatus=?)`,
		[username, 'to do', 'in progress'],
		(error, data) => {
			if (error){
				console.log(error)
			} else {
				const result = Object.values(JSON.parse(JSON.stringify(data)));
				let total = 0;
				result.forEach((value) => {
					total += value.costAfterDiscount;
				});
				constants.sql.query(
					`UPDATE ${constants.dotenv.parsed.table_users} SET ? WHERE username=?`,
						[{"pendingMoney":total}, username],
						(error, data) => {
							error
								? console.log("Error updating user's pending money")
								: data.affectedRows > 0 ? 
									console.log("pending money updated for ", username)
									: console.log("No pending money updated")
						}
				);
			}
		}
	);
	constants.sql.query(
		`SELECT costAfterDiscount FROM ${constants.dotenv.parsed.table_customers} WHERE collecterUsername=? AND  customerStatus=?`,
		[username, 'done'],
		(error, data) => {
			if (error){
				console.log(error)
			} else {
				const result = Object.values(JSON.parse(JSON.stringify(data)));
				let total = 0;
				result.forEach((value) => {
					total += value.costAfterDiscount;
				});
				constants.sql.query(
					`UPDATE ${constants.dotenv.parsed.table_users} SET ? WHERE username=?`,
						[{"collectedMoney":total}, username],
						(error, data) => {
							error
								? console.log("Error updating user's collected money")
								: data.affectedRows > 0 ? 
									console.log("collected money updated for ", username)
									: console.log("No collected money updated")
						}
				);
			}
		}
	);
}