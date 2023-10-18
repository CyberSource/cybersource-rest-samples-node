'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function one_off_visa_mastercard_instrument_identifier_token_batch(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.Body();

		requestObj.type = 'oneOff';
		var included = new cybersourceRestApi.Accountupdaterv1batchesIncluded();

		var tokens = new Array();
		var tokens1 = new cybersourceRestApi.Accountupdaterv1batchesIncludedTokens();
		tokens1.id = '7030000000000116236';
		tokens1.expirationMonth = '12';
		tokens1.expirationYear = '2020';
		tokens.push(tokens1);

		var tokens2 = new cybersourceRestApi.Accountupdaterv1batchesIncludedTokens();
		tokens2.id = '7030000000000178855';
		tokens2.expirationMonth = '12';
		tokens2.expirationYear = '2020';
		tokens.push(tokens2);

		included.tokens = tokens;

		requestObj.included = included;

		requestObj.merchantReference = 'TC50171_3';
		requestObj.notificationEmail = 'test@cybs.com';

		var instance = new cybersourceRestApi.BatchesApi(configObject, apiClient);

		instance.postBatch(requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Create a Batch : ' + JSON.stringify(response['status']));

			var status = response['status'];
			write_log_audit(status);
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}

function write_log_audit(status) {
	var filename = path.basename(__filename).split(".")[0];
	console.log(`[Sample Code Testing] [${filename}] ${status}`);
}

if (require.main === module) {
	one_off_visa_mastercard_instrument_identifier_token_batch(function () {
		console.log('\nPostBatch end.');
	});
}

module.exports.one_off_visa_mastercard_instrument_identifier_token_batch = one_off_visa_mastercard_instrument_identifier_token_batch;
