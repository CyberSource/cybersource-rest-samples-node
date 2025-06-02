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

function merchant_boarding_bin_lookup(callback) {
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
    const selectedProducts = new Boardingv1registrationsProductInformationSelectedProducts();

    // Payments Products
    const payments = new PaymentsProducts();
    selectedProducts.payments = payments;

    // Risk Products
    const risk = new RiskProducts();
    selectedProducts.risk = risk;

    // Commerce Solutions
    const commerceSolutions = new CommerceSolutionsProducts();
    const binLookup = new CommerceSolutionsProductsBinLookup();

    const configurationInformation = new CommerceSolutionsProductsBinLookupConfigurationInformation();
    const configurations = new CommerceSolutionsProductsBinLookupConfigurationInformationConfigurations();

    configurations.isPayoutOptionsEnabled = false;
    configurations.isAccountPrefixEnabled = true;

    configurationInformation.configurations = configurations;
    binLookup.configurationInformation = configurationInformation;

    commerceSolutions.binLookup = binLookup;
    selectedProducts.commerceSolutions = commerceSolutions;

    // Value Added Services
    const valueAddedServices = new ValueAddedServicesProducts();
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
    merchant_boarding_bin_lookup(function () {
		console.log('\nMerchant boarding bin lookup end.');
	});
}
module.exports.merchant_boarding_bin_lookup = merchant_boarding_bin_lookup;
