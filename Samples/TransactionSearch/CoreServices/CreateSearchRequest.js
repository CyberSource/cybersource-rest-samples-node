'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');

/**
 * This is a sample code to call SearchTransactionsApi,
 * create a search request
 */
function createSearchRequest(callback) {
    try {
        var configObject = new Configuration();
        var instance = new CybersourceRestApi.SearchTransactionsApi(configObject);

        var createSearchRequest = new CybersourceRestApi.CreateSearchRequest();
        createSearchRequest.save = "false";
        createSearchRequest.name = "MRN";
        createSearchRequest.timezone = "America/Chicago";
        createSearchRequest.query = "clientReferenceInformation.code:TC50171_3";
        createSearchRequest.offset = 0;
        createSearchRequest.limit = 100;
        createSearchRequest.sort = "id:asc, submitTimeUtc:asc";

        console.log("\n*************** Create Search Request  ********************* ");

        instance.createSearch(createSearchRequest, function (error, data, response) {
            if (error) {
                console.log("\nError in create search request : " + error);
            }
            else if (data) {
                console.log("\nData of create search request : " + JSON.stringify(data));
            }
            console.log("\nResponse of create search request : " + JSON.stringify(response));
            console.log("\nResponse Code of create search request : " + JSON.stringify(response['status']));
            callback(error, data);
        });
    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    createSearchRequest(function () {
        console.log('create search request end.');
    });
}
module.exports.createSearchRequest = createSearchRequest;