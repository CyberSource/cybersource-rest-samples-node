'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function updateinvoicesettings(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.InvoiceSettingsRequest();

		var invoiceSettingsInformation = new cybersourceRestApi.Invoicingv2invoiceSettingsInvoiceSettingsInformation();
		invoiceSettingsInformation.merchantLogo = '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';
		invoiceSettingsInformation.merchantDisplayName = 'Custom Merchant Display Name';
		invoiceSettingsInformation.customEmailMessage = 'Custom merchant email message';
		invoiceSettingsInformation.enableReminders = true;
		var invoiceSettingsInformationHeaderStyle = new cybersourceRestApi.InvoicingV2InvoiceSettingsGet200ResponseInvoiceSettingsInformationHeaderStyle();
		invoiceSettingsInformationHeaderStyle.fontColor = '#000001';
		invoiceSettingsInformationHeaderStyle.backgroundColor = '#FFFFFF';
		invoiceSettingsInformation.headerStyle = invoiceSettingsInformationHeaderStyle;

		invoiceSettingsInformation.deliveryLanguage = 'en-US';
		invoiceSettingsInformation.defaultCurrencyCode = 'USD';
		invoiceSettingsInformation.payerAuthenticationInInvoicing = 'enable';
		requestObj.invoiceSettingsInformation = invoiceSettingsInformation;


		var instance = new cybersourceRestApi.InvoiceSettingsApi(configObject, apiClient);

		instance.updateInvoiceSettings( requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Update Invoice Settings : ' + JSON.stringify(response['status']));
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
		updateinvoicesettings(function () {
		console.log('\nUpdateInvoiceSettings end.');
	});
}
module.exports.updateinvoicesettings = updateinvoicesettings;
