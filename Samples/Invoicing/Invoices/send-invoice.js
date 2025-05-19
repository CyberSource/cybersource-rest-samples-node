'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
const create_draft_invoice = require('./create-draft-invoice');

function send_invoice(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();

		var instance = new cybersourceRestApi.InvoicesApi(configObject, apiClient);

		create_draft_invoice.create_draft_invoice(function(error, data) {
			if (data) {
				var invoice_id = data['id'];
				instance.performSendAction(invoice_id, function(error, data, response) {
					if (error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Send an Invoice : ' + JSON.stringify(response['status']));
					var status = response['status'];
					write_log_audit(status);
					callback(error, data, response);
				});
			}
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}

function write_log_audit(status) {
	var filename = path.basename(__filename).split('.')[0];
	console.log(`[Sample Code Testing] [${filename}] ${status}`);
}

if (require.main === module) {
	send_invoice(function () {
		console.log('\nSendInvoice end.');
	});
}
module.exports.send_invoice = send_invoice;