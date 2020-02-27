'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function shippingDetailsNotUSOrCanada(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.VerifyCustomerAddressRequest();

		var clientReferenceInformation = new cybersourceRestApi.Riskv1addressverificationsClientReferenceInformation();
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
		orderInformationShipTo.address1 = '4R.ILHA TERCEIRA,232-R/C-ESQ';
		orderInformationShipTo.address2 = ' ';
		orderInformationShipTo.address3 = '';
		orderInformationShipTo.address4 = '';
		orderInformationShipTo.administrativeArea = 'WI';
		orderInformationShipTo.country = 'PT';
		orderInformationShipTo.locality = 'Carcavelos';
		orderInformationShipTo.postalCode = '29681';
		orderInformation.shipTo = orderInformationShipTo;


		var lineItems =  new Array();
		var  lineItems1 = new cybersourceRestApi.Riskv1addressverificationsOrderInformationLineItems();
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

		instance.verifyCustomerAddress( requestObj, function (error, data, response) {
			if(error) {
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
		shippingDetailsNotUSOrCanada(function () {
		console.log('\nVerifyCustomerAddress end.');
	},);
}
module.exports.shippingDetailsNotUSOrCanada = shippingDetailsNotUSOrCanada;
