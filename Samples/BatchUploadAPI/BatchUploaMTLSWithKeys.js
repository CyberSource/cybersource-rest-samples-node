'use strict';

const path = require('path');
const BatchUploadWithMTLSApi = require('cybersource-rest-client/src/api/BatchUploadWithMTLSApi');

function writeLogAudit(status) {
    const filename = path.basename(__filename).split('.')[0];
    console.log(`[Sample Code Testing] [${filename}] ${status}`);
}

function run(callback) {
    try {
        // File path: add your own path
        const fileName = 'batchapiTest.csv';
        const inputFilePath = path.resolve(__dirname, '../../Resource/batchApiMTLS/', fileName);

        // Env Host name
        const environmentHostname = 'secure-batch-test.cybersource.com';

        // PGP Public Key Path: add your own path
        const publicKeyFilePath = path.resolve(__dirname, '../../Resource/batchApiMTLS/bts-encryption-public.asc');

        // Client Private Key Path: add your own path
        const clientPrivateKeyFilePath = path.resolve(__dirname, '../../Resource/batchApiMTLS/client_private_key.key');

        // Client Certificate Path: add your own path
        const clientCertFilePath = path.resolve(__dirname, '../../Resource/batchApiMTLS/client_cert.crt');

        // Server Certificate Path: add your own path
        const serverTrustCertPath = path.resolve(__dirname, '../../Resource/batchApiMTLS/serverCasCert.pem');

        // Log configuration
        const log_config = {
            enableLog: true,
            logFileName: 'cybs-batch-upload',
            logDirectory: './logs',
            logFileMaxSize: 5242880,
            loggingLevel: 'debug',
            enableMasking: false
        };
        

        const apiInstance = new BatchUploadWithMTLSApi(log_config);

        const opts = {
            inputFilePath,
            environmentHostname,
            publicKeyFilePath,
            clientPrivateKeyFilePath,
            clientCertFilePath,
            serverTrustCertPath,
            // clientKeyPassword: undefined, // add if needed
            verify_ssl: true
        };

        apiInstance.uploadBatchAPIWithKeys(
            opts,
            function (error, result) {
                if (error) {
                    if (error.message) {
                        console.log('\nError :', error.message);
                    } else if (error.error && error.error.message) {
                        console.log('\nError :', error.error.message);
                    } else {
                        console.log('\nError :', JSON.stringify(error, null, 2));
                    }                    writeLogAudit('Error');
                } else if (result) {
                    const responseCode = result.status;
                    const responseMessage = result.statusText;
                    console.log('ResponseCode :', responseCode);
                    console.log('ResponseMessage :', responseMessage);
                    writeLogAudit(responseCode);
                }
                if (callback) callback(error, result);
            }
        );
    } catch (e) {
        console.log('\nException : ' + e);
        writeLogAudit('Exception');
        if (callback) callback(e);
    }
}

if (require.main === module) {
    run(function () {
        console.log('\nBatchUploaMTLSWithKeys Sample end.');
    });
}

module.exports.run = run;