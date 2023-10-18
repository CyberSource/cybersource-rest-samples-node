'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function list_batches(callback) {
	try {
		var offset = 0;
		var limit = 10;
		var fromDate = "20230101T123000Z";
		var toDate = "20231001T123000Z";
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var opts = [];
		if (offset != null) opts['offset'] = offset;
		if (limit != null) opts['limit'] = limit;
		if (fromDate != null) opts['fromDate'] = fromDate;
		if (toDate != null) opts['toDate'] = toDate;

		var instance = new cybersourceRestApi.BatchesApi(configObject, apiClient);

		instance.getBatchesList(opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of List Batches : ' + JSON.stringify(response['status']));

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
	list_batches(function () {
		console.log('\nGetBatchesList end.');
	});
}

module.exports.list_batches = list_batches;
