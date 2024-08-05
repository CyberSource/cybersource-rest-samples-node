'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function bin_lookup_with_tms_jwt_transient_token(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreateBinLookupRequest();

		var tokenInformation = new cybersourceRestApi.Binv1binlookupTokenInformation();
		tokenInformation.transientTokenJwt = 'eyJraWQiOiIwODd0bk1DNU04bXJHR3JHMVJQTkwzZ2VyRUh5VWV1ciIsImFsZyI6IlJTMjU2In0.eyJpc3MiOiJGbGV4LzA4IiwiZXhwIjoxNjYwMTk1ODcwLCJ0eXBlIjoiYXBpLTAuMS4wIiwiaWF0IjoxNjYwMTk0OTcwLCJqdGkiOiIxRTBXQzFHTzg3SkcxQkRQMENROFNDUjFUVEs4NlU5Tjk4SDNXSDhJRk05TVZFV1RJWUZJNjJGNDk0MUU3QTkyIiwiY29udGVudCI6eyJwYXltZW50SW5mb3JtYXRpb24iOnsiY2FyZCI6eyJudW1iZXIiOnsibWFza2VkVmFsdWUiOiJYWFhYWFhYWFhYWFgxMTExIiwiYmluIjoiNDExMTExIn0sInR5cGUiOnsidmFsdWUiOiIwMDEifX19fX0.MkCLbyvufN4prGRvHJcqCu1WceDVlgubZVpShNWQVjpuFQUuqwrKg284sC7ucVKuIsOU0DTN8_OoxDLduvZhS7X_5TnO0QjyA_aFxbRBvU_bEz1l9V99VPADG89T-fox_L6sLUaoTJ8T4PyD7rkPHEA0nmXbqQCVqw4Czc5TqlKCwmL-Fe0NBR2HlOFI1PrSXT-7_wI-JTgXI0dQzb8Ub20erHwOLwu3oni4_ZmS3rGI_gxq2MHi8pO-ZOgA597be4WfVFAx1wnMbareqR72a0QM4DefeoltrpNqXSaASVyb5G0zuqg-BOjWJbawmg2QgcZ_vE3rJ6PDgWROvp9Tbw';
		requestObj.tokenInformation = tokenInformation;


		var instance = new cybersourceRestApi.BinLookupApi(configObject, apiClient);

		instance.getAccountInfo(requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of BIN Lookup API : ' + JSON.stringify(response['status']));

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
	bin_lookup_with_tms_jwt_transient_token(function () {
		console.log('\nGetAccountInfo end.');
	});
}

module.exports.bin_lookup_with_tms_jwt_transient_token = bin_lookup_with_tms_jwt_transient_token;