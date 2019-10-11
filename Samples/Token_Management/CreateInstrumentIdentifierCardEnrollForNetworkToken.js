'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function createInstrumentIdentifierCardEnrollForNetworkToken(callback, profileid) {
	try {
		var configObject = new configuration();
		var requestObj = new cybersourceRestApi.CreateInstrumentIdentifierRequest();

		requestObj.type = 'enrollable card';
		var card = new cybersourceRestApi.Tmsv1instrumentidentifiersCard();
		card.number = '4622943127013705';
		card.expirationMonth = '12';
		card.expirationYear = '2022';
		card.securityCode = '838';
		requestObj.card = card;

		var billTo = new cybersourceRestApi.Tmsv1instrumentidentifiersBillTo();
		billTo.address1 = '8310 Capital of Texas Highway North';
		billTo.address2 = 'Bluffstone Drive';
		billTo.locality = 'Austin';
		billTo.administrativeArea = 'TX';
		billTo.postalCode = '78731';
		billTo.country = 'US';
		requestObj.billTo = billTo;


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
		createInstrumentIdentifierCardEnrollForNetworkToken(function () {
		console.log('\nCreateInstrumentIdentifier end.');
	},profileid);
}
module.exports.createInstrumentIdentifierCardEnrollForNetworkToken = createInstrumentIdentifierCardEnrollForNetworkToken;
