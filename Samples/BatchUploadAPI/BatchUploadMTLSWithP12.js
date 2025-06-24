'use strict';

const path = require('path');
const BatchUploadWithMTLSApi = require('cybersource-rest-client/src/api/BatchUploadWithMTLSApi');

function writeLogAudit(status) {
    const filename = path.basename(__filename).split('.')[0];
    console.log(`[Sample Code Testing] [${filename}] ${status}`);
}

function run(callback) {
    try {
        // Input file
        const inputFilePath = path.resolve(__dirname, '../../Resource/batchApiMTLS/batchapiTest.csv');
        // Host name
        const envHostName = 'secure-batch-test.cybersource.com';

        // Path of public key for pgp encryption
        const publicKeyFile = path.resolve(__dirname, '../../Resource/batchApiMTLS/bts-encryption-public.asc');
        // Store path (P12) containing client private key and cert
        const p12Path = path.resolve(__dirname, '../../Resource/batchApiMTLS/pushtest.p12');

        // Store password
        const p12Password = 'changeit';

        // Store path (server cert)
        const serverCertPath = path.resolve(__dirname, '../../Resource/batchApiMTLS/serverCasCert.pem');

        //Log configuration
        const log_config = {
            enableLog: true,
            logFileName: 'cybs-batch-upload',
            logDirectory: './logs',
            logFileMaxSize: 5242880,
            loggingLevel: 'debug',
            enableMasking: false
        };

        const apiInstance = new BatchUploadWithMTLSApi(log_config);

        apiInstance.uploadBatchAPIWithP12(
            inputFilePath,
            envHostName,
            publicKeyFile,
            p12Path,
            p12Password,
            serverCertPath,
            true,
        function (error, result) {
            if (error) {
                console.log('\nError : ' + JSON.stringify(error));
                writeLogAudit('Error');
            } else if (result) {
                const responseCode = result.status;
                const responseMessage = result.statusText;
                console.log('ResponseCode :', responseCode);
                console.log('ResponseMessage :', responseMessage);
                writeLogAudit(responseCode);
            }
            if (callback) callback(error, result);
        });
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