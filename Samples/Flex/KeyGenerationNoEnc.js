'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));

function keyGenerationNoEnc(callback) {

	var configObject = new configuration();
	var instance = new cybersourceRestApi.KeyGenerationApi(configObject);

	var request = new cybersourceRestApi.GeneratePublicKeyRequest();
	request.encryptionType = 'None';

	var options = {
		'generatePublicKeyRequest': request
	};
	console.log('\n[BEGIN] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
	instance.generatePublicKey(options, function (error, data, response) {

		if (error) {
			console.log('\n API ERROR : \n ' + JSON.stringify(error));
		}
		 if (response) {
			console.log('\n API REQUEST HEADERS : \n' + JSON.stringify(response.req._headers,0,2));
			console.log('\n API REQUEST BODY : \n' + response.request._data + '\n');
			console.log('\n API RESPONSE BODY : ' + response.text + '\n'); 
			console.log('\n API RESPONSE CODE : ' + JSON.stringify(response['status']));
			console.log('\n API RESPONSE HEADERS : \n' + JSON.stringify(response.header,0,2));
		 }
		callback(error, data);
	});

}
if (require.main === module) {
	keyGenerationNoEnc(function () {
		console.log('\n[END] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
	});
}
module.exports.keyGenerationNoEnc = keyGenerationNoEnc;