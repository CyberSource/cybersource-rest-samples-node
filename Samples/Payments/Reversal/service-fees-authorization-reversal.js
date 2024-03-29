'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var process_payment = require('../Payments/service-fees-with-credit-card-transaction');

function service_fees_authorization_reversal(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.AuthReversalRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsidreversalsClientReferenceInformation();
		clientReferenceInformation.code = 'TC50171_3';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var reversalInformation = new cybersourceRestApi.Ptsv2paymentsidreversalsReversalInformation();
		var reversalInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsidreversalsReversalInformationAmountDetails();
		reversalInformationAmountDetails.totalAmount = '2325.00';
		reversalInformation.amountDetails = reversalInformationAmountDetails;

		reversalInformation.reason = '34';
		requestObj.reversalInformation = reversalInformation;


		var instance = new cybersourceRestApi.ReversalApi(configObject, apiClient);

		var enable_capture = false;
		process_payment.service_fees_with_credit_card_transaction(function (error, data) {
			if (data) {
				var id = data['id'];
				console.log('\n*************** Authorizarion Reversal ********************* ');
				console.log('Payment ID passing to authReversal : ' + id);
				instance.authReversal(id, requestObj, function (error, data, response) {
					if (error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Process an Authorization Reversal : ' + JSON.stringify(response['status']));
					var status = response['status'];
					write_log_audit(status);
					callback(error, data, response);
				});
			}
		}, enable_capture);
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
	service_fees_authorization_reversal(function () {
		console.log('\nAuthReversal end.');
	});
}
module.exports.service_fees_authorization_reversal = service_fees_authorization_reversal;
