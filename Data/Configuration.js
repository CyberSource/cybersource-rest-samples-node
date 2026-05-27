'use strict';

/**
 * Default merchant configuration using HTTP Signature authentication.
 *
 * Note: If you are currently using HTTP Signature authentication and want to migrate
 * to JWT (required for MLE support), you can now use JWT with the same shared secret
 * credentials (merchantKeyId + merchantsecretKey) you already have — no P12 certificate
 * needed. HTTP Signature is being deprecated; JWT with Shared Secret is the recommended
 * migration path.
 *
 * See JwtSharedSecretConfiguration for JWT with Shared Secret configuration,
 * which supports both Request MLE and Response MLE.
 *
 * @see {@link ./JwtSharedSecretConfiguration.js#getMerchantDetails}
 * @see {@link ./JwtSharedSecretConfiguration.js#getMerchantDetailsWithMLE}
 */

/*
* Merchant configuration properties are taken from Configuration module
*/

// common parameters
const AuthenticationType = 'http_signature';
const RunEnvironment = 'apitest.cybersource.com';
const MerchantId = 'testrest';

// http_signature parameters
const MerchantKeyId = '08c94330-f618-42a3-b09d-e1e43be5efda';
const MerchantSecretKey = 'yBJxy6LjM2TmcPGu+GaJrHtkke25fPpUX+UY6/L/1tE=';

// jwt parameters
const KeysDirectory = 'Resource';
const KeyFileName = 'testrest';
const KeyAlias = 'testrest';
const KeyPass = 'Ap!C38tp12@';

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

//Add the property if required to override the cybs default developerId in all request body
const DefaultDeveloperId = '';

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
        'pemFileDirectory': PemFileDirectory,
        'defaultDeveloperId': DefaultDeveloperId,
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
