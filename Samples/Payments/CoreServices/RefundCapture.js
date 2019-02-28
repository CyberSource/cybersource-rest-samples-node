'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));
var capturePayment = require('./CapturePayment');
/**
 * This is a sample code to call RefundApi,
 * Include the capture ID in the POST request to refund the captured amount. 
 */
function refundACapture(callback) {
	try {
		var request = new cybersourceRestApi.RefundCaptureRequest();
		var configObject = new configuration();
		var instance = new cybersourceRestApi.RefundApi(configObject);

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'test_refund_capture';
		request.clientReferenceInformation = clientReferenceInformation;
		var orderInformation = new cybersourceRestApi.Ptsv2paymentsidrefundsOrderInformation();
		var amountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		amountDetails.totalAmount = '102.21';
		amountDetails.currency = 'USD';
		orderInformation.amountDetails = amountDetails;
		request.orderInformation = orderInformation;

		console.log('\n[BEGIN] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
		capturePayment.processCaptureAPayment(function (error, data) {
			if (!error) {
				var id = data.id;

				instance.refundCapture(request, id, function (error, data, response) {
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
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	refundACapture(function () {
	});
}
module.exports.refundACapture = refundACapture;