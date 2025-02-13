'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/MerchantBoardingConfiguration.js');
var configuration = require(filePath);
const UUID = require('uuid');
const { faker } = require('@faker-js/faker');

const { v4: uuidv4 } = require('uuid');

const { 
    PostRegistrationBody, 
    Boardingv1registrationsOrganizationInformation, 
    Boardingv1registrationsOrganizationInformationBusinessInformation, 
    Boardingv1registrationsOrganizationInformationBusinessInformationAddress, 
    Boardingv1registrationsOrganizationInformationBusinessInformationBusinessContact, 
    Boardingv1registrationsProductInformation, 
    Boardingv1registrationsProductInformationSelectedProducts, 
    PaymentsProducts, 
    PaymentsProductsCardProcessing, 
    PaymentsProductsCardProcessingSubscriptionInformation, 
    PaymentsProductsCardProcessingSubscriptionInformationFeatures, 
    PaymentsProductsCardProcessingConfigurationInformation, 
    CardProcessingConfig, 
    CardProcessingConfigCommon, 
    CardProcessingConfigCommonProcessors, 
    CardProcessingConfigCommonAcquirer, 
    CardProcessingConfigCommonCurrencies1, 
    CardProcessingConfigCommonPaymentTypes, 
    CardProcessingConfigFeatures, 
    CardProcessingConfigFeaturesCardNotPresent, 
    CardProcessingConfigFeaturesCardNotPresentProcessors, 
    CardProcessingConfigFeaturesCardNotPresentPayouts, 
    PaymentsProductsVirtualTerminal, 
    PaymentsProductsPayerAuthenticationSubscriptionInformation, 
    PaymentsProductsVirtualTerminalConfigurationInformation, 
    PaymentsProductsTax, 
    RiskProducts, 
    CommerceSolutionsProducts, 
    CommerceSolutionsProductsTokenManagement, 
    CommerceSolutionsProductsTokenManagementConfigurationInformation, 
    ValueAddedServicesProducts 
} = require('cybersource-rest-client'); 


