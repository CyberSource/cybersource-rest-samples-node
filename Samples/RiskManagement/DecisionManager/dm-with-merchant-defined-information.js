'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
const { faker, fa } = require('@faker-js/faker');

function dm_with_merchant_defined_information(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreateBundledDecisionManagerCaseRequest();

		var clientReferenceInformation = new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
		clientReferenceInformation.code = faker.string.uuid();
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var paymentInformation = new cybersourceRestApi.Riskv1decisionsPaymentInformation();
		var paymentInformationCard = new cybersourceRestApi.Riskv1decisionsPaymentInformationCard();
		var dt = new Date();
        var expYear = dt.getFullYear()+4;
		paymentInformationCard.number = faker.finance.creditCardNumber({issuer: '414720#########L'});
		paymentInformationCard.expirationMonth = '12';
		paymentInformationCard.expirationYear = expYear;
		paymentInformation.card = paymentInformationCard;

		requestObj.paymentInformation = paymentInformation;

		var orderInformation = new cybersourceRestApi.Riskv1decisionsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Riskv1decisionsOrderInformationAmountDetails();
		orderInformationAmountDetails.currency = 'USD';
		orderInformationAmountDetails.totalAmount = faker.commerce.price({ min: 100, max: 500 });
		orderInformation.amountDetails = orderInformationAmountDetails;

		var orderInformationBillTo = new cybersourceRestApi.Riskv1decisionsOrderInformationBillTo();
		var fName = faker.person.firstName();
        var lName = faker.person.lastName();
		orderInformationBillTo.firstName = fName;
		orderInformationBillTo.lastName = lName;
		orderInformationBillTo.address1 = faker.location.streetAddress();
		orderInformationBillTo.locality = faker.location.city();
		orderInformationBillTo.administrativeArea = faker.location.state();
		orderInformationBillTo.postalCode = faker.location.zipCode();
		orderInformationBillTo.country = 'US';
		orderInformationBillTo.email = faker.internet.email({firstName:fName,lastName:lName});
		orderInformationBillTo.phoneNumber = faker.string.numeric(10);
		orderInformation.billTo = orderInformationBillTo;

		requestObj.orderInformation = orderInformation;


		var merchantDefinedInformation = new Array();
		var merchantDefinedInformation1 = new cybersourceRestApi.Riskv1decisionsMerchantDefinedInformation();
		merchantDefinedInformation1.key = '1';
		merchantDefinedInformation1.value = faker.word.noun();
		merchantDefinedInformation.push(merchantDefinedInformation1);

		var merchantDefinedInformation2 = new cybersourceRestApi.Riskv1decisionsMerchantDefinedInformation();
		merchantDefinedInformation2.key = '2';
		merchantDefinedInformation2.value = faker.word.verb();
		merchantDefinedInformation.push(merchantDefinedInformation2);

		requestObj.merchantDefinedInformation = merchantDefinedInformation;


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
	dm_with_merchant_defined_information(function () {
		console.log('\nCreateBundledDecisionManagerCase end.');
	});
}
module.exports.dm_with_merchant_defined_information = dm_with_merchant_defined_information;
