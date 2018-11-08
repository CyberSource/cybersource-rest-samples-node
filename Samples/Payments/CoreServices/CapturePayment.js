'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');
var ProcessPayment = require('./ProcessPayment');
/**
 * This is a sample code to call CaptureApi,
 * call capturePayment method to process capture a payment
 */
function processCaptureAPayment(callback) {
    try {

        var request = new CybersourceRestApi.CapturePaymentRequest();
        var configObject = new Configuration();
        var instance = new CybersourceRestApi.CaptureApi(configObject);

        var clientReferenceInformation = new CybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
        clientReferenceInformation.code = "test_capture";
        request.clientReferenceInformation = clientReferenceInformation;

        var orderInformation = new CybersourceRestApi.Ptsv2paymentsOrderInformation();
        var amountDetails = new CybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
        amountDetails.totalAmount = "102.21";
        amountDetails.currency = "USD";
        orderInformation.amountDetails = amountDetails;
        request.orderInformation = orderInformation;

        var enableCapture = false;

        ProcessPayment.processPayment(function (error, data) {
            if (data) {
                var id = data['id'];
                console.log("\n*************** Capture Payment ********************* ");
                console.log("Payment ID passing to capturePayment : " + id);

                instance.capturePayment(request, id, function (error, data, response) {
                    if (error) {
                        console.log("\nError in capture payment: " + error);
                    }
                    else if (data) {
                        console.log("\nData of Capture Payment : " + JSON.stringify(data));
                    }
                    console.log("\nResponse of  Capture Payment  : " + JSON.stringify(response));
                    console.log("\nResponse Code of Capture a payment : " + JSON.stringify(response['status']));
                    callback(error, data);
                });

            }
        }, enableCapture);
    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    processCaptureAPayment(function () {
        console.log('CapturePayment end.');
    });
}
module.exports.processCaptureAPayment = processCaptureAPayment;