function merchant_boarding_barclays(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
        
        const reqObj = new PostRegistrationBody();
        
        const organizationInformation = new Boardingv1registrationsOrganizationInformation();
        organizationInformation.parentOrganizationId = "apitester00";
        organizationInformation.type = "Merchant";
        organizationInformation.configurable = true;
        
        const businessInformation = new Boardingv1registrationsOrganizationInformationBusinessInformation();
        businessInformation.name = faker.word.adjective()+faker.word.noun();
        
        const address = new Boardingv1registrationsOrganizationInformationBusinessInformationAddress();
        address.country = "US";
        address.address1 = faker.location.streetAddress();
        address.locality = faker.location.city();
        address.administrativeArea = "FL";
        address.postalCode = faker.helpers.fake('{{helpers.fromRegExp("[9][0-6][0-1][0-6][0-9]")}}');
        businessInformation.address = address;
        businessInformation.websiteUrl = faker.internet.url({ protocol: 'https', appendSlash: false });
        businessInformation.phoneNumber = faker.string.numeric(10);
        
        const businessContact = new Boardingv1registrationsOrganizationInformationBusinessInformationBusinessContact();
        businessContact.firstName = faker.person.firstName();
        businessContact.firstName = faker.person.lastName();
        businessContact.phoneNumber = faker.string.numeric(10);
        businessContact.email = "svc_email_bt@corpdev.visa.com";
        businessInformation.businessContact = businessContact;
        businessInformation.merchantCategoryCode = "5999";
        
        organizationInformation.businessInformation = businessInformation;
        reqObj.organizationInformation = organizationInformation;
        
        const productInformation = new Boardingv1registrationsProductInformation();
        const selectedProducts = new Boardingv1registrationsProductInformationSelectedProducts();
        
        const payments = new PaymentsProducts();
        const cardProcessing = new PaymentsProductsCardProcessing();
        const subscriptionInformation = new PaymentsProductsCardProcessingSubscriptionInformation();
        subscriptionInformation.enabled = true;
        
        const features = new Map();
        const obj1 = new PaymentsProductsCardProcessingSubscriptionInformationFeatures();
        obj1.enabled = true;
        features.set("cardNotPresent", obj1);
        features.set("cardPresent", obj1);
        subscriptionInformation.features = features;
        cardProcessing.subscriptionInformation = subscriptionInformation;
        
        const configurationInformation = new PaymentsProductsCardProcessingConfigurationInformation();
        const configurations = new CardProcessingConfig();
        const common = new CardProcessingConfigCommon();
        common.merchantCategoryCode = "5999";
        common.defaultAuthTypeCode = "Final";
        
        const processors = new Map();
        const obj2 = new CardProcessingConfigCommonProcessors();
        const acquirer = new CardProcessingConfigCommonAcquirer();
        obj2.acquirer = acquirer;
        
        const currencies = new Map();
        const obj3 = new CardProcessingConfigCommonCurrencies1();
        obj3.enabled = true;
        obj3.enabledCardPresent = false;
        obj3.enabledCardNotPresent = true;
        obj3.merchantId = "1234";
        obj3.serviceEnablementNumber = "";
        const terminalIds = ["12351245"];
        obj3.terminalIds = terminalIds;
        currencies.set("AED", obj3);
        currencies.set("USD", obj3);
        obj2.currencies = currencies;
        
        const paymentTypes = new Map();
        const obj4 = new CardProcessingConfigCommonPaymentTypes();
        obj4.enabled = true;
        paymentTypes.set("MASTERCARD", obj4);
        paymentTypes.set("VISA", obj4);
        obj2.paymentTypes = paymentTypes;
        
        obj2.batchGroup = "barclays2_16";
        obj2.quasiCash = false;
        obj2.enhancedData = "disabled";
        obj2.merchantId = "124555";
        obj2.enableMultiCurrencyProcessing = "false";
        
        processors.set("barclays2", obj2);
        common.processors = processors;
        configurations.common = common;
        
        const features3 = new CardProcessingConfigFeatures();
        const cardNotPresent = new CardProcessingConfigFeaturesCardNotPresent();
        const processors4 = new Map();
        const obj6 = new CardProcessingConfigFeaturesCardNotPresentProcessors();
        const payouts = new CardProcessingConfigFeaturesCardNotPresentPayouts();
        payouts.merchantId = "1233";
        payouts.terminalId = "1244";
        obj6.payouts = payouts;
        processors4.set("barclays2", obj6);
        cardNotPresent.processors = processors4;
        features3.cardNotPresent = cardNotPresent;
        configurations.features = features3;
        
        configurationInformation.configurations = configurations;
        configurationInformation.templateId = "0A413572-1995-483C-9F48-FCBE4D0B2E86";
        cardProcessing.configurationInformation = configurationInformation;
        payments.cardProcessing = cardProcessing;
        
        const virtualTerminal = new PaymentsProductsVirtualTerminal();
        const subscriptionInformation2 = new PaymentsProductsPayerAuthenticationSubscriptionInformation();
        subscriptionInformation2.enabled = true;
        virtualTerminal.subscriptionInformation = subscriptionInformation2;
        
        const configurationInformation2 = new PaymentsProductsVirtualTerminalConfigurationInformation();
        configurationInformation2.templateId = "E4EDB280-9DAC-4698-9EB9-9434D40FF60C";
        virtualTerminal.configurationInformation = configurationInformation2;
        payments.virtualTerminal = virtualTerminal;
        
        const customerInvoicing = new PaymentsProductsTax();
        const subscriptionInformation3 = new PaymentsProductsPayerAuthenticationSubscriptionInformation();
        subscriptionInformation3.enabled = true;
        customerInvoicing.subscriptionInformation = subscriptionInformation3;
        payments.customerInvoicing = customerInvoicing;
        
        selectedProducts.payments = payments;
        
        const risk2 = new RiskProducts();
        selectedProducts.risk = risk2;
        
        const commerceSolutions = new CommerceSolutionsProducts();
        const tokenManagement = new CommerceSolutionsProductsTokenManagement();
        const subscriptionInformation5 = new PaymentsProductsPayerAuthenticationSubscriptionInformation();
        subscriptionInformation5.enabled = true;
        tokenManagement.subscriptionInformation = subscriptionInformation5;
        
        const configurationInformation5 = new CommerceSolutionsProductsTokenManagementConfigurationInformation();
        configurationInformation5.templateId = "D62BEE20-DCFD-4AA2-8723-BA3725958ABA";
        tokenManagement.configurationInformation = configurationInformation5;
        commerceSolutions.tokenManagement = tokenManagement;
        selectedProducts.commerceSolutions = commerceSolutions;
        
        const valueAddedServices = new ValueAddedServicesProducts();
        const transactionSearch = new PaymentsProductsTax();
        const subscriptionInformation6 = new PaymentsProductsPayerAuthenticationSubscriptionInformation();
        subscriptionInformation6.enabled = true;
        transactionSearch.subscriptionInformation = subscriptionInformation6;
        valueAddedServices.transactionSearch = transactionSearch;
        
        const reporting = new PaymentsProductsTax();
        const subscriptionInformation7 = new PaymentsProductsPayerAuthenticationSubscriptionInformation();
        subscriptionInformation7.enabled = true;
        reporting.subscriptionInformation = subscriptionInformation7;
        valueAddedServices.reporting = reporting;
        selectedProducts.valueAddedServices = valueAddedServices;
        
        productInformation.selectedProducts = selectedProducts;
        reqObj.productInformation = productInformation;



        var instance = new cybersourceRestApi.MerchantBoardingApi(configObject, apiClient);

		instance.postRegistration( reqObj,null, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Merchant Boarding API : ' + JSON.stringify(response['status']));
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
	 console.log(`[Merchant boarding Sample Code Testing] [${filename}] ${status}`);
}

if (require.main === module) {	
    merchant_boarding_barclays(function () {
		console.log('\nMerchant boarding barclays end.');
	});
}
module.exports.merchant_boarding_barclays = merchant_boarding_barclays;
