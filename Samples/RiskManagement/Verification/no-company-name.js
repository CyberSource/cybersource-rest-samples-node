'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function no_company_name(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.ValidateExportComplianceRequest();

		var clientReferenceInformation = new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
		clientReferenceInformation.code = 'verification example';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var orderInformation = new cybersourceRestApi.Riskv1exportcomplianceinquiriesOrderInformation();
		var orderInformationBillTo = new cybersourceRestApi.Riskv1exportcomplianceinquiriesOrderInformationBillTo();
		orderInformationBillTo.address1 = '901 Metro Centre Blvd';
		orderInformationBillTo.address2 = '2';
		orderInformationBillTo.administrativeArea = 'CA';
		orderInformationBillTo.country = 'US';
		orderInformationBillTo.locality = 'Foster City';
		orderInformationBillTo.postalCode = '94404';
		orderInformationBillTo.firstName = 'Suman';
		orderInformationBillTo.lastName = 'Kumar';
		orderInformationBillTo.email = 'donewithhorizon@test.com';
		orderInformation.billTo = orderInformationBillTo;

		var orderInformationShipTo = new cybersourceRestApi.Riskv1exportcomplianceinquiriesOrderInformationShipTo();
		orderInformationShipTo.country = 'be';
		orderInformationShipTo.firstName = 'DumbelDore';
		orderInformationShipTo.lastName = 'Albus';
		orderInformation.shipTo = orderInformationShipTo;


		var lineItems = new Array();
		var lineItems1 = new cybersourceRestApi.Riskv1exportcomplianceinquiriesOrderInformationLineItems();
		lineItems1.unitPrice = '19.00';
		lineItems.push(lineItems1);

		orderInformation.lineItems = lineItems;

		requestObj.orderInformation = orderInformation;

		var buyerInformation = new cybersourceRestApi.Riskv1addressverificationsBuyerInformation();
		buyerInformation.merchantCustomerId = '87789';
		requestObj.buyerInformation = buyerInformation;


		var instance = new cybersourceRestApi.VerificationApi(configObject, apiClient);

		instance.validateExportCompliance(requestObj, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Validate export compliance : ' + JSON.stringify(response['status']));
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
	no_company_name(function () {
		console.log('\nValidateExportCompliance end.');
	});
}
module.exports.no_company_name = no_company_name;
