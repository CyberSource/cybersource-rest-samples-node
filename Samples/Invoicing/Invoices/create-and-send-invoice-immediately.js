'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function create_and_send_invoice_immediately(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreateInvoiceRequest();

		var customerInformation = new cybersourceRestApi.Invoicingv2invoicesCustomerInformation();
		customerInformation.name = 'Tanya Lee';
		customerInformation.email = 'tanya.lee@my-email.world';
		requestObj.customerInformation = customerInformation;

		var invoiceInformation = new cybersourceRestApi.Invoicingv2invoicesInvoiceInformation();
		invoiceInformation.description = 'This is a test invoice';
		invoiceInformation.dueDate = '2019-07-11';
		invoiceInformation.sendImmediately = true;
		invoiceInformation.allowPartialPayments = true;
		invoiceInformation.deliveryMode = 'email';
		requestObj.invoiceInformation = invoiceInformation;

		var orderInformation = new cybersourceRestApi.Invoicingv2invoicesOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Invoicingv2invoicesOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '2623.64';
		orderInformationAmountDetails.currency = 'USD';
		orderInformationAmountDetails.discountAmount = '126.08';
		orderInformationAmountDetails.discountPercent = 5.0;
		orderInformationAmountDetails.subAmount = 2749.72;
		orderInformationAmountDetails.minimumPartialAmount = 20.00;
		var orderInformationAmountDetailsTaxDetails = new cybersourceRestApi.Invoicingv2invoicesOrderInformationAmountDetailsTaxDetails();
		orderInformationAmountDetailsTaxDetails.type = 'State Tax';
		orderInformationAmountDetailsTaxDetails.amount = '208.04';
		orderInformationAmountDetailsTaxDetails.rate = '8.25';
		orderInformationAmountDetails.taxDetails = orderInformationAmountDetailsTaxDetails;

		var orderInformationAmountDetailsFreight = new cybersourceRestApi.Invoicingv2invoicesOrderInformationAmountDetailsFreight();
		orderInformationAmountDetailsFreight.amount = '20.00';
		orderInformationAmountDetailsFreight.taxable = true;
		orderInformationAmountDetails.freight = orderInformationAmountDetailsFreight;

		orderInformation.amountDetails = orderInformationAmountDetails;


		var lineItems =	new Array();
		var	lineItems1 = new cybersourceRestApi.Invoicingv2invoicesOrderInformationLineItems();
		lineItems1.productSku = 'P653727383';
		lineItems1.productName = 'First line item\'s name';
		lineItems1.quantity = 21;
		lineItems1.unitPrice = '120.08';
		lineItems.push(lineItems1);

		orderInformation.lineItems = lineItems;

		requestObj.orderInformation = orderInformation;


		var instance = new cybersourceRestApi.InvoicesApi(configObject, apiClient);

		instance.createInvoice( requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Create a New Invoice : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		create_and_send_invoice_immediately(function () {
		console.log('\nCreateInvoice end.');
	});
}
module.exports.create_and_send_invoice_immediately = create_and_send_invoice_immediately;
