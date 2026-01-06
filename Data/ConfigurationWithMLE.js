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

        //Set Request MLE Settings in Merchant Configuration [Refer MLE.md on cybersource-rest-client-node github repo]
        'enableRequestMLEForOptionalApisGlobally': true, //Enables request MLE globally for all APIs that have optional MLE support //same as older deprecated variable "useMLEGlobally" //APIs that has MLE Request mandatory is default has MLE support in SDK without any configuration but support with JWT auth type.
        'requestMleKeyAlias':"CyberSource_SJC_US", //this is optional parameter, not required to set the parameter if custom value is not required for MLE key alias. Default value is "CyberSource_SJC_US". //same as older deprecated variable "mleKeyAlias"

        //Set Response MLE Settings in Merchant Configuration [Refer MLE.md on cybersource-rest-client-node github repo]
        'enableResponseMleGlobally': false, //Enables/Disable response MLE globally for all APIs that support MLE responses
        'responseMlePrivateKeyFilePath': "", //Path to the Response MLE private key file. Supported formats: .p12, .pfx, .pem, .key, .p8. Recommendation use encrypted private Key (password protection) for MLE response.
        'responseMlePrivateKeyFilePassword': "", //Password for the private key file (required for .p12/.pfx files or encrypted private keys).
        'responseMleKID': "" //This parameter is optional when responseMlePrivateKeyFilePath points to a CyberSource-generated P12 file. If not provided, the SDK will automatically fetch the Key ID from the P12 file. If provided, the SDK will use the user-provided value instead of the auto-fetched value.
		//Required when using PEM format files (.pem, .key, .p8) or when providing responseMlePrivateKey object directly.

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

        //Set Request MLE Settings in Merchant Configuration [Refer MLE.md on cybersource-rest-client-node github repo]
        'mapToControlMLEonAPI':{
            "createPayment":"false", //only createPayment function will have MLE=false i.e. (/pts/v2/payments POST API) out of all MLE supported APIs
            "capturePayment":"true" //capturePayment function will have MLE=true i.e.  (/pts/v2/payments/{id}/captures POST API), if it not in list of MLE supportedAPIs else it will already have MLE=true by global MLE parameter.
        },

        'enableRequestMLEForOptionalApisGlobally': true, //Enables request MLE globally for all APIs that have optional MLE support //same as older deprecated variable "useMLEGlobally"
        'requestMleKeyAlias':"CyberSource_SJC_US", //this is optional parameter, not required to set the parameter if custom value is not required for MLE key alias. Default value is "CyberSource_SJC_US". //same as older deprecated variable "mleKeyAlias"

        //Set Response MLE Settings in Merchant Configuration [Refer MLE.md on cybersource-rest-client-node github repo]
        'enableResponseMleGlobally': false, //Enables/Disable response MLE globally for all APIs that support MLE responses
        'responseMlePrivateKeyFilePath': "", //Path to the Response MLE private key file. Supported formats: .p12, .pfx, .pem, .key, .p8. Recommendation use encrypted private Key (password protection) for MLE response.
        'responseMlePrivateKeyFilePassword': "", //Password for the private key file (required for .p12/.pfx files or encrypted private keys).
        'responseMleKID': "" //This parameter is optional when responseMlePrivateKeyFilePath points to a CyberSource-generated P12 file. If not provided, the SDK will automatically fetch the Key ID from the P12 file. If provided, the SDK will use the user-provided value instead of the auto-fetched value.
		//Required when using PEM format files (.pem, .key, .p8) or when providing responseMlePrivateKey object directly.

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

        //Set Request MLE Settings in Merchant Configuration [Refer MLE.md on cybersource-rest-client-node github repo]
        'mapToControlMLEonAPI':{
            "createPayment":"true", //only createPayment function will have MLE=true i.e. (/pts/v2/payments POST API)
            "capturePayment":"true" //only capturePayment function will have MLE=true i.e. (/pts/v2/payments/{id}/captures POST API)
        },

        'enableRequestMLEForOptionalApisGlobally': false, //Disabled request MLE globally for all APIs that have optional MLE support //same as older deprecated variable "useMLEGlobally"
        'requestMleKeyAlias':"CyberSource_SJC_US", //this is optional parameter, not required to set the parameter if custom value is not required for MLE key alias. Default value is "CyberSource_SJC_US". //same as older deprecated variable "mleKeyAlias"

        //Set Response MLE Settings in Merchant Configuration [Refer MLE.md on cybersource-rest-client-node github repo]
        'enableResponseMleGlobally': false, //Enables/Disable response MLE globally for all APIs that support MLE responses
        'responseMlePrivateKeyFilePath': "", //Path to the Response MLE private key file. Supported formats: .p12, .pfx, .pem, .key, .p8. Recommendation use encrypted private Key (password protection) for MLE response.
        'responseMlePrivateKeyFilePassword': "", //Password for the private key file (required for .p12/.pfx files or encrypted private keys).
        'responseMleKID': "" //This parameter is optional when responseMlePrivateKeyFilePath points to a CyberSource-generated P12 file. If not provided, the SDK will automatically fetch the Key ID from the P12 file. If provided, the SDK will use the user-provided value instead of the auto-fetched value.
		//Required when using PEM format files (.pem, .key, .p8) or when providing responseMlePrivateKey object directly.

    };
    return configObj;

}

