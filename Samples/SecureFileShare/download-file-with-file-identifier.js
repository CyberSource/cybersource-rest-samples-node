'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function download_file_with_file_identifier(callback) {
	var fileId = 'VFJSUmVwb3J0LTc4NTVkMTNmLTkzOTgtNTExMy1lMDUzLWEyNTg4ZTBhNzE5Mi5jc3YtMjAxOC0xMC0yMA==';

	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var organizationId = "testrest";

		var opts = [];
		if (organizationId != null) opts['organizationId'] = organizationId;

		// File name in which details will be downloaded
		var downloadFilePath = 'Resource\\DownloadedFileWithFileID';
		apiClient.downloadFilePath = path.resolve(downloadFilePath);

		var instance = new cybersourceRestApi.SecureFileShareApi(configObject, apiClient);

		instance.getFile(fileId, opts, function (error, data, response) {
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
	download_file_with_file_identifier(function () {
		console.log('\nGetFile end.');
	});
}
module.exports.download_file_with_file_identifier = download_file_with_file_identifier;
