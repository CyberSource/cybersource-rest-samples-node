'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var createCustomerPaymentInstrument = require('./create-customer-non-default-payment-instrument-card');

function delete_customer_payment_instrument(callback) {
	var customerTokenId = 'AB695DA801DD1BB6E05341588E0A3BDC';
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();

	var opts = [];

		var instance = new cybersourceRestApi.CustomerPaymentInstrumentApi(configObject, apiClient);

		createCustomerPaymentInstrument.create_customer_non_default_payment_instrument_card(function(error, data) {
		if (data) {
		var paymentInstrumentTokenId = data['id'];
		instance.deleteCustomerPaymentInstrument(customerTokenId, paymentInstrumentTokenId, opts, function (error, data, response) {
				if(error) {
					console.log('\nError : ' + JSON.stringify(error));
				}
				else if (data) {
					console.log('\nData : ' + JSON.stringify(data));
				}

				console.log('\nResponse : ' + JSON.stringify(response));
				console.log('\nResponse Code of Delete a Customer Payment Instrument : ' + JSON.stringify(response['status']));
				callback(error, data, response);
			});
		}
	});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		delete_customer_payment_instrument(function () {
		console.log('\nDeleteCustomerPaymentInstrument end.');
	});
}
module.exports.delete_customer_payment_instrument = delete_customer_payment_instrument;
