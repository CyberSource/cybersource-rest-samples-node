'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function multiple_sanction_lists(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.ValidateExportComplianceRequest();

		var clientReferenceInformation = new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
		clientReferenceInformation.code = 'verification example';
		clientReferenceInformation.comments = 'All fields';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var orderInformation = new cybersourceRestApi.Riskv1exportcomplianceinquiriesOrderInformation();
		var orderInformationBillTo = new cybersourceRestApi.Riskv1exportcomplianceinquiriesOrderInformationBillTo();
		orderInformationBillTo.address1 = '901 Metro Centre Blvd';
		orderInformationBillTo.address2 = ' ';
		orderInformationBillTo.address3 = '';
		orderInformationBillTo.address4 = 'Foster City';
		orderInformationBillTo.administrativeArea = 'NH';
		orderInformationBillTo.country = 'US';
		orderInformationBillTo.locality = 'CA';
		orderInformationBillTo.postalCode = '03055';
		var orderInformationBillToCompany = new cybersourceRestApi.Riskv1exportcomplianceinquiriesOrderInformationBillToCompany();
		orderInformationBillToCompany.name = 'A & C International Trade, Inc.';
		orderInformationBillTo.company = orderInformationBillToCompany;

		orderInformationBillTo.firstName = 'Suman';
		orderInformationBillTo.lastName = 'Kumar';
		orderInformationBillTo.email = 'test@domain.com';
		orderInformation.billTo = orderInformationBillTo;

		var orderInformationShipTo = new cybersourceRestApi.Riskv1exportcomplianceinquiriesOrderInformationShipTo();
		orderInformationShipTo.country = 'IN';
		orderInformationShipTo.firstName = 'DumbelDore';
		orderInformationShipTo.lastName = 'Albus';
		orderInformation.shipTo = orderInformationShipTo;


		var lineItems = new Array();
		var lineItems1 = new cybersourceRestApi.Riskv1exportcomplianceinquiriesOrderInformationLineItems();
		lineItems1.unitPrice = '120.50';
		lineItems1.quantity = 3;
		lineItems1.productSKU = '610009';
		lineItems1.productName = 'Xer';
		lineItems1.productCode = 'physical_software';
		lineItems.push(lineItems1);

		orderInformation.lineItems = lineItems;

		requestObj.orderInformation = orderInformation;

		var buyerInformation = new cybersourceRestApi.Riskv1addressverificationsBuyerInformation();
		buyerInformation.merchantCustomerId = 'Export1';
		requestObj.buyerInformation = buyerInformation;

		var deviceInformation = new cybersourceRestApi.Riskv1exportcomplianceinquiriesDeviceInformation();
		deviceInformation.ipAddress = '127.0.0.1';
		deviceInformation.hostName = 'www.cybersource.ir';
		requestObj.deviceInformation = deviceInformation;

		var exportComplianceInformation = new cybersourceRestApi.Riskv1exportcomplianceinquiriesExportComplianceInformation();
		exportComplianceInformation.addressOperator = 'and';
		var exportComplianceInformationWeights = new cybersourceRestApi.Riskv1exportcomplianceinquiriesExportComplianceInformationWeights();
		exportComplianceInformationWeights.address = 'low';
		exportComplianceInformationWeights.company = 'exact';
		exportComplianceInformationWeights.name = 'exact';
		exportComplianceInformation.weights = exportComplianceInformationWeights;


		var sanctionLists = new Array();
		sanctionLists.push("Bureau Of Industry and Security");
		sanctionLists.push("DOS_DTC");
		sanctionLists.push("AUSTRALIA");
		exportComplianceInformation.sanctionLists = sanctionLists;

		requestObj.exportComplianceInformation = exportComplianceInformation;


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
	multiple_sanction_lists(function () {
		console.log('\nValidateExportCompliance end.');
	});
}
module.exports.multiple_sanction_lists = multiple_sanction_lists;
