'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function enroll_instrument_identifier_for_network_tokenization(callback) {	
	var profileid = '93B32398-AD51-4CC2-A682-EA3E93614EB1';
	var instrumentIdentifierTokenId = '7010000000016241111';
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.PostInstrumentIdentifierEnrollmentRequest();

		requestObj.type = 'enrollable card';
		var card = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentEmbeddedInstrumentIdentifierCard();
		card.expirationMonth = '12';
		card.expirationYear = '2031';
		card.securityCode = '123';
		requestObj.card = card;

		var billTo = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentEmbeddedInstrumentIdentifierBillTo();
		billTo.address1 = '1 Market St';
		billTo.locality = 'San Francisco';
		billTo.administrativeArea = 'CA';
		billTo.postalCode = '94105';
		billTo.country = 'US';
		requestObj.billTo = billTo;


		var instance = new cybersourceRestApi.InstrumentIdentifierApi(configObject, apiClient);

		instance.postInstrumentIdentifierEnrollment(instrumentIdentifierTokenId, requestObj, profileid, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Enroll an Instrument Identifier for Network Tokenization : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		enroll_instrument_identifier_for_network_tokenization(function () {
		console.log('\nPostInstrumentIdentifierEnrollment end.');
	});
}
module.exports.enroll_instrument_identifier_for_network_tokenization = enroll_instrument_identifier_for_network_tokenization;
