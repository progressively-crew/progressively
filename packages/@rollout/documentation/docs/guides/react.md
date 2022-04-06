# Rollout with React on the client

## Ready to go snippet

The following snippet shows how to use Rollout with React **on the client**. If you want to use it with server side frameworks, make sure to follow the according guides.

```js
import { RolloutProvider, useFlags } from "@rollout/react";

const FlaggedComponent = () => {
  // Get the flags from the component
  const { flags } = useFlags();

  // Check the flag value and display the good variant
  if (flags.newHomepage) {
    return <div>New variant</div>;
  }

  return <div>Old variant</div>;
};

export default function MyPage() {
  return (
    <RolloutProvider clientKey={CLIENT_KEY}>
      <FlaggedComponent />
    </RolloutProvider>
  );
}
```

## Alternative content when loading

When resolving the feature flags on the client, an HTTP request is made during whom the component make create a "flashy" or "flickering" effect showing the old variant and then resolving the new variant.

In order to prevent this behavior on the client, Rollout provides two mechanics:

- showing nothing (neither the old nor the new variants) during the HTTP request
- providing a `isLoading` boolean value that indicate whether the HTTP request has been fulfilled

### Showing nothing during the resolution

If you prefer to show nothing to the client during the resolution, you can use the `onlyRenderWhenReady` boolean prop on the `RolloutProvider`:

```jsx
export default function MyPage() {
  return (
    <RolloutProvider clientKey={CLIENT_KEY} onlyRenderWhenReady>
      <FlaggedComponent />
    </RolloutProvider>
  );
}
```

### Showing whatever you want during the resolution

If you prefer to customize what's visible on the screen during the resolution you can rely on the `isLoading` value returned by the `useFlags` hook:

```jsx
const FlaggedComponent = () => {
  const { flags, isLoading } = useFlags();

  // Show this thing during the flag resolution
  if (isLoading) {
    return <p>The flags are resolving...</p>;
  }

  if (flags.newHomepage) {
    return <div>New variant</div>;
  }

  return <div>Old variant</div>;
};
```

## Usage on your own server

You may (probably) want to host Rollout on your own server and make sure your client application hits the good apis. In order to do so, you can specify the API and Websocket URL by passing `apiUrl` and `websocketUrl` to the `RolloutProvider`:

```jsx
export default function MyPage() {
  return (
    <RolloutProvider
      clientKey={CLIENT_KEY}
      apiUrl="https://your-hosting-server" // put your address here
      websocketUrl="wss://your-hosting-server" // put your address here
    >
      <FlaggedComponent />
    </RolloutProvider>
  );
}
```

## Passing custom fields

With Rollout, you can pass extra fields to the server in order to create customized strategies. For instance, you can create a strategy that targets a specific email, let's say: `john.doe@gmail.com`:

```jsx
export default function MyPage() {
  return (
    <RolloutProvider
      clientKey={CLIENT_KEY}
      fields={{
        email: "john.doe@gmail.com",
      }}
    >
      <FlaggedComponent />
    </RolloutProvider>
  );
}
```
