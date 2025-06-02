'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var createSubscription = require('../Subscriptions/create-subscription');

function update_subscription(callback, id) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.UpdateSubscription();

		var clientReferenceInformation = new cybersourceRestApi.Rbsv1subscriptionsClientReferenceInformation();
		clientReferenceInformation.code = 'APGHU';
		var clientReferenceInformationPartner = new cybersourceRestApi.Rbsv1subscriptionsClientReferenceInformationPartner();
		clientReferenceInformationPartner.developerId = 'ABCD1234';
		clientReferenceInformationPartner.solutionId = 'GEF1234';
		clientReferenceInformation.partner = clientReferenceInformationPartner;

		requestObj.clientReferenceInformation = clientReferenceInformation;

		var processingInformation = new cybersourceRestApi.Rbsv1subscriptionsProcessingInformation();
		var processingInformationAuthorizationOptions = new cybersourceRestApi.Rbsv1subscriptionsProcessingInformationAuthorizationOptions();
		var processingInformationAuthorizationOptionsInitiator = new cybersourceRestApi.Rbsv1subscriptionsProcessingInformationAuthorizationOptionsInitiator();
		processingInformationAuthorizationOptionsInitiator.type = 'merchant';
		processingInformationAuthorizationOptions.initiator = processingInformationAuthorizationOptionsInitiator;

		processingInformation.authorizationOptions = processingInformationAuthorizationOptions;

		requestObj.processingInformation = processingInformation;

		var subscriptionInformation = new cybersourceRestApi.Rbsv1subscriptionsidSubscriptionInformation();
		subscriptionInformation.planId = '6868912495476705603955';
		subscriptionInformation.name = 'Subscription with PlanId';
		subscriptionInformation.startDate = '2024-06-11';
		requestObj.subscriptionInformation = subscriptionInformation;

		var orderInformation = new cybersourceRestApi.Rbsv1subscriptionsidOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Rbsv1subscriptionsidOrderInformationAmountDetails();
		orderInformationAmountDetails.billingAmount = '10';
		orderInformationAmountDetails.setupFee = '5';
		orderInformation.amountDetails = orderInformationAmountDetails;

		requestObj.orderInformation = orderInformation;


		var instance = new cybersourceRestApi.SubscriptionsApi(configObject, apiClient);
		createSubscription.create_subscription(function (error, data) {
			if (data) {
				var id = data['id'];
				instance.updateSubscription(id, requestObj, function (error, data, response) {
					if(error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Update a Subscription : ' + JSON.stringify(response['status']));

					var status = response['status'];
					write_log_audit(status);
					callback(error, data, response);
				});
			}
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
	update_subscription(function () {
		console.log('\nUpdateSubscription end.');
	});
}

module.exports.update_subscription = update_subscription;