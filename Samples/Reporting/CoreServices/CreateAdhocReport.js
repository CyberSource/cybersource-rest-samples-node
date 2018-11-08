'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');

/**
 * This is a sample code to call ReportsApi,
 * retrive transaction by username
 */
function createAdhocReport(callback) {
    try {
        var configObject = new Configuration();
        var instance = new CybersourceRestApi.ReportsApi(configObject);

        var reportPreferences = new CybersourceRestApi.ReportingV3ReportSubscriptionsGet200ResponseReportPreferences();
        reportPreferences.signedAmounts = true;
        reportPreferences.fieldNameConvention = "SOAPI";

        var opts = [];
        opts['organizationId'] = "testrest";

        var request = new CybersourceRestApi.RequestBody1();
        request.reportName = "Sampl34";
        request.reportDefinitionName = "TransactionRequestClass";
        request.timezone = "GMT";
        request.reportMimeType = "application/xml";
        request.reportStartTime = "2018-09-01T12:00:00+05:00";
        request.reportEndTime = "2018-09-02T12:00:00+05:00";
        request.reportFilters = {
            "Application.Name": []
        };
        request.reportPreferences = reportPreferences;
        request.reportFields = ["Request.RequestID", "Request.TransactionDate", "Request.MerchantID"];

        console.log("\n*************** Create Adhoc Report ********************* ");

        instance.createReport(request, opts, function (error, data, response) {
            if (error) { 
                console.log("\nError in create adhoc report : " + error);
            }
            else if (data) {
                console.log("\nData of create adhoc report : " + JSON.stringify(data));
            }
            console.log("\nResponse of create adhoc report : " + JSON.stringify(response));
            console.log("\nResponse Code of create adhoc report : " + JSON.stringify(response['status']));
            callback(error, data);
        });
    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    createAdhocReport(function () {
        console.log('create adhoc report end.');
    });
}
module.exports.createAdhocReport = createAdhocReport;
