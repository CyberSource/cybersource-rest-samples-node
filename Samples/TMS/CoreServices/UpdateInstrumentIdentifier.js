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

		var merchantInitiatedTransaction = new cybersourceRestApi.TmsV1InstrumentIdentifiersPost200ResponseProcessingInformationAuthorizationOptionsInitiatorMerchantInitiatedTransaction();
		var previousTransactionId = '123456789012345';
		merchantInitiatedTransaction.previousTransactionId = previousTransactionId;

		var initiator = new cybersourceRestApi.TmsV1InstrumentIdentifiersPost200ResponseProcessingInformationAuthorizationOptionsInitiator();
		initiator.merchantInitiatedTransaction = merchantInitiatedTransaction;

		var authorizationOptions = new cybersourceRestApi.TmsV1InstrumentIdentifiersPost200ResponseProcessingInformationAuthorizationOptions();
		authorizationOptions.initiator = initiator;

		var processingInformation = new cybersourceRestApi.TmsV1InstrumentIdentifiersPost200ResponseProcessingInformation();
		processingInformation.authorizationOptions = authorizationOptions;

		var body = new cybersourceRestApi.UpdateInstrumentIdentifierRequest();
		body.processingInformation = processingInformation;

		var profileId = '93B32398-AD51-4CC2-A682-EA3E93614EB1';
        
		retrieveInstrumentIdentifier.retriveAInstrumentIdentifier(function (error, data) {
			if (!error) {
				var tokenId = data['id'];
				console.log('\n*************** Patch instrument identifier ********************* ');
				console.log('\nToken ID passing to instrumentidentifiersTokenIdPatch : ' + tokenId);


				instance.updateInstrumentIdentifier(profileId, tokenId, body, function (error, data, response) {
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
