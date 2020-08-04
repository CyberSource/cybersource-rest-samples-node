'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function create_customer_payment_instrument_pinless_debit(callback) {
	var customerTokenId = 'AB695DA801DD1BB6E05341588E0A3BDC';
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.PostCustomerPaymentInstrumentRequest();

		var card = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentCard();
		card.expirationMonth = '12';
		card.expirationYear = '2031';
		card.type = '001';
		card.issueNumber = '01';
		card.startMonth = '01';
		card.startYear = '2020';
		card.useAs = 'pinless debit';
		requestObj.card = card;

		var billTo = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentBillTo();
		billTo.firstName = 'John';
		billTo.lastName = 'Doe';
		billTo.company = 'CyberSource';
		billTo.address1 = '1 Market St';
		billTo.locality = 'San Francisco';
		billTo.administrativeArea = 'CA';
		billTo.postalCode = '94105';
		billTo.country = 'US';
		billTo.email = 'test@cybs.com';
		billTo.phoneNumber = '4158880000';
		requestObj.billTo = billTo;

		var instrumentIdentifier = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentInstrumentIdentifier();
		instrumentIdentifier.id = '7010000000016241111';
		requestObj.instrumentIdentifier = instrumentIdentifier;

	var opts = [];

		var instance = new cybersourceRestApi.CustomerPaymentInstrumentApi(configObject, apiClient);

		instance.postCustomerPaymentInstrument(customerTokenId, requestObj, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Create a Customer Payment Instrument : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		create_customer_payment_instrument_pinless_debit(function () {
		console.log('\nPostCustomerPaymentInstrument end.');
	});
}
module.exports.create_customer_payment_instrument_pinless_debit = create_customer_payment_instrument_pinless_debit;
