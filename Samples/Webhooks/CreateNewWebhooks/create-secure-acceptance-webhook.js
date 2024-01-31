'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function create_secure_acceptance_webhook(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreateWebhookRequest();

		requestObj.name = 'My Custom Webhook';
		requestObj.description = 'Sample Webhook from Developer Center';
		requestObj.organizationId = '<INSERT ORGANIZATION ID HERE>';
		requestObj.productId = 'secureAcceptance';

		var eventTypes = new Array();
		eventTypes.push("sa.orders.rawtransactionresults");
		eventTypes.push("sa.orders.cardholderreceipts");
		eventTypes.push("sa.orders.merchantreceipts");
		requestObj.eventTypes = eventTypes;

		requestObj.webhookUrl = 'https://MyWebhookServer.com:8443/simulateClient';
		requestObj.healthCheckUrl = 'https://MyWebhookServer.com:8443/simulateClientHealthCheck';
		requestObj.notificationScope = 'SELF';
		var retryPolicy = new cybersourceRestApi.Notificationsubscriptionsv1webhooksRetryPolicy();
		retryPolicy.algorithm = 'ARITHMETIC';
		retryPolicy.firstRetry = 1;
		retryPolicy.interval = 1;
		retryPolicy.numberOfRetries = 3;
		retryPolicy.deactivateFlag = 'false';
		retryPolicy.repeatSequenceCount = 0;
		retryPolicy.repeatSequenceWaitTime = 0;
		requestObj.retryPolicy = retryPolicy;

		var securityPolicy = new cybersourceRestApi.Notificationsubscriptionsv1webhooksSecurityPolicy1();
		securityPolicy.securityType = 'KEY';
		securityPolicy.proxyType = 'external';
		requestObj.securityPolicy = securityPolicy;
		var opts = {};
		if (requestObj != null) opts['createWebhookRequest'] = requestObj;


		var instance = new cybersourceRestApi.CreateNewWebhooksApi(configObject, apiClient);

		instance.createWebhookSubscription(opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Create a Webhook : ' + JSON.stringify(response['status']));

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
	create_secure_acceptance_webhook(function () {
		console.log('\nCreateWebhookSubscription end.');
	});
}

module.exports.create_secure_acceptance_webhook = create_secure_acceptance_webhook;