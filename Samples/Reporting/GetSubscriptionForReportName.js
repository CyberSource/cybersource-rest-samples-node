'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function getSubscriptionForReportName(callback, reportName) {
	try {
		var configObject = new configuration();

		var instance = new cybersourceRestApi.ReportSubscriptionsApi(configObject);

		instance.getSubscription( reportName, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get subscription for report name : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var reportName = readline.question("\nEnter missing path parameter <reportName>: ");
		getSubscriptionForReportName(function () {
		console.log('\nGetSubscription end.');
	},reportName);
}
module.exports.getSubscriptionForReportName = getSubscriptionForReportName;
