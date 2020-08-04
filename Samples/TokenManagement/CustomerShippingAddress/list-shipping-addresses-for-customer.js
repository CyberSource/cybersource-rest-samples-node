'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function list_shipping_addresses_for_customer(callback) {
	var customerTokenId = 'AB695DA801DD1BB6E05341588E0A3BDC';
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var offset = null;
		var limit = null;

		var opts = [];
		if (offset!= null) opts['offset'] = offset;
		if (limit!= null) opts['limit'] = limit;

		var instance = new cybersourceRestApi.CustomerShippingAddressApi(configObject, apiClient);

		instance.getCustomerShippingAddressesList(customerTokenId, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of List Shipping Addresses for a Customer : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		list_shipping_addresses_for_customer(function () {
		console.log('\nGetCustomerShippingAddressesList end.');
	});
}
module.exports.list_shipping_addresses_for_customer = list_shipping_addresses_for_customer;
