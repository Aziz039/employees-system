const path = require("path"),
	sql = require("mysql"),
	bcrypt = require("bcrypt"),
	jwt = require("jsonwebtoken");

const dotenv = require("dotenv").config({ path: path.resolve(process.cwd(), "local.env") });
client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
module.exports = {
	fs: require("fs"),
	dotenv: dotenv,
	express: require("express"),
	mysql: require("mysql"),
	jwt: require("jsonwebtoken"),
	bodyParser: require("body-parser"),
	axios: require("axios"),
	bcrypt: require("bcrypt"),
	hash: async (key) => {
		return new Promise((resolve, reject) => {
			try {
				bcrypt.hash(key, 10, async (err, hash) => {
					return err ? reject(err) : resolve(hash);
				});
			} catch (error) {
				return error;
			}
		});
	},
	unhash: async (unhashed, hashed) => {
		return new Promise(async (resolve, reject) => {
			try {
				return await bcrypt.compare(unhashed, hashed, async (err, result) => {
					return err ? reject(err) : resolve(result);
				});
			} catch (error) {
				reject(error);
			}
		});
	},
	sign_token: (username) => {
		try {
			let expireTime = Date.now() + 86400000; // 25200000 = expires in 7 hours - 86400000 = 24hr
			let tokenKey = jwt.sign({ username, expireTime }, process.env.api_key);
			return tokenKey;
		} catch (error) {
			reject(error);
		}
	},
	verify_token: (request, response, next) => {
		const bearerHeader = request.headers["user_token"];
		if (typeof bearerHeader !== "undefined") {
			const bearer = bearerHeader.split(" "),
				bearerToken = bearer[1];
			request.user_token = bearerToken;
			jwt.verify(request.user_token, request.headers["api_key"], async (token_error) => {
				if (!token_error) {
					next();
				} else {
					return response.json({ msg: "token failure" });
				}
			})
		} else {
			return response.json({ msg: "token failure" });
		}
	},
	verify_credentials: async (key) => {
		return new Promise((resolve, reject) => {
			try {
				bcrypt.hash(key, 10, async (err, hash) => {
					return err ? reject(err) : resolve(hash);
				});
			} catch (error) {
				return error;
			}
		});
	},
	sql: sql.createConnection({
		host: process.env.database_host_local,
		user: process.env.database_user_local,
		password: process.env.database_password_local,
		database: process.env.database_database_local,
		queryTimeout: 60000,
		timezone: "-03:00",
	}),
	sms: async (content) => {
		return new Promise((resolve, reject) => {
			try {
				client.messages
					.create({
						body: content.message,
						from: '+12162202550',
						to: content.to
					})
					.then(message =>  resolve(message))
					.catch(err => reject(err));
			} catch (error) {
				reject(error);
			}
		});
		
		
	}
};

// local
// sql: sql.createConnection({
// 	host: process.env.database_host_local,
// 	user: process.env.database_user_local,
// 	password: process.env.database_password_local,
// 	database: process.env.database_database_local,
// 	queryTimeout: 60000,
// 	timezone: "-03:00",
// }),

// Azure
// sql: sql.createConnection({
// 	host: process.env.database_host_azure,
// 	user: process.env.database_user_azure,
// 	password: process.env.database_password_azure,
// 	database: process.env.database_database_azure,
// 	port: 3306,
// 	ssl: true
// }),