'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var processPayment = require('./ProcessPayment');

/**
 * This is a sample code to call RefundApi,
 * Include the payment ID in the POST request to refund the payment amount. 
 */
function refundAPayment(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.RefundApi(configObject);

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'test_refund_payment';

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsidrefundsOrderInformation();
		var amountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		amountDetails.totalAmount = '102.21';
		amountDetails.currency = 'USD';
		orderInformation.amountDetails = amountDetails;

		var request = new cybersourceRestApi.RefundPaymentRequest();
		request.clientReferenceInformation = clientReferenceInformation;
		request.orderInformation = orderInformation;

		var enableCapture = true;

		processPayment.processPayment(function (error, data) {
			if (data) {
				var id = data['id'];
				console.log('\n*************** Refund Payment ********************* ');
				console.log('Payment ID passing to refundPayment : ' + id);

				instance.refundPayment(request, id, function (error, data, response) {
					if (error) {
						console.log('\nError in Refund payment: ' + error);
					}
					else if (data) {
						console.log('\nData of Refund Payment : ' + JSON.stringify(data));
					}
					console.log('\nResponse of  Refund Payment  : ' + JSON.stringify(response));
					console.log('\nResponse Code of Refund Payment : ' + JSON.stringify(response['status']));
					callback(error, data);
				});

			}
		}, enableCapture);
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	refundAPayment(function () {
		console.log('Refund Payment end.');
	});
}
module.exports.refundAPayment = refundAPayment;