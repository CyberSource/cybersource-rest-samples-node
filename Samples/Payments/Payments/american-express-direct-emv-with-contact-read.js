'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function american_express_direct_emv_with_contact_read(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreatePaymentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = '123456';
		var clientReferenceInformationPartner = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformationPartner();
		clientReferenceInformationPartner.originalTransactionId = '510be4aef90711e6acbc7d88388d803d';
		clientReferenceInformation.partner = clientReferenceInformationPartner;

		requestObj.clientReferenceInformation = clientReferenceInformation;

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
		processingInformation.capture = false;
		processingInformation.commerceIndicator = 'retail';
		requestObj.processingInformation = processingInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '100.00';
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		requestObj.orderInformation = orderInformation;

		var pointOfSaleInformation = new cybersourceRestApi.Ptsv2paymentsPointOfSaleInformation();
		pointOfSaleInformation.catLevel = 1;
		pointOfSaleInformation.entryMode = 'contact';
		pointOfSaleInformation.terminalCapability = 4;
		var pointOfSaleInformationEmv = new cybersourceRestApi.Ptsv2paymentsPointOfSaleInformationEmv();
		pointOfSaleInformationEmv.tags = '9F3303204000950500000000009F3704518823719F100706011103A000009F26081E1756ED0E2134E29F36020015820200009C01009F1A0208409A030006219F02060000000020005F2A0208409F0306000000000000';
		pointOfSaleInformationEmv.cardholderVerificationMethodUsed = 2;
		pointOfSaleInformationEmv.cardSequenceNumber = '1';
		pointOfSaleInformationEmv.fallback = false;
		pointOfSaleInformation.emv = pointOfSaleInformationEmv;

		pointOfSaleInformation.trackData = '%B4111111111111111^TEST/CYBS         ^2012121019761100      00868000000?;';

		var cardholderVerificationMethod = new Array();
		cardholderVerificationMethod.push("pin");
		cardholderVerificationMethod.push("signature");
		pointOfSaleInformation.cardholderVerificationMethod = cardholderVerificationMethod;


		var terminalInputCapability = new Array();
		terminalInputCapability.push("contact");
		terminalInputCapability.push("contactless");
		terminalInputCapability.push("keyed");
		terminalInputCapability.push("swiped");
		pointOfSaleInformation.terminalInputCapability = terminalInputCapability;

		pointOfSaleInformation.terminalCardCaptureCapability = '1';
		pointOfSaleInformation.deviceId = '123lkjdIOBK34981slviLI39bj';
		pointOfSaleInformation.encryptedKeySerialNumber = '01043191';
		requestObj.pointOfSaleInformation = pointOfSaleInformation;


		var instance = new cybersourceRestApi.PaymentsApi(configObject, apiClient);

		instance.createPayment( requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Process a Payment : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		american_express_direct_emv_with_contact_read(function () {
		console.log('\nCreatePayment end.');
	});
}
module.exports.american_express_direct_emv_with_contact_read = american_express_direct_emv_with_contact_read;
