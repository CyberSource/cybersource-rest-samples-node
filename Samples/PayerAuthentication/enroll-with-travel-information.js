'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
const { faker, fa } = require('@faker-js/faker');

function enroll_with_travel_information(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CheckPayerAuthEnrollmentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Riskv1authenticationsetupsClientReferenceInformation();
		clientReferenceInformation.code = faker.string.uuid();
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var orderInformation = new cybersourceRestApi.Riskv1authenticationsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Riskv1authenticationsOrderInformationAmountDetails();
		orderInformationAmountDetails.currency = 'USD';
		orderInformationAmountDetails.totalAmount = faker.commerce.price({ min: 10, max: 500 });
		orderInformation.amountDetails = orderInformationAmountDetails;

		var orderInformationBillTo = new cybersourceRestApi.Riskv1authenticationsOrderInformationBillTo();
		var fName = faker.person.firstName();
        var lName = faker.person.lastName();
		orderInformationBillTo.address1 = faker.location.streetAddress();
		orderInformationBillTo.address2 = faker.location.secondaryAddress();
		orderInformationBillTo.administrativeArea = faker.location.state();
		orderInformationBillTo.country = 'US';
		orderInformationBillTo.locality = faker.location.city();
		orderInformationBillTo.firstName = fName;
		orderInformationBillTo.lastName = lName;
		orderInformationBillTo.phoneNumber = faker.string.numeric(10);
		orderInformationBillTo.email = faker.internet.email({firstName:fName,lastName:lName});
		orderInformationBillTo.postalCode = faker.location.zipCode();
		orderInformation.billTo = orderInformationBillTo;

		requestObj.orderInformation = orderInformation;

		var paymentInformation = new cybersourceRestApi.Riskv1authenticationsPaymentInformation();
		var paymentInformationCard = new cybersourceRestApi.Riskv1authenticationsetupsPaymentInformationCard();
		var dt = new Date();
        var expYear = dt.getFullYear()+4;
		paymentInformationCard.type = '002';
		paymentInformationCard.expirationMonth = '12';
		paymentInformationCard.expirationYear = expYear;
		paymentInformationCard.number = '5200340000000015';
		paymentInformation.card = paymentInformationCard;

		requestObj.paymentInformation = paymentInformation;

		var buyerInformation = new cybersourceRestApi.Riskv1authenticationsBuyerInformation();
		buyerInformation.mobilePhone = 1245789632;
		requestObj.buyerInformation = buyerInformation;

		var consumerAuthenticationInformation = new cybersourceRestApi.Riskv1decisionsConsumerAuthenticationInformation();
		consumerAuthenticationInformation.transactionMode = 'MOTO';
		requestObj.consumerAuthenticationInformation = consumerAuthenticationInformation;

		var travelInformation = new cybersourceRestApi.Riskv1authenticationsTravelInformation();

		var legs =	new Array();
		var	legs1 = new cybersourceRestApi.Riskv1decisionsTravelInformationLegs();
		legs1.destination = 'DEF';
		legs1.carrierCode = 'UA';
		legs1.departureDate = expYear+'-01-01';
		legs.push(legs1);

		var	legs2 = new cybersourceRestApi.Riskv1decisionsTravelInformationLegs();
		legs2.destination = 'RES';
		legs2.carrierCode = 'AS';
		legs2.departureDate = expYear+'-02-21';
		legs.push(legs2);

		travelInformation.legs = legs;

		travelInformation.numberOfPassengers = 2;

		var passengers =	new Array();
		var	passengers1 = new cybersourceRestApi.Riskv1decisionsTravelInformationPassengers();
		passengers1.firstName = faker.person.firstName();
		passengers1.lastName = faker.person.lastName();
		passengers.push(passengers1);

		var	passengers2 = new cybersourceRestApi.Riskv1decisionsTravelInformationPassengers();
		passengers2.firstName = faker.person.firstName();
		passengers2.lastName = faker.person.lastName();
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
		enroll_with_travel_information(function () {
		console.log('\nCheckPayerAuthEnrollment end.');
	});
}
module.exports.enroll_with_travel_information = enroll_with_travel_information;
