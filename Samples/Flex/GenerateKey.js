'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function generateKey(callback) {
	try {
		var configObject = new configuration();
		var requestObj = new cybersourceRestApi.GeneratePublicKeyRequest();

		requestObj.encryptionType = 'None';

		var instance = new cybersourceRestApi.KeyGenerationApi(configObject);

		instance.generatePublicKey( requestObj, function (error, data, response) {
			if(error) {
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
		generateKey(function () {
		console.log('\nGeneratePublicKey end.');
	},);
}
module.exports.generateKey = generateKey;
