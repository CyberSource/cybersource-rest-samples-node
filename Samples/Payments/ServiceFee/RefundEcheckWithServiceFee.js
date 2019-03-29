'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var processPayment = require('./ProcessEcheckPaymentWithServiceFee');

function RefundEcheckWithServiceFee(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.RefundApi(configObject);

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'TC46125-1';

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
		processingInformation.commerceIndicator = 'internet';

		var amountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		amountDetails.totalAmount = '2325.00';
		amountDetails.currency = 'USD';
		amountDetails.serviceFeeAmount = "30.00";

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

		var request = new cybersourceRestApi.RefundPaymentRequest();
		request.clientReferenceInformation = clientReferenceInformation;
		request.orderInformation = orderInformation;
		request.processingInformation = processingInformation;
		request.paymentInformation = paymentInformation;

		var enableCapture = true;

		processPayment.ProcessEcheckPaymentWithServiceFee(function (error, data) {
			if (data) {
				var id = data['id'];
				console.log('\n*************** Process Echeck Credit WIth Service Fee ********************* ');
				console.log('Debit ID passing to Process Echeck Credit WIth Service Fee : ' + id);

				instance.refundPayment(request, id, function (error, data, response) {
					if (error) {
						console.log('\nError in Process Echeck Credit WIth Service Fee: ' + error);
					}
					else if (data) {
						console.log('\nData of Process Echeck Credit WIth Service Fee : ' + JSON.stringify(data));
					}
					console.log('\nResponse of  Process Echeck Credit WIth Service Fee  : ' + JSON.stringify(response));
					console.log('\nResponse Code of Process Echeck Credit WIth Service Fee : ' + JSON.stringify(response['status']));
					
					callback(error, data);
				});
			}
		}, enableCapture);
	} catch (error) {
		console.log(error);
	}
}

if (require.main === module) {
	RefundEcheckWithServiceFee(function () {
		console.log('Refund Payment end.');
	});
}

module.exports.RefundEcheckWithServiceFee = RefundEcheckWithServiceFee;