# JWT Authentication with Shared Secret (HS256)

## Why Migrate from HTTP Signature?

**HTTP Signature authentication is being deprecated.** JWT with Shared Secret is the recommended replacement because:

1. **Same credentials** — Uses the same `merchantKeyId` and `merchantsecretKey` you already have for HTTP Signature. No new credentials needed.
2. **Enables MLE** — Message Level Encryption (MLE) requires JWT authentication. HTTP Signature does not support MLE.
3. **Minimal code change** — Only two properties need to change in your configuration.

## Migration from HTTP Signature

### Before (HTTP Signature)

```javascript
const AuthenticationType = 'http_signature';
const MerchantId = 'your_merchant_id';
const MerchantKeyId = 'your_key_id';
const MerchantSecretKey = 'your_shared_secret';
```

### After (JWT with Shared Secret)

```javascript
const AuthenticationType = 'jwt';            // changed
const JwtKeyType = 'SHARED_SECRET';           // added
const MerchantId = 'your_merchant_id';
const MerchantKeyId = 'your_key_id';          // same as before
const MerchantSecretKey = 'your_shared_secret'; // same as before
```

That's it. The `merchantKeyId` and `merchantsecretKey` values remain exactly the same.

## Samples in This Folder

| Sample | Description |
|---|---|
| [simple-authorization-with-jwt-shared-secret.js](simple-authorization-with-jwt-shared-secret.js) | Basic payment authorization using JWT + Shared Secret — drop-in replacement for HTTP Signature |
| [mle-payment-with-jwt-shared-secret.js](mle-payment-with-jwt-shared-secret.js) | Payment authorization with MLE enabled — the main benefit of migrating to JWT |

## Configuration

Configuration is defined in [`Data/JwtSharedSecretConfiguration.js`](../../Data/JwtSharedSecretConfiguration.js):

- `getMerchantDetails()` — JWT + Shared Secret (no MLE)
- `getMerchantDetailsWithMLE()` — JWT + Shared Secret + MLE enabled

## MLE Certificate

When using MLE with Shared Secret credentials, the MLE public certificate must be provided separately via the `mleForRequestPublicCertPath` property (since there is no P12 file to auto-extract it from).

Download the MLE public certificate from the CyberSource Business Center:

- **Test**: https://businesscentertest.cybersource.com/ebc2
- **Production**: https://businesscenter.cybersource.com/ebc2

## Comparison of Authentication Types

| Feature | HTTP Signature | JWT with P12 | JWT with Shared Secret |
|---|---|---|---|
| Algorithm | HMAC-SHA256 | RS256 (asymmetric) | HS256 (symmetric) |
| Credentials | Key ID + Shared Secret | P12 certificate file | Key ID + Shared Secret |
| MLE Support | No | Yes | Yes |
| Status | **Deprecated** | Active | **Recommended for migration** |