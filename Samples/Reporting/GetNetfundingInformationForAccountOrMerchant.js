'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function getNetfundingInformationForAccountOrMerchant(callback) {
	try {
		var configObject = new configuration();
		var startTime = '2019-08-01T00:00:00.000Z';
		var endTime = '2019-09-01T23:59:59.999Z';
		var organizationId = "testrest";
		var groupName = null;

		var opts = [];
		if (organizationId!= null) opts['organizationId'] = organizationId;
		if (groupName!= null) opts['groupName'] = groupName;

		var instance = new cybersourceRestApi.NetFundingsApi(configObject);

		instance.getNetFundingDetails( startTime, endTime, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get Netfunding information for an account or a merchant : ' + JSON.stringify(response['status']));
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
		var groupName = readline.question("\nEnter missing query parameter <groupName>: ");
		getNetfundingInformationForAccountOrMerchant(function () {
		console.log('\nGetNetFundingDetails end.');
	},startTime, endTime, organizationId, groupName);
}
module.exports.getNetfundingInformationForAccountOrMerchant = getNetfundingInformationForAccountOrMerchant;
