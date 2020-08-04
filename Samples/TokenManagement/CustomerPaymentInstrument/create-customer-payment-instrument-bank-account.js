'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function create_customer_payment_instrument_bank_account(callback) {
	var customerTokenId = 'AB695DA801DD1BB6E05341588E0A3BDC';
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.PostCustomerPaymentInstrumentRequest();

		var bankAccount = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentBankAccount();
		bankAccount.type = 'savings';
		requestObj.bankAccount = bankAccount;

		var buyerInformation = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentBuyerInformation();
		buyerInformation.companyTaxID = '12345';
		buyerInformation.currency = 'USD';
		buyerInformation.dateOfBirth = '2000-12-13';

		var personalIdentification =	new Array();
		var	personalIdentification1 = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentBuyerInformationPersonalIdentification();
		personalIdentification1.id = '57684432111321';
		personalIdentification1.type = 'driver license';
		var issuedBy1 = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentBuyerInformationIssuedBy();
		issuedBy1.administrativeArea = 'CA';
		personalIdentification1.issuedBy = issuedBy1;

		personalIdentification.push(personalIdentification1);

		buyerInformation.personalIdentification = personalIdentification;

		requestObj.buyerInformation = buyerInformation;

		var billTo = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentBillTo();
		billTo.firstName = 'John';
		billTo.lastName = 'Doe';
		billTo.company = 'CyberSource';
		billTo.address1 = '1 Market St';
		billTo.locality = 'San Francisco';
		billTo.administrativeArea = 'CA';
		billTo.postalCode = '94105';
		billTo.country = 'US';
		billTo.email = 'test@cybs.com';
		billTo.phoneNumber = '4158880000';
		requestObj.billTo = billTo;

		var processingInformation = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentProcessingInformation();
		var processingInformationBankTransferOptions = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentProcessingInformationBankTransferOptions();
		processingInformationBankTransferOptions.SECCode = 'WEB';
		processingInformation.bankTransferOptions = processingInformationBankTransferOptions;

		requestObj.processingInformation = processingInformation;

		var instrumentIdentifier = new cybersourceRestApi.Tmsv2customersEmbeddedDefaultPaymentInstrumentInstrumentIdentifier();
		instrumentIdentifier.id = 'A7A91A2CA872B272E05340588D0A0699';
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
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		create_customer_payment_instrument_bank_account(function () {
		console.log('\nPostCustomerPaymentInstrument end.');
	});
}
module.exports.create_customer_payment_instrument_bank_account = create_customer_payment_instrument_bank_account;
