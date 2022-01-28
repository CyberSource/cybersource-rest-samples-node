'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var committedTaxCallRequest = require('./committed-tax-call-request');

function void_committed_tax_call(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.VoidTaxRequest();

		var clientReferenceInformation = new cybersourceRestApi.Vasv2taxidClientReferenceInformation();
		clientReferenceInformation.code = 'TAX_TC001';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var instance = new cybersourceRestApi.TaxesApi(configObject, apiClient);
	
		var opts = [];

		committedTaxCallRequest.committed_tax_call_request(function(error, data) {
			if (data) {
			var id = data['id'];
				instance.voidTax( requestObj, id, function (error, data, response) {
					if(error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Void Taxes : ' + JSON.stringify(response['status']));
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
		void_committed_tax_call(function () {
		console.log('\nVoidTax end.');
	});
}
module.exports.void_committed_tax_call = void_committed_tax_call;
