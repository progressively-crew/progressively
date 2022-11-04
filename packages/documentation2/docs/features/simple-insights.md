# Simple insights

Progressively is privacy first. We don't have access to anything related to the users.

Knowing that, we have built a simple analytic system based on 2 informations:

- The number of time a flag has been evaluated
- Custom metrics

## Number of time a flag has been evaluated

A flag evaluation corresponds to the resolution of the value provided to the flag from Progressively's server. It basically determines whether the user will resolve the `true` or `false` variation (or the associate variant when using [Single & Multi variants](/features/single-multi-variants)).

**This happens when the SDK fetches the flag or when the users receive a websocket update.**

This is something that is anonymously recorded.

## Custom metrics

You can create simple custom metrics in the dashboard and (optionnally) attach them to variants when using [Single & Multi variants](/features/single-multi-variants).

This way, we are able to naively compute the ratio between the variant evaluated and the metric hits recorded to help you take decisions.
