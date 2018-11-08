'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');

/**
 * This is a sample code to call PurchaseAndRefundDetailsApi,
 * retrive purchase and refund details
 */
function getPurchaseAndRefundDetails(callback) {
    try {
        var configObject = new Configuration();
        var instance = new CybersourceRestApi.PurchaseAndRefundDetailsApi(configObject);

        var startTime = "2018-05-01T12:00:00-05:00";
        var endTime = "2018-05-30T12:00:00-05:00";
        var opts = [];
        opts['organizationId'] = "testrest";
        opts['paymentSubtype'] = "VI";
        opts['groupName'] = "groupName";
        opts['viewBy'] = "requestDate";
        opts['offset'] = "20";
        opts['limit'] = "2000";

        console.log("****************Get Purchase and Refund Details****************")

        instance.getPurchaseAndRefundDetails(startTime, endTime, opts, function (error, data, response) {
            if (error) {
                console.log("\nError in Get purchase and refund details : " + error);
            }
            else if (data) {
                console.log("\nData of Get purchase and refund details : " + JSON.stringify(data));
            }
            console.log("\nResponse of Get purchase and refund details : " + JSON.stringify(response));
            console.log("\nResponse Code of Get purchase and refund details : " + JSON.stringify(response['status']));
            callback(error, data);
        });
    } catch (error) {
        console.log(error);
    }

};
if (require.main === module) {
    getPurchaseAndRefundDetails(function () {
        console.log('Get purchase and refund details end.');
    });
}
module.exports.getPurchaseAndRefundDetails = getPurchaseAndRefundDetails;