'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function get_notification_of_changes(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var startTime = '2019-09-01T12:00:00Z';
		var endTime = '2019-09-10T12:00:00Z';

		var opts = [];

		var instance = new cybersourceRestApi.NotificationOfChangesApi(configObject, apiClient);

		instance.getNotificationOfChangeReport(startTime, endTime, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get Notification of Changes : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	get_notification_of_changes(function () {
		console.log('\nGetNotificationOfChangeReport end.');
	});
}
module.exports.get_notification_of_changes = get_notification_of_changes;
