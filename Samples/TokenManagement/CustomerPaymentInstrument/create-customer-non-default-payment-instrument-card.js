'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function create_customer_non_default_payment_instrument_card(callback) {
	var customerTokenId = 'AB695DA801DD1BB6E05341588E0A3BDC';
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.PostCustomerPaymentInstrumentRequest();

		requestObj._default = false;
		var card = new cybersourceRestApi.Tmsv2tokenizeTokenInformationCustomerEmbeddedDefaultPaymentInstrumentCard();
		card.expirationMonth = '12';
		card.expirationYear = '2031';
		card.type = '001';
		requestObj.card = card;

		var billTo = new cybersourceRestApi.Tmsv2tokenizeTokenInformationCustomerEmbeddedDefaultPaymentInstrumentBillTo();
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

		var instrumentIdentifier = new cybersourceRestApi.Tmsv2tokenizeTokenInformationCustomerEmbeddedDefaultPaymentInstrumentInstrumentIdentifier();
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
		create_customer_non_default_payment_instrument_card(function () {
		console.log('\nPostCustomerPaymentInstrument end.');
	});
}
module.exports.create_customer_non_default_payment_instrument_card = create_customer_non_default_payment_instrument_card;
