'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This is a sample code to call ReportsApi,
 * conversion details.
 */
function GetConversionDetails(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.ConversionDetailsApi(configObject);

		var startTime = new Date('2019-03-21T00:00:00.0Z').toISOString();
		var endTime = new Date('2019-03-21T23:59:59.0Z').toISOString();
		var opts = [];
		opts['organizationId'] = 'testrest';

		console.log('****************Get Conversion Details****************');

		instance.getConversionDetail(startTime, endTime, opts, function (error, data, response) {
			if (error) {
				console.log('\nError in get conversion details : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData of get conversion details : ' + JSON.stringify(data));
			}
			console.log('\nResponse of get conversion details : ' + JSON.stringify(response));
			console.log('\nResponse Code of get conversion details : ' + JSON.stringify(response['status']));
			callback(error, data);
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	GetConversionDetails(function () {
		console.log('Get Conversion Details end.');
	});
}
module.exports.GetConversionDetails = GetConversionDetails;