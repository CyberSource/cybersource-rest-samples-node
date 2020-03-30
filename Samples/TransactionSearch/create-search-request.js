'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function create_search_request(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreateSearchRequest();

		requestObj.save = false;
		requestObj.name = 'MRN';
		requestObj.timezone = 'America/Chicago';
		requestObj.query = 'clientReferenceInformation.code:TC50171_3 AND submitTimeUtc:[NOW/DAY-7DAYS TO NOW/DAY+1DAY}';
		requestObj.offset = 0;
		requestObj.limit = 100;
		requestObj.sort = 'id:asc,submitTimeUtc:asc';

		var instance = new cybersourceRestApi.SearchTransactionsApi(configObject, apiClient);

		instance.createSearch(requestObj, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Create a Search Request : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	create_search_request(function () {
		console.log('\nCreateSearch end.');
	});
}
module.exports.create_search_request = create_search_request;
