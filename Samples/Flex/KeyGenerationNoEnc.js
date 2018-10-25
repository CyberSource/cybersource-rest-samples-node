'use strict'

var CybersourceRestApi = require('CyberSource');

function keyGenerationNoEnc() {

    var apiClient = new CybersourceRestApi.ApiClient();
    var instance = new CybersourceRestApi.KeyGenerationApi(apiClient);

    var request = new CybersourceRestApi.GeneratePublicKeyRequest();
    request.encryptionType = "None";

    instance.generatePublicKey(request, function (error, data, response) {
        if (error) {
            console.log("Error : " + error);
            console.log("Error status code : " + error.statusCode);
        }
        else if (data) {
            console.log("Data : " + JSON.stringify(data));
        }
        console.log("Response : " + JSON.stringify(response));
        console.log("Response id : " + response[text.id]);
        
    });

};
if (require.main === module) {
    keyGenerationNoEnc(function () {
        console.log('key generation end.');
    });
}
module.exports.keyGenerationNoEnc = keyGenerationNoEnc;