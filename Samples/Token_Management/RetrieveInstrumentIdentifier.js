'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function retrieveInstrumentIdentifier(callback, profileid, tokenId) {
	try {
		var configObject = new configuration();

		var instance = new cybersourceRestApi.InstrumentIdentifierApi(configObject);

		instance.getInstrumentIdentifier( profileid, tokenId, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Retrieve an Instrument Identifier : ' + JSON.stringify(response['status']));
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
		retrieveInstrumentIdentifier(function () {
		console.log('\nGetInstrumentIdentifier end.');
	},profileid, tokenId);
}
module.exports.retrieveInstrumentIdentifier = retrieveInstrumentIdentifier;
