'use strict'

var CybersourceRestApi = require('CyberSource');

/**
 * This is a sample code to call ReversalApi,
 * call authReversal method
 */
function processAuthorizationReversal(callback) {
    try {
        var apiClient = new CybersourceRestApi.ApiClient();
        var instance = new CybersourceRestApi.ReversalApi(apiClient);

        var clientReferenceInformation = new CybersourceRestApi.V2paymentsClientReferenceInformation();
        clientReferenceInformation.code =  "test_reversal";

        var reversalInformation = new CybersourceRestApi.V2paymentsidreversalsReversalInformation();
        var reversalInformationAmountDetails = new CybersourceRestApi.V2paymentsidreversalsReversalInformationAmountDetails();
        reversalInformationAmountDetails.totalAmount = "102.21";
        reversalInformation.reason = "testing";
        reversalInformation.amountDetails = reversalInformationAmountDetails;

        var request = new CybersourceRestApi.AuthReversalRequest();
        request.clientReferenceInformation = clientReferenceInformation;
        request.reversalInformation = reversalInformation;

        var id = "5335624925716231904107";

        instance.authReversal(id, request, function (error, data, response) {
            if (error) {
                console.log("Error : " + error);
            }
            else if (data) {
                console.log("Data : " + JSON.stringify(data));
            }
            console.log("Response : " + JSON.stringify(response));
            console.log("\nResponse Code of ProcessAuthReversal : " + JSON.stringify(response['status']));
            callback(error,data);
        });
    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    processAuthorizationReversal(function () {
        console.log('Process Authorization Reversal end');
    });
}
module.exports.processAuthorizationReversal = processAuthorizationReversal;