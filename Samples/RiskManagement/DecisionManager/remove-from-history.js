'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function remove_from_history(callback) {
	// Refresh id with an active value
	var id = "5825489395116729903003";

	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.FraudMarkingActionRequest();

		var riskInformation = new cybersourceRestApi.Riskv1decisionsidmarkingRiskInformation();
		var riskInformationMarkingDetails = new cybersourceRestApi.Riskv1decisionsidmarkingRiskInformationMarkingDetails();
		riskInformationMarkingDetails.notes = 'Adding this transaction as suspect';
		riskInformationMarkingDetails.reason = 'suspected';
		riskInformationMarkingDetails.action = 'hide';
		riskInformation.markingDetails = riskInformationMarkingDetails;

		requestObj.riskInformation = riskInformation;


		var instance = new cybersourceRestApi.DecisionManagerApi(configObject, apiClient);

		instance.fraudUpdate(id, requestObj, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Fraud Marking : ' + JSON.stringify(response['status']));
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
	remove_from_history(function () {
		console.log('\nFraudUpdate end.');
	});
}
module.exports.remove_from_history = remove_from_history;
