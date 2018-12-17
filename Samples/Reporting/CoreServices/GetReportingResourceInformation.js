'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This is a sample code to call ReportSubscriptionsApi,
 * retrive report subscription .. visa wiki sample
 */
function getReportResourceInformation(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.ReportDefinitionsApi(configObject);
		var opts = [];
		opts['organizationId'] = 'testrest';

		console.log('****************Get Reports Resource Information****************');

		instance.getResourceV2Info(opts, function (error, data, response) {
			if (error) {
				console.log('\nError in get reports resource Information : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData of get reports resource Information : ' + JSON.stringify(data));
			}
			console.log('\nResponse of get reports resource Information : ' + JSON.stringify(response));
			console.log('\nResponse Code of get reports resource Information : ' + JSON.stringify(response['status']));
			callback(error, data);
		});
	} catch (error) {
		console.log(error);
	}

}
if (require.main === module) {
	getReportResourceInformation(function () {
		console.log('get report resource information end.');
	});
}
module.exports.getReportResourceInformation = getReportResourceInformation;
