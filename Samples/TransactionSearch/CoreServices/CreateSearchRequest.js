'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));

/**
 * This is a sample code to call SearchTransactionsApi,
 * create a search request
 */
function createSearchRequest(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.SearchTransactionsApi(configObject);

		var createSearchRequest = new cybersourceRestApi.TssV2TransactionsPostResponse();
		createSearchRequest.save = 'false';
		createSearchRequest.name = 'MRN';
		createSearchRequest.timezone = 'America/Chicago';
		createSearchRequest.query = 'clientReferenceInformation.code:TC50171_3';
		createSearchRequest.offset = 0;
		createSearchRequest.limit = 100;
		createSearchRequest.sort = 'id:asc, submitTimeUtc:asc';

		console.log('\n[BEGIN] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');

		instance.createSearch(createSearchRequest, function (error, data, response) {	
			if (error) {
				console.log('\n API ERROR : \n ' + JSON.stringify(error));
			}
			if (response) {
				console.log('\n API REQUEST HEADERS : \n' + JSON.stringify(response.req._headers,0,2));
				console.log('\n API REQUEST BODY : \n' + response.request._data + '\n');
				console.log('\n API RESPONSE BODY : ' + response.text + '\n'); 
				console.log('\n API RESPONSE CODE : ' + JSON.stringify(response['status']));
				console.log('\n API RESPONSE HEADERS : \n' + JSON.stringify(response.header,0,2));
			}
			callback(error, data);
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	createSearchRequest(function () {
		console.log('\n[END] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
	});
}
module.exports.createSearchRequest = createSearchRequest;
