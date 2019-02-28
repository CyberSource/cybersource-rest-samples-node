'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));

function processPayout(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.ProcessAPayoutApi(configObject);

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = '33557799';

		var senderInformation = new cybersourceRestApi.Ptsv2payoutsSenderInformation();
		senderInformation.referenceNumber = '1234567890';
		senderInformation.address1 = '900 Metro Center Blvd.900';
		senderInformation.countryCode = 'US';
		senderInformation.locality = 'San Francisco';
		senderInformation.name = 'Company Name';
		senderInformation.administrativeArea = 'CA';

		var account = new cybersourceRestApi.Ptsv2payoutsSenderInformationAccount();
		account.fundsSource = '05';
		senderInformation.account = account;

		var processingInformation = new cybersourceRestApi.Ptsv2payoutsProcessingInformation();
		processingInformation.commerceIndicator = 'internet';
		processingInformation.businessApplicationId = 'FD';
		processingInformation.networkRoutingOrder = 'ECG';
		processingInformation.reconciliationId = '1087488702VIAQNSPQ';

		var payoutsOptions = new cybersourceRestApi.Ptsv2payoutsProcessingInformationPayoutsOptions();
		payoutsOptions.retrievalReferenceNumber = '123456789012';
		payoutsOptions.acquirerBin = '567890124';

		var orderInformation = new cybersourceRestApi.Ptsv2payoutsOrderInformation();
		var amountDetails = new cybersourceRestApi.Ptsv2payoutsOrderInformationAmountDetails();
		amountDetails.totalAmount = '100.00';
		amountDetails.currency = 'USD';

		orderInformation.amountDetails = amountDetails;

		var merchantInformation = new cybersourceRestApi.Ptsv2payoutsMerchantInformation();
		var merchantDescriptor = new cybersourceRestApi.Ptsv2payoutsMerchantInformationMerchantDescriptor();

		merchantDescriptor.country = 'US';
		merchantDescriptor.postalCode = '94440';
		merchantDescriptor.locality = 'FC';
		merchantDescriptor.name = 'Sending Company Name';
		merchantDescriptor.administrativeArea = 'CA';

		merchantInformation.merchantDescriptor = merchantDescriptor;

		var paymentInformation = new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
		var paymentInformationCard = new cybersourceRestApi.Ptsv2payoutsPaymentInformationCard();
		paymentInformationCard.expirationYear = '2025';
		paymentInformationCard.number = '4111111111111111';
		paymentInformationCard.expirationMonth = '12';
		paymentInformationCard.type = '001';
		paymentInformation.card = paymentInformationCard;

		var recipientInformation = new cybersourceRestApi.Ptsv2payoutsRecipientInformation();
		recipientInformation.firstName = 'John';
		recipientInformation.lastName = 'Doe';
		recipientInformation.address1 = 'Paseo Padre Boulevard';
		recipientInformation.locality = 'San Francisco';
		recipientInformation.administrativeArea = 'CA';
		recipientInformation.postalCode = '94400';
		recipientInformation.phoneNumber = '6504320556';
		recipientInformation.country = 'US';

		var request = new cybersourceRestApi.PtsV2PayoutsPostResponse();
		request.clientReferenceInformation = clientReferenceInformation;
		request.senderInformation = senderInformation;
		request.processingInformation = processingInformation;
		request.orderInformation = orderInformation;
		request.merchantInformation = merchantInformation;
		request.paymentInformation = paymentInformation;
		request.recipientInformation = recipientInformation;
		request.payoutsOptions = payoutsOptions;

		console.log('\n[BEGIN] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');

		instance.octCreatePayment(request, function (error, data, response) {	
			if (error) {
				console.log('\n API ERROR : \n ' + JSON.stringify(error));
			}
			if (response) {
				console.log('\n API REQUEST HEADERS : \n' + JSON.stringify(response.req._headers,0,2));
				console.log('\n API REQUEST BODY : \n' + response.request._data + '\n');
				console.log('\n API RESPONSE BODY : ' + response.text + '\n'); 
				console.log('\n API RESPONSE CODE : ' + JSON.stringify(response['status']));
				console.log('\n API RESPONSE HEADERS : \n' + JSON.stringify(response.header,0,2));
			}
			callback(error, data);
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	processPayout(function () {
		console.log('\n [END] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
	});
}
module.exports.processPayout = processPayout;