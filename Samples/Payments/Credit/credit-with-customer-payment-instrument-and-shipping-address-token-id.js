'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function credit_with_customer_payment_instrument_and_shipping_address_token_id(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreateCreditRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = '12345678';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var paymentInformation = new cybersourceRestApi.Ptsv2paymentsidrefundsPaymentInformation();
		var paymentInformationCustomer = new cybersourceRestApi.Ptsv2paymentsPaymentInformationCustomer();
		paymentInformationCustomer.id = '7500BB199B4270EFE05340588D0AFCAD';
		paymentInformation.customer = paymentInformationCustomer;

		var paymentInformationPaymentInstrument = new cybersourceRestApi.Ptsv2paymentsPaymentInformationPaymentInstrument();
		paymentInformationPaymentInstrument.id = '7500BB199B4270EFE05340588D0AFCPI';
		paymentInformation.paymentInstrument = paymentInformationPaymentInstrument;

		var paymentInformationShippingAddress = new cybersourceRestApi.Ptsv2paymentsPaymentInformationShippingAddress();
		paymentInformationShippingAddress.id = '7500BB199B4270EFE05340588D0AFCSA';
		paymentInformation.shippingAddress = paymentInformationShippingAddress;

		requestObj.paymentInformation = paymentInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsidrefundsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsidcapturesOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '200';
		orderInformationAmountDetails.currency = 'usd';
		orderInformation.amountDetails = orderInformationAmountDetails;

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
		credit_with_customer_payment_instrument_and_shipping_address_token_id(function () {
		console.log('\nCreateCredit end.');
	});
}
module.exports.credit_with_customer_payment_instrument_and_shipping_address_token_id = credit_with_customer_payment_instrument_and_shipping_address_token_id;
