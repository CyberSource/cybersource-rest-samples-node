'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function get_purchase_and_refund_details(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var startTime = '2020-01-01T12:00:00Z';
		var endTime = '2020-01-30T12:00:00Z';
		var organizationId = "testrest";
		var paymentSubtype = "VI";
		var viewBy = "requestDate";
		var groupName = "groupName";
		var offset = 20;
		var limit = 2000;

		var opts = [];
		if (organizationId != null) opts['organizationId'] = organizationId;
		if (paymentSubtype != null) opts['paymentSubtype'] = paymentSubtype;
		if (viewBy != null) opts['viewBy'] = viewBy;
		if (groupName != null) opts['groupName'] = groupName;
		if (offset != null) opts['offset'] = offset;
		if (limit != null) opts['limit'] = limit;

		var instance = new cybersourceRestApi.PurchaseAndRefundDetailsApi(configObject, apiClient);

		instance.getPurchaseAndRefundDetails(startTime, endTime, opts, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get Purchase and Refund Details : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	get_purchase_and_refund_details(function () {
		console.log('\nGetPurchaseAndRefundDetails end.');
	});
}
module.exports.get_purchase_and_refund_details = get_purchase_and_refund_details;
