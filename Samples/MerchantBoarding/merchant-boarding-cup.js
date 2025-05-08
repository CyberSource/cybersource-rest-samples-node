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
    CommerceSolutionsProductsBinLookup,
    CommerceSolutionsProductsBinLookupConfigurationInformation,
    CommerceSolutionsProductsBinLookupConfigurationInformationConfigurations,
    PaymentsProducts,
    PaymentsProductsPayerAuthentication,
    PaymentsProductsPayerAuthenticationSubscriptionInformation,
    PaymentsProductsPayerAuthenticationConfigurationInformation,
    PayerAuthConfig,
    PayerAuthConfigCardTypes,
    PayerAuthConfigCardTypesVerifiedByVisa,
    PayerAuthConfigCardTypesVerifiedByVisaCurrencies,
    PaymentsProductsCardProcessing,
    PaymentsProductsCardProcessingSubscriptionInformation,
    PaymentsProductsCardProcessingSubscriptionInformationFeatures,
    PaymentsProductsCardProcessingConfigurationInformation,
    CardProcessingConfig,
    CardProcessingConfigCommon,
    CardProcessingConfigCommonMerchantDescriptorInformation,
    CardProcessingConfigCommonProcessors,
    CardProcessingConfigFeatures,
    CardProcessingConfigFeaturesCardNotPresent,
    CardProcessingConfigCommonAcquirer,
    CardProcessingConfigCommonCurrencies1,
    ValueAddedServicesProducts,
    CommerceSolutionsProductsTokenManagementConfigurationInformation,
    CardProcessingConfigFeaturesCardNotPresentProcessors,
    PaymentsProductsVirtualTerminalConfigurationInformation,
    CardProcessingConfigCommonPaymentTypes,
    PaymentsProductsVirtualTerminal,
    PaymentsProductsTax,
    PaymentsProductsPayouts,
    CommerceSolutionsProducts,
    CommerceSolutionsProductsTokenManagement,
    RiskProducts,
    RiskProductsFraudManagementEssentials,
    RiskProductsFraudManagementEssentialsConfigurationInformation
  } = require('cybersource-rest-client');

