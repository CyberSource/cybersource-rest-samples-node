'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function authorization_with_pa_enroll_authentication_needed(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreatePaymentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'TC50171_3';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();

		var actionList = new Array();
		actionList.push("CONSUMER_AUTHENTICATION");
		processingInformation.actionList = actionList;

		processingInformation.capture = false;
		requestObj.processingInformation = processingInformation;

		var paymentInformation = new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
		var paymentInformationCard = new cybersourceRestApi.Ptsv2paymentsPaymentInformationCard();
		paymentInformationCard.number = '4000000000001091';
		paymentInformationCard.expirationMonth = '12';
		paymentInformationCard.expirationYear = '2023';
		paymentInformation.card = paymentInformationCard;

		requestObj.paymentInformation = paymentInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '100.00';
		orderInformationAmountDetails.currency = 'usd';
		orderInformation.amountDetails = orderInformationAmountDetails;

		var orderInformationBillTo = new cybersourceRestApi.Ptsv2paymentsOrderInformationBillTo();
		orderInformationBillTo.firstName = 'John';
		orderInformationBillTo.lastName = 'Smith';
		orderInformationBillTo.address1 = '201 S. Division St._1';
		orderInformationBillTo.address2 = 'Suite 500';
		orderInformationBillTo.locality = 'Foster City';
		orderInformationBillTo.administrativeArea = 'CA';
		orderInformationBillTo.postalCode = '94404';
		orderInformationBillTo.country = 'US';
		orderInformationBillTo.email = 'accept@cybersource.com';
		orderInformationBillTo.phoneNumber = '6504327113';
		orderInformation.billTo = orderInformationBillTo;

		requestObj.orderInformation = orderInformation;

		var consumerAuthenticationInformation = new cybersourceRestApi.Ptsv2paymentsConsumerAuthenticationInformation();
		consumerAuthenticationInformation.requestorId = '123123197675';
		consumerAuthenticationInformation.referenceId = 'CybsCruiseTester-8ac0b02f';
		requestObj.consumerAuthenticationInformation = consumerAuthenticationInformation;


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
		authorization_with_pa_enroll_authentication_needed(function () {
		console.log('\nCreatePayment end.');
	});
}
module.exports.authorization_with_pa_enroll_authentication_needed = authorization_with_pa_enroll_authentication_needed;
