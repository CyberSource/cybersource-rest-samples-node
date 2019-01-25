'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));

/**
 * This is a sample code to call TMS PaymentInstrumentApi,
 * paymentinstrumentsPost method will create a new PaymentInstruments
 */

function createPaymentInstrument(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.PaymentInstrumentsApi(configObject);

		var card = new cybersourceRestApi.Tmsv1paymentinstrumentsCard();
		card.expirationMonth = '09';
		card.expirationYear = '2022';
		card.type = 'visa';

		var billTo = new cybersourceRestApi.Tmsv1paymentinstrumentsBillTo();
		billTo.firstName = 'John';
		billTo.lastName = 'Deo';
		billTo.company = 'CyberSource';
		billTo.address1 = '12 Main Street';
		billTo.address2 = '20 My Street';
		billTo.locality = 'San Francisco';
		billTo.administrativeArea = 'CA';
		billTo.postalCode = '90200';
		billTo.country = 'US';
		billTo.email = 'john.smith@example.com';
		billTo.phoneNumber = '555123456';

		var instrumentIdentifierCard = new cybersourceRestApi.Tmsv1instrumentidentifiersCard();
		instrumentIdentifierCard.number = '4111111111111111';

		var instrumentIdentifier = new cybersourceRestApi.Tmsv1paymentinstrumentsInstrumentIdentifier();
		instrumentIdentifier.card = instrumentIdentifierCard;

		var body = new cybersourceRestApi.Body();
		body.card = card;
		body.billTo = billTo;
		body.instrumentIdentifier = instrumentIdentifier;

		var profileId = '93B32398-AD51-4CC2-A682-EA3E93614EB1';

		console.log('\n[BEGIN] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');

		instance.tmsV1PaymentinstrumentsPost(profileId, body, function (error, data, response) {
			if (error) {
				console.log('\n API ERROR : \n ' + JSON.stringify(error));
			}
			if (response) {
				console.log('\n API REQUEST HEADERS : \n' + JSON.stringify(response.req._headers,0,2));
				console.log('\n API REQUEST BODY : \n' + response.request._data + '\n');
				console.log('\n API RESPONSE BODY : ' + response.text + '\n'); 
				console.log('\n API RESPONSE CODE : ' + JSON.stringify(response['status']));
				console.log('\n API RESPONSE HEADERS : \n' + JSON.stringify(response.header,0,2));
				console.log('\n[END] REQUEST & RESPONSE OF:  '+ path.basename(__filename, path.extname(__filename)) + '\n');
			}
			callback(error, data);
		});

	} catch (error) {
		console.log(error);
	}
}

if (require.main === module) {
	createPaymentInstrument(function () {
	});
}
module.exports.createPaymentInstrument = createPaymentInstrument;
