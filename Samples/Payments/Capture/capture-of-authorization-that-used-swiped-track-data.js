'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var processPayment = require('../Payments/authorization-using-swiped-track-data');

function capture_of_authorization_that_used_swiped_track_data(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CapturePaymentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = '1234567890';
		var clientReferenceInformationPartner = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformationPartner();
		clientReferenceInformationPartner.thirdPartyCertificationNumber = '123456789012';
		clientReferenceInformation.partner = clientReferenceInformationPartner;

		requestObj.clientReferenceInformation = clientReferenceInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsidcapturesOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsidcapturesOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '100';
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		requestObj.orderInformation = orderInformation;


		var instance = new cybersourceRestApi.CaptureApi(configObject, apiClient);

		processPayment.authorization_using_swiped_track_data(function (error, data) {
			if (data) {
				var id = data['id'];
				console.log('\n*************** Capture Payment *********************');
				console.log('Payment ID passing to capturePayment : ' + id);
				instance.capturePayment( requestObj, id, function (error, data, response) {
					if(error) {
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
		capture_of_authorization_that_used_swiped_track_data(function () {
		console.log('\nCapturePayment end.');
	});
}
module.exports.capture_of_authorization_that_used_swiped_track_data = capture_of_authorization_that_used_swiped_track_data;
