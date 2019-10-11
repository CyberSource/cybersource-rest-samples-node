'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function downloadXSDForReport(callback, reportDefinitionNameVersion) {
	try {
		var configObject = new configuration();

		var instance = new cybersourceRestApi.DownloadXSDApi(configObject);

		instance.getXSDV2( reportDefinitionNameVersion, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Download XSD for report : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var reportDefinitionNameVersion = readline.question("\nEnter missing path parameter <reportDefinitionNameVersion>: ");
		downloadXSDForReport(function () {
		console.log('\nGetXSDV2 end.');
	},reportDefinitionNameVersion);
}
module.exports.downloadXSDForReport = downloadXSDForReport;
