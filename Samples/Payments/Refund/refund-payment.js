'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var simple_authorization_internet = require('../Payments/simple-authorization-internet');

function refund_payment(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.RefundPaymentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'TC50171_3';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsidrefundsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsidcapturesOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '10';
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		requestObj.orderInformation = orderInformation;


		var instance = new cybersourceRestApi.RefundApi(configObject, apiClient);

		var enable_capture = true;

		simple_authorization_internet.simple_authorization_internet(function (error, data) {
			if (data) {
				var id = data['id'];
				console.log('\n*************** Refund Payment ********************* ');
				console.log('Payment ID passing to refundPayment : ' + id);
				instance.refundPayment(requestObj, id, function (error, data, response) {
					if (error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Refund a Payment : ' + JSON.stringify(response['status']));
					callback(error, data, response);
				});
			}
		}, enable_capture);
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	refund_payment(function () {
		console.log('\nRefundPayment end.');
	});
}
module.exports.refund_payment = refund_payment;
