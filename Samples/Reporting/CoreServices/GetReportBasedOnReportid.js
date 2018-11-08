'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');

/**
 * This is a sample code to call ReportsApi,
 * retrive report by report ID
 */
function getReportBasedOnReportid(callback) {
    try {
        var configObject = new Configuration();
        var instance = new CybersourceRestApi.ReportsApi(configObject);

        var reportId = "79642c43-2368-0cd5-e053-a2588e0a7b3c";
        var opts = [];
        opts['organizationId'] = "testrest";

        console.log("****************Get Reports based on ReportID****************")

        instance.getReportByReportId(reportId, opts, function (error, data, response) {
            if (error) {
                console.log("\nError in get reports based on reportID : " + error);
            }
            else if (data) {
                console.log("\nData of get reports based on reportID : " + JSON.stringify(data));
            }
            console.log("\nResponse of get reports based on reportID : " + JSON.stringify(response));
            console.log("\nResponse Code of get reports based on reportID : " + JSON.stringify(response['status']));
            callback(error, data);
        });
    } catch (error) {
        console.log(error);
    }

};
if (require.main === module) {
    getReportBasedOnReportid(function () {
        console.log('get report based on report id end.');
    });
}
module.exports.getReportBasedOnReportid = getReportBasedOnReportid;