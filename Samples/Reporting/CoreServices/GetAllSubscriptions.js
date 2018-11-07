'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');

/**
 * This is a sample code to call ReportSubscriptionsApi,
 * retrive  report subscription
 */
function getAllSubscriptions(callback) {
    try {
        var configObject = new Configuration();
        var instance = new CybersourceRestApi.ReportSubscriptionsApi(configObject);

        console.log("****************Get All Subscription****************")

        instance.getAllSubscriptions(function (error, data, response) {
            if (error) {
                console.log("\nError in create report subscription : " + error);
            }
            else if (data) {
                console.log("\nData of create report subscription : " + JSON.stringify(data));
            }
            console.log("\nResponse of create report subscription : " + JSON.stringify(response));
            console.log("\nResponse Code of create report subscription : " + JSON.stringify(response['status']));
            callback(error, data);
        });
    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    getAllSubscriptions(function () {
        console.log('Get all subscription end.');
    });
}
module.exports.getAllSubscriptions = getAllSubscriptions;