'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
const create_subscription = require('./create-subscription');

function suspend_subscription(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var instance = new cybersourceRestApi.SubscriptionsApi(configObject, apiClient);

		create_subscription.create_subscription(function(error, data) {
			if (data) {
				var subscription_id = data['id'];
				instance.suspendSubscription(subscription_id, function(error, data, response) {
					if(error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Suspend a Subscription : ' + JSON.stringify(response['status']));

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
	suspend_subscription(function () {
		console.log('\nSuspendSubscription end.');
	});
}

module.exports.suspend_subscription = suspend_subscription;