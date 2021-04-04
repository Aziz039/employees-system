module.exports = {
	create: (success_message, body) => {
		return {
			is_successful: true,
			error_code: 0,
			success_message: success_message,
			error_message: null,
			body: body,
		};
	},
	error: (error) => {
		return {
			is_successful: false,
			error_code: error.code,
			success_message: null,
			error_message: error.message,
			body: null,
		};
	},
};