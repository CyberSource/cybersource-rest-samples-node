'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function EnrollWithTravelInformation(callback) {
	try {
			var configObject = new configuration();
			var instance = new cybersourceRestApi.PayerAuthenticationApi(configObject);

			var clientReferenceInformation = new cybersourceRestApi.Riskv1authenticationsClientReferenceInformation();
			clientReferenceInformation.code = 'cybs_test';

			var card = new cybersourceRestApi.Riskv1authenticationsPaymentInformationCard();
			card.number = '4000000000000101';
			card.expirationMonth = '12';
			card.expirationYear = '2025';
	    
			var paymentInformation = new cybersourceRestApi.Riskv1authenticationsPaymentInformation();
			paymentInformation.card = card;

			var amountDetails = new cybersourceRestApi.Riskv1decisionsOrderInformationAmountDetails();
			amountDetails.currency = 'USD';
			amountDetails.totalAmount = '10.99';


			var billTo = new cybersourceRestApi.Riskv1authenticationsOrderInformationBillTo();
			billTo.address1 = '1 Market St';
			billTo.address2 = 'Address 2';
			billTo.administrativeArea = 'CA';
			billTo.country = 'US';
			billTo.locality = 'san francisco';
			billTo.firstName = 'James';
			billTo.lastName = 'Doe';
			billTo.phoneNumber = '4158880000';
			billTo.email = 'test@cybs.com';
			billTo.postalCode = '94105';    

			var orderInformation = new cybersourceRestApi.Riskv1authenticationsOrderInformation();
			orderInformation.amountDetails = amountDetails;
			orderInformation.billTo = billTo;
			
			var leg0 = new cybersourceRestApi.Riskv1authenticationsTravelInformationLegs()
			leg0.carrierCode = "UA"
			leg0.departureDate = "2019-01-01"
			leg0.origination = "LAX"
			leg0.destination = "DEF"
			
			var travelInformation = new cybersourceRestApi.Riskv1authenticationsTravelInformation()

			var leg1 = new cybersourceRestApi.Riskv1authenticationsTravelInformationLegs()
			leg1.carrierCode = "AS"
			leg1.departureDate = "2019-02-21"
			leg1.origination = "ECF"
			leg1.destination = "RES"
			
			var legs = [leg0, leg1]
			travelInformation.legs = legs
			travelInformation.numberOfPassengers = "2"

			var passenger0 = new cybersourceRestApi.Riskv1authenticationsTravelInformationPassengers()
			passenger0.firstName = "Raj"
			passenger0.lastName = "Charles"

			var passenger1 = new cybersourceRestApi.Riskv1authenticationsTravelInformationPassengers()
			passenger1.firstName = "Potter"
			passenger1.lastName = "Suhember"

			var passengers = [passenger0,passenger1]
			travelInformation.passengers = passengers
        
			var buyerInformation = new cybersourceRestApi.Riskv1authenticationsBuyerInformation();
			buyerInformation.mobilePhone = '1245789632';

			var consumerAuthenticationInformation = new cybersourceRestApi.Riskv1authenticationsConsumerAuthenticationInformation();
			consumerAuthenticationInformation.transactionMode = 'MOTO';
	
			var request = new cybersourceRestApi.CheckPayerAuthEnrollmentRequest();
			request.clientReferenceInformation = clientReferenceInformation;
			request.paymentInformation = paymentInformation;
			request.orderInformation = orderInformation;
			request.buyerInformation = buyerInformation;
			request.consumerAuthenticationInformation = consumerAuthenticationInformation;
			request.travelInformation = travelInformation;

			console.log('\n*************** EnrollWithTravelInformation ********************* ');

			instance.checkPayerAuthEnrollment(request, function (error, data, response) {
				if (error) {
					console.log('\nError in EnrollWithTravelInformation : ' + JSON.stringify(error));
				}
				else if (data) {
					console.log('\nData of EnrollWithTravelInformation : ' + JSON.stringify(data));
				}
				console.log('\nResponse of EnrollWithTravelInformation : ' + JSON.stringify(response));
				console.log('\nResponse Code of EnrollWithTravelInformation : ' + JSON.stringify(response['status']));
				callback(error, data);
			});
		} catch (error) {
			console.log(error);
		}
}

if (require.main === module) {
	EnrollWithTravelInformation(function () {
		console.log('\EnrollWithTravelInformation end.');
	}, false);
}
module.exports.EnrollWithTravelInformation = EnrollWithTravelInformation;