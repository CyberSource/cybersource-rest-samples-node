'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var authorization_flow = require('../Payments/authorization-capture-for-timeout-void-flow');

function timeout_void(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.MitVoidRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'TC50171_3';
		clientReferenceInformation.transactionId = '48597865325866';
		requestObj.clientReferenceInformation = clientReferenceInformation;


		var instance = new cybersourceRestApi.VoidApi(configObject, apiClient);

		authorization_flow.authorization_capture_for_timeout_void_flow(function (error, data) {
			if (data) {
				instance.mitVoid( requestObj, function (error, data, response) {
					if(error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Timeout Void : ' + JSON.stringify(response['status']));
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
		timeout_void(function () {
		console.log('\nMitVoid end.');
	});
}
module.exports.timeout_void = timeout_void;
