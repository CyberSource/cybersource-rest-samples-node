'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function processAuthorizationReversal(callback, id) {
	try {
		var configObject = new configuration();
		var requestObj = new cybersourceRestApi.AuthReversalRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsidreversalsClientReferenceInformation();
		clientReferenceInformation.code = 'TC50171_3';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var reversalInformation = new cybersourceRestApi.Ptsv2paymentsidreversalsReversalInformation();
		var reversalInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsidreversalsReversalInformationAmountDetails();
		reversalInformationAmountDetails.totalAmount = '102.21';
		reversalInformation.amountDetails = reversalInformationAmountDetails;

		reversalInformation.reason = 'testing';
		requestObj.reversalInformation = reversalInformation;


		var instance = new cybersourceRestApi.ReversalApi(configObject);

		instance.authReversal( id, requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Process an Authorization Reversal : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var id = readline.question("\nEnter missing path parameter <id>: ");
		processAuthorizationReversal(function () {
		console.log('\nAuthReversal end.');
	},id);
}
module.exports.processAuthorizationReversal = processAuthorizationReversal;
