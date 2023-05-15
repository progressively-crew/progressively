/* empty css                               */import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as renderSlot, d as addAttribute, e as renderComponent, f as renderHead, s as spreadAttributes, g as createVNode, F as Fragment, _ as __astro_tag_component__, h as createCollectionToGlobResultMap, i as createGetCollection, j as createGetEntryBySlug } from '../astro.98c05aa8.mjs';
import { useId, useState } from 'react';
import { jsxs, jsx } from 'react/jsx-runtime';

const $$Astro$e = createAstro();
const $$Container = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Container;
  return renderTemplate`${maybeRenderHead($$result)}<div class="container mx-auto px-4">${renderSlot($$result, $$slots["default"])}</div>`;
}, "/Users/marvin/soft/progressively/packages/website/src/components/Container.astro");

const $$Astro$d = createAstro();
const $$LinkButton = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$LinkButton;
  const { href, target, variant, id } = Astro2.props;
  const sharedClass = "px-4 py-2 whitespace-nowrap inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900";
  const classCombination = {
    primary: "bg-gray-800 text-white hover:bg-gray-500",
    secondary: "bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100",
    tertiary: "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100"
  };
  const variantClass = classCombination[variant || "primary"];
  const className = `${sharedClass} ${variantClass}`;
  return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(href, "href")}${addAttribute(target, "target")}${addAttribute(className, "class")}${addAttribute(id, "id")}>
  ${renderSlot($$result, $$slots["default"])}
</a>`;
}, "/Users/marvin/soft/progressively/packages/website/src/components/LinkButton.astro");

const $$Astro$c = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead($$result)}<div class="py-4 border-t border-gray-200">
  ${renderComponent($$result, "Container", $$Container, {}, { "default": ($$result2) => renderTemplate`
    <nav>
      <ul class="flex flex-row gap-4">
        <li>
          <a href="/terms" class="underline">Terms</a>
        </li>

        <li>
          <a href="/privacy-policy" class="underline">Privacy Policy</a>
        </li>
      </ul>
    </nav>
  ` })}
</div>`;
}, "/Users/marvin/soft/progressively/packages/website/src/components/Footer.astro");

const $$Astro$b = createAstro();
const $$Nav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Nav;
  const { showPricing } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Container", $$Container, {}, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead($$result2)}<nav class="flex flex-wrap md:justify-end container py-2 gap-2">
    ${renderComponent($$result2, "LinkButton", $$LinkButton, { "variant": "tertiary", "href": "/" }, { "default": ($$result3) => renderTemplate`Home` })}

    ${renderComponent($$result2, "LinkButton", $$LinkButton, { "variant": "tertiary", "href": "/features" }, { "default": ($$result3) => renderTemplate`Features` })}

    ${showPricing && renderTemplate`${renderComponent($$result2, "LinkButton", $$LinkButton, { "variant": "tertiary", "href": "pricing", "id": "pricing" }, { "default": ($$result3) => renderTemplate`
          Pricing
        ` })}`}

    ${renderComponent($$result2, "LinkButton", $$LinkButton, { "variant": "tertiary", "href": "/why-it-s-different" }, { "default": ($$result3) => renderTemplate`
      Why it's different
    ` })}

    ${renderComponent($$result2, "LinkButton", $$LinkButton, { "variant": "tertiary", "href": "/blog" }, { "default": ($$result3) => renderTemplate`Blog` })}

    ${renderComponent($$result2, "LinkButton", $$LinkButton, { "variant": "tertiary", "href": "https://docs.progressively.app/", "id": "documentation" }, { "default": ($$result3) => renderTemplate`
      Documentation
    ` })}

    ${renderComponent($$result2, "LinkButton", $$LinkButton, { "variant": "tertiary", "href": "https://github.com/progressively-crew/progressively", "target": "_blank", "id": "github" }, { "default": ($$result3) => renderTemplate`
      Github
    ` })}
  </nav>
` })}`;
}, "/Users/marvin/soft/progressively/packages/website/src/components/Nav.astro");

var n=function(){return n=Object.assign||function(n){for(var e,i=1,t=arguments.length;i<t;i++)for(var r in e=arguments[i])Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},n.apply(this,arguments)},e=function(n){return btoa(n)};function i(i,t){var r,l=(null==t?void 0:t.apiUrl)||"https://api.progressively.app",o=(null==t?void 0:t.fields)||{};o.clientKey=i;var a="";return fetch("".concat(l,"/sdk/").concat(e(JSON.stringify(o))),{credentials:"include",headers:(null==t?void 0:t.shouldHit)?void 0:{"X-progressively-hit":"skip"}}).then((function(n){var e,i;return a=null!==(i=null===(e=(r=n).headers)||void 0===e?void 0:e.get("X-progressively-id"))&&void 0!==i?i:"",r.json()})).then((function(e){return {data:n({initialFlags:e,clientKey:i},t),response:r,userId:a}})).catch((function(){return {data:n({initialFlags:(null==t?void 0:t.safeValueWhenFailing)?{}:void 0,clientKey:i},t),response:r,userId:a}}))}

const getFlags = async () => {
  const progressivelyEnv = "f66aed69-6211-4e71-86ec-331abd1da961";
  const { data } = await i(progressivelyEnv, {
    shouldHit: true
  });
  return data.initialFlags || {};
};

const $$Astro$a = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Layout;
  const flags = await getFlags();
  const { title } = Astro2.props;
  const description = "Progressively is a new feature flag solution that has a very low performance impact. It's a simple, accessible, lightweight, self-hosted and OpenSource feature flag software.";
  return renderTemplate`<html lang="en" class="min-h-full h-full">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" type="image/jpg" href="/favicon.png">
    <link href="https://rsms.me/inter/inter.css" rel="stylesheet" rel="preload">

    <link href="/styles.css" rel="stylesheet" rel="preload">

    <meta name="generator"${addAttribute(Astro2.generator, "content")}>
    <meta name="description"${addAttribute(description, "content")}>
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@mfrachet">
    <meta name="twitter:image" content="/pg.jpg">
    <meta property="og:title"${addAttribute(title, "content")}>
    <meta property="og:description"${addAttribute(description, "content")}>
    <meta property="og:image" content="/pg.jpg">

    <title>${title}</title>
  ${renderHead($$result)}</head>
  <body class="min-h-full h-full bg-gray-50">
    ${renderComponent($$result, "Nav", $$Nav, { "showPricing": Boolean(flags.pricingPage) })}
    ${renderSlot($$result, $$slots["default"])}

    ${flags.pricingPage && renderTemplate`${renderComponent($$result, "Footer", $$Footer, {})}`}
  </body>
</html>`;
}, "/Users/marvin/soft/progressively/packages/website/src/layouts/Layout.astro");

