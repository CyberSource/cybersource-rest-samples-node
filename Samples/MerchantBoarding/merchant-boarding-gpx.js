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

function merchant_boarding_gpx(callback) {
	try {
		  var configObject = new configuration();
		  var apiClient = new cybersourceRestApi.ApiClient();

      const reqObj = new PostRegistrationBody();
      const organizationInformation = new Boardingv1registrationsOrganizationInformation();
      organizationInformation.parentOrganizationId = "apitester00";
      organizationInformation.type = Boardingv1registrationsOrganizationInformation.TypeEnum.MERCHANT;
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
      const features = {};
      
      const featureObj1 = new PaymentsProductsCardProcessingSubscriptionInformationFeatures();
      featureObj1.enabled = true;
      features['cardNotPresent'] = featureObj1;
      features['cardPresent'] = featureObj1;
      subscriptionInformation.features = features;
      cardProcessing.subscriptionInformation = subscriptionInformation;
      
      const configurationInformation = new PaymentsProductsCardProcessingConfigurationInformation();
      const configurations = new CardProcessingConfig();
      const common = new CardProcessingConfigCommon();
      
      common.merchantCategoryCode = "1799";
      common.defaultAuthTypeCode = CardProcessingConfigCommon.DefaultAuthTypeCodeEnum.FINAL;
      common.foodAndConsumerServiceId = "1456";
      common.masterCardAssignedId = "4567";
      common.sicCode = "1345";
      common.enablePartialAuth = false;
      common.allowCapturesGreaterThanAuthorizations = false;
      common.enableDuplicateMerchantReferenceNumberBlocking = false;
      common.creditCardRefundLimitPercent = "2";
      common.businessCenterCreditCardRefundLimitPercent = "3";
      
      const processors = {};
      
      const processorObj = new CardProcessingConfigCommonProcessors();
      const acquirer = new CardProcessingConfigCommonAcquirer();
      
      acquirer.countryCode = "840_usa";
      acquirer.fileDestinationBin = "123456";
      acquirer.interbankCardAssociationId = "1256";
      acquirer.institutionId = "113366";
      acquirer.discoverInstitutionId = "1567";
      
      processorObj.acquirer = acquirer;
      
      const currencies = {};
      const currencyObj = new CardProcessingConfigCommonCurrencies1();
      currencyObj.enabled = true;
      currencyObj.enabledCardPresent = false;
      currencyObj.enabledCardNotPresent = true;
      currencyObj.terminalId = "";
      currencyObj.serviceEnablementNumber = "";
      
      currencies['AED'] = currencyObj;
      
      processorObj.currencies = currencies;
      
      const paymentTypes = {};
      
      const paymentTypeObj = new CardProcessingConfigCommonPaymentTypes();
      paymentTypeObj.enabled = true;
      
      paymentTypes['MASTERCARD'] = paymentTypeObj;
      paymentTypes['DISCOVER'] = paymentTypeObj;
      paymentTypes['JCB'] = paymentTypeObj;
      paymentTypes['VISA'] = paymentTypeObj;
      paymentTypes['DINERS_CLUB'] = paymentTypeObj;
      paymentTypes['PIN_DEBIT'] = paymentTypeObj;
      
      processorObj.paymentTypes = paymentTypes;
      
      processorObj.allowMultipleBills = true;
      processorObj.batchGroup = "gpx";
      processorObj.businessApplicationId = "AA";
      processorObj.enhancedData = "disabled";
      processorObj.fireSafetyIndicator = false;
      processorObj.abaNumber = "1122445566778";
      processorObj.merchantVerificationValue = "234";
      processorObj.quasiCash = false;
      processorObj.merchantId = "112233";
      processorObj.terminalId = "112244";
      
      processors['gpx'] = processorObj;
      
      common.processors = processors;
      
      configurations.common = common;
      
      const features2 = new CardProcessingConfigFeatures();
      const cardNotPresent = new CardProcessingConfigFeaturesCardNotPresent();
      
      const processors3 = {};
      const processorObj3 = new CardProcessingConfigFeaturesCardNotPresentProcessors();
      
      processorObj3.enableEmsTransactionRiskScore = true;
      processorObj3.relaxAddressVerificationSystem = true;
      processorObj3.relaxAddressVerificationSystemAllowExpiredCard = true;
      processorObj3.relaxAddressVerificationSystemAllowZipWithoutCountry = true;
      
      processors3['gpx'] = processorObj3;
      cardNotPresent.processors = processors3;
      
      cardNotPresent.visaStraightThroughProcessingOnly = false;
      cardNotPresent.ignoreAddressVerificationSystem = false;
      
      features2.cardNotPresent = cardNotPresent;
      
      const cardPresent = new CardProcessingConfigFeaturesCardPresent();
      
      const processors2 = {};
      const processorObj2 = new CardProcessingConfigFeaturesCardPresentProcessors();
      
      processorObj2.financialInstitutionId = "1347";
      processorObj2.pinDebitNetworkOrder = "23456";
      processorObj2.pinDebitReimbursementCode = "43567";
      processorObj2.defaultPointOfSaleTerminalId = "5432";
      
      processors2['gpx'] = processorObj2;
      
      cardPresent.processors = processors2;
      
      cardPresent.enableTerminalIdLookup = false;
      features2.cardPresent = cardPresent;
      
      configurations.features = features2;
      configurationInformation.configurations = configurations;
      
      const templateId = uuidv4("D2A7C000-5FCA-493A-AD21-469744A19EEA");
      configurationInformation.templateId = templateId;
      
      cardProcessing.configurationInformation = configurationInformation;
      payments.cardProcessing = cardProcessing;
      
      const virtualTerminal = new PaymentsProductsVirtualTerminal();
      const subscriptionInformation5 = new PaymentsProductsPayerAuthenticationSubscriptionInformation();
      subscriptionInformation5.enabled = true;
      virtualTerminal.subscriptionInformation = subscriptionInformation5;
      
      const configurationInformation5 = new PaymentsProductsVirtualTerminalConfigurationInformation();
      const templateId2 = uuidv4("9FA1BB94-5119-48D3-B2E5-A81FD3C657B5");
      configurationInformation5.templateId = templateId2;
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
      const templateId3 = uuidv4("D62BEE20-DCFD-4AA2-8723-BA3725958ABA");
      configurationInformation7.templateId = templateId3;
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
    merchant_boarding_gpx(function () {
		console.log('\nMerchant boarding GPX end.');
	});
}
module.exports.merchant_boarding_gpx = merchant_boarding_gpx;
