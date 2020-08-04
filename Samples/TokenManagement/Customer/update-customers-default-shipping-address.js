'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function update_customers_default_shipping_address(callback) {
	var customerTokenId = 'AB695DA801DD1BB6E05341588E0A3BDC';
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.PatchCustomerRequest();

		var defaultShippingAddress = new cybersourceRestApi.Tmsv2customersDefaultShippingAddress();
		defaultShippingAddress.id = 'AB6A54B97C00FCB6E05341588E0A3935';
		requestObj.defaultShippingAddress = defaultShippingAddress;

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
		update_customers_default_shipping_address(function () {
		console.log('\nPatchCustomer end.');
	});
}
module.exports.update_customers_default_shipping_address = update_customers_default_shipping_address;
