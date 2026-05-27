'use strict';

/**
 * Configuration for JWT authentication with Shared Secret (symmetric / HS256).
 *
 * Why JWT with Shared Secret?
 * - HTTP Signature is being deprecated. JWT with Shared Secret provides a
 *   seamless migration path — it uses the same merchantKeyId and
 *   merchantsecretKey credentials you already have for HTTP Signature.
 * - Enables MLE (Message Level Encryption). MLE requires JWT authentication.
 *   By switching to JWT with Shared Secret, you can enable MLE without managing
 *   a P12 certificate file.
 * - Zero credential changes. Your existing Key ID and Shared Secret from the
 *   CyberSource Business Center work as-is.
 *
 * Credentials:
 * The merchantKeyId and merchantsecretKey are the same credentials
 * used for HTTP Signature authentication. You can obtain them from the CyberSource
 * Business Center:
 * - Test: https://businesscentertest.cybersource.com/ebc2
 * - Production: https://businesscenter.cybersource.com/ebc2
 */

// Common parameters
const AuthenticationType = 'jwt'; // JWT authentication instead of http_signature
const JwtKeyType = 'SHARED_SECRET'; // New property for JWT Shared Secret
const RunEnvironment = 'apitest.cybersource.com';
const MerchantId = 'testrest';

// Shared Secret credentials — same as HTTP Signature credentials
const MerchantKeyId = '08c94330-f618-42a3-b09d-e1e43be5efda';
const MerchantSecretKey = 'yBJxy6LjM2TmcPGu+GaJrHtkke25fPpUX+UY6/L/1tE=';

// MetaKey parameters
const UseMetaKey = false;
const PortfolioID = '';

// Logging parameters
const EnableLog = true;
const LogFileName = 'cybs';
const LogDirectory = 'log';
const LogfileMaxSize = '5242880'; // 10 MB In Bytes
const EnableMasking = true;

// MLE Certificate path for JWT Shared Secret
// When using SHARED_SECRET, the MLE certificate must be provided separately.
// Download from CyberSource Business Center:
//   Test: https://businesscentertest.cybersource.com/ebc2
//   Prod: https://businesscenter.cybersource.com/ebc2
const MleForRequestPublicCertPath = 'Resource/MLE_PublicCert.pem';


/**
 * Returns merchant properties configured for JWT authentication with Shared Secret.
 *
 * This is a drop-in replacement for HTTP Signature authentication.
 * The only changes from a typical HTTP Signature configuration are:
 * 1. authenticationType = 'jwt' (instead of 'http_signature')
 * 2. jwtKeyType = 'SHARED_SECRET' (new property)
 *
 * The merchantKeyId and merchantsecretKey remain the same.
 */
function getMerchantDetails() {
    var configObj = {
        // Authentication: JWT with Shared Secret (HS256)
        'authenticationType': AuthenticationType,
        'jwtKeyType': JwtKeyType,
        'runEnvironment': RunEnvironment,

        'merchantID': MerchantId,
        // Shared Secret credentials — same as HTTP Signature credentials
        'merchantKeyId': MerchantKeyId,
        'merchantsecretKey': MerchantSecretKey,

        // MetaKey Parameters
        'useMetaKey': UseMetaKey,
        'portfolioID': PortfolioID,

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

/**
 * Returns merchant properties configured for JWT with Shared Secret + MLE enabled.
 *
 * This configuration enables Message Level Encryption (MLE) for request payloads.
 * Response MLE is also supported — set enableResponseMleGlobally to true
 * and provide the response MLE private key settings.
 *
 * When using jwtKeyType=SHARED_SECRET, Request MLE requires the public certificate
 * to be provided via mleForRequestPublicCertPath because there is no P12 file
 * to auto-extract it from.
 *
 * Download the MLE public certificate from the CyberSource Business Center:
 * - Test: https://businesscentertest.cybersource.com/ebc2
 * - Production: https://businesscenter.cybersource.com/ebc2
 */
function getMerchantDetailsWithMLE() {
    var configObj = {
        // Authentication: JWT with Shared Secret (HS256)
        'authenticationType': AuthenticationType,
        'jwtKeyType': JwtKeyType,
        'runEnvironment': RunEnvironment,

        'merchantID': MerchantId,
        // Shared Secret credentials — same as HTTP Signature credentials
        'merchantKeyId': MerchantKeyId,
        'merchantsecretKey': MerchantSecretKey,

        // MetaKey Parameters
        'useMetaKey': UseMetaKey,
        'portfolioID': PortfolioID,

        'logConfiguration': {
            'enableLog': EnableLog,
            'logFileName': LogFileName,
            'logDirectory': LogDirectory,
            'logFileMaxSize': LogfileMaxSize,
            'loggingLevel': 'debug',
            'enableMasking': EnableMasking
        },

        // --- Request MLE Configuration ---
        // When using SHARED_SECRET, the MLE certificate must be provided separately.
        // Download from CyberSource Business Center:
        //   Test: https://businesscentertest.cybersource.com/ebc2
        //   Prod: https://businesscenter.cybersource.com/ebc2
        'enableRequestMLEForOptionalApisGlobally': true,
        'mleForRequestPublicCertPath': MleForRequestPublicCertPath,
        // requestMleKeyAlias: Optional — defaults to CyberSource_SJC_US
        // 'requestMleKeyAlias': 'CyberSource_SJC_US',

        // --- Response MLE Configuration ---
        // Set to true to enable response MLE (encrypted responses from CyberSource).
        // Requires a private key for decryption.
        'enableResponseMleGlobally': false,
        // Provide EITHER a private key file path OR a PrivateKey object.
        // Supported formats: .p12, .pfx, .pem, .key, .p8
        'responseMlePrivateKeyFilePath': '', // e.g., 'Resource/your_mle_private_key.p12'
        'responseMlePrivateKeyFilePassword': '', // Required for .p12/.pfx or encrypted keys
        // responseMleKID: Optional for CyberSource-generated P12 files (auto-extracted).
        // Required for PEM/KEY files or when providing PrivateKey object directly.
        'responseMleKID': '',
    };
    return configObj;
}

module.exports = {
    getMerchantDetails,
    getMerchantDetailsWithMLE
};