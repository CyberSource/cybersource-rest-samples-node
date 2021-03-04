'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function setup_completion_with_tms_token(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.PayerAuthSetupRequest();

		var clientReferenceInformation = new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
		clientReferenceInformation.code = 'cybs_test';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var paymentInformation = new cybersourceRestApi.Riskv1authenticationsetupsPaymentInformation();
		var paymentInformationCustomer = new cybersourceRestApi.Riskv1authenticationsetupsPaymentInformationCustomer();
		paymentInformationCustomer.customerId = 'AB695DA801DD1BB6E05341588E0A3BDC';
		paymentInformation.customer = paymentInformationCustomer;

		requestObj.paymentInformation = paymentInformation;


		var instance = new cybersourceRestApi.PayerAuthenticationApi(configObject, apiClient);

		instance.payerAuthSetup( requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Setup Payer Auth : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		setup_completion_with_tms_token(function () {
		console.log('\nPayerAuthSetup end.');
	});
}
module.exports.setup_completion_with_tms_token = setup_completion_with_tms_token;
