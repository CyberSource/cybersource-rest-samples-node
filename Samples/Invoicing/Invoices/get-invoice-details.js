'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var create_invoice_flow = require('./create-draft-invoice');

function get_invoice_details(callback, id) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();

		var instance = new cybersourceRestApi.InvoicesApi(configObject, apiClient);

		create_invoice_flow.create_draft_invoice(function(error, data) {
			if (data) {
				var id = data['id'];
				instance.getInvoice( id, function (error, data, response) {
					if(error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Get Invoice Details : ' + JSON.stringify(response['status']));
					callback(error, data, response);
				});
			}
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		get_invoice_details(function () {
		console.log('\nGetInvoice end.');
	});
}
module.exports.get_invoice_details = get_invoice_details;
