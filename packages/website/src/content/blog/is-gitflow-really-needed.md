---
title: Is Gitflow really needed?
publishedDate: 2023-05-02
author: Marvin Frachet
authorPicture: /authors/mf.jpg
tag: Workflow
---

While I'm sure it can _probably_ be useful in certain situations, I don't like Gitflow and the ideas behind it. I think it's way too complex and that there are other easier solutions for a smoother workflow.

## Preface - What is Gitflow?

### Let's start by

Gitflow is a branching strategy that allows to split the development of a project by building `features` on isolated `branches`.
The idea is to checkout a branch everytime the development of a new feature starts.

When the feature looks finished, the feature branch is merged on a `develop` branch which generally represents a specific - and entire - environment where the different features crosses and can be played altogether by anybody having access to the environment.

When it's time to release a specific feature, a new `release` branch is checkout. QA folks are doing their best to verify the behaviour of the different features that have to be shipped and provide feeback to the dev team.
The developers are supposed to only make `hotfix` commits on these branches by checkout some `hotfix` branches and merge them directly inside the release branch.

When everything looks good, the `hotfix` branch is merged back to `develop` so that it benefits from the different hotfixes and also in the `master` branch which is the "production" branch.

![Graphical representation of the Gitflow](/blog/gitflow.png)

It's like a **5 tracks** race.

## Why I don't like it?

My main concern about Gitflow is **complexity**.

- How **much time** a feature takes to reach production?
- How **complex** it is to deal with conflicts between 5 tracks AND long development time?
- How **complex** it is to ramp up new folks to the concept?
- How **hard** it is to fix something when there are differences between dev and prod environments?
- How **stressing** it is on release day to ship N features that have been worked for the last couple of months? (I faced a similar situation where someone was "the king of merging")

## What do people want?

### The product folks want

- Features that reach production at a given date (often the fastest right?)
- Features that work
- Quick bug fixes

### The developer folks want

- No stress at work
- Building meaningful things and features that reach the end user
- As less complexity as possible (who likes dealing with conflicts?)
- Relaxed release day (if release days exist)

From my perspectives, people using Gitflow are trying to solve these problems _ahead of time_ and in their development environment. They are trying to solve these problems at the `git` level.
But the thing is it's not a `git` problem. We don't have to solve it **only using git.**

## An other possible approach

### Let's tackle what the developer folks want

Instead of having a 5 tracks situation, let's imagine a 2 tracks scenario where there would only be:

- the `master` branch
- the `develop` branch

Everytime a developer has finished its task - even the smaller ones - they open a pull request **directly on master**.

Now, let's say that everytime something is merged on `master`, it goes to production. Scary right? But it solves the developers problems:

```diff
- No stress at work
+ You create a bug and fix it in less than 5mns IN PRODUCTION

- Building meaningful things and features that reach the end user
+ Everything you do goes to production: you create value on every merge

- As less complexity as possible (who likes dealing with conflicts?)
+ git checkout, open PR, merge on master, that's it

- Relaxed release day (if release days exist)
+ Which release day?
```

### Let's tackle what the product folks want

What the product folks want is a working feature and a way to show that feature in production at a given moment (when it's finished for example).

If we use _what the developer folks want_, the product folks already have half their needs filled.
The thing is we don't have control on what we show to the user since the code is already in production and is available to the end user. So how can we deal with this issue?

There's one technic or practice called **Feature flagging** which is a way to conditionally show or hide some part of an application.
Think of it like a light switch.

Let's say you have a new feature in a React component and you want to show it only when it's ready:

```jsx
const App = () => {
  const flags = useFlags();

  return (
    <div>
      {flags.newFeature ? <NewFeature /> : null}
      <SomeOldComponnet />
    </div>
  );
};
```

The feature will only be available if the flag is activated.

Now imagine that you could target some specific users, like your product folks for example, so that they have access to the feature _before_ the rest of the world and make verifications
**directly in production**.

Let's see how this solves the product folks problems:

```diff
- Features that reach production at a given date (often the fastest right?)
+ They have control with the feature flag on who can see the feature or not when they want

- Features that work
+ They can verify earlier AND they can switch OFF the feature if it completely breaks for some reasons

- Quick bug fixes
+ Fixed by What the developers want
```

<br />

## How to get there?

The first thing is to automate the deployment process.

Once the application can be deployed in a consistent way, often, it's time to think of a potential solution for feature flagging. If you need some runtime solutions (something that is real time), you can use <strong>Progressively</strong>.

If you don't really care adding an additional commit to switch a flag on, you can simply rely on environment variables. This is particularly useful for Statically Generated Site for example.
