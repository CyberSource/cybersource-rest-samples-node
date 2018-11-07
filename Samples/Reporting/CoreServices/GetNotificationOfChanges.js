'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');

/**
 * This is a sample code to call NotificationOfChangesApi,
 * retrive  notification of report change
 */
function getNotificationOfChanges(callback) {
    try {
        var configObject = new Configuration();
        var instance = new CybersourceRestApi.NotificationOfChangesApi(configObject);

        var startTime = "2018-09-01T12:00:00-05:00";
        var endTime = "2018-09-30T12:00:00-05:00";

        console.log("****************Get Notification of Changes****************")

        instance.getNotificationOfChangeReport(startTime, endTime, function (error, data, response) {
            if (error) {
                console.log("\nError in Get notification of changes : " + error);
            }
            else if (data) {
                console.log("\nData of Get notification of changes : " + JSON.stringify(data));
            }
            console.log("\nResponse of Get notification of changes : " + JSON.stringify(response));
            console.log("\nResponse Code of Get notification of changes : " + JSON.stringify(response['status']));
            callback(error, data);
        });
    } catch (error) {
        console.log(error);
    }

};
if (require.main === module) {
    getNotificationOfChanges(function () {
        console.log('Get notification of changes end.');
    });
}
module.exports.getNotificationOfChanges = getNotificationOfChanges;