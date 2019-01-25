'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));
var verify = require('../VerifyToken.js');

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

		var tokenizeInstance = new cybersourceRestApi.FlexTokenApi(configObject);

		var keyInstance = new cybersourceRestApi.KeyGenerationApi(configObject);

		var KeyRequest = new cybersourceRestApi.GeneratePublicKeyRequest();
		KeyRequest.encryptionType = 'None';

		var options = {
			'generatePublicKeyRequest': KeyRequest
		};
		console.log('\n[BEGIN] REQUEST & RESPONSE OF: Generate Key \n');
		keyInstance.generatePublicKey(options, function (error, data, response) {		
			if (error) {
				console.log('\n API ERROR : \n ' + JSON.stringify(error));
			}
			else if (data) {
				keyId = data.keyId;
				publicKey = data.der['publicKey'];

				var tokenizeRequest = new cybersourceRestApi.TokenizeRequest();
				tokenizeRequest.keyId = keyId;
				tokenizeRequest.cardInfo = cardInfo;

				var options = { 
					'tokenizeRequest': tokenizeRequest
				};
				if(response){
					console.log('\n API REQUEST HEADERS : \n' + JSON.stringify(response.req._headers,0,2));
					console.log('\n API REQUEST BODY : \n' + response.request._data + '\n');
					console.log('\n API RESPONSE BODY : ' + response.text + '\n'); 
					console.log('\n API RESPONSE CODE : ' + JSON.stringify(response['status']));
					console.log('\n API RESPONSE HEADERS : \n' + JSON.stringify(response.header,0,2));	
				}
				console.log('\n[END] REQUEST & RESPONSE OF: Generate Key \n');
				console.log('\n[BEGIN] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
				tokenizeInstance.tokenize(options, function (error, data, response) {
					if (error) {
						console.log('\n API ERROR : \n ' + JSON.stringify(error));
					}
					else if (data) {
						var result = verify(publicKey, data);
						console.log('\n KeyId: ' + keyId);
						console.log('\n PublicKey : ' + publicKey);
						console.log('\n Token Verified : ' + result);
					}
					if(response){
						console.log('\n API REQUEST HEADERS : \n' + JSON.stringify(response.req._headers,0,2));
						console.log('\n API REQUEST BODY : \n' + response.request._data + '\n');
						console.log('\n API RESPONSE BODY : ' + response.text + '\n'); 
						console.log('\n API RESPONSE CODE : ' + JSON.stringify(response['status']));
						console.log('\n API RESPONSE HEADERS : \n' + JSON.stringify(response.header,0,2));	
					}
					callback(error, data);
				});
			}
		});

	} catch (error) {
		console.log(error);
	}

}
if (require.main === module) {
	tokenizeCard(function () {
		console.log('\n[END] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
	});
}
module.exports.tokenizeCard = tokenizeCard;
