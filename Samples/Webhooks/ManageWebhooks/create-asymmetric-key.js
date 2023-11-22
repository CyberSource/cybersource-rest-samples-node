'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function create_asymmetric_key(callback, vCcorrelationId, vCsenderOrganizationId, vCpermissions) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.SaveAsymEgressKey();

		requestObj.clientRequestAction = 'STORE';
		var keyInformation = new cybersourceRestApi.Kmsegressv2keysasymKeyInformation();
		keyInformation.provider = 'merchantName';
		keyInformation.tenant = 'nrtd';
		keyInformation.keyType = 'publickey';
		keyInformation.organizationId = 'merchantName';
		keyInformation.pub = 'MIIDbDCCAlQCCQD4lcSlmasmCTANBgkqhkiG9w0BAQsFADB4MQswCQYDVQQGEwJVUzELMAkGA1UECAwCVFgxDzANBgNVBAcMBkF1c3RpbjENMAsGA1UECgwEVGVzdDEOMAwGA1UECwwFVGVzdDIxDjAMBgNVBAMMBVRlc3QzMRwwGgYJKoZIhvcNAQkBFg10ZXN0QHRlc3QuY29tMB4XDTIxMDgwOTE0MTcxNFoXDTIyMDgwOTE0MTcxNFoweDELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAlRYMQ8wDQYDVQQHDAZBdXN0aW4xDTALBgNVBAoMBFRlc3QxDjAMBgNVBAsMBVRlc3QyMQ4wDAYDVQQDDAVUZXN0MzEcMBoGCSqGSIb3DQEJARYNdGVzdEB0ZXN0LmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMcHQWZRETqim3XzUQlAiujFEvsHIi1uJZKj+1lvPH36Ucqo3ORcoh/MM/zxVdahjhSyyp7MHuKBWnzft6bFeDEul6qKWGPAAzaxG/2xZSV3FggA9SyAZEDUpJ6mblwqm/EY4KmZi1FrNBUHfW2wwaqDexHPRDesRG6aI7Wuu4GdQUUqoTa2+Nv7kVgEDmGcfIjoWkGKHe+Yan95EITrq4jEFCE5Tg/vERnMvHfK2SovENZ13/pnwFYbeh1kfJSBzWW7yq8AyQAgAE9iqJXbJ/MAasir2vjUQ2+Hcl7WbkpoVjLqDt3rzV1T0Bsd4T9SC3wij9qjJSxa6vAgV4xn6bECAwEAATANBgkqhkiG9w0BAQsFAAOCAQEADuMrtYW1Sf0IsZ4ZD9ipjUrFuTxqh+0M5Jk8h0QqAXEHA/MawedlU3JmE3NB/UR82/XUwdmtObGnFANuUQQ+8WMFpcNo/Sq2kg7juneHZroRh72o73UUMtHWHzo8s0fXElNal8h3SaAAnjMblCiN+gM1RvWMvhGrMTXp2XAcdIezXf8/FOZLlzOF9QylbSk1U4ayWBag6MydkxgHjkPKdShZROEm0oz/O7J/gNp/r7J8F42Rw9MmJh9qH3SFre13nQa8V7Kg+dJHZ/jpGtSlDHAxO0SSTrPXkwB+iBJ6hSkiL/J2Ep+lYHqVe3p5NXMOlTtJdbU4enHeLkD6PazKTw';
		keyInformation.expiryDuration = '365';
		requestObj.keyInformation = keyInformation;


		var instance = new cybersourceRestApi.ManageWebhooksApi(configObject, apiClient);

		instance.saveAsymEgressKey(vC-senderOrganizationId, vC-permissions, requestObj, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Message Level Encryption : ' + JSON.stringify(response['status']));

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
	create_asymmetric_key(function () {
		console.log('\nSaveAsymEgressKey end.');
	}, vC-correlationId, vC-senderOrganizationId, vC-permissions);
}

module.exports.create_asymmetric_key = create_asymmetric_key;