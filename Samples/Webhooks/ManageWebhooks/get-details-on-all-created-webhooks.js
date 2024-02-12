'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function get_details_on_all_created_webhooks(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();

		// QUERY PARAMETERS
		var organizationId = "testrest";
		var productId = "testProductId";
		var eventType = "testEventType";

		var instance = new cybersourceRestApi.ManageWebhooksApi(configObject, apiClient);

		instance.getWebhookSubscriptionsByOrg(organizationId, productId, eventType, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get Details On All Created Webhooks : ' + JSON.stringify(response['status']));

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
	get_details_on_all_created_webhooks(function () {
		console.log('\nGetWebhookSubscriptionsByOrg end.');
	});
}

module.exports.get_details_on_all_created_webhooks = get_details_on_all_created_webhooks;