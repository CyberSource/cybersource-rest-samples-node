'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function get_transaction_details_for_given_batch_id(callback) {
	var id = '12345';

	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var uploadDate = '2019-08-30';
		var status = "Rejected";

		var opts = [];
		if (uploadDate != null) opts['uploadDate'] = uploadDate;
		if (status != null) opts['status'] = status;

		// File name in which details will be downloaded
		var downloadFilePath = 'Resource\\BatchDetailsReport';
		apiClient.downloadFilePath = path.resolve(downloadFilePath);

		var instance = new cybersourceRestApi.TransactionBatchesApi(configObject, apiClient);

		instance.getTransactionBatchDetails(id, opts, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else {
				console.log('\nSuccessfully retrieved response');
				console.log('\nResponse downloaded at this location:' + apiClient.downloadFilePath);
			}
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	get_transaction_details_for_given_batch_id(function () {
		console.log('\nGetTransactionBatchDetails end.');
	});
}
module.exports.get_transaction_details_for_given_batch_id = get_transaction_details_for_given_batch_id;
