'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function update_customer(callback) {
	var customerTokenId = 'AB695DA801DD1BB6E05341588E0A3BDC';
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.PatchCustomerRequest();

		var buyerInformation = new cybersourceRestApi.Tmsv2customersBuyerInformation();
		buyerInformation.merchantCustomerID = 'Your customer identifier';
		buyerInformation.email = 'test@cybs.com';
		requestObj.buyerInformation = buyerInformation;

		var clientReferenceInformation = new cybersourceRestApi.Tmsv2customersClientReferenceInformation();
		clientReferenceInformation.code = 'TC50171_3';
		requestObj.clientReferenceInformation = clientReferenceInformation;


		var merchantDefinedInformation =	new Array();
		var	merchantDefinedInformation1 = new cybersourceRestApi.Tmsv2customersMerchantDefinedInformation();
		merchantDefinedInformation1.name = 'data1';
		merchantDefinedInformation1.value = 'Your customer data';
		merchantDefinedInformation.push(merchantDefinedInformation1);

		requestObj.merchantDefinedInformation = merchantDefinedInformation;

	var opts = [];

		var instance = new cybersourceRestApi.CustomerApi(configObject, apiClient);

		instance.patchCustomer(customerTokenId, requestObj, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Update a Customer : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		update_customer(function () {
		console.log('\nPatchCustomer end.');
	});
}
module.exports.update_customer = update_customer;
