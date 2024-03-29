'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function canadian_billing_details(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.VerifyCustomerAddressRequest();

		var clientReferenceInformation = new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
		clientReferenceInformation.code = 'addressEg';
		clientReferenceInformation.comments = 'dav-All fields';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var orderInformation = new cybersourceRestApi.Riskv1addressverificationsOrderInformation();
		var orderInformationBillTo = new cybersourceRestApi.Riskv1addressverificationsOrderInformationBillTo();
		orderInformationBillTo.address1 = '1650 Burton Ave';
		orderInformationBillTo.address2 = '';
		orderInformationBillTo.address3 = '';
		orderInformationBillTo.address4 = '';
		orderInformationBillTo.administrativeArea = 'BC';
		orderInformationBillTo.country = 'CA';
		orderInformationBillTo.locality = 'VICTORIA';
		orderInformationBillTo.postalCode = 'V8T 2N6';
		orderInformation.billTo = orderInformationBillTo;


		var lineItems = new Array();
		var lineItems1 = new cybersourceRestApi.Riskv1addressverificationsOrderInformationLineItems();
		lineItems1.unitPrice = '120.50';
		lineItems1.quantity = 3;
		lineItems1.productSKU = '9966223';
		lineItems1.productName = 'headset';
		lineItems1.productCode = 'electronic';
		lineItems.push(lineItems1);

		orderInformation.lineItems = lineItems;

		requestObj.orderInformation = orderInformation;

		var buyerInformation = new cybersourceRestApi.Riskv1addressverificationsBuyerInformation();
		buyerInformation.merchantCustomerId = 'ABCD';
		requestObj.buyerInformation = buyerInformation;


		var instance = new cybersourceRestApi.VerificationApi(configObject, apiClient);

		instance.verifyCustomerAddress(requestObj, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Verify customer address : ' + JSON.stringify(response['status']));
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
	canadian_billing_details(function () {
		console.log('\nVerifyCustomerAddress end.');
	});
}
module.exports.canadian_billing_details = canadian_billing_details;
