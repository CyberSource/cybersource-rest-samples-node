'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var refundPayment = require('./RefundEcheckPayment');
/**
 * This is a sample code to call VoidApi,
 * Void a Refund
 * Include the refund ID in the POST request to cancel the refund.
 */
function VoidEcheckRefund(callback) {

	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.VoidApi(configObject);

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'test_refund_void';

		var request = new cybersourceRestApi.VoidRefundRequest();
		request.clientReferenceInformation = clientReferenceInformation;

		refundPayment.RefundEcheckPayment(function (error, data) {
			if (data) {
				var id = data['id'];
				console.log('\n*************** Void Refund ********************* ');
				console.log('Refund ID passing to voidRefund : ' + id);

				instance.voidRefund(request, id, function (error, data, response) {
					if (error) {
						console.log('\nError in void refund: ' + error);
					}
					else if (data) {
						console.log('\nData of void refund : ' + JSON.stringify(data));
					}
					console.log('\nResponse of  void refund  : ' + JSON.stringify(response));
					console.log('\nResponse Code of void refund : ' + JSON.stringify(response['status']));
					callback(error, data);
				});

			}
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	VoidEcheckRefund(function () {
		console.log('Void Refund end.');
	});
}
module.exports.VoidEcheckRefund = VoidEcheckRefund;