'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function getTransactionDetailsForGivenBatchId(callback, id) {
	try {
		var configObject = new configuration();

		var instance = new cybersourceRestApi.TransactionBatchesApi(configObject);

		instance.getTransactionBatchDetails( id, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get transaction details for a given batch id : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var id = readline.question("\nEnter missing path parameter <id>: ");
		getTransactionDetailsForGivenBatchId(function () {
		console.log('\nGetTransactionBatchDetails end.');
	},id);
}
module.exports.getTransactionDetailsForGivenBatchId = getTransactionDetailsForGivenBatchId;
