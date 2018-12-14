'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This is a sample code to call ReportSubscriptionsApi,
 * delete subscription report
 */
function deleteSubscriptionReport(name, callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.ReportSubscriptionsApi(configObject);


		var reportName = 'testrest_v2';
		if (name !== '')
			reportName = name;
		console.log('****************Delete Subscription of Report Name****************');

		instance.deleteSubscription(reportName, function (error, data, response) {
			if (error) {
				console.log('\nError in Delete subscription of report name : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData of Delete subscription of report name : ' + JSON.stringify(data));
			}
			console.log('\nResponse of Delete subscription of report name : ' + JSON.stringify(response));
			console.log('\nResponse Code of Delete subscription of report name : ' + JSON.stringify(response['status']));
			callback(error, data);
		});

	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	deleteSubscriptionReport('', function () {
		console.log('Delete subscription of report name end.');
	});
}
module.exports.deleteSubscriptionReport = deleteSubscriptionReport;