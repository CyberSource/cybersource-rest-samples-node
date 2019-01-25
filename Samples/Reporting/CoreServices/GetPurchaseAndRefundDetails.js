'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));

/**
 * This is a sample code to call PurchaseAndRefundDetailsApi,
 * retrive purchase and refund details
 */
function getPurchaseAndRefundDetails(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.PurchaseAndRefundDetailsApi(configObject);

		var startTime = '2018-05-01T12:00:00-05:00';
		var endTime = '2018-05-30T12:00:00-05:00';
		var opts = [];
		opts['organizationId'] = 'testrest';
		opts['paymentSubtype'] = 'VI';
		opts['groupName'] = 'groupName';
		opts['viewBy'] = 'requestDate';
		opts['offset'] = '20';
		opts['limit'] = '2000';

		console.log('\n[BEGIN] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');

		instance.getPurchaseAndRefundDetails(startTime, endTime, opts, function (error, data, response) {
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
	getPurchaseAndRefundDetails(function () {
		console.log('\n[END] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
	});
}
module.exports.getPurchaseAndRefundDetails = getPurchaseAndRefundDetails;