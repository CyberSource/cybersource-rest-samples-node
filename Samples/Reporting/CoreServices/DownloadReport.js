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
		var downloadFilePath = 'Resource\\reportName.xml';
		apiClient.downloadFilePath = path.resolve(downloadFilePath);

		var instance = new cybersourceRestApi.ReportDownloadsApi(configObject, apiClient);

		var reportDate = '2018-09-02';
		var reportName = 'testrest_v2';
		var opts = [];
		opts['organizationId'] = 'testrest';

		console.log('****************Download Report****************');

		instance.downloadReport(reportDate, reportName, opts, function (error, data) {
			if (error) {
				console.log('\nError in Download report : ' + JSON.stringify(error));
			}
			callback(error, data);
		});
		console.log('File downloaded at the below location :\n' + apiClient.downloadFilePath);
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
