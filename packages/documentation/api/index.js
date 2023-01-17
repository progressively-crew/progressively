"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// node_modules/highlight.js/styles/github.css
var require_github = __commonJS({
  "node_modules/highlight.js/styles/github.css"(exports, module2) {
    module2.exports = "/build/_assets/github-4GP7WZX2.css";
  }
});

// node_modules/highlight.js/styles/github-dark.css
var require_github_dark = __commonJS({
  "node_modules/highlight.js/styles/github-dark.css"(exports, module2) {
    module2.exports = "/build/_assets/github-dark-HMWIS3P7.css";
  }
});

// server.js
var server_exports = {};
__export(server_exports, {
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_vercel = require("@remix-run/vercel");

// server-entry-module:@remix-run/dev/server-build
var server_build_exports = {};
__export(server_build_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_stream = require("stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_jsx_runtime = require("react/jsx-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return (0, import_isbot.default)(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let didError = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.RemixServer, { context: remixContext, url: request.url }),
      {
        onAllReady() {
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          didError = !0, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let didError = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.RemixServer, { context: remixContext, url: request.url }),
      {
        onShellReady() {
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(err) {
          reject(err);
        },
        onError(error) {
          didError = !0, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
var import_node3 = require("@remix-run/node"), import_react2 = require("@remix-run/react");

// app/styles/app.css
var app_default = "/build/_assets/app-HXXKBXOP.css";

// app/root.tsx
var import_react3 = require("@progressively/react"), import_server_side = require("@progressively/server-side");

// app/cookies.ts
var import_node2 = require("@remix-run/node"), progressivelyCookie = (0, import_node2.createCookie)("progressively-id", {
  maxAge: 31536e3
});

// app/root.tsx
var import_react4 = require("@prismicio/react");

// app/modules/prismic/client.ts
var prismic = __toESM(require("@prismicio/client")), repositoryName = "Progressively", client = prismic.createClient(repositoryName, {
  routes: []
});

// app/root.tsx
var import_jsx_runtime2 = require("react/jsx-runtime"), meta = () => ({
  charset: "utf-8",
  title: "Progressively, the simple and accessible feature flagging tool",
  viewport: "width=device-width,initial-scale=1"
});
function links() {
  return [{ rel: "stylesheet", href: app_default }];
}
var loader = async ({ request }) => {
  var _a, _b, _c, _d;
  if (!process.env.PROGRESSIVELY_ENV)
    return {
      progressivelyProps: void 0
    };
  let cookieHeader = request.headers.get("Cookie"), cookie = await progressivelyCookie.parse(cookieHeader) || {}, { data, response } = await (0, import_server_side.getProgressivelyData)(
    String(process.env.PROGRESSIVELY_ENV),
    {
      websocketUrl: "wss://backend-progressively.fly.dev",
      apiUrl: "https://backend-progressively.fly.dev",
      fields: {
        id: cookie["progressively-id"]
      }
    }
  ), cookieValue = (_d = (_c = (_b = (_a = response == null ? void 0 : response.headers.get("set-cookie")) == null ? void 0 : _a.split(";")) == null ? void 0 : _b.find((str) => str.includes("progressively-id"))) == null ? void 0 : _c.split("=")) == null ? void 0 : _d[1];
  return cookie["progressively-id"] = cookieValue, (0, import_node3.json)(
    {
      progressivelyProps: data
    },
    {
      headers: {
        "Set-Cookie": await progressivelyCookie.serialize(cookie)
      }
    }
  );
};
function App() {
  let { progressivelyProps } = (0, import_react2.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Meta, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Links, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("link", { rel: "shortcut icon", type: "image/jpg", href: "/favicon.png" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react4.PrismicProvider, { client, children: progressivelyProps ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react3.ProgressivelyProvider, { ...progressivelyProps, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Outlet, {}) }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Outlet, {}) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.ScrollRestoration, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Scripts, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.LiveReload, {})
    ] })
  ] });
}

// app/routes/demo-instance.tsx
var demo_instance_exports = {};
__export(demo_instance_exports, {
  default: () => Index,
  links: () => links2,
  meta: () => meta2
});

// app/styles/home.css
var home_default = "/build/_assets/home-UNCBUHJF.css";

// app/components/SiteNav.tsx
var import_react7 = require("@remix-run/react");

// app/components/HideMobile.tsx
var import_jsx_runtime3 = require("react/jsx-runtime"), HideDesktop = ({ as: Component = "span", ...props }) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Component, { className: "lg:hidden", ...props }), HideTablet = ({
  as: Component = "span",
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Component, { className: "hidden lg:block " + className, ...props });

// app/components/Logo.tsx
var import_jsx_runtime4 = require("react/jsx-runtime"), Logo = (props) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
  "svg",
  {
    viewBox: "0 0 32 32",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("rect", { width: "32", height: "32", rx: "4", fill: "#0f172a" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M14.0438 17.0394C13.9431 17.1056 13.8105 17.032 13.8105 16.91V8.26519C13.8105 8.14282 13.9439 8.06932 14.0445 8.13625L20.5795 12.4842C20.6711 12.5452 20.6708 12.6821 20.5788 12.7426L14.0438 17.0394ZM13.8105 27.0431V19.5533C13.8105 19.5009 13.8366 19.4521 13.8798 19.4238L22.832 13.5521C23.5214 13.0999 23.5214 12.0734 22.832 11.6213L14.6705 6.26815C14.5541 6.19184 14.5916 6.0119 14.7289 5.99437C15.1453 5.94125 15.5695 5.91387 16 5.91387C21.5894 5.91387 26.1206 10.5281 26.1206 16.2201C26.1206 19.6312 24.4943 22.6553 21.9841 24.5327C21.5658 24.8455 21.4757 25.4444 21.7829 25.8704C22.0902 26.2963 22.6783 26.388 23.0966 26.0752C26.0681 23.8527 28 20.2661 28 16.2201C28 9.47112 22.6274 4 16 4C9.37258 4 4 9.47112 4 16.2201C4 21.7021 7.54406 26.3388 12.4244 27.8882C12.433 27.891 12.4414 27.8945 12.4495 27.8986C12.5762 27.9635 12.7193 28 12.8708 28C12.9474 28 13.0219 27.9907 13.0932 27.973C13.2108 27.9468 13.3198 27.8957 13.4152 27.8232C13.6544 27.6497 13.8105 27.365 13.8105 27.0431ZM11.72 6.87815C11.8189 6.83108 11.9311 6.90543 11.9311 7.01662V18.5965V25.4239C11.9311 25.5351 11.8189 25.6094 11.72 25.5623C8.26928 23.9201 5.8794 20.3533 5.8794 16.2201C5.8794 12.0859 8.26983 8.52017 11.72 6.87815Z",
          fill: "white"
        }
      )
    ]
  }
);

// app/components/Nav/hooks/useNavToggle.ts
var import_react6 = require("react");

// app/components/Nav/context/NavContext.ts
var import_react5 = require("react"), NavContext = (0, import_react5.createContext)({
  toggleNav: () => {
  },
  isNavOpened: !1
});

// app/components/Nav/hooks/useNavToggle.ts
var useNavToggle = () => (0, import_react6.useContext)(NavContext);

// app/components/Nav/InertWhenNavOpened.tsx
var import_jsx_runtime5 = require("react/jsx-runtime"), InertWhenNavOpened = ({ children }) => {
  let { isNavOpened } = useNavToggle();
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { "aria-hidden": isNavOpened, children });
};

// app/components/SiteNav.tsx
var import_jsx_runtime6 = require("react/jsx-runtime"), NavLink = ({
  children,
  to,
  href
}) => {
  let className = "no-underline font-semibold hover:underline text-gray-800 active:text-gray-600 dark:text-slate-200 active:dark:text-slate-50";
  return href ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    "a",
    {
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      className,
      children
    }
  ) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react7.Link, { to, className, children });
}, SiteNav = ({ navToggleSlot }) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(InertWhenNavOpened, { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("nav", { className: "h-14 border-b border-b-gray-100 px-4 md:px-12 bg-white dark:bg-slate-800 dark:border-b-slate-700", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "max-w-screen-2xl mx-auto h-full", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-row items-center h-full justify-between", children: [
  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(HideTablet, { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react7.Link, { to: "/", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Logo, { "aria-label": "Progressively", className: "h-8 w-8" }) }) }),
    navToggleSlot
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("ul", { className: "flex flex-row gap-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(NavLink, { to: "/docs/introduction/why", children: "Documentation" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("li", { className: "hidden md:block", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(NavLink, { to: "/demo-instance", children: "Demo instance" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(NavLink, { href: "https://github.com/progressively-crew/progressively", children: "Github" }) })
  ] })
] }) }) }) });

// app/components/Button.tsx
var import_react8 = require("@remix-run/react"), import_jsx_runtime7 = require("react/jsx-runtime"), classCombination = {
  defaultprimary: "bg-indigo-700 text-white hover:bg-indigo-500 active:bg-indigo-600",
  defaultsecondary: "bg-indigo-100 text-indigo-700 text-indigo-700 hover:bg-indigo-50 active:bg-indigo-100",
  defaulttertiary: "text-indigo-700 hover:bg-gray-50 active:bg-gray-100",
  dangerprimary: "bg-red-700 text-white hover:bg-red-500 active:bg-red-600",
  dangersecondary: "bg-red-100 text-red-700 text-red-700 hover:bg-red-50 active:bg-red-100",
  dangertertiary: "text-red-700"
}, Button = ({
  to,
  href,
  children,
  type,
  icon,
  isLoading,
  loadingText,
  scheme,
  variant,
  className,
  ...props
}) => {
  let sharedButtonClass = "block rounded flex items-center h-10 px-4 whitespace-nowrap", combinedClassName = classCombination[(scheme || "default") + (variant || "primary")];
  if (to || href) {
    let linkProps = props;
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      href ? "a" : import_react8.Link,
      {
        to: href ? void 0 : to,
        href,
        className: sharedButtonClass + " " + combinedClassName + " " + className,
        ...linkProps,
        children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: "flex flex-row gap-3 items-center", children: [
          icon,
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children })
        ] })
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    "button",
    {
      type,
      className: sharedButtonClass + " " + combinedClassName + " " + className,
      ...props,
      "aria-disabled": isLoading,
      "aria-label": isLoading ? loadingText : void 0,
      children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: "flex flex-row gap-3 items-center", children: [
        icon,
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: icon ? "text" : void 0, children })
      ] })
    }
  );
};

// app/routes/demo-instance.tsx
var import_jsx_runtime8 = require("react/jsx-runtime"), title = "Progressively, simple and accessible feature flagging tool", description = "A simple, accessible, lightweight, self-hosted and OpenSource feature flagging tool. Rollout easily and with confidence. Supports frameworks with SSR capabilities.", meta2 = () => ({
  title,
  description,
  "og:url": "https://progressively.app",
  "og:title": title,
  "og:description": description,
  "og:image": "https://progressively.app/logo.jpg",
  "og:type": "website",
  "og:site_name": "Progressively",
  "twitter:card": "summary_large_image",
  "twitter:creator": "@mfrachet",
  "twitter:site": "@mfrachet"
}), links2 = () => [
  {
    rel: "canonical",
    href: "https://progressively.app"
  },
  { rel: "stylesheet", href: home_default }
];
function Index() {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "bg-gray-50 dark:bg-slate-900", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SiteNav, {}),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("main", { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "max-w-screen-xl mx-auto px-4 md:px-0 py-12 md:py-32 w-full", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "md:pb-8", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Logo, { className: "h-16 w-16" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("h1", { className: "text-black text-3xl dark:text-white font-extrabold sm:text-5xl p-1 motion-safe:animate-fade-enter-top", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "sm:block dark:text-indigo-400 text-indigo-700", children: [
          "Progressively",
          " "
        ] }),
        "Demo instance"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
        "div",
        {
          className: "motion-safe:animate-fade-enter-bottom motion-safe:opacity-0",
          style: {
            animationDelay: "500ms"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("p", { className: "mt-4 max-w-xl sm:text-xl sm:leading-relaxed text-gray-600 dark:text-slate-200", children: [
              "You are about to enter the demo instance of Progressively. Make sure to not use it as a production ready instance:",
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("br", {}),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("strong", { children: "data will be erased regularly" }),
              "."
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "inline-block pt-8", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Button, { href: "https://progressively.vercel.app/signin", children: "Enter the demo instance" }) })
          ]
        }
      )
    ] }) }) })
  ] });
}

// app/routes/recipes/$id.tsx
var id_exports = {};
__export(id_exports, {
  default: () => RecipePost,
  links: () => links3,
  loader: () => loader2
});
var import_node4 = require("@remix-run/node"), import_helpers = require("@prismicio/helpers"), import_gi = require("react-icons/gi");
var import_react10 = require("@remix-run/react");

// app/components/Title.tsx
var import_jsx_runtime9 = require("react/jsx-runtime"), Title = ({ value }) => {
  var _a;
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h1", { className: "font-bold leading-tight text-5xl max-w-screen-md", children: (_a = value[0]) == null ? void 0 : _a.text });
};

// app/routes/recipes/$id.tsx
var import_highlight = __toESM(require("highlight.js")), import_react11 = require("react");

// app/components/Background.tsx
var import_jsx_runtime10 = require("react/jsx-runtime"), Background = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "min-h-full bg-gray-50 dark:bg-slate-900 h-full", children });

// app/components/SimpleCard.tsx
var import_jsx_runtime11 = require("react/jsx-runtime"), SimpleCard = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "border border-gray-200 rounded bg-white", children }), CardContent = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "p-8", children });

// app/components/Nav/providers/NavProvider.tsx
var import_react9 = require("react");
var import_jsx_runtime12 = require("react/jsx-runtime"), NavProvider = ({ children }) => {
  let [isNavOpened, setIsNavOpened] = (0, import_react9.useState)(!1), toggleNav = (0, import_react9.useCallback)(() => {
    setIsNavOpened((s) => !s);
  }, [setIsNavOpened]);
  return (0, import_react9.useEffect)(() => {
    isNavOpened ? document.body.classList.add("overflow-hidden") : document.body.classList.remove("overflow-hidden");
  }, [isNavOpened]), /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(NavContext.Provider, { value: { isNavOpened, toggleNav }, children });
};

// app/routes/recipes/$id.tsx
var import_github = __toESM(require_github());

// app/styles/shared.css
var shared_default = "/build/_assets/shared-PDZZSE75.css";

// app/routes/recipes/$id.tsx
var import_jsx_runtime13 = require("react/jsx-runtime"), links3 = () => [
  {
    rel: "stylesheet",
    href: import_github.default
  },
  {
    rel: "stylesheet",
    href: shared_default
  }
], loader2 = async ({
  params
}) => {
  try {
    let pageData = await client.getByUID("recipe_post", params.id), headerIndex = 0, htmlSerializer = (type, element, text, children) => {
      if (type === "preformatted")
        return `<pre><code class="${children[0] === "$" ? "hljs language-shell" : "hljs language-ts"}">${children}</code></pre>`;
      let nextId = "";
      return type.includes("heading") && (nextId = `heading-${headerIndex}`, headerIndex += 1), type === "heading2" ? `<h2 id="${nextId}">${children}</h2>` : type === "heading3" ? `<h3 id="${nextId}">${children}</h3>` : type === "heading4" ? `<h4 id="${nextId}">${children}</h4>` : type === "heading5" ? `<h5 id="${nextId}">${children}</h5>` : type === "heading6" ? `<h6 id="${nextId}">${children}</h6>` : null;
    }, html = (0, import_helpers.asHTML)(pageData.data.content, null, htmlSerializer), ingredients = pageData.data.ingredients.map(
      (ing) => (0, import_helpers.asHTML)(ing == null ? void 0 : ing.name, null, htmlSerializer)
    );
    return pageData.data.ingredients = [], pageData.data.content = [], {
      pageData,
      html,
      ingredients
    };
  } catch {
    throw (0, import_node4.redirect)("/404");
  }
};
function RecipePost() {
  var _a, _b;
  let { pageData, html, ingredients } = (0, import_react10.useLoaderData)();
  (0, import_react11.useEffect)(() => {
    import_highlight.default.addPlugin({
      "before:highlightElement": ({ el }) => {
        el.textContent = el.innerText;
      }
    }), import_highlight.default.highlightAll();
  }, []);
  let imgUrl = (_a = pageData.data.cover) == null ? void 0 : _a.url;
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(NavProvider, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(SiteNav, {}),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(InertWhenNavOpened, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Background, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "py-4 xl:py-12 max-w-screen-2xl mx-auto px-4 xl:px-12", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "pb-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "inline-block", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("p", { className: "flex flex-row gap-2 bg-indigo-100 text-indigo-700 rounded-full px-4 py-2 items-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_gi.GiCook, { "aria-hidden": !0 }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { children: "Recipe" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Title, { value: pageData.data.title })
      ] }),
      imgUrl && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
        "img",
        {
          src: imgUrl,
          alt: (_b = pageData.data.title[0]) == null ? void 0 : _b.text,
          className: "mt-0 object-cover",
          height: "400px"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "lg:grid lg:grid-cols-[360px_1fr] xl:grid-cols-[360px_1fr_360px] gap-8 items-start pt-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "xl:sticky top-8", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(SimpleCard, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("aside", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h2", { className: "font-semibold", children: "Ingredients" }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("ul", { className: "list-disc list-inside pt-4", children: ingredients.map((ing) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              "li",
              {
                className: "text-sm py-1",
                dangerouslySetInnerHTML: { __html: ing }
              },
              ing
            )) })
          ] }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "h-8" }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(SimpleCard, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("aside", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h2", { className: "font-semibold", children: "Directions" }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("ul", { className: "pt-4", children: pageData.data.directions.map((ing, index) => {
              var _a2, _b2;
              return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("li", { className: "text-sm py-1", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_react10.Link, { to: `#heading-${index}`, children: (_b2 = ing.name[0]) == null ? void 0 : _b2.text }) }, (_a2 = ing.name[0]) == null ? void 0 : _a2.text);
            }) })
          ] }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "h-8 xl:h-0" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("main", { className: "prose xl:prose-x overflow-hidden max-w-none", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { dangerouslySetInnerHTML: { __html: html } }) }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "hidden xl:block xl:sticky top-8", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(SimpleCard, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("aside", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h2", { className: "font-semibold", children: "Useful links" }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("ul", { className: "pt-4", children: pageData.data.links.map((link) => {
            var _a2;
            return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("li", { className: "text-sm py-1", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
              "a",
              {
                href: link.href || "/",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex flex-row gap-2 items-center",
                children: [
                  ((_a2 = link == null ? void 0 : link.icon) == null ? void 0 : _a2.url) && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("img", { src: link.icon.url, alt: "" }),
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { children: link.children })
                ]
              }
            ) }, link.href);
          }) })
        ] }) }) }) })
      ] })
    ] }) }) })
  ] });
}

// app/routes/blog/index.tsx
var blog_exports = {};
__export(blog_exports, {
  default: () => BlogHome,
  links: () => links4,
  loader: () => loader3
});
var import_github2 = __toESM(require_github());
var import_react12 = require("@remix-run/react");
var import_jsx_runtime14 = require("react/jsx-runtime"), links4 = () => [
  {
    rel: "stylesheet",
    href: import_github2.default
  },
  {
    rel: "stylesheet",
    href: shared_default
  }
], loader3 = async () => {
  let rawRecipes = await client.getAllByType("recipe_post"), rawPosts = await client.getAllByType("blog_post"), recipes = rawRecipes.map((recipe) => {
    var _a;
    return {
      link: `/recipes/${recipe.uid}`,
      title: ((_a = recipe.data.title[0]) == null ? void 0 : _a.text) || "",
      image: recipe.data.cover.url || "",
      time: String(recipe.data.publishedat)
    };
  }), posts = rawPosts.map((post) => {
    var _a;
    return {
      link: `/blog/${post.uid}`,
      title: ((_a = post.data.title[0]) == null ? void 0 : _a.text) || "",
      image: post.data.cover.url || "",
      time: String(post.data.publishedat)
    };
  });
  return {
    recipes,
    posts
  };
};
function BlogHome() {
  let { recipes, posts } = (0, import_react12.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Background, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(NavProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SiteNav, {}),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(InertWhenNavOpened, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("main", { className: "p-4 xl:p-12", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h1", { className: "font-bold leading-tight text-5xl max-w-screen-md pb-12", children: "Blog" }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "grid lg:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("section", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h2", { className: "font-semibold text-3xl leading-normal", children: "Posts" }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("ul", { className: "pt-4", children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
            "li",
            {
              className: "flex flex-row gap-4 items-center",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  "img",
                  {
                    src: post.image,
                    alt: "",
                    className: "object-cover",
                    width: "150px",
                    height: "70px",
                    style: {
                      height: 70
                    }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "leading-relaxed", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_react12.Link, { to: post.link, children: post.title }),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "text-gray-600 text-sm", children: [
                    "Published the",
                    " ",
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("time", { dateTime: post.time, children: post.time })
                  ] })
                ] })
              ]
            },
            post.link
          )) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("section", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h2", { className: "font-semibold text-3xl leading-normal", children: "Recipes" }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("ul", { className: "pt-4", children: recipes.map((recipe) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
            "li",
            {
              className: "flex flex-row gap-4 items-center",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  "img",
                  {
                    src: recipe.image,
                    alt: "",
                    className: "object-cover",
                    width: "150px",
                    height: "70px",
                    style: {
                      height: 70
                    }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "leading-relaxed", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_react12.Link, { to: recipe.link, children: recipe.title }),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "text-gray-600 text-sm", children: [
                    "Published the",
                    " ",
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("time", { dateTime: recipe.time, children: recipe.time })
                  ] })
                ] })
              ]
            },
            recipe.link
          )) })
        ] })
      ] })
    ] }) }) })
  ] }) }) });
}

