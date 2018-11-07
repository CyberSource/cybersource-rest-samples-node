'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');
var verify = require('../VerifyToken.js');

/**
 * This  is a sample code to call KeyGenerationApi which will return key and
 * TokenizationApi Returns a token representing the supplied card details.
 * 
 * to verify the token with the key generated.
 */
function tokenizeCard(callback) {
    try {
        var keyId = "";
        var publicKey = "";
        var cardInfo = new CybersourceRestApi.Flexv1tokensCardInfo();

        cardInfo.cardNumber = "5555555555554444";
        cardInfo.cardExpirationMonth = "03";
        cardInfo.cardExpirationYear = "2031";
        cardInfo.cardType = "002";

        var configObject = new Configuration();

        var tokenizeInstance = new CybersourceRestApi.FlexTokenApi(configObject);

        var keyInstance = new CybersourceRestApi.KeyGenerationApi(configObject);

        var KeyRequest = new CybersourceRestApi.GeneratePublicKeyRequest();
        KeyRequest.encryptionType = "None";

        var options = {
            "generatePublicKeyRequest": KeyRequest
        };

        keyInstance.generatePublicKey(options, function (error, data, response) {
            if (error) {
                console.log("Error : " + error);
            }
            else if (data) {
                keyId = data['keyId'];
                publicKey = data.der['publicKey'];

                var tokenizeRequest = new CybersourceRestApi.TokenizeRequest();
                tokenizeRequest.keyId = keyId;
                tokenizeRequest.cardInfo = cardInfo;

                var options = { 
                    "tokenizeRequest": tokenizeRequest
                };
                console.log("\n*************** Tokenize Card ********************* ");
                tokenizeInstance.tokenize(options, function (error, data, response) {
                    if (error) {
                        console.log("Error : " + error.stack);
                    }
                    else if (data) {
                        var result = verify(publicKey, data);
                        console.log("Response of tokenization : " + JSON.stringify(response));
                        console.log("Response code of tokenization: " + response['status']);
                        console.log("KeyId: " + keyId);
                        console.log("PublicKey : " + publicKey);
                        console.log("Token Verified : " + result);
                    }
                    callback(error, data);
                });
            }
        });

    } catch (error) {
        console.log(error);
    }

};
if (require.main === module) {
    tokenizeCard(function () {
        console.log('tokenizeCard end.');
    });
}
module.exports.tokenizeCard = tokenizeCard;
