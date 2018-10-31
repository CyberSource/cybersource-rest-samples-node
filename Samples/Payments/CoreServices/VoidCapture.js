'use strict'

var CybersourceRestApi = require('cybersource-rest-client');
var CapturePayment = require('./CapturePayment');
/**
 * This is a sample code to call VoidApi,
 * Void a Capture
 * Include the capture ID in the POST request to cancel the capture.
 */
function voidACapture(callback) {

    try {
        var request = new CybersourceRestApi.VoidCaptureRequest();
        var apiClient = new CybersourceRestApi.ApiClient();
        var instance = new CybersourceRestApi.VoidApi(apiClient);

        var clientReferenceInformation = new CybersourceRestApi.V2paymentsClientReferenceInformation();
        clientReferenceInformation.code = "test_capture_void";
        request.clientReferenceInformation = clientReferenceInformation;

        CapturePayment.processCaptureAPayment(function (error, data) {
            if (data) {
                var id = data['id'];
                console.log("\n*************** Void Capture ********************* " );
                console.log("\nCapture ID passing to voidCapture : " + id);

                instance.voidCapture(request, id, function (error, data, response) {
                    if (error) {
                        console.log("Error : " + error);
                    }
                    else if (data) {
                        console.log("\nData of Void Capture : " + JSON.stringify(data));
                    }
                    console.log("\nResponse of Void Capture : " + JSON.stringify(response));
                    console.log("\nResponse Code of Void Capture : " + JSON.stringify(response['status']));
                    callback(error,data);
                });
            }
        })
    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    voidACapture(function () {
        console.log('VoidCapture end.');
    });
}
module.exports.voidACapture = voidACapture;