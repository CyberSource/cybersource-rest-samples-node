'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function get_subscription_for_report_name(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var organizationId = null;

		var opts = [];
		if (organizationId!= null) opts['organizationId'] = organizationId;

		var instance = new cybersourceRestApi.ReportSubscriptionsApi(configObject, apiClient);

		var reportName = 'testv2_subscription';

		instance.getSubscription( reportName, opts, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get Subscription for Report Name : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	get_subscription_for_report_name(function () {
		console.log('\nGetSubscription end.');
	});
}
module.exports.get_subscription_for_report_name = get_subscription_for_report_name;
