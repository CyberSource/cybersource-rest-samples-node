'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function update_webhook(callback, webhookId) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.UpdateWebhook();

		requestObj.name = 'My Sample Webhook';
		requestObj.description = 'Update to my sample webhook';
		requestObj.organizationId = 'testOrgId';
		requestObj.productId = 'terminalManagement';

		var eventTypes = new Array();
		eventTypes.push("terminalManagement.assignment.update");
		eventTypes.push("terminalManagement.status.update");
		requestObj.eventTypes = eventTypes;

		requestObj.webhookUrl = 'https://MyWebhookServer.com:8443:/simulateClient';
		requestObj.healthCheckUrl = 'https://MyWebhookServer.com:8443:/simulateClientHealthCheck';
		requestObj.status = 'INACTIVE';

		var instance = new cybersourceRestApi.ManageWebhooksApi(configObject, apiClient);

		instance.updateWebhookSubscription(webhookId, requestObj, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Update a Webhook Subscription : ' + JSON.stringify(response['status']));

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
	update_webhook(function () {
		console.log('\nUpdateWebhookSubscription end.');
	}, webhookId);
}

module.exports.update_webhook = update_webhook;