// app/routes/blog/$id.tsx
var id_exports2 = {};
__export(id_exports2, {
  default: () => BlogPostLayout,
  links: () => links5
});
var import_react13 = require("@remix-run/react");
var import_github3 = __toESM(require_github());
var import_jsx_runtime15 = require("react/jsx-runtime"), links5 = () => [
  {
    rel: "stylesheet",
    href: import_github3.default
  },
  {
    rel: "stylesheet",
    href: shared_default
  }
];
function BlogPostLayout() {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Background, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(NavProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(SiteNav, {}),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(InertWhenNavOpened, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "py-4 xl:py-12 px-4 xl:px-12", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("main", { className: "prose lg:prose-x mx-auto", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_react13.Outlet, {}) }) }) })
  ] }) }) });
}

// app/routes/blog/$id/index.tsx
var id_exports3 = {};
__export(id_exports3, {
  default: () => BlogPost,
  loader: () => loader4
});
var import_node5 = require("@remix-run/node"), import_helpers2 = require("@prismicio/helpers");
var import_react14 = require("@remix-run/react");
var import_highlight2 = __toESM(require("highlight.js")), import_react15 = require("react"), import_jsx_runtime16 = require("react/jsx-runtime"), loader4 = async ({
  params
}) => {
  try {
    let pageData = await client.getByUID("blog_post", params.id), htmlSerializer = (type, element, text, children) => type === "preformatted" ? `<pre><code class="${children[0] === "$" ? "hljs language-shell" : "hljs language-ts"}">${children}</code></pre>` : null, html = (0, import_helpers2.asHTML)(pageData.data.content, null, htmlSerializer);
    return pageData.data.content = [], {
      pageData,
      html
    };
  } catch {
    throw (0, import_node5.redirect)("/404");
  }
};
function BlogPost() {
  var _a, _b;
  let { pageData, html } = (0, import_react14.useLoaderData)();
  (0, import_react15.useEffect)(() => {
    import_highlight2.default.addPlugin({
      "before:highlightElement": ({ el }) => {
        el.textContent = el.innerText;
      }
    }), import_highlight2.default.highlightAll();
  }, []);
  let imgUrl = (_a = pageData.data.cover) == null ? void 0 : _a.url;
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Title, { value: pageData.data.title }),
    imgUrl && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      "img",
      {
        src: imgUrl,
        alt: (_b = pageData.data.title[0]) == null ? void 0 : _b.text,
        className: "mt-0 object-cover",
        height: "400px"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { dangerouslySetInnerHTML: { __html: html } })
  ] });
}

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index2,
  links: () => links6,
  loader: () => loader5,
  meta: () => meta3
});

// app/components/Features.tsx
var import_bs = require("react-icons/bs"), import_md = require("react-icons/md"), import_tb = require("react-icons/tb"), import_ai = require("react-icons/ai");

// app/components/Card.tsx
var import_react16 = require("react"), import_jsx_runtime17 = require("react/jsx-runtime"), WrapperStyles = {
  M: ""
}, TitleStyles = {
  M: "text-3xl"
}, ContentStyles = {
  M: "text-md"
}, Card = ({
  title: title3,
  children,
  size = "M",
  top,
  bottom
}) => {
  let id = (0, import_react16.useId)(), titleStyles = TitleStyles[size], wrapperStyles = WrapperStyles[size], contentStyles = ContentStyles[size];
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
    "article",
    {
      "aria-labelledby": id,
      className: "bg-white dark:bg-slate-800 rounded-xl px-4 py-16 h-full relative drop-shadow-lg overflow-hidden flex flex-col justify-center  " + wrapperStyles,
      children: [
        top && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "pb-4 dark:text-slate-100", children: top }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          "h3",
          {
            className: "font-bold text-center dark:text-slate-100 " + titleStyles,
            id,
            children: title3
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          "div",
          {
            className: "text-center pt-2 text-gray-600 dark:text-slate-200 " + contentStyles,
            children
          }
        ),
        bottom && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "pt-4", children: bottom })
      ]
    }
  );
};

// app/components/VisuallyHidden.tsx
var import_jsx_runtime18 = require("react/jsx-runtime"), vhStyles = {
  border: "0px",
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: "0px",
  position: "absolute",
  width: "1px"
}, VisuallyHidden = ({ children, id }) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { style: vhStyles, id, children });

// app/components/Features.tsx
var import_jsx_runtime19 = require("react/jsx-runtime"), Features = () => /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("section", { children: [
  /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("h2", { className: "text-center text-3xl md:text-6xl font-bold dark:text-white", children: "Operate" }),
  /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "grid px-4 lg:px-0 lg:grid-cols-4 gap-6 pt-12", children: [
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
      Card,
      {
        title: "Scheduling",
        bottom: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "flex justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "inline-block", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("p", { className: "bg-gray-900 dark:bg-slate-900 text-white p-2 rounded-3xl flex flex-row gap-4 text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_bs.BsClockHistory, { className: "text-lg", "aria-hidden": !0 }),
          /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("span", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(VisuallyHidden, { children: "Example:" }),
            " Flag activated at 9am tomorrow"
          ] })
        ] }) }) }),
        children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("p", { children: "Activate or deactivate your flags at any given time" })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
      Card,
      {
        title: "Single & Multi variants",
        top: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "flex gap-6 text-4xl justify-center", "aria-hidden": !0, children: [
          /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_ai.AiOutlineAppstore, {}),
          /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_ai.AiOutlineBarChart, {}),
          /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_md.MdBubbleChart, {})
        ] }),
        children: "Create single or multi-variants, monitor their evaluations and add custom metrics to analyze conversion"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
      Card,
      {
        title: "Audience Eligibility",
        top: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "flex justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_tb.TbChartPie, { "aria-hidden": !0, className: "text-4xl" }) }),
        children: "Rollout to only specific subsets of your audience based on qualitative criteria"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
      Card,
      {
        title: "Gradual rollout",
        bottom: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "flex justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
          "input",
          {
            type: "range",
            "aria-label": "Percentage of the audience",
            onChange: (e) => {
            },
            value: 67
          }
        ) }),
        children: "Target a percentage of your audience when deploying"
      }
    )
  ] })
] });

// app/components/Hero.tsx
var import_react18 = require("@progressively/react");

// app/components/Example.tsx
var import_react17 = require("react"), import_tb2 = require("react-icons/tb");

// app/components/Window.tsx
var import_jsx_runtime20 = require("react/jsx-runtime"), CliBar = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "flex-1 text-center text-sm dark:text-slate-900", children }), EditorBar = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "flex-1 text-sm h-full ml-16", "aria-hidden": !0, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "border-l border-r border-t border-gray-900 dark:border-gray-100 border-t-pink-500 h-full inline-flex items-center px-4 text-white dark:text-slate-900", children }) }), SearchBar = ({
  children,
  dark
}) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "flex items-center justify-center flex-1", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
  "div",
  {
    className: "text-xs bg-gray-100 rounded-md px-10 py-1 " + (dark ? "text-white bg-slate-700 dark:text-slate-900 dark:bg-slate-100" : ""),
    children
  }
) }), Window = ({ children, header, inverse }) => {
  let wrapperStyle = inverse ? "bg-slate-900 text-white dark:bg-white" : "bg-white", headerStyle = inverse ? "border-b-gray-900 dark:border-b-gray-100" : "border-b-gray-100";
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
    "div",
    {
      className: "rounded-2xl drop-shadow-lg overflow-hidden " + wrapperStyle,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
          "div",
          {
            className: "flex flex-row items-center h-12 px-4 gap-4 border-b " + headerStyle,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "flex flex-row gap-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "bg-red-500 w-3 h-3 rounded-full" }),
                /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "bg-yellow-500 w-3 h-3 rounded-full" }),
                /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "bg-green-500 w-3 h-3 rounded-full" })
              ] }),
              header && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "flex-1 flex items-center -ml-16 h-full", children: header })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "overflow-x-auto", tabIndex: inverse ? 0 : -1, children })
      ]
    }
  );
};

// app/components/Example.tsx
var import_jsx_runtime21 = require("react/jsx-runtime"), BrowserExample = ({ transitioning }) => {
  let assetStyles = transitioning ? "bg-indigo-700 flex-1" : "bg-gray-200 flex-[2_2_0%]", firstLineStyles = transitioning ? " w-1/2 h-4 bg-gray-700 mb-2" : " w-1/2 h-2 bg-gray-200", buttonStyle = transitioning ? "w-6 bg-pink-300" : "w-0 bg-pink-100";
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { "aria-hidden": !0, children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Window, { header: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(SearchBar, { children: "/" }), children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { className: "p-2", children: /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "transition-all flex flex-row gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
      "div",
      {
        className: "rounded-md transition-all h-20 flex justify-center items-center text-3xl text-white " + assetStyles,
        children: transitioning ? /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_tb2.TbPlayerPlay, {}) : null
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
      "div",
      {
        className: "transition-all flex gap-1 flex-col justify-center flex-[2_2_0%]",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
            "div",
            {
              className: "transition-all rounded-full " + firstLineStyles
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
            "div",
            {
              className: "transition-all rounded-full w-full h-2 bg-gray-200"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
            "div",
            {
              className: "transition-all rounded-full w-3/4 h-2 bg-gray-200"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { className: "h-2 rounded-full h-2 mt-2 " + buttonStyle })
        ]
      }
    )
  ] }) }) }) });
}, BROWSER_COUNT = 4, Example = () => {
  let [percentage, setPercentage] = (0, import_react17.useState)(0), browsers = Array(BROWSER_COUNT).fill(null), base6 = percentage / 100 * BROWSER_COUNT;
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "hidden md:block", children: [
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { className: "py-6 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "bg-gray-100 dark:bg-slate-800 pl-10 pr-3 py-3 rounded-full flex flex-row gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
        "input",
        {
          type: "range",
          "aria-label": "Percentage of the audience",
          onChange: (e) => setPercentage(Number(e.target.value)),
          value: percentage
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "px-3 py-2 w-16 bg-indigo-700 text-white text-sm font-bold rounded-full text-center", children: [
        percentage,
        "%"
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { className: "grid md:grid-cols-2 gap-6", children: browsers.map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
      BrowserExample,
      {
        transitioning: index + 1 <= base6
      },
      `browser-${index}`
    )) })
  ] });
};

// app/components/Hero.tsx
var import_jsx_runtime22 = require("react/jsx-runtime"), Catchphrase = () => {
  let { flags } = (0, import_react18.useFlags)();
  return flags.newHero === "A" ? /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("p", { className: "mt-4 max-w-xl sm:text-xl sm:leading-relaxed text-gray-600 dark:text-slate-200", children: [
    "The self-hosted and OpenSource ",
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("strong", { children: "feature flagging tool" }),
    "."
  ] }) : flags.newHero === "B" ? /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("p", { className: "mt-4 max-w-xl sm:text-xl sm:leading-relaxed text-gray-600 dark:text-slate-200", children: [
    "The ",
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("strong", { children: "feature flagging tool" }),
    " that does not skill your websites performances."
  ] }) : flags.newHero === "C" ? /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("p", { className: "mt-4 max-w-xl sm:text-xl sm:leading-relaxed text-gray-600 dark:text-slate-200", children: [
    "The next generation ",
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("strong", { children: "feature flagging tool" }),
    "."
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("p", { className: "mt-4 max-w-xl sm:text-xl sm:leading-relaxed text-gray-600 dark:text-slate-200", children: [
    "A simple, accessible, lightweight, self-hosted and OpenSource",
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("strong", { children: "feature flagging tool" }),
    "."
  ] });
}, Hero = () => {
  let { track, flags } = (0, import_react18.useFlags)();
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "max-w-screen-xl mx-auto px-4 md:px-0 py-12 md:py-32 w-full grid md:grid-cols-[3fr_2fr] gap-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "md:pb-8", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Logo, { className: "h-16 w-16" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("h1", { className: "text-black text-3xl dark:text-white font-extrabold sm:text-5xl p-1 motion-safe:animate-fade-enter-top", children: [
        "Rollout quickly, effectively,",
        /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("span", { className: "sm:block dark:text-indigo-400 text-indigo-700", children: [
          " ",
          "Progressively.",
          " "
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
        "div",
        {
          className: "motion-safe:animate-fade-enter-bottom motion-safe:opacity-0",
          style: {
            animationDelay: "500ms"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Catchphrase, {}),
            /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "mt-8 flex flex-wrap gap-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
                Button,
                {
                  to: "/docs/introduction/getting-started",
                  onClick: () => {
                    track(`Get started ${flags.newHero}`, {});
                  },
                  children: "Get Started"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Button, { variant: "secondary", to: "/demo-instance", children: "Demo instance" })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Example, {})
  ] });
};

// app/components/WeightComparator.tsx
var import_react19 = __toESM(require("react")), import_md2 = require("react-icons/md");
var import_jsx_runtime23 = require("react/jsx-runtime"), toolSizes = [
  {
    name: "Progressively",
    weight: 1300
  },
  {
    name: "Growthbook",
    weight: 3800
  },
  {
    name: "Unleash (React)",
    weight: 11e3
  },
  {
    name: "Launchdarkly",
    weight: 21e3
  },
  {
    name: "Flagship.io",
    weight: 46e3
  }
], Maxima = 46e3, DownloadSpeed = {
  THREE_G: 400 / 8,
  FOUR_G: 7e3 / 8,
  DESKTOP: 4e4 / 8
}, getTimeFromSize = (sizeInBytes) => ({
  threeG: sizeInBytes / 1024 / DownloadSpeed.THREE_G,
  fourG: sizeInBytes / 1024 / DownloadSpeed.FOUR_G,
  desktop: sizeInBytes / 1024 / DownloadSpeed.DESKTOP
}), formatTime = (value) => {
  let unit, size;
  return value < 5e-4 ? (unit = "\u03BCs", size = Math.round(value * 1e6)) : value < 0.5 ? (unit = "ms", size = Math.round(value * 1e3)) : (unit = "s", size = value.toFixed(2)), { unit, size };
}, PerfGrid = () => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "grid md:grid-cols-[140px_1fr_auto] md:gap-x-4 gap-y-2 items-center", children: toolSizes.map((toolSize) => {
  let percentageSize = toolSize.weight / Maxima * 100, color = toolSize.name === "Progressively" ? "bg-indigo-500" : "bg-gray-300 dark:bg-slate-600", size = getTimeFromSize(toolSize.weight), threeG = formatTime(size.threeG), fourG = formatTime(size.fourG), desktop = formatTime(size.desktop);
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(import_react19.default.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("h3", { className: "font-semibold flex flex-row items-center md:justify-end pt-4 md:pt-0 dark:text-slate-200", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { children: toolSize.name }) }),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "border border-gray-300 dark:border-slate-600 rounded p-1 pr-4 drop-shadow-md", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex flex-row gap-4 items-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
        "div",
        {
          className: "h-8 rounded-sm " + color,
          style: { width: `${percentageSize}%` }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex shrink-0 flex-row gap-4 dark:text-slate-200", children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(VisuallyHidden, { children: `Size of ${toolSize.name}: ${toolSize.weight / 1e3}kB` }),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("span", { "aria-hidden": !0, children: [
          toolSize.weight / 1e3,
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "text-gray-700 dark:text-slate-400 text-xs", children: "kB" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex flex-row md:grid md:grid-cols-2 gap-4 items-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("span", { className: "flex flex-row gap-1 items-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_md2.Md3GMobiledata, { "aria-hidden": !0, className: "text-indigo-700" }),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(VisuallyHidden, { children: `Time to download ${toolSize.name} on 3G: ${threeG.size}
                  ${threeG.unit}` }),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("span", { className: "text-sm dark:text-slate-200", "aria-hidden": !0, children: [
          threeG.size,
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "text-gray-700 text-xs dark:text-slate-400", children: threeG.unit })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("span", { className: "flex flex-row gap-1 items-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_md2.Md4GMobiledata, { "aria-hidden": !0, className: "text-indigo-700" }),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(VisuallyHidden, { children: `Time to download ${toolSize.name} on 3G: ${fourG.size}
                  ${fourG.unit}` }),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("span", { className: "text-sm dark:text-slate-200", "aria-hidden": !0, children: [
          fourG.size,
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "text-gray-700 dark:text-slate-400 text-xs", children: fourG.unit })
        ] })
      ] })
    ] })
  ] }, toolSize.name);
}) }), WeightComparator = () => /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("section", { children: [
  /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("h2", { className: "text-center text-3xl md:text-6xl font-bold dark:text-white", children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "text-indigo-700 dark:text-indigo-400", children: "Performance" }),
    " ",
    "difference"
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("figure", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("blockquote", { cite: "https://www.thinkwithgoogle.com/intl/en-ca/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("p", { className: "text-center text-gray-700 dark:text-slate-200 p-4 md:px-16 md:text-xl lg:text-2xl before:content-['\\201C'] after:content-['\\201D']", children: [
      "As page load time goes from ",
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("strong", { children: "one second" }),
      " to",
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("strong", { children: "seven seconds" }),
      ", the probability of a mobile site visitor ",
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("strong", { children: "bouncing increases 113%" }),
      "."
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("figcaption", { className: "text-center dark:text-slate-200", children: [
      "\u2014",
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
        "a",
        {
          href: "https://www.thinkwithgoogle.com/intl/en-ca/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "underline",
          children: "ThinkwithGoogle"
        }
      )
    ] })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "max-w-screen-xl mx-auto pt-4 md:pt-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(PerfGrid, {}),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "pt-6", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("p", { className: "text-center text-gray-700 text-xs dark:text-slate-200", children: [
      "Approximative numbers from the",
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
        "a",
        {
          href: "https://github.com/progressively-crew/progressively/tree/master/example/bundle-diffs",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "underline",
          children: [
            "Bundle diff example Nextjs project",
            " "
          ]
        }
      )
    ] }) })
  ] })
] });

// app/routes/index.tsx
var import_github_dark = __toESM(require_github_dark()), import_github4 = __toESM(require_github());

// app/modules/getstarted/Installation.tsx
var import_bs2 = require("react-icons/bs"), import_tb3 = require("react-icons/tb");

// app/components/Highlighter.tsx
var import_react20 = require("react"), import_highlight3 = __toESM(require("highlight.js")), import_jsx_runtime24 = require("react/jsx-runtime");
function Highlighter({
  content,
  language
}) {
  let [html, setHtml] = (0, import_react20.useState)("");
  return (0, import_react20.useEffect)(() => {
    let highlighted = language ? import_highlight3.default.highlight(language, content) : import_highlight3.default.highlightAuto(content);
    setHtml(highlighted.value);
  }, [language, content]), /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("pre", { className: "hljs text-xs leading-6 !bg-slate-900 dark:!bg-white", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("code", { dangerouslySetInnerHTML: { __html: html } }) });
}

// app/modules/getstarted/Installation.tsx
var import_jsx_runtime25 = require("react/jsx-runtime"), Installation = () => /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex flex-col justify-center", children: [
  /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "bg-gray-100 border border-gray-200 text-3xl text-gray-500 rounded-lg inline-block p-2 dark:text-slate-300 dark:bg-slate-800 dark:border-slate-700", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_tb3.TbServer2, {}) }) }),
  /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("h3", { className: "font-bold pt-2 text-xl dark:text-slate-100", children: "Create your own instance" }),
  /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("p", { className: "pt-1 md:pt-2 text-gray-700 dark:text-slate-200", children: "Progressively is a self-hosted feature flagging tool. With the following commands, you will create a running instance of Progressively that you can interact with. Host it on your server, own your data." }),
  /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "pt-4 inline-block", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
    Button,
    {
      variant: "secondary",
      to: "/docs/introduction/getting-started",
      icon: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
        import_bs2.BsArrowRight,
        {
          "aria-hidden": !0,
          className: "transition-all group-hover:translate-x-1/4"
        }
      ),
      children: "Get Started"
    }
  ) }) })
] }), InstallationCli = () => /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "drop-shadow-xl", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Window, { inverse: !0, header: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(CliBar, { children: "~/jane" }), children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
  Highlighter,
  {
    content: `
	$ git clone https://github.com/progressively-crew/progressively
	$ cd progressively
	$ docker-compose up -d
		`,
    language: "shell"
  }
) }) });

// app/modules/getstarted/ChooseSdk.tsx
var import_bs3 = require("react-icons/bs"), import_vsc = require("react-icons/vsc");
var import_jsx_runtime26 = require("react/jsx-runtime"), ChooseSdk = () => /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: "flex flex-col justify-center", children: [
  /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "bg-gray-100 border border-gray-200 text-3xl text-gray-500 rounded-lg inline-block p-2 dark:text-slate-300 dark:bg-slate-800 dark:border-slate-700", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_vsc.VscTools, {}) }) }),
  /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("h3", { className: "font-bold pt-2 text-xl dark:text-slate-100", children: "Choose a SDK" }),
  /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("p", { className: "pt-1 md:pt-2 text-gray-700 dark:text-slate-200", children: [
    "Progressively is built to be usable on any types of application. From frontend, to backend, to CLIs. Anything that can send an HTTP request can use Progressively. And it supports",
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("strong", { children: "Server Side Rendering without flickering" }),
    "."
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "pt-4 inline-block", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
    Button,
    {
      variant: "secondary",
      to: "/docs/developers/sdk",
      icon: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
        import_bs3.BsArrowRight,
        {
          "aria-hidden": !0,
          className: "transition-all group-hover:translate-x-1/4"
        }
      ),
      children: "SDKs available"
    }
  ) }) })
] }), ChooseSdkCode = () => /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "drop-shadow-xl", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(Window, { inverse: !0, header: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(EditorBar, { children: "index.js" }), children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
  Highlighter,
  {
    content: `
	import { useFlags } from "@progressively/react";
	
	const Hero = () => {
	  const { flags } = useFlags();
	
	  if (flags.newHero) {
		return <NewHero />;
	  }
	
	  return <OldHero />;
	};
		`,
    language: "typescript"
  }
) }) });

// app/modules/getstarted/CreateFlag.tsx
var import_tb4 = require("react-icons/tb");

// app/modules/getstarted/dark.png
var dark_default = "/build/_assets/dark-HBMVEP3P.png";

// app/modules/getstarted/light.png
var light_default = "/build/_assets/light-64H5BNML.png";

// app/modules/getstarted/CreateFlag.tsx
var import_jsx_runtime27 = require("react/jsx-runtime"), CreateFlag = () => /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "flex flex-col justify-center", children: [
  /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "bg-gray-100 border border-gray-200 text-3xl text-gray-500 rounded-lg inline-block p-2 dark:text-slate-300 dark:bg-slate-800 dark:border-slate-700", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_tb4.TbFlag3, {}) }) }),
  /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h3", { className: "font-bold pt-2 text-xl dark:text-slate-100", children: "Create a feature flag" }),
  /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("p", { className: "pt-1 md:pt-2 text-gray-700 dark:text-slate-200", children: "Start the dashboard, follow the instructions and create your first feature flag. It will be available for usage with SDKs." })
] }), CreateFlagImg = () => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "drop-shadow-xl", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(Window, { inverse: !0, header: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(SearchBar, { dark: !0, children: "/" }), children: [
  /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("img", { src: dark_default, alt: "Progressively dashboard", className: "dark:hidden" }),
  /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    "img",
    {
      src: light_default,
      alt: "Progressively dashboard",
      className: "hidden dark:block"
    }
  )
] }) });

// app/routes/index.tsx
var import_ai2 = require("react-icons/ai");

// app/components/TImeline.tsx
var import_jsx_runtime28 = require("react/jsx-runtime"), Timeline = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("ol", { children }), TimelineStep = ({ left, right, position }) => /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("li", { className: "px-4 md:px-0 py-8 md:py-20 relative", children: /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "grid md:grid-cols-[1fr_auto_1fr] md:gap-20 items-center", children: [
  left && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "hidden md:block", children: left }),
  /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "hidden md:block h-full absolute bg-transparent w-[1px] top-0 ml-[16px] border-r border-gray-500 border-dashed" }),
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "py-4 bg-gray-50 dark:bg-slate-900 z-10 relative hidden md:block", children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "hidden md:flex rounded-full w-8 h-8 border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-700 dark:text-slate-200 items-center justify-center", children: position }) })
  ] }),
  right
] }) });

// app/components/Spacer.tsx
var import_jsx_runtime29 = require("react/jsx-runtime"), Spacer = ({ size }) => /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
  "div",
  {
    className: size === 1 ? "h-1" : size === 2 ? "h-2" : size === 3 ? "h-3" : size === 4 ? "h-4" : size === 5 ? "h-5" : size === 6 ? "h-6" : size === 7 ? "h-7" : size === 8 ? "h-8" : size === 9 ? "h-9" : size === 10 ? "h-10" : size === 11 ? "h-11" : size === 12 ? "h-12" : void 0
  }
);

// app/routes/index.tsx
var import_jsx_runtime30 = require("react/jsx-runtime"), title2 = "Progressively, simple and accessible feature flagging tool", description2 = "A simple, accessible, lightweight, self-hosted and OpenSource feature flagging tool. Rollout easily and with confidence. Supports frameworks with SSR capabilities.", meta3 = () => ({
  title: title2,
  description: description2,
  "og:url": "https://progressively.app",
  "og:title": title2,
  "og:description": description2,
  "og:image": "https://progressively.app/logo.jpg",
  "og:type": "website",
  "og:site_name": "Progressively",
  "twitter:card": "summary_large_image",
  "twitter:creator": "@mfrachet",
  "twitter:site": "@mfrachet"
}), links6 = () => [
  {
    rel: "canonical",
    href: "https://progressively.app"
  },
  {
    rel: "stylesheet",
    href: import_github_dark.default
  },
  {
    rel: "stylesheet",
    href: import_github4.default,
    media: "(prefers-color-scheme: dark)"
  },
  { rel: "stylesheet", href: home_default }
], loader5 = () => ({
  isProgressivelyActivated: Boolean(process.env.PROGRESSIVELY_ENV)
});
function Index2() {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "bg-gray-50 dark:bg-slate-900", children: [
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(SiteNav, {}),
    /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("main", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Hero, {}),
      /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "max-w-screen-xl mx-auto", children: [
        /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("section", { className: "pb-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("h2", { className: "sr-only", children: "Prepare your instance of Progressively" }),
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "flex justify-center text-gray-400 text-4xl pb-4", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_ai2.AiOutlineArrowDown, {}) }),
          /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(Timeline, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
              TimelineStep,
              {
                left: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(InstallationCli, {}),
                right: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Installation, {}),
                position: "1"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
              TimelineStep,
              {
                left: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(CreateFlagImg, {}),
                right: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(CreateFlag, {}),
                position: "2"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
              TimelineStep,
              {
                left: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(ChooseSdkCode, {}),
                right: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(ChooseSdk, {}),
                position: "3"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "flex justify-center text-gray-400 text-4xl pt-4", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_ai2.AiOutlineArrowDown, {}) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "pb-12", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Features, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Spacer, { size: 12 }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "px-4 md:px-0", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(WeightComparator, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Spacer, { size: 12 })
      ] })
    ] })
  ] });
}

// app/routes/docs.tsx
var docs_exports = {};
__export(docs_exports, {
  default: () => DocsLayout,
  links: () => links7
});
var import_react24 = require("@remix-run/react");

// app/components/Nav/NavWrapper.tsx
var import_react21 = require("@remix-run/react"), import_jsx_runtime31 = require("react/jsx-runtime"), NavWrapper = ({ children, label }) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("nav", { "aria-label": label, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("ul", { className: "flex flex-col gap-1", children }) }), NavItem = ({ children, to, onClick }) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
  import_react21.NavLink,
  {
    to,
    end: !0,
    onClick,
    className: ({ isActive }) => isActive ? "h-8 block flex items-center lg:rounded px-4 bg-indigo-700 font-bold text-white lg:bg-indigo-100 lg:text-indigo-700 dark:bg-slate-600 lg:dark:text-slate-100 text-sm" : "h-8 block flex items-center lg:rounded px-4 hover:bg-gray-100 hover:dark:bg-slate-700 active:bg-gray-200 active:dark:bg-slate-700 text-gray-500 dark:text-gray-300 text-sm",
    children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { children })
  }
) });

// app/components/Nav/DocMenu.tsx
var import_react22 = __toESM(require("react"));
var import_jsx_runtime32 = require("react/jsx-runtime"), MenuItems = [
  {
    label: "Introduction",
    items: [
      {
        label: "Why Progressively?",
        link: "/docs/introduction/why"
      },
      {
        label: "Getting started",
        link: "/docs/introduction/getting-started"
      }
    ]
  },
  {
    label: "Features",
    items: [
      {
        label: "Hierarchical structure",
        link: "/docs/features/hierarchical-structure"
      },
      {
        label: "Single and Multi variants",
        link: "/docs/features/single-multi-variants"
      },
      {
        label: "Schedules flag update",
        link: "/docs/features/scheduled-flag-update"
      },
      {
        label: "Audience eligibility",
        link: "/docs/features/audience-eligibility"
      },
      {
        label: "Additional audience",
        link: "/docs/features/additional-audience"
      },
      {
        label: "Insights",
        link: "/docs/features/insights"
      }
    ]
  },
  {
    label: "Developers",
    items: [
      {
        label: "SDKs",
        link: "/docs/developers/sdk"
      },
      {
        label: "Examples",
        link: "/docs/developers/examples"
      },
      {
        label: "Customization",
        link: "/docs/developers/customization"
      }
    ]
  }
], DocMenu = () => {
  let { toggleNav, isNavOpened } = useNavToggle(), handleClick = () => {
    isNavOpened && toggleNav();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(NavWrapper, { label: "Flag related", children: MenuItems.map((section, index) => /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(import_react22.default.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("li", { role: "separator", children: [
      index > 0 && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(Spacer, { size: 4 }),
      /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("p", { className: "uppercase text-black text-sm font-bold dark:text-slate-300", children: section.label }),
      /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(Spacer, { size: 1 })
    ] }),
    section.items.map((navItem) => /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(NavItem, { to: navItem.link, onClick: handleClick, children: navItem.label }, navItem.link))
  ] }, section.label)) });
};

// app/components/Nav/MobileNav.tsx
var import_io5 = require("react-icons/io5");

// app/components/FocusTrap.tsx
var import_react23 = require("react");

// app/modules/a11y/utils/getFocusableNodes.ts
var getFocusableNodes = (node) => [
  ...node.querySelectorAll(
    'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
  )
].filter((node2) => node2.hasAttribute("disabled") ? !1 : node2.getAttribute("tabindex") !== "-1");

// app/modules/a11y/utils/keyboardKeys.ts
var KeyboardKeys = {
  DOWN: "ArrowDown",
  UP: "ArrowUp",
  RIGHT: "ArrowRight",
  LEFT: "ArrowLeft",
  ESCAPE: "Escape",
  ENTER: "Enter",
  SPACE: " ",
  TAB: "Tab",
  END: "End",
  HOME: "Home",
  DELETE: "Delete",
  PAGE_UP: "PageUp",
  PAGE_DOWN: "PageDown",
  BACKSPACE: "Backspace",
  CLEAR: "Clear"
};

// app/components/FocusTrap.tsx
var import_jsx_runtime33 = require("react/jsx-runtime"), FocusTrap = ({
  children,
  isActive,
  initialElementSelector
}) => {
  let trappedRef = (0, import_react23.useRef)(null);
  return (0, import_react23.useEffect)(() => {
    if (!isActive)
      return;
    let currentFocus = document.activeElement;
    return () => {
      currentFocus == null || currentFocus.focus();
    };
  }, [isActive]), (0, import_react23.useEffect)(() => {
    if (!isActive || !trappedRef.current)
      return;
    if (initialElementSelector) {
      let focusableElement = trappedRef.current.querySelector(
        `#${initialElementSelector}`
      );
      if (focusableElement)
        return focusableElement.focus();
    }
    let focusableChildren = getFocusableNodes(trappedRef.current);
    if (focusableChildren.length > 0) {
      let firstElement = focusableChildren[0];
      firstElement == null || firstElement.focus();
    } else
      console.warn(
        "[FocusTrap]: it seems there are no focusable elements in the focus trap tree. Make sure there s at least one."
      );
  }, [isActive, initialElementSelector]), /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { ref: trappedRef, onKeyDown: isActive ? (e) => {
    if (e.key !== KeyboardKeys.TAB)
      return;
    let focusableChildren = getFocusableNodes(trappedRef.current);
    if (focusableChildren.length > 0) {
      let firstElement = focusableChildren[0], lastElement = focusableChildren[focusableChildren.length - 1];
      e.shiftKey ? firstElement === document.activeElement && (e.preventDefault(), lastElement == null || lastElement.focus()) : lastElement === document.activeElement && (e.preventDefault(), firstElement == null || firstElement.focus());
    }
  } : void 0, children });
};

// app/components/Nav/MobileNav.tsx
var import_jsx_runtime34 = require("react/jsx-runtime"), MobileNav = () => {
  let { toggleNav, isNavOpened } = useNavToggle();
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
    "div",
    {
      className: "z-30 fixed h-full w-full bg-white dark:bg-slate-800 top-0 bottom-0 left-0 transition-transform ease-in-out duration-200 " + (isNavOpened ? "translate-x-0" : "-translate-x-full"),
      children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(FocusTrap, { isActive: isNavOpened, children: /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("div", { className: "p-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
          "button",
          {
            className: "h-10 w-10 text-2xl dark:text-slate-300",
            onClick: toggleNav,
            tabIndex: isNavOpened ? 0 : -1,
            "aria-hidden": !isNavOpened,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_io5.IoCloseOutline, {}),
              /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(VisuallyHidden, { children: "Close menu" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(Spacer, { size: 6 }),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(DocMenu, {})
      ] }) })
    }
  ) });
};

