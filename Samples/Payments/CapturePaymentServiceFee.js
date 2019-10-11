'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function capturePaymentServiceFee(callback, id) {
	try {
		var configObject = new configuration();
		var requestObj = new cybersourceRestApi.CapturePaymentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'TC50171_3';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsidcapturesOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsidcapturesOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '2325.00';
		orderInformationAmountDetails.currency = 'USD';
		orderInformationAmountDetails.serviceFeeAmount = '30.0';
		orderInformation.amountDetails = orderInformationAmountDetails;

		requestObj.orderInformation = orderInformation;

		var merchantInformation = new cybersourceRestApi.Ptsv2paymentsidcapturesMerchantInformation();
		var merchantInformationServiceFeeDescriptor = new cybersourceRestApi.Ptsv2paymentsMerchantInformationServiceFeeDescriptor();
		merchantInformationServiceFeeDescriptor.name = 'Vacations Service Fee';
		merchantInformationServiceFeeDescriptor.contact = '8009999999';
		merchantInformationServiceFeeDescriptor.state = 'CA';
		merchantInformation.serviceFeeDescriptor = merchantInformationServiceFeeDescriptor;

		requestObj.merchantInformation = merchantInformation;


		var instance = new cybersourceRestApi.CaptureApi(configObject);

		instance.capturePayment( requestObj, id, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Capture a Payment : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var id = readline.question("\nEnter missing path parameter <id>: ");
		capturePaymentServiceFee(function () {
		console.log('\nCapturePayment end.');
	},id);
}
module.exports.capturePaymentServiceFee = capturePaymentServiceFee;
