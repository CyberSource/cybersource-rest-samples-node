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

function merchant_boarding_fdiglobal(callback) {
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
features.cardPresent = obj1;
subscriptionInformation.features = features;
cardProcessing.subscriptionInformation = subscriptionInformation;

const configurationInformation = new PaymentsProductsCardProcessingConfigurationInformation();
const configurations = new CardProcessingConfig();
const common = new CardProcessingConfigCommon();
common.merchantCategoryCode = "0742";
common.defaultAuthTypeCode = CardProcessingConfigCommon.DefaultAuthTypeCodeEnum.PRE;
common.processLevel3Data = "ignored";
common.masterCardAssignedId = "123456789";
common.enablePartialAuth = true;

const processors = {};
const obj5 = new CardProcessingConfigCommonProcessors();
const acquirer = new CardProcessingConfigCommonAcquirer();
obj5.acquirer = acquirer;

const currencies = {};
const obj6 = new CardProcessingConfigCommonCurrencies1();
obj6.enabled = true;
obj6.enabledCardPresent = false;
obj6.enabledCardNotPresent = true;
obj6.merchantId = "123456789mer";
obj6.terminalId = "12345ter";
obj6.serviceEnablementNumber = "";
currencies.CHF = obj6;
currencies.HRK = obj6;
currencies.ERN = obj6;
currencies.USD = obj6;
obj5.currencies = currencies;

const paymentTypes = {};
const obj7 = new CardProcessingConfigCommonPaymentTypes();
obj7.enabled = true;
paymentTypes.MASTERCARD = obj7;
paymentTypes.DISCOVER = obj7;
paymentTypes.JCB = obj7;
paymentTypes.VISA = obj7;
paymentTypes.AMERICAN_EXPRESS = obj7;
paymentTypes.DINERS_CLUB = obj7;
paymentTypes.CUP = obj7;

const currencies2 = {};
const ob1 = new CardProcessingConfigCommonCurrencies();
ob1.enabled = true;
ob1.terminalId = "pint123";
ob1.merchantId = "pinm123";
ob1.serviceEnablementNumber = null;
currencies2.USD = ob1;
obj7.currencies = currencies2;
paymentTypes.PIN_DEBIT = obj7;

obj5.paymentTypes = paymentTypes;
obj5.batchGroup = "fdiglobal_vme_default";
obj5.enhancedData = "disabled";
obj5.enablePosNetworkSwitching = true;
obj5.enableTransactionReferenceNumber = true;
processors.fdiglobal = obj5;

common.processors = processors;
configurations.common = common;

const features2 = new CardProcessingConfigFeatures();
const cardNotPresent = new CardProcessingConfigFeaturesCardNotPresent();
const processors3 = {};
const obj9 = new CardProcessingConfigFeaturesCardNotPresentProcessors();

obj9.relaxAddressVerificationSystem = true;
obj9.relaxAddressVerificationSystemAllowExpiredCard = true;
obj9.relaxAddressVerificationSystemAllowZipWithoutCountry = true;
processors3.fdiglobal = obj9;

cardNotPresent.processors = processors3;
cardNotPresent.visaStraightThroughProcessingOnly = true;
cardNotPresent.amexTransactionAdviceAddendum1 = "amex12345";
cardNotPresent.ignoreAddressVerificationSystem = true;
features2.cardNotPresent = cardNotPresent;

configurations.features = features2;
configurationInformation.configurations = configurations;

const templateId = "685A1FC9-3CEC-454C-9D8A-19205529CE45";
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
    merchant_boarding_fdiglobal(function () {
		console.log('\nMerchant boarding FDIGLOBAL end.');
	});
}
module.exports.merchant_boarding_fdiglobal = merchant_boarding_fdiglobal;
