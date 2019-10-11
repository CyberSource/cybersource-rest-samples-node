'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function dMWithTravelInformation(callback) {
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

		var travelInformation = new cybersourceRestApi.Riskv1decisionsTravelInformation();
		travelInformation.completeRoute = 'SFO-JFK:JFK-BLR';
		travelInformation.departureTime = '2011-03-20 11:30pm GMT';
		travelInformation.journeyType = 'One way';

		var legs =  new Array();
		var  legs1 = new cybersourceRestApi.Riskv1decisionsTravelInformationLegs();
		legs1.origination = 'SFO';
		legs1.destination = 'JFK';
		legs.push(legs1);

		var  legs2 = new cybersourceRestApi.Riskv1decisionsTravelInformationLegs();
		legs2.origination = 'JFK';
		legs2.destination = 'BLR';
		legs.push(legs2);

		travelInformation.legs = legs;

		requestObj.travelInformation = travelInformation;


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
		dMWithTravelInformation(function () {
		console.log('\nCreateDecisionManagerCase end.');
	},);
}
module.exports.dMWithTravelInformation = dMWithTravelInformation;
