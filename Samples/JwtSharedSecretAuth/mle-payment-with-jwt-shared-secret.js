'use strict';

/**
 * Simple Authorization using JWT with Shared Secret + MLE (Message Level Encryption).
 *
 * This sample demonstrates the primary benefit of migrating from HTTP Signature
 * to JWT with Shared Secret: MLE support. MLE encrypts the request payload
 * at the application level before it is sent over the network, providing an
 * additional layer of security beyond TLS.
 *
 * Key Difference from HTTP Signature:
 * HTTP Signature does not support MLE. By switching to JWT with Shared Secret,
 * you gain MLE capability using the same credentials you already have.
 *
 * MLE Certificate:
 * When using jwtKeyType=SHARED_SECRET, the MLE public certificate must
 * be provided via the mleForRequestPublicCertPath property. Download it from
 * the CyberSource Business Center:
 * - Test: https://businesscentertest.cybersource.com/ebc2
 * - Production: https://businesscenter.cybersource.com/ebc2
 *
 * See Data/JwtSharedSecretConfiguration.js getMerchantDetailsWithMLE() for the
 * full configuration.
 */

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/JwtSharedSecretConfiguration.js');
var {getMerchantDetailsWithMLE} = require(filePath);

function mle_payment_with_jwt_shared_secret(callback, enable_capture) {
	try {
		/* Load JWT + Shared Secret + MLE configuration */
		var configObject = getMerchantDetailsWithMLE();
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
			console.log('\nResponse Code of Process a Payment with JWT Shared Secret + MLE : ' + JSON.stringify(response['status']));
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
	mle_payment_with_jwt_shared_secret(function () {
		console.log('\nCreatePayment with JWT Shared Secret + MLE end.');
	});
}

module.exports.mle_payment_with_jwt_shared_secret = mle_payment_with_jwt_shared_secret;