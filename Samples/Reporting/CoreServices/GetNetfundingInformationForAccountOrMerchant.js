'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This is a sample code to call ReportsApi,
 * net funding info API.
 */
function GetNetfundingInformationForAccountOrMerchant(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.NetFundingsApi(configObject);

		var startTime = new Date('2018-10-01T00:00:00.0Z').toISOString();
		var endTime = new Date('2018-10-30T23:59:59.0Z').toISOString();
		var timeQueryType = 'executedTime';
		var opts = [];
		opts['organizationId'] = 'testrest';
		opts['groupName'] = 'gruopName';

		console.log('****************Get Net Funding Info****************');

		instance.getNetFundingDetails(startTime, endTime, opts, function (error, data, response) {
			if (error) {
				console.log('\nError in get net funding info : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData of get net funding info : ' + JSON.stringify(data));
			}
			console.log('\nResponse of get net funding info : ' + JSON.stringify(response));
			console.log('\nResponse Code of get net funding info : ' + JSON.stringify(response['status']));
			callback(error, data);
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	GetNetfundingInformationForAccountOrMerchant(function () {
		console.log('Retrieve Available Reports end.');
	});
}
module.exports.GetNetfundingInformationForAccountOrMerchant = GetNetfundingInformationForAccountOrMerchant;