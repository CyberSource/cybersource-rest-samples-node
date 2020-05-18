'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function digital_payments_applepay(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreatePaymentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'TC_1231223';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
		processingInformation.capture = false;
		processingInformation.commerceIndicator = 'internet';
		processingInformation.paymentSolution = '001';
		requestObj.processingInformation = processingInformation;

		var paymentInformation = new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
		var paymentInformationTokenizedCard = new cybersourceRestApi.Ptsv2paymentsPaymentInformationTokenizedCard();
		paymentInformationTokenizedCard.number = '4111111111111111';
		paymentInformationTokenizedCard.expirationMonth = '12';
		paymentInformationTokenizedCard.expirationYear = '2031';
		paymentInformationTokenizedCard.cryptogram = 'AceY+igABPs3jdwNaDg3MAACAAA=';
		paymentInformationTokenizedCard.transactionType = '1';
		paymentInformation.tokenizedCard = paymentInformationTokenizedCard;

		requestObj.paymentInformation = paymentInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '10';
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		var orderInformationBillTo = new cybersourceRestApi.Ptsv2paymentsOrderInformationBillTo();
		orderInformationBillTo.firstName = 'John';
		orderInformationBillTo.lastName = 'Deo';
		orderInformationBillTo.address1 = '901 Metro Center Blvd';
		orderInformationBillTo.locality = 'Foster City';
		orderInformationBillTo.administrativeArea = 'CA';
		orderInformationBillTo.postalCode = '94404';
		orderInformationBillTo.country = 'US';
		orderInformationBillTo.email = 'test@cybs.com';
		orderInformationBillTo.phoneNumber = '6504327113';
		orderInformation.billTo = orderInformationBillTo;

		requestObj.orderInformation = orderInformation;


		var instance = new cybersourceRestApi.PaymentsApi(configObject, apiClient);

		instance.createPayment( requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Process a Payment : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		digital_payments_applepay(function () {
		console.log('\nCreatePayment end.');
	});
}
module.exports.digital_payments_applepay = digital_payments_applepay;
