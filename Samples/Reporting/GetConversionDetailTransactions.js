'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function getConversionDetailTransactions(callback) {
	try {
		var configObject = new configuration();
		var startTime = '2019-03-21T00:00:00.0Z';
		var endTime = '2019-03-21T23:00:00.0Z';
		var organizationId = "testrest";

		var opts = [];
		if (organizationId!= null) opts['organizationId'] = organizationId;

		var instance = new cybersourceRestApi.ConversionDetailsApi(configObject);

		instance.getConversionDetail( startTime, endTime, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get conversion detail transactions : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var startTime = readline.question("\nEnter missing query parameter <startTime>: ");
		var endTime = readline.question("\nEnter missing query parameter <endTime>: ");
		var organizationId = readline.question("\nEnter missing query parameter <organizationId>: ");
		getConversionDetailTransactions(function () {
		console.log('\nGetConversionDetail end.');
	},startTime, endTime, organizationId);
}
module.exports.getConversionDetailTransactions = getConversionDetailTransactions;
