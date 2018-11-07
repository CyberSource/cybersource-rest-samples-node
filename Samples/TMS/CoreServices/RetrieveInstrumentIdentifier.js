'use strict'
/**
 * This is a sample code to call TMS InstrumentIdentifierApi,
 * instrumentidentifiersTokenIdGet method will retrive the token details
 */
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');
var CreateInstrumentIdentifier = require('./CreateInstrumentIdentifier');

function retriveAInstrumentIdentifier(callback) {
    try {
        var configObject = new Configuration();
        var instance = new CybersourceRestApi.InstrumentIdentifierApi(configObject);

        var profileId = "93B32398-AD51-4CC2-A682-EA3E93614EB1";

        CreateInstrumentIdentifier.createInstrumentIdentifier(function (error, data) {
            if (data) {
                var tokenId = data['id'];
                console.log("\n*************** Retrieve instrument identifier ********************* ");
                console.log("\nToken ID passing to instrumentidentifiersTokenIdGet : " + tokenId);

                instance.tmsV1InstrumentidentifiersTokenIdGet(profileId, tokenId, function (error, data, response) {
                    if (error) {
                        console.log("\nError in Retrieve instrument identifier : " + error);
                    }
                    else if (data) {
                        console.log("\nData of Retrieve instrument identifier : " + JSON.stringify(data));
                    }
                    console.log("\nResponse of  Retrieve instrument identifier : " + JSON.stringify(response));
                    console.log("\nResponse Code of Retrieve instrument identifier :" + JSON.stringify(response['status']));
                    callback(error, data);
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    retriveAInstrumentIdentifier(function () {
        console.log('Retrieve InstrumentIdentifer end.');
    });
}
module.exports.retriveAInstrumentIdentifier = retriveAInstrumentIdentifier;