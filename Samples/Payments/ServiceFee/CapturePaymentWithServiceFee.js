'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var processPayment = require('./ProcessPaymentWithServiceFee');

/**
 * This is a sample code to call CaptureApi,
 * call capturePayment method to process capture a payment
 */
function CapturePaymentWithServiceFee(callback) {
	try {

		var request = new cybersourceRestApi.CapturePaymentRequest();
		var configObject = new configuration();
		var instance = new cybersourceRestApi.CaptureApi(configObject);

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'TC50171_3';

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
		processingInformation.commerceIndicator = 'internet';

		var amountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		amountDetails.totalAmount = '2325.00';
		amountDetails.currency = 'USD';
		amountDetails.serviceFeeAmount = '30.0'

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
		orderInformation.amountDetails = amountDetails;

		var serviceFeeDescriptor = new cybersourceRestApi.Ptsv2paymentsMerchantInformationServiceFeeDescriptor();
		serviceFeeDescriptor.name = "CyberVacations Service Fee";
		serviceFeeDescriptor.contact = "800-999-9999";
		serviceFeeDescriptor.state = "CA";
		var merchantInformation = new cybersourceRestApi.Ptsv2paymentsMerchantInformation(); 
		merchantInformation.serviceFeeDescriptor = serviceFeeDescriptor;

		var request = new cybersourceRestApi.CreatePaymentRequest();
		request.clientReferenceInformation = clientReferenceInformation;
		request.processingInformation = processingInformation;		
		request.orderInformation = orderInformation;		
		request.merchantInformation = merchantInformation;

		var enableCapture = false;

		processPayment.ProcessPaymentWithServiceFee(function (error, data) {
			if (data) {
				var id = data['id'];
				console.log('\n*************** Capture Payment With Service Fee *********************');
				console.log('Payment ID passing to capturePayment : ' + id);

				instance.capturePayment(request, id, function (error, data, response) {
					if (error) {
						console.log('\nError in Capture Payment With Service Fee: ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData of Capture Payment With Service Fee : ' + JSON.stringify(data));
					}
					console.log('\nResponse of  Capture Payment With Service Fee  : ' + JSON.stringify(response));
					console.log('\nResponse Code of Capture Payment With Service Fee : ' + JSON.stringify(response['status']));
					callback(error, data);
				});

			}
		}, enableCapture);
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	CapturePaymentWithServiceFee(function () {
		console.log('Capture Payment With Service Fee end.');
	});
}
module.exports.CapturePaymentWithServiceFee = CapturePaymentWithServiceFee;