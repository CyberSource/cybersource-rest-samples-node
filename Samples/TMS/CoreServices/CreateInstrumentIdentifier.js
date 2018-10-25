'use strict'

var CybersourceRestApi = require('CyberSource');

/**
 * This is a sample code to call TMS InstrumentIdentifierApi,
 * instrumentidentifiersPost method will create a new InstrumentIdentifier
 */

function createInstrumentIdentifier(callback) {
    try {
        var apiClient = new CybersourceRestApi.ApiClient();
        var instance = new CybersourceRestApi.InstrumentIdentifierApi(apiClient);

        var card = new CybersourceRestApi.PaymentinstrumentsCard();
        card.number = "1234567890117654";


        var merchantInitiatedTransaction = new CybersourceRestApi.InstrumentidentifiersProcessingInformationAuthorizationOptionsInitiatorMerchantInitiatedTransaction();
        var previousTransactionId = "123456789012345";
        merchantInitiatedTransaction.previousTransactionId = previousTransactionId;

        var initiator = new CybersourceRestApi.InstrumentidentifiersProcessingInformationAuthorizationOptionsInitiator();
        initiator.merchantInitiatedTransaction = merchantInitiatedTransaction;

        var authorizationOptions = new CybersourceRestApi.InstrumentidentifiersProcessingInformationAuthorizationOptions();
        authorizationOptions.initiator = initiator;

        var processingInformation = new CybersourceRestApi.PaymentinstrumentsProcessingInformation();
        processingInformation.authorizationOptions = authorizationOptions;

        var body = new CybersourceRestApi.Body();
        body.card = card;
        body.processingInformation = processingInformation;

        var options = {
            "body": body
        };

        var profileId = "93B32398-AD51-4CC2-A682-EA3E93614EB1";
        
        console.log("\n*************** Create Instrument Identifier ********************* ");
        instance.instrumentidentifiersPost(profileId, options, function (error, data, response) {
            if (error) {
                console.log("\nError in create instrument identifier : " + error);
            }
            else if (data) {
                console.log("\nData of Create instrument identifier : " + JSON.stringify(data));
            }
            console.log("\nResponse of  Create instrument identifier : " + JSON.stringify(response));
            console.log("\nResponse Code of Create instrument identifier :" + JSON.stringify(response['status']));
            callback(error,data);
        });
        
    } catch (error) {
        console.log(error);
    }
};

if (require.main === module) {
    createInstrumentIdentifier(function () {
        console.log('Create instrument identifier end.');
    });
}
module.exports.createInstrumentIdentifier = createInstrumentIdentifier;