function merchant_boarding_cup(callback) {
	try {
		   var configObject = new configuration();
		   var apiClient = new cybersourceRestApi.ApiClient();


        // Main request object
        const reqObj = new PostRegistrationBody();
        
        // Organization Information
        const organizationInformation = new Boardingv1registrationsOrganizationInformation();
        organizationInformation.parentOrganizationId = "apitester00";
        organizationInformation.type = "Merchant";
        organizationInformation.configurable = true;
        
        // Business Information
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
        
        // Product Information
        const productInformation = new Boardingv1registrationsProductInformation();
        const selectedProducts = new Boardingv1registrationsProductInformationSelectedProducts();
        
        // Payments Products
        const payments = new PaymentsProducts();
        const cardProcessing = new PaymentsProductsCardProcessing();
        const subscriptionInformation = new PaymentsProductsCardProcessingSubscriptionInformation();
        
        subscriptionInformation.enabled = true;
        const features = {};
        
        const obj1 = new PaymentsProductsCardProcessingSubscriptionInformationFeatures();
        obj1.enabled = true;
        features["cardNotPresent"] = obj1;
        features["cardPresent"] = obj1;
        
        subscriptionInformation.features = features;
        cardProcessing.subscriptionInformation = subscriptionInformation;
        
        const configurationInformation = new PaymentsProductsCardProcessingConfigurationInformation();
        const configurations = new CardProcessingConfig();
        const common = new CardProcessingConfigCommon();
        common.merchantCategoryCode = "1799";
        const processors = {};
        
        const obj2 = new CardProcessingConfigCommonProcessors();
        const acquirer = new CardProcessingConfigCommonAcquirer();
        
        acquirer.countryCode = "344_hongkong";
        acquirer.institutionId = "22344";
        obj2.acquirer = acquirer;
        
        const currencies = {};
        const obj3 = new CardProcessingConfigCommonCurrencies1();
        obj3.enabled = true;
        obj3.enabledCardPresent = false;
        obj3.enabledCardNotPresent = true;
        obj3.merchantId = "112233";
        obj3.terminalId = "11224455";
        obj3.serviceEnablementNumber = "";
        currencies["HKD"] = obj3;
        currencies["AUD"] = obj3;
        currencies["USD"] = obj3;
        
        obj2.currencies = currencies;
        
        const paymentTypes = {};
        const obj4 = new CardProcessingConfigCommonPaymentTypes();
        obj4.enabled = true;
        paymentTypes["CUP"] = obj4;
        obj2.paymentTypes = paymentTypes;
        
        processors["CUP"] = obj2;
        common.processors = processors;
        configurations.common = common;
        configurationInformation.configurations = configurations;
        
        const templateId = uuidv4("1D8BC41A-F04E-4133-87C8-D89D1806106F");
        configurationInformation.templateId = templateId;
        cardProcessing.configurationInformation = configurationInformation;
        payments.cardProcessing = cardProcessing;
        
        const virtualTerminal = new PaymentsProductsVirtualTerminal();
        const subscriptionInformation2 = new PaymentsProductsPayerAuthenticationSubscriptionInformation();
        
        subscriptionInformation2.enabled = true;
        virtualTerminal.subscriptionInformation = subscriptionInformation2;
        
        const configurationInformation2 = new PaymentsProductsVirtualTerminalConfigurationInformation();
        const templateId2 = uuidv4("9FA1BB94-5119-48D3-B2E5-A81FD3C657B5");
        configurationInformation2.templateId = templateId2;
        virtualTerminal.configurationInformation = configurationInformation2;
        payments.virtualTerminal = virtualTerminal;
        
        const customerInvoicing = new PaymentsProductsTax();
        const subscriptionInformation3 = new PaymentsProductsPayerAuthenticationSubscriptionInformation();
        
        subscriptionInformation3.enabled = true;
        customerInvoicing.subscriptionInformation = subscriptionInformation3;
        payments.customerInvoicing = customerInvoicing;
        selectedProducts.payments = payments;
        
        // Risk Products
        const risk = new RiskProducts();
        selectedProducts.risk = risk;
        
        // Commerce Solutions
        const commerceSolutions = new CommerceSolutionsProducts();
        const tokenManagement = new CommerceSolutionsProductsTokenManagement();
        const subscriptionInformation4 = new PaymentsProductsPayerAuthenticationSubscriptionInformation();
        
        subscriptionInformation4.enabled = true;
        tokenManagement.subscriptionInformation = subscriptionInformation4;
        
        const configurationInformation3 = new CommerceSolutionsProductsTokenManagementConfigurationInformation();
        const templateId3 = uuidv4("9FA1BB94-5119-48D3-B2E5-A81FD3C657B5");
        configurationInformation3.templateId = templateId3;
        tokenManagement.configurationInformation = configurationInformation3;
        commerceSolutions.tokenManagement = tokenManagement;
        
        selectedProducts.commerceSolutions = commerceSolutions;
        
        // Value Added Services
        const valueAddedServices = new ValueAddedServicesProducts();
        const transactionSearch = new PaymentsProductsTax();
        const subscriptionInformation5 = new PaymentsProductsPayerAuthenticationSubscriptionInformation();
        
        subscriptionInformation5.enabled = true;
        transactionSearch.subscriptionInformation = subscriptionInformation5;
        valueAddedServices.transactionSearch = transactionSearch;
        
        const reporting = new PaymentsProductsTax();
        reporting.subscriptionInformation = subscriptionInformation5;
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
    merchant_boarding_cup(function () {
		console.log('\nMerchant boarding CUP end.');
	});
}
module.exports.merchant_boarding_cup = merchant_boarding_cup;
