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

function merchant_boarding_eftpos(callback) {
	try {
		   var configObject = new configuration();
		   var apiClient = new cybersourceRestApi.ApiClient();

      const reqObj = new PostRegistrationBody();

      const organizationInformation = new Boardingv1registrationsOrganizationInformation();
      organizationInformation.parentOrganizationId = "apitester00";
      organizationInformation.type = Boardingv1registrationsOrganizationInformation.TypeEnum.MERCHANT;
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

      const obj1 = new PaymentsProductsCardProcessingSubscriptionInformationFeatures();
      obj1.enabled = true;
      features.cardNotPresent = obj1;
      obj1.enabled = false;
      features.cardPresent = obj1;
      subscriptionInformation.features = features;
      cardProcessing.subscriptionInformation = subscriptionInformation;

      const configurationInformation = new PaymentsProductsCardProcessingConfigurationInformation();
      const configurations = new CardProcessingConfig();
      const common = new CardProcessingConfigCommon();
      common.merchantCategoryCode = "5999";
      common.preferCobadgedSecondaryBrand = true;

      const processors = {};
      const obj5 = new CardProcessingConfigCommonProcessors();
      const acquirer = new CardProcessingConfigCommonAcquirer();
      acquirer.countryCode = "344_hongkong";
      acquirer.institutionId = "22344";
      obj5.acquirer = acquirer;

      const currencies = {};
      const obj6 = new CardProcessingConfigCommonCurrencies1();
      obj6.enabled = true;
      obj6.merchantId = "12345612344";
      obj6.terminalId = "12121212";
      currencies.AUD = obj6;
      obj5.currencies = currencies;

      const paymentTypes = {};
      const obj7 = new CardProcessingConfigCommonPaymentTypes();
      obj7.enabled = true;
      paymentTypes.EFTPOS = obj7;

      obj5.paymentTypes = paymentTypes;

      obj5.enableCVVResponseIndicator = true;
      obj5.enableLeastCostRouting = true;
      obj5.merchantTier = "000";

      processors.EFTPOS = obj5;

      common.processors = processors;
      configurations.common = common;

      const features2 = new CardProcessingConfigFeatures();
      configurations.features = features2;
      configurationInformation.configurations = configurations;

      const templateId = "1F9B7F6E-F0DB-44C8-BF8E-5013E34C0F87";
      configurationInformation.templateId = templateId;

      cardProcessing.configurationInformation = configurationInformation;
      payments.cardProcessing = cardProcessing;
      selectedProducts.payments = payments;

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
     merchant_boarding_eftpos(function () {
		 console.log('\nMerchant boarding EFTPOS end.');
	});
}
module.exports.merchant_boarding_eftpos = merchant_boarding_eftpos;
