'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This is a sample code to call PaymentApi,
 * createPayment method will create a new payment
 */
function ProcessPaymentWithServiceFee(callback, enableCapture) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.PaymentsApi(configObject);

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'TC50171_3';

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
		processingInformation.commerceIndicator = 'internet';

		var amountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		amountDetails.totalAmount = '2325.00';
		amountDetails.currency = 'USD';
		amountDetails.serviceFeeAmount = '30.0'

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
		card.expirationMonth = '12';
		paymentInformation.card = card;

		var serviceFeeDescriptor = new cybersourceRestApi.Ptsv2paymentsMerchantInformationServiceFeeDescriptor();
		serviceFeeDescriptor.name = "ABC";
		serviceFeeDescriptor.contact = "4111111111111111";
		serviceFeeDescriptor.state = "TEXAS";
		var merchantInformation = new cybersourceRestApi.Ptsv2paymentsMerchantInformation(); 
		merchantInformation.serviceFeeDescriptor = serviceFeeDescriptor;

		var request = new cybersourceRestApi.CreatePaymentRequest();
		request.clientReferenceInformation = clientReferenceInformation;
		request.processingInformation = processingInformation;		
		request.orderInformation = orderInformation;
		request.paymentInformation = paymentInformation;
		request.merchantInformation = merchantInformation;

		if (enableCapture === true) {
			request.processingInformation.capture = true;
		}
		console.log('\n*************** Process Payment With Service Fee ********************* ');

		instance.createPayment(request, function (error, data, response) {
			if (error) {
				console.log('\nError in Process Payment With Service Fee : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData of Process Payment With Service Fee : ' + JSON.stringify(data));
			}
			console.log('\nResponse of Process Payment With Service Fee : ' + JSON.stringify(response));
			console.log('\nResponse Code of Process Payment With Service Fee : ' + JSON.stringify(response['status']));
			callback(error, data);
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	ProcessPaymentWithServiceFee(function () {
		console.log('\nService Fee Authorization end.');
	}, false);
}
module.exports.ProcessPaymentWithServiceFee = ProcessPaymentWithServiceFee;