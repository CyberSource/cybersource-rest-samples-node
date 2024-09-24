'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

const {
    CreatePaymentRequest,
    Ptsv2paymentsClientReferenceInformation,
    Ptsv2paymentsClientReferenceInformationPartner,
    Ptsv2paymentsProcessingInformation,
    Ptsv2paymentsOrderInformation,
    Ptsv2paymentsOrderInformationAmountDetails,
    Ptsv2paymentsPointOfSaleInformation,
    Ptsv2paymentsPointOfSaleInformationEmv
  } = require('cybersource-rest-client');

function american_express_direct_emv_with_contact_read(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();


		// Create payment request object
const requestObj = new CreatePaymentRequest();

// Create and set client reference information
const clientReferenceInformation = new Ptsv2paymentsClientReferenceInformation();
clientReferenceInformation.code = "123456";

const clientReferenceInformationPartner = new Ptsv2paymentsClientReferenceInformationPartner();
clientReferenceInformationPartner.originalTransactionId = "510be4aef90711e6acbc7d88388d803d";
clientReferenceInformation.partner = clientReferenceInformationPartner;

requestObj.clientReferenceInformation = clientReferenceInformation;

// Create and set processing information
const processingInformation = new Ptsv2paymentsProcessingInformation();
processingInformation.capture = false;
processingInformation.commerceIndicator = "retail";

requestObj.processingInformation = processingInformation;

// Create and set order information
const orderInformation = new Ptsv2paymentsOrderInformation();
const orderInformationAmountDetails = new Ptsv2paymentsOrderInformationAmountDetails();
orderInformationAmountDetails.totalAmount = "100.00";
orderInformationAmountDetails.currency = "USD";
orderInformation.amountDetails = orderInformationAmountDetails;

requestObj.orderInformation = orderInformation;

// Create and set point of sale information
const pointOfSaleInformation = new Ptsv2paymentsPointOfSaleInformation();
pointOfSaleInformation.catLevel = 1;
pointOfSaleInformation.entryMode = "contact";
pointOfSaleInformation.terminalCapability = 4;

const pointOfSaleInformationEmv = new Ptsv2paymentsPointOfSaleInformationEmv();
pointOfSaleInformationEmv.tags = "9F3303204000950500000000009F3704518823719F100706011103A000009F26081E1756ED0E2134E29F36020015820200009C01009F1A0208409A030006219F02060000000020005F2A0208409F0306000000000000";
pointOfSaleInformationEmv.cardholderVerificationMethodUsed = 2;
pointOfSaleInformationEmv.cardSequenceNumber = "1";
pointOfSaleInformationEmv.fallback = false;

pointOfSaleInformation.emv = pointOfSaleInformationEmv;
pointOfSaleInformation.trackData = "%B4111111111111111^TEST/CYBS         ^2012121019761100      00868000000?;";

pointOfSaleInformation.cardholderVerificationMethod = ["pin", "signature"];
pointOfSaleInformation.terminalInputCapability = ["contact", "contactless", "keyed", "swiped"];
pointOfSaleInformation.terminalCardCaptureCapability = "1";
pointOfSaleInformation.deviceId = "123lkjdIOBK34981slviLI39bj";
pointOfSaleInformation.encryptedKeySerialNumber = "01043191";

requestObj.pointOfSaleInformation = pointOfSaleInformation;

console.log(JSON.stringify(requestObj, null, 2));


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
		american_express_direct_emv_with_contact_read(function () {
		console.log('\nCreatePayment end.');
	});
}
module.exports.american_express_direct_emv_with_contact_read = american_express_direct_emv_with_contact_read;
