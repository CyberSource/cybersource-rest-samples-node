'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function setup_completion_with_flex_transient_token(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.PayerAuthSetupRequest();

		var clientReferenceInformation = new cybersourceRestApi.Riskv1authenticationsetupsClientReferenceInformation();
		clientReferenceInformation.code = 'cybs_test';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var tokenInformation = new cybersourceRestApi.Riskv1authenticationsetupsTokenInformation();
		tokenInformation.transientToken = '1D5ZX4HMOV20FKEBE3IO240JWYJ0NJ90B4V9XQ6SCK4BDN0W96E65E2A39052056';
		requestObj.tokenInformation = tokenInformation;


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
		setup_completion_with_flex_transient_token(function () {
		console.log('\nPayerAuthSetup end.');
	});
}
module.exports.setup_completion_with_flex_transient_token = setup_completion_with_flex_transient_token;
