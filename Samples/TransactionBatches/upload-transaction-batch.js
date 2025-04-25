'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/ConfigurationForBatchUpload.js');
var configuration = require(filePath);

function upload_transaction_batch(callback) {
    try {
        var configObject = new configuration();
        var apiClient = new cybersourceRestApi.ApiClient();
        var fileToUpload = 'Resource/qaebc2.rgdltnd0.csv';

        var opts = [];

        var instance = new cybersourceRestApi.TransactionBatchesApi(configObject, apiClient);

        instance.uploadTransactionBatch(fileToUpload, function (error, data, response) {
            if (error) {
                console.log('\nError : ' + JSON.stringify(error));
            }
            else if (data) {
                console.log('\nData : ' + JSON.stringify(data));
            }

            console.log('\nResponse : ' + JSON.stringify(response));
            console.log('\nResponse Code of Upload Transaction Batch : ' + JSON.stringify(response['status']));
            var status = response['status'];
            write_log_audit(status);
            callback(error, data, response);
        });
    }
    catch (error) {
        console.log('\nException on calling the API : ' + error);
    }
}

function write_log_audit(status) {
    var filename = path.basename(__filename).split(".")[0];
    console.log(`[Sample Code Testing] [${filename}] ${status}`);
}

if (require.main === module) {
    upload_transaction_batch(function () {
        console.log('\nUploadTransactionBatch end.');
    });
}
module.exports.upload_transaction_batch = upload_transaction_batch;
