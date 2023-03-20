'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function sale_using_emv_technology_with_contactless_read_with_visa_platform_connect(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreatePaymentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = '123456';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
		processingInformation.capture = false;
		processingInformation.commerceIndicator = 'retail';
		var processingInformationAuthorizationOptions = new cybersourceRestApi.Ptsv2paymentsProcessingInformationAuthorizationOptions();
		processingInformationAuthorizationOptions.partialAuthIndicator = true;
		processingInformationAuthorizationOptions.ignoreAvsResult = false;
		processingInformationAuthorizationOptions.ignoreCvResult = false;
		processingInformation.authorizationOptions = processingInformationAuthorizationOptions;

		requestObj.processingInformation = processingInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '100.00';
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		requestObj.orderInformation = orderInformation;

		var pointOfSaleInformation = new cybersourceRestApi.Ptsv2paymentsPointOfSaleInformation();
		pointOfSaleInformation.catLevel = 2;
		pointOfSaleInformation.entryMode = 'contactless';
		pointOfSaleInformation.terminalCapability = 5;
		var pointOfSaleInformationEmv = new cybersourceRestApi.Ptsv2paymentsPointOfSaleInformationEmv();
		pointOfSaleInformationEmv.tags = '9F3303204000950500000000009F3704518823719F100706011103A000009F26081E1756ED0E2134E29F36020015820200009C01009F1A0208409A030006219F02060000000020005F2A0208409F0306000000000000';
		pointOfSaleInformationEmv.cardSequenceNumber = '1';
		pointOfSaleInformationEmv.fallback = false;
		pointOfSaleInformation.emv = pointOfSaleInformationEmv;

		pointOfSaleInformation.trackData = '%B38000000000006^TEST/CYBS		 ^2012121019761100		00868000000?;38000000000006=20121210197611868000?';
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
		sale_using_emv_technology_with_contactless_read_with_visa_platform_connect(function () {
		console.log('\nCreatePayment end.');
	});
}
module.exports.sale_using_emv_technology_with_contactless_read_with_visa_platform_connect = sale_using_emv_technology_with_contactless_read_with_visa_platform_connect;
