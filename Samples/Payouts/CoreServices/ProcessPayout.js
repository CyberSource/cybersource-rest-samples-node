'use strict'

var CybersourceRestApi = require('CyberSource');

function processPayout() {
    try {
        var apiClient = new CybersourceRestApi.ApiClient();
        var instance = new CybersourceRestApi.DefaultApi(apiClient);

        var clientReferenceInformation = new CybersourceRestApi.V2paymentsClientReferenceInformation();
        clientReferenceInformation.code = "33557799";

        var senderInformation = new CybersourceRestApi.V2payoutsSenderInformation();
        senderInformation.referenceNumber = "1234567890"
        senderInformation.address1 = "900 Metro Center Blvd.900"
        senderInformation.countryCode = "US"
        senderInformation.locality = "San Francisco"
        senderInformation.name = "Company Name"
        senderInformation.administrativeArea = "CA"

        var account = new CybersourceRestApi.V2payoutsSenderInformationAccount();
        account.fundsSource = "05"
        senderInformation.account = account

        var processingInformation = new CybersourceRestApi.V2payoutsProcessingInformation();
        processingInformation.commerceIndicator = "internet"
        processingInformation.businessApplicationId = "FD"
        processingInformation.networkRoutingOrder = "ECG"
        processingInformation.reconciliationId = "1087488702VIAQNSPQ"

        var payoutsOptions = new CybersourceRestApi.V2payoutsProcessingInformationPayoutsOptions();
        payoutsOptions.retrievalReferenceNumber = "123456789012"
        payoutsOptions.acquirerBin = "567890124"

        var orderInformation = new CybersourceRestApi.V2payoutsOrderInformation();
        var amountDetails = new CybersourceRestApi.V2payoutsOrderInformationAmountDetails();
        amountDetails.totalAmount = "100.00";
        amountDetails.currency = "USD";

        orderInformation.amountDetails = amountDetails;

        var merchantInformation = new CybersourceRestApi.V2payoutsMerchantInformation();
        var merchantDescriptor = new CybersourceRestApi.V2payoutsMerchantInformationMerchantDescriptor();

        merchantDescriptor.country = "US"
        merchantDescriptor.postalCode = "94440"
        merchantDescriptor.locality = "FC"
        merchantDescriptor.name = "Sending Company Name"
        merchantDescriptor.administrativeArea = "CA"

        merchantInformation.merchantDescriptor = merchantDescriptor;

        var paymentInformation = new CybersourceRestApi.V2paymentsPaymentInformation();
        var paymentInformationCard = new CybersourceRestApi.V2payoutsPaymentInformationCard();
        paymentInformationCard.expirationYear = "2025"
        paymentInformationCard.number = "4111111111111111"
        paymentInformationCard.expirationMonth = "12"
        paymentInformationCard.type = "001"
        paymentInformation.card = paymentInformationCard

        var recipientInformation = new CybersourceRestApi.V2payoutsRecipientInformation();
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


        instance.octCreatePayment(request, function (error, data, response) {
            if (error) {
                console.log("Error : " + error);
            }
            else if (data) {
                console.log("Data : " + JSON.stringify(data));
            }
            console.log("Response : " + JSON.stringify(response));

        });
    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    processPayout(function () {
        console.log('getMethod call complete.');
    });
}
module.exports.samprocessPayoutpleCode = processPayout;