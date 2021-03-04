'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function validate_authentication_results(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.ValidateRequest();

		var clientReferenceInformation = new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
		clientReferenceInformation.code = 'pavalidatecheck';
		var clientReferenceInformationPartner = new cybersourceRestApi.Riskv1decisionsClientReferenceInformationPartner();
		clientReferenceInformationPartner.developerId = '7891234';
		clientReferenceInformationPartner.solutionId = '89012345';
		clientReferenceInformation.partner = clientReferenceInformationPartner;

		requestObj.clientReferenceInformation = clientReferenceInformation;

		var orderInformation = new cybersourceRestApi.Riskv1authenticationresultsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Riskv1authenticationsOrderInformationAmountDetails();
		orderInformationAmountDetails.currency = 'USD';
		orderInformationAmountDetails.totalAmount = '200.00';
		orderInformation.amountDetails = orderInformationAmountDetails;


		var lineItems =	new Array();
		var	lineItems1 = new cybersourceRestApi.Riskv1authenticationresultsOrderInformationLineItems();
		lineItems1.unitPrice = '10';
		lineItems1.quantity = 2;
		lineItems1.taxAmount = '32.40';
		lineItems.push(lineItems1);

		orderInformation.lineItems = lineItems;

		requestObj.orderInformation = orderInformation;

		var paymentInformation = new cybersourceRestApi.Riskv1authenticationresultsPaymentInformation();
		var paymentInformationCard = new cybersourceRestApi.Riskv1authenticationresultsPaymentInformationCard();
		paymentInformationCard.type = '002';
		paymentInformationCard.expirationMonth = '12';
		paymentInformationCard.expirationYear = '2025';
		paymentInformationCard.number = '5200000000000007';
		paymentInformation.card = paymentInformationCard;

		requestObj.paymentInformation = paymentInformation;

		var consumerAuthenticationInformation = new cybersourceRestApi.Riskv1authenticationresultsConsumerAuthenticationInformation();
		consumerAuthenticationInformation.authenticationTransactionId = 'PYffv9G3sa1e0CQr5fV0';
		consumerAuthenticationInformation.signedPares = 'eNqdmFmT4jgSgN+J4D90zD4yMz45PEFVhHzgA2zwjXnzhQ984Nvw61dAV1';
		requestObj.consumerAuthenticationInformation = consumerAuthenticationInformation;


		var instance = new cybersourceRestApi.PayerAuthenticationApi(configObject, apiClient);

		instance.validateAuthenticationResults( requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Validate Authentication Results : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		validate_authentication_results(function () {
		console.log('\nValidateAuthenticationResults end.');
	});
}
module.exports.validate_authentication_results = validate_authentication_results;
