'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function DecisionManagerWithBuyerInformation(callback) {
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

        
        var buyerInformation = new cybersourceRestApi.Riskv1decisionsBuyerInformation();
        buyerInformation.hashedPassword = "";
        buyerInformation.dateOfBirth = "1998-05-05";

        var personalIdentification0 = new cybersourceRestApi.Ptsv2paymentsBuyerInformationPersonalIdentification();
        personalIdentification0.Type = "CPF";
        personalIdentification0.Id = "1a23apwe98";
        buyerInformation.personalIdentification = personalIdentification0;
	
	    var request = new cybersourceRestApi.CreateDecisionManagerCaseRequest();
	    request.clientReferenceInformation = clientReferenceInformation;
	    request.paymentInformation = paymentInformation;
	    request.orderInformation =orderInformation;
	    request.buyerInformation = buyerInformation;

	    console.log('\n*************** DecisionManagerWithBuyerInformation ********************* ');

			instance.createDecisionManagerCase(request, function (error, data, response) {
				if (error) {
					console.log('\nError in DecisionManagerWithBuyerInformation : ' + JSON.stringify(error));
				}
				else if (data) {
					console.log('\nData of DecisionManagerWithBuyerInformation : ' + JSON.stringify(data));
				}
				console.log('\nResponse of DecisionManagerWithBuyerInformation : ' + JSON.stringify(response));
				console.log('\nResponse Code of DecisionManagerWithBuyerInformation : ' + JSON.stringify(response['status']));
				callback(error, data);
			});
		} catch (error) {
			console.log(error);
		}
}

if (require.main === module) {
	DecisionManagerWithBuyerInformation(function () {
		console.log('\DecisionManagerWithBuyerInformation end.');
	}, false);
}
module.exports.DecisionManagerWithBuyerInformation = DecisionManagerWithBuyerInformation;