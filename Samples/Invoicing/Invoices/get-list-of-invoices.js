'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function get_list_of_invoices(callback) {
	try {
		var offset = 0;
		var limit = 10;
		var status = null;

		var opts = [];
		if (status != null) opts['status'] = status;

		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();

		var instance = new cybersourceRestApi.InvoicesApi(configObject, apiClient);

		instance.getAllInvoices(offset, limit, opts, function(error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get List of Invoices : ' + JSON.stringify(response['status']));
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
	var filename = path.basename(__filename).split('.')[0];
	console.log(`[Sample Code Testing] [${filename}] ${status}`);
}

if (require.main === module) {
	get_list_of_invoices(function () {
		console.log('\nGetListOfInvoices end.');
	});
}
module.exports.get_list_of_invoices = get_list_of_invoices;