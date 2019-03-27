'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function ProcessEcheckCredit(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.CreditApi(configObject);

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'TC50171_3';

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
		processingInformation.commerceIndicator = 'internet';

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
		billTo.company = 'ABC Company';

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
		orderInformation.amountDetails = amountDetails;
		orderInformation.billTo = billTo;
		
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
		request.processingInformation = processingInformation;
		request.orderInformation = orderInformation;
		request.paymentInformation = paymentInformation;

		console.log('\n*************** Process Echeck Credit ********************* ');		

		instance.createCredit(request, function (error, data, response) {
			if (error) {
				console.log('\nError in Process Echeck Credit : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData of Process Echeck Credit : ' + JSON.stringify(data));
			}
			console.log('\nResponse of Process Echeck Credit : ' + JSON.stringify(response));
			console.log('\nResponse Code of Process Echeck Credit : ' + JSON.stringify(response['status']));
			
			callback(error, data);
		});
	} catch (error) {
		console.log(error);
	}
}

if (require.main === module) {
	ProcessEcheckCredit(function () {
		console.log('\nProcessEcheckCredit end.');
	}, false);
}

module.exports.ProcessEcheckCredit = ProcessEcheckCredit;