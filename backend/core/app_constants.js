const path = require("path"),
	sql = require("mysql"),
	bcrypt = require("bcrypt"),
	jwt = require("jsonwebtoken");

require("dotenv").config({ path: path.resolve(process.cwd(), "local.env") });

module.exports = {
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
			let tokenKey = jwt.sign({ username, expireTime }, 'shhhhh');
			return tokenKey;
		} catch (error) {
			reject(error);
		}
		const userName = request;
		const expireTime = Date.now() + 43200000; // expires in 12 hours
		if (typeof userName !== "undefined") {
			jwt.sign({ userName, expireTime }, 'shhhhh');
			next();
		} else {
			return false;
		}
	},
	verify_token: (request, response, next) => {
		const bearerHeader = request.headers["user_token"];
		if (typeof bearerHeader !== "undefined") {
			const bearer = bearerHeader.split(" "),
				bearerToken = bearer[1];
			request.token = bearerToken;
			next();
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