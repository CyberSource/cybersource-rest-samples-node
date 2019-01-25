'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));

/**
 * This is a sample code to call SearchTransactionsApi,
 * retrive transaction by id
 */
function getSearchResults(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.SearchTransactionsApi(configObject);

		var id = '27c74a80-c923-4034-a929-d968f194d774';

		console.log('\n[BEGIN] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');

		instance.getSearch(id, function (error, data, response) {
			
			if (error) {
				console.log('\n API ERROR : \n ' + JSON.stringify(error));
			}
			if(response){
				console.log('\n API REQUEST HEADERS : \n' + JSON.stringify(response.req._headers,0,2));
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
	getSearchResults(function () {
		console.log('\n [END] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
	});
}
module.exports.getSearchResults = getSearchResults;