'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function getUserInformation(callback) {
	try {
		var configObject = new configuration();
		var organizationId = "testrest";
		var userName = null;
		var permissionId = "CustomerProfileViewPermission";
		var roleId = null;

		var opts = [];
		if (organizationId!= null) opts['organizationId'] = organizationId;
		if (userName!= null) opts['userName'] = userName;
		if (permissionId!= null) opts['permissionId'] = permissionId;
		if (roleId!= null) opts['roleId'] = roleId;

		var instance = new cybersourceRestApi.UserManagementApi(configObject);

		instance.getUsers( opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get user information : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var organizationId = readline.question("\nEnter missing query parameter <organizationId>: ");
		var userName = readline.question("\nEnter missing query parameter <userName>: ");
		var permissionId = readline.question("\nEnter missing query parameter <permissionId>: ");
		var roleId = readline.question("\nEnter missing query parameter <roleId>: ");
		getUserInformation(function () {
		console.log('\nGetUsers end.');
	},organizationId, userName, permissionId, roleId);
}
module.exports.getUserInformation = getUserInformation;
