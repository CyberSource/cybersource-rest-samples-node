'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This is a sample code to call TMS InstrumentIdentifierApi,
 * instrumentidentifiersPost method will create a new InstrumentIdentifier
 */

function createInstrumentIdentifier(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.InstrumentIdentifierApi(configObject);

		var card = new cybersourceRestApi.Tmsv1instrumentidentifiersCard();
		card.number = '1234567890117654';

		var body = new cybersourceRestApi.CreateInstrumentIdentifierRequest();
		body.card = card;

		var profileId = '93B32398-AD51-4CC2-A682-EA3E93614EB1';
        
		console.log('\n*************** Create Instrument Identifier ********************* ');
		instance.createInstrumentIdentifier(profileId, body, function (error, data, response) {
			if (error) {
				console.log('\nError in create instrument identifier : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData of Create instrument identifier : ' + JSON.stringify(data));
			}
			console.log('\nResponse of  Create instrument identifier : ' + JSON.stringify(response));
			console.log('\nResponse Code of Create instrument identifier :' + JSON.stringify(response['status']));
			callback(error,data);
		});
        
	} catch (error) {
		console.log(error);
	}
}

if (require.main === module) {
	createInstrumentIdentifier(function () {
		console.log('Create instrument identifier end.');
	});
}
module.exports.createInstrumentIdentifier = createInstrumentIdentifier;