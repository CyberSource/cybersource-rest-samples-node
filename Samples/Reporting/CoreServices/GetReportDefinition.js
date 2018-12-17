'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This is a sample code to call ReportDefinitionsApi,
 * The report definition name must be used as path parameter
 */
function getReportDefinition(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.ReportDefinitionsApi(configObject);

		var reportDefinitionName = 'AcquirerExceptionDetailClass';

		var opts = {};

		console.log('****************Get Reports Definition****************');

		instance.getResourceInfoByReportDefinition(reportDefinitionName, opts, function (error, data, response) {
			if (error) {
				console.log('\nError in get report definition : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData of get report definition : ' + JSON.stringify(data));
			}
			console.log('\nResponse of get report definition : ' + JSON.stringify(response));
			console.log('\nResponse Code of get report definition : ' + JSON.stringify(response['status']));
			callback(error, data);
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	getReportDefinition(function () {
		console.log('Get report definition end.');
	});
}
module.exports.getReportDefinition = getReportDefinition;