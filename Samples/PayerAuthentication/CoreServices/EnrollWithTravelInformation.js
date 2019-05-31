'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function EnrollWithTravelInformation(callback) {
	try {
			var configObject = new configuration();
			var instance = new cybersourceRestApi.PayerAuthenticationApi(configObject);

			var clientReferenceInformation = new cybersourceRestApi.Riskv1authenticationsClientReferenceInformation();
			clientReferenceInformation.code = 'cybs_test';

			var consumerAuthenticationInformation = new cybersourceRestApi.Riskv1authenticationsConsumerAuthenticationInformation();
			consumerAuthenticationInformation.authenticationTransactionId = 'gNNV7Q5e2rr2NOik5I30';
	
	    var request = new cybersourceRestApi.CheckPayerAuthEnrollmentRequest();
	    request.clientReferenceInformation = clientReferenceInformation;
			request.consumerAuthenticationInformation = consumerAuthenticationInformation;

	    console.log('\n*************** EnrollWithTravelInformation ********************* ');

			instance.checkPayerAuthEnrollment(request, function (error, data, response) {
				if (error) {
					console.log('\nError in EnrollWithTravelInformation : ' + JSON.stringify(error));
				}
				else if (data) {
					console.log('\nData of EnrollWithTravelInformation : ' + JSON.stringify(data));
				}
				console.log('\nResponse of EnrollWithTravelInformation : ' + JSON.stringify(response));
				console.log('\nResponse Code of EnrollWithTravelInformation : ' + JSON.stringify(response['status']));
				callback(error, data);
			});
		} catch (error) {
			console.log(error);
		}
}

if (require.main === module) {
	EnrollWithTravelInformation(function () {
		console.log('\EnrollWithTravelInformation end.');
	}, false);
}
module.exports.EnrollWithTravelInformation = EnrollWithTravelInformation;