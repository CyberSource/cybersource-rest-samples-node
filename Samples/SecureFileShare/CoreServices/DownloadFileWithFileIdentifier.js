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
		var downloadFilePath = 'Resource\\DownloadFileWithFileIdentifier.csv';
		apiClient.downloadFilePath = path.resolve(downloadFilePath);

		var instance = new cybersourceRestApi.SecureFileShareApi(configObject, apiClient);
		var fileId = 'VFJSUmVwb3J0LTc4NTVkMTNmLTkzOTgtNTExMy1lMDUzLWEyNTg4ZTBhNzE5Mi5jc3YtMjAxOC0xMC0yMA==';
		var opts = [];
		opts['organizationId'] = 'testrest';

		console.log('****************Download File with Identifier****************');

		instance.getFile(fileId, opts, function (error, data) {
			if (error) {
				console.log('\nError in download file with identifier : ' + JSON.stringify(error));
			}
			console.log('\n: ');
			callback(error, data);
		});
		console.log('File downloaded at the below location :\n' + apiClient.downloadFilePath);
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