// Constructor for MLEConfigurationWithRequestAndResponseMLE1
function MLEConfigurationWithRequestAndResponseMLE1() {

    var configObj = {
        'authenticationType': AuthenticationType,
        'runEnvironment': RunEnvironment,

        'merchantID': 'agentic_mid_091225001',

        'keyAlias': 'agentic_mid_091225001',
        'keyPass': 'Changeit@123',
        'keyFileName': 'agentic_mid_091225001',
        'keysDirectory': KeysDirectory,

        'logConfiguration': {
            'enableLog': EnableLog,
            'logFileName': LogFileName,
            'logDirectory': LogDirectory,
            'logFileMaxSize': LogfileMaxSize,
            'loggingLevel': 'debug',
            'enableMasking': EnableMasking
        },

        //Set Request MLE Settings in Merchant Configuration [Refer MLE.md on cybersource-rest-client-node github repo]
        // 'enableRequestMLEForOptionalApisGlobally': true, //Enables request MLE globally for all APIs that have optional MLE support //same as older deprecated variable "useMLEGlobally" //APIs that has MLE Request mandatory is default has MLE support in SDK without any configuration but support with JWT auth type.
        'useMLEGlobally': false, //deprecated variable, use 'enableRequestMLEForOptionalApisGlobally' instead

        //Set Response MLE Settings in Merchant Configuration [Refer MLE.md on cybersource-rest-client-node github repo]
        'enableResponseMleGlobally': true, //Enables response MLE globally for all APIs that support MLE responses
        'responseMlePrivateKeyFilePath': "Resource/agentic_mid_091225001_mle.p12", //Path to the Response MLE private key file. Supported formats: .p12, .pfx, .pem, .key, .p8. Recommendation use encrypted private Key (password protection) for MLE response.
        'responseMlePrivateKeyFilePassword': "Changeit@123", //Password for the private key file (required for .p12/.pfx files or encrypted private keys).
        'responseMleKID': "1757970970891045729358" //Optional since p12 is Cybs Generated.
		//This parameter is optional when responseMlePrivateKeyFilePath points to a CyberSource-generated P12 file. If not provided, the SDK will automatically fetch the Key ID from the P12 file. If provided, the SDK will use the user-provided value instead of the auto-fetched value.
		//Required when using PEM format files (.pem, .key, .p8) or when providing responseMlePrivateKey object directly.

    }; 
    return configObj;

}

// Constructor for MLEConfigurationWithRequestAndResponseMLE2
function MLEConfigurationWithRequestAndResponseMLE2() {

    var configObj = {
        'authenticationType': AuthenticationType,
        'runEnvironment': RunEnvironment,

        'merchantID': 'agentic_mid_091225001',

        'keyAlias': 'agentic_mid_091225001',
        'keyPass': 'Changeit@123',
        'keyFileName': 'agentic_mid_091225001',
        'keysDirectory': KeysDirectory,

        'logConfiguration': {
            'enableLog': EnableLog,
            'logFileName': LogFileName,
            'logDirectory': LogDirectory,
            'logFileMaxSize': LogfileMaxSize,
            'loggingLevel': 'debug',
            'enableMasking': EnableMasking
        },

        //Set Request MLE Settings in Merchant Configuration [Refer MLE.md on cybersource-rest-client-node github repo]
        'enableRequestMLEForOptionalApisGlobally': false, //Disable request MLE globally for all APIs that have optional MLE support //same as older deprecated variable "useMLEGlobally" //APIs that has MLE Request mandatory is default has MLE support in SDK without any configuration but support with JWT auth type.

        //Set Response MLE Settings in Merchant Configuration [Refer MLE.md on cybersource-rest-client-node github repo]
        'enableResponseMleGlobally': false, //Disable response MLE globally for all APIs that support MLE responses

        //Set Request & Response MLE Settings in Merchant Configuration through MAP for API control level [Refer MLE.md on cybersource-rest-client-node github repo]
        'mapToControlMLEonAPI':{
            "createPayment":"true::false", //only createPayment function will have Request MLE=true and Response MLE = false i.e. (/pts/v2/payments POST API)
            "enrollCard":"true::true" //only enrollCard function will have Request MLE=true & Response MLE =true i.e. (/acp/v1/tokens POST API)
        },

        //since one of the API has Response MLE true, so below fields are required for Response MLE
        'responseMlePrivateKeyFilePath': "Resource/agentic_mid_091225001_new_generated_mle.p12", //Path to the Response MLE private key file. Supported formats: .p12, .pfx, .pem, .key, .p8. Recommendation use encrypted private Key (password protection) for MLE response.
        'responseMlePrivateKeyFilePassword': "Changeit@123", //Password for the private key file (required for .p12/.pfx files or encrypted private keys).
        'responseMleKID': "1764104507829324018353" //Optional since p12 is Cybs Generated.
		//This parameter is optional when responseMlePrivateKeyFilePath points to a CyberSource-generated P12 file. If not provided, the SDK will automatically fetch the Key ID from the P12 file. If provided, the SDK will use the user-provided value instead of the auto-fetched value.
		//Required when using PEM format files (.pem, .key, .p8) or when providing responseMlePrivateKey object directly.

    };
    return configObj;

}

module.exports = {
    MLEConfiguration1,
    MLEConfiguration2,
    MLEConfiguration3,
    MLEConfigurationWithRequestAndResponseMLE1,
    MLEConfigurationWithRequestAndResponseMLE2
};
