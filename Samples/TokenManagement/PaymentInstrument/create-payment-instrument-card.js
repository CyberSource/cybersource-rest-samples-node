'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
const { faker, fa } = require('@faker-js/faker');

function create_payment_instrument_card(callback) {
	var profileid = '93B32398-AD51-4CC2-A682-EA3E93614EB1';

	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.PostPaymentInstrumentRequest();

		var card = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentCard();
		var dt = new Date();
        var expYear = dt.getFullYear()+4;
		card.expirationMonth = '12';
		card.expirationYear = expYear;
		card.type = 'visa';
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
	if (profileid != null) opts['profile-id'] = profileid;

		var instance = new cybersourceRestApi.PaymentInstrumentApi(configObject, apiClient);

		instance.postPaymentInstrument(requestObj, opts, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Create a Payment Instrument : ' + JSON.stringify(response['status']));
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
	create_payment_instrument_card(function () {
		console.log('\nPostPaymentInstrument end.');
	});
}
module.exports.create_payment_instrument_card = create_payment_instrument_card;
