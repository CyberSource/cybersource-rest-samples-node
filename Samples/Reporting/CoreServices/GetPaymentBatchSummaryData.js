'use strict';

var CyberSourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function getPaymentBatchSummaryData(callback){
	try {
		var configObject = new configuration();
		var startTime = '2019-05-01T12:00:00-05:00';
		var endTime = '2019-08-30T12:00:00-05:00';
		var opts = [];
		
		opts["organizationId"] = "testrest";

		var instance = new CyberSourceRestApi.PaymentBatchSummariesApi(configObject);		

		instance.getPaymentBatchSummary(startTime, endTime, opts, function (error, data, response) {
			if(error) {
				console.log('Error : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('Data : ' + JSON.stringify(data));
			}
			
			console.log('Response : ' + JSON.stringify(response));
			console.log('Response Code of Get payment batch summary data : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error)
	{
		console.log('Exception on calling the API : ' + error);
	}
}

if (require.main === module) {
	getPaymentBatchSummaryData(function () {
		console.log('getPaymentBatchSummary end.');
	});
}
module.exports.getPaymentBatchSummaryData = getPaymentBatchSummaryData;
