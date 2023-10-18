'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function amex_registration_customer_token_batch(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.Body();

		requestObj.type = 'amexRegistration';
		var included = new cybersourceRestApi.Accountupdaterv1batchesIncluded();

		var tokens = new Array();
		var tokens1 = new cybersourceRestApi.Accountupdaterv1batchesIncludedTokens();
		tokens1.id = 'C06977C0EDC0E985E053AF598E0A3326';
		tokens.push(tokens1);

		var tokens2 = new cybersourceRestApi.Accountupdaterv1batchesIncludedTokens();
		tokens2.id = 'C069A534044F6140E053AF598E0AD492';
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
	amex_registration_customer_token_batch(function () {
		console.log('\nPostBatch end.');
	});
}

module.exports.amex_registration_customer_token_batch = amex_registration_customer_token_batch;
