'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function create_webhook_symmetric_key(callback, vCcorrelationId, vCsenderOrganizationId, vCpermissions) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.SaveSymEgressKey();

		requestObj.clientRequestAction = 'CREATE';
		var keyInformation = new cybersourceRestApi.Kmsegressv2keyssymKeyInformation();
		keyInformation.provider = 'nrtd';
		keyInformation.tenant = '<INSERT ORGANIZATION ID HERE>';
		keyInformation.keyType = 'sharedSecret';
		keyInformation.organizationId = '<INSERT ORGANIZATION ID HERE>';
		requestObj.keyInformation = keyInformation;
		var opts = {};
		if (vCcorrelationId != null) opts['vCCorrelationId'] = vCcorrelationId;
		if (requestObj != null) opts['createWebhookRequest'] = requestObj;


		var instance = new cybersourceRestApi.CreateNewWebhooksApi(configObject, apiClient);

		instance.saveSymEgressKey(vCsenderOrganizationId, vCpermissions, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Create Webhook Security Keys : ' + JSON.stringify(response['status']));

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
	create_webhook_symmetric_key(function () {
		console.log('\nSaveSymEgressKey end.');
	}, vCcorrelationId, vCsenderOrganizationId, vCpermissions);
}

module.exports.create_webhook_symmetric_key = create_webhook_symmetric_key;