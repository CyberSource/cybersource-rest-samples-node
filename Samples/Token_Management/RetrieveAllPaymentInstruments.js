'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function retrieveAllPaymentInstruments(callback, profileid, tokenId) {
	try {
		var configObject = new configuration();
		var offset = null;
		var limit = null;

		var opts = [];
		if (offset!= null) opts['offset'] = offset;
		if (limit!= null) opts['limit'] = limit;

		var instance = new cybersourceRestApi.InstrumentIdentifierApi(configObject);

		instance.getAllPaymentInstruments( profileid, tokenId, opts, function (error, data, response) {
			if(error) {
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
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var profileid = readline.question("\nEnter missing header parameter <profile-id>: ");
		var tokenId = readline.question("\nEnter missing path parameter <tokenId>: ");
		var offset = readline.question("\nEnter missing query parameter <offset>: ");
		var limit = readline.question("\nEnter missing query parameter <limit>: ");
		retrieveAllPaymentInstruments(function () {
		console.log('\nGetAllPaymentInstruments end.');
	},profileid, tokenId, offset, limit);
}
module.exports.retrieveAllPaymentInstruments = retrieveAllPaymentInstruments;
