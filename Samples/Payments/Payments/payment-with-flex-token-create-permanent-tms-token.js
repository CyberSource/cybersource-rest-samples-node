'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function payment_with_flex_token_create_permanent_tms_token(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreatePaymentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'TC50171_3';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();

		var actionList = new Array();
		actionList.push("TOKEN_CREATE");
		processingInformation.actionList = actionList;


		var actionTokenTypes = new Array();
		actionTokenTypes.push("customer");
		actionTokenTypes.push("paymentInstrument");
		actionTokenTypes.push("shippingAddress");
		processingInformation.actionTokenTypes = actionTokenTypes;

		processingInformation.capture = false;
		requestObj.processingInformation = processingInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '102.21';
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		var orderInformationBillTo = new cybersourceRestApi.Ptsv2paymentsOrderInformationBillTo();
		orderInformationBillTo.firstName = 'John';
		orderInformationBillTo.lastName = 'Doe';
		orderInformationBillTo.address1 = '1 Market St';
		orderInformationBillTo.locality = 'san francisco';
		orderInformationBillTo.administrativeArea = 'CA';
		orderInformationBillTo.postalCode = '94105';
		orderInformationBillTo.country = 'US';
		orderInformationBillTo.email = 'test@cybs.com';
		orderInformationBillTo.phoneNumber = '4158880000';
		orderInformation.billTo = orderInformationBillTo;

		var orderInformationShipTo = new cybersourceRestApi.Ptsv2paymentsOrderInformationShipTo();
		orderInformationShipTo.firstName = 'John';
		orderInformationShipTo.lastName = 'Doe';
		orderInformationShipTo.address1 = '1 Market St';
		orderInformationShipTo.locality = 'san francisco';
		orderInformationShipTo.administrativeArea = 'CA';
		orderInformationShipTo.postalCode = '94105';
		orderInformationShipTo.country = 'US';
		orderInformation.shipTo = orderInformationShipTo;

		requestObj.orderInformation = orderInformation;

		var tokenInformation = new cybersourceRestApi.Ptsv2paymentsTokenInformation();
		tokenInformation.transientTokenJwt = 'eyJraWQiOiIwOERUSXlqejdBZ1F0QVVrWUdZSThuWFg4Q0ZzMHM3VSIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjp7ImV4cGlyYXRpb25ZZWFyIjoiMjAyMyIsIm51bWJlciI6IjQxMTExMVhYWFhYWDExMTEiLCJleHBpcmF0aW9uTW9udGgiOiIwOCIsInR5cGUiOiIwMDEifSwiaXNzIjoiRmxleC8wNyIsImV4cCI6MTU5OTU2ODUzNSwidHlwZSI6Im1mLTAuMTEuMCIsImlhdCI6MTU5OTU2NzYzNSwianRpIjoiMUUyTjFQVU0xMUE0UElKRkFPMTBCNktVUDRVRTlYTzdKSTFKUzkxMVpJSE5UU0taTzU5UjVGNTc3QTk3REI2MiJ9.k4Cg-Nf2-D_OU0LOc1Z6VJ6y_JQLMiygNkJwxLCTqcCT5wDcmmv1Df_ZdNpw2kurdLnanX5q_QtrTW3uutfuH4QjV4z3OReeovztQORHzvnmO75uSszK85kHwTiZH83kV6ylvPIh5s3odGZ83hy_Ieml48VF4RTm0VLyncBa59p6HQoxi8hLzuPET5En11Je6rOQ2kH6C3oWpu3ELHVMLbuwNbyP2SqYje31v2fSZ_ecnha5SjQs3UnocmxQKEAe8NikgOn5iMs0xDpKRwsH8n_P9Oz6rVFaAjOpWJ-ox3KEOsz7dXYSIzH3xwLxnYMe4kz636glr0VPS9v_x_WX0w';
		requestObj.tokenInformation = tokenInformation;


		var instance = new cybersourceRestApi.PaymentsApi(configObject, apiClient);

		instance.createPayment( requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Process a Payment : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		payment_with_flex_token_create_permanent_tms_token(function () {
		console.log('\nCreatePayment end.');
	});
}
module.exports.payment_with_flex_token_create_permanent_tms_token = payment_with_flex_token_create_permanent_tms_token;
