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
import { getProgressivelyProps } from "@progressively/react/lib/ssr";

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
  const { progressivelyProps, cookies } = await getProgressivelyProps(
    "YOUR_ENVIRONMENT_CLIENT_KEY",
    {
      apiUrl: "your url server",
      websocketUrl: "your url server for websockets",
    }
  );

  // This is necessary, make sure to attach the cookie
  res.setHeader("set-cookie", cookies);

  return {
    props: {
      progressivelyProps,
    },
  };
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
