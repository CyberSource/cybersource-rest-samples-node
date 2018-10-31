'use strict'

var CybersourceRestApi = require('cybersource-rest-client');

function generateKey() {
    try {
        var apiClient = new CybersourceRestApi.ApiClient();
        var instance = new CybersourceRestApi.KeyGenerationApi(apiClient);

        var request = new CybersourceRestApi.GeneratePublicKeyRequest();
        request.encryptionType = "RsaOaep256";

        instance.generatePublicKey(request, function (error, data, response) {
            if (error) {
                console.log("Error : " + error);
                console.log("Error status code : " + error.statusCode);
            }
            else if (data) {
                console.log("Data : " + JSON.stringify(data));
            }
            console.log("Response : " + JSON.stringify(response));
            console.log("Response Code Of GenerateKey : " + response['status']);

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
