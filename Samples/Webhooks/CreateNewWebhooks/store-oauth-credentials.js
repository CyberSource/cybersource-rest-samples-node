'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function store_oauth_credentials(callback, vCcorrelationId, vCsenderOrganizationId, vCpermissions) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.SaveSymEgressKey();

		requestObj.clientRequestAction = 'STORE';
		var keyInformation = new cybersourceRestApi.Kmsegressv2keyssymKeyInformation();
		keyInformation.provider = 'merchantName';
		keyInformation.tenant = 'nrtd';
		keyInformation.keyType = 'oAuthClientCredentials';
		keyInformation.organizationId = 'merchantName';
		keyInformation.clientKeyId = 'client username';
		keyInformation.key = 'client secret';
		keyInformation.expiryDuration = '365';
		requestObj.keyInformation = keyInformation;


		var instance = new cybersourceRestApi.CreateNewWebhooksApi(configObject, apiClient);

		instance.saveSymEgressKey(vC-senderOrganizationId, vC-permissions, requestObj, opts, function (error, data, response) {
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
	store_oauth_credentials(function () {
		console.log('\nSaveSymEgressKey end.');
	}, vC-correlationId, vC-senderOrganizationId, vC-permissions);
}

module.exports.store_oauth_credentials = store_oauth_credentials;