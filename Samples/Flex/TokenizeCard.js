'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function tokenizeCard(callback) {
	try {
		var configObject = new configuration();
		var requestObj = new cybersourceRestApi.TokenizeRequest();

		requestObj.keyId = '08z9hCmn4pRpdNhPJBEYR3Mc2DGLWq5j';
		var cardInfo = new cybersourceRestApi.Flexv1tokensCardInfo();
		cardInfo.cardNumber = '4111111111111111';
		cardInfo.cardExpirationMonth = '12';
		cardInfo.cardExpirationYear = '2031';
		cardInfo.cardType = '001';
		requestObj.cardInfo = cardInfo;


		var instance = new cybersourceRestApi.TokenizationApi(configObject);

		instance.tokenize( requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Tokenize card : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		tokenizeCard(function () {
		console.log('\nTokenize end.');
	},);
}
module.exports.tokenizeCard = tokenizeCard;
