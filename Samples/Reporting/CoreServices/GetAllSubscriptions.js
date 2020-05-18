'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This is a sample code to call ReportSubscriptionsApi,
 * retrive  report subscription
 */
function getAllSubscriptions(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.ReportSubscriptionsApi(configObject);

		console.log('****************Get All Subscription****************');

		instance.getAllSubscriptions(function (error, data, response) {
			if (error) {
				console.log('\nError in get all subscriptions : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData of get all subscriptions : ' + JSON.stringify(data));
			}
			console.log('\nResponse of get all subscriptions : ' + JSON.stringify(response));
			console.log('\nResponse Code of get all subscriptions : ' + JSON.stringify(response['status']));
			callback(error, data);
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	getAllSubscriptions(function () {
		console.log('Get all subscription end.');
	});
}
module.exports.getAllSubscriptions = getAllSubscriptions;