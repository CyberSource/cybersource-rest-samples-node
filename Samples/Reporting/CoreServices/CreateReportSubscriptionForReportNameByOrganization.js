'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var deleteSubscription = require('./DeleteSubscriptionOfReportNameByOrganization');
/**
 * This is a sample code to call ReportSubscriptionsApi,
 * retrive transaction by username
 */
function CreateSubscriptionReport(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.ReportSubscriptionsApi(configObject);

		var request = new cybersourceRestApi.CreateReportSubscriptionRequest();
		request.reportDefinitionName = 'TransactionRequestClass';
		request.reportFields = [
			'Request.RequestID',
			'Request.TransactionDate',
			'Request.MerchantID'
		];
		request.reportMimeType = 'application/xml';
		request.reportFrequency = 'MONTHLY';
		request.timezone = 'GMT';
		request.startTime = '2000';
		request.startDay = 1;
		request.reportName = 'testrest_subcription_v1';

		console.log('****************Create Report Subscrption****************');

		instance.createSubscription(request, null,function (error, data, response) {
			if (error) {
				console.log('\nError in create report subscription : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData of create report subscription : ' + JSON.stringify(data));
			}
			console.log('\nResponse of create report subscription : ' + JSON.stringify(response));
			var status = JSON.stringify(response['status']);
			console.log('\nResponse Code of create report subscription : ' + status);
			if (status === '201') {
				deleteSubscription.deleteSubscriptionReport(request.reportName, function (error, data) {
					if (error) {
						console.log('Error occured in deleting the report subscription');
					}
					else if(data){
						console.log('Deleted the report subscription to clear the bad values in backend');
					}
				});
			}
			callback(error, request.reportName);
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	CreateSubscriptionReport(function () {
		console.log('Create report subscription end.');
	});
}
module.exports.CreateSubscriptionReport = CreateSubscriptionReport;
