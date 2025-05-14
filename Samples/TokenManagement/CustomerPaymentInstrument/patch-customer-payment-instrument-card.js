'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var createCustomerPaymentInstrument = require('./create-customer-non-default-payment-instrument-card');

function patch_customer_payment_instrument(callback) {
	var customerTokenId = 'AB695DA801DD1BB6E05341588E0A3BDC';
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();

		var requestObj =
      new cybersourceRestApi.PostCustomerPaymentInstrumentRequest();

		requestObj._default = false;
		var card =
      new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentCard();
		card.expirationMonth = '12';
		card.expirationYear = '2031';
		card.type = '001';
		requestObj.card = card;

		var billTo =
      new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentBillTo();
		billTo.firstName = 'Chandra';
		billTo.lastName = 'Shekhar';
		billTo.company = 'CyberSource';
		billTo.address1 = '1 Market St';
		billTo.locality = 'San Francisco';
		billTo.administrativeArea = 'CA';
		billTo.postalCode = '94105';
		billTo.country = 'US';
		billTo.email = 'test@cybs.com';
		billTo.phoneNumber = '4158880000';
		requestObj.billTo = billTo;

		var opts = [];

		var instance = new cybersourceRestApi.CustomerPaymentInstrumentApi(
			configObject,
			apiClient
		);

		createCustomerPaymentInstrument.create_customer_non_default_payment_instrument_card(
			function (error, data) {
				if (data) {
					var paymentInstrumentTokenId = data['id'];
					instance.patchCustomersPaymentInstrument(
						customerTokenId,
						paymentInstrumentTokenId,
						requestObj,
						opts,
						function (error, data, response) {
							if (error) {
								console.log('\nError : ' + JSON.stringify(error));
							} else if (data) {
								console.log('\nData : ' + JSON.stringify(data));
							}

							console.log('\nResponse : ' + JSON.stringify(response));
							console.log(
								'\nResponse Code of Patch a Customer Payment Instrument : ' +
                  JSON.stringify(response['status'])
							);
							callback(error, data, response);
						}
					);
				}
			}
		);
	} catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	patch_customer_payment_instrument(function () {
		console.log('\nPatchCustomerPaymentInstrument end.');
	});
}
module.exports.patch_customer_payment_instrument =
  patch_customer_payment_instrument;
