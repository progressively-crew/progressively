# Feature flags strategies

> This feature is only available for single variant feature flags for now. A new iteration will come in the future to make strategies work for multi-variants feature flags.

By default, Progressively comes with a built in resolution tool that uses percentages: you can activate a feature flag for `0%` to `100%` of the audience.

But in practice, when releasing a feature behind flag, you may want some specific people (that you know about in advance) to have access to it.

Feature flags strategies solve this specific problem: they are rules that allow people that are not in the feature flag audience target to actually see the content behind the flag.

For example, it's possible to create strategies that will allow the following set of user to see the feature behind the flag:

- People with **email containing @progressively.app**
- People with **email containing @bestfriends.com**

**:warning: It's important to understand that if the user requesting the flag matches AT LEAST ONE of the strategy, they will receive the activated variant of the flag**.

It's up to you to configure which field you want to rely on to create a strategy. Also, since it uses data that is outside the scope of Progressively, [you are reponsible to provide them through SDKs](/guides/javascript.html#fields).
