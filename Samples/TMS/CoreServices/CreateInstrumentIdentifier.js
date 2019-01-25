'use strict';

var path = require('path');
var cybersourceRestApi = require('cybersource-rest-client');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));

/**
 * This is a sample code to call TMS InstrumentIdentifierApi,
 * instrumentidentifiersPost method will create a new InstrumentIdentifier
 */

function createInstrumentIdentifier(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.InstrumentIdentifiersApi(configObject);

		var card = new cybersourceRestApi.Tmsv1paymentinstrumentsCard();
		card.number = '1234567890117654';


		var merchantInitiatedTransaction = new cybersourceRestApi.Tmsv1instrumentidentifiersProcessingInformationAuthorizationOptionsInitiatorMerchantInitiatedTransaction();
		var previousTransactionId = '123456789012345';
		merchantInitiatedTransaction.previousTransactionId = previousTransactionId;

		var initiator = new cybersourceRestApi.Tmsv1instrumentidentifiersProcessingInformationAuthorizationOptionsInitiator();
		initiator.merchantInitiatedTransaction = merchantInitiatedTransaction;

		var authorizationOptions = new cybersourceRestApi.Tmsv1instrumentidentifiersProcessingInformationAuthorizationOptions();
		authorizationOptions.initiator = initiator;

		var processingInformation = new cybersourceRestApi.Tmsv1paymentinstrumentsProcessingInformation();
		processingInformation.authorizationOptions = authorizationOptions;

		var body = new cybersourceRestApi.Body();
		body.card = card;
		body.processingInformation = processingInformation;

		var profileId = '93B32398-AD51-4CC2-A682-EA3E93614EB1';
		
		console.log('\n[BEGIN] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
		
		instance.tmsV1InstrumentidentifiersPost(profileId, body, function (error, data, response) {
			if (error) {
				console.log('\n API ERROR : \n ' + JSON.stringify(error));
			}
			if (response) {
				console.log('\n API REQUEST HEADERS : \n' + JSON.stringify(response.req._headers,0,2));
				console.log('\n API REQUEST BODY : \n' + response.request._data + '\n');
				console.log('\n API RESPONSE BODY : ' + response.text + '\n'); 
				console.log('\n API RESPONSE CODE : ' + JSON.stringify(response['status']));
				console.log('\n API RESPONSE HEADERS : \n' + JSON.stringify(response.header,0,2));
				console.log('\n[END] REQUEST & RESPONSE OF:  '+ path.basename(__filename, path.extname(__filename)) + '\n');
			}
			callback(error,data);
		});        
	} catch (error) {
		console.log(error);
	}
}

if (require.main === module) {
	createInstrumentIdentifier(function () {
	});
}
module.exports.createInstrumentIdentifier = createInstrumentIdentifier;