# Rollout with React on the server

Rollout comes with a first class support for React and its major frameworks leveraging Server Side Rendering, at runtime. By following this guide, you should be able to start an application that initialize the flags on the server but also to make them available on the client with a websocket subscription.

## Ready to go snippet (Nextjs)

The following snippet shows how to use Rollout with [Nextjs](https://nextjs.org/).

```js
import { RolloutProvider, getSSRProps, useFlags } from "@rollout/react";

const FlaggedComponent = () => {
  // Get the flags from the component
  const { flags } = useFlags();

  // Check the flag value and display the good variant
  if (flags.newHomepage) {
    return <div>New variant</div>;
  }

  return <div>Old variant</div>;
};

export default function MyPage({ rolloutProps }) {
  // Get the rolloutProps from the getServerSideProps and pass it to the provider
  return (
    <RolloutProvider {...rolloutProps}>
      <FlaggedComponent />
    </RolloutProvider>
  );
}

export async function getServerSideProps() {
  // Initialize the flags on the server and pass it to the client
  const ssrProps = await getSSRProps(CLIENT_KEY);

  return {
    props: {
      rolloutProps: ssrProps,
    },
  };
}
```

## Usage on your own server

You may (probably) want to host Rollout on your own server and make sure your client application hits the good apis. In order to do so, you can specify the API and Websocket URL by passing `apiUrl` and `websocketUrl` to the `getSSRProps`:

```jsx
const ssrProps = await getSSRProps(CLIENT_KEY, {
  apiUrl: "https://your-hosting-server",
  websocketUrl: "wss://your-hosting-server",
});
```

## Passing custom fields

With Rollout, you can pass extra fields to the server in order to create customized strategies. For instance, you can create a strategy that targets a specific email, let's say: `john.doe@gmail.com`:

```jsx
const ssrProps = await getSSRProps(CLIENT_KEY, {
  fields: { email: "john.doe@gmail.com" },
});
```
