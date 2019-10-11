'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function downloadReport(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var organizationId = "testrest";
		var reportDate = '2019-09-05';
		var reportName = "testrest_subcription_v2989";

		var opts = [];
		if (organizationId!= null) opts['organizationId'] = organizationId;

		// File name in which details will be downloaded
		var downloadFilePath = 'Resource\\DownloadedReport';
		apiClient.downloadFilePath = path.resolve(downloadFilePath);

		var instance = new cybersourceRestApi.ReportDownloadsApi(configObject, apiClient);

		instance.downloadReport( reportDate, reportName, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else {
				console.log('\nSuccessfully retrieved response');
				console.log('\nResponse downloaded at this location:' + apiClient.downloadFilePath);
			}
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
