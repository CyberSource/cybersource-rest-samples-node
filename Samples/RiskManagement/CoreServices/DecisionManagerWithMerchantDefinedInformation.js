'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function DecisionManagerWithMerchantDefinedInformation(callback) {
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
    
        var merchantDefinedInformation0 = new cybersourceRestApi.Riskv1decisionsMerchantDefinedInformation();
        merchantDefinedInformation0.key = "1";
        merchantDefinedInformation0.value = "Test";        

        var merchantDefinedInformation1 = new cybersourceRestApi.Riskv1decisionsMerchantDefinedInformation();
        merchantDefinedInformation1.key = "2";
        merchantDefinedInformation1.value = "Test2";

        var merchantDefinedInformation = new cybersourceRestApi.Riskv1decisionsMerchantDefinedInformation();
    	merchantDefinedInformation = [merchantDefinedInformation0, merchantDefinedInformation1];
        
		

	    var request = new cybersourceRestApi.CreateBundledDecisionManagerCaseRequest();
	    request.clientReferenceInformation = clientReferenceInformation;
	    request.paymentInformation = paymentInformation;
	    request.orderInformation =orderInformation;
	    request.merchantDefinedInformation = merchantDefinedInformation;

	    console.log('\n*************** DecisionManagerWithMerchantDefinedInformation ********************* ');

			instance.createBundledDecisionManagerCase(request, function (error, data, response) {
				if (error) {
					console.log('\nError in DecisionManagerWithMerchantDefinedInformation : ' + JSON.stringify(error));
				}
				else if (data) {
					console.log('\nData of DecisionManagerWithMerchantDefinedInformation : ' + JSON.stringify(data));
				}
				console.log('\nResponse of DecisionManagerWithMerchantDefinedInformation : ' + JSON.stringify(response));
				console.log('\nResponse Code of DecisionManagerWithMerchantDefinedInformation : ' + JSON.stringify(response['status']));
				callback(error, data);
			});
		} catch (error) {
			console.log(error);
		}
}

if (require.main === module) {
	DecisionManagerWithMerchantDefinedInformation(function () {
		console.log('\DecisionManagerWithMerchantDefinedInformation end.');
	}, false);
}
module.exports.DecisionManagerWithMerchantDefinedInformation = DecisionManagerWithMerchantDefinedInformation;