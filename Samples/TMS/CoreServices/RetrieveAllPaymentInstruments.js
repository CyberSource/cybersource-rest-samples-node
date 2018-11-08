'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');
var CreateInstrumentIdentifier = require('./CreateInstrumentIdentifier');

/**
 * This is a sample code to call TMS InstrumentIdentifierApi,
 * instrumentidentifiersTokenIdGet method will retrive all paymentsIdentifier for given InstrumentIdentifier
 */

function retriveAllPaymentInstruments(callback) {
    try {
        var configObject = new Configuration();
        var instance = new CybersourceRestApi.PaymentInstrumentsApi(configObject);

        var profileId = "93B32398-AD51-4CC2-A682-EA3E93614EB1";
        var options = null;

        CreateInstrumentIdentifier.createInstrumentIdentifier(function (error, data) {
            if (data) {
                var tokenId = data['id'];
                console.log("\n*************** Retrieve all payment instruments ********************* ");
                console.log("\nToken ID passing to instrumentidentifiersTokenIdPaymentinstrumentsGet : " + tokenId);

                instance.tmsV1InstrumentidentifiersTokenIdPaymentinstrumentsGet(profileId, tokenId, options, function (error, data, response) {
                    if (error) {
                        console.log("\nError in Retrieve all payment instruments : " + error);
                    }
                    else if (data) {
                        console.log("\nData of Retrieve all payment instruments : " + JSON.stringify(data));
                    }
                    console.log("\nResponse of  Retrieve all payment instruments : " + JSON.stringify(response));
                    console.log("\nResponse Code of Retrieve all payment instruments :" + JSON.stringify(response['status']));
                    callback(error, data);
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    retriveAllPaymentInstruments(function () {
        console.log('Retrieve all payment instruments end');
    });
}
module.exports.retriveAllPaymentInstruments = retriveAllPaymentInstruments;