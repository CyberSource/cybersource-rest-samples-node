# Node.js Sample Code for the CyberSource SDK

[![Build Status](https://app.travis-ci.com/CyberSource/cybersource-rest-samples-node.svg?branch=master)](https://app.travis-ci.com/CyberSource/cybersource-rest-samples-node)

This repository contains working code samples which demonstrate Node.js integration with the CyberSource REST APIs through the [CyberSource Node.JS SDK](https://github.com/CyberSource/cybersource-rest-client-node).

The samples are organized into categories and common usage examples.

## Using the Sample Code

The samples are all completely independent and self-contained. You can analyze them to get an understanding of how a particular method works, or you can use the snippets as a starting point for your own project.

You can also run each sample directly from the command line.

## Running the Samples From the Command Line

* Clone this repository:

```bash
    git clone https://github.com/CyberSource/cybersource-rest-samples-node
```

* Install the cybersource-rest-client-node and other dependencies, for that go inside cybersource-rest-samples-node run below command

```bash
    npm install
```

* Run the individual samples by name. For example:

```bash
    node [DirectoryPath]/[CodeSampleName]
```

e.g.

```bash
    node Samples/Payments/Payments/authorization-with-capturesale.js
```

## Setting Your API Credentials

To set your API credentials for an API request, configure the following information in `Data/Configuration.js` file:

* Http Signature (**Deprecated** — migrate to JWT with Shared Secret below)

```javascript
    const MerchantId = "your_merchant_id";
    const MerchantKeyId = "your_key_serial_number";
    const MerchantSecretKey = "your_shared_secret";
    const AuthenticationType = "http_signature";
    const RunEnvironment = "apitest.cybersource.com";
```

* Jwt (with P12 certificate)

```javascript
    const AuthenticationType = "jwt";
    const MerchantId = "your_merchant_id";
    const KeyAlias = "your_merchant_id";
    const KeyPass = "your_merchant_id";
    const KeyFileName = "your_merchant_id";
    const KeysDirectory = "Resource";
    const UseMetaKey = false;
    const RunEnvironment = "apitest.cybersource.com";
```

* Jwt with Shared Secret (**Recommended migration path from Http Signature**)

  Uses the **same** `merchantKeyId` and `merchantsecretKey` credentials as Http Signature, but authenticates via JWT. This enables MLE (Message Level Encryption) support for both request and response payloads, which Http Signature does not support.

  For detailed migration guide, configuration, and sample code, see the [JWT Shared Secret Auth samples](Samples/JwtSharedSecretAuth/README.md).

```javascript
    const AuthenticationType = "jwt";
    const JwtKeyType = "SHARED_SECRET";
    const MerchantId = "your_merchant_id";
    const MerchantKeyId = "your_key_serial_number";
    const MerchantSecretKey = "your_shared_secret";
    const RunEnvironment = "apitest.cybersource.com";
```

* MetaKey Http (**Deprecated** — migrate to MetaKey JWT Shared Secret below)

```javascript
    const AuthenticationType = "http_signature";
    const MerchantId = "your_transacting_merchant_id";
    const MerchantKeyId = "your_metakey_portfolio_KeyId";
    const MerchantSecretKey = "your_metakey_portfolio_shared_secret_key";
    const PortfolioID = "your_portfolio_id";
    const UseMetaKey = true;
```

* MetaKey JWT (P12)

```javascript
    const AuthenticationType = "jwt";
    const MerchantId = "your_transacting_merchant_id";
    const KeyAlias = "your_portfolio_id";
    const KeyPass = "your_metakey_portfolio_p12File_password";
    const KeyFileName = "your_metakey_portfolio_p12FileName";
    const PortfolioID = "your_portfolio_id";
    const KeysDirectory = "Resource";
    const UseMetaKey = true;
```

* MetaKey JWT with Shared Secret (**Recommended migration from MetaKey Http**)

  Uses the same MetaKey credentials as MetaKey Http but authenticates via JWT, enabling MLE support.

```javascript
    const AuthenticationType = "jwt";
    const JwtKeyType = "SHARED_SECRET";
    const MerchantId = "your_transacting_merchant_id";
    const MerchantKeyId = "your_metakey_portfolio_KeyId";
    const MerchantSecretKey = "your_metakey_portfolio_shared_secret_key";
    const PortfolioID = "your_portfolio_id";
    const UseMetaKey = true;
```

* Response MLE with MetaKey

  When Response MLE is enabled (`enableResponseMleGlobally: true`) and MetaKey is in use (`useMetaKey: true`), the Response MLE configuration must use the **portfolio's** response MLE key — not the transacting merchant's. Specifically:

  - `responseMlePrivateKeyFilePath` (or `responseMlePrivateKey` object) must point to the **portfolio's** response MLE private key.
  - `responseMleKID` — the KID value associated with the **portfolio's** response MLE certificate.
    - **Optional** when `responseMlePrivateKeyFilePath` points to a CyberSource-generated P12 file (SDK auto-fetches from P12).
    - **Required** when using PEM format files (`.pem`, `.key`, `.p8`) or when providing `responseMlePrivateKey` object directly.

```javascript
    const EnableResponseMleGlobally = true;
    const ResponseMlePrivateKeyFilePath = "Resource/portfolio_response_mle_private_key.p12";
    const ResponseMlePrivateKeyFilePassword = "portfolio_private_key_password";
    // responseMleKID is optional when using a CyberSource-generated P12 file (auto-fetched from P12)
    // Required when using PEM files or responseMlePrivateKey object
    // const ResponseMleKID = "your_portfolio_response_mle_kid";
```

  > **Important:** The response MLE private key (and KID, if applicable) must belong to the portfolio (parent account), since in MetaKey mode the portfolio is the transaction submitter and the response is encrypted using the portfolio's MLE certificate.

### Switching between the sandbox environment and the production environment

CyberSource maintains a complete sandbox environment for testing and development purposes. This sandbox environment is an exact duplicate of our production environment with the transaction authorization and settlement process simulated. By default, this SDK is configured to communicate with the sandbox environment. To switch to the production environment, set the appropriate environment constant.

For example:

```javascript
    // For TESTING use
    const RunEnvironment = "apitest.cybersource.com";
    // For PRODUCTION use
    const RunEnvironment = "api.cybersource.com";
```

The [API Reference Guide](https://developer.cybersource.com/api/reference/api-reference.html) provides examples of what information is needed for a particular request and how that information would be formatted. Using those examples, you can easily determine what methods would be necessary to include that information in a request using this SDK.

### Logging

[![Generic badge](https://img.shields.io/badge/LOGGING-NEW-GREEN.svg)](https://shields.io/)

Since v0.0.35, a new logging framework has been introduced in the SDK. This new logging framework makes use of Winston, and standardizes the logging so that it can be integrated with the logging in the client application.

More information about this new logging framework can be found in this file : [Logging.md](Logging.md)

## Run Environments

The run environments that were supported in CyberSource Nodejs SDK have been deprecated.
Moving forward, the SDKs will only support the direct hostname as the run environment.

For the old run environments previously used, they should be replaced by the following hostnames:

| Old Run Environment                             | New Hostname Value           |
| ----------------------------------------------- | ---------------------------- |
| `cybersource.environment.sandbox`               | `apitest.cybersource.com`    |
| `cybersource.environment.production`            | `api.cybersource.com`        |
| `cybersource.in.environment.sandbox`            | `apitest.cybersource.com`    |
| `cybesource.in.environment.production`          | `api.in.cybersource.com`     |

For example, replace the following code in the Configuration file:

```javascript
    // For TESTING use
    const RunEnvironment = "cybersource.environment.sandbox";
    // For PRODUCTION use
    const RunEnvironment = "cybersource.environment.production";
```

with the following code:

```javascript
    // For TESTING use
    const RunEnvironment = "apitest.cybersource.com";
    // For PRODUCTION use
    const RunEnvironment = "api.cybersource.com";
```

## Disclaimer

Cybersource may allow Customer to access, use, and/or test a Cybersource product or service that may still be in development or has not been market-tested (“Beta Product”) solely for the purpose of evaluating the functionality or marketability of the Beta Product (a “Beta Evaluation”). Notwithstanding any language to the contrary, the following terms shall apply with respect to Customer’s participation in any Beta Evaluation (and the Beta Product(s)) accessed thereunder): The Parties will enter into a separate form agreement detailing the scope of the Beta Evaluation, requirements, pricing, the length of the beta evaluation period (“Beta Product Form”). Beta Products are not, and may not become, Transaction Services and have not yet been publicly released and are offered for the sole purpose of internal testing and non-commercial evaluation. Customer’s use of the Beta Product shall be solely for the purpose of conducting the Beta Evaluation. Customer accepts all risks arising out of the access and use of the Beta Products. Cybersource may, in its sole discretion, at any time, terminate or discontinue the Beta Evaluation. Customer acknowledges and agrees that any Beta Product may still be in development and that Beta Product is provided “AS IS” and may not perform at the level of a commercially available service, may not operate as expected and may be modified prior to release. CYBERSOURCE SHALL NOT BE RESPONSIBLE OR LIABLE UNDER ANY CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE RELATING TO A BETA PRODUCT OR THE BETA EVALUATION (A) FOR LOSS OR INACCURACY OF DATA OR COST OF PROCUREMENT OF SUBSTITUTE GOODS, SERVICES OR TECHNOLOGY, (B) ANY CLAIM, LOSSES, DAMAGES, OR CAUSE OF ACTION ARISING IN CONNECTION WITH THE BETA PRODUCT; OR (C) FOR ANY INDIRECT, INCIDENTAL OR CONSEQUENTIAL DAMAGES INCLUDING, BUT NOT LIMITED TO, LOSS OF REVENUES AND LOSS OF PROFITS.
