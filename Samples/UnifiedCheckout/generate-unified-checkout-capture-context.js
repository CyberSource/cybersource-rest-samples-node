'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function generate_unified_checkout_capture_context(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.GenerateUnifiedCheckoutCaptureContextRequest();

		requestObj.clientVersion = '0.23';

		var targetOrigins = new Array();
		targetOrigins.push("https://yourCheckoutPage.com");
		requestObj.targetOrigins = targetOrigins;


		var allowedCardNetworks = new Array();
		allowedCardNetworks.push("VISA");
		allowedCardNetworks.push("MASTERCARD");
		allowedCardNetworks.push("AMEX");
		allowedCardNetworks.push("CARNET");
		allowedCardNetworks.push("CARTESBANCAIRES");
		allowedCardNetworks.push("CUP");
		allowedCardNetworks.push("DINERSCLUB");
		allowedCardNetworks.push("DISCOVER");
		allowedCardNetworks.push("EFTPOS");
		allowedCardNetworks.push("ELO");
		allowedCardNetworks.push("JCB");
		allowedCardNetworks.push("JCREW");
		allowedCardNetworks.push("MADA");
		allowedCardNetworks.push("MAESTRO");
		allowedCardNetworks.push("MEEZA");
		requestObj.allowedCardNetworks = allowedCardNetworks;


		var allowedPaymentTypes = new Array();
		allowedPaymentTypes.push("APPLEPAY");
		allowedPaymentTypes.push("CHECK");
		allowedPaymentTypes.push("CLICKTOPAY");
		allowedPaymentTypes.push("GOOGLEPAY");
		allowedPaymentTypes.push("PANENTRY");
		allowedPaymentTypes.push("PAZE");
		requestObj.allowedPaymentTypes = allowedPaymentTypes;

		requestObj.country = 'US';
		requestObj.locale = 'en_US';
		var captureMandate = new cybersourceRestApi.Upv1capturecontextsCaptureMandate();
		captureMandate.billingType = 'FULL';
		captureMandate.requestEmail = true;
		captureMandate.requestPhone = true;
		captureMandate.requestShipping = true;

		var shipToCountries = new Array();
		shipToCountries.push("US");
		shipToCountries.push("GB");
		captureMandate.shipToCountries = shipToCountries;

		captureMandate.showAcceptedNetworkIcons = true;
		requestObj.captureMandate = captureMandate;

		var orderInformation = new cybersourceRestApi.Upv1capturecontextsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Upv1capturecontextsOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '21.00';
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		requestObj.orderInformation = orderInformation;

		var completeMandate = new cybersourceRestApi.Upv1capturecontextsCompleteMandate();
		completeMandate.type = 'CAPTURE';
		completeMandate.decisionManager = false;
		requestObj.completeMandate = completeMandate;

		var instance = new cybersourceRestApi.UnifiedCheckoutCaptureContextApi(configObject, apiClient);

		instance.generateUnifiedCheckoutCaptureContext(requestObj, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
				cybersourceRestApi.CaptureContextParsingUtility.parseCaptureContextResponse(data, apiClient.merchantConfig, true, function (err, result) {
					if (err) {
						console.log('\nError in Capture Context Parsing : ' + JSON.stringify(err));
					} else {
						console.log('\nParsed Capture Context : ' + JSON.stringify(result));
					}
				});
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