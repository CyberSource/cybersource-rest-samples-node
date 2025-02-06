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
    CardProcessingConfigCommonCurrencies,
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
    CardProcessingConfigFeaturesCardPresent,
    CardProcessingConfigFeaturesCardPresentProcessors,
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

function merchant_boarding_tsys(callback) {
	try {
		  var configObject = new configuration();
		  var apiClient = new cybersourceRestApi.ApiClient();

      const reqObj = new PostRegistrationBody();

      const organizationInformation = new Boardingv1registrationsOrganizationInformation();
      organizationInformation.parentOrganizationId = "apitester00";
      organizationInformation.type = "Merchant";
      organizationInformation.configurable = true;

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

      const productInformation = new Boardingv1registrationsProductInformation();
      const selectedProducts = new Boardingv1registrationsProductInformationSelectedProducts();

      const payments = new PaymentsProducts();
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

      const configurationInformation = new PaymentsProductsCardProcessingConfigurationInformation();

      const configurations = new CardProcessingConfig();
      const common = new CardProcessingConfigCommon();
      common.merchantCategoryCode = "5999";
      common.processLevel3Data = "ignored";
      common.defaultAuthTypeCode = "Final";
      common.enablePartialAuth = false;
      common.amexVendorCode = "2233";

      const merchantDescriptorInformation = new CardProcessingConfigCommonMerchantDescriptorInformation();

      merchantDescriptorInformation.city = "cupertino";
      merchantDescriptorInformation.country = "USA";
      merchantDescriptorInformation.name = "kumar";
      merchantDescriptorInformation.state = "CA";
      merchantDescriptorInformation.phone = "888555333";
      merchantDescriptorInformation.zip = "94043";
      merchantDescriptorInformation.street = "steet1";

      common.merchantDescriptorInformation = merchantDescriptorInformation;

      const processors = {};
      const processorObj = new CardProcessingConfigCommonProcessors();
      const acquirer = new CardProcessingConfigCommonAcquirer();

      processorObj.acquirer = acquirer;

      const currencies = {};

      const currencyObj = new CardProcessingConfigCommonCurrencies1();
      currencyObj.enabled = true;
      currencyObj.enabledCardPresent = true;
      currencyObj.enabledCardNotPresent = true;
      currencyObj.terminalId = "1234";
      currencyObj.serviceEnablementNumber = "";

      currencies["CAD"] = currencyObj;

      processorObj.currencies = currencies;

      const paymentTypes = {};
      const paymentTypeObj = new CardProcessingConfigCommonPaymentTypes();
      paymentTypeObj.enabled = true;

      paymentTypes["MASTERCARD"] = paymentTypeObj;
      paymentTypes["VISA"] = paymentTypeObj;

      processorObj.paymentTypes = paymentTypes;

      processorObj.bankNumber = "234576";
      processorObj.chainNumber = "223344";
      processorObj.batchGroup = "vital_1130";
      processorObj.enhancedData = "disabled";
      processorObj.industryCode = "D";
      processorObj.merchantBinNumber = "765576";
      processorObj.merchantId = "834215123456";
      processorObj.merchantLocationNumber = "00001";
      processorObj.storeID = "2563";
      processorObj.vitalNumber = "71234567";
      processorObj.quasiCash = false;
      processorObj.sendAmexLevel2Data = null;
      processorObj.softDescriptorType = "1 - trans_ref_no";
      processorObj.travelAgencyCode = "2356";
      processorObj.travelAgencyName = "Agent";

      processors["tsys"] = processorObj;

      common.processors = processors;

      configurations.common = common;

      const features2 = new CardProcessingConfigFeatures();

      const cardNotPresent = new CardProcessingConfigFeaturesCardNotPresent();

      cardNotPresent.visaStraightThroughProcessingOnly = false;
      cardNotPresent.amexTransactionAdviceAddendum1 = null;

      features2.cardNotPresent = cardNotPresent;

      configurations.features = features2;
      configurationInformation.configurations = configurations;
      configurationInformation.templateId = uuidv4("818048AD-2860-4D2D-BC39-2447654628A1");

      cardProcessing.configurationInformation = configurationInformation;
      payments.cardProcessing = cardProcessing;

      const virtualTerminal = new PaymentsProductsVirtualTerminal();
      const subscriptionInformation5 = new PaymentsProductsPayerAuthenticationSubscriptionInformation();
      subscriptionInformation5.enabled = true;
      virtualTerminal.subscriptionInformation = subscriptionInformation5;

      const configurationInformation5 = new PaymentsProductsVirtualTerminalConfigurationInformation();
      configurationInformation5.templateId = uuidv4("9FA1BB94-5119-48D3-B2E5-A81FD3C657B5");
      virtualTerminal.configurationInformation = configurationInformation5;

      payments.virtualTerminal = virtualTerminal;

      const customerInvoicing = new PaymentsProductsTax();

      const subscriptionInformation6 = new PaymentsProductsPayerAuthenticationSubscriptionInformation();

      subscriptionInformation6.enabled = true;
      customerInvoicing.subscriptionInformation = subscriptionInformation6;
      payments.customerInvoicing = customerInvoicing;

      selectedProducts.payments = payments;

      const risk = new RiskProducts();

      selectedProducts.risk = risk;

      const commerceSolutions = new CommerceSolutionsProducts();

      const tokenManagement = new CommerceSolutionsProductsTokenManagement();

      const subscriptionInformation7 = new PaymentsProductsPayerAuthenticationSubscriptionInformation();
      subscriptionInformation7.enabled = true;
      tokenManagement.subscriptionInformation = subscriptionInformation7;

      const configurationInformation7 = new CommerceSolutionsProductsTokenManagementConfigurationInformation();

      configurationInformation7.templateId = uuidv4("D62BEE20-DCFD-4AA2-8723-BA3725958ABA");
      tokenManagement.configurationInformation = configurationInformation7;

      commerceSolutions.tokenManagement = tokenManagement;
      selectedProducts.commerceSolutions = commerceSolutions;

      const valueAddedServices = new ValueAddedServicesProducts();

      const transactionSearch = new PaymentsProductsTax();

      const subscriptionInformation9 = new PaymentsProductsPayerAuthenticationSubscriptionInformation();
      subscriptionInformation9.enabled = true;
      transactionSearch.subscriptionInformation = subscriptionInformation9;
      valueAddedServices.transactionSearch = transactionSearch;

      const reporting = new PaymentsProductsTax();
      const subscriptionInformation3 = new PaymentsProductsPayerAuthenticationSubscriptionInformation();
      subscriptionInformation3.enabled = true;
      reporting.subscriptionInformation = subscriptionInformation3;
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
    merchant_boarding_tsys(function () {
		console.log('\nMerchant boarding TSYS end.');
	});
}
module.exports.merchant_boarding_tsys = merchant_boarding_tsys;
