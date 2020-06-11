'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var generateKey = require('../KeyGeneration/generate-key')

function flex_tokenize_card(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.TokenizeRequest();

		var cardInfo = new cybersourceRestApi.Flexv1tokensCardInfo();
		cardInfo.cardNumber = '4111111111111111';
		cardInfo.cardExpirationMonth = '12';
		cardInfo.cardExpirationYear = '2031';
		cardInfo.cardType = '001';
		requestObj.cardInfo = cardInfo;


		var instance = new cybersourceRestApi.TokenizationApi(configObject, apiClient);

		generateKey.generate_key(function (error, data, response) {
			requestObj.keyId = data.keyId;
			var keyId = data['keyId'];
			var publicKey = data.der['publicKey'];
			instance.tokenize(requestObj, function (error, data, response) {
				if (error) {
					console.log('\nError : ' + JSON.stringify(error));
				}
				else {
					console.log('\nData : ' + JSON.stringify(data));
					var tokenVerifier = new cybersourceRestApi.TokenVerification();
					var result = tokenVerifier.verifyToken(publicKey, data);
					console.log('Response of tokenization : ' + JSON.stringify(response));
					console.log('Response code of tokenization: ' + response['status']);
					console.log('KeyId: ' + keyId);
					console.log('PublicKey : ' + publicKey);
					console.log('Token Verified : ' + result);
				}

				console.log('\nResponse : ' + JSON.stringify(response));
				console.log('\nResponse Code of Tokenize Card : ' + JSON.stringify(response['status']));
				callback(error, data, response);
			});
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	flex_tokenize_card(function () {
		console.log('\nTokenize end.');
	});
}
module.exports.flex_tokenize_card = flex_tokenize_card;