// app/components/Nav/index.tsx
var import_jsx_runtime35 = require("react/jsx-runtime"), Nav = () => /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(import_jsx_runtime35.Fragment, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(HideDesktop, { children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(MobileNav, {}) }),
  /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(HideTablet, { children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(DocMenu, {}) })
] });

// app/components/Nav/NavToggle.tsx
var import_ai3 = require("react-icons/ai");
var import_jsx_runtime36 = require("react/jsx-runtime"), NavToggle = () => {
  let { toggleNav, isNavOpened } = useNavToggle();
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(
    "button",
    {
      className: "h-10 w-10 text-2xl dark:text-slate-300",
      onClick: toggleNav,
      tabIndex: isNavOpened ? -1 : 0,
      "aria-hidden": isNavOpened,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_ai3.AiOutlineMenu, {}),
        /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(VisuallyHidden, { children: "Toggle menu" })
      ]
    }
  );
};

// app/routes/docs.tsx
var import_github5 = __toESM(require_github());
var import_jsx_runtime37 = require("react/jsx-runtime"), links7 = () => [
  {
    rel: "stylesheet",
    href: import_github5.default
  },
  {
    rel: "stylesheet",
    href: shared_default
  }
];
function DocsLayout() {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(Background, { children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(NavProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
      SiteNav,
      {
        navToggleSlot: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(HideDesktop, { children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(NavToggle, {}) })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { className: "py-4 xl:py-12 max-w-screen-2xl mx-auto px-4 xl:px-12", children: /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "lg:grid lg:grid-cols-[240px_1fr] lg:gap-12", children: [
      /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(Nav, {}),
      /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(InertWhenNavOpened, { children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("main", { className: "prose lg:prose-x dark:prose-dark", children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_react24.Outlet, {}) }) })
    ] }) })
  ] }) }) });
}

// mdx:routes/docs/features/hierarchical-structure.md
var hierarchical_structure_exports = {};
__export(hierarchical_structure_exports, {
  default: () => hierarchical_structure_default,
  filename: () => filename,
  headers: () => headers,
  meta: () => meta4
});
var import_react25 = __toESM(require("react"));
function MDXContent(props = {}) {
  let _components = Object.assign({
    h1: "h1",
    a: "a",
    span: "span",
    p: "p",
    strong: "strong",
    code: "code"
  }, props.components), { wrapper: MDXLayout } = _components, _content = /* @__PURE__ */ import_react25.default.createElement(import_react25.default.Fragment, null, /* @__PURE__ */ import_react25.default.createElement(_components.h1, { id: "hierarchical-structure" }, /* @__PURE__ */ import_react25.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#hierarchical-structure" }, /* @__PURE__ */ import_react25.default.createElement(_components.span, { className: "icon icon-link" })), "Hierarchical structure"), `
`, /* @__PURE__ */ import_react25.default.createElement(_components.p, null, "Progressively is built on top of 3 entities that are: ", /* @__PURE__ */ import_react25.default.createElement(_components.strong, null, "projects, environments and feature flags"), "."), `
`, /* @__PURE__ */ import_react25.default.createElement(_components.p, null, "Each project can have multiple environments that can have multiple feature flags."), `
`, /* @__PURE__ */ import_react25.default.createElement(_components.p, null, "This hierarchical structure allows to use the same instance of Progressively for different projects, but also to apply different feature flag resolution rules to different environments."), `
`, /* @__PURE__ */ import_react25.default.createElement(_components.p, null, "For example, if I have a ", /* @__PURE__ */ import_react25.default.createElement(_components.code, null, "Progressively"), " project with 3 environments (", /* @__PURE__ */ import_react25.default.createElement(_components.code, null, "Development"), ", ", /* @__PURE__ */ import_react25.default.createElement(_components.code, null, "Staging"), ", ", /* @__PURE__ */ import_react25.default.createElement(_components.code, null, "Production"), "), I can define different flag resolution rules for each of these environments. This is practical for testing early in the process, on not-so-critical environment with more permissive rules, and to keep the strong constraints of the ", /* @__PURE__ */ import_react25.default.createElement(_components.code, null, "Production"), " environment when the feature reaches this environment."), `
`, /* @__PURE__ */ import_react25.default.createElement(_components.p, null, "Note that when creating a feature flag on a given environment, it will also be created for the other environments of the given project, for consistency purpose. This way, when using a specific flag in your codebase, it will still resolve from any environment. Of course, you define specific rollout configuration for a flag in each environment."));
  return MDXLayout ? /* @__PURE__ */ import_react25.default.createElement(MDXLayout, { ...props }, _content) : _content;
}
var hierarchical_structure_default = MDXContent, filename = "hierarchical-structure.md", headers = typeof attributes < "u" && attributes.headers, meta4 = typeof attributes < "u" && attributes.meta;

// mdx:routes/docs/features/scheduled-flag-update.md
var scheduled_flag_update_exports = {};
__export(scheduled_flag_update_exports, {
  default: () => scheduled_flag_update_default,
  filename: () => filename2,
  headers: () => headers2,
  meta: () => meta5
});
var import_react26 = __toESM(require("react"));
function MDXContent2(props = {}) {
  let _components = Object.assign({
    h1: "h1",
    a: "a",
    span: "span",
    blockquote: "blockquote",
    p: "p",
    ul: "ul",
    li: "li",
    strong: "strong",
    code: "code"
  }, props.components), { wrapper: MDXLayout } = _components, _content = /* @__PURE__ */ import_react26.default.createElement(import_react26.default.Fragment, null, /* @__PURE__ */ import_react26.default.createElement(_components.h1, { id: "schedules-flag-update" }, /* @__PURE__ */ import_react26.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#schedules-flag-update" }, /* @__PURE__ */ import_react26.default.createElement(_components.span, { className: "icon icon-link" })), "Schedules flag update"), `
`, /* @__PURE__ */ import_react26.default.createElement(_components.blockquote, null, `
`, /* @__PURE__ */ import_react26.default.createElement(_components.p, null, "This feature is only available for single variant feature flags for now. A new iteration will come in the future to make scheduled updates work for multi-variants feature flags."), `
`), `
`, /* @__PURE__ */ import_react26.default.createElement(_components.p, null, "With Progressively, you can define scheduled updates at the feature flag level."), `
`, /* @__PURE__ */ import_react26.default.createElement(_components.p, null, "For example, it's possible to schedule flag updates for:"), `
`, /* @__PURE__ */ import_react26.default.createElement(_components.ul, null, `
`, /* @__PURE__ */ import_react26.default.createElement(_components.li, null, "swiching ", /* @__PURE__ */ import_react26.default.createElement(_components.strong, null, "ON"), " the ", /* @__PURE__ */ import_react26.default.createElement(_components.code, null, "newLoginPage"), " feature flag on ", /* @__PURE__ */ import_react26.default.createElement(_components.strong, null, "Monday"), " next week at ", /* @__PURE__ */ import_react26.default.createElement(_components.strong, null, "10am"), " for ", /* @__PURE__ */ import_react26.default.createElement(_components.strong, null, "10%"), " of the audience"), `
`, /* @__PURE__ */ import_react26.default.createElement(_components.li, null, "swiching ", /* @__PURE__ */ import_react26.default.createElement(_components.strong, null, "ON"), " the ", /* @__PURE__ */ import_react26.default.createElement(_components.code, null, "newLoginPage"), " feature flag on ", /* @__PURE__ */ import_react26.default.createElement(_components.strong, null, "Tuesday"), " next week at ", /* @__PURE__ */ import_react26.default.createElement(_components.strong, null, "9am"), " for ", /* @__PURE__ */ import_react26.default.createElement(_components.strong, null, "20%"), " of the audience"), `
`, /* @__PURE__ */ import_react26.default.createElement(_components.li, null, "swiching ", /* @__PURE__ */ import_react26.default.createElement(_components.strong, null, "ON"), " the ", /* @__PURE__ */ import_react26.default.createElement(_components.code, null, "newLoginPage"), " feature flag on ", /* @__PURE__ */ import_react26.default.createElement(_components.strong, null, "Wednesday"), " next week at ", /* @__PURE__ */ import_react26.default.createElement(_components.strong, null, "6am"), " for ", /* @__PURE__ */ import_react26.default.createElement(_components.strong, null, "50%"), " of the audience"), `
`, /* @__PURE__ */ import_react26.default.createElement(_components.li, null, "swiching ", /* @__PURE__ */ import_react26.default.createElement(_components.strong, null, "OFF"), " the ", /* @__PURE__ */ import_react26.default.createElement(_components.code, null, "newLoginPage"), " feature flag on ", /* @__PURE__ */ import_react26.default.createElement(_components.strong, null, "Friday"), " next week at ", /* @__PURE__ */ import_react26.default.createElement(_components.strong, null, "5pm")), `
`));
  return MDXLayout ? /* @__PURE__ */ import_react26.default.createElement(MDXLayout, { ...props }, _content) : _content;
}
var scheduled_flag_update_default = MDXContent2, filename2 = "scheduled-flag-update.md", headers2 = typeof attributes < "u" && attributes.headers, meta5 = typeof attributes < "u" && attributes.meta;

// mdx:routes/docs/features/single-multi-variants.md
var single_multi_variants_exports = {};
__export(single_multi_variants_exports, {
  default: () => single_multi_variants_default,
  filename: () => filename3,
  headers: () => headers3,
  meta: () => meta6
});
var import_react27 = __toESM(require("react"));
function MDXContent3(props = {}) {
  let _components = Object.assign({
    h1: "h1",
    a: "a",
    span: "span",
    p: "p",
    pre: "pre",
    code: "code",
    strong: "strong",
    hr: "hr"
  }, props.components), { wrapper: MDXLayout } = _components, _content = /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement(_components.h1, { id: "single-and-multi-variants" }, /* @__PURE__ */ import_react27.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#single-and-multi-variants" }, /* @__PURE__ */ import_react27.default.createElement(_components.span, { className: "icon icon-link" })), "Single and Multi variants"), `
`, /* @__PURE__ */ import_react27.default.createElement(_components.p, null, "By default, when a feature flag is created in the dashboard and used by an application, the underlying SDK used by this application will provide a boolean value."), `
`, /* @__PURE__ */ import_react27.default.createElement(_components.p, null, "For example, you may have created a new fancy UI for your login page, and you want to show it to only 10% of your audience. Using Progressively, inside your application codebase you will do something like:"), `
`, /* @__PURE__ */ import_react27.default.createElement(_components.pre, null, /* @__PURE__ */ import_react27.default.createElement(_components.code, { className: "hljs language-jsx" }, /* @__PURE__ */ import_react27.default.createElement(_components.span, { className: "hljs-keyword" }, "if"), " (flags.", /* @__PURE__ */ import_react27.default.createElement(_components.span, { className: "hljs-property" }, "showNewLoginPage"), `) {
  `, /* @__PURE__ */ import_react27.default.createElement(_components.span, { className: "hljs-keyword" }, "return"), " ", /* @__PURE__ */ import_react27.default.createElement(_components.span, { className: "hljs-string" }, '"This is the new homepage!"'), `;
}

`, /* @__PURE__ */ import_react27.default.createElement(_components.span, { className: "hljs-keyword" }, "return"), " ", /* @__PURE__ */ import_react27.default.createElement(_components.span, { className: "hljs-string" }, '"This is the old homepage :("'), `;
`)), `
`, /* @__PURE__ */ import_react27.default.createElement(_components.p, null, "In this situation, ", /* @__PURE__ */ import_react27.default.createElement(_components.code, null, "flags.showNewLoginPage"), " will give ", /* @__PURE__ */ import_react27.default.createElement(_components.code, null, "true"), " or ", /* @__PURE__ */ import_react27.default.createElement(_components.code, null, "false"), ": it`s called a ", /* @__PURE__ */ import_react27.default.createElement(_components.strong, null, "Single variant feature flag"), "."), `
`, /* @__PURE__ */ import_react27.default.createElement(_components.hr, null), `
`, /* @__PURE__ */ import_react27.default.createElement(_components.p, null, "With progressively, you can also use ", /* @__PURE__ */ import_react27.default.createElement(_components.strong, null, "Multi variant feature flags"), ". In order to do so, you have to create the different ", /* @__PURE__ */ import_react27.default.createElement(_components.code, null, "Variants"), " at the feature flag level, and associate them with a certain percentage."), `
`, /* @__PURE__ */ import_react27.default.createElement(_components.p, null, "For example, getting back to the new login page you may have created 2 new fancy UIs for your login page, and you want to show them respectively to 10% of your audience. Using Progressively, inside your application codebase you will do something like:"), `
`, /* @__PURE__ */ import_react27.default.createElement(_components.pre, null, /* @__PURE__ */ import_react27.default.createElement(_components.code, { className: "hljs language-jsx" }, /* @__PURE__ */ import_react27.default.createElement(_components.span, { className: "hljs-keyword" }, "if"), " (flags.", /* @__PURE__ */ import_react27.default.createElement(_components.span, { className: "hljs-property" }, "showNewLoginPage"), " === ", /* @__PURE__ */ import_react27.default.createElement(_components.span, { className: "hljs-string" }, '"Variant B"'), `) {
  `, /* @__PURE__ */ import_react27.default.createElement(_components.span, { className: "hljs-keyword" }, "return"), " ", /* @__PURE__ */ import_react27.default.createElement(_components.span, { className: "hljs-string" }, '"This is the new homepage B!"'), `;
}

`, /* @__PURE__ */ import_react27.default.createElement(_components.span, { className: "hljs-keyword" }, "if"), " (flags.", /* @__PURE__ */ import_react27.default.createElement(_components.span, { className: "hljs-property" }, "showNewLoginPage"), " === ", /* @__PURE__ */ import_react27.default.createElement(_components.span, { className: "hljs-string" }, '"Variant C"'), `) {
  `, /* @__PURE__ */ import_react27.default.createElement(_components.span, { className: "hljs-keyword" }, "return"), " ", /* @__PURE__ */ import_react27.default.createElement(_components.span, { className: "hljs-string" }, '"This is the new homepage C!"'), `;
}

