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

function merchant_boarding_smartfdc(callback) {
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

      const cardNotPresentFeature = new PaymentsProductsCardProcessingSubscriptionInformationFeatures();
      cardNotPresentFeature.enabled = true;

      features.cardNotPresent = cardNotPresentFeature;
      features.cardPresent = cardNotPresentFeature;
      subscriptionInformation.features = features;

      cardProcessing.subscriptionInformation = subscriptionInformation;

      const configurationInformation = new PaymentsProductsCardProcessingConfigurationInformation();
      const configurations = new CardProcessingConfig();
      const common = new CardProcessingConfigCommon();

      common.merchantCategoryCode = "1799";
      common.defaultAuthTypeCode = "Final";
      common.enablePartialAuth = true;

      const processors = {};
      const processorConfig = new CardProcessingConfigCommonProcessors();
      const acquirer = new CardProcessingConfigCommonAcquirer();

      processorConfig.acquirer = acquirer;

      const paymentTypes = {};
      const paymentTypeConfig = new CardProcessingConfigCommonPaymentTypes();
      paymentTypeConfig.enabled = true;

      paymentTypes.MASTERCARD = paymentTypeConfig;
      paymentTypes.DISCOVER = paymentTypeConfig;
      paymentTypes.JCB = paymentTypeConfig;
      paymentTypes.VISA = paymentTypeConfig;
      paymentTypes.DINERS_CLUB = paymentTypeConfig;
      paymentTypes.AMERICAN_EXPRESS = paymentTypeConfig;

      processorConfig.paymentTypes = paymentTypes;
      processorConfig.batchGroup = "smartfdc_00";
      processorConfig.merchantId = "00001234567";
      processorConfig.terminalId = "00007654321";

      processors.smartfdc = processorConfig;

      common.processors = processors;
      configurations.common = common;

      configurationInformation.configurations = configurations;
      configurationInformation.templateId = uuidv4("3173DA78-A71E-405B-B79C-928C1A9C6AB2");

      cardProcessing.configurationInformation = configurationInformation;
      payments.cardProcessing = cardProcessing;

      const virtualTerminal = new PaymentsProductsVirtualTerminal();

      const virtualTerminalConfigInformation = new PaymentsProductsVirtualTerminalConfigurationInformation();
      virtualTerminalConfigInformation.templateId = uuidv4("9FA1BB94-5119-48D3-B2E5-A81FD3C657B5");

      virtualTerminal.configurationInformation = virtualTerminalConfigInformation;
      payments.virtualTerminal = virtualTerminal;

      const customerInvoicing = new PaymentsProductsTax();

      payments.customerInvoicing = customerInvoicing;

      selectedProducts.payments = payments;

      const risk = new RiskProducts();
      selectedProducts.risk = risk;

      const commerceSolutions = new CommerceSolutionsProducts();
      const tokenManagement = new CommerceSolutionsProductsTokenManagement();


      const tokenManagementConfigInformation = new CommerceSolutionsProductsTokenManagementConfigurationInformation();
      tokenManagementConfigInformation.templateId = uuidv4("D62BEE20-DCFD-4AA2-8723-BA3725958ABA");

      tokenManagement.configurationInformation = tokenManagementConfigInformation;
      commerceSolutions.tokenManagement = tokenManagement;

      selectedProducts.commerceSolutions = commerceSolutions;

      const valueAddedServices = new ValueAddedServicesProducts();
      const transactionSearch = new PaymentsProductsTax();

      valueAddedServices.transactionSearch = transactionSearch;

      const reporting = new PaymentsProductsTax();

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
    merchant_boarding_smartfdc(function () {
		console.log('\nMerchant boarding SmartFDC end.');
	});
}
module.exports.merchant_boarding_smartfdc = merchant_boarding_smartfdc;
