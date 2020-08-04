'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function get_list_of_batch_files(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var startTime = '2020-02-22T01:47:57.000Z';
		var endTime = '2020-02-22T22:47:57.000Z';

		var opts = [];

		var instance = new cybersourceRestApi.TransactionBatchesApi(configObject, apiClient);

		instance.getTransactionBatches(startTime, endTime, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get a List of Batch Files : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	get_list_of_batch_files(function () {
		console.log('\nGetTransactionBatches end.');
	});
}
module.exports.get_list_of_batch_files = get_list_of_batch_files;
