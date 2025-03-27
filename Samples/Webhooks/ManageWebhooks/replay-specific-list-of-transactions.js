'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function replay_specific_list_of_transactions(callback, webhookId) {
	// try {
	// 	var configObject = new configuration();
	// 	var apiClient = new cybersourceRestApi.ApiClient();
	// 	var requestObj = new cybersourceRestApi.ReplayWebhooksRequest();


	// 	var byTransactionTraceIdentifiers = new Array();
	// 	byTransactionTraceIdentifiers.push("1f1d0bf4-9299-418d-99d8-faa3313829f1");
	// 	byTransactionTraceIdentifiers.push("d19fb205-20e5-43a2-867e-bd0f574b771e");
	// 	byTransactionTraceIdentifiers.push("2f2461a3-457c-40e9-867f-aced89662bbb");
	// 	byTransactionTraceIdentifiers.push("e23ddc19-93d5-4f1f-8482-d7cafbb3ed9b");
	// 	byTransactionTraceIdentifiers.push("eb9fc4a9-b31f-48d5-81a9-b1d773fd76d8");
	// 	requestObj.byTransactionTraceIdentifiers = byTransactionTraceIdentifiers;
	// 	var opts = {};
	// 	if (requestObj != null) opts['createWebhookRequest'] = requestObj;


	// 	var instance = new cybersourceRestApi.ManageWebhooksApi(configObject, apiClient);

	// 	instance.replayPreviousWebhooks(webhookId, opts, function (error, data, response) {
	// 		if(error) {
	// 			console.log('\nError : ' + JSON.stringify(error));
	// 		}
	// 		else if (data) {
	// 			console.log('\nData : ' + JSON.stringify(data));
	// 		}

	// 		console.log('\nResponse : ' + JSON.stringify(response));
	// 		console.log('\nResponse Code of Replay Previous Webhooks : ' + JSON.stringify(response['status']));

	// 		var status = response['status'];
	// 		write_log_audit(status);
	// 		callback(error, data, response);
	// 	});
	// }
	// catch (error) {
	// 	console.log('\nException on calling the API : ' + error);
	// }
}

function write_log_audit(status) {
	var filename = path.basename(__filename).split(".")[0];
	console.log(`[Sample Code Testing] [${filename}] ${status}`);
}

if (require.main === module) {
	replay_specific_list_of_transactions(function () {
		console.log('\nReplayPreviousWebhooks end.');
	}, webhookId);
}

module.exports.replay_specific_list_of_transactions = replay_specific_list_of_transactions;