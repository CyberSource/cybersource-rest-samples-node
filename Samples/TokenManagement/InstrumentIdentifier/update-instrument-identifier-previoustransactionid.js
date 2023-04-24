'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function update_instrument_identifier_previoustransactionid(callback) {
	var instrumentIdentifierTokenId = '7010000000016241111';
	var profileid = '93B32398-AD51-4CC2-A682-EA3E93614EB1';
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.PatchInstrumentIdentifierRequest();

		var processingInformation = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentEmbeddedInstrumentIdentifierProcessingInformation();
		var processingInformationAuthorizationOptions = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentEmbeddedInstrumentIdentifierProcessingInformationAuthorizationOptions();
		var processingInformationAuthorizationOptionsInitiator = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentEmbeddedInstrumentIdentifierProcessingInformationAuthorizationOptionsInitiator();
		var processingInformationAuthorizationOptionsInitiatorMerchantInitiatedTransaction = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentEmbeddedInstrumentIdentifierProcessingInformationAuthorizationOptionsInitiatorMerchantInitiatedTransaction();
		processingInformationAuthorizationOptionsInitiatorMerchantInitiatedTransaction.previousTransactionId = '123456789012345';
		processingInformationAuthorizationOptionsInitiator.merchantInitiatedTransaction = processingInformationAuthorizationOptionsInitiatorMerchantInitiatedTransaction;

		processingInformationAuthorizationOptions.initiator = processingInformationAuthorizationOptionsInitiator;

		processingInformation.authorizationOptions = processingInformationAuthorizationOptions;

		requestObj.processingInformation = processingInformation;
	
	var opts = [];
	if (profileid != null) opts['profile-id'] = profileid;

		var instance = new cybersourceRestApi.InstrumentIdentifierApi(configObject, apiClient);

		instance.patchInstrumentIdentifier(instrumentIdentifierTokenId, requestObj, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Update an Instrument Identifier : ' + JSON.stringify(response['status']));
			var status = response['status'];
			write_log_audit(status);
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}

function write_log_audit(status) {
	var filename = path.basename(__filename).split(".")[0];
	console.log(`[Sample Code Testing] [${filename}] ${status}`);
}

if (require.main === module) {	
		update_instrument_identifier_previoustransactionid(function () {
		console.log('\nPatchInstrumentIdentifier end.');
	});
}
module.exports.update_instrument_identifier_previoustransactionid = update_instrument_identifier_previoustransactionid;
