# Why Progressively?

Progressively is a minimal and self-hosted feature flagging solution that does not kill your web app performance.

> Keep in mind that it is in Alpha. We need people to use it and give feedback so that we can get more confidence and fix the existing bugs.

## What problem does it aim to solve?

Feature flagging is a technic allowing multiple variations of a given feature (depending on criteria) to be displayed to a specific set of users.

For instance, you may have created a new fancy UI for your login page, but you want to make sure you don't have errors on it that could block your users from accessing your platform. With a feature flagging tool, you can show this new page to N% of your audience, and augment this percentage while you acquire confidence until everybody sees the new page.

This type of tool aims to simplify the release process of a feature: you can put it in production, but only make it available to a subset of your users and gradually roll out.

## What makes Progressively different from other tools?

### Short story

- Progressively is way smaller than its competitors (1kB for the React SDK)
- Progressively has an accessible dashboard (and if it does not work as expected, we commit to finding other ways to use the tool)
- Progressively comes with built-in SSR support so that the page doesn't blink when using SSR tools
- Realtime propagation with Websockets
- No intrusive tracking (expect Sentry or Plausible to be added at some point so that we understand more the audience)
- You can host it and own the data

### Long story

#### A small footprint

Third-party tools for transversal needs (analytics, feature flags, a/b testing, etc...) can significantly decrease the speed of web applications. It's not uncommon to hear that some mainstream analytic tools or dynamic script tags loader kill web app performances for multiple reasons:

- they _may_ be blocking the network waterfall
- they can keep the main thread busy during their execution (the bigger, the longer)
- they can bloat the application bundle (making it longer to download and start the app later)

Stepping back from this and analyzing a bit the state of the web, we don't think it's normal that tools that are supposed to help us are actually killing the speed of our products.

For instance, if we take a look at the feature flagging space, there are a bunch of tools available. Here's an exhaustive list of them, and their weight included in a Nextjs application:

- Launchdarkly: **14kb minified and gzipped**
- Unleash: **7kb minified and gzipped**
- Growthbook: **3kb minified and gzipped**
- Flagship: **23kb minified and gzipped**

You can run the audit yourself by following the steps of this repository: https://github.com/progressively-crew/progressively/tree/master/example/bundle-diffs

In comparison, Progressively is **1kb minified and gzipped**.

_This might be an apple to orange comparison, so take this with caution, and try the tools to make your own opinion._

It's also interesting to mention that, when loading feature flagging tools on a webpage, there might be a delay between the moment the application starts, and the moment the user actually sees the flag variation they are supposed to see. This is due to the fact that the feature flagging tools make an HTTP request to resolve the flag from their server, and it can make the application blink on the screen.

Progressively provides SDKs for server-side applications using tools like Remix or Nextjs to prevent this behavior and to show the good variant to the good user directly in the HTML document.

#### Accessible dashboard

We want the dashboard of Progressively to be accessible to as many people as possible. Everything in the dashboard should be explicit enough and clear. If something seems weird or is not clear to you, please, create an issue and help us improve the tool.

#### Responsible tracking

Progressively aims to be reasonable in terms of data that it gathers. By default, it only stores information defined in [this database schema](https://github.com/progressively-crew/progressively/blob/master/packages/backend/prisma/schema.prisma).

Also, in the future, Progressively will rely on logging and monitoring tools (Sentry, ELK, or Datadog) in order to catch errors earlier and eventually responsible analytics tools such as [Plausible](https://plausible.io).
