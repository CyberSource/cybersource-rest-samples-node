'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var createPaymentInstrument = require('./create-payment-instrument-card');

function delete_payment_instrument(callback) {
	var profileid = '93B32398-AD51-4CC2-A682-EA3E93614EB1';

	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
	
	var opts = [];
	if (profileid != null) opts['profile-id'] = profileid;

		var instance = new cybersourceRestApi.PaymentInstrumentApi(configObject, apiClient);

		createPaymentInstrument.create_payment_instrument_card(function (error, data, response) {
			if (data) {
				var paymentInstrumentTokenId = data['id'];
				instance.deletePaymentInstrument(paymentInstrumentTokenId, opts, function (error, data, response) {
					if (error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Delete a Payment Instrument : ' + JSON.stringify(response['status']));
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
	delete_payment_instrument(function () {
		console.log('\nDeletePaymentInstrument end.');
	});
}
module.exports.delete_payment_instrument = delete_payment_instrument;
