'use strict'

var CybersourceRestApi = require('CyberSource');

function sampleCode() {
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
            console.log("Response id : " + response[text.id]);

        });
    } catch (error) {
        console.log(error);
    }
};
if (require.main === module) {
    sampleCode(function () {
        console.log('Method call complete.');
    });
}
module.exports.sampleCode = sampleCode;