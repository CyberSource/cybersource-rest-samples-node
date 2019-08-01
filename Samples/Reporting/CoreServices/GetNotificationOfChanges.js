'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This is a sample code to call NotificationOfChangesApi,
 * retrive  notification of report change
 */
function getNotificationOfChanges(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.NotificationOfChangesApi(configObject);

		var startTime = '2019-03-01T12:00:00-05:00';
		var endTime = '2019-06-30T12:00:00-05:00';

		console.log('****************Get Notification of Changes****************');

		instance.getNotificationOfChangeReport(startTime, endTime, function (error, data, response) {
			if (error) {
				console.log('\nError in Get notification of changes : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData of Get notification of changes : ' + JSON.stringify(data));
			}
			console.log('\nResponse of Get notification of changes : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get notification of changes : ' + JSON.stringify(response['status']));
			callback(error, data);
		});
	} catch (error) {
		console.log(error);
	}

}
if (require.main === module) {
	getNotificationOfChanges(function () {
		console.log('Get notification of changes end.');
	});
}
module.exports.getNotificationOfChanges = getNotificationOfChanges;