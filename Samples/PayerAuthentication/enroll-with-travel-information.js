'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function enroll_with_travel_information(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CheckPayerAuthEnrollmentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Riskv1authenticationsClientReferenceInformation();
		clientReferenceInformation.code = 'cybs_test';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var orderInformation = new cybersourceRestApi.Riskv1authenticationsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Riskv1decisionsOrderInformationAmountDetails();
		orderInformationAmountDetails.currency = 'USD';
		orderInformationAmountDetails.totalAmount = '10.99';
		orderInformation.amountDetails = orderInformationAmountDetails;

		var orderInformationBillTo = new cybersourceRestApi.Riskv1authenticationsOrderInformationBillTo();
		orderInformationBillTo.address1 = '1 Market St';
		orderInformationBillTo.address2 = 'Address 2';
		orderInformationBillTo.administrativeArea = 'CA';
		orderInformationBillTo.country = 'US';
		orderInformationBillTo.locality = 'san francisco';
		orderInformationBillTo.firstName = 'John';
		orderInformationBillTo.lastName = 'Doe';
		orderInformationBillTo.phoneNumber = '4158880000';
		orderInformationBillTo.email = 'test@cybs.com';
		orderInformationBillTo.postalCode = '94105';
		orderInformation.billTo = orderInformationBillTo;

		requestObj.orderInformation = orderInformation;

		var paymentInformation = new cybersourceRestApi.Riskv1authenticationsPaymentInformation();
		var paymentInformationCard = new cybersourceRestApi.Riskv1authenticationsPaymentInformationCard();
		paymentInformationCard.type = '002';
		paymentInformationCard.expirationMonth = '12';
		paymentInformationCard.expirationYear = '2025';
		paymentInformationCard.number = '5200340000000015';
		paymentInformation.card = paymentInformationCard;

		requestObj.paymentInformation = paymentInformation;

		var buyerInformation = new cybersourceRestApi.Riskv1authenticationsBuyerInformation();
		buyerInformation.mobilePhone = 1245789632;
		requestObj.buyerInformation = buyerInformation;

		var consumerAuthenticationInformation = new cybersourceRestApi.Riskv1authenticationsConsumerAuthenticationInformation();
		consumerAuthenticationInformation.transactionMode = 'MOTO';
		requestObj.consumerAuthenticationInformation = consumerAuthenticationInformation;

		var travelInformation = new cybersourceRestApi.Riskv1authenticationsTravelInformation();

		var legs =  new Array();
		var  legs1 = new cybersourceRestApi.Riskv1authenticationsTravelInformationLegs();
		legs1.destination = 'DEF';
		legs1.carrierCode = 'UA';
		legs1.departureDate = '2019-01-01';
		legs.push(legs1);

		var  legs2 = new cybersourceRestApi.Riskv1authenticationsTravelInformationLegs();
		legs2.destination = 'RES';
		legs2.carrierCode = 'AS';
		legs2.departureDate = '2019-02-21';
		legs.push(legs2);

		travelInformation.legs = legs;

		travelInformation.numberOfPassengers = 2;

		var passengers =  new Array();
		var  passengers1 = new cybersourceRestApi.Riskv1authenticationsTravelInformationPassengers();
		passengers1.firstName = 'Raj';
		passengers1.lastName = 'Charles';
		passengers.push(passengers1);

		var  passengers2 = new cybersourceRestApi.Riskv1authenticationsTravelInformationPassengers();
		passengers2.firstName = 'Potter';
		passengers2.lastName = 'Suhember';
		passengers.push(passengers2);

		travelInformation.passengers = passengers;

		requestObj.travelInformation = travelInformation;


		var instance = new cybersourceRestApi.PayerAuthenticationApi(configObject, apiClient);

		instance.checkPayerAuthEnrollment( requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Check Payer Auth Enrollment : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		enroll_with_travel_information(function () {
		console.log('\nCheckPayerAuthEnrollment end.');
	});
}
module.exports.enroll_with_travel_information = enroll_with_travel_information;
