'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function authorization_with_customer_payment_instrument_and_shipping_address_token_id(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreatePaymentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'TC50171_3';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var paymentInformation = new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
		var paymentInformationCustomer = new cybersourceRestApi.Ptsv2paymentsPaymentInformationCustomer();
		paymentInformationCustomer.id = 'AB695DA801DD1BB6E05341588E0A3BDC';
		paymentInformation.customer = paymentInformationCustomer;

		var paymentInformationPaymentInstrument = new cybersourceRestApi.Ptsv2paymentsPaymentInformationPaymentInstrument();
		paymentInformationPaymentInstrument.id = 'AB6A54B982A6FCB6E05341588E0A3935';
		paymentInformation.paymentInstrument = paymentInformationPaymentInstrument;

		var paymentInformationShippingAddress = new cybersourceRestApi.Ptsv2paymentsPaymentInformationShippingAddress();
		paymentInformationShippingAddress.id = 'AB6A54B97C00FCB6E05341588E0A3935';
		paymentInformation.shippingAddress = paymentInformationShippingAddress;

		requestObj.paymentInformation = paymentInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '102.21';
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		requestObj.orderInformation = orderInformation;


		var instance = new cybersourceRestApi.PaymentsApi(configObject, apiClient);

		instance.createPayment( requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Process a Payment : ' + JSON.stringify(response['status']));
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
		authorization_with_customer_payment_instrument_and_shipping_address_token_id(function () {
		console.log('\nCreatePayment end.');
	});
}
module.exports.authorization_with_customer_payment_instrument_and_shipping_address_token_id = authorization_with_customer_payment_instrument_and_shipping_address_token_id;
