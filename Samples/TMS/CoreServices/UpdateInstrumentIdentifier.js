'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var retrieveInstrumentIdentifier = require('./RetrieveInstrumentIdentifier');


function updateInstrumentIdentifier(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.InstrumentIdentifierApi(configObject);

		var merchantInitiatedTransaction = new cybersourceRestApi.Tmsv1instrumentidentifiersProcessingInformationAuthorizationOptionsInitiatorMerchantInitiatedTransaction();
		var previousTransactionId = '123456789012345';
		merchantInitiatedTransaction.previousTransactionId = previousTransactionId;

		var initiator = new cybersourceRestApi.Tmsv1instrumentidentifiersProcessingInformationAuthorizationOptionsInitiator();
		initiator.merchantInitiatedTransaction = merchantInitiatedTransaction;

		var authorizationOptions = new cybersourceRestApi.Tmsv1instrumentidentifiersProcessingInformationAuthorizationOptions();
		authorizationOptions.initiator = initiator;

		var processingInformation = new cybersourceRestApi.Tmsv1paymentinstrumentsProcessingInformation();
		processingInformation.authorizationOptions = authorizationOptions;

		var body = new cybersourceRestApi.Body1();
		body.processingInformation = processingInformation;

		var profileId = '93B32398-AD51-4CC2-A682-EA3E93614EB1';
        
		retrieveInstrumentIdentifier.retriveAInstrumentIdentifier(function (error, data) {
			if (!error) {
				var tokenId = data['id'];
				console.log('\n*************** Patch instrument identifier ********************* ');
				console.log('\nToken ID passing to instrumentidentifiersTokenIdPatch : ' + tokenId);


				instance.tmsV1InstrumentidentifiersTokenIdPatch(profileId, tokenId, body, function (error, data, response) {
					if (error) {
						console.log('\nError in Patch instrument identifier : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData of Patch instrument identifier : ' + JSON.stringify(data));
					}
					console.log('\nResponse of  Patch instrument identifier : ' + JSON.stringify(response));
					console.log('\nResponse Code of Patch instrument identifier :' + JSON.stringify(response['status']));
					callback(error, data);
				});
			}
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	updateInstrumentIdentifier(function () {
		console.log('update instrument identifier end.');
	});
}
module.exports.updateInstrumentIdentifier = updateInstrumentIdentifier;
