'use strict'

var CybersourceRestApi = require('CyberSource');
var RefundPayment = require('./RefundPayment');
/**
 * This is a sample code to call VoidApi,
 * Void a Refund
 * Include the refund ID in the POST request to cancel the refund.
 */
function voidARefund(callback) {

    try {
        var apiClient = new CybersourceRestApi.ApiClient();
        var instance = new CybersourceRestApi.VoidApi(apiClient);

        var clientReferenceInformation = new CybersourceRestApi.V2paymentsClientReferenceInformation();
        clientReferenceInformation.code = "test_refund_void";

        var request = new CybersourceRestApi.VoidRefundRequest();
        request.clientReferenceInformation = clientReferenceInformation;

        RefundPayment.refundAPayment(function (error, data) {
            if (data) {
                var id = data['id'];
                console.log("\n*************** Void Refund ********************* ");
                console.log("Refund ID passing to voidRefund : " + id);

                instance.voidRefund(request, id, function (error, data, response) {
                    if (error) {
                        console.log("\nError in void refund: " + error);
                    }
                    else if (data) {
                        console.log("\nData of void refund : " + JSON.stringify(data));
                    }
                    console.log("\nResponse of  void refund  : " + JSON.stringify(response));
                    console.log("\nResponse Code of void refund : " + JSON.stringify(response['status']));
                    callback(error, data);
                });

            }
        });
    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    voidARefund(function () {
        console.log('Void Refund end.');
    });
}
module.exports.voidARefund = voidARefund;