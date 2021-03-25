'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function add_data_to_list(callback) {
	var type = 'negative';

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
		orderInformationBillTo.email = 'test@example.com';
		orderInformation.billTo = orderInformationBillTo;

		requestObj.orderInformation = orderInformation;

		var paymentInformation = new cybersourceRestApi.Riskv1liststypeentriesPaymentInformation();
		requestObj.paymentInformation = paymentInformation;

		var clientReferenceInformation = new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
		clientReferenceInformation.code = '54323007';
		var clientReferenceInformationPartner = new cybersourceRestApi.Riskv1decisionsClientReferenceInformationPartner();
		clientReferenceInformationPartner.developerId = '7891234';
		clientReferenceInformationPartner.solutionId = '89012345';
		clientReferenceInformation.partner = clientReferenceInformationPartner;

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
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	add_data_to_list(function () {
		console.log('\nAddNegative end.');
	});
}
module.exports.add_data_to_list = add_data_to_list;
