'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/BankAccountValidationConfiguration.js');
var configuration = require(filePath);

function bank_account_validation(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.AccountValidationsRequest();

		var clientReferenceInformation = new cybersourceRestApi.Bavsv1accountvalidationsClientReferenceInformation();
		clientReferenceInformation.code = 'TC50171_100';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var processingInformation = new cybersourceRestApi.Bavsv1accountvalidationsProcessingInformation();
		processingInformation.validationLevel = 1;
		requestObj.processingInformation = processingInformation;

		var paymentInformation = new cybersourceRestApi.Bavsv1accountvalidationsPaymentInformation();
		var paymentInformationBank = new cybersourceRestApi.Bavsv1accountvalidationsPaymentInformationBank();
		paymentInformationBank.routingNumber = '041210163';
		var paymentInformationBankAccount = new cybersourceRestApi.Bavsv1accountvalidationsPaymentInformationBankAccount();
		paymentInformationBankAccount.number = '99970';
		paymentInformationBank.account = paymentInformationBankAccount;

		paymentInformation.bank = paymentInformationBank;

		requestObj.paymentInformation = paymentInformation;


		var instance = new cybersourceRestApi.BankAccountValidationApi(configObject, apiClient);

		instance.bankAccountValidationRequest(requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Visa Bank Account Validation Service : ' + JSON.stringify(response['status']));

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
	bank_account_validation(function () {
		console.log('\nBankAccountValidationRequest end.');
	});
}

module.exports.bank_account_validation = bank_account_validation;