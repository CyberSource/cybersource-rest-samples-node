'use-strict'

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);


function payment_credentials_from_network_token(callback) {

    try {
        // Token_id of your instrument
        const tokenId = '7010000000008573216';
        var configObject = new configuration();
	    var apiClient = new cybersourceRestApi.ApiClient();
        var instance = new cybersourceRestApi.TokenApi(configObject, apiClient);

        var opts = [];

        instance.postTokenPaymentCredentials(tokenId, opts, function(error, data, response) {
            if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of tokenApi postPaymentCredentials : ' + JSON.stringify(response['status']));
			var status = response['status'];
			write_log_audit(status);
			callback(error, data, response);
        })
    }
    catch (error) {
            console.log('\nException on calling the API : ' + error);
        }
}

function write_log_audit(status) {
	var filename = path.basename(__filename).split(".")[0];
	console.log(`[Sample Code Testing] [${filename}] ${status}`);
}

if (require.main === module) {
	payment_credentials_from_network_token(function () {
		console.log('\nPostInstrumentIdentifier for network token end.');
	});
}

module.exports.payment_credentials_from_network_token = payment_credentials_from_network_token;
