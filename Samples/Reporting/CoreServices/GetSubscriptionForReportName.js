'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');

/**
 * This is a sample code to call ReportSubscriptionsApi,
 * retrive report by report name
 */
function getSubscriptionForReportName(callback) {
    try {
        var configObject = new Configuration();
        var instance = new CybersourceRestApi.ReportSubscriptionsApi(configObject);

        var reportName = "testrest_subcription_v1";

        console.log("****************Get Subscrption for Report name****************");

        instance.getSubscription(reportName, function (error, data, response) {
            if (error) {
                console.log("\nError in get subscription for report name : " + error);
            }
            else if (data) {
                console.log("\nData of get subscription for report name : " + JSON.stringify(data));
            }
            console.log("\nResponse of get subscription for report name : " + JSON.stringify(response));
            console.log("\nResponse Code of get subscription for report name : " + JSON.stringify(response['status']));
            callback(error, data);
        });
    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    getSubscriptionForReportName(function () {
        console.log('Get subscription for report name end.');
    });
}
module.exports.getSubscriptionForReportName = getSubscriptionForReportName;