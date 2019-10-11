'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function createPaymentInstrumentBankAccount(callback, profileid) {
	try {
		var configObject = new configuration();
		var requestObj = new cybersourceRestApi.CreatePaymentInstrumentRequest();

		var bankAccount = new cybersourceRestApi.TmsV1InstrumentIdentifiersPaymentInstrumentsGet200ResponseEmbeddedBankAccount();
		bankAccount.type = 'savings';
		requestObj.bankAccount = bankAccount;

		var buyerInformation = new cybersourceRestApi.TmsV1InstrumentIdentifiersPaymentInstrumentsGet200ResponseEmbeddedBuyerInformation();
		buyerInformation.companyTaxID = '12345';
		buyerInformation.currency = 'USD';

		var personalIdentification =  new Array();
		var  personalIdentification1 = new cybersourceRestApi.TmsV1InstrumentIdentifiersPaymentInstrumentsGet200ResponseEmbeddedBuyerInformationPersonalIdentification();
		personalIdentification1.id = '57684432111321';
		personalIdentification1.type = 'driver license';
		var issuedBy1 = new cybersourceRestApi.TmsV1InstrumentIdentifiersPaymentInstrumentsGet200ResponseEmbeddedBuyerInformationIssuedBy();
		issuedBy1.administrativeArea = 'CA';
		personalIdentification1.issuedBy = issuedBy1;

		personalIdentification.push(personalIdentification1);

		buyerInformation.personalIdentification = personalIdentification;

		requestObj.buyerInformation = buyerInformation;

		var billTo = new cybersourceRestApi.TmsV1InstrumentIdentifiersPaymentInstrumentsGet200ResponseEmbeddedBillTo();
		billTo.firstName = 'John';
		billTo.lastName = 'Smith';
		billTo.company = 'Cybersource';
		billTo.address1 = '8310 Capital of Texas Highwas North';
		billTo.address2 = 'Bluffstone Drive';
		billTo.locality = 'Austin';
		billTo.administrativeArea = 'TX';
		billTo.postalCode = '78731';
		billTo.country = 'US';
		billTo.email = 'john.smith@test.com';
		billTo.phoneNumber = '+44 2890447951';
		requestObj.billTo = billTo;

		var processingInformation = new cybersourceRestApi.TmsV1InstrumentIdentifiersPaymentInstrumentsGet200ResponseEmbeddedProcessingInformation();
		processingInformation.billPaymentProgramEnabled = true;
		var processingInformationBankTransferOptions = new cybersourceRestApi.TmsV1InstrumentIdentifiersPaymentInstrumentsGet200ResponseEmbeddedProcessingInformationBankTransferOptions();
		processingInformationBankTransferOptions.seCCode = 'WEB';
		processingInformation.bankTransferOptions = processingInformationBankTransferOptions;

		requestObj.processingInformation = processingInformation;

		var merchantInformation = new cybersourceRestApi.TmsV1InstrumentIdentifiersPaymentInstrumentsGet200ResponseEmbeddedMerchantInformation();
		var merchantInformationMerchantDescriptor = new cybersourceRestApi.TmsV1InstrumentIdentifiersPaymentInstrumentsGet200ResponseEmbeddedMerchantInformationMerchantDescriptor();
		merchantInformationMerchantDescriptor.alternateName = 'Branch Name';
		merchantInformation.merchantDescriptor = merchantInformationMerchantDescriptor;

		requestObj.merchantInformation = merchantInformation;

		var instrumentIdentifier = new cybersourceRestApi.TmsV1InstrumentIdentifiersPaymentInstrumentsGet200ResponseEmbeddedInstrumentIdentifier();
		var instrumentIdentifierBankAccount = new cybersourceRestApi.Tmsv1instrumentidentifiersBankAccount();
		instrumentIdentifierBankAccount.number = '4100';
		instrumentIdentifierBankAccount.routingNumber = '071923284';
		instrumentIdentifier.bankAccount = instrumentIdentifierBankAccount;

		requestObj.instrumentIdentifier = instrumentIdentifier;


		var instance = new cybersourceRestApi.PaymentInstrumentApi(configObject);

		instance.createPaymentInstrument( profileid, requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Create a Payment Instrument : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var profileid = readline.question("\nEnter missing header parameter <profile-id>: ");
		createPaymentInstrumentBankAccount(function () {
		console.log('\nCreatePaymentInstrument end.');
	},profileid);
}
module.exports.createPaymentInstrumentBankAccount = createPaymentInstrumentBankAccount;
