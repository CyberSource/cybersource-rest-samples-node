'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function get_retrieval_details(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		// QUERY PARAMETERS
		var organizationId = "testrest";
		var startTime = '2021-08-01T00:00:00Z';
		var endTime = '2021-09-01T23:59:59Z';
		var opts = {}

		if (organizationId != null) opts['organizationId'] = organizationId;

		var instance = new cybersourceRestApi.RetrievalDetailsApi(configObject, apiClient);

		instance.getRetrievalDetails(startTime, endTime, opts, function (error, data, response) {
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
			console.log('\nResponse Code of Get Retrieval Details : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}

if (require.main === module) {
	get_retrieval_details(function () {
		console.log('\nGetRetrievalDetails end.');
	});
}

module.exports.get_retrieval_details = get_retrieval_details;