'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function ValidateAuthenticationResults(callback) {
	try {
			var configObject = new configuration();
			var instance = new cybersourceRestApi.PayerAuthenticationApi(configObject);

			var clientReferenceInformation = new cybersourceRestApi.Riskv1authenticationsClientReferenceInformation();
			clientReferenceInformation.code = 'pavalidatecheck';

			var card = new cybersourceRestApi.Riskv1authenticationresultsPaymentInformationCard();
			card.number = '5200000000000007';
			card.expirationMonth = '12';
			card.expirationYear = '2025';
			card.type = '002'
				
			var paymentInformation = new cybersourceRestApi.Riskv1authenticationresultsPaymentInformation();
			paymentInformation.card = card;

			var amountDetails = new cybersourceRestApi.Riskv1decisionsOrderInformationAmountDetails();
			amountDetails.currency = 'USD';
			amountDetails.totalAmount = '200.00';
					
			var lineItems = new cybersourceRestApi.Riskv1authenticationresultsOrderInformationLineItems();
			lineItems.unitPrice = '10';
			lineItems.quantity = 2;
			lineItems.taxAmount = '32.40';

			var orderInformation = new cybersourceRestApi.Riskv1authenticationresultsOrderInformation();
			orderInformation.amountDetails = amountDetails;
			orderInformation.lineItems = lineItems;

			var consumerAuthenticationInformation = new cybersourceRestApi.Riskv1authenticationresultsConsumerAuthenticationInformation();
			consumerAuthenticationInformation.authenticationTransactionId = 'PYffv9G3sa1e0CQr5fV0';
			consumerAuthenticationInformation.signedPares = 'eNqdmFmT4jgSgN+J4D90zD4yMz45PEFVhHzgA2zwjXnzhQ984Nvw61dAV1';
		
			var request = new cybersourceRestApi.Request();
			request.clientReferenceInformation = clientReferenceInformation;
			request.paymentInformation = paymentInformation;
			request.orderInformation = orderInformation;
			request.consumerAuthenticationInformation = consumerAuthenticationInformation;

	    console.log('\n*************** ValidateAuthenticationResults ********************* ');

			instance.riskV1AuthenticationResultsPost(request, function (error, data, response) {
				if (error) {
					console.log('\nError in ValidateAuthenticationResults : ' + JSON.stringify(error));
				}
				else if (data) {
					console.log('\nData of ValidateAuthenticationResults : ' + JSON.stringify(data));
				}
				console.log('\nResponse of ValidateAuthenticationResults : ' + JSON.stringify(response));
				console.log('\nResponse Code of ValidateAuthenticationResults : ' + JSON.stringify(response['status']));
				callback(error, data);
			});
		} catch (error) {
			console.log(error);
		}
}

if (require.main === module) {
	ValidateAuthenticationResults(function () {
		console.log('\ValidateAuthenticationResults end.');
	}, false);
}
module.exports.ValidateAuthenticationResults = ValidateAuthenticationResults;