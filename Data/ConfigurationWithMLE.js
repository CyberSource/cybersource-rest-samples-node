'use strict';

/*
* Merchant configuration properties are taken from Configuration module
*/

// common parameters
const AuthenticationType = 'JWT'; //for MLE feature auth type should be JWT
const RunEnvironment = 'apitest.cybersource.com';
const MerchantId = 'testrest';

// http_signature parameters
const MerchantKeyId = '';
const MerchantSecretKey = '';

// jwt parameters
const KeysDirectory = 'Resource';
const KeyFileName = 'testrest';
const KeyAlias = 'testrest';
const KeyPass = 'testrest';

//meta key parameters
const UseMetaKey = false;
const PortfolioID = '';

// logging parameters
const EnableLog = true;
const LogFileName = 'cybs';
const LogDirectory = 'log';
const LogfileMaxSize = '5242880'; //10 MB In Bytes
const EnableMasking = true;

/*
PEM Key file path for decoding JWE Response Enter the folder path where the .pem file is located.
It is optional property, require adding only during JWE decryption.
*/
const PemFileDirectory = 'Resource/NetworkTokenCert.pem';

// Constructor for MLEConfiguration1
function MLEConfiguration1() {

    var configObj = {
        'authenticationType': AuthenticationType,
        'runEnvironment': RunEnvironment,

        'merchantID': MerchantId,
        'merchantKeyId': MerchantKeyId,
        'merchantsecretKey': MerchantSecretKey,

        'keyAlias': KeyAlias,
        'keyPass': KeyPass,
        'keyFileName': KeyFileName,
        'keysDirectory': KeysDirectory,

        'useMetaKey': UseMetaKey,
        'portfolioID': PortfolioID,
        'pemFileDirectory': PemFileDirectory,

        'logConfiguration': {
            'enableLog': EnableLog,
            'logFileName': LogFileName,
            'logDirectory': LogDirectory,
            'logFileMaxSize': LogfileMaxSize,
            'loggingLevel': 'debug',
            'enableMasking': EnableMasking
        },
        'useMLEGlobally': true, //globally MLE will be enabled for all the MLE supported APIs by Cybs in SDK
        'mleKeyAlias':"CyberSource_SJC_US" //this is optional paramter, not required to set the parameter if custom value is not required for MLE key alias. Default value is "CyberSource_SJC_US".
    }; 
    return configObj;

}

// Constructor for MLEConfiguration2
function MLEConfiguration2() {

    var configObj = {
        'authenticationType': AuthenticationType,
        'runEnvironment': RunEnvironment,

        'merchantID': MerchantId,
        'merchantKeyId': MerchantKeyId,
        'merchantsecretKey': MerchantSecretKey,

        'keyAlias': KeyAlias,
        'keyPass': KeyPass,
        'keyFileName': KeyFileName,
        'keysDirectory': KeysDirectory,

        'useMetaKey': UseMetaKey,
        'portfolioID': PortfolioID,
        'pemFileDirectory': PemFileDirectory,

        'logConfiguration': {
            'enableLog': EnableLog,
            'logFileName': LogFileName,
            'logDirectory': LogDirectory,
            'logFileMaxSize': LogfileMaxSize,
            'loggingLevel': 'debug',
            'enableMasking': EnableMasking
        },
        'useMLEGlobally': true, //globally MLE will be enabled for all the MLE supported APIs by Cybs in SDK
        'mapToControlMLEonAPI':{
            "createPayment":false, //only createPayment function will have MLE=false i.e. (/pts/v2/payments POST API) out of all MLE supported APIs
            "capturePayment":true //capturePayment function will have MLE=true i.e.  (/pts/v2/payments/{id}/captures POST API), if it not in list of MLE supportedAPIs else it will already have MLE=true by global MLE parameter.
        },
        'mleKeyAlias':"CyberSource_SJC_US" //this is optional paramter, not required to set the parameter/value if custom value is not required for MLE key alias. Default value is "CyberSource_SJC_US".
    };
    return configObj;

}

// Constructor for MLEConfiguration3
function MLEConfiguration3() {

    var configObj = {
        'authenticationType': AuthenticationType,
        'runEnvironment': RunEnvironment,

        'merchantID': MerchantId,
        'merchantKeyId': MerchantKeyId,
        'merchantsecretKey': MerchantSecretKey,

        'keyAlias': KeyAlias,
        'keyPass': KeyPass,
        'keyFileName': KeyFileName,
        'keysDirectory': KeysDirectory,

        'useMetaKey': UseMetaKey,
        'portfolioID': PortfolioID,
        'pemFileDirectory': PemFileDirectory,

        'logConfiguration': {
            'enableLog': EnableLog,
            'logFileName': LogFileName,
            'logDirectory': LogDirectory,
            'logFileMaxSize': LogfileMaxSize,
            'loggingLevel': 'debug',
            'enableMasking': EnableMasking
        },
        'useMLEGlobally': false, //globally MLE will be disabled for all the APIs in SDK
        'mapToControlMLEonAPI':{
            "createPayment":true, //only createPayment function will have MLE=true i.e. (/pts/v2/payments POST API)
            "capturePayment":true //only capturePayment function will have MLE=true i.e. (/pts/v2/payments/{id}/captures POST API)
        },
        'mleKeyAlias':"CyberSource_SJC_US" //this is optional paramter, not required to set the parameter if custom value is not required for MLE key alias. Default value is "CyberSource_SJC_US".
    };
    return configObj;

}

module.exports = {
    MLEConfiguration1,
    MLEConfiguration2,
    MLEConfiguration3
};
