'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function get_payment_batch_summary_data(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var startTime = '2024-09-01T12:00:00Z';
		var endTime = '2024-09-30T12:00:00Z';
		var organizationId = "testrest";
		var rollUp = null;
		var breakdown = null;
		var startDayOfWeek = null;

		var opts = [];
		if (organizationId != null) opts['organizationId'] = organizationId;
		if (rollUp != null) opts['rollUp'] = rollUp;
		if (breakdown != null) opts['breakdown'] = breakdown;
		if (startDayOfWeek != null) opts['startDayOfWeek'] = startDayOfWeek;

		var instance = new cybersourceRestApi.PaymentBatchSummariesApi(configObject, apiClient);

		instance.getPaymentBatchSummary(startTime, endTime, opts, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get Payment Batch Summary Data : ' + JSON.stringify(response['status']));
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
	get_payment_batch_summary_data(function () {
		console.log('\nGetPaymentBatchSummary end.');
	});
}
module.exports.get_payment_batch_summary_data = get_payment_batch_summary_data;
