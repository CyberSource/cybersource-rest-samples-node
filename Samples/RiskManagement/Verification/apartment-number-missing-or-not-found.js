'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function apartment_number_missing_or_not_found(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.VerifyCustomerAddressRequest();

		var clientReferenceInformation = new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
		clientReferenceInformation.code = 'addressEg';
		clientReferenceInformation.comments = 'dav-error response check';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var orderInformation = new cybersourceRestApi.Riskv1addressverificationsOrderInformation();
		var orderInformationBillTo = new cybersourceRestApi.Riskv1addressverificationsOrderInformationBillTo();
		orderInformationBillTo.address1 = '6th 4th ave';
		orderInformationBillTo.address2 = '';
		orderInformationBillTo.administrativeArea = 'NY';
		orderInformationBillTo.country = 'US';
		orderInformationBillTo.locality = 'rensslaer';
		orderInformationBillTo.postalCode = '12144';
		orderInformation.billTo = orderInformationBillTo;


		var lineItems = new Array();
		var lineItems1 = new cybersourceRestApi.Riskv1addressverificationsOrderInformationLineItems();
		lineItems1.unitPrice = '120.50';
		lineItems1.quantity = 3;
		lineItems1.productSKU = '996633';
		lineItems1.productName = 'qwerty';
		lineItems1.productCode = 'handling';
		lineItems.push(lineItems1);

		orderInformation.lineItems = lineItems;

		requestObj.orderInformation = orderInformation;


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
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	apartment_number_missing_or_not_found(function () {
		console.log('\nVerifyCustomerAddress end.');
	});
}
module.exports.apartment_number_missing_or_not_found = apartment_number_missing_or_not_found;
