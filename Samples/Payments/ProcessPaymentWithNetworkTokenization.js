'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function processPaymentWithNetworkTokenization(callback) {
	try {
		var configObject = new configuration();
		var requestObj = new cybersourceRestApi.CreatePaymentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'TC_123122';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
		processingInformation.capture = false;
		processingInformation.commerceIndicator = 'internet';
		requestObj.processingInformation = processingInformation;

		var paymentInformation = new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
		var paymentInformationTokenizedCard = new cybersourceRestApi.Ptsv2paymentsPaymentInformationTokenizedCard();
		paymentInformationTokenizedCard.number = '4111111111111111';
		paymentInformationTokenizedCard.expirationMonth = '12';
		paymentInformationTokenizedCard.expirationYear = '2031';
		paymentInformationTokenizedCard.transactionType = '1';
		paymentInformation.tokenizedCard = paymentInformationTokenizedCard;

		requestObj.paymentInformation = paymentInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '100';
		orderInformationAmountDetails.currency = 'USD';
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
		consumerAuthenticationInformation.cavv = 'AAABCSIIAAAAAAACcwgAEMCoNh+=';
		consumerAuthenticationInformation.xid = 'T1Y0OVcxMVJJdkI0WFlBcXptUzE=';
		requestObj.consumerAuthenticationInformation = consumerAuthenticationInformation;


		var instance = new cybersourceRestApi.PaymentsApi(configObject);

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
		processPaymentWithNetworkTokenization(function () {
		console.log('\nCreatePayment end.');
	},);
}
module.exports.processPaymentWithNetworkTokenization = processPaymentWithNetworkTokenization;
