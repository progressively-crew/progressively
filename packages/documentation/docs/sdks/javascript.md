# JavaScript

![JS SDK minified and gzipped size](https://img.shields.io/bundlephobia/minzip/@progressively/sdk-js)

Progressively comes with a JavaScript SDK that used under the hood of the different other framework-specific implementations.

## Installation

```bash
npm install @progressively/sdk-js
```

## Loading the flags

```javascript
import ProgressivelySdk from "@progressively/sdk-js";

const sdk = ProgressivelySdk.init(clientKey);
const { flags, response } = await sdk.loadFlags();
```

## Listening for flag updates

> :warning: this only works in the browser

Progressively comes with a websocket subscription for flag changes. You can call the following method of a previously instanciated SDK in order to listen for flag changes:

```javascript
sdk.onFlagUpdate(updatedFlags => /* do your things */)
```

## Usage on your own server

You may (probably) want to host Progressively on your own server and make sure your client application hits the good apis. In order to do so, you can specify the API and Websocket URL by passing `apiUrl` and `websocketUrl` to the `Sdk.init` call:

```javascript
const apiUrl = "https://your-hosting-server";
const websocketUrl = "wss://your-hosting-server";

const sdk = ProgressivelySdk.init(clientKey, { apiUrl, websocketUrl });
```

## Passing custom fields

With Progressively, you can pass extra fields to the server in order to create customized strategies. For instance, you can create a strategy that targets a specific email, let's say: `john.doe@gmail.com`:

```jsx
const sdk = ProgressivelySdk.init(clientKey, {
  fields: { email: "john.doe@gmail.com" },
});
```
