'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');

/**
 * This is a sample code to call ReportsApi,
 * retrive  available reports.
 */
function RetrieveAvailableReports(callback) {
    try {
        var configObject = new Configuration();
        var instance = new CybersourceRestApi.ReportsApi(configObject);

        var startTime = new Date("2018-10-01T00:00:00.0Z").toISOString();
        var endTime = new Date("2018-10-30T23:59:59.0Z").toISOString();
        var timeQueryType = "executedTime";
        var opts = [];
        opts['organizationId'] = "testrest";

        console.log("****************Get Available Reports****************")

        instance.searchReports(startTime, endTime, timeQueryType, opts, function (error, data, response) {
            if (error) {
                console.log("\nError in get available reports : " + error);
            }
            else if (data) {
                console.log("\nData of get available reports : " + JSON.stringify(data));
            }
            console.log("\nResponse of get available reports : " + JSON.stringify(response));
            console.log("\nResponse Code of get available reports : " + JSON.stringify(response['status']));
            callback(error, data);
        });
    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    RetrieveAvailableReports(function () {
        console.log('Retrieve Available Reports end.');
    });
}
module.exports.RetrieveAvailableReports = RetrieveAvailableReports;