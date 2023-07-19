'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function create_subscription(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreateSubscriptionRequest();

		var clientReferenceInformation = new cybersourceRestApi.Rbsv1subscriptionsClientReferenceInformation();
		clientReferenceInformation.code = 'TC501713';
		var clientReferenceInformationPartner = new cybersourceRestApi.Riskv1decisionsClientReferenceInformationPartner();
		clientReferenceInformationPartner.developerId = 'ABCD1234';
		clientReferenceInformationPartner.solutionId = 'GEF1234';
		clientReferenceInformation.partner = clientReferenceInformationPartner;

		clientReferenceInformation.applicationName = 'CYBS-SDK';
		clientReferenceInformation.applicationVersion = 'v1';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var processingInformation = new cybersourceRestApi.Rbsv1subscriptionsProcessingInformation();
		processingInformation.commerceIndicator = 'recurring';
		var processingInformationAuthorizationOptions = new cybersourceRestApi.Rbsv1subscriptionsProcessingInformationAuthorizationOptions();
		var processingInformationAuthorizationOptionsInitiator = new cybersourceRestApi.Rbsv1subscriptionsProcessingInformationAuthorizationOptionsInitiator();
		processingInformationAuthorizationOptionsInitiator.type = 'merchant';
		processingInformationAuthorizationOptions.initiator = processingInformationAuthorizationOptionsInitiator;

		processingInformation.authorizationOptions = processingInformationAuthorizationOptions;

		requestObj.processingInformation = processingInformation;

		var subscriptionInformation = new cybersourceRestApi.Rbsv1subscriptionsSubscriptionInformation();
		subscriptionInformation.planId = '6868912495476705603955';
		subscriptionInformation.name = 'Subscription with PlanId';
		subscriptionInformation.startDate = '2024-06-11';
		requestObj.subscriptionInformation = subscriptionInformation;

		var paymentInformation = new cybersourceRestApi.Rbsv1subscriptionsPaymentInformation();
		var paymentInformationCustomer = new cybersourceRestApi.Rbsv1subscriptionsPaymentInformationCustomer();
		paymentInformationCustomer.id = 'C24F5921EB870D99E053AF598E0A4105';
		paymentInformation.customer = paymentInformationCustomer;

		requestObj.paymentInformation = paymentInformation;


		var instance = new cybersourceRestApi.SubscriptionsApi(configObject, apiClient);

		instance.createSubscription(requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Create a Subscription : ' + JSON.stringify(response['status']));

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
	create_subscription(function () {
		console.log('\nCreateSubscription end.');
	});
}

module.exports.create_subscription = create_subscription;