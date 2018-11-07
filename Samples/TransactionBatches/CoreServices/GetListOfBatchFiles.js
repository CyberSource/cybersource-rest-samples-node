'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');

/**
 * This is a sample code to call TransactionBatchApi,
 * Returns a list of transaction batches, based on the search criteria provided. 
 */
function getListOfBatchFiles(callback) {

    var configObject = new Configuration();
    var instance = new CybersourceRestApi.TransactionBatchesApi(configObject);

    var startTime = "2018-10-01T20:34:24.000Z";
    var endTime = "2018-10-29T23:27:25.000Z";
    
    console.log("\n*************** Retrieve list of batch file  ********************* ");

    instance.ptsV1TransactionBatchesGet(startTime, endTime, function (error, data, response) {
        if (error) {
            console.log("\nError in retrieve list of batch file : " + error);
        }
        else if (data) {
            console.log("\nData of retrieve list of batch file : " + JSON.stringify(data));
        }
        console.log("\nResponse of retrieve list of batch file : " + JSON.stringify(response));
        console.log("\nResponse Code of retrieve list of batch file : " + JSON.stringify(response['status']));
        callback(error, data);
    });

};
if (require.main === module) {
    getListOfBatchFiles(function () {
        console.log('RetriveL List of Batch files end.');
    });
}
module.exports.getListOfBatchFiles = getListOfBatchFiles;