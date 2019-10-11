'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function getNotificationOfChanges(callback) {
	try {
		var configObject = new configuration();
		var startTime = '2019-09-01T12:00:00-05:00';
		var endTime = '2019-09-10T12:00:00-05:00';

		var opts = [];

		var instance = new cybersourceRestApi.NotificationOfChangesApi(configObject);

		instance.getNotificationOfChangeReport( startTime, endTime, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get Notification Of Changes : ' + JSON.stringify(response['status']));
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
		getNotificationOfChanges(function () {
		console.log('\nGetNotificationOfChangeReport end.');
	},startTime, endTime);
}
module.exports.getNotificationOfChanges = getNotificationOfChanges;
