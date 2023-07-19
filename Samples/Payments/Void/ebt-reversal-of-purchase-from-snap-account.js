'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var processCredit = require('../Credit/ebt-merchandise-return-credit-voucher-from-snap');

function ebt_reversal_of_purchase_from_snap_account(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.VoidPaymentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsidreversalsClientReferenceInformation();
		clientReferenceInformation.code = 'Reversal of Purchase from SNAP Account';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var paymentInformation = new cybersourceRestApi.Ptsv2paymentsidvoidsPaymentInformation();
		var paymentInformationPaymentType = new cybersourceRestApi.Ptsv2paymentsidrefundsPaymentInformationPaymentType();
		paymentInformationPaymentType.name = 'CARD';
		paymentInformationPaymentType.subTypeName = 'DEBIT';
		paymentInformation.paymentType = paymentInformationPaymentType;

		requestObj.paymentInformation = paymentInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsidvoidsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsidreversalsReversalInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '204.00';
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		requestObj.orderInformation = orderInformation;


		var instance = new cybersourceRestApi.VoidApi(configObject, apiClient);
		processCredit.ebt_merchandise_return_credit_voucher_from_snap(function (error, data) {
			if (data) {
				var id = data['id'];
				instance.voidPayment(requestObj, id, function (error, data, response) {
						if(error) {
							console.log('\nError : ' + JSON.stringify(error));
						}
						else if (data) {
							console.log('\nData : ' + JSON.stringify(data));
						}

						console.log('\nResponse : ' + JSON.stringify(response));
						console.log('\nResponse Code of Void a Payment : ' + JSON.stringify(response['status']));

						var status = response['status'];
						write_log_audit(status);
						callback(error, data, response);
					});
				}
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
	ebt_reversal_of_purchase_from_snap_account(function () {
		console.log('\nVoidPayment end.');
	});
}

module.exports.ebt_reversal_of_purchase_from_snap_account = ebt_reversal_of_purchase_from_snap_account;