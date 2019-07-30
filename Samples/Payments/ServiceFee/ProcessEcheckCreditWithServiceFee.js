'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This is a sample code to call CreditApi,
 * call createCredit method to process a credit
 */
function ProcessEcheckCreditWithServiceFee(callback) {

	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.CreditApi(configObject);

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'test echeck credits';

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
		billtoInformation.company = "ABC Company";
		orderInformation.billTo = billtoInformation;

		var amountInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		amountInformation.totalAmount = '2325.00';
		amountInformation.currency = 'USD';
		amountInformation.serviceFeeAmount = '30.00';
		orderInformation.amountDetails = amountInformation;

		var account = new cybersourceRestApi.Ptsv2paymentsPaymentInformationBankAccount();
		account.number = "4100";
		account.type = "C";

		var bank = new cybersourceRestApi.Ptsv2paymentsPaymentInformationBank();
		bank.account = account;
		bank.routingNumber = '071923284';
		
		var paymentInformation = new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
		paymentInformation.bank = bank;

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
	ProcessEcheckCreditWithServiceFee(function () {
		console.log('Process Credit end.');
	});
}
module.exports.ProcessEcheckCreditWithServiceFee = ProcessEcheckCreditWithServiceFee;