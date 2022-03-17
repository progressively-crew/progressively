# Using Rollout with SSR framework

Rollout comes with a first class support for React and its major frameworks leveraging Server Side Rendering, at runtime. By following this guide, you should be able to start an application that initialize the flags on the server but also to make them available on the client with a websocket subscription.

## Nextjs

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

#clientKeyComment#
export async function getServerSideProps() {
  // Initialize the flags on the server and pass it to the client
  const ssrProps = await getSSRProps("#clientKey#");

  return {
    props: {
      rolloutProps: ssrProps,
    },
  };
}
```
