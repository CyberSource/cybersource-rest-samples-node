'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function retrieve_customer_payment_instrument(callback) {
	var customerTokenId = 'AB695DA801DD1BB6E05341588E0A3BDC';
	var paymentInstrumentTokenId = 'AB6A54B982A6FCB6E05341588E0A3935';
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();

	var opts = [];

		var instance = new cybersourceRestApi.CustomerPaymentInstrumentApi(configObject, apiClient);

		instance.getCustomerPaymentInstrument(customerTokenId, paymentInstrumentTokenId, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Retrieve a Customer Payment Instrument : ' + JSON.stringify(response['status']));
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
		retrieve_customer_payment_instrument(function () {
		console.log('\nGetCustomerPaymentInstrument end.');
	});
}
module.exports.retrieve_customer_payment_instrument = retrieve_customer_payment_instrument;
