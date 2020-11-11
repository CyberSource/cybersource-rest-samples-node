'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function create_customer_non_default_shipping_address(callback) {
	var customerTokenId = 'AB695DA801DD1BB6E05341588E0A3BDC';
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.PostCustomerShippingAddressRequest();

		requestObj._default = false;
		var shipTo = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultShippingAddressShipTo();
		shipTo.firstName = 'John';
		shipTo.lastName = 'Doe';
		shipTo.company = 'CyberSource';
		shipTo.address1 = '1 Market St';
		shipTo.locality = 'San Francisco';
		shipTo.administrativeArea = 'CA';
		shipTo.postalCode = '94105';
		shipTo.country = 'US';
		shipTo.email = 'test@cybs.com';
		shipTo.phoneNumber = '4158880000';
		requestObj.shipTo = shipTo;

		var opts = [];

		var instance = new cybersourceRestApi.CustomerShippingAddressApi(configObject, apiClient);

		instance.postCustomerShippingAddress(customerTokenId, requestObj, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Create a Customer Shipping Address : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		create_customer_non_default_shipping_address(function () {
		console.log('\nPostCustomerShippingAddress end.');
	});
}
module.exports.create_customer_non_default_shipping_address = create_customer_non_default_shipping_address;
