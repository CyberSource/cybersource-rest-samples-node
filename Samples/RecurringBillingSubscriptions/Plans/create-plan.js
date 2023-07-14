'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function create_plan(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreatePlanRequest();

		var planInformation = new cybersourceRestApi.Rbsv1plansPlanInformation();
		planInformation.name = 'Gold Plan 1';
		planInformation.description = 'New Gold Plan 1';
		var planInformationBillingPeriod = new cybersourceRestApi.InlineResponse200PlanInformationBillingPeriod();
		planInformationBillingPeriod.length = '1';
		planInformationBillingPeriod.unit = 'M';
		planInformation.billingPeriod = planInformationBillingPeriod;

		var planInformationBillingCycles = new cybersourceRestApi.Rbsv1plansPlanInformationBillingCycles();
		planInformationBillingCycles.total = '12';
		planInformation.billingCycles = planInformationBillingCycles;

		requestObj.planInformation = planInformation;

		var orderInformation = new cybersourceRestApi.Rbsv1plansOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Rbsv1plansOrderInformationAmountDetails();
		orderInformationAmountDetails.currency = 'USD';
		orderInformationAmountDetails.billingAmount = '10';
		orderInformationAmountDetails.setupFee = '2';
		orderInformation.amountDetails = orderInformationAmountDetails;

		requestObj.orderInformation = orderInformation;


		var instance = new cybersourceRestApi.PlansApi(configObject, apiClient);

		instance.createPlan(requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Create a Plan : ' + JSON.stringify(response['status']));

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
	create_plan(function () {
		console.log('\nCreatePlan end.');
	});
}

module.exports.create_plan = create_plan;