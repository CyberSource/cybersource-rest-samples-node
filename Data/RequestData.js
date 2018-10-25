'use strict';

/*
* If request.json file is not provided data is taken from RequestData module
*/

var fs = require('fs');

var AggregatorInformation = require('../../APISDK/src/com/cybersource/api/model/AggregatorInformation');
var AmountDetails = require('../../APISDK/src/com/cybersource/api/model/AmountDetails');
var BillTo = require('../../APISDK/src/com/cybersource/api/model/BillTo');
var Card = require('../../APISDK/src/com/cybersource/api/model/Card');
var ClientReferenceInformation = require('../../APISDK/src/com/cybersource/api/model/ClientReferenceInformation');
var OrderInformation = require('../../APISDK/src/com/cybersource/api/model/OrderInformation');
var PaymentInformation = require('../../APISDK/src/com/cybersource/api/model/PaymentInformation');
var Payments = require('../../APISDK/src/com/cybersource/api/model/Payments');
var ProcessingInformation = require('../../APISDK/src/com/cybersource/api/model/ProcessingInformation');
var SubMerchant = require('../../APISDK/src/com/cybersource/api/model/SubMerchant');

exports.jsonFileData = function (filePath) {

    return new Promise(function (resolve, reject) {
        var configObject;
        if (fs.existsSync(filePath)) {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        }
        else {
            var err = new Error(Constants.FILE_NOT_FOUND + filePath);
            console.log(err.stack);
            reject(err);
        }
    })

}

//Create the Sample Data using Model Classes of Payments API
exports.samplePaymentsData = function () {

    var clientReferenceInformation = new ClientReferenceInformation();
    clientReferenceInformation.setCode("TC50171_3");

    var processingInformation = new ProcessingInformation();
    processingInformation.setCommerceIndicator("internet");

    var subMerchant = new SubMerchant();
    subMerchant.setAddress1("900 Metro Center");
    subMerchant.setAdministrativeArea("CA");
    subMerchant.setCardAcceptorID("1234567890");
    subMerchant.setCountry("US");
    subMerchant.setEmail("test@cybs.com");
    subMerchant.setLocality("San Francisco");
    subMerchant.setName("Visa Inc");
    subMerchant.setPhoneNumber("4158880000");
    subMerchant.setPostalCode("94105");
    subMerchant.setRegion("PEN");

    var aggregatorInformation = new AggregatorInformation();
    aggregatorInformation.setSubMerchant(subMerchant);
    aggregatorInformation.setName("V-Internatio");
    aggregatorInformation.setAggregatorID("123456789");

    var billTo = new BillTo();
    billTo.setAddress1("201 S. Division St.");
    billTo.setAddress2("Address 2");
    billTo.setAdministrativeArea("MI");
    billTo.setBuildingNumber("123");
    billTo.setCompany("Visa");
    billTo.setCountry("US");
    billTo.setDistrict("MI");
    billTo.setEmail("test@cybs.com");
    billTo.setFirstName("John");
    billTo.setLastName("Deo");
    billTo.setLocality("Ann Arbor");
    billTo.setPhoneNumber("999999999");
    billTo.setPostalCode("48104-2201");

    var amountDetails = new AmountDetails();
    amountDetails.setCurrency("USD");
    amountDetails.setTotalAmount("102.21");

    var orderInformation = new OrderInformation();
    orderInformation.setAmountDetails(amountDetails);
    orderInformation.setBillTo(billTo);

    var card = new Card();
    card.setExpirationMonth("12");
    card.setExpirationYear("2031");
    card.setNumber("5555555555554444");
    card.setSecurityCode("123");
    card.setType("002");

    var paymentInformation = new PaymentInformation();
    paymentInformation.setCard(card);

    var payments = new Payments();
    payments.setAggregatorInformation(aggregatorInformation);
    payments.setClientReferenceInformation(clientReferenceInformation);
    payments.setOrderInformation(orderInformation);
    payments.setPaymentInformation(paymentInformation);
    payments.setProcessingInformation(processingInformation);

    return JSON.stringify(payments, null, 2);

}
