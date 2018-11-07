'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');

/**
 * This is a sample code to call SearchTransactionsApi,
 * retrive transaction by id
 */
function getSearchResults(callback) {
    try {
        var configObject = new Configuration();
        var instance = new CybersourceRestApi.SearchTransactionsApi(configObject);

        var id = "4862be87-e01d-427b-bc59-4783a3bcdb25";

        console.log("\n*************** Get Search Result  ********************* ");

        instance.getSearch(id, function (error, data, response) {
            if (error) {
                console.log("\nError in get search result : " + error);
            }
            else if (data) {
                console.log("\nData of get search result : " + JSON.stringify(data));
            }
            console.log("\nResponse of get search result : " + JSON.stringify(response));
            console.log("\nResponse Code of get search result : " + JSON.stringify(response['status']));
            callback(error, data);
        });
    } catch (error) {
        console.log(error);
    }

};
if (require.main === module) {
    getSearchResults(function () {
        console.log('get transaction search end.');
    });
}
module.exports.getSearchResults = getSearchResults;