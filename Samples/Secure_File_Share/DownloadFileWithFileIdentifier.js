'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function downloadFileWithFileIdentifier(callback, fileId) {
	try {
		var configObject = new configuration();
		var organizationId = "testrest";

		var opts = [];
		if (organizationId!= null) opts['organizationId'] = organizationId;

		var instance = new cybersourceRestApi.SecureFileShareApi(configObject);

		instance.getFile( fileId, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Download a file with file identifier : ' + JSON.stringify(response['status']));
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
