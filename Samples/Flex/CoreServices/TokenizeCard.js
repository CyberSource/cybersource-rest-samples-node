'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This  is a sample code to call KeyGenerationApi which will return key and
 * TokenizationApi Returns a token representing the supplied card details.
 * 
 * to verify the token with the key generated.
 */
function tokenizeCard(callback) {
	try {
		var keyId = '';
		var publicKey = '';
		var cardInfo = new cybersourceRestApi.Flexv1tokensCardInfo();

		cardInfo.cardNumber = '5555555555554444';
		cardInfo.cardExpirationMonth = '03';
		cardInfo.cardExpirationYear = '2031';
		cardInfo.cardType = '002';

		var configObject = new configuration();

		var tokenizeInstance = new cybersourceRestApi.TokenizationApi(configObject);

		var keyInstance = new cybersourceRestApi.KeyGenerationApi(configObject);

		var KeyRequest = new cybersourceRestApi.GeneratePublicKeyRequest();
		KeyRequest.encryptionType = 'None';

		keyInstance.generatePublicKey(KeyRequest, function (error, data, response) {
			if (error) {
				console.log('Error : ' + error);
			}
			else if (data) {
				keyId = data['keyId'];
				publicKey = data.der['publicKey'];

				var tokenizeRequest = new cybersourceRestApi.TokenizeRequest();
				tokenizeRequest.keyId = keyId;
				tokenizeRequest.cardInfo = cardInfo;

				console.log('\n*************** Tokenize Card ********************* ');
				tokenizeInstance.tokenize(tokenizeRequest, function (error, data, response) {
					if (error) {
						console.log('Error : ' + error.stack);
					}
					else if (data) {
						var tokenVerifier = new cybersourceRestApi.TokenVerification();
						var result = tokenVerifier.verifyToken(publicKey, data);
						console.log('Response of tokenization : ' + JSON.stringify(response));
						console.log('Response code of tokenization: ' + response['status']);
						console.log('KeyId: ' + keyId);
						console.log('PublicKey : ' + publicKey);
						console.log('Token Verified : ' + result);
					}
					callback(error, data);
				});
			}
			console.log('Response code of generatePublicKey: ' + response['status']);
		});

	} catch (error) {
		console.log(error);
	}

}
if (require.main === module) {
	tokenizeCard(function () {
		console.log('tokenizeCard end.');
	});
}
module.exports.tokenizeCard = tokenizeCard;
