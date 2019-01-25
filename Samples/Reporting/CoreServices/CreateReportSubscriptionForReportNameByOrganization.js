'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));
var deleteSubscription = require('./DeleteSubscriptionOfReportNameByOrganization');
/**
 * This is a sample code to call ReportSubscriptionsApi,
 * retrive transaction by username
 */
function CreateSubscriptionReport(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.ReportSubscriptionsApi(configObject);

		var request = new cybersourceRestApi.RequestBody();

		request.reportDefinitionName = 'TransactionRequestClass';
		request.reportFields = [
			'Request.RequestID',
			'Request.TransactionDate',
			'Request.MerchantID'
		];
		request.reportMimeType = 'application/xml';
		request.reportFrequency = 'MONTHLY';
		request.timezone = 'GMT';
		request.startTime = '0942';
		request.startDay = 1;
		request.reportName = 'yyy';

		console.log('\n[BEGIN] REQUEST & RESPONSE OF:'+ path.basename(__filename, path.extname(__filename)) + '\n');

		instance.createSubscription(request, function (error, data, response) {
			if (error) {
				console.log('\n API ERROR : \n ' + JSON.stringify(error));
			}
			if (response) {
				console.log('\n API REQUEST HEADERS : \n' + JSON.stringify(response.req._headers,0,2));
				console.log('\n API REQUEST BODY : \n' + response.request._data + '\n');
				console.log('\n API RESPONSE BODY : ' + response.text + '\n'); 
				console.log('\n API RESPONSE CODE : ' + JSON.stringify(response['status']));
				console.log('\n API RESPONSE HEADERS : \n' + JSON.stringify(response.header,0,2));
				if (response['status'] === 201) {
					deleteSubscription.deleteSubscriptionReport(request.reportName, function (error, data) {
						if (!error) {
							console.log('\n[END] REQUEST & RESPONSE OF: DeleteSubscriptionOfReportNameByOrganization\n');
						}
					});
				}
			}
			callback(error, request.reportName);
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	CreateSubscriptionReport(function () {
		console.log('\n[END] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
	});
}
module.exports.CreateSubscriptionReport = CreateSubscriptionReport;