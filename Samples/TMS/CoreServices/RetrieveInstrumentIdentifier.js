'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var createInstrumentIdentifier = require('./CreateInstrumentIdentifier');

/**
 * This is a sample code to call TMS InstrumentIdentifierApi,
 * instrumentidentifiersTokenIdGet method will retrive the token details
 */

function retriveAInstrumentIdentifier(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.InstrumentIdentifierApi(configObject);

		var profileId = '93B32398-AD51-4CC2-A682-EA3E93614EB1';

		createInstrumentIdentifier.createInstrumentIdentifier(function (error, data) {
			if (!error) {
				var tokenId = data['id'];
				console.log('\n*************** Retrieve instrument identifier ********************* ');
				console.log('\nToken ID passing to instrumentidentifiersTokenIdGet : ' + tokenId);

				instance.tmsV1InstrumentidentifiersTokenIdGet(profileId, tokenId, function (error, data, response) {
					if (error) {
						console.log('\nError in Retrieve instrument identifier : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData of Retrieve instrument identifier : ' + JSON.stringify(data));
					}
					console.log('\nResponse of  Retrieve instrument identifier : ' + JSON.stringify(response));
					console.log('\nResponse Code of Retrieve instrument identifier :' + JSON.stringify(response['status']));
					callback(error, data);
				});
			}
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	retriveAInstrumentIdentifier(function () {
		console.log('Retrieve InstrumentIdentifer end.');
	});
}
module.exports.retriveAInstrumentIdentifier = retriveAInstrumentIdentifier;