'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var createPlan = require('../Plans/create-plan');

function delete_plan(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();

		var instance = new cybersourceRestApi.PlansApi(configObject, apiClient);
		createPlan.create_plan(function (error, data) {
			if (data) {
				var id = data['id'];

				instance.deletePlan(id, function (error, data, response) {
					if(error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Delete a Plan : ' + JSON.stringify(response['status']));

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
	delete_plan(function () {
		console.log('\nDeletePlan end.');
	});
}

module.exports.delete_plan = delete_plan;