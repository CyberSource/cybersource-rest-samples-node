'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var retrievePaymentInstrument = require('./RetrievePaymentInstrument'); 

/**
 * This is a sample code to call TMS PaymentInstrumentApi,
 * paymentinstrumentsTokenIdGet method will delete the token 
 */
function retrivePaymentIdentifiers(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.PaymentInstrumentsApi(configObject);

		var profileId = '93B32398-AD51-4CC2-A682-EA3E93614EB1';

		retrievePaymentInstrument.retrivePaymentIdentifiers(function (error, data) {
			if (!error) {
				var tokenId = data['id'];
				console.log('\n*************** Delete PaymentInstrument  ********************* ');
				console.log('\nToken ID passing to paymentinstrumentsTokenIdDelete : ' + tokenId);

				instance.tmsV1PaymentinstrumentsTokenIdDelete(profileId, tokenId, function (error, data, response) {
					if (error) {
						console.log('\nError in Delete PaymentInstrument : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData of Delete PaymentInstrument : ' + JSON.stringify(data));
					}
					console.log('\nResponse of  Delete PaymentInstrument : ' + JSON.stringify(response));
					console.log('\nResponse Code of Delete PaymentInstrument :' + JSON.stringify(response['status']));
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
		console.log('PaymentInstrument delete end.');
	});
}
module.exports.retrivePaymentIdentifiers = retrivePaymentIdentifiers;