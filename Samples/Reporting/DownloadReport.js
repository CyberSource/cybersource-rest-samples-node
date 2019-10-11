'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function downloadReport(callback) {
	try {
		var configObject = new configuration();
		var organizationId = "testrest";
		var reportDate = '2018-09-30';
		var reportName = "Demo_Report";

		var opts = [];
		if (organizationId!= null) opts['organizationId'] = organizationId;

		var instance = new cybersourceRestApi.ReportDownloadsApi(configObject);

		instance.downloadReport( reportDate, reportName, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Download a report : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var organizationId = readline.question("\nEnter missing query parameter <organizationId>: ");
		var reportDate = readline.question("\nEnter missing query parameter <reportDate>: ");
		var reportName = readline.question("\nEnter missing query parameter <reportName>: ");
		downloadReport(function () {
		console.log('\nDownloadReport end.');
	},organizationId, reportDate, reportName);
}
module.exports.downloadReport = downloadReport;
