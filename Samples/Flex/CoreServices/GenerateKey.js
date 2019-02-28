'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));

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

		console.log('\n[BEGIN] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
        
		instance.generatePublicKey(options, function (error, data, response) {
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
	generateKey(function () {
		console.log('\n[END] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
	});
}
module.exports.generateKey = generateKey;
