'use strict'

var CybersourceRestApi = require('CyberSource');

/**
 * This is a sample code to call TMS PaymentInstrumentApi,
 * paymentinstrumentsTokenIdPatch method will update the paymentInstrument
 */
function updatePaymentInstrument() {
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
        billTo.locality = "Foster City";
        billTo.administrativeArea = "CA";
        billTo.postalCode = "90200";
        billTo.country = "US";
        billTo.email = "john.smith@example.com";
        billTo.phoneNumber = "555123456";

        var instrumentIdentifierCard = new CybersourceRestApi.InstrumentidentifiersCard();
        instrumentIdentifierCard.number = "4111111111111111";
        var instrumentIdentifier = new CybersourceRestApi.Instrumentidentifiers();
        instrumentIdentifier.card = instrumentIdentifierCard;

        var request = new CybersourceRestApi.Body3();
        request.card = card;
        request.billTo = billTo;
        request.instrumentIdentifier = instrumentIdentifier;

        var tokenId = "7020000000000137654";
        var profileId = "93B32398-AD51-4CC2-A682-EA3E93614EB1";

        instance.paymentinstrumentsTokenIdPatch(profileId, tokenId, request, function (error, data, response) {
            if (error) {
                console.log("Error : " + error);
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
    updatePaymentInstrument(function () {
        console.log('Method call complete.');
    });
}
module.exports.updatePaymentInstrument = updatePaymentInstrument;