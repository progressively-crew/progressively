# Hierarchical structure

Progressively is built on top of 3 entities that are: **projects, environments and feature flags**.

Each project can have multiple environments that can have multiple feature flags.

This hierarchical structure allows to use the same instance of Progressively for different projects, but also to apply different feature flag resolution rules to different environments.

For example, if I have a `Progressively` project with 3 environments (`Development`, `Staging`, `Production`), I can define different flag resolution rules for each of these environments. This is practical for testing early in the process, on not-so-critical environment with more permissive rules, and to keep the strong constraints of the `Production` environment when the feature reaches this environment.
