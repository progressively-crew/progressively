# Why Progressively?

Progressively is a minimal and self-hosted feature flagging solution that does not kill your web app performance.

> Keep in mind that it is in Alpha. We need people to use it and give feedback so that we can get more confidence and fix the existing bugs.

## What problem does it aim to solve?

Feature flagging is a technic allowing multiple variations of a given feature (depending on criteria) to be displayed to a specific set of users.

For instance, you may have created a new fancy UI for your login page, but you want to make sure you don't have errors on it that could block your users from accessing your platform. With a feature flagging tool, you can show this new page to N% of your audience, and augment this percentage while you acquire confidence until everybody sees the new page.

This type of tool aims to simplify the release process of a feature: you can put it in production, but only make it available to a subset of your users and gradually roll out.

## What makes Progressively different from other tools?

There are plenty of great tools in the feature flagging space with their own sets of features and tradeoffs. Progressively has been built by developpers that have used some of these tools.

And we wanted to focus on some aspects that have not always been covered by others: **perceived performance, accessibility and privacy**.

- Progressively is smaller than its competitors ([1kB for the React SDK](https://bundlephobia.com/package/@progressively/react@0.0.1-alpha.10), [see comparison](https://github.com/progressively-crew/progressively/tree/master/example/bundle-diffs)) and does not bloat client side bundles
- Progressively has to be accessible (if the experience does not work for you, [let us know](https://github.com/progressively-crew/progressively/issues), we want to improve)
- Progressively focuses on avoiding the page flickering during flag resolution thanks to SSR SDK support ([see React SDK example](/guides/react))
- Realtime propagation with Websockets
- No intrusive tracking (expect error moniroting or privacy first analytics tools to be added at some point to understand more the audience)
- Progressively is self-hosted: you decide where to put your data and running instances

---

If you come from a company that uses feature branches and GitFlow, you might be interested in reading [this blog post](https://mfrachet.github.io/why-i-dont-like-gitflow/)
