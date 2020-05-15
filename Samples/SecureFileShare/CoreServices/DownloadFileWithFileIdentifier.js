'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This is a sample code to call SecureFileShareApi,
 * Download a file for the given file identifier
 */
function downloadFileWithFileIdentifier(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();

		//File name in which report get downloaded
		var downloadFilePath = 'Resource\\DownloadFileWithFileIdentifier';
		apiClient.downloadFilePath = path.resolve(downloadFilePath);
		apiClient.acceptHeader = "text/csv";

		var instance = new cybersourceRestApi.SecureFileShareApi(configObject, apiClient);
		var fileId = 'dGVzdHJlc3Rfc3ViY3JpcHRpb25fdjI5ODktYTM3ZmI2ZjUtM2QzYi0wOGVhLWUwNTMtYTI1ODhlMGFkOTJjLnhtbC0yMDIwLTA0LTMw';
		var opts = [];
		opts['organizationId'] = 'testrest';

		console.log('****************Download File with Identifier****************');

		instance.getFile(fileId, opts, function (error, data, response) {
			if (error) {
				console.log('\nError in download file with identifier : ' + JSON.stringify(error));
			}
			else
			{
				console.log('\nSuccessfully retrieved the file');
				console.log('File has been downloaded at this location :' + apiClient.downloadFilePath);
			}
			callback();
		});

	} catch (error) {
		console.log(error);
	}

}
if (require.main === module) {
	downloadFileWithFileIdentifier(function () {
		console.log('Download file with file identifier end.');
	});
}
module.exports.downloadFileWithFileIdentifier = downloadFileWithFileIdentifier;