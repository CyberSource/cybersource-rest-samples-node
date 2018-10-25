'use strict'

var CybersourceRestApi = require('CyberSource');

/**
 * This is a sample code to call TMS PaymentInstrumentApi,
 * paymentinstrumentsPost method will create a new PaymentInstruments
 */

function createPaymentInstrument(callback) {
    try {
        var apiClient = new CybersourceRestApi.ApiClient();
        var instance = new CybersourceRestApi.PaymentInstrumentApi(apiClient);

        var card = new CybersourceRestApi.PaymentinstrumentsCard();
        card.expirationMonth = "09";
        card.expirationYear = "2022";
        card.type = "visa";

        var billTo = new CybersourceRestApi.PaymentinstrumentsBillTo();
        billTo.firstName = "John";
        billTo.lastName = "Deo";
        billTo.company = "CyberSource";
        billTo.address1 = "12 Main Street";
        billTo.address2 = "20 My Street";
        billTo.locality = "San Francisco";
        billTo.administrativeArea = "CA";
        billTo.postalCode = "90200";
        billTo.country = "US";
        billTo.email = "john.smith@example.com";
        billTo.phoneNumber = "555123456";

        var instrumentIdentifierCard = new CybersourceRestApi.InstrumentidentifiersCard()
        instrumentIdentifierCard.number = "4111111111111111";

        var instrumentIdentifier = new CybersourceRestApi.PaymentinstrumentsInstrumentIdentifier();
        instrumentIdentifier.card = instrumentIdentifierCard;

        var body = new CybersourceRestApi.Body();
        body.card = card;
        body.billTo = billTo;
        body.instrumentIdentifier = instrumentIdentifier;

        var profileId = "93B32398-AD51-4CC2-A682-EA3E93614EB1";

        console.log("\n*************** Create PaymentInstrument ********************* ");

        instance.paymentinstrumentsPost(profileId, body, function (error, data, response) {
            if (error) {
                console.log("\nError in create PaymentInstrument : " + error);
            }
            else if (data) {
                console.log("\nData of Create PaymentInstrument : " + JSON.stringify(data));
            }
            console.log("\nResponse of  Create PaymentInstrument : " + JSON.stringify(response));
            console.log("\nResponse Code of Create PaymentInstrument :" + JSON.stringify(response['status']));
            callback(error, data);
        });

    } catch (error) {
        console.log(error);
    }
};

if (require.main === module) {
    createPaymentInstrument(function () {
        console.log('Create PaymentInstrument end.');
    });
}
module.exports.createPaymentInstrument = createPaymentInstrument;