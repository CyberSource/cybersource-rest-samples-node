'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var createPaymentInstrument = require('./CreatePaymentInstrument');

/**
 * This is a sample code to call TMS PaymentInstrumentApi,
 * paymentinstrumentsTokenIdGet method will retrive the token details
 */
function retrivePaymentIdentifiers(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.PaymentInstrumentApi(configObject);

		var profileId = '93B32398-AD51-4CC2-A682-EA3E93614EB1';

		createPaymentInstrument.createPaymentInstrument(function (error, data) {
			if (!error) {
				var tokenId = data['id'];
				console.log('\n*************** Retrieve PaymentInstrument  ********************* ');
				console.log('\nToken ID passing to paymentinstrumentsTokenIdGet : ' + tokenId);

				instance.getPaymentInstrument(profileId, tokenId, function (error, data, response) {
					if (error) {
						console.log('\nError in Retrieve PaymentInstrument : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData of Retrieve PaymentInstrument : ' + JSON.stringify(data));
					}
					console.log('\nResponse of  Retrieve PaymentInstrument : ' + JSON.stringify(response));
					console.log('\nResponse Code of Retrieve PaymentInstrument :' + JSON.stringify(response['status']));
					callback(error, data);
				});
			}
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	retrivePaymentIdentifiers(function () {
		console.log('PaymentInstrument end.');
	});
}
module.exports.retrivePaymentIdentifiers = retrivePaymentIdentifiers;