`, /* @__PURE__ */ import_react27.default.createElement(_components.span, { className: "hljs-keyword" }, "return"), " ", /* @__PURE__ */ import_react27.default.createElement(_components.span, { className: "hljs-string" }, '"This is the old homepage, control variant"'), `;
`)), `
`, /* @__PURE__ */ import_react27.default.createElement(_components.p, null, "Something important to understand here is: if you show the new login pages to 20% (Variant B + Variant C) of your audience, what happens to the 80% others?"), `
`, /* @__PURE__ */ import_react27.default.createElement(_components.p, null, `This remaining percentage correspond to the "original" page, and it's called the `, /* @__PURE__ */ import_react27.default.createElement(_components.strong, null, "Control variant"), ". If Progressively does not manage to resolve a variant for a given user, it will provide them back with the ", /* @__PURE__ */ import_react27.default.createElement(_components.strong, null, "Control variant"), "."));
  return MDXLayout ? /* @__PURE__ */ import_react27.default.createElement(MDXLayout, { ...props }, _content) : _content;
}
var single_multi_variants_default = MDXContent3, filename3 = "single-multi-variants.md", headers3 = typeof attributes < "u" && attributes.headers, meta6 = typeof attributes < "u" && attributes.meta;

// mdx:routes/docs/features/audience-eligibility.md
var audience_eligibility_exports = {};
__export(audience_eligibility_exports, {
  default: () => audience_eligibility_default,
  filename: () => filename4,
  headers: () => headers4,
  meta: () => meta7
});
var import_react28 = __toESM(require("react"));
function MDXContent4(props = {}) {
  let _components = Object.assign({
    h1: "h1",
    a: "a",
    span: "span",
    p: "p",
    code: "code",
    ul: "ul",
    li: "li",
    strong: "strong"
  }, props.components), { wrapper: MDXLayout } = _components, _content = /* @__PURE__ */ import_react28.default.createElement(import_react28.default.Fragment, null, /* @__PURE__ */ import_react28.default.createElement(_components.h1, { id: "audience-eligibility" }, /* @__PURE__ */ import_react28.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#audience-eligibility" }, /* @__PURE__ */ import_react28.default.createElement(_components.span, { className: "icon icon-link" })), "Audience eligibility"), `
`, /* @__PURE__ */ import_react28.default.createElement(_components.p, null, "By default, Progressively comes with a built in resolution tool that uses percentages: you can activate a feature flag for ", /* @__PURE__ */ import_react28.default.createElement(_components.code, null, "0%"), " to ", /* @__PURE__ */ import_react28.default.createElement(_components.code, null, "100%"), " of the audience."), `
`, /* @__PURE__ */ import_react28.default.createElement(_components.p, null, "But in practice, when releasing a feature behind a flag, you may want to target some specific users, like a subset of your global audience."), `
`, /* @__PURE__ */ import_react28.default.createElement(_components.p, null, "For example, it's possible to create audience eligibility rules that will allow the following set of user to see the feature behind the flag:"), `
`, /* @__PURE__ */ import_react28.default.createElement(_components.ul, null, `
`, /* @__PURE__ */ import_react28.default.createElement(_components.li, null, "People with ", /* @__PURE__ */ import_react28.default.createElement(_components.strong, null, "email containing @progressively.app")), `
`, /* @__PURE__ */ import_react28.default.createElement(_components.li, null, "People with ", /* @__PURE__ */ import_react28.default.createElement(_components.strong, null, "email containing @bestfriends.com")), `
`), `
`, /* @__PURE__ */ import_react28.default.createElement(_components.p, null, /* @__PURE__ */ import_react28.default.createElement(_components.strong, null, "\u26A0\uFE0F It's important to understand that if the user requesting the flag matches AT LEAST ONE of the audience eligibility rule, they will receive the activated variant of the flag (if they are in the range of the rollout)"), "."), `
`, /* @__PURE__ */ import_react28.default.createElement(_components.p, null, "It's up to you to configure which field you want to rely on to create them. Also, since it uses data that is outside the scope of Progressively, you are reponsible to provide them through SDKs."));
  return MDXLayout ? /* @__PURE__ */ import_react28.default.createElement(MDXLayout, { ...props }, _content) : _content;
}
var audience_eligibility_default = MDXContent4, filename4 = "audience-eligibility.md", headers4 = typeof attributes < "u" && attributes.headers, meta7 = typeof attributes < "u" && attributes.meta;

// mdx:routes/docs/features/additional-audience.md
var additional_audience_exports = {};
__export(additional_audience_exports, {
  default: () => additional_audience_default,
  filename: () => filename5,
  headers: () => headers5,
  meta: () => meta8
});
var import_react29 = __toESM(require("react"));
function MDXContent5(props = {}) {
  let _components = Object.assign({
    h1: "h1",
    a: "a",
    span: "span",
    p: "p"
  }, props.components), { wrapper: MDXLayout } = _components, _content = /* @__PURE__ */ import_react29.default.createElement(import_react29.default.Fragment, null, /* @__PURE__ */ import_react29.default.createElement(_components.h1, { id: "additional-audience" }, /* @__PURE__ */ import_react29.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#additional-audience" }, /* @__PURE__ */ import_react29.default.createElement(_components.span, { className: "icon icon-link" })), "Additional Audience"), `
`, /* @__PURE__ */ import_react29.default.createElement(_components.p, null, "When using Progressively, you can define which amount of your audience will resolve the feature flag. It can be qualitative (using Audience Eligiblity), quantitative (using the rollout percentage), or both (only a percentage of the audience matching a specific audience eligibility rule)."), `
`, /* @__PURE__ */ import_react29.default.createElement(_components.p, null, 'However, you may also want to provide "joker" access to a subset of your users. For instance, you may want to test the activated value of the feature flag, even if you are not in the range of targeted users.'), `
`, /* @__PURE__ */ import_react29.default.createElement(_components.p, null, `The "Additional audience" is the "joker" access: if the users matches at least one the rule, they are granted access to the activated variant of the flag. This feature is mostly to use with the person that work inside your company. It's like a "private access" to a feature that will be rollout in the future.`), `
`, /* @__PURE__ */ import_react29.default.createElement(_components.p, null, "It's up to you to configure which field you want to rely on to create them. Also, since it uses data that is outside the scope of Progressively, you are reponsible to provide them through SDKs."));
  return MDXLayout ? /* @__PURE__ */ import_react29.default.createElement(MDXLayout, { ...props }, _content) : _content;
}
var additional_audience_default = MDXContent5, filename5 = "additional-audience.md", headers5 = typeof attributes < "u" && attributes.headers, meta8 = typeof attributes < "u" && attributes.meta;

// mdx:routes/docs/introduction/getting-started.md
var getting_started_exports = {};
__export(getting_started_exports, {
  default: () => getting_started_default,
  filename: () => filename6,
  headers: () => headers6,
  meta: () => meta9
});
var import_react30 = __toESM(require("react"));
function MDXContent6(props = {}) {
  let _components = Object.assign({
    h1: "h1",
    a: "a",
    span: "span",
    p: "p",
    h2: "h2",
    code: "code",
    pre: "pre",
    h3: "h3",
    ul: "ul",
    li: "li",
    strong: "strong",
    h4: "h4",
    ol: "ol",
    hr: "hr"
  }, props.components), { wrapper: MDXLayout } = _components, _content = /* @__PURE__ */ import_react30.default.createElement(import_react30.default.Fragment, null, /* @__PURE__ */ import_react30.default.createElement(_components.h1, { id: "getting-started" }, /* @__PURE__ */ import_react30.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#getting-started" }, /* @__PURE__ */ import_react30.default.createElement(_components.span, { className: "icon icon-link" })), "Getting started"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, "This section will help you spawn a new Progressively instance you can interact with."), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.h2, { id: "quick-start-demo-purpose-with-docker-compose" }, /* @__PURE__ */ import_react30.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#quick-start-demo-purpose-with-docker-compose" }, /* @__PURE__ */ import_react30.default.createElement(_components.span, { className: "icon icon-link" })), "Quick start (demo purpose, with ", /* @__PURE__ */ import_react30.default.createElement(_components.code, null, "docker-compose"), ")"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.pre, null, /* @__PURE__ */ import_react30.default.createElement(_components.code, { className: "hljs language-bash" }, "$ git ", /* @__PURE__ */ import_react30.default.createElement(_components.span, { className: "hljs-built_in" }, "clone"), ` https://github.com/progressively-crew/progressively
$ `, /* @__PURE__ */ import_react30.default.createElement(_components.span, { className: "hljs-built_in" }, "cd"), ` progressively
$ docker-compose up -d
`)), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, "You can now open ", /* @__PURE__ */ import_react30.default.createElement("a", { href: "http://localhost:3000/welcome", target: "_blank", rel: "noreferrer" }, "the welcome page"), " to create your admin user."), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.h2, { id: "medium-start-local-development" }, /* @__PURE__ */ import_react30.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#medium-start-local-development" }, /* @__PURE__ */ import_react30.default.createElement(_components.span, { className: "icon icon-link" })), "Medium start (local development)"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, "Progressively requires 2 databases: ", /* @__PURE__ */ import_react30.default.createElement("a", { href: "https://www.postgresql.org/", target: "_blank", rel: "noreferrer" }, "Postgres"), " and ", /* @__PURE__ */ import_react30.default.createElement("a", { href: "https://redis.io/", target: "_blank", rel: "noreferrer" }, "Redis"), ". It's up to you to choose how to install them, but for the sake of simplicity in this section, we'll use ", /* @__PURE__ */ import_react30.default.createElement("a", { href: "https://www.docker.com/", target: "_blank", rel: "noreferrer" }, "Docker"), "."), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.pre, null, /* @__PURE__ */ import_react30.default.createElement(_components.code, { className: "hljs language-sh" }, "$ git ", /* @__PURE__ */ import_react30.default.createElement(_components.span, { className: "hljs-built_in" }, "clone"), " https://github.com/progressively-crew/progressively && ", /* @__PURE__ */ import_react30.default.createElement(_components.span, { className: "hljs-built_in" }, "cd"), ` progressively
$ `, /* @__PURE__ */ import_react30.default.createElement(_components.span, { className: "hljs-built_in" }, "cp"), ` ./packages/backend/.env.example ./packages/backend/.env
$ `, /* @__PURE__ */ import_react30.default.createElement(_components.span, { className: "hljs-built_in" }, "cp"), ` ./packages/frontend/.env.example ./packages/frontend/.env
$ docker run --name progressively-db -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=progressively -p 5432:5432 -d postgres
$ docker run -it --`, /* @__PURE__ */ import_react30.default.createElement(_components.span, { className: "hljs-built_in" }, "rm"), ` --name progressively-redis -p 6379:6379 -d redis
$ npm run setup && npm run db:prepare
$ npm run start:dev
`)), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, "You can now open ", /* @__PURE__ */ import_react30.default.createElement("a", { href: "http://localhost:3000/welcome", target: "_blank", rel: "noreferrer" }, "the welcome page"), " to create your admin user."), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.h2, { id: "long-start-explanations-step-by-step" }, /* @__PURE__ */ import_react30.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#long-start-explanations-step-by-step" }, /* @__PURE__ */ import_react30.default.createElement(_components.span, { className: "icon icon-link" })), "Long start (explanations, step by step)"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.h3, { id: "the-stack" }, /* @__PURE__ */ import_react30.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#the-stack" }, /* @__PURE__ */ import_react30.default.createElement(_components.span, { className: "icon icon-link" })), "The stack"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, "This is the stack, in a nutshell, and the links to the various documentation of the involved tool. More precise explanations on the different parts of the project will come later in this document."), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.ul, null, `
`, /* @__PURE__ */ import_react30.default.createElement(_components.li, null, /* @__PURE__ */ import_react30.default.createElement(_components.strong, null, "frontend (dashboard)"), ": built with ", /* @__PURE__ */ import_react30.default.createElement(_components.a, { href: "https://remix.run/" }, "Remix.run")), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.li, null, /* @__PURE__ */ import_react30.default.createElement(_components.strong, null, "backend (API/Websockets)"), " built with ", /* @__PURE__ */ import_react30.default.createElement(_components.a, { href: "https://nestjs.com/" }, "Nestjs")), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.li, null, /* @__PURE__ */ import_react30.default.createElement(_components.strong, null, "database access/migrations"), " built with ", /* @__PURE__ */ import_react30.default.createElement(_components.a, { href: "https://www.prisma.io/" }, "Prisma")), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.li, null, /* @__PURE__ */ import_react30.default.createElement(_components.strong, null, "databases"), ": ", /* @__PURE__ */ import_react30.default.createElement(_components.a, { href: "https://www.postgresql.org/" }, "Postgres"), " and ", /* @__PURE__ */ import_react30.default.createElement(_components.a, { href: "https://redis.io/" }, "Redis"), " (for websocket backend)"), `
`), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, "All of the packages are written in ", /* @__PURE__ */ import_react30.default.createElement(_components.a, { href: "https://www.typescriptlang.org/" }, "TypeScript"), "."), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.h3, { id: "the-repository" }, /* @__PURE__ */ import_react30.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#the-repository" }, /* @__PURE__ */ import_react30.default.createElement(_components.span, { className: "icon icon-link" })), "The repository"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, "The project repository is a mono-repo managed by ", /* @__PURE__ */ import_react30.default.createElement(_components.a, { href: "https://lerna.js.org/" }, "Lerna"), ". You can find all the available packages at ", /* @__PURE__ */ import_react30.default.createElement(_components.code, null, "./packages"), " from the root."), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, "It is composed of different pieces:"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.ul, null, `
`, /* @__PURE__ */ import_react30.default.createElement(_components.li, null, /* @__PURE__ */ import_react30.default.createElement(_components.strong, null, "backend"), ": the API, business logic and websocket servers"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.li, null, /* @__PURE__ */ import_react30.default.createElement(_components.strong, null, "frontend"), ": the dashboard server for managing feature flags"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.li, null, /* @__PURE__ */ import_react30.default.createElement(_components.strong, null, "react"), ": the sdk to use in React applications"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.li, null, /* @__PURE__ */ import_react30.default.createElement(_components.strong, null, "sdk-js"), ": the sdk to use in JavaScript applications (not framework specific)"), `
`), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.h4, { id: "initializing-the-project" }, /* @__PURE__ */ import_react30.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#initializing-the-project" }, /* @__PURE__ */ import_react30.default.createElement(_components.span, { className: "icon icon-link" })), "Initializing the project"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, "In order for the project to start, we have to do the following steps:"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.ol, null, `
`, /* @__PURE__ */ import_react30.default.createElement(_components.li, null, "create ", /* @__PURE__ */ import_react30.default.createElement(_components.code, null, ".env"), " files in ", /* @__PURE__ */ import_react30.default.createElement(_components.strong, null, "backend"), " and ", /* @__PURE__ */ import_react30.default.createElement(_components.strong, null, "frontend")), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.li, null, "start Postgres"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.li, null, "start Redis"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.li, null, "Setup the whole project (dependencies, builds etc...)"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.li, null, "create Postgres tables"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.li, null, "seed Postgres Data"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.li, null, "start the ", /* @__PURE__ */ import_react30.default.createElement(_components.strong, null, "backend")), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.li, null, "start the ", /* @__PURE__ */ import_react30.default.createElement(_components.strong, null, "frontend")), `
`), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, /* @__PURE__ */ import_react30.default.createElement(_components.strong, null, "1. create ", /* @__PURE__ */ import_react30.default.createElement(_components.code, null, ".env"), " files in backend and frontend")), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, "The repository has ", /* @__PURE__ */ import_react30.default.createElement(_components.code, null, ".env.example"), " in both these packages that you can rename and modify."), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.pre, null, /* @__PURE__ */ import_react30.default.createElement(_components.code, { className: "hljs language-sh" }, "$  ", /* @__PURE__ */ import_react30.default.createElement(_components.span, { className: "hljs-built_in" }, "cp"), ` ./packages/backend/.env.example ./packages/backend/.env
$  `, /* @__PURE__ */ import_react30.default.createElement(_components.span, { className: "hljs-built_in" }, "cp"), ` ./packages/frontend/.env.example ./packages/frontend/.env
`)), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, /* @__PURE__ */ import_react30.default.createElement(_components.strong, null, "2. start Postgres")), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, "The following command starts a Postgres instance in a Docker container. Note that you will only have to run this command when restarting your machine or when deleting the container."), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.pre, null, /* @__PURE__ */ import_react30.default.createElement(_components.code, { className: "hljs language-sh" }, /* @__PURE__ */ import_react30.default.createElement(_components.span, { className: "hljs-comment" }, "# this will start postgres in a local container with a dummy password."), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.span, { className: "hljs-comment" }, "# keep in mind that you can change the password BUT you will have to modify"), `
$ docker run --name progressively-db -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=progressively -p 5432:5432 -d postgres
`)), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, /* @__PURE__ */ import_react30.default.createElement(_components.strong, null, "3. start Redis")), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, "The following command starts a Redis instance in a Docker container. Note that you will only have to run this command when restarting your machine or when deleting the container."), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.pre, null, /* @__PURE__ */ import_react30.default.createElement(_components.code, { className: "hljs language-sh" }, "$  docker run -it --", /* @__PURE__ */ import_react30.default.createElement(_components.span, { className: "hljs-built_in" }, "rm"), ` --name progressively-redis -p 6379:6379 -d redis
`)), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, /* @__PURE__ */ import_react30.default.createElement(_components.strong, null, "4. Setup the whole project (dependencies, builds etc...)")), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, "The following commands install all the packages dependencies and creates lerna packages inter-dependencies."), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.pre, null, /* @__PURE__ */ import_react30.default.createElement(_components.code, { className: "hljs language-sh" }, `$ npm run setup
`)), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, /* @__PURE__ */ import_react30.default.createElement(_components.strong, null, "5. create Postgres tables")), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, "This commands creates the table in Postgres (only necessary to run it one time). Note that Postgres needs to be started."), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.pre, null, /* @__PURE__ */ import_react30.default.createElement(_components.code, { className: "hljs language-sh" }, `$ npm run db:prepare
`)), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, /* @__PURE__ */ import_react30.default.createElement(_components.strong, null, "6. seed Postgres Data")), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, "This commands loads a bunch of data into the database so that you can connect and start interacting."), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.pre, null, /* @__PURE__ */ import_react30.default.createElement(_components.code, { className: "hljs language-sh" }, `$ npm run db:seed
`)), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, "You now have access to the following users:"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.ul, null, `
`, /* @__PURE__ */ import_react30.default.createElement(_components.li, null, "marvin.frachet@something.com / password"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.li, null, "john.doe@gmail.com / password"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.li, null, "jane.doe@gmail.com / password"), `
`), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, /* @__PURE__ */ import_react30.default.createElement(_components.strong, null, "7. start the backend")), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, "In ", /* @__PURE__ */ import_react30.default.createElement(_components.code, null, "./packages/backend"), ", run the following command to start a development server with hot reloading:"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.pre, null, /* @__PURE__ */ import_react30.default.createElement(_components.code, { className: "hljs language-sh" }, `$ npm run dev
`)), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, /* @__PURE__ */ import_react30.default.createElement(_components.strong, null, "8. start the frontend")), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, "In ", /* @__PURE__ */ import_react30.default.createElement(_components.code, null, "./packages/frontend"), ", run the following command to start a development server with hot reloading:"), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.pre, null, /* @__PURE__ */ import_react30.default.createElement(_components.code, { className: "hljs language-sh" }, `$ npm run dev
`)), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.hr, null), `
`, /* @__PURE__ */ import_react30.default.createElement(_components.p, null, "And your now ready to navigate on http://localhost:3000 (dashboard) and http://localhost:4000 (backend) :)."));
  return MDXLayout ? /* @__PURE__ */ import_react30.default.createElement(MDXLayout, { ...props }, _content) : _content;
}
var getting_started_default = MDXContent6, filename6 = "getting-started.md", headers6 = typeof attributes < "u" && attributes.headers, meta9 = typeof attributes < "u" && attributes.meta;

// mdx:routes/docs/introduction/demo-instance.md
var demo_instance_exports2 = {};
__export(demo_instance_exports2, {
  default: () => demo_instance_default,
  filename: () => filename7,
  headers: () => headers7,
  meta: () => meta10
});
var import_react31 = __toESM(require("react"));
function MDXContent7(props = {}) {
  let _components = Object.assign({
    h1: "h1",
    a: "a",
    span: "span",
    p: "p",
    blockquote: "blockquote"
  }, props.components), { wrapper: MDXLayout } = _components, _content = /* @__PURE__ */ import_react31.default.createElement(import_react31.default.Fragment, null, /* @__PURE__ */ import_react31.default.createElement(_components.h1, { id: "the-demo-instance" }, /* @__PURE__ */ import_react31.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#the-demo-instance" }, /* @__PURE__ */ import_react31.default.createElement(_components.span, { className: "icon icon-link" })), "The Demo instance"), `
`, /* @__PURE__ */ import_react31.default.createElement(_components.p, null, "It is now possible to play with Progressively in a demo instance, without the need to install anything \u{1F389} ."), `
`, /* @__PURE__ */ import_react31.default.createElement(_components.p, null, "You can now create an account on ", /* @__PURE__ */ import_react31.default.createElement(_components.a, { href: "https://progressively.vercel.app/" }, "https://progressively.vercel.app/"), " and connect your application using one of the SDKs to get a taste of the tool."), `
`, /* @__PURE__ */ import_react31.default.createElement(_components.p, null, "Enjoy, and let us know what you think of it \u{1F60A}."), `
`, /* @__PURE__ */ import_react31.default.createElement(_components.blockquote, null, `
`, /* @__PURE__ */ import_react31.default.createElement(_components.p, null, "\u26A0\uFE0F Keep in mind that this is a demo-only instance. It does not aim to be used for production application. The data will be deleted quite often and you can expect latency since the underlying machine are not optimized for a production usage."), `
`));
  return MDXLayout ? /* @__PURE__ */ import_react31.default.createElement(MDXLayout, { ...props }, _content) : _content;
}
var demo_instance_default = MDXContent7, filename7 = "demo-instance.md", headers7 = typeof attributes < "u" && attributes.headers, meta10 = typeof attributes < "u" && attributes.meta;

// mdx:routes/docs/developers/customization.md
var customization_exports = {};
__export(customization_exports, {
  default: () => customization_default,
  filename: () => filename8,
  headers: () => headers8,
  meta: () => meta11
});
var import_react32 = __toESM(require("react"));
function MDXContent8(props = {}) {
  let _components = Object.assign({
    h1: "h1",
    a: "a",
    span: "span",
    p: "p",
    h2: "h2",
    code: "code",
    pre: "pre"
  }, props.components), { wrapper: MDXLayout } = _components, _content = /* @__PURE__ */ import_react32.default.createElement(import_react32.default.Fragment, null, /* @__PURE__ */ import_react32.default.createElement(_components.h1, { id: "customization" }, /* @__PURE__ */ import_react32.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#customization" }, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "icon icon-link" })), "Customization"), `
`, /* @__PURE__ */ import_react32.default.createElement(_components.p, null, "Progressively is self-hosted. In order to match your specific customization needs, you can override the following environment variables."), `
`, /* @__PURE__ */ import_react32.default.createElement(_components.h2, { id: "frontend-dashboard" }, /* @__PURE__ */ import_react32.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#frontend-dashboard" }, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "icon icon-link" })), "Frontend (dashboard)"), `
`, /* @__PURE__ */ import_react32.default.createElement(_components.p, null, "You can modify these values at the ", /* @__PURE__ */ import_react32.default.createElement(_components.a, { href: "https://github.com/progressively-crew/progressively/tree/master/packages/frontend" }, "root of the frontend (dashboard) project"), " (", /* @__PURE__ */ import_react32.default.createElement(_components.code, null, "./packages/frontend/.env"), ")."), `
`, /* @__PURE__ */ import_react32.default.createElement(_components.pre, null, /* @__PURE__ */ import_react32.default.createElement(_components.code, { className: "hljs language-sh" }, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-comment" }, "# The backend API URL"), `
BACKEND_URL=http://localhost:4000

`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-comment" }, "# The secret key to generate the session token for Remix"), `
SESSION_SECRET=abcd

`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-comment" }, '# Do you allow people to create accounts from the registration page? Even when false, you can add people through the "Add member" feature'), `
ALLOW_REGISTRATION=`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-literal" }, "true"), `

`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-comment" }, "# If you want to connect to Progressively using your Okta instance, fill this environment variable and a button will appear on the signin page."), `
OKTA_ISSUER=`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-string" }, '"YOUR_OKTA_ISSUER"'), `
OKTA_CLIENT_ID=`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-string" }, '"YOUR_OKTA_CLIENT_ID"'), `
`)), `
`, /* @__PURE__ */ import_react32.default.createElement(_components.h2, { id: "backend" }, /* @__PURE__ */ import_react32.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#backend" }, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "icon icon-link" })), "Backend"), `
`, /* @__PURE__ */ import_react32.default.createElement(_components.p, null, "You can modify these values at the ", /* @__PURE__ */ import_react32.default.createElement(_components.a, { href: "https://github.com/progressively-crew/progressively/tree/master/packages/backend" }, "root of the backend project"), " (", /* @__PURE__ */ import_react32.default.createElement(_components.code, null, "./packages/backend/.env"), ")."), `
`, /* @__PURE__ */ import_react32.default.createElement(_components.pre, null, /* @__PURE__ */ import_react32.default.createElement(_components.code, { className: "hljs language-sh" }, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-comment" }, "# The Postgres database string"), `
DATABASE_URL=postgresql://admin:admin@localhost:5432/progressively

`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-comment" }, "# The Redis database string"), `
REDIS_URL=redis://localhost:6379

`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-comment" }, "# The secret necessary to generate JWT tokens for authentication"), `
ACCESS_TOKEN_SECRET=abcd

`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-comment" }, "# The secret necessary to re-generate JWT tokens for authentication (refresh tokens)"), `
REFRESH_TOKEN_SECRET=efgh

`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-comment" }, "# The number of seconds before an access token expires (default to one day)"), `
REFRESH_TOKEN_EXPIRES=84600

`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-comment" }, "# The SMTP server host for sending email for account creation, adding members, etc..."), `
SMTP_HOST=smtp.ethereal.email

`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-comment" }, "# The SMTP server port"), `
SMTP_PORT=587

`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-comment" }, "# The SMTP user email"), `
SMTP_USER=

`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-comment" }, "# The SMTP user password"), `
SMTP_PASSWORD=

`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-comment" }, "# The frontend URL for redirection (registration by email for example)"), `
FRONTEND_URL=http://localhost:3000

`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-comment" }, "# The backend URL for redirection (used inside the email, might change in the future)"), `
BACKEND_URL=http://localhost:4000

`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-comment" }, "# The socket heartbeat timeout"), `
SOCKET_TIMEOUT=10000

`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-comment" }, '# Do you allow people to create account from the registration page? Even when false, you can add people through the "Add member" feature'), `
ALLOW_REGISTRATION=`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-literal" }, "true"), `

`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-comment" }, "# Throttling TTL in Nestjs"), `
THROTTLING_TTL=60

`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-comment" }, "# Throttling Limit in Nestjs"), `
THROTTLING_LIMIT=10000

`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-comment" }, "# Fill these two in addition to the one set in the frontend to activate Okta authentication in Progressively"), `
OKTA_ISSUER=`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-string" }, '"YOUR_OKTA_ISSUER"'), `
OKTA_CLIENT_ID=`, /* @__PURE__ */ import_react32.default.createElement(_components.span, { className: "hljs-string" }, '"YOUR_OKTA_CLIENT_ID"'), `
`)));
  return MDXLayout ? /* @__PURE__ */ import_react32.default.createElement(MDXLayout, { ...props }, _content) : _content;
}
var customization_default = MDXContent8, filename8 = "customization.md", headers8 = typeof attributes < "u" && attributes.headers, meta11 = typeof attributes < "u" && attributes.meta;

// mdx:routes/docs/developers/add-your-sdk.md
var add_your_sdk_exports = {};
__export(add_your_sdk_exports, {
  default: () => add_your_sdk_default,
  filename: () => filename9,
  headers: () => headers9,
  meta: () => meta12
});
var import_react33 = __toESM(require("react"));
function MDXContent9(props = {}) {
  let _components = Object.assign({
    h1: "h1",
    a: "a",
    span: "span",
    p: "p"
  }, props.components), { wrapper: MDXLayout } = _components, _content = /* @__PURE__ */ import_react33.default.createElement(import_react33.default.Fragment, null, /* @__PURE__ */ import_react33.default.createElement(_components.h1, { id: "adding-a-new-sdk" }, /* @__PURE__ */ import_react33.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#adding-a-new-sdk" }, /* @__PURE__ */ import_react33.default.createElement(_components.span, { className: "icon icon-link" })), "Adding a new SDK"), `
`, /* @__PURE__ */ import_react33.default.createElement(_components.p, null, "Progressively is a fairly new Project and we need your help \u{1F60A}."), `
`, /* @__PURE__ */ import_react33.default.createElement(_components.p, null, "If you feel the need of using Progressively in a language that is not supported yet, you can ask for help from maintainers in ", /* @__PURE__ */ import_react33.default.createElement(_components.a, { href: "https://github.com/progressively-crew/progressively/issues/9" }, "issue#9"), " or suggest an implementation by opening a pull request to the project."), `
`, /* @__PURE__ */ import_react33.default.createElement(_components.p, null, "Your help is greatly appreciated \u{1F64F}"));
  return MDXLayout ? /* @__PURE__ */ import_react33.default.createElement(MDXLayout, { ...props }, _content) : _content;
}
var add_your_sdk_default = MDXContent9, filename9 = "add-your-sdk.md", headers9 = typeof attributes < "u" && attributes.headers, meta12 = typeof attributes < "u" && attributes.meta;

// mdx:routes/docs/developers/javascript.md
var javascript_exports = {};
__export(javascript_exports, {
  default: () => javascript_default,
  filename: () => filename10,
  headers: () => headers10,
  meta: () => meta13
});
var import_react34 = __toESM(require("react"));
function MDXContent10(props = {}) {
  let _components = Object.assign({
    h1: "h1",
    a: "a",
    span: "span",
    h2: "h2",
    p: "p",
    pre: "pre",
    code: "code",
    h3: "h3"
  }, props.components), { wrapper: MDXLayout } = _components, _content = /* @__PURE__ */ import_react34.default.createElement(import_react34.default.Fragment, null, /* @__PURE__ */ import_react34.default.createElement(_components.h1, { id: "javascript-sdk" }, /* @__PURE__ */ import_react34.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#javascript-sdk" }, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "icon icon-link" })), "JavaScript SDK"), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.h2, { id: "installation" }, /* @__PURE__ */ import_react34.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#installation" }, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "icon icon-link" })), "Installation"), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.p, null, "In your JavaScript project, run the following command:"), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.pre, null, /* @__PURE__ */ import_react34.default.createElement(_components.code, { className: "hljs language-bash" }, `$ npm install --save @progressively/sdk-js
`)), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.h2, { id: "usage" }, /* @__PURE__ */ import_react34.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#usage" }, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "icon icon-link" })), "Usage"), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.p, null, "In your JavaScript code, add the following snippet. Note, this will only work on client-side application."), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.pre, null, /* @__PURE__ */ import_react34.default.createElement(_components.code, { className: "hljs language-javascript" }, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-keyword" }, "import"), " { ", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-title class_" }, "Progressively"), " } ", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-keyword" }, "from"), " ", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-string" }, '"@progressively/sdk-js"'), `;

`, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), ` options = {
  `, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-attr" }, "apiUrl"), ": ", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-string" }, '"your url server"'), `,
  `, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-attr" }, "websocketUrl"), ": ", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-string" }, '"your url server for websockets"'), `,
};

`, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), " sdk = ", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-title class_" }, "Progressively"), ".", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-title function_" }, "init"), "(", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-string" }, '"YOUR_ENVIRONMENT_CLIENT_KEY"'), `, options);
`)), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.h2, { id: "options" }, /* @__PURE__ */ import_react34.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#options" }, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "icon icon-link" })), "Options"), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.h3, { id: "fields" }, /* @__PURE__ */ import_react34.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#fields" }, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "icon icon-link" })), "fields"), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.p, null, "Fields is an option that allows to pass data about your users to create targeting strategies. For instance, you can set an email field, and in Progressively's dashboard, you can create a rule that only targets people that use an expected domain:"), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.pre, null, /* @__PURE__ */ import_react34.default.createElement(_components.code, { className: "hljs language-javascript" }, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-keyword" }, "import"), " { ", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-title class_" }, "Progressively"), " } ", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-keyword" }, "from"), " ", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-string" }, '"@progressively/sdk-js"'), `;

`, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), ` options = {
  `, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-attr" }, "apiUrl"), ": ", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-string" }, '"your url server"'), `,
  `, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-attr" }, "websocketUrl"), ": ", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-string" }, '"your url server for websockets"'), `,
  `, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-attr" }, "fields"), `: {
    `, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-attr" }, "email"), ": ", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-string" }, '"marvin.frachet@something.com"'), `,
  },
};

`, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), " sdk = ", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-title class_" }, "Progressively"), ".", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-title function_" }, "init"), "(", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-string" }, '"YOUR_ENVIRONMENT_CLIENT_KEY"'), `, options);
`)), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.h3, { id: "initialflags" }, /* @__PURE__ */ import_react34.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#initialflags" }, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "icon icon-link" })), "initialFlags"), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.p, null, "The initialFlags option is mostly for server-side rendering purpose. You should not directly use it in your code, except if you are building a server implementation that does not exist in the tool."), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.h2, { id: "methods" }, /* @__PURE__ */ import_react34.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#methods" }, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "icon icon-link" })), "Methods"), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.h3, { id: "loadflags" }, /* @__PURE__ */ import_react34.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#loadflags" }, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "icon icon-link" })), "loadFlags"), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.p, null, "Loads the flag using the browser ", /* @__PURE__ */ import_react34.default.createElement(_components.a, { href: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" }, "fetch API"), "."), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.pre, null, /* @__PURE__ */ import_react34.default.createElement(_components.code, { className: "hljs language-javascript" }, "sdk.", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-title function_" }, "loadFlags"), `();
`)), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.h3, { id: "onflagupdate" }, /* @__PURE__ */ import_react34.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#onflagupdate" }, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "icon icon-link" })), "onFlagUpdate"), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.p, null, "Listens to flags update using ", /* @__PURE__ */ import_react34.default.createElement(_components.a, { href: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" }, "WebSockets"), "."), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.p, null, "The second argument is optional and aims to identify the user. If not set, the user will be considered anonymous and Progressively will generate an ID for them."), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.pre, null, /* @__PURE__ */ import_react34.default.createElement(_components.code, { className: "hljs language-javascript" }, "sdk.", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-title function_" }, "onFlagUpdate"), "(", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-function" }, "(", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-params" }, "nextFlags"), ") =>"), ` {}, optionalUserId);
`)), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.h3, { id: "disconnect" }, /* @__PURE__ */ import_react34.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#disconnect" }, /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "icon icon-link" })), "disconnect"), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.p, null, "Closes the websocket connection."), `
`, /* @__PURE__ */ import_react34.default.createElement(_components.pre, null, /* @__PURE__ */ import_react34.default.createElement(_components.code, { className: "hljs language-javascript" }, "sdk.", /* @__PURE__ */ import_react34.default.createElement(_components.span, { className: "hljs-title function_" }, "disconnect"), `();
`)));
  return MDXLayout ? /* @__PURE__ */ import_react34.default.createElement(MDXLayout, { ...props }, _content) : _content;
}
var javascript_default = MDXContent10, filename10 = "javascript.md", headers10 = typeof attributes < "u" && attributes.headers, meta13 = typeof attributes < "u" && attributes.meta;

// app/routes/docs/developers/examples.tsx
var examples_exports = {};
__export(examples_exports, {
  default: () => examples_default
});
var import_react35 = require("react"), import_io52 = require("react-icons/io5"), import_fa = require("react-icons/fa"), import_si = require("react-icons/si");

// app/components/icons/AstroIcon.tsx
var import_jsx_runtime38 = require("react/jsx-runtime"), AstroIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
  "svg",
  {
    width: "1280",
    height: "1280",
    viewBox: "0 0 1280 1280",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
        "path",
        {
          "fill-rule": "evenodd",
          "clip-rule": "evenodd",
          d: "M815.039 94.6439C824.758 106.709 829.714 122.99 839.626 155.553L1056.17 866.901C976.107 825.368 889.072 795.413 797.281 779.252L656.29 302.798C653.983 295.002 646.822 289.654 638.693 289.654C630.542 289.654 623.368 295.03 621.08 302.853L481.795 779.011C389.579 795.1 302.146 825.109 221.741 866.793L439.347 155.388L439.348 155.388C449.291 122.882 454.262 106.629 463.982 94.5853C472.562 83.9531 483.723 75.6958 496.4 70.6002C510.76 64.8284 527.756 64.8284 561.749 64.8284H717.174C751.212 64.8284 768.23 64.8284 782.603 70.6123C795.292 75.7184 806.459 83.9923 815.039 94.6439Z",
          fill: "url(#paint0_linear_709_110)"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
        "path",
        {
          "fill-rule": "evenodd",
          "clip-rule": "evenodd",
          d: "M840.951 900.754C805.253 931.279 734.002 952.097 651.929 952.097C551.197 952.097 466.767 920.737 444.363 878.561C436.354 902.732 434.558 930.396 434.558 948.068C434.558 948.068 429.281 1034.84 489.636 1095.2C489.636 1063.86 515.042 1038.46 546.381 1038.46C600.097 1038.46 600.036 1085.32 599.987 1123.34C599.986 1124.48 599.984 1125.61 599.984 1126.73C599.984 1184.44 635.255 1233.91 685.416 1254.77C677.924 1239.36 673.721 1222.05 673.721 1203.77C673.721 1148.73 706.034 1128.23 743.588 1104.41L743.588 1104.41C773.469 1085.46 806.668 1064.41 829.548 1022.17C841.486 1000.13 848.265 974.893 848.265 948.068C848.265 931.573 845.702 915.676 840.951 900.754Z",
          fill: "#FF5D01"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
        "path",
        {
          "fill-rule": "evenodd",
          "clip-rule": "evenodd",
          d: "M840.951 900.754C805.253 931.279 734.002 952.097 651.929 952.097C551.197 952.097 466.767 920.737 444.363 878.561C436.354 902.732 434.558 930.396 434.558 948.068C434.558 948.068 429.281 1034.84 489.636 1095.2C489.636 1063.86 515.042 1038.46 546.381 1038.46C600.097 1038.46 600.036 1085.32 599.987 1123.34C599.986 1124.48 599.984 1125.61 599.984 1126.73C599.984 1184.44 635.255 1233.91 685.416 1254.77C677.924 1239.36 673.721 1222.05 673.721 1203.77C673.721 1148.73 706.034 1128.23 743.588 1104.41L743.588 1104.41C773.469 1085.46 806.668 1064.41 829.548 1022.17C841.486 1000.13 848.265 974.893 848.265 948.068C848.265 931.573 845.702 915.676 840.951 900.754Z",
          fill: "url(#paint1_linear_709_110)"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("defs", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
          "linearGradient",
          {
            id: "paint0_linear_709_110",
            x1: "882.997",
            y1: "27.1132",
            x2: "638.955",
            y2: "866.902",
            gradientUnits: "userSpaceOnUse",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("stop", { "stop-color": "#000014" }),
              /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("stop", { offset: "1", "stop-color": "#150426" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
          "linearGradient",
          {
            id: "paint1_linear_709_110",
            x1: "1001.68",
            y1: "652.45",
            x2: "790.326",
            y2: "1094.91",
            gradientUnits: "userSpaceOnUse",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("stop", { "stop-color": "#FF1639" }),
              /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("stop", { offset: "1", "stop-color": "#FF1639", "stop-opacity": "0" })
            ]
          }
        )
      ] })
    ]
  }
);

// app/components/icons/RemixIcon.tsx
var import_jsx_runtime39 = require("react/jsx-runtime"), RemixIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(
  "svg",
  {
    width: "800",
    height: "800",
    viewBox: "100 100 600 600",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("g", { filter: "url(#filter0_dd_126_53)", children: [
        /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
          "path",
          {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M587.947 527.768C592.201 582.418 592.201 608.036 592.201 636H465.756C465.756 629.909 465.865 624.337 465.975 618.687C466.317 601.123 466.674 582.807 463.828 545.819C460.067 491.667 436.748 479.634 393.871 479.634H355.883H195V381.109H399.889C454.049 381.109 481.13 364.633 481.13 321.011C481.13 282.654 454.049 259.41 399.889 259.41H195V163H422.456C545.069 163 606 220.912 606 313.42C606 382.613 563.123 427.739 505.201 435.26C554.096 445.037 582.681 472.865 587.947 527.768Z",
            fill: "#E8F2FF"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
          "path",
          {
            d: "M195 636V562.553H328.697C351.029 562.553 355.878 579.116 355.878 588.994V636H195Z",
            fill: "#E8F2FF"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(
        "filter",
        {
          id: "filter0_dd_126_53",
          x: "131",
          y: "99",
          width: "539",
          height: "601",
          filterUnits: "userSpaceOnUse",
          "color-interpolation-filters": "sRGB",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
              "feColorMatrix",
              {
                in: "SourceAlpha",
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                result: "hardAlpha"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("feOffset", {}),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("feGaussianBlur", { stdDeviation: "28" }),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("feComposite", { in2: "hardAlpha", operator: "out" }),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
              "feColorMatrix",
              {
                type: "matrix",
                values: "0 0 0 0 0.223529 0 0 0 0 0.572549 0 0 0 0 1 0 0 0 1 0"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
              "feBlend",
              {
                mode: "normal",
                in2: "BackgroundImageFix",
                result: "effect1_dropShadow_126_53"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
              "feColorMatrix",
              {
                in: "SourceAlpha",
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                result: "hardAlpha"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("feOffset", {}),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("feGaussianBlur", { stdDeviation: "32" }),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("feComposite", { in2: "hardAlpha", operator: "out" }),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
              "feColorMatrix",
              {
                type: "matrix",
                values: "0 0 0 0 0.223529 0 0 0 0 0.572549 0 0 0 0 1 0 0 0 0.9 0"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
              "feBlend",
              {
                mode: "normal",
                in2: "effect1_dropShadow_126_53",
                result: "effect2_dropShadow_126_53"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
              "feBlend",
              {
                mode: "normal",
                in: "SourceGraphic",
                in2: "effect2_dropShadow_126_53",
                result: "shape"
              }
            )
          ]
        }
      ) })
    ]
  }
);

// app/routes/docs/developers/examples.tsx
var import_jsx_runtime40 = require("react/jsx-runtime"), Example2 = ({ title: title3, href, icon }) => {
  let linkRef = (0, import_react35.useRef)(null);
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
    "div",
    {
      tabIndex: -1,
      className: "relative z-10 bg-white hover:bg-gray-50 active:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-slate-600 rounded p-4 py-8 h-full relative drop-shadow cursor-pointer",
      onClick: () => {
        var _a;
        return (_a = linkRef == null ? void 0 : linkRef.current) == null ? void 0 : _a.click();
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { className: "text-4xl", children: icon }),
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("h2", { className: "text-base font-semibold mb-0 py-2", children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
          "a",
          {
            href,
            ref: linkRef,
            className: "!text-indigo-700 dark:!text-slate-100",
            target: "_blank",
            rel: "noopener noreferrer",
            children: title3
          }
        ) })
      ]
    }
  );
}, ExamplePage = () => /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", { children: [
  /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("h1", { children: "Examples" }),
  /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("p", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
      "a",
      {
        href: "https://github.com/progressively-crew/progressively/tree/master/.github/workflows",
        target: "_blank",
        rel: "noopener noreferrer",
        children: [
          "Progressively's pipeline",
          " "
        ]
      }
    ),
    "owns a bunch of E2E tests running on applications built with the different SDKs. They can be used as minimal examples of Progressively usage."
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("section", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("h2", { children: "Frontend" }),
    /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
        Example2,
        {
          icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_io52.IoLogoVercel, {}),
          title: "Next.js",
          href: "https://github.com/progressively-crew/progressively/tree/master/example/nextjs"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
        Example2,
        {
          icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(RemixIcon, { className: "h-9 w-9" }),
          title: "Remix",
          href: "https://github.com/progressively-crew/progressively/blob/master/packages/documentation/app/root.tsx#L86"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
        Example2,
        {
          icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_si.SiSvelte, {}),
          title: "Svelte",
          href: "https://github.com/progressively-crew/progressively/tree/master/example/svelte"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
        Example2,
        {
          icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(AstroIcon, { className: "h-9 w-9" }),
          title: "Astro",
          href: "https://github.com/progressively-crew/progressively/tree/master/example/astro"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
        Example2,
        {
          icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_fa.FaReact, { style: { color: "#61DBFB" } }),
          title: "CRA",
          href: "https://github.com/progressively-crew/progressively/tree/master/example/cra"
        }
      )
    ] })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("section", { className: "pt-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("h2", { children: "Backend" }),
    /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
        Example2,
        {
          icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_io52.IoLogoNodejs, { style: { color: "#3c873a" } }),
          title: "Node.js",
          href: "https://github.com/progressively-crew/progressively/tree/master/example/node"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
        Example2,
        {
          icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_fa.FaPhp, { style: { color: "#232531" } }),
          title: "PHP",
          href: "https://github.com/progressively-crew/sdk-php"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
        Example2,
        {
          icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_si.SiGoland, { style: { color: "#29BEB0" } }),
          title: "Go",
          href: "https://github.com/progressively-crew/sdk-go"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
        Example2,
        {
          icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_fa.FaPython, { style: { color: "#4B8BBE" } }),
          title: "Python",
          href: "https://github.com/progressively-crew/sdk-python"
        }
      )
    ] })
  ] })
] }), examples_default = ExamplePage;

// mdx:routes/docs/developers/node-js.md
var node_js_exports = {};
__export(node_js_exports, {
  default: () => node_js_default,
  filename: () => filename11,
  headers: () => headers11,
  meta: () => meta14
});
var import_react36 = __toESM(require("react"));
function MDXContent11(props = {}) {
  let _components = Object.assign({
    h1: "h1",
    a: "a",
    span: "span",
    h2: "h2",
    p: "p",
    pre: "pre",
    code: "code",
    h3: "h3"
  }, props.components), { wrapper: MDXLayout } = _components, _content = /* @__PURE__ */ import_react36.default.createElement(import_react36.default.Fragment, null, /* @__PURE__ */ import_react36.default.createElement(_components.h1, { id: "nodejs-sdk" }, /* @__PURE__ */ import_react36.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#nodejs-sdk" }, /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "icon icon-link" })), "Node.js SDK"), `