const $$Astro$9 = createAstro();
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Index$1;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to Progressively, the new feature flag solution." }, { "default": ($$result2) => renderTemplate`
  ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate`
    ${maybeRenderHead($$result3)}<header>
      <div class="flex justify-center lg:items-center flex-col py-20 md:py-40 gap-4">
        <h1 class="text-5xl md:text-6xl font-extrabold">
          Introducing <span>Progressively</span>
        </h1>

        <p class="text-2xl sm:text-center">
          A simple, accessible, lightweight, self-hosted and OpenSource feature
          flag software.
        </p>

        <div class="flex flex-col sm:flex-row gap-4">
          ${renderComponent($$result3, "LinkButton", $$LinkButton, { "href": "https://docs.progressively.app/get-started/quick-start", "target": "_blank", "id": "get-started" }, { "default": ($$result4) => renderTemplate`
            Get started locally
          ` })}

          ${renderComponent($$result3, "LinkButton", $$LinkButton, { "variant": "tertiary", "href": "https://dashboard.progressively.app/signin", "target": "_blank", "id": "demo-instance" }, { "default": ($$result4) => renderTemplate`
            Demo instance
          ` })}
        </div>
      </div>

      <div class="md:rounded-lg overflow-hidden">
        <img src="/capture.png" alt="" height="512px">
      </div>
    </header>

    <main>
      <section class="pt-20 md:pt-40">
        <h2 class="font-extrabold text-4xl md:text-5xl pb-4">
          Why do you need feature flags?
        </h2>
        <p class="text-2xl leading-relaxed max-w-4xl">
          Deploying new features in production is risky and oftentimes a pain.
          Taking care of bugs, rollbacks, infrastructure and managing release
          trains are not very fun – and are stressful. Who's never put some code
          on production and after 2 hours in the wild, had to rollback?
        </p>
      </section>

      <section class="pt-20 md:pt-40">
        <h2 class="font-extrabold text-4xl md:text-5xl pb-4">
          How feature flags solve this?
        </h2>

        <p class="text-2xl leading-relaxed max-w-4xl pt-4">
          They make releases more dynamic, more precise, more granular and
          easier to rollback when it comes to fixing bugs. All you have to do is <strong>pulling a trigger</strong> in a dashboard.
        </p>
      </section>

      <section class="py-20 md:py-40">
        <h2 class="font-extrabold text-4xl md:text-5xl pb-4">
          Introducing Progressively
        </h2>

        <p class="text-2xl leading-relaxed max-w-4xl pt-4 pb-4">
          Switching a toggle is great for a one-off deploy. And Progressively
          does more by providing tooling to only <strong>rollout to a given set of your audience</strong>, or <strong>schedule feature activation</strong>, <strong>measure feature flags impacts</strong>, <strong>triggering webhook</strong> when a release happens etc...
        </p>

        ${renderComponent($$result3, "LinkButton", $$LinkButton, { "href": "/features", "variant": "secondary" }, { "default": ($$result4) => renderTemplate`
          Discover the features
        ` })}
      </section>
    </main>
  ` })}
` })}`;
}, "/Users/marvin/soft/progressively/packages/website/src/pages/index.astro");

const $$file$5 = "/Users/marvin/soft/progressively/packages/website/src/pages/index.astro";
const $$url$5 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$5,
  url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$8 = createAstro();
const $$ExternalLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$ExternalLink;
  const { href } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(href, "href")} target="_blank" rel="noopener noreferrer" class="underline font-semibold">${renderSlot($$result, $$slots["default"])}</a>`;
}, "/Users/marvin/soft/progressively/packages/website/src/components/ExternalLink.astro");

const $$Astro$7 = createAstro();
const $$WhyItSDifferent = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$WhyItSDifferent;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Why Progressively is different?" }, { "default": ($$result2) => renderTemplate`
  ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate`
    ${maybeRenderHead($$result3)}<header class="pt-20 pb-8">
      <h1 class="text-2xl font-extrabold">Why it's different?</h1>
    </header>

    <main>
      <section class="pb-20 md:pb-40">
        <h2 class="font-extrabold text-4xl md:text-5xl pb-4">It's small</h2>
        <p class="text-2xl leading-relaxed max-w-4xl">
          Webpage size is a trend. And we don't want to increase it with
          additional tooling. With this in mind, the React SDK for Progressively
          is only ${renderComponent($$result3, "ExternalLink", $$ExternalLink, { "href": "https://bundlephobia.com/package/@progressively/react@0.0.1-beta.1" }, { "default": ($$result4) => renderTemplate`
            1.2Kb
          ` })}, which is order of magnitude smaller than other tools.
        </p>
      </section>

      <section class="pb-20 md:pb-40">
        <h2 class="font-extrabold text-4xl md:text-5xl pb-4">
          It works on Edge runtime
        </h2>
        <p class="text-2xl leading-relaxed max-w-4xl">
          You can use Progressively Server Side SDK on Edge runtime. Even more
          interesting: if you combine ${renderComponent($$result3, "ExternalLink", $$ExternalLink, { "href": "https://vercel.com/docs/concepts/functions/edge-middleware" }, { "default": ($$result4) => renderTemplate`
            Vercel Edge Middleware
          ` })} and ${renderComponent($$result3, "ExternalLink", $$ExternalLink, { "href": "https://docs.progressively.app/sdks/react#usage-with-ssr" }, { "default": ($$result4) => renderTemplate`
            Progressively server side SDK
          ` })}, you can perform A/B testing at any scale.
        </p>
      </section>

      <section class="pb-20 md:pb-40">
        <h2 class="font-extrabold text-4xl md:text-5xl pb-4">
          It's Open Source
        </h2>
        <p class="text-2xl leading-relaxed max-w-4xl">
          All the codebase is Open Source and available in the ${renderComponent($$result3, "ExternalLink", $$ExternalLink, { "href": "https://github.com/progressively-crew/progressively" }, { "default": ($$result4) => renderTemplate`
            Github Repository
          ` })}. A feature is missing? A bug has happened? Participate
          to the evolution of the tool and help us by ${renderComponent($$result3, "ExternalLink", $$ExternalLink, { "href": "https://github.com/progressively-crew/progressively/issues/new/choose" }, { "default": ($$result4) => renderTemplate`
            filling an issue
          ` })}, or contributing.
        </p>
      </section>

      <section class="pb-20 md:pb-40">
        <h2 class="font-extrabold text-4xl md:text-5xl pb-4">
          It's Self Hosted
        </h2>
        <p class="text-2xl leading-relaxed max-w-4xl">
          You install the tool on your servers, you own the data. In the future,
          a SaaS might be available for users who prefer to use a ready to go
          service. If that's your case, please manifest your support on social
          channels.
        </p>
      </section>

      <section class="pb-20 md:pb-40">
        <h2 class="font-extrabold text-5xl pb-4">It's Accessible</h2>
        <p class="text-2xl leading-relaxed max-w-4xl">
          We do our best to keep the tool accessible for as many person as
          possible. And we know there's a lot to do. If you have any problem
          while navigating or using the app, please let us know.
        </p>
      </section>
    </main>
  ` })}
` })}`;
}, "/Users/marvin/soft/progressively/packages/website/src/pages/why-it-s-different.astro");

const $$file$4 = "/Users/marvin/soft/progressively/packages/website/src/pages/why-it-s-different.astro";
const $$url$4 = "/why-it-s-different";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$WhyItSDifferent,
  file: $$file$4,
  url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$6 = createAstro();
