'use strict'

var CybersourceRestApi = require('cybersource-rest-client');

function updateInstrumentIdentifier() {
    try {
        var apiClient = new CybersourceRestApi.ApiClient();
        var instance = new CybersourceRestApi.InstrumentIdentifierApi(apiClient);

        var merchantInitiatedTransaction = new CybersourceRestApi.InstrumentidentifiersProcessingInformationAuthorizationOptionsInitiatorMerchantInitiatedTransaction();
        var previousTransactionId = "123456789012345";
        merchantInitiatedTransaction.previousTransactionId = previousTransactionId;

        var initiator = new CybersourceRestApi.InstrumentidentifiersProcessingInformationAuthorizationOptionsInitiator();
        initiator.merchantInitiatedTransaction = merchantInitiatedTransaction;

        var authorizationOptions = new CybersourceRestApi.InstrumentidentifiersProcessingInformationAuthorizationOptions();
        authorizationOptions.initiator = initiator;

        var processingInformation = new CybersourceRestApi.PaymentinstrumentsProcessingInformation();
        processingInformation.authorizationOptions = authorizationOptions;

        var body = new CybersourceRestApi.Body1();
        body.processingInformation = processingInformation;

        var options = {
            "body": body
        };

        var tokenId = "7020000000000137654";
        var profileId = "93B32398-AD51-4CC2-A682-EA3E93614EB1";


        instance.instrumentidentifiersTokenIdPatch(profileId, tokenId, options, function (error, data, response) {
            if (error) {
                console.log("Error : " + error);
                console.log("Error : " + error.stack);
                console.log("Error status code : " + error.statusCode);
            }
            else if (data) {
                console.log("Data : " + JSON.stringify(data));
            }
            console.log("Response : " + JSON.stringify(response));
            console.log("Response id : " + response[text.id]);

        });
    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    updateInstrumentIdentifier(function () {
        console.log('getMethod call complete.');
    });
}
module.exports.updateInstrumentIdentifier = updateInstrumentIdentifier;