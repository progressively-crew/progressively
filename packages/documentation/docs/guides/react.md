# React SDK

## Installation

In your React project, run the following command:

```bash
$ npm install --save @progressively/react
```

## Usage client (only)

In your React code, add the following snippet:

```javascript
import { ProgressivelyProvider, useFlags } from "@progressively/react";

const FlaggedComponent = () => {
  const { flags } = useFlags();
  /* ... */
};

const progressivelyProps = {
  clientKey: "YOUR_ENVIRONMENT_CLIENT_KEY",
  apiUrl: "your url server",
  websocketUrl: "your url server for websockets",
};

const YourPage = () => {
  return (
    <ProgressivelyProvider {...progressivelyProps}>
      <FlaggedComponent />
    </ProgressivelyProvider>
  );
};
```

## Usage with SSR

In your React code, add the following snippet

```javascript
import { ProgressivelyProvider, useFlags } from "@progressively/react";
import { getProgressivelyInitialData } from "@progressively/react/lib/ssr";

const FlaggedComponent = () => {
  const { flags } = useFlags();
  /* ... */
};

const YourPage = ({ progressivelyProps }) => {
  return (
    <ProgressivelyProvider {...progressivelyProps}>
      <FlaggedComponent />
    </ProgressivelyProvider>
  );
};

export async function getServerSideProps({ req, res }) {
  const { ssrProps, cookies } = await getProgressivelyInitialData(
    "YOUR_ENVIRONMENT_CLIENT_KEY",
    {
      apiUrl: "your url server",
      websocketUrl: "your url server for websockets",
    }
  );

  return {
    props: {
      progressivelyProps: ssrProps,
    },
  };
}
```

## Usage with SSR and sticky user id

When using Progressively with a rollout percentage that is not 100%, you want your users to have a consistent experimence. In order to do so, Progressively needs a way to stick a variant to a user id.

The handling of creating IDs for anonymous users is done by Progressively under the hood. However, we need an extra step on your side to make it work properly: you have to set a cookie and forward the cookie to the Progressively instance:

```javascript
import { ProgressivelyProvider, useFlags } from "@progressively/react";
import { getProgressivelyInitialData } from "@progressively/react/lib/ssr";

const FlaggedComponent = () => {
  const { flags } = useFlags();
  /* ... */
};

const YourPage = ({ progressivelyProps }) => {
  return (
    <ProgressivelyProvider {...progressivelyProps}>
      <FlaggedComponent />
    </ProgressivelyProvider>
  );
};

export async function getServerSideProps({ req, res }) {
   const { ssrProps } = await getNextProps(
    "YOUR ENVIRONMENT KEY",
    {
      websocketUrl: "ws://localhost:4000",
      apiUrl: "http://localhost:4000",
    },
    req,
    res
  );

  return {
    props: {
      progressivelyProps: ssrProps,
    },
  };
}

function getNextProps(
  clientKey: string,
  options: SDKOptions,
  req: Request,
  res: any
) {
  const { fields } = options;
  return getProgressivelyInitialData(clientKey, {
    ...options,
    fields: {
      // Forward the cookie to the progressively instance
      id: fields?.id || (req as any).cookies?.["progressively-id"] || null,
      ...(fields || {}),
    },
  }).then((response) => {

    // Stick the cookie
    res.setHeader("set-cookie", response.cookies);
    return response;
  });
}

```

## Options

### fields

Fields is an option that allows to pass data about your users to create targeting strategies. For instance, you can set an email field, and in Progressively's dashboard, you can create a rule that only targets people that use an expected domain.

```javascript
const progressivelyProps = {
  clientKey: "YOUR_ENVIRONMENT_CLIENT_KEY",
  apiUrl: "your url server",
  websocketUrl: "your url server for websockets",
  fields: {
    email: "your-user@email.com",
  },
};
```
