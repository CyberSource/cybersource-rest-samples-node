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

### To set your own sandbox credentials for an API request, configure the following information in Data/Configuration.js file

* Http

```javascript
    const MerchantId = "your_merchant_id";
    const MerchantKeyId = "your_key_serial_number";
    const MerchantSecretKey = "your_shared_secret";
    const AuthenticationType = "http_signature";
    const RunEnvironment = "apitest.cybersource.com";
```

* Jwt

```javascript
    const MerchantId = "your_merchant_id";
    const AuthenticationType = "jwt";
    const KeysDirectory = "Resource";
    const KeyFileName = "your_merchant_id";
    const RunEnvironment = "apitest.cybersource.com";
    const KeyAlias = "your_merchant_id";
    const KeyPass = "your_merchant_id";
```

* MetaKey Http

```javascript
    const AuthenticationType  = "http_Signature";
    const MerchantId          = "your_child_merchant_id";
    const MerchantKeyId       = "your_metakey_serial_number";
    const MerchantSecretKey   = "your_metakey_shared_secret";
    const PortfolioId         = "your_portfolio_id";
    const UseMetaKey          = true;
    const EnableClientCert    = false;
```

* MetaKey JWT

```javascript
    const AuthenticationType  = "jwt";
    const MerchantId          = "your_child_merchant_id";
    const KeyAlias            = "your_child_merchant_id";
    const KeyPass             = "your_portfolio_id";
    const KeyFileName         = "your_portfolio_id";
    const KeysDirectory       = "Resource";
    const UseMetaKey          = true;
    const EnableClientCert    = false;
```

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
