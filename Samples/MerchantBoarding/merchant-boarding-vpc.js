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

function merchant_boarding_vpc(callback) {
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
        features["cardNotPresent"] = obj1;
        features["cardPresent"] = obj1;
        subscriptionInformation.features = features;
        cardProcessing.subscriptionInformation = subscriptionInformation;
        
        const configurationInformation = new PaymentsProductsCardProcessingConfigurationInformation();
        const configurations = new CardProcessingConfig();
        const common = new CardProcessingConfigCommon();
        
        common.merchantCategoryCode = "1799";
        common.defaultAuthTypeCode = CardProcessingConfigCommon.DefaultAuthTypeCodeEnum.FINAL;
        common.masterCardAssignedId = null;
        common.sicCode = null;
        common.enablePartialAuth = false;
        common.enableInterchangeOptimization = false;
        common.enableSplitShipment = false;
        common.visaDelegatedAuthenticationId = "123457";
        common.domesticMerchantId = "123458";
        common.creditCardRefundLimitPercent = "2";
        common.businessCenterCreditCardRefundLimitPercent = "3";
        common.allowCapturesGreaterThanAuthorizations = false;
        common.enableDuplicateMerchantReferenceNumberBlocking = false;
        
        const processors = {};
        const obj5 = new CardProcessingConfigCommonProcessors();
        const acquirer = new CardProcessingConfigCommonAcquirer();
        
        acquirer.countryCode = "840_usa";
        acquirer.fileDestinationBin = "444500";
        acquirer.interbankCardAssociationId = "3684";
        acquirer.institutionId = "444571";
        acquirer.discoverInstitutionId = null;
        
        obj5.acquirer = acquirer;
        
        const paymentTypes = {};
        const obj7 = new CardProcessingConfigCommonPaymentTypes();
        obj7.enabled = true;
        
        const currencies = {};
        const obj2 = new CardProcessingConfigCommonCurrencies();
        obj2.enabled = true;
        obj2.enabledCardPresent = false;
        obj2.enabledCardNotPresent = true;
        obj2.terminalId = "113366";
        obj2.merchantId = "113355";
        obj2.serviceEnablementNumber = null;
        
        currencies["CAD"] = obj2;
        currencies["USD"] = obj2;
        
        obj7.currencies = currencies;
        
        paymentTypes["VISA"] = obj7;
        
        obj5.paymentTypes = paymentTypes;
        obj5.acquirerMerchantId = "123456";
        obj5.allowMultipleBills = false;
        obj5.batchGroup = "vdcvantiv_est_00";
        obj5.businessApplicationId = "AA";
        obj5.enableAutoAuthReversalAfterVoid = true;
        obj5.enableExpresspayPanTranslation = null;
        obj5.merchantVerificationValue = "123456";
        obj5.quasiCash = false;
        obj5.enableTransactionReferenceNumber = true;
        
        processors["VPC"] = obj5;
        
        common.processors = processors;
        
        configurations.common = common;
        
        const features2 = new CardProcessingConfigFeatures();
        
        const cardNotPresent = new CardProcessingConfigFeaturesCardNotPresent();
        
        const processors3 = {};
        const obj9 = new CardProcessingConfigFeaturesCardNotPresentProcessors();
        
        obj9.enableEmsTransactionRiskScore = null;
        obj9.relaxAddressVerificationSystem = true;
        obj9.relaxAddressVerificationSystemAllowExpiredCard = true;
        obj9.relaxAddressVerificationSystemAllowZipWithoutCountry = true;
        
        processors3["VPC"] = obj9;
        cardNotPresent.processors = processors3;
        
        cardNotPresent.visaStraightThroughProcessingOnly = false;
        cardNotPresent.ignoreAddressVerificationSystem = true;
        
        features2.cardNotPresent = cardNotPresent;
        
        const cardPresent = new CardProcessingConfigFeaturesCardPresent();
        
        const processors2 = {};
        const obj4 = new CardProcessingConfigFeaturesCardPresentProcessors();
        
        obj4.defaultPointOfSaleTerminalId = "223355";
        obj4.defaultPointOfSaleTerminalId = "223344";
        
        processors2["VPC"] = obj4;
        
        cardPresent.processors = processors2;
        
        cardPresent.enableTerminalIdLookup = false;
        features2.cardPresent = cardPresent;
        
        configurations.features = features2;
        configurationInformation.configurations = configurations;
        
        const templateId = uuidv4("D671CE88-2F09-469C-A1B4-52C47812F792");
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
			console.log('\nResponse Code of Process a Payment : ' + JSON.stringify(response['status']));
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
    merchant_boarding_vpc(function () {
		console.log('\nMerchant boarding VPC end.');
	});
}
module.exports.merchant_boarding_vpc = merchant_boarding_vpc;
