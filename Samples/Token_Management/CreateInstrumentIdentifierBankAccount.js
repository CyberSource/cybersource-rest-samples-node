'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function createInstrumentIdentifierBankAccount(callback, profileid) {
	try {
		var configObject = new configuration();
		var requestObj = new cybersourceRestApi.CreateInstrumentIdentifierRequest();

		var bankAccount = new cybersourceRestApi.Tmsv1instrumentidentifiersBankAccount();
		bankAccount.number = '4100';
		bankAccount.routingNumber = '071923284';
		requestObj.bankAccount = bankAccount;


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
		createInstrumentIdentifierBankAccount(function () {
		console.log('\nCreateInstrumentIdentifier end.');
	},profileid);
}
module.exports.createInstrumentIdentifierBankAccount = createInstrumentIdentifierBankAccount;
