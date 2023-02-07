'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function electronic_check_standalone_credits(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreateCreditRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'TC46125-1';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var paymentInformation = new cybersourceRestApi.Ptsv2paymentsidrefundsPaymentInformation();
		var paymentInformationBank = new cybersourceRestApi.Ptsv2paymentsidrefundsPaymentInformationBank();
		var paymentInformationBankAccount = new cybersourceRestApi.Ptsv2paymentsPaymentInformationBankAccount();
		paymentInformationBankAccount.type = 'C';
		paymentInformationBankAccount.number = '4100';
		paymentInformationBankAccount.checkNumber = '123456';
		paymentInformationBank.account = paymentInformationBankAccount;

		paymentInformationBank.routingNumber = '071923284';
		paymentInformation.bank = paymentInformationBank;

		var paymentInformationPaymentType = new cybersourceRestApi.Ptsv2paymentsidrefundsPaymentInformationPaymentType();
		paymentInformationPaymentType.name = 'CHECK';
		paymentInformation.paymentType = paymentInformationPaymentType;

		requestObj.paymentInformation = paymentInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsidrefundsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsidcapturesOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '100';
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		var orderInformationBillTo = new cybersourceRestApi.Ptsv2paymentsidcapturesOrderInformationBillTo();
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


		var instance = new cybersourceRestApi.CreditApi(configObject, apiClient);

		instance.createCredit( requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Process a Credit : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		electronic_check_standalone_credits(function () {
		console.log('\nCreateCredit end.');
	});
}
module.exports.electronic_check_standalone_credits = electronic_check_standalone_credits;
