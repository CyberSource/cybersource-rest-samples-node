'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This is a sample code to call TransactionBatchApi,
 * Returns a specific transaction batch, if it exists 
 */
function getIndividualBatchFile(callback) {

	var configObject = new configuration();
	var instance = new cybersourceRestApi.TransactionBatchesApi(configObject);

	var id = 'Owcyk6pl';
 
	console.log('\n*************** Retrieve Batch File  ********************* ');
                
	instance.ptsV1TransactionBatchesIdGet(id, function (error, data, response) {
		if (error) {
			console.log('\nError in retrieve batch file : ' + JSON.stringify(error));
		}
		else if (data) {
			console.log('\nData of retrieve batch file : ' + JSON.stringify(data));
		}
		console.log('\nResponse of retrieve batch file : ' + JSON.stringify(response));
		console.log('\nResponse Code of retrieve batch file : ' + JSON.stringify(response['status']));
		callback(error, data);
	});

}
if (require.main === module) {
	getIndividualBatchFile(function () {
		console.log('Retrieve batch file end.');
	});
}
module.exports.getIndividualBatchFile = getIndividualBatchFile;
