'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function getListOfBatchFiles(callback) {
	try {
		var configObject = new configuration();
		var startTime = '2019-05-22T01:47:57.000Z';
		var endTime = '2019-07-22T22:47:57.000Z';

		var opts = [];

		var instance = new cybersourceRestApi.TransactionBatchesApi(configObject);

		instance.getTransactionBatches( startTime, endTime, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get a list of batch files : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var startTime = readline.question("\nEnter missing query parameter <startTime>: ");
		var endTime = readline.question("\nEnter missing query parameter <endTime>: ");
		getListOfBatchFiles(function () {
		console.log('\nGetTransactionBatches end.');
	},startTime, endTime);
}
module.exports.getListOfBatchFiles = getListOfBatchFiles;
