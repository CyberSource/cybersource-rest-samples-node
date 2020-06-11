'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var authorization_flow = require('../Payments/authorization-for-timeout-reversal-flow');

function timeout_reversal(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.MitReversalRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'TC50171_3';
		clientReferenceInformation.transactionId = '984194577614846';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var reversalInformation = new cybersourceRestApi.Ptsv2paymentsidreversalsReversalInformation();
		var reversalInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsidreversalsReversalInformationAmountDetails();
		reversalInformationAmountDetails.totalAmount = '102.21';
		reversalInformation.amountDetails = reversalInformationAmountDetails;

		reversalInformation.reason = 'testing';
		requestObj.reversalInformation = reversalInformation;


		var instance = new cybersourceRestApi.ReversalApi(configObject, apiClient);

		authorization_flow.authorization_for_timeout_reversal_flow(function(error, data) {
			if (data) {
				instance.mitReversal( requestObj, function (error, data, response) {
					if(error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Timeout Reversal : ' + JSON.stringify(response['status']));
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
		timeout_reversal(function () {
		console.log('\nMitReversal end.');
	});
}
module.exports.timeout_reversal = timeout_reversal;
