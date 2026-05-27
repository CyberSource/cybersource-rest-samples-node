'use strict';

/**
 * Simple Authorization using JWT authentication with Shared Secret (HS256).
 *
 * This sample demonstrates a drop-in replacement for HTTP Signature authentication.
 * It uses the same merchantKeyId and merchantsecretKey credentials
 * you already use for HTTP Signature, but authenticates via JWT instead.
 *
 * Migration from HTTP Signature:
 * HTTP Signature authentication is being deprecated. To migrate:
 * 1. Change authenticationType from 'http_signature' to 'jwt'
 * 2. Add jwtKeyType = 'SHARED_SECRET'
 * 3. Keep your existing merchantKeyId and merchantsecretKey as-is
 *
 * See Data/JwtSharedSecretConfiguration.js getMerchantDetails() for the
 * full configuration.
 */

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/JwtSharedSecretConfiguration.js');
var {getMerchantDetails} = require(filePath);

function simple_authorization_with_jwt_shared_secret(callback, enable_capture) {
	try {
		/* Load JWT + Shared Secret configuration */
		var configObject = getMerchantDetails();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreatePaymentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'TC50171_3';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
		processingInformation.capture = false;
		if (enable_capture === true) {
			processingInformation.capture = true;
		}

		requestObj.processingInformation = processingInformation;

		var paymentInformation = new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
		var paymentInformationCard = new cybersourceRestApi.Ptsv2paymentsPaymentInformationCard();
		paymentInformationCard.number = '4111111111111111';
		paymentInformationCard.expirationMonth = '12';
		paymentInformationCard.expirationYear = '2031';
		paymentInformation.card = paymentInformationCard;

		requestObj.paymentInformation = paymentInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '102.21';
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		var orderInformationBillTo = new cybersourceRestApi.Ptsv2paymentsOrderInformationBillTo();
		orderInformationBillTo.firstName = 'John';
		orderInformationBillTo.lastName = 'Doe';
		orderInformationBillTo.address1 = '1 Market St';
		orderInformationBillTo.locality = 'san francisco';
		orderInformationBillTo.administrativeArea = 'CA';
		orderInformationBillTo.postalCode = '94105';
		orderInformationBillTo.country = 'US';
		orderInformationBillTo.email = 'test@cybs.com';
		orderInformationBillTo.phoneNumber = '4158880000';
		orderInformation.billTo = orderInformationBillTo;

		requestObj.orderInformation = orderInformation;

		var instance = new cybersourceRestApi.PaymentsApi(configObject, apiClient);

		instance.createPayment(requestObj, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Process a Payment with JWT Shared Secret : ' + JSON.stringify(response['status']));
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
	simple_authorization_with_jwt_shared_secret(function () {
		console.log('\nCreatePayment with JWT Shared Secret end.');
	});
}

module.exports.simple_authorization_with_jwt_shared_secret = simple_authorization_with_jwt_shared_secret;