'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/MerchantBoardingConfiguration.js');
var configuration = require(filePath);
const UUID = require('uuid');

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
    PaymentsProductsPayerAuthentication,
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

function merchant_boarding_amex_direct(callback) {
	try {
        var configObject = new configuration();
        var apiClient = new cybersourceRestApi.ApiClient();


        // Create the main request object
        const reqObj = new PostRegistrationBody();

        const organizationInformation = new Boardingv1registrationsOrganizationInformation();
        organizationInformation.parentOrganizationId = "apitester00";
        organizationInformation.type = "Merchant";
        organizationInformation.configurable = true;

        // Create and set business information
        const businessInformation = new Boardingv1registrationsOrganizationInformationBusinessInformation();
        businessInformation.name = "StuartWickedFastEatz";

        const address = new Boardingv1registrationsOrganizationInformationBusinessInformationAddress();
        address.country = "US";
        address.address1 = "123456 SandMarket";
        address.locality = "ORMOND BEACH";
        address.administrativeArea = "FL";
        address.postalCode = "32176";
        businessInformation.address = address;

        businessInformation.websiteUrl = "https://www.StuartWickedEats.com";
        businessInformation.phoneNumber = "6574567813";

        const businessContact = new Boardingv1registrationsOrganizationInformationBusinessInformationBusinessContact();
        businessContact.firstName = "Stuart";
        businessContact.lastName = "Stuart";
        businessContact.phoneNumber = "6574567813";
        businessContact.email = "svc_email_bt@corpdev.visa.com";
        businessInformation.businessContact = businessContact;

        businessInformation.merchantCategoryCode = "5999";
        organizationInformation.businessInformation = businessInformation;

        reqObj.organizationInformation = organizationInformation;

        // Product Information
        const productInformation = new Boardingv1registrationsProductInformation();

        // Selected Products
        const selectedProducts = new Boardingv1registrationsProductInformationSelectedProducts();

        // Payments Products
        const payments = new PaymentsProducts();

        // Card Processing
        const cardProcessing = new PaymentsProductsCardProcessing();
        const subscriptionInformation = new PaymentsProductsCardProcessingSubscriptionInformation();
        subscriptionInformation.enabled = true;

        const features = {};
        const featureObj = new PaymentsProductsCardProcessingSubscriptionInformationFeatures();
        featureObj.enabled = true;
        features["cardNotPresent"] = featureObj;
        features["cardPresent"] = featureObj;
        subscriptionInformation.features = features;

        cardProcessing.subscriptionInformation = subscriptionInformation;

        // Configuration Information
        const configurationInformation = new PaymentsProductsCardProcessingConfigurationInformation();
        const configurations = new CardProcessingConfig();
        const common = new CardProcessingConfigCommon();

        common.merchantCategoryCode = "1799";

        const merchantDescriptorInformation = new CardProcessingConfigCommonMerchantDescriptorInformation();
        merchantDescriptorInformation.city = "Cupertino";
        merchantDescriptorInformation.country = "USA";
        merchantDescriptorInformation.name = "Mer name";
        merchantDescriptorInformation.phone = "8885554444";
        merchantDescriptorInformation.zip = "94043";
        merchantDescriptorInformation.state = "CA";
        merchantDescriptorInformation.street = "mer street";
        merchantDescriptorInformation.url = "www.test.com";
        common.merchantDescriptorInformation = merchantDescriptorInformation;

        common.subMerchantId = "123457";
        common.subMerchantBusinessName = "bus name";

        const processors = {};
        const processorObj = new CardProcessingConfigCommonProcessors();
        processorObj.acquirer = new CardProcessingConfigCommonAcquirer();

        const currencies = {};
        const currencyObj = new CardProcessingConfigCommonCurrencies1();
        currencyObj.enabled = true;
        currencyObj.enabledCardPresent = true;
        currencyObj.terminalId = "";
        currencyObj.serviceEnablementNumber = "1234567890";
        currencies["AED"] = currencyObj;
        currencies["FJD"] = currencyObj;
        currencies["USD"] = currencyObj;
        processorObj.currencies = currencies;

        const paymentTypes = {};
        const paymentTypeObj = new CardProcessingConfigCommonPaymentTypes();
        paymentTypeObj.enabled = true;
        paymentTypes["AMERICAN_EXPRESS"] = paymentTypeObj;
        processorObj.paymentTypes = paymentTypes;

        processorObj.allowMultipleBills = false;
        processorObj.avsFormat = "basic";
        processorObj.batchGroup = "amexdirect_vme_default";
        processorObj.enableAutoAuthReversalAfterVoid = false;
        processorObj.enhancedData = "disabled";
        processorObj.enableLevel2 = false;
        processorObj.amexTransactionAdviceAddendum1 = "amex123";
        processors["acquirer"] = processorObj;

        common.processors = processors;
        configurations.common = common;

        const features2 = new CardProcessingConfigFeatures();
        const cardNotPresent = new CardProcessingConfigFeaturesCardNotPresent();
        const processors3 = {};

        const processorObj3 = new CardProcessingConfigFeaturesCardNotPresentProcessors();
        processorObj3.relaxAddressVerificationSystem = true;
        processorObj3.relaxAddressVerificationSystemAllowExpiredCard = true;
        processorObj3.relaxAddressVerificationSystemAllowZipWithoutCountry = false;
        processors3["amexdirect"] = processorObj3;

        cardNotPresent.processors = processors3;
        features2.cardNotPresent = cardNotPresent;
        configurations.features = features2;

        configurationInformation.configurations = configurations;
        configurationInformation.templateId = uuidv4("2B80A3C7-5A39-4CC3-9882-AC4A828D3646");
        cardProcessing.configurationInformation = configurationInformation;
        payments.cardProcessing = cardProcessing;

        // Virtual Terminal
        const virtualTerminal = new PaymentsProductsVirtualTerminal();

        const configurationInformation3 = new PaymentsProductsVirtualTerminalConfigurationInformation();
        configurationInformation3.templateId = uuidv4("9FA1BB94-5119-48D3-B2E5-A81FD3C657B5");
        virtualTerminal.configurationInformation = configurationInformation3;
        payments.virtualTerminal = virtualTerminal;

        // Customer Invoicing
        const customerInvoicing = new PaymentsProductsTax();
        payments.customerInvoicing = customerInvoicing;

        selectedProducts.payments = payments;

        // Risk Products
        const risk = new RiskProducts();
        selectedProducts.risk = risk;

        // Commerce Solutions
        const commerceSolutions = new CommerceSolutionsProducts();
        const tokenManagement = new CommerceSolutionsProductsTokenManagement();

        const configurationInformation4 = new CommerceSolutionsProductsTokenManagementConfigurationInformation();
        configurationInformation4.templateId = uuidv4("D62BEE20-DCFD-4AA2-8723-BA3725958ABA");
        tokenManagement.configurationInformation = configurationInformation4;
        commerceSolutions.tokenManagement = tokenManagement;
        selectedProducts.commerceSolutions = commerceSolutions;

        // Value Added Services
        const valueAddedServices = new ValueAddedServicesProducts();
        const transactionSearch = new PaymentsProductsTax();
        valueAddedServices.transactionSearch = transactionSearch;

        const reporting = new PaymentsProductsTax();
        valueAddedServices.reporting = reporting;

        selectedProducts.valueAddedServices = valueAddedServices;

        // Assign selected products to product information
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
    merchant_boarding_amex_direct(function () {
		console.log('\nMerchant boarding amex direct end.');
	});
}
module.exports.merchant_boarding_amex_direct = merchant_boarding_amex_direct;
