'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function getReportDefinition(callback, reportDefinitionName) {
	try {
		var configObject = new configuration();
		var organizationId = "testrest";

		var opts = [];
		if (organizationId!= null) opts['organizationId'] = organizationId;

		var instance = new cybersourceRestApi.ReportDefinitionsApi(configObject);

		instance.getResourceInfoByReportDefinition( reportDefinitionName, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get report definition : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var reportDefinitionName = readline.question("\nEnter missing path parameter <reportDefinitionName>: ");
		var organizationId = readline.question("\nEnter missing query parameter <organizationId>: ");
		getReportDefinition(function () {
		console.log('\nGetResourceInfoByReportDefinition end.');
	},reportDefinitionName, organizationId);
}
module.exports.getReportDefinition = getReportDefinition;
