'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var createCustomer = require('./create-customer');

function delete_customer(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();

		var instance = new cybersourceRestApi.CustomerApi(configObject, apiClient);
	
		var opts = [];

		createCustomer.create_customer(function(error, data) {
		if (data) {
		var customerTokenId = data['id'];
				instance.deleteCustomer(customerTokenId, opts, function (error, data, response) {
				if(error) {
					console.log('\nError : ' + JSON.stringify(error));
				}
				else if (data) {
					console.log('\nData : ' + JSON.stringify(data));
				}

				console.log('\nResponse : ' + JSON.stringify(response));
				console.log('\nResponse Code of Delete a Customer : ' + JSON.stringify(response['status']));
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
		delete_customer(function () {
		console.log('\nDeleteCustomer end.');
	});
}
module.exports.delete_customer = delete_customer;
