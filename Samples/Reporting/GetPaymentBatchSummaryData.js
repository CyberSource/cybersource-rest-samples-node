'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function getPaymentBatchSummaryData(callback) {
	try {
		var configObject = new configuration();
		var startTime = '2019-05-01T12:00:00-05:00';
		var endTime = '2019-08-30T12:00:00-05:00';
		var organizationId = "testrest";
		var rollUp = null;
		var breakdown = null;
		var startDayOfWeek = null;

		var opts = [];
		if (organizationId!= null) opts['organizationId'] = organizationId;
		if (rollUp!= null) opts['rollUp'] = rollUp;
		if (breakdown!= null) opts['breakdown'] = breakdown;
		if (startDayOfWeek!= null) opts['startDayOfWeek'] = startDayOfWeek;

		var instance = new cybersourceRestApi.PaymentBatchSummariesApi(configObject);

		instance.getPaymentBatchSummary( startTime, endTime, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get payment batch summary data : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var startTime = readline.question("\nEnter missing query parameter <startTime>: ");
		var endTime = readline.question("\nEnter missing query parameter <endTime>: ");
		var organizationId = readline.question("\nEnter missing query parameter <organizationId>: ");
		var rollUp = readline.question("\nEnter missing query parameter <rollUp>: ");
		var breakdown = readline.question("\nEnter missing query parameter <breakdown>: ");
		var startDayOfWeek = readline.question("\nEnter missing query parameter <startDayOfWeek>: ");
		getPaymentBatchSummaryData(function () {
		console.log('\nGetPaymentBatchSummary end.');
	},startTime, endTime, organizationId, rollUp, breakdown, startDayOfWeek);
}
module.exports.getPaymentBatchSummaryData = getPaymentBatchSummaryData;
