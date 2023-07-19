'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/AlternativeConfiguration.js');
var configuration = require(filePath);
var debitPurchase = require('../Payments/pin-debit-purchase-using-swiped-track-data-with-visa-platform-connect');
function pin_debit_purchase_reversal_void(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.VoidPaymentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsidreversalsClientReferenceInformation();
		clientReferenceInformation.code = 'Pin Debit Purchase Reversal(Void)';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var paymentInformation = new cybersourceRestApi.Ptsv2paymentsidvoidsPaymentInformation();
		var paymentInformationPaymentType = new cybersourceRestApi.Ptsv2paymentsidrefundsPaymentInformationPaymentType();
		paymentInformationPaymentType.name = 'CARD';
		paymentInformationPaymentType.subTypeName = 'DEBIT';
		paymentInformation.paymentType = paymentInformationPaymentType;

		requestObj.paymentInformation = paymentInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsidvoidsOrderInformation();
		var amountDetails = new cybersourceRestApi.Ptsv2paymentsidreversalsReversalInformationAmountDetails();
		amountDetails.currency = 'USD';
		amountDetails.totalAmount = '202.00';
		orderInformation.amountDetails = amountDetails;
		requestObj.orderInformation = orderInformation;

		var instance = new cybersourceRestApi.VoidApi(configObject, apiClient);

		debitPurchase.pin_debit_purchase_using_swiped_track_data_with_visa_platform_connect(function (err, debitData) {
			if (debitData) {
				var id = debitData['id'];
				instance.voidPayment( requestObj, id, function (error, data, response) {
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
		pin_debit_purchase_reversal_void(function () {
		console.log('\nVoidPayment end.');
	});
}
module.exports.pin_debit_purchase_reversal_void = pin_debit_purchase_reversal_void;