`, /* @__PURE__ */ import_react36.default.createElement(_components.h2, { id: "installation" }, /* @__PURE__ */ import_react36.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#installation" }, /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "icon icon-link" })), "Installation"), `
`, /* @__PURE__ */ import_react36.default.createElement(_components.p, null, "In your Node.js project, run the following command:"), `
`, /* @__PURE__ */ import_react36.default.createElement(_components.pre, null, /* @__PURE__ */ import_react36.default.createElement(_components.code, { className: "hljs language-bash" }, `$ npm install --save @progressively/sdk-node
`)), `
`, /* @__PURE__ */ import_react36.default.createElement(_components.h2, { id: "usage" }, /* @__PURE__ */ import_react36.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#usage" }, /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "icon icon-link" })), "Usage"), `
`, /* @__PURE__ */ import_react36.default.createElement(_components.p, null, "In your Node.js code, add the following snippet. Note, this will only work on server-side application."), `
`, /* @__PURE__ */ import_react36.default.createElement(_components.pre, null, /* @__PURE__ */ import_react36.default.createElement(_components.code, { className: "hljs language-javascript" }, /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), " { ", /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-title class_" }, "Progressively"), " } = ", /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-built_in" }, "require"), "(", /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-string" }, '"@progressively/sdk-node"'), `);

