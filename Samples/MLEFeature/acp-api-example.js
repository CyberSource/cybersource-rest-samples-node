'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/ConfigurationWithMLE.js');
var {MLEConfigurationWithRequestAndResponseMLE1,MLEConfigurationWithRequestAndResponseMLE2} = require(filePath);

function acp_api_example(callback) {
	try {
		var configObject = new MLEConfigurationWithRequestAndResponseMLE2();
		// Change the config to MLEConfigurationWithRequestAndResponseMLE1 to for Global level Response MLE
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.AgenticCardEnrollmentRequest();

		requestObj.clientCorrelationId = '3e1b7943-6567-4965-a32b-5aa93d057d35';
		var deviceInformation = new cybersourceRestApi.Acpv1tokensDeviceInformation();
		deviceInformation.userAgent = 'SampleUserAgent';
		deviceInformation.applicationName = 'My Magic App';
		deviceInformation.fingerprintSessionId = 'finSessionId';
		deviceInformation.country = 'US';
		var deviceInformationDeviceData = new cybersourceRestApi.Acpv1tokensDeviceInformationDeviceData();
		deviceInformationDeviceData.type = 'Mobile';
		deviceInformationDeviceData.manufacturer = 'Apple';
		deviceInformationDeviceData.brand = 'Apple';
		deviceInformationDeviceData.model = 'iPhone 16 Pro Max';
		deviceInformation.deviceData = deviceInformationDeviceData;

		deviceInformation.ipAddress = '192.168.0.100';
		deviceInformation.clientDeviceId = '000b2767814e4416999f4ee2b099491d2087';
		requestObj.deviceInformation = deviceInformation;

		var buyerInformation = new cybersourceRestApi.Acpv1tokensBuyerInformation();
		buyerInformation.language = 'en';
		buyerInformation.merchantCustomerId = '3e1b7943-6567-4965-a32b-5aa93d057d35';

		var personalIdentification = new Array();
		var personalIdentification1 = new cybersourceRestApi.Acpv1tokensBuyerInformationPersonalIdentification();
		personalIdentification1.type = 'The identification type';
		personalIdentification1.id = '1';
		personalIdentification.push(personalIdentification1);

		buyerInformation.personalIdentification = personalIdentification;

		requestObj.buyerInformation = buyerInformation;

		var billTo = new cybersourceRestApi.Acpv1tokensBillTo();
		billTo.firstName = 'John';
		billTo.lastName = 'Doe';
		billTo.fullName = 'John Michael Doe';
		billTo.email = 'john.doe@example.com';
		billTo.countryCallingCode = '1';
		billTo.phoneNumber = '5551234567';
		billTo.numberIsVoiceOnly = false;
		billTo.country = 'US';
		requestObj.billTo = billTo;

		var consumerIdentity = new cybersourceRestApi.Acpv1tokensConsumerIdentity();
		consumerIdentity.identityType = 'EMAIL_ADDRESS';
		consumerIdentity.identityValue = 'john.doe@example.com';
		consumerIdentity.identityProvider = 'PARTNER';
		consumerIdentity.identityProviderUrl = 'https://identity.partner.com';
		requestObj.consumerIdentity = consumerIdentity;

		var paymentInformation = new cybersourceRestApi.Acpv1tokensPaymentInformation();
		var paymentInformationCustomer = new cybersourceRestApi.Acpv1tokensPaymentInformationCustomer();
		paymentInformationCustomer.id = '';
		paymentInformation.customer = paymentInformationCustomer;

		var paymentInformationPaymentInstrument = new cybersourceRestApi.Acpv1tokensPaymentInformationPaymentInstrument();
		paymentInformationPaymentInstrument.id = '';
		paymentInformation.paymentInstrument = paymentInformationPaymentInstrument;

		var paymentInformationInstrumentIdentifier = new cybersourceRestApi.Acpv1tokensPaymentInformationInstrumentIdentifier();
		paymentInformationInstrumentIdentifier.id = '4044EB915C613A82E063AF598E0AE6EF';
		paymentInformation.instrumentIdentifier = paymentInformationInstrumentIdentifier;

		requestObj.paymentInformation = paymentInformation;

		var enrollmentReferenceData = new cybersourceRestApi.Acpv1tokensEnrollmentReferenceData();
		enrollmentReferenceData.enrollmentReferenceType = 'TOKEN_REFERENCE_ID';
		enrollmentReferenceData.enrollmentReferenceProvider = 'VTS';
		requestObj.enrollmentReferenceData = enrollmentReferenceData;


		var assuranceData = new Array();
		var assuranceData1 = new cybersourceRestApi.Acpv1tokensAssuranceData();
		assuranceData1.verificationType = 'DEVICE';
		assuranceData1.verificationEntity = '10';

		var verificationEvents = new Array();
		verificationEvents.push("01");
		assuranceData1.verificationEvents1 = verificationEvents;

		assuranceData1.verificationMethod = '02';
		assuranceData1.verificationResults = '01';
		assuranceData1.verificationTimestamp = '1735690745';
		var authenticationContext1 = new cybersourceRestApi.Acpv1tokensAuthenticationContext();
		authenticationContext1.action = 'AUTHENTICATE';
		assuranceData1.authenticationContext = authenticationContext1;

		var authenticatedIdentities1 = new cybersourceRestApi.Acpv1tokensAuthenticatedIdentities();
		authenticatedIdentities1.data = 'authenticatedData';
		authenticatedIdentities1.provider = 'VISA_PAYMENT_PASSKEY';
		authenticatedIdentities1.id = 'f48ac10b-58cc-4372-a567-0e02b2c3d489';
		assuranceData1.authenticatedIdentities = authenticatedIdentities1;

		assuranceData1.additionalData = '';
		assuranceData.push(assuranceData1);

		requestObj.assuranceData = assuranceData;


		var consentData = new Array();
		var consentData1 = new cybersourceRestApi.Acpv1tokensConsentData();
		consentData1.id = '550e8400-e29b-41d4-a716-446655440000';
		consentData1.type = 'PERSONALIZATION';
		consentData1.source = 'CLIENT';
		consentData1.acceptedTime = '1719169800';
		consentData1.effectiveUntil = '1750705800';
		consentData.push(consentData1);

		requestObj.consentData = consentData;


		var instance = new cybersourceRestApi.EnrollmentApi(configObject, apiClient);

		instance.enrollCard(requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + error.message);
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Enroll a card : ' + JSON.stringify(response['status']));

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
	acp_api_example(function () {
		console.log('\nEnrollCard end.');
	});
}

module.exports.acp_api_example = acp_api_example;