'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function interchange_clearing_level_data_for_account_or_merchant(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		// QUERY PARAMETERS
		var organizationId = "testrest";
		var startTime = '2021-08-01T00:00:00Z';
		var endTime = '2021-09-01T23:59:59Z';
		var opts = {}

		if (organizationId != null) opts['organizationId'] = organizationId;

		var instance = new cybersourceRestApi.InterchangeClearingLevelDetailsApi(configObject, apiClient);

		instance.getInterchangeClearingLevelDetails(startTime, endTime, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			console.log('Response of tokenization : ' + JSON.stringify(response));
			console.log('Response code of tokenization: ' + response['status']);
			console.log('KeyId: ' + keyId);
			console.log('PublicKey : ' + publicKey);
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Interchange Clearing Level data for an account or a merchant : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}

if (require.main === module) {
	interchange_clearing_level_data_for_account_or_merchant(function () {
		console.log('\nGetInterchangeClearingLevelDetails end.');
	});
}

module.exports.interchange_clearing_level_data_for_account_or_merchant = interchange_clearing_level_data_for_account_or_merchant;