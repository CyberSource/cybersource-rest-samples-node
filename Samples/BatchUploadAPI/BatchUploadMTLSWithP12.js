'use strict';

const path = require('path');
const BatchUploadWithMTLSApi = require('cybersource-rest-client/src/api/BatchUploadWithMTLSApi');

function writeLogAudit(status) {
    const filename = path.basename(__filename).split('.')[0];
    console.log(`[Sample Code Testing] [${filename}] ${status}`);
}

function run(callback) {
    try {
        // Input file: : add your own path
        const inputFilePath = path.resolve(__dirname, '../../Resource/batchApiMTLS/batchapiTest.csv');
        // Host name
        const envHostName = 'secure-batch-test.cybersource.com';

        // Path of public key for pgp encryption: add your own path
        const publicKeyFile = path.resolve(__dirname, '../../Resource/batchApiMTLS/bts-encryption-public.asc');
        // Path (P12) containing client private key and cert: add your own path
        const clientCertP12FilePath = path.resolve(__dirname, '../../Resource/batchApiMTLS/pushtest.p12');

        // Store password: : add your own
        const clientCertP12Password = 'changeit';

        // Server cert: : add your own path
        const serverTrustCertPath = path.resolve(__dirname, '../../Resource/batchApiMTLS/serverCasCert.pem');
        const log_config = {
            enableLog: true,
            logFileName: 'cybs-batch-upload',
            logDirectory: './logs',
            logFileMaxSize: 5242880,
            loggingLevel: 'debug'
        };

        const apiInstance = new BatchUploadWithMTLSApi(log_config);

        const opts = {
            inputFilePath,
            environmentHostname: envHostName,
            publicKeyFilePath: publicKeyFile,
            clientCertP12FilePath,
            clientCertP12Password,
            serverTrustCertPath,
            verify_ssl: true
        };

        apiInstance.uploadBatchAPIWithP12(
            opts,
            function (error, result) {
                if (error) {
                    if (error.message) {
                        console.log('\nError :', error.message);
                    } else if (error.error && error.error.message) {
                        console.log('\nError :', error.error.message);
                    } else {
                        console.log('\nError :', JSON.stringify(error, null, 2));
                    }
                    writeLogAudit('Error');
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
        console.log('\nBatchUploadMTLSWithP12 Sample end.');
    });
}

module.exports.run = run;