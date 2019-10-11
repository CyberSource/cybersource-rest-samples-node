'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function getListOfFiles(callback) {
	try {
		var configObject = new configuration();
		var startDate = '2018-10-20';
		var endDate = '2018-10-30';
		var organizationId = "testrest";

		var opts = [];
		if (organizationId!= null) opts['organizationId'] = organizationId;

		var instance = new cybersourceRestApi.SecureFileShareApi(configObject);

		instance.getFileDetail( startDate, endDate, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get list of files : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var startDate = readline.question("\nEnter missing query parameter <startDate>: ");
		var endDate = readline.question("\nEnter missing query parameter <endDate>: ");
		var organizationId = readline.question("\nEnter missing query parameter <organizationId>: ");
		getListOfFiles(function () {
		console.log('\nGetFileDetail end.');
	},startDate, endDate, organizationId);
}
module.exports.getListOfFiles = getListOfFiles;
