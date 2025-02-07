'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function generate_capture_context_for_click_to_pay_dropin_ui(callback) {
    try {
        var configObject = new configuration();
        var apiClient = new cybersourceRestApi.ApiClient();
        var requestObj = new cybersourceRestApi.GenerateUnifiedCheckoutCaptureContextRequest();

        requestObj.clientVersion = '0.23';

        var targetOrigins = new Array();
        targetOrigins.push("https://yourCheckoutPage.com");
        requestObj.targetOrigins = targetOrigins;


        var allowedCardNetworks = new Array();
        allowedCardNetworks.push("VISA");
        allowedCardNetworks.push("MASTERCARD");
        allowedCardNetworks.push("AMEX");
        allowedCardNetworks.push("CARNET");
        allowedCardNetworks.push("CARTESBANCAIRES");
        allowedCardNetworks.push("CUP");
        allowedCardNetworks.push("DINERSCLUB");
        allowedCardNetworks.push("DISCOVER");
        allowedCardNetworks.push("EFTPOS");
        allowedCardNetworks.push("ELO");
        allowedCardNetworks.push("JCB");
        allowedCardNetworks.push("JCREW");
        allowedCardNetworks.push("MADA");
        allowedCardNetworks.push("MAESTRO");
        allowedCardNetworks.push("MEEZA");
        requestObj.allowedCardNetworks = allowedCardNetworks;


        var allowedPaymentTypes = new Array();
        allowedPaymentTypes.push("CLICKTOPAY");
        requestObj.allowedPaymentTypes = allowedPaymentTypes;

        requestObj.country = 'US';
        requestObj.locale = 'en_US';
        var captureMandate = new cybersourceRestApi.Upv1capturecontextsCaptureMandate();
        captureMandate.billingType = 'FULL';
        captureMandate.requestEmail = true;
        captureMandate.requestPhone = true;
        captureMandate.requestShipping = true;

        var shipToCountries = new Array();
        shipToCountries.push("US");
        shipToCountries.push("GB");
        captureMandate.shipToCountries = shipToCountries;

        captureMandate.showAcceptedNetworkIcons = true;
        requestObj.captureMandate = captureMandate;

        var orderInformation = new cybersourceRestApi.Upv1capturecontextsOrderInformation();
        var orderInformationAmountDetails = new cybersourceRestApi.Upv1capturecontextsOrderInformationAmountDetails();
        orderInformationAmountDetails.totalAmount = '21.00';
        orderInformationAmountDetails.currency = 'USD';
        orderInformation.amountDetails = orderInformationAmountDetails;

        requestObj.orderInformation = orderInformation;


        var instance = new cybersourceRestApi.UnifiedCheckoutCaptureContextApi(configObject, apiClient);

        instance.generateUnifiedCheckoutCaptureContext(requestObj, function (error, data, response) {
            if (error) {
                console.log('\nError : ' + JSON.stringify(error));
            }
            else if (data) {
                console.log('\nData : ' + JSON.stringify(data));
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
    generate_capture_context_for_click_to_pay_dropin_ui(function () {
        console.log('\nGenerateUnifiedCheckoutCaptureContext end.');
    });
}

module.exports.generate_capture_context_for_click_to_pay_dropin_ui = generate_capture_context_for_click_to_pay_dropin_ui;