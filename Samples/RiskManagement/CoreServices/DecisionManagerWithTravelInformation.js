'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function DecisionManagerWithTravelInformation(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.DecisionManagerApi(configObject);

		var clientReferenceInformation = new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
		clientReferenceInformation.code = '54323007';

		var card = new cybersourceRestApi.Riskv1decisionsPaymentInformationCard();
	    card.number = '4444444444444448';
	    card.expirationMonth = '12';
	    card.expirationYear = '2020';
	    
	    var paymentInformation = new cybersourceRestApi.Riskv1decisionsPaymentInformation();
	    paymentInformation.card = card;

	    var amountDetails = new cybersourceRestApi.Riskv1decisionsOrderInformationAmountDetails();
	    amountDetails.currency = 'USD';
	    amountDetails.totalAmount = '144.14';

	    var billTo = new cybersourceRestApi.Riskv1decisionsOrderInformationBillTo();
	    billTo.address1 = '96, powers street';
	    billTo.administrativeArea = 'NH';
	    billTo.country = 'US';
	    billTo.locality = 'Clearwater milford';
	    billTo.firstName = 'James';
	    billTo.lastName = 'Smith';
	    billTo.phoneNumber = '7606160717';
	    billTo.email = 'test@visa.com';
	    billTo.postalCode = '03055';    

	    var orderInformation = new cybersourceRestApi.Riskv1decisionsOrderInformation();
	    orderInformation.amountDetails = amountDetails;
	    orderInformation.billTo = billTo;
		
	    var legs0 = new cybersourceRestApi.Riskv1decisionsTravelInformationLegs();
        legs0.Origination = "SFO";
        legs0.Destination = "JFK";

        var legs1 = new cybersourceRestApi.Riskv1decisionsTravelInformationLegs();
        legs1.Origination = "JFK";
        legs1.Destination = "BLR";
        var legs = new cybersourceRestApi.Riskv1decisionsTravelInformationLegs();
        legs = [legs0, legs1]

	    var travelInformation = new cybersourceRestApi.Riskv1decisionsTravelInformation();
        travelInformation.completeRoute = "SFO-JFK:JFK-BLR";
        travelInformation.departureTime = "2011-03-20 11:30pm GMT";
        travelInformation.journeyType = "One way";
        travelInformation.legs = legs;

	    var request = new cybersourceRestApi.CreateBundledDecisionManagerCaseRequest();
	    request.clientReferenceInformation = clientReferenceInformation;
	    request.paymentInformation = paymentInformation;
	    request.orderInformation = orderInformation;
	    request.travelInformation = travelInformation;

	    console.log('\n*************** DecisionManagerWithTravelInformation ********************* ');

			instance.createBundledDecisionManagerCase(request, function (error, data, response) {
				if (error) {
					console.log('\nError in DecisionManagerWithTravelInformation : ' + JSON.stringify(error));
				}
				else if (data) {
					console.log('\nData of DecisionManagerWithTravelInformation : ' + JSON.stringify(data));
				}
				console.log('\nResponse of DecisionManagerWithTravelInformation : ' + JSON.stringify(response));
				console.log('\nResponse Code of DecisionManagerWithTravelInformation : ' + JSON.stringify(response['status']));
				callback(error, data);
			});
		} catch (error) {
			console.log(error);
		}
}

if (require.main === module) {
	DecisionManagerWithTravelInformation(function () {
		console.log('\DecisionManagerWithTravelInformation end.');
	}, false);
}
module.exports.DecisionManagerWithTravelInformation = DecisionManagerWithTravelInformation;