'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
const { faker, fa } = require('@faker-js/faker');

function create_customer_payment_instrument_pinless_debit(callback) {
	var customerTokenId = 'AB695DA801DD1BB6E05341588E0A3BDC';
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.PostCustomerPaymentInstrumentRequest();

		var card = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentCard();
		var dt = new Date();
        var expYear = dt.getFullYear()+4;
		card.expirationMonth = '12';
		card.expirationYear = expYear;
		card.type = '001';
		card.issueNumber = '01';
		card.startMonth = '01';
		card.startYear = '2020';
		card.useAs = 'pinless debit';
		requestObj.card = card;

		var billTo = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentBillTo();
		var fName = faker.person.firstName();
        var lName = faker.person.lastName();
		billTo.firstName = fName;
		billTo.lastName = lName;
		billTo.company = faker.company.name();
		billTo.address1 = faker.location.streetAddress();
		billTo.locality = faker.location.city();
		billTo.administrativeArea = 'CA';
		billTo.postalCode = faker.location.zipCode();
		billTo.country = 'US';
		billTo.email = faker.internet.email({firstName:fName,lastName:lName});
		billTo.phoneNumber = faker.string.numeric(10);
		requestObj.billTo = billTo;

		var instrumentIdentifier = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentInstrumentIdentifier();
		instrumentIdentifier.id = '7010000000016241111';
		requestObj.instrumentIdentifier = instrumentIdentifier;

	var opts = [];

		var instance = new cybersourceRestApi.CustomerPaymentInstrumentApi(configObject, apiClient);

		instance.postCustomerPaymentInstrument(customerTokenId, requestObj, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Create a Customer Payment Instrument : ' + JSON.stringify(response['status']));
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
		create_customer_payment_instrument_pinless_debit(function () {
		console.log('\nPostCustomerPaymentInstrument end.');
	});
}
module.exports.create_customer_payment_instrument_pinless_debit = create_customer_payment_instrument_pinless_debit;
