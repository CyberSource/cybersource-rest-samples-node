'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function cit_placing_credential_on_file(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreatePaymentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'TC50171_3';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
		processingInformation.capture = false;
		processingInformation.commerceIndicator = 'vbv';
		var processingInformationAuthorizationOptions = new cybersourceRestApi.Ptsv2paymentsProcessingInformationAuthorizationOptions();
		processingInformationAuthorizationOptions.ignoreAvsResult = false;
		processingInformationAuthorizationOptions.ignoreCvResult = false;
		var processingInformationAuthorizationOptionsInitiator = new cybersourceRestApi.Ptsv2paymentsProcessingInformationAuthorizationOptionsInitiator();
		processingInformationAuthorizationOptionsInitiator.credentialStoredOnFile = true;
		processingInformationAuthorizationOptions.initiator = processingInformationAuthorizationOptionsInitiator;

		processingInformation.authorizationOptions = processingInformationAuthorizationOptions;

		requestObj.processingInformation = processingInformation;

		var paymentInformation = new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
		var paymentInformationCard = new cybersourceRestApi.Ptsv2paymentsPaymentInformationCard();
		paymentInformationCard.number = '4111111111111111';
		paymentInformationCard.expirationMonth = '12';
		paymentInformationCard.expirationYear = '2031';
		paymentInformation.card = paymentInformationCard;

		requestObj.paymentInformation = paymentInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '102.21';
		orderInformationAmountDetails.currency = 'GBP';
		orderInformation.amountDetails = orderInformationAmountDetails;

		var orderInformationBillTo = new cybersourceRestApi.Ptsv2paymentsOrderInformationBillTo();
		orderInformationBillTo.firstName = 'John';
		orderInformationBillTo.lastName = 'Doe';
		orderInformationBillTo.address1 = '1 Market St';
		orderInformationBillTo.locality = 'san francisco';
		orderInformationBillTo.administrativeArea = 'CA';
		orderInformationBillTo.postalCode = '94105';
		orderInformationBillTo.country = 'US';
		orderInformationBillTo.email = 'test@cybs.com';
		orderInformationBillTo.phoneNumber = '4158880000';
		orderInformation.billTo = orderInformationBillTo;

		requestObj.orderInformation = orderInformation;

		var consumerAuthenticationInformation = new cybersourceRestApi.Ptsv2paymentsConsumerAuthenticationInformation();
		consumerAuthenticationInformation.cavv = 'EHuWW9PiBkWvqE5juRwDzAUFBAk=';
		requestObj.consumerAuthenticationInformation = consumerAuthenticationInformation;


		var instance = new cybersourceRestApi.PaymentsApi(configObject, apiClient);

		instance.createPayment(requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Process a Payment : ' + JSON.stringify(response['status']));

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
	cit_placing_credential_on_file(function () {
		console.log('\nCreatePayment end.');
	});
}

module.exports.cit_placing_credential_on_file = cit_placing_credential_on_file;