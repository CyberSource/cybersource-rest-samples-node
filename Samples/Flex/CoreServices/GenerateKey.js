'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');

function generateKey(callback) {
    try {
        var configObject = new Configuration();
        var instance = new CybersourceRestApi.KeyGenerationApi(configObject);

        var request = new CybersourceRestApi.GeneratePublicKeyRequest();
        request.encryptionType = "RsaOaep256";

        var options = {
            "generatePublicKeyRequest": request
        };

        console.log("\n*************** Generate Key ********************* ");
        
        instance.generatePublicKey(options, function (error, data, response) {
            if (error) {
                console.log("Error : " + error);
                console.log("Error status code : " + error.statusCode);
            }
            else if (data) {
                console.log("Data : " + JSON.stringify(data));
            }
            console.log("Response : " + JSON.stringify(response));
            console.log("Response Code Of GenerateKey : " + response['status']);
            callback(error, data);
        });
    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    generateKey(function () {
        console.log('generateKey end.');
    });
}
module.exports.generateKey = generateKey;
