'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function replay_failed_transactions_by_set_start_and_end_time(callback, webhookId) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.ReplayWebhooksRequest();

		var byDeliveryStatus = new cybersourceRestApi.Nrtfv1webhookswebhookIdreplaysByDeliveryStatus();
		byDeliveryStatus.status = 'FAILED';
		byDeliveryStatus.startTime = '2021-01-01T15:05:52.284+05:30';
		byDeliveryStatus.endTime = '2021-01-02T03:05:52.284+05:30';
		byDeliveryStatus.productId = 'tokenManagement';
		byDeliveryStatus.eventType = 'tms.token.created';
		requestObj.byDeliveryStatus = byDeliveryStatus;
		var opts = {};
		if (requestObj != null) opts['createWebhookRequest'] = requestObj;


		var instance = new cybersourceRestApi.ManageWebhooksApi(configObject, apiClient);

		instance.replayPreviousWebhooks(webhookId, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Replay Previous Webhooks : ' + JSON.stringify(response['status']));

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
	replay_failed_transactions_by_set_start_and_end_time(function () {
		console.log('\nReplayPreviousWebhooks end.');
	}, webhookId);
}

module.exports.replay_failed_transactions_by_set_start_and_end_time = replay_failed_transactions_by_set_start_and_end_time;