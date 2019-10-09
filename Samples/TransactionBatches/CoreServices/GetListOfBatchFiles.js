'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This is a sample code to call TransactionBatchApi,
 * Returns a list of transaction batches, based on the search criteria provided. 
 */
function getListOfBatchFiles(callback) {
	try{
		var configObject = new configuration();
		var instance = new cybersourceRestApi.TransactionBatchesApi(configObject);

		var startTime = '2019-09-01T20:34:24.000Z';
		var endTime = '2019-09-30T23:27:25.000Z';
    
		console.log('\n*************** Retrieve list of batch file  ********************* ');

		instance.getTransactionBatches(startTime, endTime, function (error, data, response) {
			if (error) {
				console.log('\nError in retrieve list of batch file : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData of retrieve list of batch file : ' + JSON.stringify(data));
			}
			console.log('\nResponse of retrieve list of batch file : ' + JSON.stringify(response));
			console.log('\nResponse Code of retrieve list of batch file : ' + JSON.stringify(response['status']));
			callback(error, data);
		});

	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	getListOfBatchFiles(function () {
		console.log('RetriveL List of Batch files end.');
	});
}
module.exports.getListOfBatchFiles = getListOfBatchFiles;