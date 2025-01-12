'use strict';

const superagent = require('superagent');
const crypto = require('crypto');
const { faker } = require('@faker-js/faker');
var fs = require('fs');
var forge = require('node-forge');
var Jwt = require('jwt-simple');
var path = require('path');
var dt = new Date();
var curDate = dt.toGMTString();
/* Create timestamp 8 hours back for report query */
dt.setHours(dt.getHours() - 8);
var requestHost = "apitest.cybersource.com";
var merchantId = "testrest";
var keyPass = "testrest";
function personify(){
	var fName = faker.person.firstName();
	var lName = faker.person.lastName();
	var expYear = dt.getFullYear()+4;
	var payload = JSON.stringify({
		"clientReferenceInformation" : {
			"code" : faker.string.numeric(10)
		},
		"processingInformation" : {
			"capture" : true,
			"commerceIndicator" : "internet"
		},
		"orderInformation" : {
			"billTo" : {
				"firstName" : fName,
				"lastName" : lName,
				"address1" : faker.location.streetAddress(),
				"postalCode" : faker.location.zipCode(),
				"locality" : faker.location.city(),
				"administrativeArea" : faker.location.state(),
				"country" : "US",
				"phoneNumber" : faker.phone.number(),
				"email" : faker.internet.email({firstName:fName,lastName:lName})
			},
			"amountDetails" : {	
				"totalAmount" : faker.commerce.price({ min: 10, max: 500 }),
				"currency" : "USD"
			}
		},
		"paymentInformation" : {
			"card" : {
				"expirationYear" : expYear,
				"number" : faker.finance.creditCardNumber({issuer: '414720#########L'}),
				"securityCode" : faker.finance.creditCardCVV(),
				"expirationMonth" : "12",
				"type" : "001"
			}
		},
		"merchantDefinedInformation" : [
		{
			"key" : "1",
			"value" : merchantId
		}
		],
		"deviceInformation" : {
			"fingerprintSessionId" : "",
			"ipAddress" : faker.internet.ipv4(),
			"useragent" : faker.internet.userAgent()
		}
	});
	return payload;
}
var payload = personify();

function generateDigest(request) {
	var buffer = Buffer.from(payload, 'utf8');

	const hash = crypto.createHash('sha256');

	hash.update(buffer);

	var digest = hash.digest('base64');

	return digest;
}

function paramToString(param) {
	if (param == undefined || param == null) {
		return '';
	}
	if (param instanceof Date) {
		return param.toJSON();
	}
	return param.toString();
}

function normalizeParams(params) {
	var newParams = {};
	for (var key in params) {
		if (params.hasOwnProperty(key) && params[key] != undefined && params[key] != null) {
		var value = params[key];
		if (Array.isArray(value)) {
			newParams[key] = value;
		} else {
			newParams[key] = paramToString(value);
		}
		}
	}
	return newParams;
}

function getJsonWebToken(resource, method, request) {
	var claimSet = '';
	var date = new Date(Date.now()).toUTCString();

	// Getting the certificate
	var filePath = path.resolve('Resource/testrest.p12');
	var p12Buffer = fs.readFileSync(filePath);
	var p12Der = forge.util.binary.raw.encode(new Uint8Array(p12Buffer));
	var p12Asn1 = forge.asn1.fromDer(p12Der);
	var certificate = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, keyPass);

	// Getting the RSA private key

	// get rsa key bags
	var keyBags = certificate.getBags({ bagType: forge.pki.oids.keyBag });
	var bag = keyBags[forge.pki.oids.keyBag][0];

	if(bag == null)
	{
	  // if rsa key bag is null, get pkcs8 key bag
	  keyBags = certificate.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag });
	  bag = keyBags[forge.pki.oids.pkcs8ShroudedKeyBag][0]; 
	}

	var privateKey = bag.key;
	var rsaPrivateKey = forge.pki.privateKeyToPem(privateKey);

	// Getting the certificate in PEM
	var certBags = certificate.getBags({ bagType: forge.pki.oids.certBag });
	var cert = certBags[forge.pki.oids.certBag][0];
	var certificatePem = forge.pki.certificateToPem(cert.cert);
	var certDer = forge.pki.pemToDer(certificatePem);
	var pemCertificate = forge.util.encode64(certDer.data);

	if (method === "get") {
		claimSet = "{\"iat\":\"" + date + "\"}";
	}
	else if (method === "post") {
		var digest = generateDigest(request);
		claimSet = "{\"digest\":\"" + digest + "\",\"digestAlgorithm\":\"SHA-256\",\"iat\":\"" + date + "\"}";
	}

	var x5CList = [pemCertificate];
	var customHeader = {
		'header': {
			'v-c-merchant-id': merchantId,
			'x5c': x5CList
		}
	};

	var claimSetObj = JSON.parse(claimSet);
	//Generating JWToken
	var jwtToken = Jwt.encode(claimSetObj, rsaPrivateKey, 'RS256', customHeader);

	return jwtToken;
}

function write_log_audit(status) {
	var filename = path.basename(__filename).split(".")[0];
	console.log(`[Sample Code Testing] [${filename}] ${status}`);
}

