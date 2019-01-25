'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));

/**
 * This is a sample code to call ReportsApi,
 * retrive transaction by username
 */
function createAdhocReport(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.ReportsApi(configObject);

		var reportPreferences = new cybersourceRestApi.ReportingV3ReportSubscriptionsGet200ResponseReportPreferences();
		reportPreferences.signedAmounts = true;
		reportPreferences.fieldNameConvention = 'SOAPI';

		var opts = [];
		opts['organizationId'] = 'testrest';

		var request = new cybersourceRestApi.RequestBody1();
		request.reportName = 'testrest_v001';
		request.reportDefinitionName = 'TransactionRequestClass';
		request.timezone = 'GMT';
		request.reportMimeType = 'application/xml';
		request.reportStartTime = '2018-09-01T12:00:00+05:00';
		request.reportEndTime = '2018-09-02T12:00:00+05:00';
		request.reportFilters = {
			'Application.Name': []
		};
		request.reportPreferences = reportPreferences;
		request.reportFields = ['Request.RequestID', 'Request.TransactionDate', 'Request.MerchantID'];

		console.log('\n[BEGIN] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
		instance.createReport(request, opts, function (error, data, response) {
			if (error) {
				console.log('\n API ERROR : \n ' + JSON.stringify(error));
			}
			if(response){
			console.log('\n API REQUEST HEADERS : \n' + JSON.stringify(response.req._headers,0,2));
			console.log('\n API REQUEST BODY : \n' + response.request._data + '\n');
			console.log('\n API RESPONSE BODY : ' + response.text + '\n'); 
			console.log('\n API RESPONSE CODE : ' + JSON.stringify(response['status']));
			console.log('\n API RESPONSE HEADERS : \n' + JSON.stringify(response.header,0,2));
			}
			callback(error, data);
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	createAdhocReport(function () {
		console.log('\n[END] REQUEST & RESPONSE OF:'+ path.basename(__filename, path.extname(__filename)) + '\n');
	});
}
module.exports.createAdhocReport = createAdhocReport;
