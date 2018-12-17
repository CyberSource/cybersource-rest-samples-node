'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This is a sample code to call ReportSubscriptionsApi,
 * retrive report by report name
 */
function getSubscriptionForReportName(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.ReportSubscriptionsApi(configObject);

		var reportName = 'createsubscription_report';

		console.log('****************Get Subscription for Report name****************');

		instance.getSubscription(reportName, function (error, data, response) {
			if (error) {
				console.log('\nError in get subscription for report name : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData of get subscription for report name : ' + JSON.stringify(data));
			}
			console.log('\nResponse of get subscription for report name : ' + JSON.stringify(response));
			console.log('\nResponse Code of get subscription for report name : ' + JSON.stringify(response['status']));
			callback(error, data);
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	getSubscriptionForReportName(function () {
		console.log('Get subscription for report name end.');
	});
}
module.exports.getSubscriptionForReportName = getSubscriptionForReportName;
