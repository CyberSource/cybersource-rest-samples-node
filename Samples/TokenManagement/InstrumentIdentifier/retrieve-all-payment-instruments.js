'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var createInstrumentIdentifier = require('../InstrumentIdentifier/create-instrument-identifier-card')

function retrieve_all_payment_instruments(callback) {
	var profileid = '93B32398-AD51-4CC2-A682-EA3E93614EB1';

	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var offset = null;
		var limit = null;

		var opts = [];
		if (offset != null) opts['offset'] = offset;
		if (limit != null) opts['limit'] = limit;

		var instance = new cybersourceRestApi.InstrumentIdentifierApi(configObject, apiClient);

		createInstrumentIdentifier.create_instrument_identifier_card(function (error, data, response) {
			if (!error) {
				var tokenId = data['id'];
				instance.getAllPaymentInstruments(profileid, tokenId, opts, function (error, data, response) {
					if (error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Retrieve all Payment Instruments : ' + JSON.stringify(response['status']));
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
	retrieve_all_payment_instruments(function () {
		console.log('\nGetAllPaymentInstruments end.');
	});
}
module.exports.retrieve_all_payment_instruments = retrieve_all_payment_instruments;
