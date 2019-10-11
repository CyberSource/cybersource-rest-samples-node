'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function voidPayment(callback, id) {
	try {
		var configObject = new configuration();
		var requestObj = new cybersourceRestApi.VoidPaymentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsidreversalsClientReferenceInformation();
		clientReferenceInformation.code = 'test_void';
		requestObj.clientReferenceInformation = clientReferenceInformation;


		var instance = new cybersourceRestApi.VoidApi(configObject);

		instance.voidPayment( requestObj, id, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Void a Payment : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var id = readline.question("\nEnter missing path parameter <id>: ");
		voidPayment(function () {
		console.log('\nVoidPayment end.');
	},id);
}
module.exports.voidPayment = voidPayment;