function processPost(callback) {
	var resource = "/pts/v2/payments/";
	var method = "post";
	var statusCode = -1;
	var url = 'https://' + requestHost + resource;

	var headerParams = {};
	var contentType = 'application/json;charset=utf-8';
	var acceptType = 'application/hal+json;charset=utf-8';

	var request = superagent(method, url);

	var bodyParam = payload;

	var token = getJsonWebToken(resource, method, request);

	var date = new Date(Date.now()).toUTCString();

	console.log("\n -- RequestURL --");
	console.log("\tURL : " + url);
	console.log("\n -- HTTP Headers --");
	console.log("\tContent-Type : application/json;charset=utf-8");
	console.log("\tv-c-merchant-id : " + merchantId);
	console.log("\tDate : " + date);
	console.log("\tHost : " + requestHost);
	console.log("\n -- TOKEN --\n" + token);

	token = "Bearer " + token;

	headerParams['Authorization'] = token;

	// Set header parameters
	request.set(normalizeParams(headerParams));

	// Set request timeout
	request.timeout(60000);

	request.type(contentType);

	request.send(bodyParam);

	request.accept(acceptType);

	request.end(function(error, response) {
		var data = response.body;
		if (data == null || (typeof data === 'object' && typeof data.length === 'undefined' && !Object.keys(data).length)) {
			// SuperAgent does not always produce a body; use the unparsed response as a fallback
			data = response.text;
		}

		console.log("\n -- Response Message for POST call --");
		console.log("\tResponse Code : " + response['status']);
		console.log("\tv-c-correlation-id : " + response.headers['v-c-correlation-id']);
		console.log("\tResponse Data :");
		console.log(JSON.stringify(data));

		var _status = -1;
		if (response['status'] >= 200 && response['status'] <= 299) {
			_status = 0;
		}

		callback(error, data, response, _status);
	});

	return request;
}

function processGet(callback) {
	var resource = "/reporting/v3/reports?startTime="+dt.toISOString()+"&endTime="+(new Date()).toISOString()+"&timeQueryType=executedTime&reportMimeType=application/xml";
	var method = "get";
	var statusCode = -1;
	var url = 'https://' + requestHost + resource;

	var headerParams = {};
	var contentType = 'application/json;charset=utf-8';
	var acceptType = 'application/hal+json;charset=utf-8';

	var request = superagent(method, url);

	var token = getJsonWebToken(resource, method, request);

	var date = new Date(Date.now()).toUTCString();

	console.log("\n -- RequestURL --");
	console.log("\tURL : " + url);
	console.log("\n -- HTTP Headers --");
	console.log("\tContent-Type : application/json;charset=utf-8");
	console.log("\tv-c-merchant-id : " + merchantId);
	console.log("\tDate : " + date);
	console.log("\tHost : " + requestHost);
	console.log("\n -- TOKEN --\n" + token);

	token = "Bearer " + token;

	headerParams['Authorization'] = token;

	// Set header parameters
	request.set(normalizeParams(headerParams));

	// Set request timeout
	request.timeout(60000);

	request.type(contentType);

	request.accept(acceptType);

	request.end(function(error, response) {
		var data = response.body;
		if (data == null || (typeof data === 'object' && typeof data.length === 'undefined' && !Object.keys(data).length)) {
			// SuperAgent does not always produce a body; use the unparsed response as a fallback
			data = response.text;
		}

		console.log("\n -- Response Message for GET call --");
		console.log("\tResponse Code : " + response['status']);
		console.log("\tv-c-correlation-id : " + response.headers['v-c-correlation-id']);
		console.log("\tResponse Data :");
		console.log(JSON.stringify(data));

		var _status = -1;
		if (response['status'] >= 200 && response['status'] <= 299) {
			_status = 0;
		}

		callback(error, data, response, _status);
	});

	return request;
}

function standaloneJwt(callback) {
	var statusCodeGet, statusCodePost;
	// HTTP POST REQUEST
	console.log('\n\nSample 1: POST call - CyberSource Payments API - HTTP POST Payment request');
	processPost(function (error, data, response, statusCode) {
		statusCodePost = statusCode;
		if (statusCode == 0) {
			console.log("\nSTATUS : SUCCESS (HTTP Status = " + statusCode + ")");
		}
		else {
			console.log("\nSTATUS : ERROR (HTTP Status = " + statusCode + ")");
		}
	});

	// HTTP GET REQUEST
	console.log('\n\nSample 2: GET call - CyberSource Reporting API - HTTP GET Reporting request');
	processGet(function (error, data, response, statusCode) {
		statusCodeGet = statusCode;
		if (statusCode == 0) {
			console.log("\nSTATUS : SUCCESS (HTTP Status = " + statusCode + ")");
		}
		else {
			console.log("\nSTATUS : ERROR (HTTP Status = " + statusCode + ")");
		}
	});

	if (statusCodeGet == 0 && statusCodePost == 0) {
		write_log_audit(200);
	} else {
		write_log_audit(400);
	}
}

if (require.main === module) {
	standaloneJwt(function () {
		console.log('\nStandAlone JWT end.');
	}, false);
}
module.exports.standaloneJwt = standaloneJwt;