'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));

/**
 * This is a sample code to call PaymentApi,
 * createPayment method will create a new payment
 */
function processPayment(callback, enableCapture) { 
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.PaymentsApi(configObject);

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'test_payment';

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
		processingInformation.commerceIndicator = 'internet';

		var subMerchant = new cybersourceRestApi.Ptsv2paymentsAggregatorInformationSubMerchant();
		subMerchant.cardAcceptorId = '1234567890';
		subMerchant.country = 'US';
		subMerchant.phoneNumber = '4158880000';
		subMerchant.address1 = '1 Market St';
		subMerchant.postalCode = '94105';
		subMerchant.locality = 'San Francisco';
		subMerchant.name = 'Visa Inc';
		subMerchant.administrativeArea = 'CA';
		subMerchant.region = 'PEN';
		subMerchant.email = 'test@cybs.com';

		var aggregatorInformation = new cybersourceRestApi.Ptsv2paymentsAggregatorInformation();
		aggregatorInformation.subMerchant = subMerchant;
		aggregatorInformation.name = 'V-Internatio';
		aggregatorInformation.aggregatorId = '123456789';

		var amountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		amountDetails.totalAmount = '102.21';
		amountDetails.currency = 'USD';

		var billTo = new cybersourceRestApi.Ptsv2paymentsOrderInformationBillTo();
		billTo.country = 'US';
		billTo.firstName = 'John';
		billTo.lastName = 'Deo';
		billTo.phoneNumber = '4158880000';
		billTo.address1 = 'test';
		billTo.postalCode = '94105';
		billTo.locality = 'San Francisco';
		billTo.administrativeArea = 'MI';
		billTo.email = 'test@cybs.com';
		billTo.address2 = 'Address 2';
		billTo.district = 'MI';
		billTo.buildingNumber = '123';
		billTo.company = 'Visa';

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
		orderInformation.amountDetails = amountDetails;
		orderInformation.billTo = billTo;

		var paymentInformation = new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
		var card = new cybersourceRestApi.Ptsv2paymentsPaymentInformationCard();
		card.expirationYear = '2031';
		card.number = '4111111111111111';
		card.expirationMonth = '03';
		card.securityCode = '123';
		card.type = '001';
		paymentInformation.card = card;

		var request = new cybersourceRestApi.CreatePaymentRequest();
		request.clientReferenceInformation = clientReferenceInformation;
		request.processingInformation = processingInformation;
		request.aggregatorInformation = aggregatorInformation;
		request.orderInformation = orderInformation;
		request.paymentInformation = paymentInformation;

		if (enableCapture === true) {
			request.processingInformation.capture = true;
		}
		console.log('\n[BEGIN] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');

		instance.createPayment(request, function (error, data, response) {
			if (error) {
				console.log('\n API ERROR : \n ' + JSON.stringify(error));
			}
			if (response) {
				console.log('\n API REQUEST HEADERS : \n' + JSON.stringify(response.req._headers,0,2));
				console.log('\n API REQUEST BODY : \n' + response.request._data + '\n');
				console.log('\n API RESPONSE BODY : ' + response.text); 
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
	processPayment(function () {
		console.log('\n [END] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
	}, false);
}
module.exports.processPayment = processPayment;