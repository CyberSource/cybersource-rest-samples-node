'use strict';

const fs = require('fs');
const path = require('path');
const { getMerchantDetailsForBatchUploadSample } = require('../../Data/Configuration');
var cybersourceRestApi = require('cybersource-rest-client');


function write_log_audit(status) {
    const filename = path.basename(__filename);
    console.log(`[Sample Code Testing] [${filename}] ${status}`);
}

function upload_transaction_batch(callback) {
    try {

        const config = new getMerchantDetailsForBatchUploadSample();

        const apiClient = new cybersourceRestApi.ApiClient();

        const apiInstance = new cybersourceRestApi.TransactionBatchesApi(config, apiClient);

        const fileName = 'batchapiTest.csv';
        const filePath = path.join(__dirname, '../../Resource', fileName);
        console.log("filePath:", filePath);
        if (!fs.existsSync(filePath)) {
            throw new Error(`File ${fileName} not found`);
        }

        const file = fs.createReadStream(filePath);

apiInstance.uploadTransactionBatch(file, function (error, data, response) {
    if (error) {
        console.log('\nError : ' + JSON.stringify(error));
    }
    else if (data) {
        console.log('\nData : ' + JSON.stringify(data));
    }

    console.log('\nResponse : ' + JSON.stringify(response));
    console.log('\nResponse Code of the Batch Upload : ' + JSON.stringify(response['status']));
    var status = response['status'];
    write_log_audit(status);
    callback(error, data, response);
});


    } catch (error) {
        console.log('\nException on calling the API : ' + error);
    }
}

// Execute the function
if (require.main === module) {
    upload_transaction_batch(function () {
        console.log('\nUpload Transaction Batch end.');
    });
}

module.exports.upload_transaction_batch = upload_transaction_batch;
