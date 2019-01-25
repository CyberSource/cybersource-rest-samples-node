'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var fs = require('fs');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));

/**
 * This is a sample code to call ReportDownloadsApi,
 * download  report 
 */
function downloadReport(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();

		//File name in which report get downloaded
		var downloadFilePath = path.join('Resource','reportName.xml');

		var instance = new cybersourceRestApi.ReportDownloadsApi(configObject, apiClient);

		var reportDate = '2018-09-02';
		var reportName = 'testrest_v2';
		var opts = [];
		opts['organizationId'] = 'testrest';

		console.log('\n[BEGIN] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');

		instance.downloadReport(reportDate, reportName, opts, function (error, data, response) {
			if (error) {
				console.log('\n API ERROR : \n ' + JSON.stringify(error));
			}
			if(response){
				console.log('\n API REQUEST HEADERS : \n' + JSON.stringify(response.req._headers,0,2));
				console.log('\n API RESPONSE BODY : ' + JSON.stringify(response) + '\n'); 
				console.log('\n API RESPONSE CODE : ' + JSON.stringify(response['status']));
				console.log('\n API RESPONSE HEADERS : \n' + JSON.stringify(response.header,0,2));
				if(JSON.stringify(response['status']) === '200'){
					const stream = fs.createWriteStream(downloadFilePath);
					response.pipe(stream);
					console.log('\n File downloaded at the below location :\n' + path.resolve(downloadFilePath));
				}						
			}
			callback(error, data);
		});
		
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	downloadReport(function () {
		console.log('\n[END] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
	});
}
module.exports.downloadReport = downloadReport;
