# Feature flags at the edge with Progressively and Vercel

_If you don't want to set up the whole thing, a Nextjs application showcasing this is available on https://github.com/mfrachet/progressively-edge-middleware_

---

**Summary**

- [🧀 Ingredients](#---ingredients)
- [👨‍🍳 Directions](#-directions)
  - [1. Create a feature flag in Progressively](#1-create-a-feature-flag-in-progressively)
  - [2. Create feature flag variants](#2-create-feature-flag-variants)
  - [3. Create a Nextjs project](#3-create-a-nextjs-project)
  - [4. Create pages matching the previously created variants](#4-create-pages-matching-the-previously-created-variants)
  - [5. Install Progressively sdk](#5-install-progressively-sdk)
  - [6. Create the middleware file](#6-create-the-middleware-file)
  - [7. Push the code on GitHub](#7-push-the-code-on-github)
  - [8. Run the project on Vercel](#8-run-the-project-on-vercel)
- [📚 Glossary](#-glossary)
  - [Feature flags](#feature-flags)
  - [Progressively](#progressively)
  - [Vercel Edge Middleware](#vercel-edge-middleware)

---

## 🧀 Ingredients

- A running instance of [Progressively](https://progressively.app/docs/introduction/getting-started)
- A personal Github account on [Vercel](https://vercel.com/dashboard)
- [Node.js](https://nodejs.org/en/) > 16

---

## 👨‍🍳 Directions

### 1. Create a feature flag in Progressively

- Create a new project in the dashboard of Progressively (`/dashboard/projects/create`)
- Click on the `Production` environment that has been created
- Keep the environment key close, we'll need it in the next step.
- Click the `Create a feature flag` button and fill out the form

### 2. Create feature flag variants

- Once the flag is created, click on its name in the table
- On the feature flags page, Click on `Variants`
- Add 3 variants named `A`, `B`, and `C`, and adjust the percentage to your taste

### 3. Create a Nextjs project

Run the following command somewhere on your computer:

```sh
$ npx create-next-app@latest
```

### 4. Create pages matching the previously created variants

In the `./pages` folder, create three files called `index.ts`, `b.ts`, and `c.ts` with different content inside.

### 5. Install Progressively sdk

Run the following command at the root of your Nextjs project:

```sh
$ npm install @progressively/server-side
```

### 6. Create the middleware file

At the root of your Nextjs project, create a `middleware.ts` (or `.js`, depending on your preferences) and copy the following code in it:

```javascript
import { NextResponse } from "next/server";
import { getProgressivelyData } from "@progressively/server-side";

const PROGRESSIVELY_URL = "PUT YOUR SERVER URL HERE";
const PROGRESSIVELY_ENV = "PUT THE ENVIRONMENT KEY HERE";
const ExperimentRoutes = {
  A: "/",
  B: "/b",
  C: "/c",
};

type ExperimentRoutesKeys = keyof typeof ExperimentRoutes;

export default async function middleware(request) {
  // Get the user ID from cookies in order to always show them the same variant
  // If showing the same variant to the same user every time is not a concern for you, you can remove this line
  const id = request.cookies.get("progressively-id");

  // Get the feature flags from Progressively
  const { data, response } = await getProgressivelyData(PROGRESSIVELY_ENV, {
    apiUrl: PROGRESSIVELY_URL,
    fields: {
      id: id?.value || "",
    },
  });

  // Checking that the progressively servers brings us a valid first user id
  // If showing the same variant to the same user every time is not a concern for you, you can remove this line
  const progressivelyId = response.headers.get("x-progressively-id");
  if (!progressivelyId) return;

  let nextRawUrl =
    ExperimentRoutes[data.initialFlags.newHero] || ExperimentRoutes.A;

  const nextUrl = NextResponse.rewrite(new URL(nextRawUrl, request.url));

  // Stick the user ID to the cookies in order to always show them the same variant
  // If showing the same variant to the same user every time is not a concern for you, you can remove this line
  nextUrl.cookies.set("progressively-id", progressivelyId);

  return nextUrl;
}

export const config = {
  matcher: ["/"],
};
```

### 7. Push the code on GitHub

Create a repository on [GitHub](https://github.com/) and push the project.

### 8. Run the project on Vercel

- Connect to your [Vercel](https://vercel.com/dashboard) account using GitHub
- Select `Add a new...` and then `Project`
- Click on `Continue with Github`
- Select your repository and click `Import` at the end of the line
- Fill out the form and click `Deploy`

You now have a Nextjs application, working on the edge using feature flags in Progressively.

**NB: if you want to see the different variants when refreshing, make sure to clean your cookies 😉**

---

## 📚 Glossary

### Feature flags

Feature flags are a technic allowing to progressively rollout features without modifying code at the moment of the release.
They generally take the form of a switch button that you can toggle on and off.

For instance, you may have created a new fancy UI for your login page, but you want to make sure you don't have errors on it that could block your users from accessing your platform. With a feature flagging tool, you can show this new page to N% of your audience, and augment this percentage while you acquire confidence until everybody sees the new page.

### Progressively

[Progressively](https://progressively.app/) is a free, simple, accessible, lightweight, self-hosted and Open Source feature flagging tool that you can use to rollout features to your users.

### Vercel Edge Middleware

[Vercel Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware) is code that executes before a request is processed on a site, and before the CDN cache is hit.

They are a very conveniant place to handle A/B testing and feature flagging using page redirections, without content flashes.
