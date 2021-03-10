const { json } = require("body-parser");
const constants = require("../core/app_constants"),
	res = require("../core/response");

module.exports = {
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
	modify_user_customer: async (contents) => {
		return new Promise((resolve, reject) => {
			try {
				constants.sql.query(
					"UPDATE customersdata SET ? WHERE contractId=?",
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
					"INSERT INTO customersdata (contractId, name, nationalID, cost, discount, costAfterDiscount, lastBillDate, firstBillDate, phone1, phone2, phone3, phone4, phone5, phone6, phone7, phone8, collecterName, attributionDate, status, notes, paymentDate, newCondition, secondPaymentDate, secondNotes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
					[
						content.contractId, content.name , content.nationalID ,
						content.cost , content.discount , content.costAfterDiscount,
						content.lastBillDate, content.firstBillDate , content.phone1 ,
						content.phone2 , content.phone3 , content.phone4,
						content.phone5, content.phone6 , content.phone7 ,
						content.phone8 , content.collecterName , content.attributionDate,
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
					"DELETE FROM customersdata WHERE contractId=?",
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
