'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function multiple_line_items(callback) {
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
		orderInformationBillTo.address1 = '12301 research st';
		orderInformationBillTo.address2 = '1';
		orderInformationBillTo.address3 = '2';
		orderInformationBillTo.address4 = '3';
		orderInformationBillTo.administrativeArea = 'TX';
		orderInformationBillTo.country = 'US';
		orderInformationBillTo.locality = 'Austin';
		orderInformationBillTo.postalCode = '78759';
		orderInformation.billTo = orderInformationBillTo;

		var orderInformationShipTo = new cybersourceRestApi.Riskv1addressverificationsOrderInformationShipTo();
		orderInformationShipTo.address1 = 'PO Box 9088';
		orderInformationShipTo.address2 = '';
		orderInformationShipTo.address3 = '';
		orderInformationShipTo.address4 = '';
		orderInformationShipTo.administrativeArea = 'CA';
		orderInformationShipTo.country = 'US';
		orderInformationShipTo.locality = 'San Jose';
		orderInformationShipTo.postalCode = '95132';
		orderInformation.shipTo = orderInformationShipTo;


		var lineItems = new Array();
		var lineItems1 = new cybersourceRestApi.Riskv1addressverificationsOrderInformationLineItems();
		lineItems1.unitPrice = '120.50';
		lineItems1.quantity = 3;
		lineItems1.productSKU = '9966223';
		lineItems1.productName = 'headset';
		lineItems1.productCode = 'electronix';
		lineItems.push(lineItems1);

		var lineItems2 = new cybersourceRestApi.Riskv1addressverificationsOrderInformationLineItems();
		lineItems2.unitPrice = '10.50';
		lineItems2.quantity = 2;
		lineItems2.productSKU = '9966226';
		lineItems2.productName = 'wwrdf';
		lineItems2.productCode = 'electronic';
		lineItems.push(lineItems2);

		orderInformation.lineItems = lineItems;

		requestObj.orderInformation = orderInformation;

		var buyerInformation = new cybersourceRestApi.Riskv1addressverificationsBuyerInformation();
		buyerInformation.merchantCustomerId = 'QWERTY';
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
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	multiple_line_items(function () {
		console.log('\nVerifyCustomerAddress end.');
	});
}
module.exports.multiple_line_items = multiple_line_items;
