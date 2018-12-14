'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var processCredit = require('./ProcessCredit');
/**
 * This is a sample code to call VoidApi,
 * Void a Credit
 * Include the credit ID in the POST request to cancel the credit.
 */
function voidACredit(callback) {

	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.VoidApi(configObject);

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'test_credit_void';

		var request = new cybersourceRestApi.VoidCreditRequest();
		request.clientReferenceInformation = clientReferenceInformation;

		processCredit.processACredit(function (error, data) {
			if (data) {
				var id = data['id'];
				console.log('\n*************** Void Credit ********************* ' );
				console.log('\nCredit ID passing to voidCredit : ' + id);


				instance.voidCredit(request, id, function (error, data, response) {
					if (error) {
						console.log('Error in Void Credit : ' + error);
					}
					else if (data) {
						console.log('\nData of Void Credit : ' + JSON.stringify(data));
					}
					console.log('\nResponse of Void Credit : ' + JSON.stringify(response));
					console.log('\nResponse Code of void credit : ' + JSON.stringify(response['status']));
					callback(error, data);
				});
			}
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	voidACredit(function () {
		console.log('Void credit end.');
	});
}
module.exports.voidACredit = voidACredit;