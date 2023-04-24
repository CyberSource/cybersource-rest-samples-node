'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function get_user_information_deprecated(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var organizationId = "testrest";
		var userName = null;
		var permissionId = "CustomerProfileViewPermission";
		var roleId = null;

		var opts = [];
		if (organizationId!= null) opts['organizationId'] = organizationId;
		if (userName!= null) opts['userName'] = userName;
		if (permissionId!= null) opts['permissionId'] = permissionId;
		if (roleId!= null) opts['roleId'] = roleId;

		var instance = new cybersourceRestApi.UserManagementApi(configObject, apiClient);

		instance.getUsers( opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get User Information - Deprecated : ' + JSON.stringify(response['status']));
			var status = response['status'];
			write_log_audit(status);
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}

function write_log_audit(status) {
	var filename = path.basename(__filename).split(".")[0];
	console.log(`[Sample Code Testing] [${filename}] ${status}`);
}

if (require.main === module) {	
		get_user_information_deprecated(function () {
		console.log('\nGetUsers end.');
	});
}
module.exports.get_user_information_deprecated = get_user_information_deprecated;