const $$MarkdownLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$MarkdownLayout;
  const { content } = Astro2.props;
  const { title } = content;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate`
  ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate`
    ${maybeRenderHead($$result3)}<main class="prose prose-slate py-12">
      ${renderSlot($$result3, $$slots["default"])}
    </main>
  ` })}
` })}`;
}, "/Users/marvin/soft/progressively/packages/website/src/layouts/MarkdownLayout.astro");

const images$1 = {
					
				};

				function updateImageReferences$1(html) {
					return html.replaceAll(
						/__ASTRO_IMAGE_="(.+)"/gm,
						(full, imagePath) => spreadAttributes({src: images$1[imagePath].src, ...images$1[imagePath].attributes})
					);
				}

				const html$1 = updateImageReferences$1("<h1 id=\"privacy-policy\">Privacy policy</h1>\n<p>Effective date: May 9, 2023</p>\n<p>The project is Open Source and the entire codebase can be browsed and audited. If you have any particular questions, or if you think this document is lacking information, we (the team behind Progressively) will be more than happy to update it.</p>\n<h2 id=\"what-information-progressively-collects-and-why\">What Information Progressively Collects and Why</h2>\n<h3 id=\"website-browser-data\">Website browser data</h3>\n<p>If you’re using the website, we collect the same basic information that most websites collect such as cookies and web server logs. Everybody is concerned.</p>\n<p>The information we collect about all users of our app for logs purpose includes:</p>\n<ul>\n<li>IP address</li>\n<li>User Agent</li>\n</ul>\n<h3 id=\"why-do-we-collect-this\">Why Do We Collect This?</h3>\n<p>We collect this information to monitor and make sure everything runs as expected in the website.</p>\n<h3 id=\"users-with-accounts-information\">Users with accounts information</h3>\n<p>To get access to Progressively’s dashboard, users have to create an account requiring a valid email address, a password and a username.</p>\n<p>The combination of email address, password and username is what we will call “User Personal Information” in the subsequent sections.</p>\n<h3 id=\"why-do-we-collect-this-1\">Why Do We Collect This?</h3>\n<p>User Personal Information are only used for:</p>\n<ul>\n<li>creating an account and accessing the service</li>\n<li>identifying you the service</li>\n<li>using your email address to contact you</li>\n</ul>\n<p>We limit our use of your User Personal Information to the purposes listed in this Privacy Statement. If we need to use your User Personal Information for other purposes, we will ask your permission first.</p>\n<h3 id=\"additional-users-data-that-you-provide\">Additional users data that you provide</h3>\n<p>In the dashboard of Progressively, you (the dashboard consumer) can use features where you can add additional data such as email, people IDs, name etc…</p>\n<h3 id=\"why-do-we-collect-this-2\">Why Do We Collect This?</h3>\n<p>We use these information to create targeting rules for feature flags evaluation.</p>\n<p>This information is provided by you and only you, and you acknowledge that you are the only responsible entity for the storage of these data, even more if they are sensitive. Progressively cannot be held responsible for the storage of this data.</p>\n<h2 id=\"what-information-progressively-does-not-collect\">What Information Progressively Does Not Collect</h2>\n<p>We do not collect sensitive personal information including:</p>\n<ul>\n<li>Social security numbers</li>\n<li>Religious information</li>\n<li>Genetic information</li>\n<li>Health data</li>\n</ul>\n<p>If you store any sensitive personal information on our database, you are consenting to our storage of that information on our servers, which are in the United States.</p>\n<h2 id=\"how-we-share-the-information-we-collect\">How We Share the Information We Collect</h2>\n<p>We do not share, sell, rent, or trade User Personal Information with third parties for their commercial purposes.</p>\n<p>We do not disclose User Personal Information outside Progressively, except in the situations listed in this section or in the section below on Compelled Disclosure.</p>\n<p>We do not host advertising on Progressively. We may occasionally embed content from third party sites, such as YouTube, and that content may include ads. While we try to minimize the amount of ads our embedded content contains, we can’t always control what third parties show.</p>\n<p>We may share User Personal Information with your permission, so we can perform services you have requested.</p>\n<h2 id=\"our-use-of-cookies-and-tracking\">Our Use of Cookies and Tracking</h2>\n<h3 id=\"cookies\">Cookies</h3>\n<p>Progressively uses cookies to make interactions with our service easy and meaningful. We use cookies (and similar technologies, like HTML5 localStorage) to keep you logged in.</p>\n<p>Progressively also uses cookies to store a randomly generated unique identifier to provide the same navigation experience to the user on subsequent sessions after feature flags have been evaluated.</p>\n<h3 id=\"tracking\">Tracking</h3>\n<p>We track flags evaluations. A flag evaluation correspond to the computation of a feature flag value from a randomly generated unique identifier. We store flag evaluation to provide you with insights regarding how you application behaves when a feature flag is used. This flag evaluation contains the generated ID and this generated can’t be used to identify a person: it’s randomly generated and associated with no additional data.</p>\n<p>Also, in Progressively, it’s possible to create “metrics”. You can get navigation information and insights based on these. For instance, you can <code>track the metric \"Click CTA\" on the Hero button</code> and get this data in the dashboard. This metric hit does not contain data that can identify a person.</p>\n<h2 id=\"resolving-complaints\">Resolving Complaints</h2>\n<p>If you have concerns about the way Progressively is handling your User Personal Information, please let us know immediately by emailing us at <a href=\"mailto:marvin.frachet@protonmail.com\">marvin.frachet@protonmail.com</a> with the subject line “Privacy Concerns.” We will respond within 45 days at the latest.</p>\n<h2 id=\"how-we-respond-to-compelled-disclosure\">How We Respond to Compelled Disclosure</h2>\n<p>Progressively may disclose personally-identifying information or other information we collect about you to law enforcement in response to a valid subpoena, court order, warrant, or similar government order, or when we believe in good faith that disclosure is reasonably necessary to protect our property or rights, or those of third parties or the public at large.</p>\n<p>In complying with court orders and similar legal processes, Progressively strives for transparency. When permitted, we will make a reasonable effort to notify users of any disclosure of their information, unless we are prohibited by law or court order from doing so, or in rare, exigent circumstances.</p>\n<h2 id=\"how-you-can-access-and-control-the-information-we-collect\">How You Can Access and Control the Information We Collect</h2>\n<p>If you’re already a Progressively user, you may access, update, alter your basic user profile information by editing your user profile or contacting <a href=\"mailto:marvin.frachet@protonmail.com\">marvin.frachet@protonmail.com</a>.</p>\n<h3 id=\"data-retention-and-deletion\">Data Retention and Deletion</h3>\n<p>Progressively will retain User Personal Information for as long as your account is active or as needed to provide you services.</p>\n<h3 id=\"how-we-communicate-with-you\">How We Communicate With You</h3>\n<p>We will communicate with you using:</p>\n<ul>\n<li>the email address when you will start a request with us</li>\n<li>using social networks</li>\n<li>using the homepage of the application</li>\n</ul>\n<h3 id=\"changes-to-our-privacy-statement\">Changes to Our Privacy Statement</h3>\n<p>Although most changes are likely to be minor, Progressively may change our Privacy Statement from time to time. We will provide notification to Users of material changes to this Privacy Statement through our Website at least 30 days prior to the change taking effect by posting a notice on our home page. For changes to this Privacy Statement that do not affect your rights, we encourage visitors to check this page frequently.</p>\n<p>Questions regarding Progressively’s Privacy Statement or information practices should be directed to <a href=\"mailto:marvin.frachet@protonmail.com\">marvin.frachet@protonmail.com</a>.</p>");

				const frontmatter$1 = {"layout":"../layouts/MarkdownLayout.astro"};
				const file$1 = "/Users/marvin/soft/progressively/packages/website/src/pages/privacy-policy.md";
				const url$1 = "/privacy-policy";
				function rawContent$1() {
					return "\n# Privacy policy\n\nEffective date: May 9, 2023\n\nThe project is Open Source and the entire codebase can be browsed and audited. If you have any particular questions, or if you think this document is lacking information, we (the team behind Progressively) will be more than happy to update it.\n\n## What Information Progressively Collects and Why\n\n### Website browser data\n\nIf you're using the website, we collect the same basic information that most websites collect such as cookies and web server logs. Everybody is concerned.\n\nThe information we collect about all users of our app for logs purpose includes:\n\n- IP address\n- User Agent\n\n### Why Do We Collect This?\n\nWe collect this information to monitor and make sure everything runs as expected in the website.\n\n### Users with accounts information\n\nTo get access to Progressively's dashboard, users have to create an account requiring a valid email address, a password and a username.\n\nThe combination of email address, password and username is what we will call \"User Personal Information\" in the subsequent sections.\n\n### Why Do We Collect This?\n\nUser Personal Information are only used for:\n\n- creating an account and accessing the service\n- identifying you the service\n- using your email address to contact you\n\nWe limit our use of your User Personal Information to the purposes listed in this Privacy Statement. If we need to use your User Personal Information for other purposes, we will ask your permission first.\n\n### Additional users data that you provide\n\nIn the dashboard of Progressively, you (the dashboard consumer) can use features where you can add additional data such as email, people IDs, name etc...\n\n### Why Do We Collect This?\n\nWe use these information to create targeting rules for feature flags evaluation.\n\nThis information is provided by you and only you, and you acknowledge that you are the only responsible entity for the storage of these data, even more if they are sensitive. Progressively cannot be held responsible for the storage of this data.\n\n## What Information Progressively Does Not Collect\n\nWe do not collect sensitive personal information including:\n\n- Social security numbers\n- Religious information\n- Genetic information\n- Health data\n\nIf you store any sensitive personal information on our database, you are consenting to our storage of that information on our servers, which are in the United States.\n\n## How We Share the Information We Collect\n\nWe do not share, sell, rent, or trade User Personal Information with third parties for their commercial purposes.\n\nWe do not disclose User Personal Information outside Progressively, except in the situations listed in this section or in the section below on Compelled Disclosure.\n\nWe do not host advertising on Progressively. We may occasionally embed content from third party sites, such as YouTube, and that content may include ads. While we try to minimize the amount of ads our embedded content contains, we can't always control what third parties show.\n\nWe may share User Personal Information with your permission, so we can perform services you have requested.\n\n## Our Use of Cookies and Tracking\n\n### Cookies\n\nProgressively uses cookies to make interactions with our service easy and meaningful. We use cookies (and similar technologies, like HTML5 localStorage) to keep you logged in.\n\nProgressively also uses cookies to store a randomly generated unique identifier to provide the same navigation experience to the user on subsequent sessions after feature flags have been evaluated.\n\n### Tracking\n\nWe track flags evaluations. A flag evaluation correspond to the computation of a feature flag value from a randomly generated unique identifier. We store flag evaluation to provide you with insights regarding how you application behaves when a feature flag is used. This flag evaluation contains the generated ID and this generated can't be used to identify a person: it's randomly generated and associated with no additional data.\n\nAlso, in Progressively, it's possible to create \"metrics\". You can get navigation information and insights based on these. For instance, you can `track the metric \"Click CTA\" on the Hero button` and get this data in the dashboard. This metric hit does not contain data that can identify a person.\n\n## Resolving Complaints\n\nIf you have concerns about the way Progressively is handling your User Personal Information, please let us know immediately by emailing us at marvin.frachet@protonmail.com with the subject line \"Privacy Concerns.\" We will respond within 45 days at the latest.\n\n## How We Respond to Compelled Disclosure\n\nProgressively may disclose personally-identifying information or other information we collect about you to law enforcement in response to a valid subpoena, court order, warrant, or similar government order, or when we believe in good faith that disclosure is reasonably necessary to protect our property or rights, or those of third parties or the public at large.\n\nIn complying with court orders and similar legal processes, Progressively strives for transparency. When permitted, we will make a reasonable effort to notify users of any disclosure of their information, unless we are prohibited by law or court order from doing so, or in rare, exigent circumstances.\n\n## How You Can Access and Control the Information We Collect\n\nIf you're already a Progressively user, you may access, update, alter your basic user profile information by editing your user profile or contacting marvin.frachet@protonmail.com.\n\n### Data Retention and Deletion\n\nProgressively will retain User Personal Information for as long as your account is active or as needed to provide you services.\n\n### How We Communicate With You\n\nWe will communicate with you using:\n\n- the email address when you will start a request with us\n- using social networks\n- using the homepage of the application\n\n### Changes to Our Privacy Statement\n\nAlthough most changes are likely to be minor, Progressively may change our Privacy Statement from time to time. We will provide notification to Users of material changes to this Privacy Statement through our Website at least 30 days prior to the change taking effect by posting a notice on our home page. For changes to this Privacy Statement that do not affect your rights, we encourage visitors to check this page frequently.\n\nQuestions regarding Progressively's Privacy Statement or information practices should be directed to marvin.frachet@protonmail.com.\n";
				}
				function compiledContent$1() {
					return html$1;
				}
				function getHeadings$1() {
					return [{"depth":1,"slug":"privacy-policy","text":"Privacy policy"},{"depth":2,"slug":"what-information-progressively-collects-and-why","text":"What Information Progressively Collects and Why"},{"depth":3,"slug":"website-browser-data","text":"Website browser data"},{"depth":3,"slug":"why-do-we-collect-this","text":"Why Do We Collect This?"},{"depth":3,"slug":"users-with-accounts-information","text":"Users with accounts information"},{"depth":3,"slug":"why-do-we-collect-this-1","text":"Why Do We Collect This?"},{"depth":3,"slug":"additional-users-data-that-you-provide","text":"Additional users data that you provide"},{"depth":3,"slug":"why-do-we-collect-this-2","text":"Why Do We Collect This?"},{"depth":2,"slug":"what-information-progressively-does-not-collect","text":"What Information Progressively Does Not Collect"},{"depth":2,"slug":"how-we-share-the-information-we-collect","text":"How We Share the Information We Collect"},{"depth":2,"slug":"our-use-of-cookies-and-tracking","text":"Our Use of Cookies and Tracking"},{"depth":3,"slug":"cookies","text":"Cookies"},{"depth":3,"slug":"tracking","text":"Tracking"},{"depth":2,"slug":"resolving-complaints","text":"Resolving Complaints"},{"depth":2,"slug":"how-we-respond-to-compelled-disclosure","text":"How We Respond to Compelled Disclosure"},{"depth":2,"slug":"how-you-can-access-and-control-the-information-we-collect","text":"How You Can Access and Control the Information We Collect"},{"depth":3,"slug":"data-retention-and-deletion","text":"Data Retention and Deletion"},{"depth":3,"slug":"how-we-communicate-with-you","text":"How We Communicate With You"},{"depth":3,"slug":"changes-to-our-privacy-statement","text":"Changes to Our Privacy Statement"}];
				}
				async function Content$1() {
					const { layout, ...content } = frontmatter$1;
					content.file = file$1;
					content.url = url$1;
					const contentFragment = createVNode(Fragment, { 'set:html': html$1 });
					return createVNode($$MarkdownLayout, {
									file: file$1,
									url: url$1,
									content,
									frontmatter: content,
									headings: getHeadings$1(),
									rawContent: rawContent$1,
									compiledContent: compiledContent$1,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$1[Symbol.for('astro.needsHeadRendering')] = false;

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$1,
  compiledContent: compiledContent$1,
  default: Content$1,
  file: file$1,
  frontmatter: frontmatter$1,
  getHeadings: getHeadings$1,
  images: images$1,
  rawContent: rawContent$1,
  url: url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$5 = createAstro();
const $$Feature = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Feature;
  const { title, href } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<section class="md:pd-20 pb-40">
  <h2 class="font-extrabold text-4xl md:text-5xl pb-4">${title}</h2>
  <p class="text-2xl leading-relaxed max-w-4xl">
    ${renderSlot($$result, $$slots["default"])}
  </p>

  <div class="pt-16">
    <img${addAttribute(href, "src")} alt="" class="md:rounded-lg">
  </div>
</section>`;
}, "/Users/marvin/soft/progressively/packages/website/src/components/Feature.astro");

const $$Astro$4 = createAstro();
const $$Features = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Features;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Features of Progressively" }, { "default": ($$result2) => renderTemplate`
  ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate`
    ${maybeRenderHead($$result3)}<header class="pt-20 pb-8">
      <h1 class="text-2xl font-extrabold">The baked-in features</h1>
    </header>

    <main>
      ${renderComponent($$result3, "Feature", $$Feature, { "title": "Audience Targeting", "href": "/audience.png" }, { "default": ($$result4) => renderTemplate`
        With Progressively, you can define <strong>very granular rules</strong> based
        on users attributes to define who is supposed to get access to the new feature.
        It also includes <strong>gradual rollouts</strong> using percentage ranges.
      ` })}

      ${renderComponent($$result3, "Feature", $$Feature, { "title": "Single & Multi Variants", "href": "/variants.png" }, { "default": ($$result4) => renderTemplate`
        By default, <strong>a feature can be visible or not visible</strong>.
        With Progressively, you can define <strong>other variants</strong> to provide
        different variations of your features to different users. It's useful for
        <strong>A/B testing</strong>.
      ` })}

      ${renderComponent($$result3, "Feature", $$Feature, { "title": "Segments of users", "href": "/segments.png" }, { "default": ($$result4) => renderTemplate`
        Creating granular rules might be a long and repetitive task. Segments of
        users allows <strong>to group a set of rules targeting a set of users</strong> under the same entitiy. And it can also be used as a targeting rule. For
        instance, you can give your <strong>QA team an early access</strong> to the
        feature in production without repeating the rule.
      ` })}

      ${renderComponent($$result3, "Feature", $$Feature, { "title": "Activation scheduling", "href": "/schedule.png" }, { "default": ($$result4) => renderTemplate`
        You want to activate (or deactivate) your feature flag on Tuesday 2pm
        PST but you live in Europe and you don't want to wake up? <strong>We have flag activation scheduling for you</strong>.
      ` })}

      ${renderComponent($$result3, "Feature", $$Feature, { "title": "Flag insights", "href": "/insights.png" }, { "default": ($$result4) => renderTemplate`
        Each time a user is making a request to Progressively for evaluating the
        status of a flag, <strong>this evaluation is registered</strong>. In
        addition to that, you can define <strong>your own metrics</strong> and we
        cross the information between the flag evaluation and the metrics hits in
        dashboards.
      ` })}
    </main>
  ` })}
