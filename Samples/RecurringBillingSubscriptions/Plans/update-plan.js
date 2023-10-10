'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var createPlan = require('../Plans/create-plan');

function update_plan(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.UpdatePlanRequest();

		var planInformation = new cybersourceRestApi.Rbsv1plansidPlanInformation();
		planInformation.name = 'Gold Plan NA';
		planInformation.description = 'Updated Gold Plan';
		var planInformationBillingPeriod = new cybersourceRestApi.GetAllPlansResponsePlanInformationBillingPeriod();
		planInformationBillingPeriod.length = '2';
		planInformationBillingPeriod.unit = 'W';
		planInformation.billingPeriod = planInformationBillingPeriod;

		var planInformationBillingCycles = new cybersourceRestApi.Rbsv1plansPlanInformationBillingCycles();
		planInformationBillingCycles.total = '11';
		planInformation.billingCycles = planInformationBillingCycles;

		requestObj.planInformation = planInformation;

		var processingInformation = new cybersourceRestApi.Rbsv1plansidProcessingInformation();
		var processingInformationSubscriptionBillingOptions = new cybersourceRestApi.Rbsv1plansidProcessingInformationSubscriptionBillingOptions();
		processingInformationSubscriptionBillingOptions.applyTo = 'ALL';
		processingInformation.subscriptionBillingOptions = processingInformationSubscriptionBillingOptions;

		requestObj.processingInformation = processingInformation;

		var orderInformation = new cybersourceRestApi.GetAllPlansResponseOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.GetAllPlansResponseOrderInformationAmountDetails();
		orderInformationAmountDetails.currency = 'USD';
		orderInformationAmountDetails.billingAmount = '11';
		orderInformationAmountDetails.setupFee = '2';
		orderInformation.amountDetails = orderInformationAmountDetails;

		requestObj.orderInformation = orderInformation;


		var instance = new cybersourceRestApi.PlansApi(configObject, apiClient);
		createPlan.create_plan(function (error, data) {
			if (data) {
				var id = data['id'];
				instance.updatePlan(id, requestObj, function (error, data, response) {
					if(error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Update a Plan : ' + JSON.stringify(response['status']));

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
	update_plan(function () {
		console.log('\nUpdatePlan end.');
	});
}

module.exports.update_plan = update_plan;