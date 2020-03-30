'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function create_report_subscription(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreateReportSubscriptionRequest();

		requestObj.reportDefinitionName = 'TransactionRequestClass';

		var reportFields = new Array();
		reportFields.push("Request.RequestID");
		reportFields.push("Request.TransactionDate");
		reportFields.push("Request.MerchantID");
		requestObj.reportFields = reportFields;

		requestObj.reportMimeType = 'application/xml';
		requestObj.reportFrequency = 'WEEKLY';
		requestObj.reportName = 'testrest_subcription_v1';
		requestObj.timezone = 'GMT';
		requestObj.startTime = '0900';
		requestObj.startDay = 1;
		var organizationId = null;

		var opts = [];
		if (organizationId != null) opts['organizationId'] = organizationId;

		var instance = new cybersourceRestApi.ReportSubscriptionsApi(configObject, apiClient);

		instance.createSubscription(requestObj, opts, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Create Report Subscription for a Report Name by Organization : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	create_report_subscription(function () {
		console.log('\nCreateSubscription end.');
	});
}
module.exports.create_report_subscription = create_report_subscription;
