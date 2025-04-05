'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function create_adhoc_report(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreateAdhocReportRequest();

		requestObj.reportDefinitionName = 'TransactionRequestClass';

		var reportFields = new Array();
		reportFields.push("Request.RequestID");
		reportFields.push("Request.TransactionDate");
		reportFields.push("Request.MerchantID");
		requestObj.reportFields = reportFields;

		requestObj.reportMimeType = 'application/xml';
		requestObj.reportName = 'testrest_v2';
		requestObj.timezone = 'GMT';
		requestObj.reportStartTime = '2024-03-01T17:30:00.000+05:30';
		requestObj.reportEndTime = '2024-03-02T17:30:00.000+05:30';
		var reportPreferences = new cybersourceRestApi.Reportingv3reportsReportPreferences();
		reportPreferences.signedAmounts = true;
		reportPreferences.fieldNameConvention = 'SOAPI';
		requestObj.reportPreferences = reportPreferences;

		var organizationId = "testrest";

		var opts = [];
		if (organizationId != null) opts['organizationId'] = organizationId;

		var instance = new cybersourceRestApi.ReportsApi(configObject, apiClient);

		instance.createReport(requestObj, opts, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Create Adhoc Report : ' + JSON.stringify(response['status']));
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
	create_adhoc_report(function () {
		console.log('\nCreateReport end.');
	});
}
module.exports.create_adhoc_report = create_adhoc_report;
