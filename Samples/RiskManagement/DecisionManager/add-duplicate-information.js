'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function add_duplicate_information(callback) {
	var type = 'positive';

	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.AddNegativeListRequest();

		var orderInformation = new cybersourceRestApi.Riskv1liststypeentriesOrderInformation();
		var orderInformationAddress = new cybersourceRestApi.Riskv1liststypeentriesOrderInformationAddress();
		orderInformationAddress.address1 = '1234 Sample St.';
		orderInformationAddress.address2 = 'Mountain View';
		orderInformationAddress.locality = 'California';
		orderInformationAddress.country = 'US';
		orderInformationAddress.administrativeArea = 'CA';
		orderInformationAddress.postalCode = '94043';
		orderInformation.address = orderInformationAddress;

		var orderInformationBillTo = new cybersourceRestApi.Riskv1liststypeentriesOrderInformationBillTo();
		orderInformationBillTo.firstName = 'John';
		orderInformationBillTo.lastName = 'Doe';
		orderInformationBillTo.email = 'nobody@example.com';
		orderInformation.billTo = orderInformationBillTo;

		requestObj.orderInformation = orderInformation;

		var paymentInformation = new cybersourceRestApi.Riskv1liststypeentriesPaymentInformation();
		requestObj.paymentInformation = paymentInformation;

		var clientReferenceInformation = new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
		clientReferenceInformation.code = '54323007';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var riskInformation = new cybersourceRestApi.Riskv1liststypeentriesRiskInformation();
		var riskInformationMarkingDetails = new cybersourceRestApi.Riskv1liststypeentriesRiskInformationMarkingDetails();
		riskInformationMarkingDetails.action = 'add';
		riskInformation.markingDetails = riskInformationMarkingDetails;

		requestObj.riskInformation = riskInformation;


		var instance = new cybersourceRestApi.DecisionManagerApi(configObject, apiClient);

		instance.addNegative(type, requestObj, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of List Management : ' + JSON.stringify(response['status']));
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
	add_duplicate_information(function () {
		console.log('\nAddNegative end.');
	});
}
module.exports.add_duplicate_information = add_duplicate_information;
