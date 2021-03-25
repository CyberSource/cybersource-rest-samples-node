'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function basic_dm_transaction(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreateBundledDecisionManagerCaseRequest();

		var clientReferenceInformation = new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
		clientReferenceInformation.code = '54323007';
		clientReferenceInformation.comments = 'decision manager case';
		var clientReferenceInformationPartner = new cybersourceRestApi.Riskv1decisionsClientReferenceInformationPartner();
		clientReferenceInformationPartner.developerId = '7891234';
		clientReferenceInformationPartner.solutionId = '89012345';
		clientReferenceInformation.partner = clientReferenceInformationPartner;

		requestObj.clientReferenceInformation = clientReferenceInformation;

		var paymentInformation = new cybersourceRestApi.Riskv1decisionsPaymentInformation();
		var paymentInformationCard = new cybersourceRestApi.Riskv1decisionsPaymentInformationCard();
		paymentInformationCard.number = '4444444444444448';
		paymentInformationCard.expirationMonth = '12';
		paymentInformationCard.expirationYear = '2020';
		paymentInformation.card = paymentInformationCard;

		requestObj.paymentInformation = paymentInformation;

		var orderInformation = new cybersourceRestApi.Riskv1decisionsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Riskv1decisionsOrderInformationAmountDetails();
		orderInformationAmountDetails.currency = 'USD';
		orderInformationAmountDetails.totalAmount = '144.14';
		orderInformation.amountDetails = orderInformationAmountDetails;

		var orderInformationBillTo = new cybersourceRestApi.Riskv1decisionsOrderInformationBillTo();
		orderInformationBillTo.address1 = '96, powers street';
		orderInformationBillTo.administrativeArea = 'NH';
		orderInformationBillTo.country = 'US';
		orderInformationBillTo.locality = 'Clearwater milford';
		orderInformationBillTo.firstName = 'James';
		orderInformationBillTo.lastName = 'Smith';
		orderInformationBillTo.phoneNumber = '7606160717';
		orderInformationBillTo.email = 'test@visa.com';
		orderInformationBillTo.postalCode = '03055';
		orderInformation.billTo = orderInformationBillTo;

		requestObj.orderInformation = orderInformation;


		var instance = new cybersourceRestApi.DecisionManagerApi(configObject, apiClient);

		instance.createBundledDecisionManagerCase( requestObj, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Create Decision Manager Case : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	basic_dm_transaction(function () {
		console.log('\nCreateBundledDecisionManagerCase end.');
	});
}
module.exports.basic_dm_transaction = basic_dm_transaction;
