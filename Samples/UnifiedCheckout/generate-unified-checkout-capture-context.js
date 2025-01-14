'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
const { faker, fa } = require('@faker-js/faker');

function generate_unified_checkout_capture_context(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.GenerateUnifiedCheckoutCaptureContextRequest();

		var captureMandate = new cybersourceRestApi.Upv1capturecontextsCaptureMandate();
		captureMandate.billingType = 'FULL';
		captureMandate.requestEmail = true;
		captureMandate.requestPhone = true;
        captureMandate.requestShipping = true;
        captureMandate.showAcceptedNetworkIcons = true;
        captureMandate.shipToCountries = ["US", "GB"];

		requestObj.captureMandate = captureMandate;

		var orderInformation = new cybersourceRestApi.Upv1capturecontextsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Upv1capturecontextsOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = faker.commerce.price({ min: 100, max: 500 });
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		requestObj.orderInformation = orderInformation;

        requestObj.locale = 'en_US';
        requestObj.country = 'US';
        requestObj.clientVersion = '0.11';
        requestObj.targetOrigins = ["https://the-up-demo.appspot.com"];
        
        requestObj.allowedCardNetworks = ["VISA", "MASTERCARD", "AMEX"]
        requestObj.allowedPaymentTypes = ["PANENTRY", "SRC"];


		var instance = new cybersourceRestApi.UnifiedCheckoutCaptureContextApi(configObject, apiClient);

		instance.generateUnifiedCheckoutCaptureContext(requestObj, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Process a Payment : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	generate_unified_checkout_capture_context(function () {
		console.log('\nGenerate Unified Checkout Capture Context end.');
	});
}
module.exports.generate_unified_checkout_capture_context = generate_unified_checkout_capture_context;