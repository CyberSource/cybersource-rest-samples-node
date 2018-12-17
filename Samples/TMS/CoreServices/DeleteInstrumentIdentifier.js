'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var retrieveInstrumentIdentifier = require('./RetrieveInstrumentIdentifier');

/**
 * This is a sample code to call TMS InstrumentIdentifierApi,
 * instrumentidentifiersTokenIdDelete method will delete instrumentIdentifier
 */

function removeInstrumentIdentifier(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.InstrumentIdentifierApi(configObject);

		var profileId = '93B32398-AD51-4CC2-A682-EA3E93614EB1';

		retrieveInstrumentIdentifier.retriveAInstrumentIdentifier(function (error, data) {
			if (!error) {
				var tokenId = data['id'];
				console.log('\n*************** Delete instrument identifier ********************* ');
				console.log('\nToken ID passing to instrumentidentifiersTokenIdDelete : ' + tokenId);
                
				instance.tmsV1InstrumentidentifiersTokenIdDelete(profileId, tokenId, function (error, data, response) {
					if (error) {
						console.log('\nError in Delete instrument identifier : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData of Delete instrument identifier : ' + JSON.stringify(data));
					}
					console.log('\nResponse of  Delete instrument identifier : ' + JSON.stringify(response));
					console.log('\nResponse Code of Delete instrument identifier :' + JSON.stringify(response['status']));
					callback(error, data);
				});
			}
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	removeInstrumentIdentifier(function () {
		console.log('Delete instrument identifier end');
	});
}
module.exports.removeInstrumentIdentifier = removeInstrumentIdentifier;