'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/AlternativeConfiguration.js');
var configuration = require(filePath);
var authorization_flow = require('./authorization-for-incremental-authorization-flow');

function incremental_authorization(callback, id) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.IncrementAuthRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsidClientReferenceInformation();
		var clientReferenceInformationPartner = new cybersourceRestApi.Ptsv2paymentsidClientReferenceInformationPartner();
		clientReferenceInformationPartner.originalTransactionId = '12345';
		clientReferenceInformationPartner.developerId = '12345';
		clientReferenceInformationPartner.solutionId = '12345';
		clientReferenceInformation.partner = clientReferenceInformationPartner;

		requestObj.clientReferenceInformation = clientReferenceInformation;

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsidProcessingInformation();
		var processingInformationAuthorizationOptions = new cybersourceRestApi.Ptsv2paymentsidProcessingInformationAuthorizationOptions();
		var processingInformationAuthorizationOptionsInitiator = new cybersourceRestApi.Ptsv2paymentsidProcessingInformationAuthorizationOptionsInitiator();
		processingInformationAuthorizationOptionsInitiator.storedCredentialUsed = true;
		processingInformationAuthorizationOptions.initiator = processingInformationAuthorizationOptionsInitiator;

		processingInformation.authorizationOptions = processingInformationAuthorizationOptions;

		requestObj.processingInformation = processingInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsidOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsidOrderInformationAmountDetails();
		orderInformationAmountDetails.additionalAmount = '100';
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		requestObj.orderInformation = orderInformation;

		var merchantInformation = new cybersourceRestApi.Ptsv2paymentsidMerchantInformation();
		requestObj.merchantInformation = merchantInformation;

		var travelInformation = new cybersourceRestApi.Ptsv2paymentsidTravelInformation();
		travelInformation.duration = '3';
		requestObj.travelInformation = travelInformation;


		var instance = new cybersourceRestApi.PaymentsApi(configObject, apiClient);

		authorization_flow.authorization_for_incremental_authorization_flow(function (error, data) {
			if (data) {
				var id = data['id'];
				console.log('\n*************** Incremental Authorization *********************');
				console.log('Payment ID : ' + id);

				instance.incrementAuth( id, requestObj, function (error, data, response) {
					if(error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Increment an Authorization : ' + JSON.stringify(response['status']));
					callback(error, data, response);
				});
			}
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		incremental_authorization(function () {
		console.log('\nIncrementAuth end.');
	});
}
module.exports.incremental_authorization = incremental_authorization;
