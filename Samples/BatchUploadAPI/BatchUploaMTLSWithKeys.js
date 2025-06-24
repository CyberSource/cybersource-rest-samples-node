'use strict';

const path = require('path');
const BatchUploadWithMTLSApi = require('cybersource-rest-client/src/api/BatchUploadWithMTLSApi');

function writeLogAudit(status) {
    const filename = path.basename(__filename).split('.')[0];
    console.log(`[Sample Code Testing] [${filename}] ${status}`);
}

function run(callback) {
    try {
        // File path from resources folder
        const fileName = 'batchapiTest.csv';
        const inputFile = path.resolve(__dirname, '../../Resource/batchApiMTLS/', fileName);

        // Env Host name
        const envHostName = 'secure-batch-test.cybersource.com';

        // PGP Public Key Path
        const publicKeyPath = path.resolve(__dirname, '../../Resource/batchApiMTLS/bts-encryption-public.asc');

        // Client Private Key Path
        const clientPrivateKeyPath = path.resolve(__dirname, '../../Resource/batchApiMTLS/client_private_key.key');

        // Client Certificate Path
        const clientCertPath = path.resolve(__dirname, '../../Resource/batchApiMTLS/client_cert.crt');

        // Server Certificate Path
        const serverCertPath = path.resolve(__dirname, '../../Resource/batchApiMTLS/serverCasCert.pem');

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

        apiInstance.uploadBatchAPIWithKeys(
            inputFile,
            envHostName,
            publicKeyPath,
            clientPrivateKeyPath,
            clientCertPath,
            serverCertPath,
            undefined,
            undefined,
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
        console.log('\nBatchUploaMTLSWithKeys Sample end.');
    });
}

module.exports.run = run;