'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
const { faker, fa } = require('@faker-js/faker');

function payment_with_flex_token_create_permanent_tms_token(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreatePaymentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = faker.string.uuid();
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
		var fName = faker.person.firstName();
        var lName = faker.person.lastName();
		orderInformationBillTo.firstName = fName;
		orderInformationBillTo.lastName = lName;
		orderInformationBillTo.address1 = faker.location.streetAddress();
		orderInformationBillTo.locality = faker.location.city();
		orderInformationBillTo.administrativeArea = faker.location.state();
		orderInformationBillTo.postalCode = faker.location.zipCode();
		orderInformationBillTo.country = 'US';
		orderInformationBillTo.email = faker.internet.email({firstName:fName,lastName:lName});
		orderInformationBillTo.phoneNumber = faker.string.numeric(10);
		orderInformation.billTo = orderInformationBillTo;

		var orderInformationShipTo = new cybersourceRestApi.Ptsv2paymentsOrderInformationShipTo();
		orderInformationShipTo.firstName = fName;
		orderInformationShipTo.lastName = lName;
		orderInformationShipTo.address1 = faker.location.streetAddress();
		orderInformationShipTo.locality = faker.location.city();
		orderInformationShipTo.administrativeArea = faker.location.state();
		orderInformationShipTo.postalCode = faker.location.zipCode();
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
		payment_with_flex_token_create_permanent_tms_token(function () {
		console.log('\nCreatePayment end.');
	});
}
module.exports.payment_with_flex_token_create_permanent_tms_token = payment_with_flex_token_create_permanent_tms_token;
