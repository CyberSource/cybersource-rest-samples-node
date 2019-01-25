'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));

/**
 * This is a sample code to call ReportsApi,
 * retrive report by report ID
 */
function getReportBasedOnReportid(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.ReportsApi(configObject);

		var reportId = '79642c43-2368-0cd5-e053-a2588e0a7b3c';
		var opts = [];
		opts['organizationId'] = 'testrest';

		console.log('\n[BEGIN] REQUEST & RESPONSE OF :'+ path.basename(__filename, path.extname(__filename)) + '\n');

		instance.getReportByReportId(reportId, opts, function (error, data, response) {
			if (error) {
				console.log('\n API ERROR : \n ' + JSON.stringify(error));
			}
			if (response) {
				console.log('\n API REQUEST HEADERS : \n' + JSON.stringify(response.req._headers,0,2));
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
	getReportBasedOnReportid(function () {
		console.log('\n[END] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
	});
}
module.exports.getReportBasedOnReportid = getReportBasedOnReportid;