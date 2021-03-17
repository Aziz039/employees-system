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
			WEB: "123",
		},
		CONTENT_TYPE: "application/json",
		LANGUAGE: {
			ARABIC: "ar",
			ENGLISH: "en",
		},
		sessionStorage: {
			LANGUAGE: "en",
			USER: "user",
			TOKEN: "",
		},
	},
	HTTP_REQUESTS: {
		meta: {
			main_page: environmentURL + "meta",
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