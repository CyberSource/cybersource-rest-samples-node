# Node.js Sample Code for the CyberSource SDK

This repository contains working code samples which demonstrate Node.js integration with the CyberSource REST APIs through the [CyberSource Node.JS SDK](https://github.com/CyberSource/cybersource-rest-client-node).

The samples are organized into categories and common usage examples.


## Using the Sample Code

The samples are all completely independent and self-contained. You can analyze them to get an understanding of how a particular method works, or you can use the snippets as a starting point for your own project.

You can also run each sample directly from the command line.

## Running the Samples From the Command Line
* Clone this repository:
```
    $ git clone https://github.com/CyberSource/cybersource-rest-samples-node
```
* Install the cybersource-rest-client-node and other dependencies, for that go inside cybersource-rest-samples-node run below command
```
    $ npm install 
```
* Run the individual samples by name. For example: 
```
    $ node [DirectoryPath]/[CodeSampleName]
```
e.g.
```
    $ node Samples/Payments/CoreServices/ProcessPayment.js
```

#### To set your own sandbox credentials for an API request, configure the following information in Data/Configuration.js file:
  
  * Http

```
const MerchantId = "your_merchant_id";
const MerchantKeyId = "your_key_serial_number";
const MerchantSecretKey = "your_shared_secret";
const AuthenticationType = "http_signature";
const RunEnvironment = "cybersource.environment.sandbox";
```
  * Jwt

```
const MerchantId = "your_merchant_id";
const AuthenticationType = "jwt";
const KeysDirectory = "Resource";
const KeyFileName = "your_merchant_id";
const RunEnvironment = "cybersource.environment.sandbox";
const KeyAlias = "your_merchant_id";
const KeyPass = "your_merchant_id";
```

### Switching between the sandbox environment and the production environment
CyberSource maintains a complete sandbox environment for testing and development purposes. This sandbox environment is an exact
duplicate of our production environment with the transaction authorization and settlement process simulated. By default, this SDK is 
configured to communicate with the sandbox environment. To switch to the production environment, set the appropriate environment 
constant.  For example:

```javascript
// For TESTING use
  const RunEnvironment = "cybersource.environment.sandbox";
  // For PRODUCTION use
  const RunEnvironment = "cybersource.environment.production";
```


The [API Reference Guide](https://developer.cybersource.com/api/reference/api-reference.html) provides examples of what information is needed for a particular request and how that information would be formatted. Using those examples, you can easily determine what methods would be necessary to include that information in a request
using this SDK.

