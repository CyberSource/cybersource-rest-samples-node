'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function getPurchaseAndRefundDetails(callback) {
	try {
		var configObject = new configuration();
		var startTime = '2018-05-01T12:00:00-05:00';
		var endTime = '2018-05-30T12:00:00-05:00';
		var organizationId = "testrest";
		var paymentSubtype = "VI";
		var viewBy = "requestDate";
		var groupName = "groupName";
		var offset = 20;
		var limit = 2000;

		var opts = [];
		if (organizationId!= null) opts['organizationId'] = organizationId;
		if (paymentSubtype!= null) opts['paymentSubtype'] = paymentSubtype;
		if (viewBy!= null) opts['viewBy'] = viewBy;
		if (groupName!= null) opts['groupName'] = groupName;
		if (offset!= null) opts['offset'] = offset;
		if (limit!= null) opts['limit'] = limit;

		var instance = new cybersourceRestApi.PurchaseAndRefundDetailsApi(configObject);

		instance.getPurchaseAndRefundDetails( startTime, endTime, opts, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get Purchase and Refund details : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var startTime = readline.question("\nEnter missing query parameter <startTime>: ");
		var endTime = readline.question("\nEnter missing query parameter <endTime>: ");
		var organizationId = readline.question("\nEnter missing query parameter <organizationId>: ");
		var paymentSubtype = readline.question("\nEnter missing query parameter <paymentSubtype>: ");
		var viewBy = readline.question("\nEnter missing query parameter <viewBy>: ");
		var groupName = readline.question("\nEnter missing query parameter <groupName>: ");
		var offset = readline.question("\nEnter missing query parameter <offset>: ");
		var limit = readline.question("\nEnter missing query parameter <limit>: ");
		getPurchaseAndRefundDetails(function () {
		console.log('\nGetPurchaseAndRefundDetails end.');
	},startTime, endTime, organizationId, paymentSubtype, viewBy, groupName, offset, limit);
}
module.exports.getPurchaseAndRefundDetails = getPurchaseAndRefundDetails;
