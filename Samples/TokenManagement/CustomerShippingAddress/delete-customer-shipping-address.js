'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var createShippingAddress = require('./create-customer-non-default-shipping-address');

function delete_customer_shipping_address(callback) {
	var customerTokenId = 'AB695DA801DD1BB6E05341588E0A3BDC';
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();

		var instance = new cybersourceRestApi.CustomerShippingAddressApi(configObject, apiClient);
	
	var opts = [];

		createShippingAddress.create_customer_non_default_shipping_address(function(error, data) {
		if (data) {
		var shippingAddressTokenId = data['id'];
			instance.deleteCustomerShippingAddress(customerTokenId, shippingAddressTokenId, opts, function (error, data, response) {
				if(error) {
					console.log('\nError : ' + JSON.stringify(error));
				}
				else if (data) {
					console.log('\nData : ' + JSON.stringify(data));
				}

				console.log('\nResponse : ' + JSON.stringify(response));
				console.log('\nResponse Code of Delete a Customer Shipping Address : ' + JSON.stringify(response['status']));
				var status = response['status'];
				write_log_audit(status);
				callback(error, data, response);
			});
		}
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
		delete_customer_shipping_address(function () {
		console.log('\nDeleteCustomerShippingAddress end.');
	});
}
module.exports.delete_customer_shipping_address = delete_customer_shipping_address;
