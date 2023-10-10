'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var paymentCredentialsFromNetworkToken = require('./payment-credentials-from-network-token');

function network_token(callback) {
    var configObject = new configuration();
    var merchantConfig = new cybersourceRestApi.MerchantConfig(configObject);

    //Step-I
    paymentCredentialsFromNetworkToken.payment_credentials_from_network_token(function(error, data, response) {
        const encodedRespone = data;
        //Step-II
        cybersourceRestApi.JWEUtility.decryptJWEResponse(encodedRespone, merchantConfig)
            .then(decodedResponse => {
                console.log("Decoded Response");
                console.log(decodedResponse);
                callback();
            },
            error => {
                console.log(error);
            }
        )   
    });
}

if (require.main == module) {
    network_token(function() {
        console.log("NetworkToken Sample end.\n")
    });
}

module.exports.network_token = network_token;
