'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
const { faker, fa } = require('@faker-js/faker');

function create_customer(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.PostCustomerRequest();

		var buyerInformation = new cybersourceRestApi.Tmsv2customersBuyerInformation();
		buyerInformation.merchantCustomerID = faker.string.ulid();
		buyerInformation.email = faker.internet.email();
		requestObj.buyerInformation = buyerInformation;

		var clientReferenceInformation = new cybersourceRestApi.Tmsv2customersClientReferenceInformation();
		clientReferenceInformation.code = faker.string.uuid();
		requestObj.clientReferenceInformation = clientReferenceInformation;


		var merchantDefinedInformation =	new Array();
		var	merchantDefinedInformation1 = new cybersourceRestApi.Tmsv2customersMerchantDefinedInformation();
		merchantDefinedInformation1.name = 'data1';
		merchantDefinedInformation1.value = faker.company.catchPhrase();
		merchantDefinedInformation.push(merchantDefinedInformation1);

		requestObj.merchantDefinedInformation = merchantDefinedInformation;

		var opts = [];

		var instance = new cybersourceRestApi.CustomerApi(configObject, apiClient);

		instance.postCustomer(requestObj, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Create a Customer : ' + JSON.stringify(response['status']));
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
		create_customer(function () {
		console.log('\nPostCustomer end.');
	});
}
module.exports.create_customer = create_customer;
