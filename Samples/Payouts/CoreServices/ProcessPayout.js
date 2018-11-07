'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');

function processPayout() {
    try {
        var configObject = new Configuration();
        var instance = new CybersourceRestApi.ProcessAPayoutApi(configObject);

        var clientReferenceInformation = new CybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
        clientReferenceInformation.code = "33557799";

        var senderInformation = new CybersourceRestApi.Ptsv2payoutsSenderInformation();
        senderInformation.referenceNumber = "1234567890"
        senderInformation.address1 = "900 Metro Center Blvd.900"
        senderInformation.countryCode = "US"
        senderInformation.locality = "San Francisco"
        senderInformation.name = "Company Name"
        senderInformation.administrativeArea = "CA"

        var account = new CybersourceRestApi.Ptsv2payoutsSenderInformationAccount();
        account.fundsSource = "05"
        senderInformation.account = account

        var processingInformation = new CybersourceRestApi.Ptsv2payoutsProcessingInformation();
        processingInformation.commerceIndicator = "internet"
        processingInformation.businessApplicationId = "FD"
        processingInformation.networkRoutingOrder = "ECG"
        processingInformation.reconciliationId = "1087488702VIAQNSPQ"

        var payoutsOptions = new CybersourceRestApi.Ptsv2payoutsProcessingInformationPayoutsOptions();
        payoutsOptions.retrievalReferenceNumber = "123456789012"
        payoutsOptions.acquirerBin = "567890124"

        var orderInformation = new CybersourceRestApi.Ptsv2payoutsOrderInformation();
        var amountDetails = new CybersourceRestApi.Ptsv2payoutsOrderInformationAmountDetails();
        amountDetails.totalAmount = "100.00";
        amountDetails.currency = "USD";

        orderInformation.amountDetails = amountDetails;

        var merchantInformation = new CybersourceRestApi.Ptsv2payoutsMerchantInformation();
        var merchantDescriptor = new CybersourceRestApi.Ptsv2payoutsMerchantInformationMerchantDescriptor();

        merchantDescriptor.country = "US"
        merchantDescriptor.postalCode = "94440"
        merchantDescriptor.locality = "FC"
        merchantDescriptor.name = "Sending Company Name"
        merchantDescriptor.administrativeArea = "CA"

        merchantInformation.merchantDescriptor = merchantDescriptor;

        var paymentInformation = new CybersourceRestApi.Ptsv2paymentsPaymentInformation();
        var paymentInformationCard = new CybersourceRestApi.Ptsv2payoutsPaymentInformationCard();
        paymentInformationCard.expirationYear = "2025"
        paymentInformationCard.number = "4111111111111111"
        paymentInformationCard.expirationMonth = "12"
        paymentInformationCard.type = "001"
        paymentInformation.card = paymentInformationCard

        var recipientInformation = new CybersourceRestApi.Ptsv2payoutsRecipientInformation();
        recipientInformation.firstName = "John"
        recipientInformation.lastName = "Doe"
        recipientInformation.address1 = "Paseo Padre Boulevard"
        recipientInformation.locality = "San Francisco"
        recipientInformation.administrativeArea = "CA"
        recipientInformation.postalCode = "94400"
        recipientInformation.phoneNumber = "6504320556"
        recipientInformation.country = "US"

        var request = new CybersourceRestApi.OctCreatePaymentRequest();
        request.clientReferenceInformation = clientReferenceInformation;
        request.senderInformation = senderInformation;
        request.processingInformation = processingInformation;
        request.orderInformation = orderInformation;
        request.merchantInformation = merchantInformation;
        request.paymentInformation = paymentInformation;
        request.recipientInformation = recipientInformation;
        request.payoutsOptions = payoutsOptions;

        console.log("\n*************** Process Payout ********************* ");
        instance.octCreatePayment(request, function (error, data, response) {
            if (error) {
                console.log("\nError in Process Payout : " + error);
            }
            else if (data) {
                console.log("\nData of Process Payout : " + JSON.stringify(data));
            }
            console.log("\nResponse of  Process Payout : " + JSON.stringify(response));
            console.log("\nResponse Code of Process Payout :" + JSON.stringify(response['status']));
            callback(error, data);
        });
    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    processPayout(function () {
        console.log('Process Payout end.');
    });
}
module.exports.processPayout = processPayout;