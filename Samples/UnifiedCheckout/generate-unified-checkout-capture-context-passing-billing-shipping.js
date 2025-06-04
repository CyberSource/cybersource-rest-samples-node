'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function generate_unified_checkout_capture_context_passing_billing_shipping(callback) {
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
        allowedPaymentTypes.push("APPLEPAY");
        allowedPaymentTypes.push("CHECK");
        allowedPaymentTypes.push("CLICKTOPAY");
        allowedPaymentTypes.push("GOOGLEPAY");
        allowedPaymentTypes.push("PANENTRY");
        allowedPaymentTypes.push("PAZE");
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

        var orderInformationBillTo = new cybersourceRestApi.Upv1capturecontextsOrderInformationBillTo();
        orderInformationBillTo.address1 = '277 Park Avenue';
        orderInformationBillTo.address2 = '50th Floor';
        orderInformationBillTo.address3 = 'Desk NY-50110';
        orderInformationBillTo.address4 = 'address4';
        orderInformationBillTo.administrativeArea = 'NY';
        orderInformationBillTo.buildingNumber = 'buildingNumber';
        orderInformationBillTo.country = 'US';
        orderInformationBillTo.district = 'district';
        orderInformationBillTo.locality = 'New York';
        orderInformationBillTo.postalCode = '10172';
        var orderInformationBillToCompany = new cybersourceRestApi.Upv1capturecontextsOrderInformationBillToCompany();
        orderInformationBillToCompany.name = 'Visa Inc';
        orderInformationBillToCompany.address1 = '900 Metro Center Blvd';
        orderInformationBillToCompany.address2 = 'address2';
        orderInformationBillToCompany.address3 = 'address3';
        orderInformationBillToCompany.address4 = 'address4';
        orderInformationBillToCompany.administrativeArea = 'CA';
        orderInformationBillToCompany.buildingNumber = '1';
        orderInformationBillToCompany.country = 'US';
        orderInformationBillToCompany.district = 'district';
        orderInformationBillToCompany.locality = 'Foster City';
        orderInformationBillToCompany.postalCode = '94404';
        orderInformationBillTo.company = orderInformationBillToCompany;

        orderInformationBillTo.email = 'john.doe@visa.com';
        orderInformationBillTo.firstName = 'John';
        orderInformationBillTo.lastName = 'Doe';
        orderInformationBillTo.middleName = 'F';
        orderInformationBillTo.nameSuffix = 'Jr';
        orderInformationBillTo.title = 'Mr';
        orderInformationBillTo.phoneNumber = '1234567890';
        orderInformationBillTo.phoneType = 'phoneType';
        orderInformation.billTo = orderInformationBillTo;

        var orderInformationShipTo = new cybersourceRestApi.Upv1capturecontextsOrderInformationShipTo();
        orderInformationShipTo.address1 = 'CyberSource';
        orderInformationShipTo.address2 = 'Victoria House';
        orderInformationShipTo.address3 = '15-17 Gloucester Street';
        orderInformationShipTo.address4 = 'string';
        orderInformationShipTo.administrativeArea = 'CA';
        orderInformationShipTo.buildingNumber = 'string';
        orderInformationShipTo.country = 'GB';
        orderInformationShipTo.district = 'string';
        orderInformationShipTo.locality = 'Belfast';
        orderInformationShipTo.postalCode = 'BT1 4LS';
        orderInformationShipTo.firstName = 'Joe';
        orderInformationShipTo.lastName = 'Soap';
        orderInformation.shipTo = orderInformationShipTo;

        requestObj.orderInformation = orderInformation;

        var completeMandate = new cybersourceRestApi.Upv1capturecontextsCompleteMandate();
        completeMandate.type = 'CAPTURE';
        completeMandate.decisionManager = false;
        requestObj.completeMandate = completeMandate;


        var instance = new cybersourceRestApi.UnifiedCheckoutCaptureContextApi(configObject, apiClient);

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
    generate_unified_checkout_capture_context_passing_billing_shipping(function () {
        console.log('\nGenerateUnifiedCheckoutCaptureContext end.');
    });
}

module.exports.generate_unified_checkout_capture_context_passing_billing_shipping = generate_unified_checkout_capture_context_passing_billing_shipping;