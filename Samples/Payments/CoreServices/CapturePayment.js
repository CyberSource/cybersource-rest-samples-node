'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));
var processPayment = require('./ProcessPayment');

/**
 * This is a sample code to call CaptureApi,
 * call capturePayment method to process capture a payment
 */
function processCaptureAPayment(callback) {
	try {

		var request = new cybersourceRestApi.CapturePaymentRequest();
		var configObject = new configuration();
		var instance = new cybersourceRestApi.CaptureApi(configObject);

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'test_capture';
		request.clientReferenceInformation = clientReferenceInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
		var amountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		amountDetails.totalAmount = '102.21';
		amountDetails.currency = 'USD';
		orderInformation.amountDetails = amountDetails;
		request.orderInformation = orderInformation;

		var enableCapture = false;

		console.log('\n[BEGIN] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
		processPayment.processPayment(function (error, data) {
			console.log('\n[END] REQUEST & RESPONSE OF: ProcessPayment\n');
			if (!error) {
				var id = data.id;
				instance.capturePayment(request, id, function (error, data, response) {
					if (error) {
						console.log('\n API ERROR : \n ' + JSON.stringify(error));
					}
					if (response) {
						console.log('\n API REQUEST HEADERS : \n' + JSON.stringify(response.req._headers,0,2));
						console.log('\n API REQUEST BODY : \n' + response.request._data + '\n');
						console.log('\n API RESPONSE BODY : ' + response.text); 
						console.log('\n API RESPONSE CODE : ' + JSON.stringify(response['status']));
						console.log('\n API RESPONSE HEADERS : \n' + JSON.stringify(response.header,0,2));
					}
					console.log('\n[END] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
					callback(error, data);
				});
			}
			else{
				console.log('\n[END] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
				callback(error, data);
			}
		}, enableCapture);
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	processCaptureAPayment(function () {
	});
}
module.exports.processCaptureAPayment = processCaptureAPayment;