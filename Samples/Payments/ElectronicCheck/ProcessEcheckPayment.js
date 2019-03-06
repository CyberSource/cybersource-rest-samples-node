'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This is a sample code to call PaymentApi,
 * createPayment method will create a new payment
 */
function ProcessEcheckPayment(callback, enableCapture) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.PaymentsApi(configObject);

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'TC50171_3';

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
		processingInformation.commerceIndicator = 'internet';

		var amountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		amountDetails.totalAmount = '100';
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
		var bank = new cybersourceRestApi.Ptsv2paymentsPaymentInformationBank();
		var account = new cybersourceRestApi.Ptsv2paymentsPaymentInformationBankAccount();
		account.number = "4100";
		account.type = "C";
		bank.account = account;
		bank.routingNumber = '071923284';
		paymentInformation.bank = bank;

		var request = new cybersourceRestApi.CreatePaymentRequest();
		request.clientReferenceInformation = clientReferenceInformation;
		request.processingInformation = processingInformation;		
		request.orderInformation = orderInformation;
		request.paymentInformation = paymentInformation;

		if (enableCapture === true) {
			request.processingInformation.capture = true;
		}
		console.log('\n*************** Process Echeck Payment ********************* ');

		instance.createPayment(request, function (error, data, response) {
			if (error) {
				console.log('\nError in Process Echeck Payment : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData of Process Echeck Payment : ' + JSON.stringify(data));
			}
			console.log('\nResponse of Process Echeck Payment : ' + JSON.stringify(response));
			console.log('\nResponse Code of Process Echeck Payment : ' + JSON.stringify(response['status']));
			callback(error, data);
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	ProcessEcheckPayment(function () {
		console.log('\nProcessPayment end.');
	}, false);
}
module.exports.ProcessEcheckPayment = ProcessEcheckPayment;