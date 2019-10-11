'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function getReportingResourceInformation(callback) {
	try {
		var configObject = new configuration();
		var organizationId = "testrest";

		var opts = [];
		if (organizationId!= null) opts['organizationId'] = organizationId;

		var instance = new cybersourceRestApi.ReportDefinitionsApi(configObject);

		instance.getResourceV2Info( opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get reporting resource information : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var organizationId = readline.question("\nEnter missing query parameter <organizationId>: ");
		getReportingResourceInformation(function () {
		console.log('\nGetResourceV2Info end.');
	},organizationId);
}
module.exports.getReportingResourceInformation = getReportingResourceInformation;
