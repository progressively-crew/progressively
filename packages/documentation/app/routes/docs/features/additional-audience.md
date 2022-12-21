# Additional Audience

When using Progressively, you can define which amount of your audience will resolve the feature flag. It can be qualitative (using Audience Eligiblity), quantitative (using the rollout percentage), or both (only a percentage of the audience matching a specific audience eligibility rule).

However, you may also want to provide "joker" access to a subset of your users. For instance, you may want to test the activated value of the feature flag, even if you are not in the range of targeted users.

The "Additional audience" is the "joker" access: if the users matches at least one the rule, they are granted access to the activated variant of the flag. This feature is mostly to use with the person that work inside your company. It's like a "private access" to a feature that will be rollout in the future.

It's up to you to configure which field you want to rely on to create them. Also, since it uses data that is outside the scope of Progressively, you are reponsible to provide them through SDKs.
