'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var processPayment = require('./ProcessPaymentWIthServiceFee');

/**
 * This is a sample code to call ReversalApi,
 * call authReversal method
 */
function processAuthorizationReversalWithServiceFee(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.ReversalApi(configObject);

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'test_reversal';

		var reversalInformation = new cybersourceRestApi.Ptsv2paymentsidreversalsReversalInformation();
		var reversalInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsidreversalsReversalInformationAmountDetails();
		reversalInformationAmountDetails.totalAmount = '2325.00';
		reversalInformation.reason = 'testing';
		reversalInformation.amountDetails = reversalInformationAmountDetails;

		var request = new cybersourceRestApi.AuthReversalRequest();
		request.clientReferenceInformation = clientReferenceInformation;
		request.reversalInformation = reversalInformation;

		var enableCapture = false;

		processPayment.ProcessPaymentWithServiceFee(function (error, data) {
			if (data) {
				var id = data['id'];
				console.log('\n*************** Authorizarion Reversal (with Service Fees)********************* ');
				console.log('Payment ID passing to authReversal : ' + id);

				instance.authReversal(id, request, function (error, data, response) {
					if (error) {
						console.log('\nError in authReversal: ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData of authReversal : ' + JSON.stringify(data));
					}
					console.log('\nResponse of  authReversal  : ' + JSON.stringify(response));
					console.log('\nResponse Code of authReversal : ' + JSON.stringify(response['status']));
					callback(error, data);
				});

			}
		}, enableCapture);

	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	processAuthorizationReversalWithServiceFee(function () {
		console.log('Process Authorization Reversal end');
	});
}
module.exports.processAuthorizationReversalWithServiceFee = processAuthorizationReversalWithServiceFee;