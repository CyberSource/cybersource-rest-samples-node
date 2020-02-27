'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function addressMatchNotFound(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.VerifyCustomerAddressRequest();

		var clientReferenceInformation = new cybersourceRestApi.Riskv1addressverificationsClientReferenceInformation();
		clientReferenceInformation.code = 'addressEg';
		clientReferenceInformation.comments = 'dav-error response check';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var orderInformation = new cybersourceRestApi.Riskv1addressverificationsOrderInformation();
		var orderInformationBillTo = new cybersourceRestApi.Riskv1addressverificationsOrderInformationBillTo();
		orderInformationBillTo.address1 = 'Apt C ';
		orderInformationBillTo.address2 = '';
		orderInformationBillTo.administrativeArea = 'California';
		orderInformationBillTo.country = 'US';
		orderInformationBillTo.locality = 'Glendale';
		orderInformationBillTo.postalCode = '91204';
		orderInformation.billTo = orderInformationBillTo;

		requestObj.orderInformation = orderInformation;


		var instance = new cybersourceRestApi.VerificationApi(configObject, apiClient);

		instance.verifyCustomerAddress( requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Verify customer address : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		addressMatchNotFound(function () {
		console.log('\nVerifyCustomerAddress end.');
	},);
}
module.exports.addressMatchNotFound = addressMatchNotFound;