`, /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), ` options = {
  `, /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-attr" }, "apiUrl"), ": ", /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-string" }, '"your url server"'), `,
};

`, /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), " sdk = ", /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-title class_" }, "Progressively"), ".", /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-title function_" }, "init"), "(", /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-string" }, '"YOUR_ENVIRONMENT_CLIENT_KEY"'), `, options);
`)), `
`, /* @__PURE__ */ import_react36.default.createElement(_components.h2, { id: "options" }, /* @__PURE__ */ import_react36.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#options" }, /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "icon icon-link" })), "Options"), `
`, /* @__PURE__ */ import_react36.default.createElement(_components.h3, { id: "fields" }, /* @__PURE__ */ import_react36.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#fields" }, /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "icon icon-link" })), "fields"), `
`, /* @__PURE__ */ import_react36.default.createElement(_components.p, null, "Fields is an option that allows to pass data about your users to create targeting strategies. For instance, you can set an email field, and in Progressively's dashboard, you can create a rule that only targets people that use an expected domain:"), `
`, /* @__PURE__ */ import_react36.default.createElement(_components.pre, null, /* @__PURE__ */ import_react36.default.createElement(_components.code, { className: "hljs language-javascript" }, /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), " { ", /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-title class_" }, "Progressively"), " } = ", /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-built_in" }, "require"), "(", /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-string" }, '"@progressively/sdk-node"'), `);

`, /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), ` options = {
  `, /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-attr" }, "apiUrl"), ": ", /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-string" }, '"your url server"'), `,
  `, /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-attr" }, "fields"), `: {
    `, /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-attr" }, "email"), ": ", /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-string" }, '"marvin.frachet@something.com"'), `,
  },
};

`, /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), " sdk = ", /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-title class_" }, "Progressively"), ".", /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-title function_" }, "init"), "(", /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-string" }, '"YOUR_ENVIRONMENT_CLIENT_KEY"'), `, options);
`)), `
`, /* @__PURE__ */ import_react36.default.createElement(_components.h2, { id: "methods" }, /* @__PURE__ */ import_react36.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#methods" }, /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "icon icon-link" })), "Methods"), `
`, /* @__PURE__ */ import_react36.default.createElement(_components.h3, { id: "loadflags" }, /* @__PURE__ */ import_react36.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#loadflags" }, /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "icon icon-link" })), "loadFlags"), `
`, /* @__PURE__ */ import_react36.default.createElement(_components.p, null, "Loads the flag on the server."), `
`, /* @__PURE__ */ import_react36.default.createElement(_components.pre, null, /* @__PURE__ */ import_react36.default.createElement(_components.code, { className: "hljs language-javascript" }, "sdk.", /* @__PURE__ */ import_react36.default.createElement(_components.span, { className: "hljs-title function_" }, "loadFlags"), `();
`)));
  return MDXLayout ? /* @__PURE__ */ import_react36.default.createElement(MDXLayout, { ...props }, _content) : _content;
}
var node_js_default = MDXContent11, filename11 = "node-js.md", headers11 = typeof attributes < "u" && attributes.headers, meta14 = typeof attributes < "u" && attributes.meta;

// mdx:routes/docs/developers/python.md
var python_exports = {};
__export(python_exports, {
  default: () => python_default,
  filename: () => filename12,
  headers: () => headers12,
  meta: () => meta15
});
var import_react37 = __toESM(require("react"));
function MDXContent12(props = {}) {
  let _components = Object.assign({
    h1: "h1",
    a: "a",
    span: "span",
    h2: "h2",
    p: "p",
    pre: "pre",
    code: "code",
    h3: "h3"
  }, props.components), { wrapper: MDXLayout } = _components, _content = /* @__PURE__ */ import_react37.default.createElement(import_react37.default.Fragment, null, /* @__PURE__ */ import_react37.default.createElement(_components.h1, { id: "python-sdk" }, /* @__PURE__ */ import_react37.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#python-sdk" }, /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "icon icon-link" })), "Python SDK"), `
`, /* @__PURE__ */ import_react37.default.createElement(_components.h2, { id: "installation" }, /* @__PURE__ */ import_react37.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#installation" }, /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "icon icon-link" })), "Installation"), `
`, /* @__PURE__ */ import_react37.default.createElement(_components.p, null, "In your Python project, run the following:"), `
`, /* @__PURE__ */ import_react37.default.createElement(_components.pre, null, /* @__PURE__ */ import_react37.default.createElement(_components.code, { className: "hljs language-sh" }, `$ pip install sdk-progressively
`)), `
`, /* @__PURE__ */ import_react37.default.createElement(_components.h2, { id: "usage" }, /* @__PURE__ */ import_react37.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#usage" }, /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "icon icon-link" })), "Usage"), `
`, /* @__PURE__ */ import_react37.default.createElement(_components.p, null, "In your Python code, add the following snippet."), `
`, /* @__PURE__ */ import_react37.default.createElement(_components.pre, null, /* @__PURE__ */ import_react37.default.createElement(_components.code, { className: "hljs language-py" }, /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "hljs-keyword" }, "from"), " sdk.progressively ", /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "hljs-keyword" }, "import"), ` Progressively

sdk = Progressively.create(`, /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "hljs-string" }, '"YOUR_ENVIRONMENT_KEY"'), ", ", /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "hljs-string" }, '"http://localhost:4000"'), `)

`, /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "hljs-keyword" }, "if"), " (sdk.evaluate(", /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "hljs-string" }, '"newHomepage"'), `)):
	`, /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "hljs-comment" }, "# flag is true, do things"), `
`, /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "hljs-keyword" }, "else"), `:
	`, /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "hljs-comment" }, "# flag is false, do things"), `
`)), `
`, /* @__PURE__ */ import_react37.default.createElement(_components.h2, { id: "options" }, /* @__PURE__ */ import_react37.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#options" }, /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "icon icon-link" })), "Options"), `
`, /* @__PURE__ */ import_react37.default.createElement(_components.h3, { id: "fields" }, /* @__PURE__ */ import_react37.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#fields" }, /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "icon icon-link" })), "fields"), `
`, /* @__PURE__ */ import_react37.default.createElement(_components.p, null, "Fields is an option that allows to pass data about your users to create targeting strategies. For instance, you can set an email field, and in Progressively's dashboard, you can create a rule that only targets people that use an expected domain:"), `
`, /* @__PURE__ */ import_react37.default.createElement(_components.pre, null, /* @__PURE__ */ import_react37.default.createElement(_components.code, { className: "hljs language-python" }, "fields = {", /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "hljs-string" }, '"email"'), ": ", /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "hljs-string" }, '"john.doe@email.com"'), ", ", /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "hljs-string" }, '"id"'), ": ", /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "hljs-number" }, "1"), `}
sdk = Progressively.create(`, /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "hljs-string" }, '"YOUR_ENVIRONMENT_KEY"'), ", ", /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "hljs-string" }, '"http://localhost:4000"'), `, fields)
`)), `
`, /* @__PURE__ */ import_react37.default.createElement(_components.h2, { id: "methods" }, /* @__PURE__ */ import_react37.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#methods" }, /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "icon icon-link" })), "Methods"), `
`, /* @__PURE__ */ import_react37.default.createElement(_components.h3, { id: "evaluate" }, /* @__PURE__ */ import_react37.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#evaluate" }, /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "icon icon-link" })), "evaluate"), `
`, /* @__PURE__ */ import_react37.default.createElement(_components.p, null, "Get the evaluated version of a feature flag (string variant or boolean value)."), `
`, /* @__PURE__ */ import_react37.default.createElement(_components.pre, null, /* @__PURE__ */ import_react37.default.createElement(_components.code, { className: "hljs language-py" }, "sdk.evaluate(", /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "hljs-string" }, '"theFlagKey"'), `)
`)), `
`, /* @__PURE__ */ import_react37.default.createElement(_components.h3, { id: "loadflags" }, /* @__PURE__ */ import_react37.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#loadflags" }, /* @__PURE__ */ import_react37.default.createElement(_components.span, { className: "icon icon-link" })), "loadFlags"), `
`, /* @__PURE__ */ import_react37.default.createElement(_components.p, null, "Refresh the flags by hitting the API again."), `
`, /* @__PURE__ */ import_react37.default.createElement(_components.pre, null, /* @__PURE__ */ import_react37.default.createElement(_components.code, { className: "hljs language-py" }, `sdk.loadFlags()
`)));
  return MDXLayout ? /* @__PURE__ */ import_react37.default.createElement(MDXLayout, { ...props }, _content) : _content;
}
var python_default = MDXContent12, filename12 = "python.md", headers12 = typeof attributes < "u" && attributes.headers, meta15 = typeof attributes < "u" && attributes.meta;

// mdx:routes/docs/features/insights.md
var insights_exports = {};
__export(insights_exports, {
  default: () => insights_default,
  filename: () => filename13,
  headers: () => headers13,
  meta: () => meta16
});
var import_react38 = __toESM(require("react"));
function MDXContent13(props = {}) {
  let _components = Object.assign({
    h1: "h1",
    a: "a",
    span: "span",
    p: "p",
    ul: "ul",
    li: "li",
    h2: "h2",
    code: "code",
    strong: "strong"
  }, props.components), { wrapper: MDXLayout } = _components, _content = /* @__PURE__ */ import_react38.default.createElement(import_react38.default.Fragment, null, /* @__PURE__ */ import_react38.default.createElement(_components.h1, { id: "insights" }, /* @__PURE__ */ import_react38.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#insights" }, /* @__PURE__ */ import_react38.default.createElement(_components.span, { className: "icon icon-link" })), "Insights"), `
`, /* @__PURE__ */ import_react38.default.createElement(_components.p, null, "Progressively is privacy first. We don't have access to anything related to the users."), `
`, /* @__PURE__ */ import_react38.default.createElement(_components.p, null, "Knowing that, we have built a simple analytic system based on 2 informations:"), `
`, /* @__PURE__ */ import_react38.default.createElement(_components.ul, null, `
`, /* @__PURE__ */ import_react38.default.createElement(_components.li, null, "The number of time a flag has been evaluated"), `
`, /* @__PURE__ */ import_react38.default.createElement(_components.li, null, "Custom metrics"), `
`), `
`, /* @__PURE__ */ import_react38.default.createElement(_components.h2, { id: "number-of-time-a-flag-has-been-evaluated" }, /* @__PURE__ */ import_react38.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#number-of-time-a-flag-has-been-evaluated" }, /* @__PURE__ */ import_react38.default.createElement(_components.span, { className: "icon icon-link" })), "Number of time a flag has been evaluated"), `
`, /* @__PURE__ */ import_react38.default.createElement(_components.p, null, "A flag evaluation corresponds to the resolution of the value provided to the flag from Progressively's server. It basically determines whether the user will resolve the ", /* @__PURE__ */ import_react38.default.createElement(_components.code, null, "true"), " or ", /* @__PURE__ */ import_react38.default.createElement(_components.code, null, "false"), " variation (or the associate variant when using ", /* @__PURE__ */ import_react38.default.createElement(_components.a, { href: "/features/single-multi-variants" }, "Single & Multi variants"), ")."), `
`, /* @__PURE__ */ import_react38.default.createElement(_components.p, null, /* @__PURE__ */ import_react38.default.createElement(_components.strong, null, "This happens when the SDK fetches the flag or when the users receive a websocket update.")), `
`, /* @__PURE__ */ import_react38.default.createElement(_components.p, null, "This is something that is anonymously recorded."), `
`, /* @__PURE__ */ import_react38.default.createElement(_components.h2, { id: "custom-metrics" }, /* @__PURE__ */ import_react38.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#custom-metrics" }, /* @__PURE__ */ import_react38.default.createElement(_components.span, { className: "icon icon-link" })), "Custom metrics"), `
`, /* @__PURE__ */ import_react38.default.createElement(_components.p, null, "You can create simple custom metrics in the dashboard and (optionnally) attach them to variants when using ", /* @__PURE__ */ import_react38.default.createElement(_components.a, { href: "/features/single-multi-variants" }, "Single & Multi variants"), "."), `
`, /* @__PURE__ */ import_react38.default.createElement(_components.p, null, "This way, we are able to naively compute the ratio between the variant evaluated and the metric hits recorded to help you take decisions."));
  return MDXLayout ? /* @__PURE__ */ import_react38.default.createElement(MDXLayout, { ...props }, _content) : _content;
}
var insights_default = MDXContent13, filename13 = "insights.md", headers13 = typeof attributes < "u" && attributes.headers, meta16 = typeof attributes < "u" && attributes.meta;

// mdx:routes/docs/developers/react.md
var react_exports = {};
__export(react_exports, {
  default: () => react_default,
  filename: () => filename14,
  headers: () => headers14,
  meta: () => meta17
});
var import_react39 = __toESM(require("react"));
function MDXContent14(props = {}) {
  let _components = Object.assign({
    h1: "h1",
    a: "a",
    span: "span",
    h2: "h2",
    p: "p",
    pre: "pre",
    code: "code",
    h3: "h3"
  }, props.components), { wrapper: MDXLayout } = _components, _content = /* @__PURE__ */ import_react39.default.createElement(import_react39.default.Fragment, null, /* @__PURE__ */ import_react39.default.createElement(_components.h1, { id: "react-sdk" }, /* @__PURE__ */ import_react39.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#react-sdk" }, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "icon icon-link" })), "React SDK"), `
`, /* @__PURE__ */ import_react39.default.createElement(_components.h2, { id: "installation" }, /* @__PURE__ */ import_react39.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#installation" }, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "icon icon-link" })), "Installation"), `
`, /* @__PURE__ */ import_react39.default.createElement(_components.p, null, "In your React project, run the following command:"), `
`, /* @__PURE__ */ import_react39.default.createElement(_components.pre, null, /* @__PURE__ */ import_react39.default.createElement(_components.code, { className: "hljs language-bash" }, `$ npm install --save @progressively/react @progressively/server-side
`)), `
`, /* @__PURE__ */ import_react39.default.createElement(_components.h2, { id: "usage-client-only" }, /* @__PURE__ */ import_react39.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#usage-client-only" }, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "icon icon-link" })), "Usage client (only)"), `
`, /* @__PURE__ */ import_react39.default.createElement(_components.p, null, "In your React code, add the following snippet:"), `
`, /* @__PURE__ */ import_react39.default.createElement(_components.pre, null, /* @__PURE__ */ import_react39.default.createElement(_components.code, { className: "hljs language-javascript" }, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "import"), " { ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-title class_" }, "ProgressivelyProvider"), ", useFlags } ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "from"), " ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-string" }, '"@progressively/react"'), `;

`, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), " ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-title function_" }, "FlaggedComponent"), " = (", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-params" }), `) => {
  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), " { flags } = ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-title function_" }, "useFlags"), `();
  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-comment" }, "/* ... */"), `
};

`, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), ` progressivelyProps = {
  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "clientKey"), ": ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-string" }, '"YOUR_ENVIRONMENT_CLIENT_KEY"'), `,
  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "apiUrl"), ": ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-string" }, '"your url server"'), `,
  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "websocketUrl"), ": ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-string" }, '"your url server for websockets"'), `,
};

`, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), " ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-title function_" }, "YourPage"), " = (", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-params" }), `) => {
  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "return"), ` (
    `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "xml" }, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-tag" }, "<", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-name" }, "ProgressivelyProvider"), " {", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "...progressivelyProps"), "}>"), `
      `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-tag" }, "<", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-name" }, "FlaggedComponent"), " />"), `
    `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-tag" }, "</", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-name" }, "ProgressivelyProvider"), ">")), `
  );
};
`)), `
`, /* @__PURE__ */ import_react39.default.createElement(_components.h2, { id: "usage-with-ssr" }, /* @__PURE__ */ import_react39.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#usage-with-ssr" }, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "icon icon-link" })), "Usage with SSR"), `
`, /* @__PURE__ */ import_react39.default.createElement(_components.p, null, "In your React code, add the following snippet"), `
`, /* @__PURE__ */ import_react39.default.createElement(_components.pre, null, /* @__PURE__ */ import_react39.default.createElement(_components.code, { className: "hljs language-javascript" }, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "import"), " { ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-title class_" }, "ProgressivelyProvider"), ", useFlags } ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "from"), " ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-string" }, '"@progressively/react"'), `;
`, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "import"), " { getProgressivelyData } ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "from"), " ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-string" }, '"@progressively/server-side"'), `;

`, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), " ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-title function_" }, "FlaggedComponent"), " = (", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-params" }), `) => {
  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), " { flags } = ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-title function_" }, "useFlags"), `();
  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-comment" }, "/* ... */"), `
};

`, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), " ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-title function_" }, "YourPage"), " = (", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-params" }, "{ progressivelyProps }"), `) => {
  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "return"), ` (
    `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "xml" }, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-tag" }, "<", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-name" }, "ProgressivelyProvider"), " {", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "...progressivelyProps"), "}>"), `
      `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-tag" }, "<", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-name" }, "FlaggedComponent"), " />"), `
    `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-tag" }, "</", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-name" }, "ProgressivelyProvider"), ">")), `
  );
};

`, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "export"), " ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "async"), " ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "function"), " ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-title function_" }, "getServerSideProps"), "(", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-params" }, `{
  req,
  res,
}: {
  req: Request,
  res: any,
}`), `) {
  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), " { data, response } = ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "await"), " ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-title function_" }, "getProgressivelyData"), "(", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-string" }, '"valid-sdk-key"'), `, {
    `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "websocketUrl"), ": ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-string" }, '"ws://localhost:4000"'), `,
    `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "apiUrl"), ": ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-string" }, '"http://localhost:4000"'), `,
    `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "fields"), `: {
      `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "id"), `: userIdFromNextjsCookie,
    },
  });

  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "return"), ` {
    `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "props"), `: {
      `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "progressivelyProps"), `: data,
    },
  };
}
`)), `
`, /* @__PURE__ */ import_react39.default.createElement(_components.h2, { id: "usage-with-ssr-and-sticky-user-id" }, /* @__PURE__ */ import_react39.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#usage-with-ssr-and-sticky-user-id" }, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "icon icon-link" })), "Usage with SSR and sticky user id"), `
`, /* @__PURE__ */ import_react39.default.createElement(_components.p, null, "When using Progressively with a rollout percentage that is not 100%, you want your users to have a consistent experimence. In order to do so, Progressively needs a way to stick a variant to a user id."), `
`, /* @__PURE__ */ import_react39.default.createElement(_components.p, null, "The handling of creating IDs for anonymous users is done by Progressively under the hood. However, we need an extra step on your side to make it work properly: you have to set a cookie and forward the cookie to the Progressively instance:"), `
`, /* @__PURE__ */ import_react39.default.createElement(_components.pre, null, /* @__PURE__ */ import_react39.default.createElement(_components.code, { className: "hljs language-javascript" }, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "import"), " { ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-title class_" }, "ProgressivelyProvider"), ", useFlags } ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "from"), " ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-string" }, '"@progressively/react"'), `;
`, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "import"), " { getProgressivelyData } ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "from"), " ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-string" }, '"@progressively/server-side"'), `;

`, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), " ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-title function_" }, "FlaggedComponent"), " = (", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-params" }), `) => {
  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), " { flags } = ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-title function_" }, "useFlags"), `();
  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-comment" }, "/* ... */"), `
};

`, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), " ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-title function_" }, "YourPage"), " = (", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-params" }, "{ progressivelyProps }"), `) => {
  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "return"), ` (
    `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "xml" }, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-tag" }, "<", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-name" }, "ProgressivelyProvider"), " {", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "...progressivelyProps"), "}>"), `
      `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-tag" }, "<", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-name" }, "FlaggedComponent"), " />"), `
    `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-tag" }, "</", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-name" }, "ProgressivelyProvider"), ">")), `
  );
};

`, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "export"), " ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "async"), " ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "function"), " ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-title function_" }, "getServerSideProps"), "(", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-params" }, `{
  req,
  res,
}: {
  req: Request;
  res: any;
}`), `) {
  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), ` userIdFromNextjsCookie =
    (req `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "as"), " any).", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-property" }, "cookies"), "?.[", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-string" }, '"progressively-id"'), "] || ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-literal" }, "null"), `;

  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), " { data, response } = ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "await"), " ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-title function_" }, "getProgressivelyData"), "(", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-string" }, '"valid-sdk-key"'), `, {
    `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "websocketUrl"), ": ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-string" }, '"ws://localhost:4000"'), `,
    `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "apiUrl"), ": ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-string" }, '"http://localhost:4000"'), `,
    `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "fields"), `: {
      `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "id"), `: userIdFromNextjsCookie,
    },
  });

  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), " progressivelyCookie = response?.", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-property" }, "headers"), "?.", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-title function_" }, "get"), "(", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-string" }, '"set-cookie"'), `);
  res.`, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-title function_" }, "setHeader"), "(", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-string" }, '"set-cookie"'), `, progressivelyCookie);

  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "return"), ` {
    `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "props"), `: {
      `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "progressivelyProps"), `: data,
    },
  };
}

`)), `
`, /* @__PURE__ */ import_react39.default.createElement(_components.h2, { id: "options" }, /* @__PURE__ */ import_react39.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#options" }, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "icon icon-link" })), "Options"), `
`, /* @__PURE__ */ import_react39.default.createElement(_components.h3, { id: "fields" }, /* @__PURE__ */ import_react39.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#fields" }, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "icon icon-link" })), "fields"), `
`, /* @__PURE__ */ import_react39.default.createElement(_components.p, null, "Fields is an option that allows to pass data about your users to create targeting strategies. For instance, you can set an email field, and in Progressively's dashboard, you can create a rule that only targets people that use an expected domain."), `
`, /* @__PURE__ */ import_react39.default.createElement(_components.pre, null, /* @__PURE__ */ import_react39.default.createElement(_components.code, { className: "hljs language-javascript" }, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-keyword" }, "const"), ` progressivelyProps = {
  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "clientKey"), ": ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-string" }, '"YOUR_ENVIRONMENT_CLIENT_KEY"'), `,
  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "apiUrl"), ": ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-string" }, '"your url server"'), `,
  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "websocketUrl"), ": ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-string" }, '"your url server for websockets"'), `,
  `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "fields"), `: {
    `, /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-attr" }, "email"), ": ", /* @__PURE__ */ import_react39.default.createElement(_components.span, { className: "hljs-string" }, '"your-user@email.com"'), `,
  },
};
`)));
  return MDXLayout ? /* @__PURE__ */ import_react39.default.createElement(MDXLayout, { ...props }, _content) : _content;
}
var react_default = MDXContent14, filename14 = "react.md", headers14 = typeof attributes < "u" && attributes.headers, meta17 = typeof attributes < "u" && attributes.meta;

// mdx:routes/docs/introduction/why.mdx
var why_exports = {};
__export(why_exports, {
  default: () => why_default,
  filename: () => filename15,
  headers: () => headers15,
  meta: () => meta18
});
var import_react41 = __toESM(require("react"));

// app/modules/why/WhyCards.tsx
var import_react40 = require("react"), import_io53 = require("react-icons/io5"), import_jsx_runtime41 = require("react/jsx-runtime"), WhyCard = ({ title: title3, children }) => {
  let buttonRef = (0, import_react40.useRef)(null), [expanded, setExpanded] = (0, import_react40.useState)(!1), id = (0, import_react40.useId)(), triggerId = `trigger-${id}`, sectionId = `section-${id}`, toggle = () => setExpanded((s) => !s);
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(
    "div",
    {
      className: "relative z-10 bg-white hover:bg-gray-50 active:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-slate-600 rounded p-4 drop-shadow cursor-pointer",
      tabIndex: -1,
      onClick: () => {
        var _a;
        return (_a = buttonRef == null ? void 0 : buttonRef.current) == null ? void 0 : _a.click();
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)("div", { className: "flex flex-row gap-4 items-center justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("h2", { className: "m-0", children: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
            "button",
            {
              ref: buttonRef,
              className: "text-base font-semibold mb-0",
              onClick: (e) => {
                e.stopPropagation(), toggle();
              },
              id: triggerId,
              "aria-controls": sectionId,
              "aria-expanded": expanded,
              children: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("span", { className: "!text-indigo-700 dark:!text-slate-100", children: title3 })
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
            "span",
            {
              className: `border border-gray-200 rounded-full text-gray-400 p-1 h-6 w-6 flex items-center transition-all ${expanded ? "rotate-180" : ""}`,
              children: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(import_io53.IoChevronDownOutline, { "aria-hidden": !0, className: "mt-[2px]" })
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
          "div",
          {
            id: sectionId,
            role: "region",
            "aria-labelledby": triggerId,
            className: "text-gray-600 dark:text-slate-300 text-sm dark:text-slate-100",
            hidden: !expanded,
            children
          }
        )
      ]
    }
  );
}, WhyCards = () => /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)("div", { className: "flex gap-4 flex-col", children: [
  /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(WhyCard, { title: "Progressively is smaller than its competitors", children: [
    /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)("p", { children: [
      "Third party tools used on the frontend are known to slow down websites and applications. Having heavy libraries means there is more code to download, parse and execute in the browser.",
      " "
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("p", { children: "By shifting most of the computations to the server, Progressively is order of magnitude smaller than its competitors." }),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)("p", { children: [
      "According to Bundlephobia (",
      /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
        "a",
        {
          href: "https://bundlephobia.com/package/@progressively/react@0.0.1-alpha.19",
          target: "_blank",
          rel: "noopener noreferrer",
          onClick: (e) => e.stopPropagation(),
          children: "Progressively"
        }
      ),
      ",",
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
        "a",
        {
          href: "https://bundlephobia.com/package/launchdarkly-react-client-sdk@3.0.1",
          target: "_blank",
          rel: "noopener noreferrer",
          onClick: (e) => e.stopPropagation(),
          children: "LaunchDarkly"
        }
      ),
      "), Progressively is",
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("strong", { className: "text-pink-600", children: "20x smaller" }),
      " than LaunchDarkly concerning the React SDK."
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)("p", { children: [
      "And if you prefer to see the comparison in a real NextJs application, you can check the",
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
        "a",
        {
          href: "https://github.com/progressively-crew/progressively/tree/master/example/bundle-diffs",
          target: "_blank",
          rel: "noopener noreferrer",
          onClick: (e) => e.stopPropagation(),
          children: "bundle-diff example"
        }
      ),
      " ",
      "available in the Github repository."
    ] })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(WhyCard, { title: "Progressively has to be accessible", children: [
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("p", { children: "We strongly believe in human and human rights. And we want anyone to be able to use the tool the way they want." }),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("p", { children: "In order to catch issues the sooner, the dashboard is audited by automated tool on every modifications." }),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)("p", { children: [
      "Of course, we don't have all the world's knowledge, neither the tool we use, and we make mistakes. So if you face any issue while browsing in Progressively, please,",
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
        "a",
        {
          href: "https://github.com/progressively-crew/progressively/issues/new?assignees=&labels=&template=bug_report.md&title=",
          target: "_blank",
          rel: "noopener noreferrer",
          onClick: (e) => e.stopPropagation(),
          children: "fill an issue"
        }
      ),
      " ",
      "and help us improve the tool."
    ] })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(WhyCard, { title: "Progressively is self hosted", children: [
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("p", { children: "Progressively is self-hosted. It means that you have to run the tool on your own server, on your own databases." }),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("p", { children: "It means that you own the data and that nobody has access to them." })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(WhyCard, { title: "Progressively is Open Source", children: [
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("strong", { children: "Progressively's codebase is open source and will always be." }) }),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("p", { children: "We strongly believe in the power of the community, and we want to hear from you. Let us know your experience with the tool, how it can become better to solve your problems and what are your expectations for the future." })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(WhyCard, { title: "Progressively is privacy aware", children: [
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("p", { children: "As simple as it is, Progressively does not know anything about your users. It does not store anything related to them." }),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("p", { children: "And as simple as it is, we don't know anything about you, nor about the usage of the tool :)." }),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("p", { children: "We don't need analytics numbers, but we need your explicit support, spread the word around!" })
  ] })
] });

// mdx:routes/docs/introduction/why.mdx
function MDXContent15(props = {}) {
  let _components = Object.assign({
    h1: "h1",
    a: "a",
    span: "span",
    p: "p",
    strong: "strong"
  }, props.components), { wrapper: MDXLayout } = _components, _content = /* @__PURE__ */ import_react41.default.createElement(import_react41.default.Fragment, null, /* @__PURE__ */ import_react41.default.createElement(_components.h1, { id: "why-progressively" }, /* @__PURE__ */ import_react41.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#why-progressively" }, /* @__PURE__ */ import_react41.default.createElement(_components.span, { className: "icon icon-link" })), "Why Progressively?"), `
`, /* @__PURE__ */ import_react41.default.createElement(_components.p, null, "There are plenty of great tools in the feature flagging space with their own sets of features and tradeoffs. Progressively has been built by developpers that have used some of these tools."), `
`, /* @__PURE__ */ import_react41.default.createElement(_components.p, null, "And we wanted to focus on some aspects that have not always been covered by others: ", /* @__PURE__ */ import_react41.default.createElement(_components.strong, null, "perceived performance, accessibility and privacy"), "."), `
`, /* @__PURE__ */ import_react41.default.createElement(WhyCards, null));
  return MDXLayout ? /* @__PURE__ */ import_react41.default.createElement(MDXLayout, { ...props }, _content) : _content;
}
var why_default = MDXContent15, filename15 = "why.mdx", headers15 = typeof attributes < "u" && attributes.headers, meta18 = typeof attributes < "u" && attributes.meta;

// mdx:routes/docs/developers/php.md
var php_exports = {};
__export(php_exports, {
  default: () => php_default,
  filename: () => filename16,
  headers: () => headers16,
  meta: () => meta19
});
var import_react42 = __toESM(require("react"));
function MDXContent16(props = {}) {
  let _components = Object.assign({
    h1: "h1",
    a: "a",
    span: "span",
    h2: "h2",
    p: "p",
    pre: "pre",
    code: "code",
    h3: "h3"
  }, props.components), { wrapper: MDXLayout } = _components, _content = /* @__PURE__ */ import_react42.default.createElement(import_react42.default.Fragment, null, /* @__PURE__ */ import_react42.default.createElement(_components.h1, { id: "php-sdk" }, /* @__PURE__ */ import_react42.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#php-sdk" }, /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "icon icon-link" })), "PHP SDK"), `
`, /* @__PURE__ */ import_react42.default.createElement(_components.h2, { id: "installation" }, /* @__PURE__ */ import_react42.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#installation" }, /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "icon icon-link" })), "Installation"), `
`, /* @__PURE__ */ import_react42.default.createElement(_components.p, null, "In your PHP project, add the following line to your composer.json file:"), `
`, /* @__PURE__ */ import_react42.default.createElement(_components.pre, null, /* @__PURE__ */ import_react42.default.createElement(_components.code, { className: "hljs language-json" }, /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-punctuation" }, "{"), `
  `, /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-attr" }, '"require"'), /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-punctuation" }, ":"), " ", /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-punctuation" }, "{"), `
    `, /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-attr" }, '"progressively/sdk-php"'), /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-punctuation" }, ":"), " ", /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-string" }, '"dev-fix-packagist"'), `
  `, /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-punctuation" }, "}"), `
`, /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-punctuation" }, "}"), `
`)), `
`, /* @__PURE__ */ import_react42.default.createElement(_components.p, null, "And then run:"), `
`, /* @__PURE__ */ import_react42.default.createElement(_components.pre, null, /* @__PURE__ */ import_react42.default.createElement(_components.code, { className: "hljs language-bash" }, `$ composer install
`)), `
`, /* @__PURE__ */ import_react42.default.createElement(_components.h2, { id: "usage" }, /* @__PURE__ */ import_react42.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#usage" }, /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "icon icon-link" })), "Usage"), `
`, /* @__PURE__ */ import_react42.default.createElement(_components.p, null, "In your PHP, add the following snippet."), `
`, /* @__PURE__ */ import_react42.default.createElement(_components.pre, null, /* @__PURE__ */ import_react42.default.createElement(_components.code, { className: "hljs language-php" }, "    ", /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-variable" }, "$option"), " = ", /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-keyword" }, "array"), `(
        `, /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-string" }, '"apiUrl"'), " => ", /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-string" }, '"your url server"'), `
    );

    `, /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-variable" }, "$sdk"), " = ", /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-title class_" }, "Progressively"), "::", /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-title function_ invoke__" }, "create"), "(", /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-string" }, '"YOUR_ENVIRONMENT_KEY"'), ", ", /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-variable" }, "$option"), `);
`)), `
`, /* @__PURE__ */ import_react42.default.createElement(_components.h2, { id: "options" }, /* @__PURE__ */ import_react42.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#options" }, /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "icon icon-link" })), "Options"), `
`, /* @__PURE__ */ import_react42.default.createElement(_components.h3, { id: "fields" }, /* @__PURE__ */ import_react42.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#fields" }, /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "icon icon-link" })), "fields"), `
`, /* @__PURE__ */ import_react42.default.createElement(_components.p, null, "Fields is an option that allows to pass data about your users to create targeting strategies. For instance, you can set an email field, and in Progressively's dashboard, you can create a rule that only targets people that use an expected domain:"), `
`, /* @__PURE__ */ import_react42.default.createElement(_components.pre, null, /* @__PURE__ */ import_react42.default.createElement(_components.code, { className: "hljs language-php" }, "     ", /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-variable" }, "$option"), " = ", /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-keyword" }, "array"), `(
        `, /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-string" }, '"apiUrl"'), " => ", /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-string" }, '"your url server"'), `
        `, /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-string" }, '"fields"'), " => ", /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-keyword" }, "array"), `(
            `, /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-string" }, '"email"'), ": ", /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-string" }, '"marvin.frachet@something.com"'), `
        )
    );

    `, /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-variable" }, "$sdk"), " = ", /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-title class_" }, "Progressively"), "::", /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-title function_ invoke__" }, "create"), "(", /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-string" }, '"YOUR_ENVIRONMENT_KEY"'), ", ", /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-variable" }, "$option"), `);
