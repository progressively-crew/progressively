# Audience eligibility

By default, Progressively comes with a built in resolution tool that uses percentages: you can activate a feature flag for `0%` to `100%` of the audience.

But in practice, when releasing a feature behind a flag, you may want to target some specific users, like a subset of your global audience.

For example, it's possible to create audience eligibility rules that will allow the following set of user to see the feature behind the flag:

- People with **email containing @progressively.app**
- People with **email containing @bestfriends.com**

**:warning: It's important to understand that if the user requesting the flag matches AT LEAST ONE of the audience eligibility rule, they will receive the activated variant of the flag (if they are in the range of the rollout)**.

It's up to you to configure which field you want to rely on to create them. Also, since it uses data that is outside the scope of Progressively, [you are reponsible to provide them through SDKs](/guides/javascript.html#fields).
