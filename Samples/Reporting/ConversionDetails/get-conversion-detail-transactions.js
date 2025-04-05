'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function get_conversion_detail_transactions(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var startTime = '2024-09-21T00:00:00Z';
		var endTime = '2024-09-21T23:00:00Z';
		var organizationId = "testrest";

		var opts = [];
		if (organizationId != null) opts['organizationId'] = organizationId;

		var instance = new cybersourceRestApi.ConversionDetailsApi(configObject, apiClient);

		instance.getConversionDetail(startTime, endTime, opts, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get Conversion Detail Transactions : ' + JSON.stringify(response['status']));
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
	get_conversion_detail_transactions(function () {
		console.log('\nGetConversionDetail end.');
	});
}
module.exports.get_conversion_detail_transactions = get_conversion_detail_transactions;
