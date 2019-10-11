'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function dMWithBuyerInformation(callback) {
	try {
		var configObject = new configuration();
		var requestObj = new cybersourceRestApi.CreateDecisionManagerCaseRequest();

		var clientReferenceInformation = new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
		clientReferenceInformation.code = '54323007';
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

		var buyerInformation = new cybersourceRestApi.Riskv1decisionsBuyerInformation();
		buyerInformation.hashedPassword = '';
		buyerInformation.dateOfBirth = '19980505';

		var personalIdentification =  new Array();
		var  personalIdentification1 = new cybersourceRestApi.Ptsv2paymentsBuyerInformationPersonalIdentification();
		personalIdentification1.type = 'CPF';
		personalIdentification1.id = '1a23apwe98';
		personalIdentification.push(personalIdentification1);

		buyerInformation.personalIdentification = personalIdentification;

		requestObj.buyerInformation = buyerInformation;


		var instance = new cybersourceRestApi.DecisionManagerApi(configObject);

		instance.createDecisionManagerCase( requestObj, function (error, data, response) {
			if(error) {
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
		dMWithBuyerInformation(function () {
		console.log('\nCreateDecisionManagerCase end.');
	},);
}
module.exports.dMWithBuyerInformation = dMWithBuyerInformation;
