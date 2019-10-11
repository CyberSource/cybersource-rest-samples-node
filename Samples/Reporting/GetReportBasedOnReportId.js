'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function getReportBasedOnReportId(callback, reportId) {
	try {
		var configObject = new configuration();
		var organizationId = "testrest";

		var opts = [];
		if (organizationId!= null) opts['organizationId'] = organizationId;

		var instance = new cybersourceRestApi.ReportsApi(configObject);

		instance.getReportByReportId( reportId, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get Report based on reportId : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var reportId = readline.question("\nEnter missing path parameter <reportId>: ");
		var organizationId = readline.question("\nEnter missing query parameter <organizationId>: ");
		getReportBasedOnReportId(function () {
		console.log('\nGetReportByReportId end.');
	},reportId, organizationId);
}
module.exports.getReportBasedOnReportId = getReportBasedOnReportId;