`)), `
`, /* @__PURE__ */ import_react42.default.createElement(_components.h2, { id: "methods" }, /* @__PURE__ */ import_react42.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#methods" }, /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "icon icon-link" })), "Methods"), `
`, /* @__PURE__ */ import_react42.default.createElement(_components.h3, { id: "isactivated" }, /* @__PURE__ */ import_react42.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#isactivated" }, /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "icon icon-link" })), "isActivated"), `
`, /* @__PURE__ */ import_react42.default.createElement(_components.p, null, "Check if a given flag is activated."), `
`, /* @__PURE__ */ import_react42.default.createElement(_components.pre, null, /* @__PURE__ */ import_react42.default.createElement(_components.code, { className: "hljs language-php" }, /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-variable" }, "$sdk"), "->", /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-title function_ invoke__" }, "isActivated"), "(", /* @__PURE__ */ import_react42.default.createElement(_components.span, { className: "hljs-string" }, "'theFlagKey'"), `);
`)));
  return MDXLayout ? /* @__PURE__ */ import_react42.default.createElement(MDXLayout, { ...props }, _content) : _content;
}
var php_default = MDXContent16, filename16 = "php.md", headers16 = typeof attributes < "u" && attributes.headers, meta19 = typeof attributes < "u" && attributes.meta;

// app/routes/docs/developers/sdk.tsx
var sdk_exports = {};
__export(sdk_exports, {
  default: () => sdk_default
});
var import_react43 = require("@remix-run/react"), import_react44 = require("react"), import_io54 = require("react-icons/io5"), import_fa2 = require("react-icons/fa"), import_si2 = require("react-icons/si"), import_jsx_runtime42 = require("react/jsx-runtime"), SdkCard = ({ title: title3, href, description: description3, icon }) => {
  let linkRef = (0, import_react44.useRef)(null);
  return /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(
    "div",
    {
      tabIndex: -1,
      className: "relative z-10 bg-white hover:bg-gray-50 active:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-slate-600 rounded p-4 py-8 h-full drop-shadow cursor-pointer",
      onClick: () => {
        var _a;
        return (_a = linkRef == null ? void 0 : linkRef.current) == null ? void 0 : _a.click();
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("span", { className: "text-4xl", children: icon }),
        /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("h2", { className: "text-base font-semibold mb-0 py-2", children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
          import_react43.Link,
          {
            to: href,
            ref: linkRef,
            className: "!text-indigo-700 dark:!text-slate-100",
            children: title3
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("div", { className: "text-gray-600 dark:text-slate-300 text-sm dark:text-slate-100", children: description3 })
      ]
    }
  );
}, SdkPage = () => /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("div", { children: [
  /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("h1", { children: "Available SDKs" }),
  /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
      SdkCard,
      {
        icon: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(import_io54.IoLogoJavascript, { style: { color: "#f0db4f" } }),
        title: "JavaScript",
        href: "/docs/developers/javascript",
        description: /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("p", { className: "m-0", children: [
          "The ",
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("strong", { className: "dark:text-slate-100", children: "Client Side" }),
          " ",
          "JavaScript SDK to use in your application running in the browser."
        ] })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
      SdkCard,
      {
        icon: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(import_io54.IoLogoNodejs, { style: { color: "#3c873a" } }),
        title: "Node.js",
        href: "/docs/developers/node-js",
        description: /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("p", { className: "m-0", children: [
          "The ",
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("strong", { className: "dark:text-slate-100", children: "Server Side" }),
          " ",
          "JavaScript SDK to use in your application running in Node.js."
        ] })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
      SdkCard,
      {
        icon: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(import_fa2.FaReact, { style: { color: "#61DBFB" } }),
        title: "React",
        href: "/docs/developers/react",
        description: /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("p", { className: "m-0", children: [
          "The ",
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("strong", { className: "dark:text-slate-100", children: "React" }),
          " SDK. Works on the client, but also on the server."
        ] })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
      SdkCard,
      {
        icon: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(import_fa2.FaPhp, { style: { color: "#232531" } }),
        title: "PHP",
        href: "/docs/developers/php",
        description: /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("p", { className: "m-0", children: [
          "The ",
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("strong", { className: "dark:text-slate-100", children: "PHP" }),
          " SDK."
        ] })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
      SdkCard,
      {
        icon: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(import_si2.SiGoland, { style: { color: "#29BEB0" } }),
        title: "Go",
        href: "/docs/developers/go",
        description: /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("p", { className: "m-0", children: [
          "The ",
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("strong", { className: "dark:text-slate-100", children: "Go" }),
          " SDK."
        ] })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
      SdkCard,
      {
        icon: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(import_fa2.FaPython, { style: { color: "#4B8BBE" } }),
        title: "Python",
        href: "/docs/developers/python",
        description: /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("p", { className: "m-0", children: [
          "The ",
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("strong", { className: "dark:text-slate-100", children: "Python" }),
          " SDK."
        ] })
      }
    )
  ] })
] }), sdk_default = SdkPage;

// mdx:routes/docs/developers/go.md
var go_exports = {};
__export(go_exports, {
  default: () => go_default,
  filename: () => filename17,
  headers: () => headers17,
  meta: () => meta20
});
var import_react45 = __toESM(require("react"));
function MDXContent17(props = {}) {
  let _components = Object.assign({
    h1: "h1",
    a: "a",
    span: "span",
    h2: "h2",
    p: "p",
    pre: "pre",
    code: "code",
    h3: "h3",
    h4: "h4"
  }, props.components), { wrapper: MDXLayout } = _components, _content = /* @__PURE__ */ import_react45.default.createElement(import_react45.default.Fragment, null, /* @__PURE__ */ import_react45.default.createElement(_components.h1, { id: "go-sdk" }, /* @__PURE__ */ import_react45.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#go-sdk" }, /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "icon icon-link" })), "Go SDK"), `
`, /* @__PURE__ */ import_react45.default.createElement(_components.h2, { id: "installation" }, /* @__PURE__ */ import_react45.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#installation" }, /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "icon icon-link" })), "Installation"), `
`, /* @__PURE__ */ import_react45.default.createElement(_components.p, null, "In your Go project, run the following:"), `
`, /* @__PURE__ */ import_react45.default.createElement(_components.pre, null, /* @__PURE__ */ import_react45.default.createElement(_components.code, { className: "hljs language-sh" }, `$ go get github.com/progressively-crew/sdk-go@latest
`)), `
`, /* @__PURE__ */ import_react45.default.createElement(_components.h2, { id: "usage" }, /* @__PURE__ */ import_react45.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#usage" }, /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "icon icon-link" })), "Usage"), `
`, /* @__PURE__ */ import_react45.default.createElement(_components.p, null, "In your Go code, add the following snippet."), `
`, /* @__PURE__ */ import_react45.default.createElement(_components.pre, null, /* @__PURE__ */ import_react45.default.createElement(_components.code, { className: "hljs language-go" }, "    sdk := progressively.SdkBuilder(", /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "hljs-string" }, '"valid-sdk-key"'), ", ", /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "hljs-string" }, '"BACKEND_URL"'), `).Build()

    `, /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "hljs-keyword" }, "if"), " sdk.Evaluate(", /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "hljs-string" }, '"newHomepage"'), ") == ", /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "hljs-literal" }, "true"), ` {
		  `, /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "hljs-comment" }, "// do things when flag is activated"), `
	  } `, /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "hljs-keyword" }, "else"), ` {
		  `, /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "hljs-comment" }, "// do things when flag is NOT activated"), `
	  }
`)), `
`, /* @__PURE__ */ import_react45.default.createElement(_components.h2, { id: "methods" }, /* @__PURE__ */ import_react45.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#methods" }, /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "icon icon-link" })), "Methods"), `
`, /* @__PURE__ */ import_react45.default.createElement(_components.h3, { id: "sdkbuilder" }, /* @__PURE__ */ import_react45.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#sdkbuilder" }, /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "icon icon-link" })), "SdkBuilder"), `
`, /* @__PURE__ */ import_react45.default.createElement(_components.h4, { id: "addfield" }, /* @__PURE__ */ import_react45.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#addfield" }, /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "icon icon-link" })), "AddField"), `
`, /* @__PURE__ */ import_react45.default.createElement(_components.p, null, "Fields is an option that allows to pass data about your users to create targeting strategies. For instance, you can set an email field, and in Progressively's dashboard, you can create a rule that only targets people that use an expected domain:"), `
`, /* @__PURE__ */ import_react45.default.createElement(_components.pre, null, /* @__PURE__ */ import_react45.default.createElement(_components.code, { className: "hljs language-go" }, "$ sdk := progressively.SdkBuilder(", /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "hljs-string" }, '"valid-sdk-key"'), ", ", /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "hljs-string" }, '"BACKEND_URL"'), ").AddField(", /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "hljs-string" }, '"email"'), ", ", /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "hljs-string" }, '"marvin.frachet@something.com"'), `).Build()
`)), `
`, /* @__PURE__ */ import_react45.default.createElement(_components.h4, { id: "build" }, /* @__PURE__ */ import_react45.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#build" }, /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "icon icon-link" })), "Build"), `
`, /* @__PURE__ */ import_react45.default.createElement(_components.p, null, "Fetches the flags and create an SDK instance with them."), `
`, /* @__PURE__ */ import_react45.default.createElement(_components.pre, null, /* @__PURE__ */ import_react45.default.createElement(_components.code, { className: "hljs language-go" }, "sdk := progressively.SdkBuilder(", /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "hljs-string" }, '"valid-sdk-key"'), ", ", /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "hljs-string" }, '"BACKEND_URL"'), `).Build()
`)), `
`, /* @__PURE__ */ import_react45.default.createElement(_components.h3, { id: "sdk" }, /* @__PURE__ */ import_react45.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#sdk" }, /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "icon icon-link" })), "Sdk"), `
`, /* @__PURE__ */ import_react45.default.createElement(_components.h4, { id: "evaluate" }, /* @__PURE__ */ import_react45.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#evaluate" }, /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "icon icon-link" })), "Evaluate"), `
`, /* @__PURE__ */ import_react45.default.createElement(_components.p, null, "Get the evaluated version of a feature flag (string variant or boolean value)."), `
`, /* @__PURE__ */ import_react45.default.createElement(_components.pre, null, /* @__PURE__ */ import_react45.default.createElement(_components.code, { className: "hljs language-go" }, "sdk.Evaluate(", /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "hljs-string" }, '"theFlagKey"'), `)
`)), `
`, /* @__PURE__ */ import_react45.default.createElement(_components.h4, { id: "loadflags" }, /* @__PURE__ */ import_react45.default.createElement(_components.a, { "aria-hidden": "true", tabIndex: "-1", href: "#loadflags" }, /* @__PURE__ */ import_react45.default.createElement(_components.span, { className: "icon icon-link" })), "LoadFlags"), `
`, /* @__PURE__ */ import_react45.default.createElement(_components.p, null, "Refresh the flags by hitting the API again."), `
`, /* @__PURE__ */ import_react45.default.createElement(_components.pre, null, /* @__PURE__ */ import_react45.default.createElement(_components.code, { className: "hljs language-go" }, `sdk.LoadFlags()
`)));
  return MDXLayout ? /* @__PURE__ */ import_react45.default.createElement(MDXLayout, { ...props }, _content) : _content;
}
var go_default = MDXContent17, filename17 = "go.md", headers17 = typeof attributes < "u" && attributes.headers, meta20 = typeof attributes < "u" && attributes.meta;

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "ae041ea9", entry: { module: "/build/entry.client-EOFR3GIY.js", imports: ["/build/_shared/chunk-532ZQ74X.js", "/build/_shared/chunk-J2B6VFGD.js", "/build/_shared/chunk-EGLYY6PQ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-6UHVUMHC.js", imports: ["/build/_shared/chunk-ROC3YJU6.js", "/build/_shared/chunk-HSOGUMIU.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/blog/$id": { id: "routes/blog/$id", parentId: "root", path: "blog/:id", index: void 0, caseSensitive: void 0, module: "/build/routes/blog/$id-Y3PK2CNY.js", imports: ["/build/_shared/chunk-4GLRTTTU.js", "/build/_shared/chunk-LLJOMH2C.js", "/build/_shared/chunk-F55MVXIT.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/blog/$id/index": { id: "routes/blog/$id/index", parentId: "routes/blog/$id", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/blog/$id/index-WEFDJRK4.js", imports: ["/build/_shared/chunk-ZPACXTKE.js", "/build/_shared/chunk-ROC3YJU6.js", "/build/_shared/chunk-TAV3JMYD.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/blog/index": { id: "routes/blog/index", parentId: "root", path: "blog", index: !0, caseSensitive: void 0, module: "/build/routes/blog/index-A6T5LRK4.js", imports: ["/build/_shared/chunk-4GLRTTTU.js", "/build/_shared/chunk-LLJOMH2C.js", "/build/_shared/chunk-F55MVXIT.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/demo-instance": { id: "routes/demo-instance", parentId: "root", path: "demo-instance", index: void 0, caseSensitive: void 0, module: "/build/routes/demo-instance-OTGKI7NN.js", imports: ["/build/_shared/chunk-U5GHZ3S4.js", "/build/_shared/chunk-F55MVXIT.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/docs": { id: "routes/docs", parentId: "root", path: "docs", index: void 0, caseSensitive: void 0, module: "/build/routes/docs-LFDAPOUJ.js", imports: ["/build/_shared/chunk-EPYAU4YB.js", "/build/_shared/chunk-4GLRTTTU.js", "/build/_shared/chunk-7HVG2MSP.js", "/build/_shared/chunk-4D7CV26Z.js", "/build/_shared/chunk-LLJOMH2C.js", "/build/_shared/chunk-F55MVXIT.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/docs/developers/add-your-sdk": { id: "routes/docs/developers/add-your-sdk", parentId: "routes/docs", path: "developers/add-your-sdk", index: void 0, caseSensitive: void 0, module: "/build/routes/docs/developers/add-your-sdk-O2A5GPZF.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/docs/developers/customization": { id: "routes/docs/developers/customization", parentId: "routes/docs", path: "developers/customization", index: void 0, caseSensitive: void 0, module: "/build/routes/docs/developers/customization-VDKG2IKS.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/docs/developers/examples": { id: "routes/docs/developers/examples", parentId: "routes/docs", path: "developers/examples", index: void 0, caseSensitive: void 0, module: "/build/routes/docs/developers/examples-C4TTMVKL.js", imports: ["/build/_shared/chunk-ZBUKGPGP.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/docs/developers/go": { id: "routes/docs/developers/go", parentId: "routes/docs", path: "developers/go", index: void 0, caseSensitive: void 0, module: "/build/routes/docs/developers/go-KSQG5GIU.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/docs/developers/javascript": { id: "routes/docs/developers/javascript", parentId: "routes/docs", path: "developers/javascript", index: void 0, caseSensitive: void 0, module: "/build/routes/docs/developers/javascript-JOTHP6U7.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/docs/developers/node-js": { id: "routes/docs/developers/node-js", parentId: "routes/docs", path: "developers/node-js", index: void 0, caseSensitive: void 0, module: "/build/routes/docs/developers/node-js-JNZEVJLS.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/docs/developers/php": { id: "routes/docs/developers/php", parentId: "routes/docs", path: "developers/php", index: void 0, caseSensitive: void 0, module: "/build/routes/docs/developers/php-EWAP4C4V.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/docs/developers/python": { id: "routes/docs/developers/python", parentId: "routes/docs", path: "developers/python", index: void 0, caseSensitive: void 0, module: "/build/routes/docs/developers/python-EW62EHER.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/docs/developers/react": { id: "routes/docs/developers/react", parentId: "routes/docs", path: "developers/react", index: void 0, caseSensitive: void 0, module: "/build/routes/docs/developers/react-DFXQ46FI.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/docs/developers/sdk": { id: "routes/docs/developers/sdk", parentId: "routes/docs", path: "developers/sdk", index: void 0, caseSensitive: void 0, module: "/build/routes/docs/developers/sdk-P466JWPQ.js", imports: ["/build/_shared/chunk-ZBUKGPGP.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/docs/features/additional-audience": { id: "routes/docs/features/additional-audience", parentId: "routes/docs", path: "features/additional-audience", index: void 0, caseSensitive: void 0, module: "/build/routes/docs/features/additional-audience-QVFWW2RC.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/docs/features/audience-eligibility": { id: "routes/docs/features/audience-eligibility", parentId: "routes/docs", path: "features/audience-eligibility", index: void 0, caseSensitive: void 0, module: "/build/routes/docs/features/audience-eligibility-QMRSF6IB.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/docs/features/hierarchical-structure": { id: "routes/docs/features/hierarchical-structure", parentId: "routes/docs", path: "features/hierarchical-structure", index: void 0, caseSensitive: void 0, module: "/build/routes/docs/features/hierarchical-structure-CYQX4CUE.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/docs/features/insights": { id: "routes/docs/features/insights", parentId: "routes/docs", path: "features/insights", index: void 0, caseSensitive: void 0, module: "/build/routes/docs/features/insights-2MRDAOMK.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/docs/features/scheduled-flag-update": { id: "routes/docs/features/scheduled-flag-update", parentId: "routes/docs", path: "features/scheduled-flag-update", index: void 0, caseSensitive: void 0, module: "/build/routes/docs/features/scheduled-flag-update-MVZBWBEZ.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/docs/features/single-multi-variants": { id: "routes/docs/features/single-multi-variants", parentId: "routes/docs", path: "features/single-multi-variants", index: void 0, caseSensitive: void 0, module: "/build/routes/docs/features/single-multi-variants-3BFFXNSE.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/docs/introduction/demo-instance": { id: "routes/docs/introduction/demo-instance", parentId: "routes/docs", path: "introduction/demo-instance", index: void 0, caseSensitive: void 0, module: "/build/routes/docs/introduction/demo-instance-V4574GAY.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/docs/introduction/getting-started": { id: "routes/docs/introduction/getting-started", parentId: "routes/docs", path: "introduction/getting-started", index: void 0, caseSensitive: void 0, module: "/build/routes/docs/introduction/getting-started-BRLUXNPE.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/docs/introduction/why": { id: "routes/docs/introduction/why", parentId: "routes/docs", path: "introduction/why", index: void 0, caseSensitive: void 0, module: "/build/routes/docs/introduction/why-2OZSHKTP.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-LCE4OP6D.js", imports: ["/build/_shared/chunk-7HVG2MSP.js", "/build/_shared/chunk-U5GHZ3S4.js", "/build/_shared/chunk-4D7CV26Z.js", "/build/_shared/chunk-LLJOMH2C.js", "/build/_shared/chunk-F55MVXIT.js", "/build/_shared/chunk-TAV3JMYD.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/recipes/$id": { id: "routes/recipes/$id", parentId: "root", path: "recipes/:id", index: void 0, caseSensitive: void 0, module: "/build/routes/recipes/$id-GB5PQQTF.js", imports: ["/build/_shared/chunk-4GLRTTTU.js", "/build/_shared/chunk-ZPACXTKE.js", "/build/_shared/chunk-4D7CV26Z.js", "/build/_shared/chunk-LLJOMH2C.js", "/build/_shared/chunk-F55MVXIT.js", "/build/_shared/chunk-TAV3JMYD.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, url: "/build/manifest-AE041EA9.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { v2_meta: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/demo-instance": {
    id: "routes/demo-instance",
    parentId: "root",
    path: "demo-instance",
    index: void 0,
    caseSensitive: void 0,
    module: demo_instance_exports
  },
  "routes/recipes/$id": {
    id: "routes/recipes/$id",
    parentId: "root",
    path: "recipes/:id",
    index: void 0,
    caseSensitive: void 0,
    module: id_exports
  },
  "routes/blog/index": {
    id: "routes/blog/index",
    parentId: "root",
    path: "blog",
    index: !0,
    caseSensitive: void 0,
    module: blog_exports
  },
  "routes/blog/$id": {
    id: "routes/blog/$id",
    parentId: "root",
    path: "blog/:id",
    index: void 0,
    caseSensitive: void 0,
    module: id_exports2
  },
  "routes/blog/$id/index": {
    id: "routes/blog/$id/index",
    parentId: "routes/blog/$id",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: id_exports3
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/docs": {
    id: "routes/docs",
    parentId: "root",
    path: "docs",
    index: void 0,
    caseSensitive: void 0,
    module: docs_exports
  },
  "routes/docs/features/hierarchical-structure": {
    id: "routes/docs/features/hierarchical-structure",
    parentId: "routes/docs",
    path: "features/hierarchical-structure",
    index: void 0,
    caseSensitive: void 0,
    module: hierarchical_structure_exports
  },
  "routes/docs/features/scheduled-flag-update": {
    id: "routes/docs/features/scheduled-flag-update",
    parentId: "routes/docs",
    path: "features/scheduled-flag-update",
    index: void 0,
    caseSensitive: void 0,
    module: scheduled_flag_update_exports
  },
  "routes/docs/features/single-multi-variants": {
    id: "routes/docs/features/single-multi-variants",
    parentId: "routes/docs",
    path: "features/single-multi-variants",
    index: void 0,
    caseSensitive: void 0,
    module: single_multi_variants_exports
  },
  "routes/docs/features/audience-eligibility": {
    id: "routes/docs/features/audience-eligibility",
    parentId: "routes/docs",
    path: "features/audience-eligibility",
    index: void 0,
    caseSensitive: void 0,
    module: audience_eligibility_exports
  },
  "routes/docs/features/additional-audience": {
    id: "routes/docs/features/additional-audience",
    parentId: "routes/docs",
    path: "features/additional-audience",
    index: void 0,
    caseSensitive: void 0,
    module: additional_audience_exports
  },
  "routes/docs/introduction/getting-started": {
    id: "routes/docs/introduction/getting-started",
    parentId: "routes/docs",
    path: "introduction/getting-started",
    index: void 0,
    caseSensitive: void 0,
    module: getting_started_exports
  },
  "routes/docs/introduction/demo-instance": {
    id: "routes/docs/introduction/demo-instance",
    parentId: "routes/docs",
    path: "introduction/demo-instance",
    index: void 0,
    caseSensitive: void 0,
    module: demo_instance_exports2
  },
  "routes/docs/developers/customization": {
    id: "routes/docs/developers/customization",
    parentId: "routes/docs",
    path: "developers/customization",
    index: void 0,
    caseSensitive: void 0,
    module: customization_exports
  },
  "routes/docs/developers/add-your-sdk": {
    id: "routes/docs/developers/add-your-sdk",
    parentId: "routes/docs",
    path: "developers/add-your-sdk",
    index: void 0,
    caseSensitive: void 0,
    module: add_your_sdk_exports
  },
  "routes/docs/developers/javascript": {
    id: "routes/docs/developers/javascript",
    parentId: "routes/docs",
    path: "developers/javascript",
    index: void 0,
    caseSensitive: void 0,
    module: javascript_exports
  },
  "routes/docs/developers/examples": {
    id: "routes/docs/developers/examples",
    parentId: "routes/docs",
    path: "developers/examples",
    index: void 0,
    caseSensitive: void 0,
    module: examples_exports
  },
  "routes/docs/developers/node-js": {
    id: "routes/docs/developers/node-js",
    parentId: "routes/docs",
    path: "developers/node-js",
    index: void 0,
    caseSensitive: void 0,
    module: node_js_exports
  },
  "routes/docs/developers/python": {
    id: "routes/docs/developers/python",
    parentId: "routes/docs",
    path: "developers/python",
    index: void 0,
    caseSensitive: void 0,
    module: python_exports
  },
  "routes/docs/features/insights": {
    id: "routes/docs/features/insights",
    parentId: "routes/docs",
    path: "features/insights",
    index: void 0,
    caseSensitive: void 0,
    module: insights_exports
  },
  "routes/docs/developers/react": {
    id: "routes/docs/developers/react",
    parentId: "routes/docs",
    path: "developers/react",
    index: void 0,
    caseSensitive: void 0,
    module: react_exports
  },
  "routes/docs/introduction/why": {
    id: "routes/docs/introduction/why",
    parentId: "routes/docs",
    path: "introduction/why",
    index: void 0,
    caseSensitive: void 0,
    module: why_exports
  },
  "routes/docs/developers/php": {
    id: "routes/docs/developers/php",
    parentId: "routes/docs",
    path: "developers/php",
    index: void 0,
    caseSensitive: void 0,
    module: php_exports
  },
  "routes/docs/developers/sdk": {
    id: "routes/docs/developers/sdk",
    parentId: "routes/docs",
    path: "developers/sdk",
    index: void 0,
    caseSensitive: void 0,
    module: sdk_exports
  },
  "routes/docs/developers/go": {
    id: "routes/docs/developers/go",
    parentId: "routes/docs",
    path: "developers/go",
    index: void 0,
    caseSensitive: void 0,
    module: go_exports
  }
};

// server.js
var server_default = (0, import_vercel.createRequestHandler)({ build: server_build_exports, mode: "production" });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
