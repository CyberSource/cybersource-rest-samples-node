'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var electronic_check_debits = require('../Payments/electronic-check-debits');

function electronic_check_follow_on_refund(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.RefundPaymentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'TC50171_3';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsidrefundsProcessingInformation();
		requestObj.processingInformation = processingInformation;

		var paymentInformation = new cybersourceRestApi.Ptsv2paymentsidrefundsPaymentInformation();
		var paymentInformationPaymentType = new cybersourceRestApi.Ptsv2paymentsPaymentInformationPaymentType();
		paymentInformationPaymentType.name = 'CHECK';
		paymentInformation.paymentType = paymentInformationPaymentType;

		requestObj.paymentInformation = paymentInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsidrefundsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsidcapturesOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '100';
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		requestObj.orderInformation = orderInformation;


		var instance = new cybersourceRestApi.RefundApi(configObject, apiClient);

		electronic_check_debits.electronic_check_debits(function(error, data) {
				if (data) {
					var id = data['id'];
					instance.refundPayment(requestObj, id, function (error, data, response) {
						if(error) {
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
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		electronic_check_follow_on_refund(function () {
		console.log('\nRefundPayment end.');
	});
}
module.exports.electronic_check_follow_on_refund = electronic_check_follow_on_refund;
