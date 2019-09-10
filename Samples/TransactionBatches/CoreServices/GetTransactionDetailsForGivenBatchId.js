'use strict';

var CyberSourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function getTransactionDetailsForGivenBatchId(callback, id, uploadDateArg, statusArg){
	try {
		var configObject = new configuration();
		var opts = [];
		
		var id = '12345';

		var instance = new CyberSourceRestApi.TransactionBatchesApi(configObject);		

		instance.getTransactionBatchDetails(id, opts, function (error, data, response) {
			if(error) {
				console.log('Error : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('Data : ' + JSON.stringify(data));
			}

			console.log('Response : ' + JSON.stringify(response));
			console.log('Response Code of Get transaction details for a given batch id : ' + JSON.stringify(response['status']));
			callback(error, data, response);
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
