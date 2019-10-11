'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function retrieveAvailableReports(callback) {
	try {
		var configObject = new configuration();
		var organizationId = null;
		var startTime = '2018-10-01T00:00:00.0Z';
		var endTime = '2018-10-30T23:59:59.0Z';
		var timeQueryType = "executedTime";
		var reportMimeType = "application/xml";
		var reportFrequency = null;
		var reportName = null;
		var reportDefinitionId = null;
		var reportStatus = null;

		var opts = [];
		if (organizationId!= null) opts['organizationId'] = organizationId;
		if (reportMimeType!= null) opts['reportMimeType'] = reportMimeType;
		if (reportFrequency!= null) opts['reportFrequency'] = reportFrequency;
		if (reportName!= null) opts['reportName'] = reportName;
		if (reportDefinitionId!= null) opts['reportDefinitionId'] = reportDefinitionId;
		if (reportStatus!= null) opts['reportStatus'] = reportStatus;

		var instance = new cybersourceRestApi.ReportsApi(configObject);

		instance.searchReports( startTime, endTime, timeQueryType, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Retrieve available reports : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var organizationId = readline.question("\nEnter missing query parameter <organizationId>: ");
		var startTime = readline.question("\nEnter missing query parameter <startTime>: ");
		var endTime = readline.question("\nEnter missing query parameter <endTime>: ");
		var timeQueryType = readline.question("\nEnter missing query parameter <timeQueryType>: ");
		var reportMimeType = readline.question("\nEnter missing query parameter <reportMimeType>: ");
		var reportFrequency = readline.question("\nEnter missing query parameter <reportFrequency>: ");
		var reportName = readline.question("\nEnter missing query parameter <reportName>: ");
		var reportDefinitionId = readline.question("\nEnter missing query parameter <reportDefinitionId>: ");
		var reportStatus = readline.question("\nEnter missing query parameter <reportStatus>: ");
		retrieveAvailableReports(function () {
		console.log('\nSearchReports end.');
	},organizationId, startTime, endTime, timeQueryType, reportMimeType, reportFrequency, reportName, reportDefinitionId, reportStatus);
}
module.exports.retrieveAvailableReports = retrieveAvailableReports;
