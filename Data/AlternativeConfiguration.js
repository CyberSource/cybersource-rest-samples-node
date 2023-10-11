'use strict';

/*
* Merchant configuration properties are taken from Configuration module
*/

// common parameters
const AuthenticationType = 'http_signature';
const RunEnvironment = 'apitest.cybersource.com';
const MerchantId = 'testrest_cpctv';

// http_signature parameters
const MerchantKeyId = '964f2ecc-96f0-4432-a742-db0b44e6a73a';
const MerchantSecretKey = 'zXKpCqMQPmOR/JRldSlkQUtvvIzOewUVqsUP0sBHpxQ=';

// jwt parameters
const KeysDirectory = 'Resource';
const KeyFileName = 'testrest_cpctv';
const KeyAlias = 'testrest_cpctv';
const KeyPass = 'testrest_cpctv';

//meta key parameters
const UseMetaKey = false;
const PortfolioID = '';

// logging parameters
const EnableLog = true;
const LogFileName = 'cybs';
const LogDirectory = 'log';
const LogfileMaxSize = '5242880'; //10 MB In Bytes
const EnableMasking = true;

const UseProxy = true;
const ProxyHost = '192.168.132.58';
const ProxyPort = '8080';
const ProxyUser = 'MebanMalkier';
const ProxyPass = 'MebanBlake';

// Constructor for Configuration
function Configuration() {

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

        'useProxy': UseProxy,
        'proxyAddress': ProxyHost,
        'proxyPort': ProxyPort,
        'proxyUser': ProxyUser,
        'proxyPassword': ProxyPass,

        'logConfiguration': {
            'enableLog': EnableLog,
            'logFileName': LogFileName,
            'logDirectory': LogDirectory,
            'logFileMaxSize': LogfileMaxSize,
            'loggingLevel': 'debug',
            'enableMasking': EnableMasking
        }
    };
    return configObj;

}

module.exports = Configuration;
