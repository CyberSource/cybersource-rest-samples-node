'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');
var CreateReportSubscription = require('./CreateReportSubscriptionForReportNameByOrganization');

/**
 * This is a sample code to call ReportSubscriptionsApi,
 * delete subscription report
 */
function deleteSubscriptionReport(name, callback) {
    try {
        var configObject = new Configuration();
        var instance = new CybersourceRestApi.ReportSubscriptionsApi(configObject);


        var reportName = "reportName";
        if (name)
            reportName = name;
        console.log("****************Delete Subscription of Report Name****************");

        instance.deleteSubscription(reportName, function (error, data, response) {
            if (error) {
                console.log("\nError inDelete subscription of report name : " + error);
            }
            else if (data) {
                console.log("\nData ofDelete subscription of report name : " + JSON.stringify(data));
            }
            console.log("\nResponse ofDelete subscription of report name : " + JSON.stringify(response));
            console.log("\nResponse Code of Delete subscription of report name : " + JSON.stringify(response['status']));
            callback(error, data);
        });

    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    deleteSubscriptionReport(function () {
        console.log('Delete subscription of report name end.');
    });
}
module.exports.deleteSubscriptionReport = deleteSubscriptionReport;