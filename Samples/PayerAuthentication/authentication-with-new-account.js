'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function authentication_with_new_account(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CheckPayerAuthEnrollmentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Riskv1authenticationsClientReferenceInformation();
		clientReferenceInformation.code = 'New Account';
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
		paymentInformationCard.type = '001';
		paymentInformationCard.expirationMonth = '12';
		paymentInformationCard.expirationYear = '2025';
		paymentInformationCard.number = '4000990000000004';
		paymentInformation.card = paymentInformationCard;

		requestObj.paymentInformation = paymentInformation;

		var consumerAuthenticationInformation = new cybersourceRestApi.Riskv1authenticationsConsumerAuthenticationInformation();
		consumerAuthenticationInformation.transactionMode = 'MOTO';
		requestObj.consumerAuthenticationInformation = consumerAuthenticationInformation;

		var riskInformation = new cybersourceRestApi.Riskv1authenticationsRiskInformation();
		var riskInformationBuyerHistory = new cybersourceRestApi.Ptsv2paymentsRiskInformationBuyerHistory();
		var riskInformationBuyerHistoryCustomerAccount = new cybersourceRestApi.Ptsv2paymentsRiskInformationBuyerHistoryCustomerAccount();
		riskInformationBuyerHistoryCustomerAccount.creationHistory = 'NEW_ACCOUNT';
		riskInformationBuyerHistory.customerAccount = riskInformationBuyerHistoryCustomerAccount;

		var riskInformationBuyerHistoryAccountHistory = new cybersourceRestApi.Ptsv2paymentsRiskInformationBuyerHistoryAccountHistory();
		riskInformationBuyerHistoryAccountHistory.firstUseOfShippingAddress = false;
		riskInformationBuyerHistory.accountHistory = riskInformationBuyerHistoryAccountHistory;

		riskInformation.buyerHistory = riskInformationBuyerHistory;

		requestObj.riskInformation = riskInformation;


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
		authentication_with_new_account(function () {
		console.log('\nCheckPayerAuthEnrollment end.');
	});
}
module.exports.authentication_with_new_account = authentication_with_new_account;
