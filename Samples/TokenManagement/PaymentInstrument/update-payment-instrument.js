'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function update_payment_instrument(callback) {
	var profileid = '93B32398-AD51-4CC2-A682-EA3E93614EB1';
	var paymentInstrumentTokenId = '888454C31FB6150CE05340588D0AA9BE';

	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.PatchPaymentInstrumentRequest();

		var card = new cybersourceRestApi.Tmsv2tokenizeTokenInformationCustomerEmbeddedDefaultPaymentInstrumentCard();
		card.expirationMonth = '12';
		card.expirationYear = '2031';
		card.type = 'visa';
		requestObj.card = card;

		var billTo = new cybersourceRestApi.Tmsv2tokenizeTokenInformationCustomerEmbeddedDefaultPaymentInstrumentBillTo();
		billTo.firstName = 'Jack';
		billTo.lastName = 'Smith';
		billTo.company = 'CyberSource';
		billTo.address1 = '1 Market St';
		billTo.locality = 'San Francisco';
		billTo.administrativeArea = 'CA';
		billTo.postalCode = '94105';
		billTo.country = 'US';
		billTo.email = 'updatedemail@cybs.com';
		billTo.phoneNumber = '4158888674';
		requestObj.billTo = billTo;

		var instrumentIdentifier = new cybersourceRestApi.Tmsv2tokenizeTokenInformationCustomerEmbeddedDefaultPaymentInstrumentInstrumentIdentifier();
		instrumentIdentifier.id = '7010000000016241111';
		requestObj.instrumentIdentifier = instrumentIdentifier;

		var opts = [];

		var instance = new cybersourceRestApi.PaymentInstrumentApi(configObject, apiClient);

		instance.patchPaymentInstrument(paymentInstrumentTokenId, requestObj, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Update a Payment Instrument : ' + JSON.stringify(response['status']));
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
		update_payment_instrument(function () {
		console.log('\nPatchPaymentInstrument end.');
	});
}
module.exports.update_payment_instrument = update_payment_instrument;
