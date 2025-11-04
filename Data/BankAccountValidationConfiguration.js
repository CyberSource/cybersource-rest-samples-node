'use strict';

/*
    The BankAccountValidationConfiguration.js provides the necessary settings for 
    Bank Account Validation (BAV) using the CyberSource REST API. 
    This configuration uses JWT authentication, which is required for Request MLE. 
    The BAV API mandates Request MLE, and JWT is the only supported authentication type for this feature.
    By Default SDK sends encrypted requests for the APIs having mandatory Request MLE flag.
    For more MLE features and configurations, please refer to CyberSource documentation at https://github.com/CyberSource/cybersource-rest-client-node/blob/master/MLE.md
*/

// common parameters

const AuthenticationType = 'JWT'; //for MLE feature auth type should be JWT
const RunEnvironment = 'apitest.cybersource.com';
const MerchantId = 'testcasmerchpd01001';

// jwt parameters
const KeysDirectory = 'Resource';
const KeyFileName = 'testcasmerchpd01001';
const KeyAlias = 'testcasmerchpd01001';
const KeyPass = 'Authnet101!';

// logging parameters
const EnableLog = true;
const LogFileName = 'cybs';
const LogDirectory = 'log';
const LogfileMaxSize = '5242880'; //10 MB In Bytes
const EnableMasking = true;

// Constructor for Configiration
function BankAccountValidationConfiguration() {

    var configObj = {
        'authenticationType': AuthenticationType,
        'runEnvironment': RunEnvironment,
        'merchantID': MerchantId,

        'keyAlias': KeyAlias,
        'keyPass': KeyPass,
        'keyFileName': KeyFileName,
        'keysDirectory': KeysDirectory,

        'logConfiguration': {
            'enableLog': EnableLog,
            'logFileName': LogFileName,
            'logDirectory': LogDirectory,
            'logFileMaxSize': LogfileMaxSize,
            'loggingLevel': 'debug',
            'enableMasking': EnableMasking
        },
    }; 
    return configObj;

}

module.exports = BankAccountValidationConfiguration;