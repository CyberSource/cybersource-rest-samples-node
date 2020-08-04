'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function generate_key(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.GeneratePublicKeyRequest();

		requestObj.encryptionType = 'RsaOaep';
		requestObj.targetOrigin = 'https://www.test.com';
		var format = "JWT";

		var instance = new cybersourceRestApi.KeyGenerationApi(configObject, apiClient);

		instance.generatePublicKey(format, requestObj, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Generate Key : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	generate_key(function () {
		console.log('\nGeneratePublicKey end.');
	});
}
module.exports.generate_key = generate_key;
