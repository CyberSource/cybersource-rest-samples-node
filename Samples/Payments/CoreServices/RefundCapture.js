'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var capturePayment = require('./CapturePayment');
/**
 * This is a sample code to call RefundApi,
 * Include the capture ID in the POST request to refund the captured amount. 
 */
function refundACapture(callback) {
	try {
		var request = new cybersourceRestApi.RefundCaptureRequest();
		var configObject = new configuration();
		var instance = new cybersourceRestApi.RefundApi(configObject);

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'test_refund_capture';
		request.clientReferenceInformation = clientReferenceInformation;
		var orderInformation = new cybersourceRestApi.Ptsv2paymentsidrefundsOrderInformation();
		var amountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		amountDetails.totalAmount = '102.21';
		amountDetails.currency = 'USD';
		orderInformation.amountDetails = amountDetails;
		request.orderInformation = orderInformation;

		capturePayment.processCaptureAPayment(function (error, data) {
			if (data) {
				var id = data['id'];
				console.log('\n*************** Refund Capture ********************* ');
				console.log('\nCapture ID passing to refundCapture : ' + id);

				instance.refundCapture(request, id, function (error, data, response) {
					if (error) {
						console.log('\nError in Refund Capture : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData in Refund Capture: ' + JSON.stringify(data));
					}
					console.log('\nResponse of Refund Capture: ' + JSON.stringify(response));
					console.log('\nResponse Code of Refund Capture  : ' + JSON.stringify(response['status']));
					callback(error, data);

				});
			}
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	refundACapture(function () {
		console.log('Refund Capture end.');
	});
}
module.exports.refundACapture = refundACapture;