'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function compliance_status_completed(callback) {
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

		var exportComplianceInformation = new cybersourceRestApi.Riskv1exportcomplianceinquiriesExportComplianceInformation();
		exportComplianceInformation.addressOperator = 'and';
		var exportComplianceInformationWeights = new cybersourceRestApi.Riskv1exportcomplianceinquiriesExportComplianceInformationWeights();
		exportComplianceInformationWeights.address = 'abc';
		exportComplianceInformationWeights.company = 'def';
		exportComplianceInformationWeights.name = 'adb';
		exportComplianceInformation.weights = exportComplianceInformationWeights;


		var sanctionLists = new Array();
		sanctionLists.push("abc");
		sanctionLists.push("acc");
		sanctionLists.push("bac");
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
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	compliance_status_completed(function () {
		console.log('\nValidateExportCompliance end.');
	});
}
module.exports.compliance_status_completed = compliance_status_completed;
