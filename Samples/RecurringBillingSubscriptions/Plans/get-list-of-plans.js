'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function get_list_of_plans(callback) {
	var offset = 0;
	var limit = 10;
	var code = null;
	var status = null;
	var name = null;

	var opts = {}
	if (offset != null) opts['offset'] = offset;
	if (limit != null) opts['limit'] = limit;
	if (code != null) opts['code'] = code;
	if (status != null) opts['status'] = status;
	if (name != null) opts['name'] = name;

	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();

		var instance = new cybersourceRestApi.PlansApi(configObject, apiClient);

		instance.getPlans(opts, function(error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get a List of Plans : ' + JSON.stringify(response['status']));

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
	get_list_of_plans(function () {
		console.log('\nGetListOfPlans end.');
	});
}

module.exports.get_list_of_plans = get_list_of_plans;