'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/AlternativeConfiguration.js');
var configuration = require(filePath);

function pin_debit_purchase_using_swiped_track_data_with_visa_platform_connect(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreatePaymentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = '2.2 Purchase';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
		processingInformation.capture = false;
		processingInformation.commerceIndicator = 'retail';
		requestObj.processingInformation = processingInformation;

		var paymentInformation = new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
		var paymentType = new cybersourceRestApi.Ptsv2paymentsPaymentInformationPaymentType();
		paymentType.name = 'CARD';
		paymentType.subTypeName = 'DEBIT';
		paymentInformation.paymentType = paymentType;
		requestObj.paymentInformation = paymentInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '202.00';
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		requestObj.orderInformation = orderInformation;

		var pointOfSaleInformation = new cybersourceRestApi.Ptsv2paymentsPointOfSaleInformation();
		pointOfSaleInformation.entryMode = 'swiped';
		pointOfSaleInformation.trackData = '%B4111111111111111^JONES/JONES ^3112101976110000868000000?;4111111111111111=16121019761186800000?';
		requestObj.pointOfSaleInformation = pointOfSaleInformation;


		var instance = new cybersourceRestApi.PaymentsApi(configObject, apiClient);

		instance.createPayment( requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Process a Payment : ' + JSON.stringify(response['status']));
			var status = response['status'];
			write_log_audit(status);
			callback(error, data, response);
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
		pin_debit_purchase_using_swiped_track_data_with_visa_platform_connect(function () {
		console.log('\nCreatePayment end.');
	});
}
module.exports.pin_debit_purchase_using_swiped_track_data_with_visa_platform_connect = pin_debit_purchase_using_swiped_track_data_with_visa_platform_connect;
