'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function create_classicstandard_report_subscription(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.PredefinedSubscriptionRequestBean();

		requestObj.reportDefinitionName = 'TransactionRequestClass';
		requestObj.subscriptionType = 'CLASSIC';
		var organizationId = null;

		var opts = [];
		if (organizationId != null) opts['organizationId'] = organizationId;

		var instance = new cybersourceRestApi.ReportSubscriptionsApi(configObject, apiClient);

		instance.createStandardOrClassicSubscription(requestObj, opts, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Create a Standard or Classic Subscription : ' + JSON.stringify(response['status']));
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
	create_classicstandard_report_subscription(function () {
		console.log('\nCreateStandardOrClassicSubscription end.');
	});
}
module.exports.create_classicstandard_report_subscription = create_classicstandard_report_subscription;
