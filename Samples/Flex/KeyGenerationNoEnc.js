'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');

function keyGenerationNoEnc(callback) {

    var configObject = new Configuration();
    var instance = new CybersourceRestApi.KeyGenerationApi(configObject);

    var request = new CybersourceRestApi.GeneratePublicKeyRequest();
    request.encryptionType = "None";

    var options = {
        "generatePublicKeyRequest": request
    };
    console.log("\n*************** Key Generation NoEnc ********************* ");

    instance.generatePublicKey(options, function (error, data, response) {
        if (error) {
            console.log("Error : " + error);
            console.log("Error status code : " + error.statusCode);
        }
        else if (data) {
            console.log("Data : " + JSON.stringify(data));
        }
        console.log("Response : " + JSON.stringify(response));
       console.log("Response id : " + response['status']);
       callback(error, data);
    });

};
if (require.main === module) {
    keyGenerationNoEnc(function () {
        console.log('key generation end.');
    });
}
module.exports.keyGenerationNoEnc = keyGenerationNoEnc;