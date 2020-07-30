'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var processPayment = require('../Payments/restaurant-authorization');

function restaurant_capture_with_gratuity(callback) {
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

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsidcapturesProcessingInformation();
		processingInformation.industryDataType = 'restaurant';
		requestObj.processingInformation = processingInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsidcapturesOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsidcapturesOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '100';
		orderInformationAmountDetails.currency = 'USD';
		orderInformationAmountDetails.gratuityAmount = '11.50';
		orderInformation.amountDetails = orderInformationAmountDetails;

		requestObj.orderInformation = orderInformation;


		var instance = new cybersourceRestApi.CaptureApi(configObject, apiClient);

		processPayment.restaurant_authorization(function (error, data) {
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
		restaurant_capture_with_gratuity(function () {
		console.log('\nCreatePayment end.');
	});
}
module.exports.restaurant_capture_with_gratuity = restaurant_capture_with_gratuity;
