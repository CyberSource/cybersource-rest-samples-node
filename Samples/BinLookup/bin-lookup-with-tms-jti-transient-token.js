'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function bin_lookup_with_tms_jti_transient_token(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreateBinLookupRequest();

		var tokenInformation = new cybersourceRestApi.Binv1binlookupTokenInformation();
		tokenInformation.jti = '1E0WC1GO87JG1BDP0CQ8SCR1TTK86U9N98H3WH8IFM9MVEWTIYFI62F4941E7A92';
		requestObj.tokenInformation = tokenInformation;


		var instance = new cybersourceRestApi.BinLookupApi(configObject, apiClient);

		instance.getAccountInfo(requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of BIN Lookup API : ' + JSON.stringify(response['status']));

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
	bin_lookup_with_tms_jti_transient_token(function () {
		console.log('\nGetAccountInfo end.');
	});
}

module.exports.bin_lookup_with_tms_jti_transient_token = bin_lookup_with_tms_jti_transient_token;