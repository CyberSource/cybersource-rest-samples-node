'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This is a sample code to call ReportsApi,
 * retrive transaction by username
 */
function createAdhocReport(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.ReportsApi(configObject);

		var reportPreferences = new cybersourceRestApi.Reportingv3reportsReportPreferences();
		reportPreferences.signedAmounts = true;
		reportPreferences.fieldNameConvention = 'SOAPI';


		var request = new cybersourceRestApi.RequestBody();
		request.reportName = 'testrest_v0871';
		request.reportDefinitionName = 'TransactionRequestClass';
		request.timezone = 'GMT';
		request.reportMimeType = 'application/xml';
		request.reportStartTime = '2019-01-02T12:00:00+05:00';
		request.reportEndTime = '2019-01-03T12:00:00+05:00';
		request.reportFilters = {
			'Application.Name': []
		};
		request.reportPreferences = reportPreferences;
		request.reportFields = ['Request.RequestID', 'Request.TransactionDate', 'Request.MerchantID'];

		console.log('\n*************** Create Adhoc Report ********************* ');

		instance.createReport(request, null, function (error, data, response) {
			if (error) { 
				console.log('\nError in create adhoc report : ' + error);
			}
			else if (data) {
				console.log('\nData of create adhoc report : ' + JSON.stringify(data));
			}
			console.log('\nResponse of create adhoc report : ' + JSON.stringify(response));
			console.log('\nResponse Code of create adhoc report : ' + JSON.stringify(response['status']));
			callback(error, data);
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	createAdhocReport(function () {
		console.log('create adhoc report end.');
	});
}
module.exports.createAdhocReport = createAdhocReport;
