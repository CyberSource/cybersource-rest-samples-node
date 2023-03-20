'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function get_netfunding_information_for_account_or_merchant(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var startTime = '2021-01-01T00:00:00Z';
		var endTime = '2021-01-02T23:59:59Z';
		var organizationId = "testrest";
		var groupName = null;

		var opts = [];
		if (organizationId != null) opts['organizationId'] = organizationId;
		if (groupName != null) opts['groupName'] = groupName;

		var instance = new cybersourceRestApi.NetFundingsApi(configObject, apiClient);

		instance.getNetFundingDetails(startTime, endTime, opts, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get Netfunding Information for an Account or a Merchant : ' + JSON.stringify(response['status']));
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
	get_netfunding_information_for_account_or_merchant(function () {
		console.log('\nGetNetFundingDetails end.');
	});
}
module.exports.get_netfunding_information_for_account_or_merchant = get_netfunding_information_for_account_or_merchant;