` })}`;
}, "/Users/marvin/soft/progressively/packages/website/src/pages/features.astro");

const $$file$3 = "/Users/marvin/soft/progressively/packages/website/src/pages/features.astro";
const $$url$3 = "/features";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Features,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const FlagEvaluationTenKCost = 12;

const PricingCalculator = () => {
  const id = useId();
  const [evaluationCount, setEvaluationCount] = useState(1e4);
  const flagCountSliderId = `flagcount-${id}`;
  const labelClassName = "block pb-2";
  const innerLabelClassName = "text-slate-500 font semibold";
  const total = FlagEvaluationTenKCost * (evaluationCount / 1e4);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsxs("div", {
      "aria-live": "polite",
      className: "text-center pb-16",
      children: [/* @__PURE__ */ jsxs("strong", {
        className: "text-7xl",
        children: ["€", total]
      }), /* @__PURE__ */ jsx("span", {
        className: "text-4xl text-slate-500",
        children: "/month"
      })]
    }), /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsxs("label", {
        htmlFor: flagCountSliderId,
        className: labelClassName,
        children: [/* @__PURE__ */ jsx("span", {
          className: innerLabelClassName,
          children: "Flag evaluations/month*"
        }), /* @__PURE__ */ jsx("span", {
          className: "block font-bold text-4xl",
          children: evaluationCount
        })]
      }), /* @__PURE__ */ jsx("input", {
        name: "evaluationCount",
        type: "range",
        min: 1e4,
        step: 1e4,
        max: 8e4,
        id: flagCountSliderId,
        value: evaluationCount,
        onChange: (e) => setEvaluationCount(Number(e.target.value))
      })]
    })]
  });
};
__astro_tag_component__(PricingCalculator, "@astrojs/react");

