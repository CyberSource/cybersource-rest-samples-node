'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var processCredit = require('../Credit/credit');
function void_credit(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.VoidCreditRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsidreversalsClientReferenceInformation();
		clientReferenceInformation.code = 'test_void';
		requestObj.clientReferenceInformation = clientReferenceInformation;


		var instance = new cybersourceRestApi.VoidApi(configObject, apiClient);

		processCredit.credit(function (error, data) {
			if (data) {
				var id = data['id'];
				console.log('\n*************** Void Credit ********************* ');
				console.log('\nCredit ID passing to voidCredit : ' + id);

				instance.voidCredit(requestObj, id, function (error, data, response) {
					if (error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Void a Credit : ' + JSON.stringify(response['status']));
					var status = response['status'];
					write_log_audit(status);
					callback(error, data, response);
				});
			}
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
	void_credit(function () {
		console.log('\nVoidCredit end.');
	});
}
module.exports.void_credit = void_credit;
