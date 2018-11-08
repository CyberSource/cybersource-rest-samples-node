'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');
var DeleteSubscription = require('./DeleteSubscriptionOfReportNameByOrganization');
/**
 * This is a sample code to call ReportSubscriptionsApi,
 * retrive transaction by username
 */
function CreateSubscriptionReport(callback) {
    try {
        var configObject = new Configuration();
        var instance = new CybersourceRestApi.ReportSubscriptionsApi(configObject);

        var request = new CybersourceRestApi.RequestBody()

        request.reportDefinitionName = "TransactionRequestClass";
        request.reportFields = [
            "Request.RequestID",
            "Request.TransactionDate",
            "Request.MerchantID"
        ];
        request.reportMimeType = "application/xml";
        request.reportFrequency = "MONTHLY";
        request.timezone = "GMT";
        request.startTime = "0900";
        request.startDay = 4;
        request.reportName = "test_v681"

        console.log("****************Create Report Subscrption****************")

        instance.createSubscription(request, function (error, data, response) {
            if (error) {
                console.log("\nError in create report subscription : " + error);
            }
            else if (data) {
                console.log("\nData of create report subscription : " + JSON.stringify(data));
            }
            console.log("\nResponse of create report subscription : " + JSON.stringify(response));
            var status = JSON.stringify(response['status']);
            console.log("\nResponse Code of create report subscription : " + status);
            if (status === "201") {
                DeleteSubscription.deleteSubscriptionReport(request.reportName, function (error, data) {
                    if (!error) {
                        console.log("Deleted the report subscription to clear the bad values in backend")
                    }
                });
            }
            callback(error, request.reportName);
        });
    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    CreateSubscriptionReport(function () {
        console.log('Create report subscription end.');
    });
}
module.exports.CreateSubscriptionReport = CreateSubscriptionReport;