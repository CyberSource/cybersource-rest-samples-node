'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
const { faker, fa } = require('@faker-js/faker');

function basic_tax_calculation_request(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.TaxRequest();

		var clientReferenceInformation = new cybersourceRestApi.Vasv2taxClientReferenceInformation();
		clientReferenceInformation.code = faker.string.uuid();
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var taxInformation = new cybersourceRestApi.Vasv2taxTaxInformation();
		taxInformation.showTaxPerLineItem = 'Yes';
		requestObj.taxInformation = taxInformation;

		var orderInformation = new cybersourceRestApi.Vasv2taxOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.RiskV1DecisionsPost201ResponseOrderInformationAmountDetails();
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		var orderInformationBillTo = new cybersourceRestApi.Vasv2taxOrderInformationBillTo();
		var fName = faker.person.firstName();
        var lName = faker.person.lastName();
		orderInformationBillTo.firstName = fName;
		orderInformationBillTo.lastName = lName;
		orderInformationBillTo.address1 = faker.location.streetAddress();
		orderInformationBillTo.locality = faker.location.city();
		orderInformationBillTo.administrativeArea = faker.location.state();
		orderInformationBillTo.postalCode = faker.location.zipCode();
		orderInformationBillTo.country = 'US';
		orderInformationBillTo.email = faker.internet.email({firstName:fName,lastName:lName});
		orderInformationBillTo.phoneNumber = faker.string.numeric(10);
		orderInformation.billTo = orderInformationBillTo;


		var lineItems =	new Array();
		var	lineItems1 = new cybersourceRestApi.Vasv2taxOrderInformationLineItems();
		lineItems1.productSKU = faker.commerce.isbn(10);
		lineItems1.productCode = faker.commerce.department();
		lineItems1.quantity = 1;
		lineItems1.productName = faker.commerce.productName();
		lineItems1.unitPrice = faker.commerce.price({ min: 100, max: 1200 });
		lineItems.push(lineItems1);

		var	lineItems2 = new cybersourceRestApi.Vasv2taxOrderInformationLineItems();
		lineItems2.productSKU = faker.commerce.isbn(10);
		lineItems2.productCode = faker.commerce.department();
		lineItems2.quantity = 1;5
		lineItems2.productName = faker.commerce.productName();
		lineItems2.unitPrice = faker.commerce.price({ min: 100, max: 1200 });
		lineItems.push(lineItems2);

		var	lineItems3 = new cybersourceRestApi.Vasv2taxOrderInformationLineItems();
		lineItems3.productSKU = faker.commerce.isbn(10);
		lineItems3.productCode = faker.commerce.department();
		lineItems3.quantity = 1;
		lineItems3.productName = faker.commerce.productName();
		lineItems3.unitPrice = faker.commerce.price({ min: 100, max: 1200 });
		lineItems.push(lineItems3);

		orderInformation.lineItems = lineItems;

		requestObj.orderInformation = orderInformation;


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
		basic_tax_calculation_request(function () {
		console.log('\nCalculateTax end.');
	});
}
module.exports.basic_tax_calculation_request = basic_tax_calculation_request;
