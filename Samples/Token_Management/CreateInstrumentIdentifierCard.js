'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function createInstrumentIdentifierCard(callback, profileid) {
	try {
		var configObject = new configuration();
		var requestObj = new cybersourceRestApi.CreateInstrumentIdentifierRequest();

		var card = new cybersourceRestApi.Tmsv1instrumentidentifiersCard();
		card.number = '411111111111112';
		requestObj.card = card;


		var instance = new cybersourceRestApi.InstrumentIdentifierApi(configObject);

		instance.createInstrumentIdentifier( profileid, requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Create an Instrument Identifier : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var profileid = readline.question("\nEnter missing header parameter <profile-id>: ");
		createInstrumentIdentifierCard(function () {
		console.log('\nCreateInstrumentIdentifier end.');
	},profileid);
}
module.exports.createInstrumentIdentifierCard = createInstrumentIdentifierCard;
