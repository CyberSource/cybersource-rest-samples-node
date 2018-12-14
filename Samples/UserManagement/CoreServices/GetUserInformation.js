'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This is a sample code to call UserManagementApi,
 * retrive transaction by username
 */
function getUserInformation(callback) {
	try {
        
		var configObject = new configuration();
		var instance = new cybersourceRestApi.UserManagementApi(configObject);

		var opts = [];
		opts['organizationId'] = 'testrest';

		console.log('\n***************  Retrieve User Information  ********************* ');

		instance.getUsers(opts, function (error, data, response) {
			if (error) {
				console.log('\nError in retrieve user information : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData of retrieve user information : ' + JSON.stringify(data));
			}
			console.log('\nResponse of  retrieve user information  : ' + JSON.stringify(response));
			console.log('\nResponse Code of get user information : ' + JSON.stringify(response['status']));
			callback(error, data);
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	getUserInformation(function () {
		console.log('Retrieve UserInformation end.');
	});
}
module.exports.getUserInformation = getUserInformation;
