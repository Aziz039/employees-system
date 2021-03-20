export const BASE_URL = {
	LOCAL: "http://localhost:2030/api/",
	DEV: "",
	PREPROD: "",
	PROD: "",
};

export const environmentURL = BASE_URL.LOCAL;

const APP_CONSTANTS = {
	APP_NAME: "Alra2edoon System",
	CONFIG: {
		API_KEY: {
			WEB: "AbdulazizApiSecretKey",
		},
		APIs: {
			AUTH: {
				LOGIN: environmentURL + "auth/login"
			},
			CMS: {
				GET_ALL_CUSTOMERS: environmentURL + "cms/user_customers",
				GET_CUSTOMER: environmentURL + "cms/user_customers",
			},
			USERS:{
				GET_ALL_USERS: environmentURL + "users",
				GET_USER: environmentURL + "users",
			}
		},
		CONTENT_TYPE: "application/json",
		LANGUAGE: {
			ARABIC: "ar",
			ENGLISH: "en",
		},
		sessionStorage: {
			LANGUAGE: "LANGUAGE",
			USER: "USER",
			TOKEN: "TOKEN",
			isLogged: "isLogged"
		},
	}, 
};

export const userToken = sessionStorage.getItem(
	APP_CONSTANTS.CONFIG.sessionStorage.TOKEN
);

export const config = {
	headers: {
		"content-type": APP_CONSTANTS.CONFIG.CONTENT_TYPE,
		user_token: "Bearer " + userToken,
		api_key: APP_CONSTANTS.CONFIG.API_KEY.WEB,
	},
};

export default APP_CONSTANTS;