const $$Astro$3 = createAstro();
const $$Faq = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Faq;
  const { title } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<details class="border border-slate-200 rounded-lg p-4 max-w-4xl">
  <summary class="font-bold cursor-pointer">${title}</summary>
  <p class="pt-4">
    ${renderSlot($$result, $$slots["default"])}
  </p>
</details>`;
}, "/Users/marvin/soft/progressively/packages/website/src/components/Faq.astro");

const $$Astro$2 = createAstro();
const $$Pricing = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Pricing;
  const frontendUrl = "http://localhost:3000";
  const trialUrl = `${frontendUrl}/register`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pricing plans of Progressively" }, { "default": ($$result2) => renderTemplate`
  ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate`
    ${maybeRenderHead($$result3)}<header class="flex flex-col pt-20 md:pt-40 pb-12 gap-4 text-center items-center justify-center">
      <h1 class="text-5xl md:text-6xl font-extrabold">Pricing</h1>
      <p class="text-2xl leading-relaxed max-w-4xl">
        The product is at an early pricing discovery stage. The pricing will
        vary in the future, <strong>for more or for less</strong> depending on the
        cost of servers and databases used under the hood. But don't worry, pricing
        changes will not be so significant and it should reach stability at some
        point.
      </p>
    </header>

    <main>
      <div class="bg-white rounded-lg drop-shadow-lg overflow-hidden px-32 py-20 max-w-4xl mx-auto">
        ${renderComponent($$result3, "PricingCalculator", PricingCalculator, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/marvin/soft/progressively/packages/website/src/components/PricingCalculator", "client:component-export": "PricingCalculator" })}
      </div>

      <div class="text-center pt-4 pb-20">
        ${renderComponent($$result3, "LinkButton", $$LinkButton, { "href": trialUrl }, { "default": ($$result4) => renderTemplate`Start your free trial` })}
      </div>

      <div class="pb-12">
        <h2 class="font-extrabold text-4xl md:text-5xl pb-4 text-center">
          FAQ
        </h2>
        <div class="flex flex-col gap-4 mx-auto max-w-4xl">
          ${renderComponent($$result3, "Faq", $$Faq, { "title": "What happens when the flag evaluation is reached?" }, { "default": ($$result4) => renderTemplate`
            When the flag evaluation limit is reached, the users will receive
            the flag has deactivated until the next month or an upgrade of your
            plan.
          ` })}

          ${renderComponent($$result3, "Faq", $$Faq, { "title": "What count as a flag evaluation?" }, { "default": ($$result4) => renderTemplate`
            A flag evaluation corresponds to the computation of <strong>one feature flag value</strong>. If your project contains <strong>3 feature flags, there will be 3 flag evaluations</strong> when requesting the server.
          ` })}
        </div>
      </div>
    </main>
  ` })}
