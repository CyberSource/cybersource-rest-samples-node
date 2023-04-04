'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function generate_capture_context_with_checkout_api(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.GenerateCaptureContextRequest();

        requestObj.clientVersion = 'v2.0';
        requestObj.targetOrigins = ["https://www.test.com"];
        requestObj.allowedCardNetworks = ["VISA", "MAESTRO", "MASTERCARD", "AMEX", "DISCOVER", "DINERSCLUB", "JCB", "CUP", "CARTESBANCAIRES"];

		var instance = new cybersourceRestApi.MicroformIntegrationApi(configObject, apiClient);

		instance.generateCaptureContext(requestObj, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Process a Payment : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	generate_capture_context_with_checkout_api(function () {
		console.log('\nGenerate Capture Context with checkout API end.');
	});
}
module.exports.generate_capture_context_with_checkout_api = generate_capture_context_with_checkout_api;