'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function generate_capture_context_accept_check(callback) {
    try {
        var configObject = new configuration();
        var apiClient = new cybersourceRestApi.ApiClient();
        var requestObj = new cybersourceRestApi.GenerateCaptureContextRequest();

        requestObj.clientVersion = 'v2';

        var targetOrigins = new Array();
        targetOrigins.push("https://www.test.com");
        requestObj.targetOrigins = targetOrigins;

        var allowedPaymentTypes = new Array();
        allowedPaymentTypes.push("CHECK");
        requestObj.allowedPaymentTypes = allowedPaymentTypes;


        var instance = new cybersourceRestApi.MicroformIntegrationApi(configObject, apiClient);

        instance.generateCaptureContext(requestObj, function (error, data, response) {
            if (error) {
                console.log('\nError : ' + JSON.stringify(error));
            }
            else if (data) {
                console.log('\nData : ' + JSON.stringify(data));
                cybersourceRestApi.CaptureContextParsingUtility.parseCaptureContextResponse(data, apiClient.merchantConfig, true, function (err, result) {
                    if (err) {
                        console.log('\nError in Capture Context Parsing : ' + JSON.stringify(err));
                    } else {
                        console.log('\nParsed Capture Context : ' + JSON.stringify(result));
                    }
                });
            }

            console.log('\nResponse : ' + JSON.stringify(response));
            console.log('\nResponse Code of Process a Payment : ' + JSON.stringify(response['status']));
            callback(error, data, response);
        });
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
    generate_capture_context_accept_check(function () {
        console.log('\nGenerateCaptureContext end.');
    });
}

module.exports.generate_capture_context_accept_check = generate_capture_context_accept_check;