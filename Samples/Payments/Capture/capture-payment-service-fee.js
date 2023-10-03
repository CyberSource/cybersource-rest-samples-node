'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var processPayment = require('../Payments/service-fees-with-credit-card-transaction');

function capture_payment_service_fee(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
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


		var instance = new cybersourceRestApi.CaptureApi(configObject, apiClient);

		var enable_capture = false;

		processPayment.service_fees_with_credit_card_transaction(function (error, data) {
			if (data) {
				var id = data['id'];
				console.log('\n*************** Capture Payment *********************');
				console.log('Payment ID passing to capturePayment : ' + id);

				instance.capturePayment(requestObj, id, function (error, data, response) {
					if (error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Capture a Payment : ' + JSON.stringify(response['status']));
					var status = response['status'];
					write_log_audit(status);
					callback(error, data, response);
				});
			}
		}, enable_capture);
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
	capture_payment_service_fee(function () {
		console.log('\nCapturePayment end.');
	});
}
module.exports.capture_payment_service_fee = capture_payment_service_fee;
