'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function keyGenerationNoEnc(callback) {

	var configObject = new configuration();
	var instance = new cybersourceRestApi.KeyGenerationApi(configObject);

	var request = new cybersourceRestApi.GeneratePublicKeyRequest();
	request.encryptionType = 'None';

	var opts = {}

	console.log('\n*************** Key Generation NoEnc ********************* ');

	instance.generatePublicKey(request, opts, function (error, data, response) {
		if (error) {
			console.log('Error : ' + error);
		}
		else if (data) {
			console.log('Data : ' + JSON.stringify(data));
		}
		console.log('Response : ' + JSON.stringify(response));
		console.log('Response id : ' + response['status']);
		callback(error, data);
	});

}
if (require.main === module) {
	keyGenerationNoEnc(function () {
		console.log('key generation end.');
	});
}
module.exports.keyGenerationNoEnc = keyGenerationNoEnc;