'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function downloadFileWithFileIdentifier(callback, fileId) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var organizationId = "testrest";

		var opts = [];
		if (organizationId!= null) opts['organizationId'] = organizationId;

		// File name in which details will be downloaded
		var downloadFilePath = 'Resource\\DownloadedFileWithFileID';
		apiClient.downloadFilePath = path.resolve(downloadFilePath);

		var instance = new cybersourceRestApi.SecureFileShareApi(configObject, apiClient);

		instance.getFile( fileId, opts, function (error, data, response) {
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
		var fileId = readline.question("\nEnter missing path parameter <fileId>: ");
		var organizationId = readline.question("\nEnter missing query parameter <organizationId>: ");
		downloadFileWithFileIdentifier(function () {
		console.log('\nGetFile end.');
	},fileId, organizationId);
}
module.exports.downloadFileWithFileIdentifier = downloadFileWithFileIdentifier;
