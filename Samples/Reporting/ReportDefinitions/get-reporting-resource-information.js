'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function get_reporting_resource_information(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var subscriptionType = null;
		var organizationId = "testrest";

		var opts = [];
		if (subscriptionType != null) opts['subscriptionType'] = subscriptionType;
		if (organizationId != null) opts['organizationId'] = organizationId;

		var instance = new cybersourceRestApi.ReportDefinitionsApi(configObject, apiClient);

		instance.getResourceV2Info(opts, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get Reporting Resource Information : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	get_reporting_resource_information(function () {
		console.log('\nGetResourceV2Info end.');
	});
}
module.exports.get_reporting_resource_information = get_reporting_resource_information;
