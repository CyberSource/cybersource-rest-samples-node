# Node.js Sample Code for the CyberSource SDK

This repository contains working code samples which demonstrate Node.js integration with the CyberSource REST APIs through the CyberSource Node.JS SDK.

**__NOTE: THIS REPO OF CODE SAMPLES HAS BEEN MADE PUBLIC FOR SDK TESTING AND SHOULD NOT BE USED FOR PRODUCTION - YET.  PLEASE RAISE AN ISSUE ON THIS REPO IF YOU HAVE FURTHER QUESTIONS AND CHECK BACK SOON FOR GENERAL AVAILABILITY__**

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
    $ node [DirectoryPath]\[CodeSampleName]
```
e.g.
```
    $ node Samples/Payments/CoreServices/ProcessPayment.js
```

#### To set your API credentials for an API request,Configure the following information in resources/cybersource.properties file:
  
  * Http

```
   authenticationType  = http_Signature
   merchantID 	       = testrest
   runEnvironment      = CyberSource.Environment.SANDBOX
   merchantKeyId       = 08c94330-f618-42a3-b09d-e1e43be5efda
   merchantsecretKey   = yBJxy6LjM2TmcPGu+GaJrHtkke25fPpUX+UY6/L/1tE=
   enableLog           = true
   logDirectory        = log
   logMaximumSize      = 5M
   logFilename         = cybs
```
  * Jwt

```
   authenticationType  = Jwt
   merchantID 	       = testrest
   runEnvironment      = CyberSource.Environment.SANDBOX
   keyAlias		       = testrest
   keyPassword	       = testrest
   keyFileName         = testrest
   keysDirectory       = resources
   enableLog           = true
   logDirectory        = log
   logMaximumSize      = 5M
   logFilename         = cybs
```

### Switching between the sandbox environment and the production environment
CyberSource maintains a complete sandbox environment for testing and development purposes. This sandbox environment is an exact
duplicate of our production environment with the transaction authorization and settlement process simulated. By default, this SDK is 
configured to communicate with the sandbox environment. To switch to the production environment, set the appropriate environment 
constant in resources/cybs.json file.  For example:

```java
// For PRODUCTION use
  runEnvironment      = CyberSource.Environment.PRODUCTION
```


The [API Reference Guide](https://developer.cybersource.com/api/reference/api-reference.html) provides examples of what information is needed for a particular request and how that information would be formatted. Using those examples, you can easily determine what methods would be necessary to include that information in a request
using this SDK.

 ## License
This repository is distributed under a proprietary license.
