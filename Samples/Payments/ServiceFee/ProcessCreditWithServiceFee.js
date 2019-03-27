'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This is a sample code to call CreditApi,
 * call createCredit method to process a credit
 */
function processACreditWithServiceFee(callback) {

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
		amountInformation.totalAmount = '2325.00';
		amountInformation.currency = 'USD';
		amountInformation.serviceFeeAmount = '30.00';
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

		console.log('\n*************** Process Credit ********************* ');
		instance.createCredit(request, function (error, data, response) {
			if (error) {
				console.log('\nError in process a credit : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData of process a credit : ' + JSON.stringify(data));
			}
			console.log('\nResponse of process a credit : ' + JSON.stringify(response));
			console.log('\nResponse Code of process a credit : ' + JSON.stringify(response['status']));
			callback(error, data);
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	processACreditWithServiceFee(function () {
		console.log('Process Credit end.');
	});
}
module.exports.processACreditWithServiceFee = processACreditWithServiceFee;