'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function authorization_with_customer_default_payment_instrument_shipping_address_creation(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreatePaymentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'TC50171_3';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();

		var actionList = new Array();
		actionList.push("TOKEN_CREATE");
		processingInformation.actionList = actionList;


		var actionTokenTypes = new Array();
		actionTokenTypes.push("paymentInstrument");
		actionTokenTypes.push("shippingAddress");
		processingInformation.actionTokenTypes = actionTokenTypes;

		processingInformation.capture = false;
		requestObj.processingInformation = processingInformation;

		var paymentInformation = new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
		var paymentInformationCard = new cybersourceRestApi.Ptsv2paymentsPaymentInformationCard();
		paymentInformationCard.number = '4111111111111111';
		paymentInformationCard.expirationMonth = '12';
		paymentInformationCard.expirationYear = '2031';
		paymentInformationCard.securityCode = '123';
		paymentInformation.card = paymentInformationCard;

		var paymentInformationCustomer = new cybersourceRestApi.Ptsv2paymentsPaymentInformationCustomer();
		paymentInformationCustomer.id = '7500BB199B4270EFE05340588D0AFCAD';
		paymentInformation.customer = paymentInformationCustomer;

		requestObj.paymentInformation = paymentInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '102.21';
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		var orderInformationBillTo = new cybersourceRestApi.Ptsv2paymentsOrderInformationBillTo();
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

		var orderInformationShipTo = new cybersourceRestApi.Ptsv2paymentsOrderInformationShipTo();
		orderInformationShipTo.firstName = 'John';
		orderInformationShipTo.lastName = 'Doe';
		orderInformationShipTo.address1 = '1 Market St';
		orderInformationShipTo.locality = 'san francisco';
		orderInformationShipTo.administrativeArea = 'CA';
		orderInformationShipTo.postalCode = '94105';
		orderInformationShipTo.country = 'US';
		orderInformation.shipTo = orderInformationShipTo;

		requestObj.orderInformation = orderInformation;

		var tokenInformation = new cybersourceRestApi.Ptsv2paymentsTokenInformation();
		var tokenInformationPaymentInstrument = new cybersourceRestApi.Ptsv2paymentsTokenInformationPaymentInstrument();
		tokenInformationPaymentInstrument._default = true;
		tokenInformation.paymentInstrument = tokenInformationPaymentInstrument;

		var tokenInformationShippingAddress = new cybersourceRestApi.Ptsv2paymentsTokenInformationShippingAddress();
		tokenInformationShippingAddress._default = true;
		tokenInformation.shippingAddress = tokenInformationShippingAddress;

		requestObj.tokenInformation = tokenInformation;


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
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		authorization_with_customer_default_payment_instrument_shipping_address_creation(function () {
		console.log('\nCreatePayment end.');
	});
}
module.exports.authorization_with_customer_default_payment_instrument_shipping_address_creation = authorization_with_customer_default_payment_instrument_shipping_address_creation;
