'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var simple_authorization_internet = require('../Payments/simple-authorization-internet');

function process_authorization_reversal(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
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


		var instance = new cybersourceRestApi.ReversalApi(configObject, apiClient);

		var enable_capture = false;
		simple_authorization_internet.simple_authorization_internet(function (error, data) {
			if (data) {
				var id = data['id'];
				console.log('\n*************** Authorizarion Reversal ********************* ');
				console.log('Payment ID passing to authReversal : ' + id);
				instance.authReversal(id, requestObj, function (error, data, response) {
					if (error) {
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
		}, enable_capture);
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	process_authorization_reversal(function () {
		console.log('\nAuthReversal end.');
	});
}
module.exports.process_authorization_reversal = process_authorization_reversal;
