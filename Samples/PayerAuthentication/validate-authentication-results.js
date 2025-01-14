'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
const { faker, fa } = require('@faker-js/faker');

function validate_authentication_results(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.ValidateRequest();

		var clientReferenceInformation = new cybersourceRestApi.Riskv1authenticationsetupsClientReferenceInformation();
		clientReferenceInformation.code = faker.string.uuid();
		var clientReferenceInformationPartner = new cybersourceRestApi.Riskv1decisionsClientReferenceInformationPartner();
		clientReferenceInformationPartner.developerId = '7891234';
		clientReferenceInformationPartner.solutionId = '89012345';
		clientReferenceInformation.partner = clientReferenceInformationPartner;

		requestObj.clientReferenceInformation = clientReferenceInformation;

		var orderInformation = new cybersourceRestApi.Riskv1authenticationresultsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Riskv1authenticationresultsOrderInformationAmountDetails();
		orderInformationAmountDetails.currency = 'USD';
		orderInformationAmountDetails.totalAmount = '200.00';
		orderInformation.amountDetails = orderInformationAmountDetails;

		requestObj.orderInformation = orderInformation;

		var paymentInformation = new cybersourceRestApi.Riskv1authenticationresultsPaymentInformation();
		var paymentInformationCard = new cybersourceRestApi.Riskv1authenticationresultsPaymentInformationCard();
		var dt = new Date();
        var expYear = dt.getFullYear()+4;
		paymentInformationCard.type = '002';
		paymentInformationCard.expirationMonth = '12';
		paymentInformationCard.expirationYear = expYear;
		paymentInformationCard.number = '5200000000000007';
		paymentInformation.card = paymentInformationCard;

		requestObj.paymentInformation = paymentInformation;

		var consumerAuthenticationInformation = new cybersourceRestApi.Riskv1authenticationresultsConsumerAuthenticationInformation();
		consumerAuthenticationInformation.authenticationTransactionId = 'PYffv9G3sa1e0CQr5fV0';
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

			var status = response['status'];
			write_log_audit(status);
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}

function write_log_audit(status) {
	var filename = path.basename(__filename).split(".")[0];
	console.log(`[Sample Code Testing] [${filename}] ${status}`);
}

if (require.main === module) {
	validate_authentication_results(function () {
		console.log('\nValidateAuthenticationResults end.');
	});
}

module.exports.validate_authentication_results = validate_authentication_results;
