'use strict';

var CyberSourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function getTransactionDetailsForGivenBatchId(callback, id){
	try {
		var configObject = new configuration();
		var apiClient = new CyberSourceRestApi.ApiClient();
		var opts = [];
		
		var id = '12345';

		var downloadFilePath = 'Resource\\batchDetailsReport';
		apiClient.downloadFilePath = path.resolve(downloadFilePath);
		
		var instance = new CyberSourceRestApi.TransactionBatchesApi(configObject, apiClient);		

		instance.getTransactionBatchDetails(id, opts, function (error, data, response) {
			if (error) {
				console.log('\nError in fetching batch details : ' + JSON.stringify(error));
			}
			else
			{
				console.log('\nSuccessfully retrieved the report');
				console.log('Batch details has been downloaded at this location :' + apiClient.downloadFilePath);
			}
			callback();
		});
	}
	catch (error)
	{
		console.log('Exception on calling the API : ' + error);
	}
}

if (require.main === module) {
	getTransactionDetailsForGivenBatchId(function () {
		console.log('getTransactionBatchDetails end.');
	});
}
module.exports.getTransactionDetailsForGivenBatchId = getTransactionDetailsForGivenBatchId;
