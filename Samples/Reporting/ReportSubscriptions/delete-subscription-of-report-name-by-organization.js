'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function delete_subscription_of_report_name_by_organization(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var organizationId = null;

		var opts = [];
		if (organizationId!= null) opts['organizationId'] = organizationId;

		var instance = new cybersourceRestApi.ReportSubscriptionsApi(configObject, apiClient);

		var reportName = 'testrest_v2';

		instance.deleteSubscription( reportName, opts, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Delete Subscription of a Report Name by Organization : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	delete_subscription_of_report_name_by_organization(function () {
		console.log('\nDeleteSubscription end.');
	});
}
module.exports.delete_subscription_of_report_name_by_organization = delete_subscription_of_report_name_by_organization;
