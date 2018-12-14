'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 *  Generate a one-time use public key and key ID to encrypt the card number 
 *  in the follow-on Tokenize Card request.
 *  The key used to encrypt the card number on the cardholder’s device or browser is
 *  valid for 15 minutes and must be used to verify the signature in the response message.
 *  CyberSource recommends creating a new key for each order.
 *  Generating a key is an authenticated request initiated from your servers,
 *  prior to requesting to tokenize the card data from your customer’s device or browser.
 */

function generateKey(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.KeyGenerationApi(configObject);

		var request = new cybersourceRestApi.GeneratePublicKeyRequest();
		request.encryptionType = 'RsaOaep256';

		var options = {
			'generatePublicKeyRequest': request
		};

		console.log('\n*************** Generate Key ********************* ');
        
		instance.generatePublicKey(options, function (error, data, response) {
			if (error) {
				console.log('Error : ' + error);
				console.log('Error status code : ' + error.statusCode);
			}
			else if (data) {
				console.log('Data : ' + JSON.stringify(data));
			}
			console.log('Response : ' + JSON.stringify(response));
			console.log('Response Code Of GenerateKey : ' + response['status']);
			callback(error, data);
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	generateKey(function () {
		console.log('generateKey end.');
	});
}
module.exports.generateKey = generateKey;
