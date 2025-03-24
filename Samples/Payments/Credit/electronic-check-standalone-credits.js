'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
const { faker } = require('@faker-js/faker');

function electronic_check_standalone_credits(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreateCreditRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = faker.string.uuid();
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var paymentInformation = new cybersourceRestApi.Ptsv2paymentsidrefundsPaymentInformation();
		var paymentInformationBank = new cybersourceRestApi.Ptsv2paymentsidrefundsPaymentInformationBank();
		var paymentInformationBankAccount = new cybersourceRestApi.Ptsv2paymentsPaymentInformationBankAccount();
		paymentInformationBankAccount.type = 'C';
		paymentInformationBankAccount.number = faker.finance.accountNumber(9);
		paymentInformationBankAccount.checkNumber = '123456';
		paymentInformationBank.account = paymentInformationBankAccount;

		paymentInformationBank.routingNumber = faker.finance.routingNumber();
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
		var fName = faker.person.firstName();
        var lName = faker.person.lastName();
		orderInformationBillTo.firstName = fName;
		orderInformationBillTo.lastName = lName;
		orderInformationBillTo.address1 = faker.location.streetAddress();
		orderInformationBillTo.locality = faker.location.city();
		orderInformationBillTo.administrativeArea = faker.location.state();
		orderInformationBillTo.postalCode = faker.location.zipCode();
		orderInformationBillTo.country = 'US';
		orderInformationBillTo.email = faker.internet.email({firstName:fName,lastName:lName});
		orderInformationBillTo.phoneNumber = faker.string.numeric(10);
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
		electronic_check_standalone_credits(function () {
		console.log('\nCreateCredit end.');
	});
}
module.exports.electronic_check_standalone_credits = electronic_check_standalone_credits;
