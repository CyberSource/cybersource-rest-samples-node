'use strict'

var CybersourceRestApi = require('CyberSource');
var ProcessPayment = require('./ProcessPayment');

/**
 * This is a sample code to call RefundApi,
 * Include the payment ID in the POST request to refund the payment amount. 
 */
function refundAPayment(callback) {
    try {
        var apiClient = new CybersourceRestApi.ApiClient();
        var instance = new CybersourceRestApi.RefundApi(apiClient);

        var clientReferenceInformation = new CybersourceRestApi.V2paymentsClientReferenceInformation();
        clientReferenceInformation.code = "test_refund_payment";

        var orderInformation = new CybersourceRestApi.V2paymentsidrefundsOrderInformation();
        var amountDetails = new CybersourceRestApi.V2paymentsOrderInformationAmountDetails();
        amountDetails.totalAmount = "102.21";
        amountDetails.currency = "USD";
        orderInformation.amountDetails = amountDetails;

        var request = new CybersourceRestApi.RefundPaymentRequest();
        request.clientReferenceInformation = clientReferenceInformation;
        request.orderInformation = orderInformation;

        ProcessPayment.processAPayment(function (error, data) {
            if (data) {
                var id = data['id'];
                console.log("\n*************** Refund Payment ********************* ");
                console.log("Payment ID passing to refundPayment : " + id);

                instance.refundPayment(request, id, function (error, data, response) {
                    if (error) {
                        console.log("\nError in Refund payment: " + error);
                    }
                    else if (data) {
                        console.log("\nData of Refund Payment : " + JSON.stringify(data));
                    }
                    console.log("\nResponse of  Refund Payment  : " + JSON.stringify(response));
                    console.log("\nResponse Code of Refund Payment : " + JSON.stringify(response['status']));
                    callback(error, data);
                });

            }
        });
    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    refundAPayment(function () {
        console.log('Refund Payment end.');
    });
}
module.exports.refundAPayment = refundAPayment;