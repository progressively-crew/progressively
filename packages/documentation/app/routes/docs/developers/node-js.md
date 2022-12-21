# Node.js SDK

## Installation

In your Node.js project, run the following command:

```bash
$ npm install --save @progressively/sdk-node
```

## Usage

In your Node.js code, add the following snippet. Note, this will only work on server-side application.

```javascript
const { Progressively } = require("@progressively/sdk-node");

const options = {
  apiUrl: "your url server",
};

const sdk = Progressively.init("YOUR_ENVIRONMENT_CLIENT_KEY", options);
```

## Options

### fields

Fields is an option that allows to pass data about your users to create targeting strategies. For instance, you can set an email field, and in Progressively's dashboard, you can create a rule that only targets people that use an expected domain:

```javascript
const { Progressively } = require("@progressively/sdk-node");

const options = {
  apiUrl: "your url server",
  fields: {
    email: "marvin.frachet@something.com",
  },
};

const sdk = Progressively.init("YOUR_ENVIRONMENT_CLIENT_KEY", options);
```

## Methods

### loadFlags

Loads the flag on the server.

```javascript
sdk.loadFlags();
```
