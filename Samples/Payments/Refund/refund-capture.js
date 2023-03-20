'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var capturePayment = require('../Capture/capture-payment');

function refund_capture(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.RefundCaptureRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsidrefundsClientReferenceInformation();
		clientReferenceInformation.code = 'TC50171_3';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsidrefundsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsidcapturesOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '102.21';
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		requestObj.orderInformation = orderInformation;


		var instance = new cybersourceRestApi.RefundApi(configObject, apiClient);

		capturePayment.capture_payment(function (error, data) {
			if (data) {
				var id = data['id'];
				console.log('\n*************** Refund Capture ********************* ');
				console.log('\nCapture ID passing to refundCapture : ' + id);

				instance.refundCapture(requestObj, id, function (error, data, response) {
					if (error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Refund a Capture : ' + JSON.stringify(response['status']));
					var status = response['status'];
					write_log_audit(status);
					callback(error, data, response);
				});
			}
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
	refund_capture(function () {
		console.log('\nRefundCapture end.');
	});
}
module.exports.refund_capture = refund_capture;
