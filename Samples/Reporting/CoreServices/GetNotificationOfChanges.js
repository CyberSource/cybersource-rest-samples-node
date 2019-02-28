'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));

/**
 * This is a sample code to call NotificationOfChangesApi,
 * retrive  notification of report change
 */
function getNotificationOfChanges(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.NotificationOfChangesApi(configObject);

		var startTime = '2018-10-01T12:00:00-05:00';
		var endTime = '2018-10-30T12:00:00-05:00';

		console.log('\n[BEGIN] REQUEST & RESPONSE OF:'+ path.basename(__filename, path.extname(__filename)) + '\n');

		instance.getNotificationOfChangeReport(startTime, endTime, function (error, data, response) {
			if (error) {
				console.log('\n API ERROR : \n ' + JSON.stringify(error));
			}
			if (response) {
				console.log('\n API REQUEST HEADERS : \n' + JSON.stringify(response.req._headers,0,2));	
				console.log('\n API RESPONSE BODY : ' + response.text + '\n'); 
				console.log('\n API RESPONSE CODE : ' + JSON.stringify(response['status']));
				console.log('\n API RESPONSE HEADERS : \n' + JSON.stringify(response.header,0,2));
			}
			callback(error, data);
		});
	} catch (error) {
		console.log(error);
	}

}
if (require.main === module) {
	getNotificationOfChanges(function () {
		console.log('\n[END] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
	});
}
module.exports.getNotificationOfChanges = getNotificationOfChanges;