'use strict';

const superagent = require('superagent');
const crypto = require('crypto');

var fs = require('fs');
var forge = require('node-forge');
var Jwt = require('jwt-simple');
var path = require('path');

var requestHost = "apitest.cybersource.com";
var merchantId = "testrest";
var merchantKeyId = "08c94330-f618-42a3-b09d-e1e43be5efda";
var merchantSecretKey = "yBJxy6LjM2TmcPGu+GaJrHtkke25fPpUX+UY6/L/1tE=";
var keyPass = "testrest";
var payload = "{" +
        "  \"clientReferenceInformation\": {" +
        "    \"code\": \"TC50171_3\"" +
        "  }," +
        "  \"processingInformation\": {" +
        "    \"commerceIndicator\": \"internet\"" +
        "  }," +
        "  \"orderInformation\": {" +
        "    \"billTo\": {" +
        "      \"firstName\": \"john\"," +
        "      \"lastName\": \"doe\"," +
        "      \"address1\": \"201 S. Division St.\"," +
        "      \"postalCode\": \"48104-2201\"," +
        "      \"locality\": \"Ann Arbor\"," +
        "      \"administrativeArea\": \"MI\"," +
        "      \"country\": \"US\"," +
        "      \"phoneNumber\": \"999999999\"," +
        "      \"email\": \"test@cybs.com\"" +
        "    }," +
        "    \"amountDetails\": {" +
        "      \"totalAmount\": \"10\"," +
        "      \"currency\": \"USD\"" +
        "    }" +
        "  }," +
        "  \"paymentInformation\": {" +
        "    \"card\": {" +
        "      \"expirationYear\": \"2031\"," +
        "      \"number\": \"5555555555554444\"," +
        "      \"securityCode\": \"123\"," +
        "      \"expirationMonth\": \"12\"," +
        "      \"type\": \"002\"" +
        "    }" +
        "  }" +
        "}";
		
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
	var keyBags = certificate.getBags({ bagType: forge.pki.oids.keyBag });
	var bag = keyBags[forge.pki.oids.keyBag][0];
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
	var resource = "/reporting/v3/reports?startTime=2018-10-01T00:00:00.0Z&endTime=2018-10-30T23:59:59.0Z&timeQueryType=executedTime&reportMimeType=application/xml";
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
	// HTTP POST REQUEST    
	console.log('\n\nSample 1: POST call - CyberSource Payments API - HTTP POST Payment request');
	processPost(function (error, data, response, statusCode) {
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
		if (statusCode == 0) {
			console.log("\nSTATUS : SUCCESS (HTTP Status = " + statusCode + ")");
		}
		else {
			console.log("\nSTATUS : ERROR (HTTP Status = " + statusCode + ")");
		}
	});
}

if (require.main === module) {
	standaloneJwt(function () {
		console.log('\nStandAlone JWT end.');
	}, false);
}
module.exports.standaloneJwt = standaloneJwt;