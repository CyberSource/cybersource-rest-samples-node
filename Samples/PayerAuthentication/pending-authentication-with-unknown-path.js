'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function pending_authentication_with_unknown_path(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CheckPayerAuthEnrollmentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
		clientReferenceInformation.code = 'UNKNOWN';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var orderInformation = new cybersourceRestApi.Riskv1authenticationsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Riskv1authenticationsOrderInformationAmountDetails();
		orderInformationAmountDetails.currency = 'USD';
		orderInformationAmountDetails.totalAmount = '10.99';
		orderInformation.amountDetails = orderInformationAmountDetails;

		var orderInformationBillTo = new cybersourceRestApi.Riskv1authenticationsOrderInformationBillTo();
		orderInformationBillTo.address1 = '1 Market St';
		orderInformationBillTo.address2 = 'Address 2';
		orderInformationBillTo.administrativeArea = 'CA';
		orderInformationBillTo.country = 'US';
		orderInformationBillTo.locality = 'san francisco';
		orderInformationBillTo.firstName = 'John';
		orderInformationBillTo.lastName = 'Doe';
		orderInformationBillTo.phoneNumber = '4158880000';
		orderInformationBillTo.email = 'test@cybs.com';
		orderInformationBillTo.postalCode = '94105';
		orderInformation.billTo = orderInformationBillTo;

		requestObj.orderInformation = orderInformation;

		var paymentInformation = new cybersourceRestApi.Riskv1authenticationsPaymentInformation();
		var paymentInformationCard = new cybersourceRestApi.Riskv1authenticationsPaymentInformationCard();
		paymentInformationCard.type = '001';
		paymentInformationCard.expirationMonth = '12';
		paymentInformationCard.expirationYear = '2025';
		paymentInformationCard.number = '4012001037490014';
		paymentInformation.card = paymentInformationCard;

		requestObj.paymentInformation = paymentInformation;


		var instance = new cybersourceRestApi.PayerAuthenticationApi(configObject, apiClient);

		instance.checkPayerAuthEnrollment( requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Check Payer Auth Enrollment : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		pending_authentication_with_unknown_path(function () {
		console.log('\nCheckPayerAuthEnrollment end.');
	});
}
module.exports.pending_authentication_with_unknown_path = pending_authentication_with_unknown_path;
