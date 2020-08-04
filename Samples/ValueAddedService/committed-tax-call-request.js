'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function committed_tax_call_request(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.TaxRequest();

		var clientReferenceInformation = new cybersourceRestApi.Vasv2taxClientReferenceInformation();
		clientReferenceInformation.code = 'TAX_TC001';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var taxInformation = new cybersourceRestApi.Vasv2taxTaxInformation();
		taxInformation.showTaxPerLineItem = 'Yes';
		taxInformation.commitIndicator = true;
		requestObj.taxInformation = taxInformation;

		var orderInformation = new cybersourceRestApi.Vasv2taxOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.RiskV1DecisionsPost201ResponseOrderInformationAmountDetails();
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		var orderInformationBillTo = new cybersourceRestApi.Vasv2taxOrderInformationBillTo();
		orderInformationBillTo.address1 = '1 Market St';
		orderInformationBillTo.locality = 'San Francisco';
		orderInformationBillTo.administrativeArea = 'CA';
		orderInformationBillTo.postalCode = '94105';
		orderInformationBillTo.country = 'US';
		orderInformation.billTo = orderInformationBillTo;

		var orderInformationShippingDetails = new cybersourceRestApi.Vasv2taxOrderInformationShippingDetails();
		orderInformationShippingDetails.shipFromLocality = 'Cambridge Bay';
		orderInformationShippingDetails.shipFromCountry = 'CA';
		orderInformationShippingDetails.shipFromPostalCode = 'A0G 1T0';
		orderInformationShippingDetails.shipFromAdministrativeArea = 'NL';
		orderInformation.shippingDetails = orderInformationShippingDetails;

		var orderInformationShipTo = new cybersourceRestApi.Vasv2taxOrderInformationShipTo();
		orderInformationShipTo.country = 'US';
		orderInformationShipTo.administrativeArea = 'FL';
		orderInformationShipTo.locality = 'Panama City';
		orderInformationShipTo.postalCode = '32401';
		orderInformationShipTo.address1 = '123 Russel St.';
		orderInformation.shipTo = orderInformationShipTo;


		var lineItems =	new Array();
		var	lineItems1 = new cybersourceRestApi.Vasv2taxOrderInformationLineItems();
		lineItems1.productSKU = '07-12-00657';
		lineItems1.productCode = '50161815';
		lineItems1.quantity = 1;
		lineItems1.productName = 'Chewing Gum';
		lineItems1.unitPrice = '1200';
		lineItems.push(lineItems1);

		var	lineItems2 = new cybersourceRestApi.Vasv2taxOrderInformationLineItems();
		lineItems2.productSKU = '07-12-00659';
		lineItems2.productCode = '50181905';
		lineItems2.quantity = 1;
		lineItems2.productName = 'Sugar Cookies';
		lineItems2.unitPrice = '1240';
		lineItems.push(lineItems2);

		var	lineItems3 = new cybersourceRestApi.Vasv2taxOrderInformationLineItems();
		lineItems3.productSKU = '07-12-00658';
		lineItems3.productCode = '5020.11';
		lineItems3.quantity = 1;
		lineItems3.productName = 'Carbonated Water';
		lineItems3.unitPrice = '9001';
		lineItems.push(lineItems3);

		orderInformation.lineItems = lineItems;

		requestObj.orderInformation = orderInformation;

		var merchantInformation = new cybersourceRestApi.Vasv2taxMerchantInformation();
		merchantInformation.vatRegistrationNumber = 'abcdef';
		requestObj.merchantInformation = merchantInformation;


		var instance = new cybersourceRestApi.TaxesApi(configObject, apiClient);

		instance.calculateTax( requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Calculate Taxes : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		committed_tax_call_request(function () {
		console.log('\nCalculateTax end.');
	});
}
module.exports.committed_tax_call_request = committed_tax_call_request;
