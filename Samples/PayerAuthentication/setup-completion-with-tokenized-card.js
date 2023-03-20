'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function setup_completion_with_tokenized_card(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.PayerAuthSetupRequest();

		var clientReferenceInformation = new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
		clientReferenceInformation.code = 'cybs_test';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var paymentInformation = new cybersourceRestApi.Riskv1authenticationsetupsPaymentInformation();
		var paymentInformationTokenizedCard = new cybersourceRestApi.Riskv1authenticationsetupsPaymentInformationTokenizedCard();
		paymentInformationTokenizedCard.transactionType = '1';
		paymentInformationTokenizedCard.type = '001';
		paymentInformationTokenizedCard.expirationMonth = '11';
		paymentInformationTokenizedCard.expirationYear = '2025';
		paymentInformationTokenizedCard.number = '4111111111111111';
		paymentInformation.tokenizedCard = paymentInformationTokenizedCard;

		requestObj.paymentInformation = paymentInformation;


		var instance = new cybersourceRestApi.PayerAuthenticationApi(configObject, apiClient);

		instance.payerAuthSetup( requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Setup Payer Auth : ' + JSON.stringify(response['status']));
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
		setup_completion_with_tokenized_card(function () {
		console.log('\nPayerAuthSetup end.');
	});
}
module.exports.setup_completion_with_tokenized_card = setup_completion_with_tokenized_card;
