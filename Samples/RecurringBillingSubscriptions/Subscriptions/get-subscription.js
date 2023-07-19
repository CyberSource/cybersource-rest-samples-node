'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var createSubscription = require('../Subscriptions/create-subscription');

function get_subscription(callback, id) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();

		var instance = new cybersourceRestApi.SubscriptionsApi(configObject, apiClient);
		createSubscription.create_subscription(function (error, data) {
			if (data) {
				var id = data['id'];
				instance.getSubscription(id, function (error, data, response) {
					if(error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Get a Subscription : ' + JSON.stringify(response['status']));

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
	get_subscription(function () {
		console.log('\nGetSubscription end.');
	});
}

module.exports.get_subscription = get_subscription;