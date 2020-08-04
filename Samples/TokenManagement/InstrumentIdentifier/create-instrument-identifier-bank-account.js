'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function create_instrument_identifier_bank_account(callback) {
	var profileid = '93B32398-AD51-4CC2-A682-EA3E93614EB1';

	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.PostInstrumentIdentifierRequest();

		var bankAccount = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentEmbeddedInstrumentIdentifierBankAccount();
		bankAccount.number = '4100';
		bankAccount.routingNumber = '071923284';
		requestObj.bankAccount = bankAccount;

	var opts = [];

		var instance = new cybersourceRestApi.InstrumentIdentifierApi(configObject, apiClient);

		instance.postInstrumentIdentifier(requestObj, opts, function (error, data, response) {
			if (error) {
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
	create_instrument_identifier_bank_account(function () {
		console.log('\nPostInstrumentIdentifier end.');
	});
}
module.exports.create_instrument_identifier_bank_account = create_instrument_identifier_bank_account;
