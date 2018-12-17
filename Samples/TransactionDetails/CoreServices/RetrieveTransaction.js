'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This is a sample code to call TransactionDetailsApi,
 * to retrive transaction details
 */
function retrieveTransaction(callback) {

	var configObject = new configuration();
	var instance = new cybersourceRestApi.TransactionDetailsApi(configObject);

	var id = '5408386919326811103004'; 

	console.log('\n*************** Retrieve Transaction  ********************* ');

	instance.getTransaction(id, function (error, data, response) {
		if (error) {
			console.log('Error in Retrieve Transaction Details : ' + JSON.stringify(error));
		}
		else if (data) {
			console.log('\n Retrieve Transaction Details Data : ' + JSON.stringify(data));
		}
		console.log('\n Retrieve Transaction Details Response : ' + JSON.stringify(response));
		console.log('\n Retrieve Transaction Details Response code : ' + response['status']);
		callback(error, data);
	});

}
if (require.main === module) {
	retrieveTransaction(function () {
		console.log('Retrieve Transaction Details end.');
	});
}
module.exports.retrieveTransaction = retrieveTransaction;