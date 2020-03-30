'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var processPayment = require('../Payments/Payments/simple-authorization-internet')

function retrieve_transaction(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();

		var instance = new cybersourceRestApi.TransactionDetailsApi(configObject, apiClient);

		processPayment.simple_authorization_internet(function (error, data, response) {
			var id = data['id'];
			setTimeout(() => {  
				instance.getTransaction(id, function (error, data, response) {
					if (error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Retrieve a Transaction : ' + JSON.stringify(response['status']));
					callback(error, data, response);
				}); 
			}, 10000);			
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	retrieve_transaction(function () {
		console.log('\nGetTransaction end.');
	});
}
module.exports.retrieve_transaction = retrieve_transaction;
