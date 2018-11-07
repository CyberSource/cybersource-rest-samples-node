'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');

/**
 * This is a sample code to call ReportDefinitionsApi,
 * The report definition name must be used as path parameter
 */
function getReportDefinition(callback) {
    try {
        var configObject = new Configuration();
        var instance = new CybersourceRestApi.ReportDefinitionsApi(configObject);

        var reportDefinitionName = "AcquirerExceptionDetailClass";

        var opts = {};

        console.log("****************Get Reports Definition****************")

        instance.getResourceInfoByReportDefinition(reportDefinitionName, opts, function (error, data, response) {
            if (error) {
                console.log("\nError in get report definition : " + error);
            }
            else if (data) {
                console.log("\nData of get report definition : " + JSON.stringify(data));
            }
            console.log("\nResponse of get report definition : " + JSON.stringify(response));
            console.log("\nResponse Code of get report definition : " + JSON.stringify(response['status']));
            callback(error, data);
        });
    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    getReportDefinition(function () {
        console.log('Get report definition end.');
    });
}
module.exports.getReportDefinition = getReportDefinition;