` })}`;
}, "/Users/marvin/soft/progressively/packages/website/src/pages/pricing.astro");

const $$file$2 = "/Users/marvin/soft/progressively/packages/website/src/pages/pricing.astro";
const $$url$2 = "/pricing";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pricing,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const images = {
					
				};

				function updateImageReferences(html) {
					return html.replaceAll(
						/__ASTRO_IMAGE_="(.+)"/gm,
						(full, imagePath) => spreadAttributes({src: images[imagePath].src, ...images[imagePath].attributes})
					);
				}

				const html = updateImageReferences("<h1 id=\"terms-of-service\">Terms of Service</h1>\n<p>Effective date: May 9, 2023</p>\n<p>When we say ”company”, “we”, “our”, “us”, ”service” or ”services” in this document, we are referring to Progressively.</p>\n<p>The following Terms of Service apply to Progressively as a SaaS only and not to Progressively Self-Hosted which would be hosted on your own servers and therefore the Terms of Service are not applicable.</p>\n<p>We may update these Terms of Service in the future. Whenever we make a significant change to these policies, we will also announce them on the website.</p>\n<p>When you use our service, now or in the future, you are agreeing to the latest Terms of Service. That’s true for any of our existing and future products and all features that we add to our service over time. There may be times where we do not exercise or enforce any right or provision of the Terms of Service; in doing so, we are not waiving that right or provision.</p>\n<p>If you do not agree to these Terms of Service, do not use this service. Violation of any of the terms below may result in the termination of your account.</p>\n<h2 id=\"account-terms\">Account terms</h2>\n<p>You are responsible for maintaining the security of your account and password. Progressively cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.</p>\n<p>You are responsible for any activity that occurs under your account (even by others who have their own logins under your account).</p>\n<p>You may not use our service for any illegal purpose or to violate any laws in your jurisdiction.</p>\n<p>You must provide a valid email address in order to complete the signup process.</p>\n<p>You must be a human. Accounts registered by bots or other automated methods are not permitted.</p>\n<h2 id=\"payment-refunds-upgrading-and-downgrading-terms\">Payment, refunds, upgrading and downgrading terms</h2>\n<p>The free trial is free and for a duration that is explicitly expressed in the pricing page. We do not ask credit card and do not sell this data. After the trial period, the paiement is due in advance. If you do not pay, your account will be suspended and the flag evaluations will be locked. Your account will be frozen for 60 days. After this period, the account will be deleted and the subscription cancelled.</p>\n<p>If you are upgrading from a free trial to a paid plan, we will charge you immediately and your billing cycle starts on the day of upgrade.</p>\n<p>Paying customers are billed automatically via credit card.</p>\n<p>The number of flag evaluations purchased in the paid plan must be used during the applicable term and any unused pageviews at the end of the term are forfeited.</p>\n<p>Your card will never be charged unexpectedly. In the event the usage of flag evaluations exceeds the paid plan, your flag will always be evaluated as deactivated. We will contact you to upgrade to a higher plan for the following month.</p>\n<p>You can upgrade or downgrade in plan level at any time within your account settings. Downgrading your plan may cause the loss of features or capacity of your account. Progressively does not accept any liability for such loss.</p>\n<p>Our payment process is conducted by our payment processor Paddle. Paddle provides customer service inquiries and handles returns. All fees are inclusive of all taxes, levies, or duties imposed by taxing authorities. Paddle will collect those taxes on behalf of taxing authority and remit those taxes to taxing authorities. See Paddle’s Terms of Use for details.</p>\n<p>Fees paid hereunder are non-refundable.</p>\n<h2 id=\"cancellation-and-termination\">Cancellation and termination</h2>\n<p>You are solely responsible for properly canceling your account. An email to cancel your account is not considered cancellation. You can cancel your account on your profile page only.</p>\n<p>If you cancel the service before the end of your current paid up period, all the information related to the projects you own will be immediately erased and unavailable. The money will not be refund and the subscription will stop at the end of the current cycle.</p>\n<p>You can choose to delete your account and all your site stats at any time. All your stats will be permanently deleted immediately when you delete your Progressively account.</p>\n<p>We reserve the right to suspend or terminate your account and refuse any and all current or future use of the service for any reason at any time. Such termination of the service will result in the deactivation or deletion of your account or your access to your account and site stats. Progressively reserves the right to refuse service to anyone for any reason at any time. We have this clause because statistically speaking, out of the thousands of sites on our service, there may be at least one doing something nefarious.</p>\n<p>Verbal, physical, written or other abuse (including threats of abuse or retribution) of any service customer, company employee or officer may result in immediate account termination.</p>\n<h2 id=\"modifications-to-the-service-and-prices\">Modifications to the service and prices</h2>\n<p>We reserve the right at any time and from time to time to modify or discontinue, temporarily or permanently, any part of the service with or without notice.</p>\n<p>Sometimes we change the pricing structure for our products. If we do so, we will give at least 30 days notice and will notify you via the email address on record. We may also post a notice about changes on our blog or the affected services themselves.</p>\n<p>Progressively shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the service.</p>\n<h2 id=\"content-ownership-copyright-and-trademark\">Content ownership, copyright and trademark</h2>\n<p>You are solely responsible for any content and other material that you submit, publish, transmit, email, or display on, through, or with the service.</p>\n<p>You may provide us with feedback, suggestions, and ideas about the service. You agree that we own all rights to use and incorporate the feedback you provide in any way, including in future enhancements and modifications to the service, without payment or attribution to you.</p>\n<p>You must not modify another website so as to falsely imply that it is associated with Progressively. The look and feel of the service is copyright© to Progressively. All rights reserved. “Progressively”, the Progressively logo and any other product or service name or slogan displayed on the service are trademarks of the company and may not be copied, imitated or used, in whole or in part, without the prior written permission of the company or the applicable trademark holder. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the service, use of the service, or access to the service without the express written permission by the company.</p>\n<h2 id=\"privacy-and-security-of-your-data\">Privacy and security of your data</h2>\n<p>Progressively will collect information about your visitors. You entrust us with your site data and we take that trust to heart. You agree that Progressively may process your users data anonymously to provide you with insights and dashboards.</p>\n<p>Each party agrees to handle the other party’s data in accordance with (i) all applicable laws; and (ii) privacy and security measures reasonably adequate to preserve the other party data’s confidentiality and security.</p>\n<p>We do not collect and analyze personal information from web users and we do not use behavioral insights to sell advertisements. The information that are collected and that can identify users are explicitly provided by you for the usage of some features. Progressively can’t be liable for the information YOU decided to store on the service.</p>\n<h2 id=\"general-conditions\">General conditions</h2>\n<p>Your use of Progressively is at your sole risk. The service is provided on an “as is” and “as available” basis.</p>\n<p>We design our services with care, based on our own experience and the experiences of customers who share their time and feedback. However, there is no such thing as a service that pleases everybody. We make no guarantees that our services will meet your specific requirements or expectations.</p>\n<p>We also test all of our features extensively before shipping them. As with any software, our services inevitably have some bugs. We track the bugs reported to us and work through priority ones, especially any related to security or privacy. Not all reported bugs will get fixed and we don’t guarantee completely error-free services.</p>\n<p>Technical support is provided by email or on the Github repository. Email responses are provided on the reasonable effort basis without guaranteed response time.</p>\n<p>We as humans can access your data to help you with support requests you make and to maintain and safeguard Progressively to ensure the security of your data and the service as a whole.</p>\n<p>We use third party vendors to provide the necessary hardware, storage, payment processing and related technology required to run the Services. You can see a list of all subprocessors here.</p>\n<h2 id=\"liability\">Liability</h2>\n<p>We mention liability throughout these Terms but to put it all in one section:</p>\n<p>You expressly understand and agree that Progressively shall not be liable, in law or in equity, to you or to any third party for any direct, indirect, incidental, lost profits, special, consequential, punitive or exemplary damages, including, but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses (even if the company has been advised of the possibility of such damages), resulting from: (i) the use or the inability to use the services; (ii) the cost of procurement of substitute goods and services resulting from any goods, data, information or services purchased or obtained or messages received or transactions entered into through or from the services; (iii) unauthorized access to or alteration of your transmissions or data; (iv) statements or conduct of any third party on the service; (v) or any other matter relating to this Terms of Service or the services, whether as a breach of contract, tort (including negligence whether active or passive), or any other theory of liability.</p>\n<p>In other words: choosing to use our services does mean you are making a bet on us. If the bet does not work out, that’s on you, not us. We do our darnedest to be as safe a bet as possible through careful management of the business; investments in security, infrastructure, and talent; and in general giving a damn. If you choose to use our services, thank you for betting on us.</p>\n<p>This agreement shall be governed by the laws of France, and the courts of France shall have exclusive jurisdiction to hear and determine all issues that may arise under or in relation to this agreement.</p>\n<h1 id=\"contact-us\">Contact us</h1>\n<p>If you have a question about any of the Terms of Service, please contact us at <a href=\"mailto:marvin.frachet@protonmail.com\">marvin.frachet@protonmail.com</a>.</p>");

				const frontmatter = {"layout":"../layouts/MarkdownLayout.astro","title":"Astro in brief"};
				const file = "/Users/marvin/soft/progressively/packages/website/src/pages/terms.md";
				const url = "/terms";
				function rawContent() {
					return "\n# Terms of Service\n\nEffective date: May 9, 2023\n\nWhen we say ”company”, “we”, “our”, “us”, ”service” or ”services” in this document, we are referring to Progressively.\n\nThe following Terms of Service apply to Progressively as a SaaS only and not to Progressively Self-Hosted which would be hosted on your own servers and therefore the Terms of Service are not applicable.\n\nWe may update these Terms of Service in the future. Whenever we make a significant change to these policies, we will also announce them on the website.\n\nWhen you use our service, now or in the future, you are agreeing to the latest Terms of Service. That’s true for any of our existing and future products and all features that we add to our service over time. There may be times where we do not exercise or enforce any right or provision of the Terms of Service; in doing so, we are not waiving that right or provision.\n\nIf you do not agree to these Terms of Service, do not use this service. Violation of any of the terms below may result in the termination of your account.\n\n## Account terms\n\nYou are responsible for maintaining the security of your account and password. Progressively cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.\n\nYou are responsible for any activity that occurs under your account (even by others who have their own logins under your account).\n\nYou may not use our service for any illegal purpose or to violate any laws in your jurisdiction.\n\nYou must provide a valid email address in order to complete the signup process.\n\nYou must be a human. Accounts registered by bots or other automated methods are not permitted.\n\n## Payment, refunds, upgrading and downgrading terms\n\nThe free trial is free and for a duration that is explicitly expressed in the pricing page. We do not ask credit card and do not sell this data. After the trial period, the paiement is due in advance. If you do not pay, your account will be suspended and the flag evaluations will be locked. Your account will be frozen for 60 days. After this period, the account will be deleted and the subscription cancelled.\n\nIf you are upgrading from a free trial to a paid plan, we will charge you immediately and your billing cycle starts on the day of upgrade.\n\nPaying customers are billed automatically via credit card.\n\nThe number of flag evaluations purchased in the paid plan must be used during the applicable term and any unused pageviews at the end of the term are forfeited.\n\nYour card will never be charged unexpectedly. In the event the usage of flag evaluations exceeds the paid plan, your flag will always be evaluated as deactivated. We will contact you to upgrade to a higher plan for the following month.\n\nYou can upgrade or downgrade in plan level at any time within your account settings. Downgrading your plan may cause the loss of features or capacity of your account. Progressively does not accept any liability for such loss.\n\nOur payment process is conducted by our payment processor Paddle. Paddle provides customer service inquiries and handles returns. All fees are inclusive of all taxes, levies, or duties imposed by taxing authorities. Paddle will collect those taxes on behalf of taxing authority and remit those taxes to taxing authorities. See Paddle’s Terms of Use for details.\n\nFees paid hereunder are non-refundable.\n\n## Cancellation and termination\n\nYou are solely responsible for properly canceling your account. An email to cancel your account is not considered cancellation. You can cancel your account on your profile page only.\n\nIf you cancel the service before the end of your current paid up period, all the information related to the projects you own will be immediately erased and unavailable. The money will not be refund and the subscription will stop at the end of the current cycle.\n\nYou can choose to delete your account and all your site stats at any time. All your stats will be permanently deleted immediately when you delete your Progressively account.\n\nWe reserve the right to suspend or terminate your account and refuse any and all current or future use of the service for any reason at any time. Such termination of the service will result in the deactivation or deletion of your account or your access to your account and site stats. Progressively reserves the right to refuse service to anyone for any reason at any time. We have this clause because statistically speaking, out of the thousands of sites on our service, there may be at least one doing something nefarious.\n\nVerbal, physical, written or other abuse (including threats of abuse or retribution) of any service customer, company employee or officer may result in immediate account termination.\n\n## Modifications to the service and prices\n\nWe reserve the right at any time and from time to time to modify or discontinue, temporarily or permanently, any part of the service with or without notice.\n\nSometimes we change the pricing structure for our products. If we do so, we will give at least 30 days notice and will notify you via the email address on record. We may also post a notice about changes on our blog or the affected services themselves.\n\nProgressively shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the service.\n\n## Content ownership, copyright and trademark\n\nYou are solely responsible for any content and other material that you submit, publish, transmit, email, or display on, through, or with the service.\n\nYou may provide us with feedback, suggestions, and ideas about the service. You agree that we own all rights to use and incorporate the feedback you provide in any way, including in future enhancements and modifications to the service, without payment or attribution to you.\n\nYou must not modify another website so as to falsely imply that it is associated with Progressively. The look and feel of the service is copyright© to Progressively. All rights reserved. “Progressively”, the Progressively logo and any other product or service name or slogan displayed on the service are trademarks of the company and may not be copied, imitated or used, in whole or in part, without the prior written permission of the company or the applicable trademark holder. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the service, use of the service, or access to the service without the express written permission by the company.\n\n## Privacy and security of your data\n\nProgressively will collect information about your visitors. You entrust us with your site data and we take that trust to heart. You agree that Progressively may process your users data anonymously to provide you with insights and dashboards.\n\nEach party agrees to handle the other party’s data in accordance with (i) all applicable laws; and (ii) privacy and security measures reasonably adequate to preserve the other party data’s confidentiality and security.\n\nWe do not collect and analyze personal information from web users and we do not use behavioral insights to sell advertisements. The information that are collected and that can identify users are explicitly provided by you for the usage of some features. Progressively can't be liable for the information YOU decided to store on the service.\n\n## General conditions\n\nYour use of Progressively is at your sole risk. The service is provided on an “as is” and “as available” basis.\n\nWe design our services with care, based on our own experience and the experiences of customers who share their time and feedback. However, there is no such thing as a service that pleases everybody. We make no guarantees that our services will meet your specific requirements or expectations.\n\nWe also test all of our features extensively before shipping them. As with any software, our services inevitably have some bugs. We track the bugs reported to us and work through priority ones, especially any related to security or privacy. Not all reported bugs will get fixed and we don’t guarantee completely error-free services.\n\nTechnical support is provided by email or on the Github repository. Email responses are provided on the reasonable effort basis without guaranteed response time.\n\nWe as humans can access your data to help you with support requests you make and to maintain and safeguard Progressively to ensure the security of your data and the service as a whole.\n\nWe use third party vendors to provide the necessary hardware, storage, payment processing and related technology required to run the Services. You can see a list of all subprocessors here.\n\n## Liability\n\nWe mention liability throughout these Terms but to put it all in one section:\n\nYou expressly understand and agree that Progressively shall not be liable, in law or in equity, to you or to any third party for any direct, indirect, incidental, lost profits, special, consequential, punitive or exemplary damages, including, but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses (even if the company has been advised of the possibility of such damages), resulting from: (i) the use or the inability to use the services; (ii) the cost of procurement of substitute goods and services resulting from any goods, data, information or services purchased or obtained or messages received or transactions entered into through or from the services; (iii) unauthorized access to or alteration of your transmissions or data; (iv) statements or conduct of any third party on the service; (v) or any other matter relating to this Terms of Service or the services, whether as a breach of contract, tort (including negligence whether active or passive), or any other theory of liability.\n\nIn other words: choosing to use our services does mean you are making a bet on us. If the bet does not work out, that’s on you, not us. We do our darnedest to be as safe a bet as possible through careful management of the business; investments in security, infrastructure, and talent; and in general giving a damn. If you choose to use our services, thank you for betting on us.\n\nThis agreement shall be governed by the laws of France, and the courts of France shall have exclusive jurisdiction to hear and determine all issues that may arise under or in relation to this agreement.\n\n# Contact us\n\nIf you have a question about any of the Terms of Service, please contact us at marvin.frachet@protonmail.com.\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"terms-of-service","text":"Terms of Service"},{"depth":2,"slug":"account-terms","text":"Account terms"},{"depth":2,"slug":"payment-refunds-upgrading-and-downgrading-terms","text":"Payment, refunds, upgrading and downgrading terms"},{"depth":2,"slug":"cancellation-and-termination","text":"Cancellation and termination"},{"depth":2,"slug":"modifications-to-the-service-and-prices","text":"Modifications to the service and prices"},{"depth":2,"slug":"content-ownership-copyright-and-trademark","text":"Content ownership, copyright and trademark"},{"depth":2,"slug":"privacy-and-security-of-your-data","text":"Privacy and security of your data"},{"depth":2,"slug":"general-conditions","text":"General conditions"},{"depth":2,"slug":"liability","text":"Liability"},{"depth":1,"slug":"contact-us","text":"Contact us"}];
				}
				async function Content() {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;
					const contentFragment = createVNode(Fragment, { 'set:html': html });
					return createVNode($$MarkdownLayout, {
									file,
									url,
									content,
									frontmatter: content,
									headings: getHeadings(),
									rawContent,
									compiledContent,
									'server:root': true,
									children: contentFragment
								});
				}
				Content[Symbol.for('astro.needsHeadRendering')] = false;

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content,
  compiledContent,
  default: Content,
  file,
  frontmatter,
  getHeadings,
  images,
  rawContent,
  url
}, Symbol.toStringTag, { value: 'Module' }));

