'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));
var retrievePaymentInstrument = require('./RetrievePaymentInstrument');

/**
 * This is a sample code to call TMS PaymentInstrumentApi,
 * paymentinstrumentsTokenIdPatch method will update the paymentInstrument
 */
function updatePaymentInstrument(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.PaymentInstrumentsApi(configObject);

		var card = new cybersourceRestApi.Tmsv1paymentinstrumentsCard();
		card.expirationMonth = '08';
		card.expirationYear = '2022';
		card.type = 'visa';

		var billTo = new cybersourceRestApi.Tmsv1paymentinstrumentsBillTo();
		billTo.firstName = 'John';
		billTo.lastName = 'Deo';
		billTo.company = 'require(\'cybersource-rest-client\');';
		billTo.address1 = '12 Main Street';
		billTo.address2 = '20 My Street';
		billTo.locality = 'Foster City';
		billTo.administrativeArea = 'CA';
		billTo.postalCode = '90200';
		billTo.country = 'US';
		billTo.email = 'john.smith@example.com';
		billTo.phoneNumber = '555123456';

		var instrumentIdentifierCard = new cybersourceRestApi.Tmsv1instrumentidentifiersCard();
		instrumentIdentifierCard.number = '4111111111111111';
		var instrumentIdentifier = new cybersourceRestApi.Tmsv1paymentinstrumentsInstrumentIdentifier();
		instrumentIdentifier.card = instrumentIdentifierCard;

		var request = new cybersourceRestApi.Body3();
		request.card = card;
		request.billTo = billTo;
		request.instrumentIdentifier = instrumentIdentifier;

		var profileId = '93B32398-AD51-4CC2-A682-EA3E93614EB1';

		console.log('\n[BEGIN] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
		retrievePaymentInstrument.retrivePaymentIdentifiers(function (error, data) {
			if (!error) {
				var tokenId = data.id;

				instance.tmsV1PaymentinstrumentsTokenIdPatch(profileId, tokenId, request, function (error, data, response) {
					if (error) {
						console.log('\n API ERROR : \n ' + JSON.stringify(error));
					}
					if (response) {
					console.log('\n API REQUEST HEADERS : \n' + JSON.stringify(response.req._headers,0,2));
					console.log('\n API REQUEST BODY : \n' + response.request._data );
					console.log('\n API RESPONSE BODY : ' + response.text ); 
					console.log('\n API RESPONSE CODE : ' + JSON.stringify(response['status']));
					console.log('\n API RESPONSE HEADERS : \n' + JSON.stringify(response.header,0,2));
				}
				callback(error, data);
			});
			}
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	updatePaymentInstrument(function () {
		console.log('\n[END] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
	});
}
module.exports.updatePaymentInstrument = updatePaymentInstrument;