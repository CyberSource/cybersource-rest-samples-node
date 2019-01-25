'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));

/**
 * This is a sample code to call CreditApi,
 * call createCredit method to process a credit
 */
function processACredit(callback) {

	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.CreditApi(configObject);

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'test_credits';

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
		var billtoInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformationBillTo();
		billtoInformation.country = 'US';
		billtoInformation.lastName = 'Deo';
		billtoInformation.address1 = '201 S. Division St.';
		billtoInformation.postalCode = '94105';
		billtoInformation.locality = 'San Francisco';
		billtoInformation.administrativeArea = 'MI';
		billtoInformation.firstName = 'John';
		billtoInformation.phoneNumber = '4158880000';
		billtoInformation.email = 'test@cybs.com';
		orderInformation.billTo = billtoInformation;

		var amountInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		amountInformation.totalAmount = '102.21';
		amountInformation.currency = 'USD';
		orderInformation.amountDetails = amountInformation;

		var paymentInformation = new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
		var cardInformation = new cybersourceRestApi.Ptsv2paymentsPaymentInformationCard();
		cardInformation.expirationYear = '2031';
		cardInformation.number = '5555555555554444';
		cardInformation.expirationMonth = '12';
		cardInformation.type = '002';
		paymentInformation.card = cardInformation;

		var request = new cybersourceRestApi.CreateCreditRequest();
		request.clientReferenceInformation = clientReferenceInformation;
		request.orderInformation = orderInformation;
		request.paymentInformation = paymentInformation;

		console.log('\n[BEGIN] REQUEST & RESPONSE OF:  '+ path.basename(__filename, path.extname(__filename)) + '\n');
		instance.createCredit(request, function (error, data, response) {
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
			console.log('\n[END] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
			callback(error, data);
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	processACredit(function () {
	});
}
module.exports.processACredit = processACredit;