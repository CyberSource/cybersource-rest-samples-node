'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var createInstrumentIdentifier = require('./create-instrument-identifier-card');

function retrieve_instrument_identifier(callback) {
	var profileid = '93B32398-AD51-4CC2-A682-EA3E93614EB1';

	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
	
	var opts = [];
	if (profileid != null) opts['profile-id'] = profileid;

		var instance = new cybersourceRestApi.InstrumentIdentifierApi(configObject, apiClient);

		createInstrumentIdentifier.create_instrument_identifier_card(function (error, data, response) {
			if (data) {
				var instrumentIdentifierTokenId = data['id'];
				instance.getInstrumentIdentifier(instrumentIdentifierTokenId, opts, function (error, data, response) {
					if (error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Retrieve an Instrument Identifier : ' + JSON.stringify(response['status']));
					var status = response['status'];
					write_log_audit(status);
					callback(error, data, response);
				});
			}
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
	retrieve_instrument_identifier(function () {
		console.log('\nGetInstrumentIdentifier end.');
	});
}
module.exports.retrieve_instrument_identifier = retrieve_instrument_identifier;
