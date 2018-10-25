'use strict'

var CybersourceRestApi = require('CyberSource');

/**
 * This is a sample code to call TMS InstrumentIdentifierApi,
 * instrumentidentifiersTokenIdGet method will retrive all paymentsIdentifier for given InstrumentIdentifier
 */

function retriveAllPaymentInstruments() {
    try {
        var apiClient = new CybersourceRestApi.ApiClient();
        var instance = new CybersourceRestApi.InstrumentIdentifierApi(apiClient);

        var profileId = "93B32398-AD51-4CC2-A682-EA3E93614EB1";
        var tokenId = "7020000000000137654";
        var options = null;

        instance.instrumentidentifiersTokenIdPaymentinstrumentsGet(profileId, tokenId, options, function (error, data, response) {
            if (error) {
                console.log("Error : " + error.stack);
                console.log("Error status code : " + error.statusCode);
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
    retriveAllPaymentInstruments(function () {
        console.log('Method call complete.');
    });
}
module.exports.retriveAllPaymentInstruments = retriveAllPaymentInstruments;