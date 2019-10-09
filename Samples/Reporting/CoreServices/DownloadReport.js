'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This is a sample code to call ReportDownloadsApi,
 * download  report 
 */
function downloadReport(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();

		//File name in which report get downloaded
		var downloadFilePath = 'Resource\\reportName';
		apiClient.downloadFilePath = path.resolve(downloadFilePath);

		var instance = new cybersourceRestApi.ReportDownloadsApi(configObject, apiClient);

		var reportDate = '2019-09-05';
		var reportName = 'testrest_subcription_v2989';
		var opts = [];
		opts['organizationId'] = 'testrest';

		console.log('****************Download Report****************');		

		instance.downloadReport(reportDate, reportName, opts, function (error, data, response) {
			if (error) {
				console.log('\nError in retrieving report : ' + JSON.stringify(error));
			}
			else
			{
				console.log('\nSuccessfully retrieved the report');
				console.log('File has been downloaded at this location :' + apiClient.downloadFilePath);
			}
			callback();
		});

	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	downloadReport(function () {
		console.log('Download report end.');
	});
}
module.exports.downloadReport = downloadReport;
