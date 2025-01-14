'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
const { faker } = require('@faker-js/faker');

function getConfiguration() {

    var configObj = {
        'authenticationType': 'mutual_auth',
        'runEnvironment'    : 'api-matest.cybersource.com',
        'enableClientCert'  : false,
        'clientCertDir'     : 'Resource',
        'sslClientCert'     : '',
        'privateKey'        : '',
        'clientId'          : '',
        'clientSecret'      : '',
        'logConfiguration'  : {
            'enableLog': true,
            'logFileName': 'cybs',
            'logDirectory': 'log',
            'logFileMaxSize': '5242880',
            'enableMasking': true
        }
    };
    return configObj;
}

function write_log_audit(status) {
	var filename = path.basename(__filename).split(".")[0];
	console.log(`[Sample Code Testing] [${filename}] ${status}`);
}

function simple_authorization_internet(callback, accessToken, refreshToken) {
    try {
        var configObject = getConfiguration();
        var apiClient = new cybersourceRestApi.ApiClient();
        var requestObj = new cybersourceRestApi.CreatePaymentRequest();

        var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
        var dt = new Date();
        var expYear = dt.getFullYear()+4;
        var fName = faker.person.firstName();
        var lName = faker.person.lastName();
        clientReferenceInformation.code = faker.string.uuid();
        requestObj.clientReferenceInformation = clientReferenceInformation;

        var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
        processingInformation.capture = false;
        processingInformation.capture = false;

        requestObj.processingInformation = processingInformation;

        var paymentInformation = new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
        var paymentInformationCard = new cybersourceRestApi.Ptsv2paymentsPaymentInformationCard();
        paymentInformationCard.number = faker.finance.creditCardNumber({issuer: '414720#########L'});
        paymentInformationCard.expirationMonth = '12';
        paymentInformationCard.expirationYear = expYear;
        paymentInformation.card = paymentInformationCard;

        requestObj.paymentInformation = paymentInformation;

        var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
        var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
        orderInformationAmountDetails.totalAmount = faker.commerce.price({ min: 10, max: 500 });
        orderInformationAmountDetails.currency = 'USD';
        orderInformation.amountDetails = orderInformationAmountDetails;

        var orderInformationBillTo = new cybersourceRestApi.Ptsv2paymentsOrderInformationBillTo();
        orderInformationBillTo.firstName = fName;
        orderInformationBillTo.lastName = lName;
        orderInformationBillTo.address1 = faker.location.streetAddress();
        orderInformationBillTo.locality = faker.location.city();
        orderInformationBillTo.administrativeArea = faker.location.state();
        orderInformationBillTo.postalCode = faker.location.zipCode();
        orderInformationBillTo.country = 'US';
        orderInformationBillTo.email = faker.internet.email({firstName:fName,lastName:lName});
        orderInformationBillTo.phoneNumber = faker.phone.number();
        orderInformation.billTo = orderInformationBillTo;

        requestObj.orderInformation = orderInformation;

        configObject['accessToken'] = accessToken
        configObject['refreshToken'] = refreshToken
        configObject['authenticationType'] = 'oauth'
        var instance = new cybersourceRestApi.PaymentsApi(configObject, apiClient);

        instance.createPayment(requestObj, function (error, data, response) {
            if (error) {
                console.log('\nError : ' + JSON.stringify(error));
            }
            else if (data) {
                console.log('\nData : ' + JSON.stringify(data));
            }

            console.log('\nResponse : ' + JSON.stringify(response));
            console.log('\nResponse Code of Process a Payment : ' + JSON.stringify(response['status']));
            var status = response['status'];
			write_log_audit(status);
			callback(error, data, response);
        });
    }
    catch (error) {
        console.log('\nException on calling the API : ' + error);
    }
}

function postAccessTokenFromAuthCode(callback, code, grantType)
{
    try {
        var configObject = getConfiguration();
        var apiClient = new cybersourceRestApi.ApiClient();
        var requestObj = new cybersourceRestApi.CreateAccessTokenRequest();
        requestObj.client_id = configObject['clientId'];
        requestObj.client_secret = configObject['clientSecret'];
        requestObj.grant_type = grantType;
        requestObj.code = code;

        var instance = new cybersourceRestApi.OAuthApi(configObject, apiClient);

        var opts = {};

        instance.createAccessToken(requestObj, opts, function (error, data, response) {
            if (error) {
                console.log('\nError : ' + JSON.stringify(error));
            }
            else if (data) {
                console.log('\nData : ' + JSON.stringify(data));
            }

            var status = JSON.stringify(response['status']);
            console.log('\nResponse : ' + JSON.stringify(response));
            console.log('\nResponse Code of Creating Access Token using AuthCode : ' + status);

            if(status === "200")
            {
                var accessToken = data['access_token'];
                var refreshToken = data['refresh_token'];
                simple_authorization_internet(callback, accessToken, refreshToken);
            }
        });
    }
    catch (error) {
        console.log('\nException on calling the API : ' + error);
    }
}

function postAccessTokenFromRefreshToken(callback, grantType, refreshToken)
{
    try {
        var configObject = getConfiguration();
        var apiClient = new cybersourceRestApi.ApiClient();
        var requestObj = new cybersourceRestApi.CreateAccessTokenRequest();
        requestObj.client_id = configObject['clientId'];
        requestObj.client_secret = configObject['clientSecret'];
        requestObj.grant_type = grantType;
        requestObj.refresh_token = refreshToken;

        var instance = new cybersourceRestApi.OAuthApi(configObject, apiClient);

        var opts = {};

        instance.createAccessToken(requestObj, opts, function (error, data, response) {
            if (error) {
                console.log('\nError : ' + JSON.stringify(error));
            }
            else if (data) {
                console.log('\nData : ' + JSON.stringify(data));
            }

            var status = JSON.stringify(response['status']);
            console.log('\nResponse : ' + JSON.stringify(response));
            console.log('\nResponse Code of Creating Access Token using Refresh Token : ' + status);

            if(status === "200")
            {
                var accessToken = data['access_token'];
                var refreshToken = data['refresh_token'];
                simple_authorization_internet(callback, accessToken, refreshToken);
            }
        });
    }
    catch (error) {
        console.log('\nException on calling the API : ' + error);
    }
}

function standaloneOAuth(callback) {
    var grantType;
    var result;
    var code;
    var refreshToken;
    var createUsingAuthCode = true;
    if(createUsingAuthCode)
    {
        code = '';
        grantType = 'authorization_code';
        result = postAccessTokenFromAuthCode(callback, code, grantType);
    }
    else
    {
        refreshToken = ''
        grantType = 'refresh_token';
        result = postAccessTokenFromRefreshToken(callback, grantType, refreshToken);
    }
}


if (require.main === module) {
    standaloneOAuth(function () {
        console.log('\nStandAlone OAuth end.');
    }, false);
}
module.exports.standaloneOAuth = standaloneOAuth;