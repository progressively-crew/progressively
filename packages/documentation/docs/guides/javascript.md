# JavaScript SDK

## Installation

In your JavaScript project, run the following command:

```bash
$ npm install --save @progressively/sdk-js
```

## Usage

In your JavaScript code, add the following snippet. Note, this will only work on client-side application. If you want to use Progressively on the server, please check the [Node.js SDK reference](https://github.com/progressively-crew/progressively/wiki/NodeJs)

```javascript
import { Progressively } from "@progressively/sdk-js";

const options = {
  apiUrl: "your url server",
  websocketUrl: "your url server for websockets",
};

const sdk = Progressively.init("YOUR_ENVIRONMENT_CLIENT_KEY", options);
```

## Options

### fields

Fields is an option that allows to pass data about your users to create targeting strategies. For instance, you can set an email field, and in Progressively's dashboard, you can create a rule that only targets people that use an expected domain:

```javascript
import { Progressively } from "@progressively/sdk-js";

const options = {
  apiUrl: "your url server",
  websocketUrl: "your url server for websockets",
  fields: {
    email: "marvin.frachet@something.com",
  },
};

const sdk = Progressively.init("YOUR_ENVIRONMENT_CLIENT_KEY", options);
```

### initialFlags

The initialFlags option is mostly for server-side rendering purpose. You should not directly use it in your code, except if you are building a server implementation that does not exist in the tool.

## Methods

### loadFlags

Loads the flag using the browser [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

```javascript
sdk.loadFlags();
```

### onFlagUpdate

Listens to flags update using [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

The second argument is optional and aims to identify the user. If not set, the user will be considered anonymous and Progressively will generate an ID for them.

```javascript
sdk.onFlagUpdate((nextFlags) => {}, optionalUserId);
```

### disconnect

Closes the websocket connection.

```javascript
sdk.disconnect();
```
