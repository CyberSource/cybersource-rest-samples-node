'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));

/**
 * This is a sample code to call TransactionBatchApi,
 * Returns a list of transaction batches, based on the search criteria provided. 
 */
function getListOfBatchFiles(callback) {
	try{
		var configObject = new configuration();
		var instance = new cybersourceRestApi.TransactionBatchesApi(configObject);

		var startTime = '2018-10-01T20:34:24.000Z';
		var endTime = '2018-10-29T23:27:25.000Z';
    
		console.log('\n[BEGIN] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');

		instance.ptsV1TransactionBatchesGet(startTime, endTime, function (error, data, response) {
			if (error) {
				console.log('\n API ERROR : \n ' + JSON.stringify(error));
			}
			if (response) {
				console.log('\n API REQUEST HEADERS : \n' + JSON.stringify(response.req._headers,0,2));
				console.log('\n API RESPONSE BODY : ' + response.text + '\n'); 
				console.log('\n API RESPONSE CODE : ' + JSON.stringify(response['status']));
				console.log('\n API RESPONSE HEADERS : \n' + JSON.stringify(response.header,0,2));
			}
			callback(error, data);
		});

	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	getListOfBatchFiles(function () {
		console.log('\n[END] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
	});
}
module.exports.getListOfBatchFiles = getListOfBatchFiles;