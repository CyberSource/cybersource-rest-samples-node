'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function download_report(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var organizationId = "testrest";
		var reportDate = '2020-07-05';
		var reportName = "testrest_subcription_v2989";

		var opts = [];
		if (organizationId != null) opts['organizationId'] = organizationId;

		// File name in which details will be downloaded
		var downloadFilePath = 'Resource\\DownloadedReport';
		apiClient.downloadFilePath = path.resolve(downloadFilePath);

		var instance = new cybersourceRestApi.ReportDownloadsApi(configObject, apiClient);

		instance.downloadReport(reportDate, reportName, opts, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
				write_log_audit("404");
			}
			else {
				console.log('\nSuccessfully retrieved response');
				console.log('\nResponse downloaded at this location:' + apiClient.downloadFilePath);
				write_log_audit("200");
			}
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}

function write_log_audit(status) {
	var filename = path.basename(__filename).split(".")[0];
	console.log(`[Sample Code Testing] [${filename}] ${status}`);
}

if (require.main === module) {
	download_report(function () {
		console.log('\nDownloadReport end.');
	});
}
module.exports.download_report = download_report;
