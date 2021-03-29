const { json } = require("body-parser");
const constants = require("../../core/app_constants"),
	res = require("../../core/response");

module.exports = {
	get_all_customers: async () => {
		return new Promise((resolve, reject) => {
			try {
				constants.sql.query(
					`SELECT * FROM ${constants.dotenv.parsed.table_customers}`,
					(error, data) => {
						return error
							? reject({ code: 2000, message: error.code })
							: resolve(
									res.create(
										data.length > 0
											? `Customers fetched successfully`
											: `No Customers`,
										data.length > 0 ? data : null
									),
							);
					}
				);
			} catch (error) {
				return reject({ code: 2001, message: error.code });
			}
		});
	},
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
	get_user_customer: async (content) => {
	    return new Promise((resolve, reject) => {
	        try {
	            constants.sql.query(
	                `SELECT * FROM ${constants.dotenv.parsed.table_customers} WHERE collecterUsername=? AND id=?`,
	                [content.collecterUsername, content.id], 
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
	add_customer: async (content) => {
		return new Promise((resolve, reject) => {
			try {
				console.log(content);
				constants.sql.query(
					`INSERT INTO ${constants.dotenv.parsed.table_customers} (id, customerName, nationalID, cost, discount, costAfterDiscount, lastBillDate, firstBillDate, phone1, phone2, phone3, phone4, phone5, phone6, phone7, phone8, collecterUsername, attributionDate, status, notes, paymentDate, newStatus, newNotes, newPaymentDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
					[
						content.id, content.customerName , content.nationalID ,
						content.cost , content.discount , content.costAfterDiscount,
						content.lastBillDate, content.firstBillDate , content.phone1 ,
						content.phone2 , content.phone3 , content.phone4,
						content.phone5, content.phone6 , content.phone7 ,
						content.phone8 , content.collecterUsername , content.attributionDate,
						content.status, content.notes , content.paymentDate ,
						content.newStatus , content.newNotes , content.newPaymentDate
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
	modify_customer: async (contents) => {
		return new Promise((resolve, reject) => {
			try {
				constants.sql.query(
					`UPDATE ${constants.dotenv.parsed.table_customers} SET ? WHERE id=?`,
					[ 
						contents.content, 
						contents.id 
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
	delete_customer: async (content) => {
		return new Promise((resolve, reject) => {
			try {
				constants.sql.query(
					`DELETE FROM ${constants.dotenv.parsed.table_customers} WHERE id=?`,
					[content.id],
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
	get_customers_count: async () => {
		return new Promise((resolve, reject) => {
			try {
				constants.sql.query(
					`SELECT 
						COUNT(IF(customerStatus = 'complete', 1, NULL)) 'complete',
						COUNT(IF(customerStatus = 'in progress', 1, NULL)) 'in progress',
    					COUNT(IF(customerStatus = 'new', 1, NULL)) 'new'
						FROM ${constants.dotenv.parsed.table_customers}`,
					(error, data) => {
						return error
							? reject({ code: 2000, message: error.code })
							: resolve(
								res.create(
									data.length > 0
										? `Customers were counted successfully`
										: `Customer could not be counted`,
									data.length > 0 ? data[0] : null
								)
							);
					}
				);
				// another way
				// constants.sql.query(
				// 	`SELECT customerStatus, COUNT(*) FROM ${constants.dotenv.parsed.table_customers} GROUP BY customerStatus`,
				// 	(error, data) => {
				// 		return error
				// 			? reject({ code: 2000, message: error.code })
				// 			: resolve(
				// 					res.create(
				// 						data.length > 0
				// 							? `Customer was counted successfully`
				// 							: `Customer could not be counted`,
				// 						data.length > 0 ? data : null
				// 					)
				// 			);
				// 	}
				// );
			} catch (error) {
				return reject({ code: 1008, message: "could not perform transaction" });
			}
		});
	},
	get_customers_billCostAfterDiscount: async () => {
		return new Promise((resolve, reject) => {
			try {
				constants.sql.query(
					`SELECT 
						SUM(costAfterDiscount)
						FROM ${constants.dotenv.parsed.table_customers}`,
					(error, data) => {
						return error
							? reject({ code: 2000, message: error.code })
							: resolve(
								res.create(
									data.length > 0
										? `Bills were counted successfully`
										: `Bills could not be counted`,
									data.length > 0 ? data[0] : null
								)
							);
					}
				);
			} catch (error) {
				return reject({ code: 1008, message: "could not perform transaction" });
			}
		});
	},
	get_collected_money: async () => {
		return new Promise((resolve, reject) => {
			try {
				constants.sql.query(
					`SELECT 
						SUM(collectedMoney)
						FROM ${constants.dotenv.parsed.table_users}`,
					(error, data) => {
						return error
							? reject({ code: 2000, message: error.code })
							: resolve(
								res.create(
									data.length > 0
										? `Money was counted successfully`
										: `Money could not be counted`,
									data.length > 0 ? data[0] : null
								)
							);
					}
				);
			} catch (error) {
				return reject({ code: 1008, message: "could not perform transaction" });
			}
		});
	},
	get_pending_money: async () => {
		return new Promise((resolve, reject) => {
			try {
				constants.sql.query(
					`SELECT 
						SUM(pendingMoney)
						FROM ${constants.dotenv.parsed.table_users}`,
					(error, data) => {
						return error
							? reject({ code: 2000, message: error.code })
							: resolve(
								res.create(
									data.length > 0
										? `Money was counted successfully`
										: `Money could not be counted`,
									data.length > 0 ? data[0] : null
								)
							);
					}
				);
			} catch (error) {
				return reject({ code: 1008, message: "could not perform transaction" });
			}
		});
	},
}