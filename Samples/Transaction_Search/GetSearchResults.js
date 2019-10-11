'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function getSearchResults(callback, searchId) {
	try {
		var configObject = new configuration();

		var instance = new cybersourceRestApi.SearchTransactionsApi(configObject);

		instance.getSearch( searchId, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get Search results : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var searchId = readline.question("\nEnter missing path parameter <searchId>: ");
		getSearchResults(function () {
		console.log('\nGetSearch end.');
	},searchId);
}
module.exports.getSearchResults = getSearchResults;