// astro-head-inject

const contentDir = '/src/content/';

const entryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/is-gitflow-really-needed.md": () => import('../is-gitflow-really-needed.3773dceb.mjs')

});
const collectionToEntryMap = createCollectionToGlobResultMap({
	globResult: entryGlob,
	contentDir,
});

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/is-gitflow-really-needed.md": () => import('../is-gitflow-really-needed.9005bfc7.mjs')

});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	collectionToEntryMap,
	collectionToRenderEntryMap,
});

const getEntryBySlug = createGetEntryBySlug({
	getCollection,
	collectionToRenderEntryMap,
});

const $$Astro$1 = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index;
  const blogEntries = await getCollection("blog");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Progressively blog posts" }, { "default": ($$result2) => renderTemplate`
  ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate`
    ${maybeRenderHead($$result3)}<header class="pt-20 pb-8">
      <h1 class="text-5xl md:text-6xl font-extrabold">The blog</h1>
    </header>

    <main>
      <div class="pb-20 md:pb-40">
        <ul>
          ${blogEntries.map((blogPostEntry) => renderTemplate`<li>
                <a${addAttribute(`/blog/${blogPostEntry.slug}`, "href")} class="text-xl font-semibold underline">
                  ${blogPostEntry.data.title}
                </a>
                <time${addAttribute(blogPostEntry.data.publishedDate.toISOString(), "datetime")} class="text-sm text-slate-700 pl-4">
                  ${blogPostEntry.data.publishedDate.toDateString()}
                </time>
              </li>`)}
        </ul>
      </div>
    </main>
  ` })}
