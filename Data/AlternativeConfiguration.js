'use strict';

/*
* Merchant configuration properties are taken from Configuration module
*/

// common parameters
const AuthenticationType = 'http_signature';
const RunEnvironment = 'apitest.cybersource.com';
const MerchantId = 'testrest_cpctv';

// http_signature parameters
const MerchantKeyId = 'e547c3d3-16e4-444c-9313-2a08784b906a';
const MerchantSecretKey = 'JXm4dqKYIxWofM1TIbtYY9HuYo7Cg1HPHxn29f6waRo=';

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
const LogDirectory = '../log';
const LogfileMaxSize = '5242880'; //10 MB In Bytes

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
        
		'enableLog': EnableLog,
		'logFilename': LogFileName,
		'logDirectory': LogDirectory,
		'logFileMaxSize': LogfileMaxSize
	};
	return configObj;

}

module.exports = Configuration;
