'use strict'

var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var Configuration = require(filePath);
var CybersourceRestApi = require('cybersource-rest-client');

/**
 * This is a sample code to call SecureFileShareApi,
 * Download a file for the given file identifier
 */
function downloadFileWithFileIdentifier(callback) {
    try {
        var configObject = new Configuration();
        var instance = new CybersourceRestApi.SecureFileShareApi(configObject);
        var fileId = "VFJSUmVwb3J0LTc4NTVkMTNmLTkzOTgtNTExMy1lMDUzLWEyNTg4ZTBhNzE5Mi5jc3YtMjAxOC0xMC0yMA=="
        var opts = [];
        opts['organizationId'] = "testrest";

        console.log("****************Dowload File with Identifier****************")

        instance.getFile(fileId, opts, function (error, data, response) {
            if (error) {
                console.log("\nError in dowload file with identifier : " + error);
            }
            else if (data) {
                console.log("\nData of dowload file with identifier : " + JSON.stringify(data));
            }
            console.log("\nResponse of dowload file with identifier : " + JSON.stringify(response));
            console.log("\nResponse Code of dowload file with identifier : " + JSON.stringify(response['status']));
            callback(error, data);
        });
    } catch (error) {
        console.log(error);
    }

};
if (require.main === module) {
    downloadFileWithFileIdentifier(function () {
        console.log('Method call complete.');
    });
}
module.exports.downloadFileWithFileIdentifier = downloadFileWithFileIdentifier;