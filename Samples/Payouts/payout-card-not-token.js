'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function payout_card_not_token(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.OctCreatePaymentRequest();

		var clientReferenceInformation = new cybersourceRestApi.PtsV2IncrementalAuthorizationPatch201ResponseClientReferenceInformation();
		clientReferenceInformation.code = '33557799';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2payoutsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2payoutsOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '100.00';
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		requestObj.orderInformation = orderInformation;

		var merchantInformation = new cybersourceRestApi.Ptsv2payoutsMerchantInformation();
		var merchantInformationMerchantDescriptor = new cybersourceRestApi.Ptsv2payoutsMerchantInformationMerchantDescriptor();
		merchantInformationMerchantDescriptor.name = 'Sending Company Name';
		merchantInformationMerchantDescriptor.locality = 'FC';
		merchantInformationMerchantDescriptor.country = 'US';
		merchantInformationMerchantDescriptor.administrativeArea = 'CA';
		merchantInformationMerchantDescriptor.postalCode = '94440';
		merchantInformation.merchantDescriptor = merchantInformationMerchantDescriptor;

		requestObj.merchantInformation = merchantInformation;

		var recipientInformation = new cybersourceRestApi.Ptsv2payoutsRecipientInformation();
		recipientInformation.firstName = 'John';
		recipientInformation.lastName = 'Doe';
		recipientInformation.address1 = 'Paseo Padre Boulevard';
		recipientInformation.locality = 'Foster City';
		recipientInformation.administrativeArea = 'CA';
		recipientInformation.country = 'US';
		recipientInformation.postalCode = '94400';
		recipientInformation.phoneNumber = '6504320556';
		requestObj.recipientInformation = recipientInformation;

		var senderInformation = new cybersourceRestApi.Ptsv2payoutsSenderInformation();
		senderInformation.referenceNumber = '1234567890';
		var senderInformationAccount = new cybersourceRestApi.Ptsv2payoutsSenderInformationAccount();
		senderInformationAccount.fundsSource = '05';
		senderInformation.account = senderInformationAccount;

		senderInformation.name = 'Company Name';
		senderInformation.address1 = '900 Metro Center Blvd.900';
		senderInformation.locality = 'Foster City';
		senderInformation.administrativeArea = 'CA';
		senderInformation.countryCode = 'US';
		requestObj.senderInformation = senderInformation;

		var processingInformation = new cybersourceRestApi.Ptsv2payoutsProcessingInformation();
		processingInformation.businessApplicationId = 'FD';
		processingInformation.networkRoutingOrder = 'V8';
		processingInformation.commerceIndicator = 'internet';
		requestObj.processingInformation = processingInformation;

		var paymentInformation = new cybersourceRestApi.Ptsv2payoutsPaymentInformation();
		var paymentInformationCard = new cybersourceRestApi.Ptsv2payoutsPaymentInformationCard();
		paymentInformationCard.type = '001';
		paymentInformationCard.number = '4111111111111111';
		paymentInformationCard.expirationMonth = '12';
		paymentInformationCard.expirationYear = '2025';
		paymentInformation.card = paymentInformationCard;

		requestObj.paymentInformation = paymentInformation;


		var instance = new cybersourceRestApi.PayoutsApi(configObject, apiClient);

		instance.octCreatePayment(requestObj, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Process a Payout : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	payout_card_not_token(function () {
		console.log('\nOctCreatePayment end.');
	});
}
module.exports.payout_card_not_token = payout_card_not_token;
