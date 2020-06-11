'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function retrieve_available_reports(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var organizationId = null;
		var startTime = '2020-04-01T00:00:00Z';
		var endTime = '2020-04-03T23:59:59Z';
		var timeQueryType = "executedTime";
		var reportMimeType = "application/xml";
		var reportFrequency = null;
		var reportName = null;
		var reportDefinitionId = null;
		var reportStatus = null;

		var opts = [];
		if (organizationId != null) opts['organizationId'] = organizationId;
		if (reportMimeType != null) opts['reportMimeType'] = reportMimeType;
		if (reportFrequency != null) opts['reportFrequency'] = reportFrequency;
		if (reportName != null) opts['reportName'] = reportName;
		if (reportDefinitionId != null) opts['reportDefinitionId'] = reportDefinitionId;
		if (reportStatus != null) opts['reportStatus'] = reportStatus;

		var instance = new cybersourceRestApi.ReportsApi(configObject, apiClient);

		instance.searchReports(startTime, endTime, timeQueryType, opts, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Retrieve Available Reports : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	retrieve_available_reports(function () {
		console.log('\nSearchReports end.');
	});
}
module.exports.retrieve_available_reports = retrieve_available_reports;
