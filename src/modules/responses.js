const constants = require('./constants');

exports.parameterMissing = (res, result) => {
	let response = {
		"message": result,
		"response" : {}
	};
	res.status(constants.responseFlags.PARAMETER_MISSING).json(response);
};

exports.alreadyExist = (res, result) => {
	let response = {
		"message": result,
		"response" : {}
	};
	res.status(constants.responseFlags.ALREADY_EXIST).json(response);
};

exports.invalidCredential = function (res, msg) {
	var response = {
		"message": msg,
		"response" : {}
	};
	res.status(constants.responseFlags.INVALID_CREDENTIAL).json(response);
};

exports.authenticationErrorResponse =  (res) => {
	var response = {
		"message": constants.responseMessages.INVALID_ACCESS_TOKEN,
		"response" : {}
	};
	res.status(constants.responseFlags.INVALID_ACCESS_TOKEN).json(response);
};

exports.sendError = (error, res) => {
	var response = {
		"message": constants.responseMessages.ERROR_IN_EXECUTION,
		"response" : {},
		"error": error
	};
	res.status(constants.responseFlags.ERROR_IN_EXECUTION).json(response);
};

exports.sendResult = (res, result) => {
	var response = {
		"message": constants.responseMessages.ACTION_COMPLETE,
		"response" : result
	};
	res.status(constants.responseFlags.ACTION_COMPLETE).json(response);
};

exports.sendLoginResponse = (res, token, result) => {
	var response = {
		"message": constants.responseMessages.ACTION_COMPLETE,
		"response" : result
	};
	res.header('accessToken', token).status(constants.responseFlags.ACTION_COMPLETE).json(response);
};

exports.authResponse = (res, result, token) => {
	var response = {
		"message": constants.responseMessages.ACTION_COMPLETE,
		"response" : result,
		"token": token
	};
	res.status(constants.responseFlags.ACTION_COMPLETE).json(response);
};

exports.userNotExist = (res) => {
	var response = {
		"message": "User not found.",
		"response" : {}
	};
	res.status(constants.responseFlags.ACTION_COMPLETE).json(response);	
}
