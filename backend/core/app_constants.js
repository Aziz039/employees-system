const path = require("path"),
	sql = require("mysql"),
	bcrypt = require("bcrypt"),
	jwt = require("jsonwebtoken");

const dotenv = require("dotenv").config({ path: path.resolve(process.cwd(), "local.env") });

module.exports = {
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
			let expireTime = Date.now() + 25200000; // expires in 7 hours
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
		host: process.env.database_host,
		user: process.env.database_user,
		password: process.env.database_password,
		database: process.env.database_database,
		queryTimeout: 60000,
		timezone: "-03:00",
	}),
};