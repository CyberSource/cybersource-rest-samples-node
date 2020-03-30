'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function get_report_definition(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var subscriptionType = null;
		var reportMimeType = null;
		var organizationId = "testrest";
		var reportDefinitionName = 'AcquirerExceptionDetailClass';

		var opts = [];
		if (subscriptionType != null) opts['subscriptionType'] = subscriptionType;
		if (reportMimeType != null) opts['reportMimeType'] = reportMimeType;
		if (organizationId != null) opts['organizationId'] = organizationId;

		var instance = new cybersourceRestApi.ReportDefinitionsApi(configObject, apiClient);

		instance.getResourceInfoByReportDefinition(reportDefinitionName, opts, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get Report Definition : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	get_report_definition(function () {
		console.log('\nGetResourceInfoByReportDefinition end.');
	});
}
module.exports.get_report_definition = get_report_definition;
