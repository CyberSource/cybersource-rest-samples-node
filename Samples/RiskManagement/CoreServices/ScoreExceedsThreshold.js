'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function ScoreExceedsThreshold(callback) {
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

	    var shipTo = new cybersourceRestApi.Riskv1decisionsOrderInformationShipTo();
        shipTo.address1 = "96, powers street";
        shipTo.address2 = "";
        shipTo.administrativeArea = "KA";
        shipTo.country = "INDIA";
        shipTo.locality = "Clearwater milford";
        shipTo.firstName = "James";
        shipTo.lastName = "Smith";
        shipTo.phoneNumber = "7606160717";
        shipTo.postalCode = "560056";

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
	    orderInformation.shipTo = shipTo;
		
	    var request = new cybersourceRestApi.CreateDecisionManagerCaseRequest();
	    request.clientReferenceInformation = clientReferenceInformation;
	    request.paymentInformation = paymentInformation;
	    request.orderInformation = orderInformation;

	    console.log('\n*************** ScoreExceedsThreshold ********************* ');

			instance.createDecisionManagerCase(request, function (error, data, response) {
				if (error) {
					console.log('\nError in ScoreExceedsThreshold : ' + JSON.stringify(error));
				}
				else if (data) {
					console.log('\nData of ScoreExceedsThresholdRequest : ' + JSON.stringify(data));
				}
				console.log('\nResponse of ScoreExceedsThresholdRequest : ' + JSON.stringify(response));
				console.log('\nResponse Code of ScoreExceedsThresholdRequest : ' + JSON.stringify(response['status']));
				callback(error, data);
			});
		} catch (error) {
			console.log(error);
		}
}

if (require.main === module) {
	ScoreExceedsThreshold(function () {
		console.log('\nScoreExceedsThreshold end.');
	}, false);
}
module.exports.ScoreExceedsThreshold = ScoreExceedsThreshold;