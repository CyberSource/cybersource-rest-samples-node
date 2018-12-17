'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

/**
 * This is a sample code to call SearchTransactionsApi,
 * retrive transaction by id
 */
function getSearchResults(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.SearchTransactionsApi(configObject);

		var id = '95f6ab1c-d64d-4fdb-949d-cf174405c21f';

		console.log('\n*************** Get Search Result  ********************* ');

		instance.getSearch(id, function (error, data, response) {
			if (error) {
				console.log('\nError in get search result : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData of get search result : ' + JSON.stringify(data));
			}
			console.log('\nResponse of get search result : ' + JSON.stringify(response));
			console.log('\nResponse Code of get search result : ' + JSON.stringify(response['status']));
			callback(error, data);
		});
	} catch (error) {
		console.log(error);
	}

}
if (require.main === module) {
	getSearchResults(function () {
		console.log('get transaction search end.');
	});
}
module.exports.getSearchResults = getSearchResults;