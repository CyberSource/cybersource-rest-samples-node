'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function find_products_you_can_subscribe_to(callback, organizationId) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();

		var instance = new cybersourceRestApi.CreateNewWebhooksApi(configObject, apiClient);

		instance.findProductToSubscribe(organizationId, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Find Products You Can Subscribe To : ' + JSON.stringify(response['status']));

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
	find_products_you_can_subscribe_to(function () {
		console.log('\nFindProductToSubscribe end.');
	}, organizationId);
}

module.exports.find_products_you_can_subscribe_to = find_products_you_can_subscribe_to;