'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var createInstrumentIdentifier = require('../InstrumentIdentifier/create-instrument-identifier-card')

function delete_instrument_identifier(callback) {
	var profileid = '93B32398-AD51-4CC2-A682-EA3E93614EB1';

	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();

		var instance = new cybersourceRestApi.InstrumentIdentifierApi(configObject, apiClient);

		createInstrumentIdentifier.create_instrument_identifier_card(function (error, data, response) {
			if (!error) {
				var tokenId = data['id'];
				instance.deleteInstrumentIdentifier(profileid, tokenId, function (error, data, response) {
					if (error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Delete an Instrument Identifier : ' + JSON.stringify(response['status']));
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
	delete_instrument_identifier(function () {
		console.log('\nDeleteInstrumentIdentifier end.');
	});
}
module.exports.delete_instrument_identifier = delete_instrument_identifier;