` })}`;
}, "/Users/marvin/soft/progressively/packages/website/src/pages/blog/index.astro");

const $$file$1 = "/Users/marvin/soft/progressively/packages/website/src/pages/blog/index.astro";
const $$url$1 = "/blog";

const _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { slug } = Astro2.params;
  if (slug === void 0) {
    throw new Error("Slug is required");
  }
  const entry = await getEntryBySlug("blog", slug);
  if (entry === void 0) {
    return Astro2.redirect("/404");
  }
  const { Content } = await entry.render();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${entry.data.title} - Progressively Blog` }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead($$result2)}<div class="bg-slate-50 pb-12">
    <div class="h-32"></div>

    <main class="w-full px-6 py-12 bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 md:max-w-3xl md:mx-auto lg:max-w-4xl lg:pt-16 lg:pb-28">
      <div class="max-w-prose mx-auto lg:text-lg prose prose-slate">
        <h1>
          ${entry.data.title}
        </h1>
        ${renderComponent($$result2, "Content", Content, {})}
      </div>
    </main>
  </div>
` })}`;
}, "/Users/marvin/soft/progressively/packages/website/src/pages/blog/[...slug].astro");

const $$file = "/Users/marvin/soft/progressively/packages/website/src/pages/blog/[...slug].astro";
const $$url = "/blog/[...slug]";

const _page7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page0 as _, _page1 as a, _page2 as b, _page3 as c, _page4 as d, _page5 as e, _page6 as f, _page7 as g };
