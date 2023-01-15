"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_react = require("@remix-run/react"), import_server = require("react-dom/server"), import_jsx_runtime = require("react/jsx-runtime");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.RemixServer, { context: remixContext, url: request.url })
  );
  return responseHeaders.set("Content-Type", "text/html"), new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  CatchBoundary: () => CatchBoundary,
  ErrorBoundary: () => ErrorBoundary,
  default: () => root_default,
  links: () => links
});
var import_react5 = require("@remix-run/react");

// app/routes/401.tsx
var __exports = {};
__export(__exports, {
  default: () => UnauthorizedPage
});
var import_ai = require("react-icons/ai");

// app/components/Buttons/Button.tsx
var import_react2 = require("@remix-run/react");

// app/components/Spinner.tsx
var import_cg = require("react-icons/cg"), import_jsx_runtime2 = require("react/jsx-runtime"), Spinner = () => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "animate-spin", "aria-hidden": !0, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_cg.CgSpinner, {}) });

// app/components/Buttons/Button.tsx
var import_jsx_runtime3 = require("react/jsx-runtime"), classCombination = {
  defaultprimary: "bg-indigo-700 text-white hover:bg-indigo-500 active:bg-indigo-600",
  defaultsecondary: "bg-indigo-100 text-indigo-700 text-indigo-700 hover:bg-indigo-50 active:bg-indigo-100",
  defaulttertiary: "text-indigo-700 dark:text-indigo-200 hover:bg-gray-50 hover:dark:bg-slate-700 active:bg-gray-100 active:dark:bg-slate-800",
  dangerprimary: "bg-red-600 text-white hover:bg-red-500 active:bg-red-600",
  dangersecondary: "bg-red-50 text-red-700 hover:bg-red-100 active:bg-red-200",
  dangertertiary: "text-red-700 dark:text-red-200 hover:dark:bg-slate-800 active:dark:bg-slate-700 hover:bg-red-100 active:bg-red-50"
}, sizeClasses = {
  S: "h-8 px-2 text-sm gap-2",
  M: "h-10 px-4 gap-4"
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
  size = "M",
  ...props
}) => {
  let sharedButtonClass = "block rounded flex items-center whitespace-nowrap", combinedClassName = classCombination[(scheme || "default") + (variant || "primary")], sizeClass = sizeClasses[size];
  if (to || href) {
    let linkProps = props;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      href ? "a" : import_react2.Link,
      {
        to: href ? void 0 : to,
        href,
        className: sharedButtonClass + " " + combinedClassName + " " + className + " " + sizeClass,
        ...linkProps,
        children: [
          icon && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: icon }),
          children
        ]
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "button",
    {
      type,
      className: sharedButtonClass + " " + combinedClassName + " " + className + " " + sizeClass,
      ...props,
      "aria-disabled": isLoading,
      "aria-label": isLoading ? loadingText : void 0,
      children: [
        icon && isLoading && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Spinner, {}),
        icon && !isLoading && icon,
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: icon ? "text" : void 0, children })
      ]
    }
  );
};

// app/components/Spacer.tsx
var import_jsx_runtime4 = require("react/jsx-runtime"), Spacer = ({ size }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
  "div",
  {
    className: size === 1 ? "h-1" : size === 2 ? "h-2" : size === 3 ? "h-3" : size === 4 ? "h-4" : size === 5 ? "h-5" : size === 6 ? "h-6" : size === 7 ? "h-7" : size === 8 ? "h-8" : size === 9 ? "h-9" : size === 10 ? "h-10" : size === 11 ? "h-11" : size === 12 ? "h-12" : size === 14 ? "h-14" : size === 16 ? "h-16" : void 0
  }
);

// app/components/Typography.tsx
var import_jsx_runtime5 = require("react/jsx-runtime"), Typography = ({
  className,
  as: asHTML,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
  asHTML || "p",
  {
    ...props,
    className: "text-gray-500 dark:text-gray-200 " + (className || "")
  }
);

// app/routes/401.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
function UnauthorizedPage() {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("main", { className: "p-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Typography, { as: "h1", className: "font-bold text-lg", children: "Woops! You're not authorized to see this content" }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Typography, { children: `It looks you're trying to access this page while not being
          authenticated.` }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Typography, { children: "To access this content, make sure to fill the authentication page form." }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Spacer, { size: 2 }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "inline-block", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      Button,
      {
        to: "/signin",
        variant: "secondary",
        icon: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_ai.AiOutlineLogin, { "aria-hidden": !0 }),
        children: "Signin page"
      }
    ) })
  ] });
}

// app/routes/403.tsx
var __exports2 = {};
__export(__exports2, {
  default: () => ForbiddenPage
});
var import_ai2 = require("react-icons/ai");
var import_jsx_runtime7 = require("react/jsx-runtime");
function ForbiddenPage() {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("main", { className: "p-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Typography, { as: "h1", className: "font-bold text-lg", children: "Woops! You're not authorized to see this content" }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Typography, { children: `It looks you're trying to access this page while not being
            authenticated.` }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Typography, { children: "To access this content, make sure to fill the authentication page form." }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Spacer, { size: 2 }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "inline-block", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      Button,
      {
        to: "/signin",
        variant: "secondary",
        icon: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_ai2.AiOutlineLogin, { "aria-hidden": !0 }),
        children: "Signin page"
      }
    ) })
  ] });
}

// app/routes/404.tsx
var __exports3 = {};
__export(__exports3, {
  default: () => NotFoundPage
});
var import_ai3 = require("react-icons/ai");
var import_jsx_runtime8 = require("react/jsx-runtime");
function NotFoundPage() {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("main", { className: "p-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Typography, { as: "h1", className: "font-bold text-lg", children: "Woops! This page does not exist." }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Typography, { children: "It looks you're trying to access a content that does not exist." }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Spacer, { size: 2 }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "inline-block", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      Button,
      {
        to: "/signin",
        variant: "secondary",
        icon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ai3.AiOutlineLogin, { "aria-hidden": !0 }),
        children: "Signin page"
      }
    ) })
  ] });
}

// app/styles/app.css
var app_default = "/build/_assets/app-AEONWWUF.css";

// app/components/Background.tsx
var import_jsx_runtime9 = require("react/jsx-runtime"), Background = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "min-h-full bg-gray-50 dark:bg-slate-900", children });

// app/root.tsx
var import_ai4 = require("react-icons/ai");

// app/modules/theme/ThemeProvider.tsx
var import_react4 = require("react");

// app/modules/theme/ThemeContext.ts
var import_react3 = require("react"), ThemeContext = (0, import_react3.createContext)({
  theme: "light",
  toggleTheme: () => {
  }
});

// app/modules/theme/ThemeProvider.tsx
var import_jsx_runtime10 = require("react/jsx-runtime"), ThemeProvider = ({ children }) => {
  let [theme, setTheme] = (0, import_react4.useState)();
  (0, import_react4.useEffect)(() => {
    let isDark = localStorage.theme === "dark" || !("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(isDark ? "dark" : "light");
  }, []);
  let toggleTheme = (0, import_react4.useCallback)(() => {
    var _a;
    (_a = document == null ? void 0 : document.documentElement) == null || _a.classList.toggle("dark"), localStorage.theme = localStorage.theme === "dark" ? "light" : "dark", setTheme(localStorage.theme);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ThemeContext.Provider, { value: { theme, toggleTheme }, children });
};

// app/root.tsx
var import_jsx_runtime11 = require("react/jsx-runtime"), links = () => [{ rel: "stylesheet", href: app_default }];
function App() {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Document, { children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_react5.Outlet, {}) }) });
}
var root_default = App, Document = ({ children, title }) => /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("html", { lang: "en", className: "h-full", children: [
  /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("head", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("meta", { charSet: "utf-8" }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("link", { rel: "shortcut icon", type: "image/jpg", href: "/favicon.png" }),
    title ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("title", { children: title }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_react5.Meta, {}),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_react5.Links, {}),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      "script",
      {
        lang: "javascript",
        dangerouslySetInnerHTML: {
          __html: `
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
document.documentElement.classList.add('dark')
} else {
document.documentElement.classList.remove('dark')
}
`
        }
      }
    )
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("body", { className: "h-full", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Background, { children }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_react5.ScrollRestoration, {}),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_react5.Scripts, {}),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_react5.LiveReload, {})
  ] })
] });
function Layout({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { children });
}
function CatchBoundary() {
  let caught = (0, import_react5.useCatch)(), page;
  switch (caught.status) {
    case 403: {
      page = /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(ForbiddenPage, {});
      break;
    }
    case 401: {
      page = /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(UnauthorizedPage, {});
      break;
    }
    case 404: {
      page = /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(NotFoundPage, {});
      break;
    }
    default:
      throw new Error(caught.data || caught.statusText);
  }
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Document, { title: `${caught.status} ${caught.statusText}`, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Layout, { children: page }) });
}
function ErrorBoundary({ error }) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Document, { title: "Error!", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("main", { className: "p-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Typography, { as: "h1", className: "font-bold text-lg", children: "Outch, a wild error appeared!" }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Typography, { children: error.message }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Spacer, { size: 2 }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "inline-block", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      Button,
      {
        to: "/signin",
        variant: "secondary",
        icon: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_ai4.AiOutlineLogin, { "aria-hidden": !0 }),
        children: "Signin page"
      }
    ) })
  ] }) }) });
}

// app/routes/forgot-password.tsx
var forgot_password_exports = {};
__export(forgot_password_exports, {
  action: () => action,
  default: () => ForgotPasswordPage,
  meta: () => meta
});
var import_react12 = require("@remix-run/react");

// app/components/BackLink.tsx
var import_hi = require("react-icons/hi");
var import_jsx_runtime12 = require("react/jsx-runtime"), BackLink = ({ children, to }) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
  Button,
  {
    to,
    icon: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_hi.HiOutlineArrowNarrowLeft, { "aria-hidden": !0 }),
    style: { textAlign: "left", justifyContent: "flex-start" },
    variant: "tertiary",
    children
  }
);

// app/components/Buttons/SubmitButton.tsx
var import_fi = require("react-icons/fi"), import_jsx_runtime13 = require("react/jsx-runtime"), SubmitButton = ({ children, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
  Button,
  {
    type: "submit",
    variant: "primary",
    icon: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_fi.FiEdit, { "aria-hidden": !0 }),
    ...props,
    children
  }
);

// app/components/Boxes/ErrorBox.tsx
var import_react6 = require("@remix-run/react"), import_react7 = require("react"), import_md = require("react-icons/md");

// app/components/HStack.tsx
var import_jsx_runtime14 = require("react/jsx-runtime"), HStack = ({ children, spacing, as: asComponent }) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
  asComponent || "div",
  {
    className: spacing === 1 ? "flex flex-row items-center gap-1" : spacing === 2 ? "flex flex-row items-center gap-2" : spacing === 3 ? "flex flex-row items-center gap-3" : spacing === 4 ? "flex flex-row items-center gap-4" : spacing === 5 ? "flex flex-row items-center gap-5" : spacing === 6 ? "flex flex-row gitems-center ap-6" : "flex",
    children
  }
);

// app/components/Ul.tsx
var import_jsx_runtime15 = require("react/jsx-runtime"), Ul = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("ul", { className: "list-disc pl-10", children }), Li = ({ children, id }) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("li", { id, children });

// app/components/Boxes/ErrorBox.tsx
var import_jsx_runtime16 = require("react/jsx-runtime"), ErrorBox = ({ list }) => {
  let boxRef = (0, import_react7.useRef)(null), errors = Object.keys(list);
  (0, import_react7.useEffect)(() => {
    var _a;
    (_a = boxRef == null ? void 0 : boxRef.current) == null || _a.focus();
  }, []);
  let label = errors.length === 1 ? "The following error has been found:" : `The following ${errors.length} errors have been found:`;
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "p-4 bg-red-100 text-red-700 rounded border-l-8 border-l-red-600 flex flex-row justify-between  motion-safe:animate-fade-enter-top", children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("figure", { ref: boxRef, tabIndex: -1, className: "error-box", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(HStack, { spacing: 2, children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_md.MdErrorOutline, { "aria-hidden": !0 }),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("figcaption", { children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("strong", { children: label }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Ul, { children: errors.map((errorKey) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Li, { id: `error-${errorKey}`, children: list[errorKey] }, `error-${errorKey}`)) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_react6.Link, { to: location.pathname, className: "text-xl", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_md.MdClose, { "aria-label": "Close the banner" }) })
  ] });
};

// app/components/Stack.tsx
var import_jsx_runtime17 = require("react/jsx-runtime"), Stack = ({ children, spacing }) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
  "div",
  {
    className: spacing === 1 ? "flex flex-col gap-1" : spacing === 2 ? "flex flex-col gap-2" : spacing === 3 ? "flex flex-col gap-3" : spacing === 4 ? "flex flex-col gap-4" : spacing === 5 ? "flex flex-col gap-5" : spacing === 6 ? "flex flex-col gap-6" : spacing === 7 ? "flex flex-col gap-7" : spacing === 8 ? "flex flex-col gap-8" : void 0,
    children
  }
);

// app/components/Fields/FormGroup.tsx
var import_jsx_runtime18 = require("react/jsx-runtime"), FormGroup = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Stack, { spacing: 6, children });

// app/components/VisuallyHidden.tsx
var import_jsx_runtime19 = require("react/jsx-runtime"), vhStyles = {
  border: "0px",
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: "0px",
  position: "absolute",
  width: "1px"
}, VisuallyHidden = ({ children, id }) => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { style: vhStyles, id, children });

// app/components/Fields/Label.tsx
var import_jsx_runtime20 = require("react/jsx-runtime"), Label = ({
  children,
  as: asComponent,
  htmlFor,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
  asComponent || "label",
  {
    htmlFor,
    className: "text-gray-500 dark:text-slate-200",
    ...props,
    children
  }
);

// app/components/Fields/TextInput.tsx
var import_jsx_runtime21 = require("react/jsx-runtime"), TextInput = ({
  isInvalid,
  name,
  defaultValue,
  label,
  placeholder,
  type = "text",
  description,
  hiddenLabel,
  id,
  isDisabled,
  ...props
}) => {
  let ariaDescription, currentId = id || name;
  isInvalid ? ariaDescription = `error-${currentId}` : description && (ariaDescription = `${currentId}-hint`);
  let inputClasses = isInvalid ? "h-10 rounded px-4 border border-red-500 dark:text-slate-100 dark:bg-slate-700" : "h-10 rounded px-4 border border-gray-200 dark:border-slate-800 dark:text-slate-100 dark:bg-slate-700";
  return isDisabled && (inputClasses += " border-gray-300 text-gray-600 bg-gray-50"), /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(Stack, { spacing: 2, children: [
    hiddenLabel ? /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(VisuallyHidden, { children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("label", { htmlFor: currentId, children: label }) }) : /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Label, { htmlFor: currentId, children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
      "input",
      {
        type,
        name,
        id: currentId,
        placeholder,
        defaultValue,
        "aria-describedby": ariaDescription,
        "aria-disabled": isDisabled,
        readOnly: isDisabled,
        className: inputClasses,
        ...props
      }
    ),
    description && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("p", { id: `${currentId}-hint`, children: description })
  ] });
};

// app/components/Boxes/SuccessBox.tsx
var import_react8 = require("@remix-run/react"), import_react9 = require("react"), import_ai5 = require("react-icons/ai"), import_md2 = require("react-icons/md");
var import_jsx_runtime22 = require("react/jsx-runtime"), SuccessBox = ({ children, id, ...props }) => {
  let boxRef = (0, import_react9.useRef)(null), location2 = (0, import_react8.useLocation)();
  return (0, import_react9.useEffect)(() => {
    var _a;
    (_a = boxRef == null ? void 0 : boxRef.current) == null || _a.focus();
  }, []), /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
    "div",
    {
      className: "p-4 bg-green-100 text-green-700 rounded border-l-8 border-l-green-600 flex flex-row justify-between motion-safe:animate-fade-enter-top",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("p", { ref: boxRef, tabIndex: -1, id, ...props, className: "success-box", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(HStack, { as: "span", spacing: 2, children: [
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ai5.AiOutlineCheckCircle, { "aria-hidden": !0 }),
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { children })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_react8.Link, { to: location2.pathname, className: "text-xl", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_md2.MdClose, { "aria-label": "Close the banner" }) })
      ]
    },
    id
  );
};

// app/components/Breadcrumbs/hooks/useNavToggle.ts
var import_react11 = require("react");

// app/components/Breadcrumbs/context/NavContext.ts
var import_react10 = require("react"), NavContext = (0, import_react10.createContext)({
  toggleNav: () => {
  },
  isNavOpened: !1
});

// app/components/Breadcrumbs/hooks/useNavToggle.ts
var useNavToggle = () => (0, import_react11.useContext)(NavContext);

// app/components/SkipNav.tsx
var import_jsx_runtime23 = require("react/jsx-runtime"), SkipNavContent = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { id: "content", children }), SkipNavLink = ({ children }) => {
  let { isNavOpened } = useNavToggle();
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
    "a",
    {
      href: "#content",
      tabIndex: isNavOpened ? -1 : 0,
      "aria-hidden": isNavOpened,
      className: "sr-only focus:not-sr-only focus:absolute bg-slate-800 text-white dark:bg-white dark:text-slate-900 focus:p-4 rounded focus:m-4 z-30",
      children
    }
  );
};

// app/components/Main.tsx
var import_jsx_runtime24 = require("react/jsx-runtime"), Main = (props) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(SkipNavContent, { children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("main", { "aria-labelledby": "page-title", ...props }) });

// app/layouts/NotAuthenticatedLayout.tsx
var import_jsx_runtime25 = require("react/jsx-runtime"), NotAuthenticatedLayout = ({
  children,
  nav,
  header,
  status,
  size
}) => /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { children: [
  /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "w-full px-4 lg:px-8 mx-auto " + (size === "S" ? "md:max-w-[480px]" : "md:w-2/5"), children: [
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Spacer, { size: 12 }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(Main, { children: [
      nav && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "inline-block", children: nav }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(Stack, { spacing: 4, children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(Stack, { spacing: 2, children: [
          header,
          status && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Stack, { spacing: 4, children: status })
        ] }),
        children
      ] })
    ] })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Spacer, { size: 10 })
] });

// app/modules/forms/utils/validateEmail.ts
var validateEmail = (email) => {
  if (!email)
    return "The email field is required.";
  if (!/^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,}$/i.test(email))
    return 'The provided email address is not valid. It should look like "jane.doe@domain.com".';
};

// app/constants.ts
var Constants = {
  BackendUrl: process.env.BACKEND_URL || "http://localhost:4000"
};

// app/modules/user/services/forgotPassword.ts
var forgotPassword = (email) => fetch(`${Constants.BackendUrl}/users/forgot-password`, {
  method: "POST",
  body: JSON.stringify({ email }),
  headers: { "Content-Type": "application/json" }
}).then((res) => {
  if (!res.ok)
    throw res.status === 400 ? new Error("The email is required") : new Error("Woops! Something went wrong in the server.");
  return res.json();
});

// app/components/Card.tsx
var import_jsx_runtime26 = require("react/jsx-runtime"), Card = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "border border-gray-100 rounded-md bg-white dark:border-slate-700 dark:bg-slate-800 overflow-hidden", children }), CardContent = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "p-8", children });

// app/components/Logo/Logo.tsx
var import_jsx_runtime27 = require("react/jsx-runtime"), Logo = (props) => /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
  "svg",
  {
    width: "32",
    height: "32",
    viewBox: "0 0 32 32",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("rect", { width: "32", height: "32", rx: "4", fill: "#0f172a" }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
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

// app/components/H1Logo.tsx
var import_jsx_runtime28 = require("react/jsx-runtime"), H1Logo = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "flex flex-row items-center gap-2", children: [
  /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    Logo,
    {
      className: "h-10 w-10 motion-safe:animate-fade-enter-left motion-safe:opacity-0",
      "aria-hidden": !0
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    "h1",
    {
      id: "page-title",
      className: "text-3xl font-bold text-center tracking-wide motion-safe:animate-fade-enter-left motion-safe:opacity-0 dark:text-slate-100",
      style: {
        animationDelay: "300ms"
      },
      children
    }
  )
] });

// app/routes/forgot-password.tsx
var import_jsx_runtime29 = require("react/jsx-runtime"), meta = () => ({
  title: "Progressively | Password forgotten"
}), action = async ({
  request
}) => {
  var _a;
  let email = (_a = (await request.formData()).get("email")) == null ? void 0 : _a.toString(), emailError = validateEmail(email);
  if (emailError)
    return {
      errors: {
        email: emailError
      }
    };
  try {
    return await forgotPassword(email), { success: !0 };
  } catch (error) {
    return error instanceof Error ? {
      errors: {
        backendError: error.message
      }
    } : { errors: { backendError: "An error ocurred" } };
  }
};
function ForgotPasswordPage() {
  let data = (0, import_react12.useActionData)(), transition = (0, import_react12.useTransition)(), success = data == null ? void 0 : data.success, errors = data == null ? void 0 : data.errors;
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
    NotAuthenticatedLayout,
    {
      size: "S",
      nav: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(BackLink, { to: "/signin", children: "Back to signin" }),
      status: errors && Object.keys(errors).length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(ErrorBox, { list: errors }) : success ? /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(SuccessBox, { id: "password-reset", children: "An email with a link to reset your password has been set. Make sure to follow the instructions." }) : null,
      children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(CardContent, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(H1Logo, { children: "Password forgotten" }),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Spacer, { size: 4 }),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Typography, { children: "Enter your email to get a recovery link and reset your password." }),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Spacer, { size: 4 }),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react12.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(FormGroup, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
            TextInput,
            {
              isInvalid: Boolean(errors == null ? void 0 : errors.email),
              label: "Email",
              name: "email",
              type: "email",
              placeholder: "e.g: james.bond@mi6.com"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
            SubmitButton,
            {
              className: "justify-center w-full",
              isLoading: transition.state === "submitting",
              loadingText: "Password resetting in progress, please wait...",
              children: "Reset password"
            }
          )
        ] }) })
      ] }) })
    }
  );
}

// app/routes/oauth2.callback.tsx
var oauth2_callback_exports = {};
__export(oauth2_callback_exports, {
  action: () => action2,
  default: () => OauthCallback,
  loader: () => loader
});
var import_node2 = require("@remix-run/node"), import_react14 = require("@remix-run/react"), import_react15 = require("react"), import_react16 = require("@remix-run/react");

// app/modules/auth/hooks/useOkta.ts
var import_react13 = require("react");

// app/modules/auth/services/okta.ts
var import_okta_auth_js = require("@okta/okta-auth-js"), OktaserviceClientSide = ({
  issuer,
  clientId,
  isOktaActivated
}) => {
  if (!isOktaActivated)
    return;
  let config = {
    issuer,
    clientId,
    redirectUri: "/oauth2/callback",
    responseType: "code"
  }, authClient = new import_okta_auth_js.OktaAuth(config), openLoginPage = async () => {
    let tokenParams = { scopes: ["openid", "profile", "email"] };
    authClient.token.getWithRedirect(tokenParams);
  }, getIdToken = () => authClient.tokenManager.get("id_token");
  return {
    openLoginPage,
    getIdToken,
    getAccessToken: () => authClient.tokenManager.get("access_token"),
    getUser: () => authClient.getUser(),
    setTokensFromUrl: async () => {
      var _a;
      try {
        let { tokens } = await authClient.token.parseFromUrl();
        return tokens.idToken && authClient.tokenManager.add("id_token", tokens.idToken), tokens.accessToken && authClient.tokenManager.add("access_token", tokens.accessToken), (_a = tokens == null ? void 0 : tokens.accessToken) == null ? void 0 : _a.accessToken;
      } catch {
        throw new Error("Authentication failed.");
      }
    },
    logout: async () => {
      let token = await getIdToken();
      if (token) {
        let idToken = token.idToken;
        return authClient.tokenManager.clear(), issuer + "/v1/logout?client_id=" + clientId + "&id_token_hint=" + idToken + "&post_logout_redirect_uri=" + window.location.origin;
      }
      return window.location.origin;
    }
  };
};

// app/modules/auth/hooks/useOkta.ts
var useOkta = (oktaConfig) => {
  let [okta, setOkta] = (0, import_react13.useState)();
  return (0, import_react13.useEffect)(() => {
    let oktaSrv = OktaserviceClientSide(oktaConfig);
    setOkta(oktaSrv);
  }, []), okta;
};

// app/modules/auth/services/get-okta-config.ts
var getOktaConfig = () => ({
  issuer: String(process.env.OKTA_ISSUER),
  clientId: String(process.env.OKTA_CLIENT_ID),
  isOktaActivated: Boolean(
    process.env.OKTA_ISSUER && process.env.OKTA_CLIENT_ID
  )
});

// app/sessions.ts
var import_node = require("@remix-run/node"), sessionSecret = process.env.SESSION_SECRET || "abcd", { getSession, commitSession, destroySession } = (0, import_node.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    httpOnly: !0,
    secure: !0,
    maxAge: 86400,
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret]
  }
});

// app/routes/oauth2.callback.tsx
var import_jsx_runtime30 = require("react/jsx-runtime"), loader = () => ({
  oktaConfig: getOktaConfig()
}), action2 = async ({
  request
}) => {
  let session = await getSession(request.headers.get("Cookie")), accessToken = (await request.formData()).get("accessToken");
  return session.set("auth-cookie", accessToken), (0, import_node2.redirect)("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
};
function OauthCallback() {
  let navigate = (0, import_react14.useNavigate)(), { oktaConfig } = (0, import_react14.useLoaderData)(), okta = useOkta(oktaConfig), fetcher = (0, import_react16.useFetcher)();
  return (0, import_react15.useEffect)(() => {
    if (!okta)
      return;
    (async () => {
      try {
        let accessToken = await (okta == null ? void 0 : okta.setTokensFromUrl());
        accessToken && fetcher.submit({ accessToken }, { method: "post" });
      } catch {
        navigate("/signin?oauthFailed=true");
      }
    })();
  }, [okta, navigate]), /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("main", { className: "p-8", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(HStack, { spacing: 4, children: [
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "text-gray-600 dark:text-slate-400", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Spinner, {}) }),
    /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Typography, { as: "h1", className: "font-bold text-lg", children: "Authentication in progress..." }),
      /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Typography, { children: "It shouldnt be too long, you'll be soon redirected to the dashbaord." })
    ] })
  ] }) });
}

// app/routes/reset-password.tsx
var reset_password_exports = {};
__export(reset_password_exports, {
  action: () => action3,
  default: () => ResetPasswordPage,
  meta: () => meta2
});
var import_react17 = require("@remix-run/react");

// app/modules/forms/utils/validatePassword.ts
var validatePassword = (password) => {
  if (!password)
    return "The password field is required.";
  if (password.length < 8)
    return "The provided password is too short. It should be at least 8 characters.";
}, validateConfirmationPassword = (password) => {
  if (!password)
    return "The confirmation password field is required.";
  if (password.length < 8)
    return "The provided confirmation password is too short. It should be at least 8 characters.";
};

// app/modules/user/services/resetPassword.ts
var resetPassword = (password, token) => fetch(`${Constants.BackendUrl}/users/reset-password`, {
  method: "POST",
  body: JSON.stringify({ password, token }),
  headers: { "Content-Type": "application/json" }
}).then((res) => {
  if (!res.ok)
    throw res.status === 400 ? new Error("An information is missing") : new Error("Woops! Something went wrong in the server.");
  return res.json();
});

// app/routes/reset-password.tsx
var import_jsx_runtime31 = require("react/jsx-runtime"), meta2 = () => ({
  title: "Progressively | Reset password"
}), action3 = async ({
  request
}) => {
  var _a, _b, _c;
  let formData = await request.formData(), token = (_a = formData.get("token")) == null ? void 0 : _a.toString(), password = (_b = formData.get("password")) == null ? void 0 : _b.toString(), confirmationPassword = (_c = formData.get("confirmationPassword")) == null ? void 0 : _c.toString(), passwordError = validatePassword(password), confirmationPasswordError = validateConfirmationPassword(confirmationPassword);
  if (!token)
    return {
      errors: {
        token: "The token is missing"
      }
    };
  if (passwordError || confirmationPasswordError)
    return {
      errors: {
        password: passwordError,
        confirmationPassword: confirmationPasswordError
      }
    };
  if (password !== confirmationPassword)
    return {
      errors: {
        password: "The two passwords are not the same."
      }
    };
  try {
    return await resetPassword(password, token), { success: !0 };
  } catch (error) {
    return error instanceof Error ? {
      errors: {
        backendError: error.message
      }
    } : { errors: { backendError: "An error ocurred" } };
  }
};
function ResetPasswordPage() {
  let data = (0, import_react17.useActionData)(), [searchParams] = (0, import_react17.useSearchParams)(), transition = (0, import_react17.useTransition)(), urlToken = searchParams.get("token"), pageType = searchParams.get("p"), success = data == null ? void 0 : data.success, errors = data == null ? void 0 : data.errors, pageTitle = pageType === "s" ? "Set your password" : "Reset password";
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
    NotAuthenticatedLayout,
    {
      size: "S",
      nav: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(BackLink, { to: "/signin", children: "Back to signin" }),
      status: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_jsx_runtime31.Fragment, { children: [
        errors && Object.keys(errors).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(ErrorBox, { list: errors }),
        success && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(SuccessBox, { id: "password-reset", children: "The password has been successfully reset. You can now connect." })
      ] }),
      children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(CardContent, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(H1Logo, { children: pageTitle }),
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(Spacer, { size: 16 }),
        /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_react17.Form, { method: "post", children: [
          /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
            "input",
            {
              type: "hidden",
              name: "token",
              id: "token",
              value: urlToken || ""
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(FormGroup, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
              TextInput,
              {
                isInvalid: Boolean(errors == null ? void 0 : errors.password),
                label: "New password",
                name: "password",
                placeholder: "**********",
                type: "password"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
              TextInput,
              {
                isInvalid: Boolean(errors == null ? void 0 : errors.confirmationPassword),
                label: "Confirmation password",
                name: "confirmationPassword",
                placeholder: "**********",
                type: "password"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
              SubmitButton,
              {
                className: "justify-center w-full",
                isLoading: transition.state === "submitting",
                loadingText: "Password changing in progress, please wait...",
                children: "Change password"
              }
            ) })
          ] })
        ] })
      ] }) })
    }
  );
}

// app/routes/dashboard.tsx
var dashboard_exports = {};
__export(dashboard_exports, {
  default: () => DashboardLayout,
  handle: () => handle,
  loader: () => loader2
});
var import_react20 = require("@remix-run/react");

// app/modules/auth/services/auth-guard.ts
var import_node3 = require("@remix-run/node");

// app/modules/user/services/getMe.ts
var refreshToken = (session) => {
  let refreshTokenCookie = session.get("refresh-token-cookie");
  return fetch(`${Constants.BackendUrl}/auth/refresh`, {
    headers: {
      Cookie: refreshTokenCookie
    }
  });
}, getUserWithToken = (accessToken) => fetch(`${Constants.BackendUrl}/users/me`, {
  credentials: "include",
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
}).then((res) => {
  if (!res.ok)
    throw res;
  return res.json();
}), getMe = async (session) => {
  try {
    return await getUserWithToken(session.get("auth-cookie"));
  } catch {
    let response = await refreshToken(session), jsonResponse = await response.json();
    return session.set("auth-cookie", jsonResponse.access_token), session.set("refresh-token-cookie", response.headers.get("set-cookie")), await getUserWithToken(session.get("auth-cookie"));
  }
};

// app/modules/auth/services/auth-guard.ts
var authGuard = async (request) => {
  let session = await getSession(request.headers.get("Cookie"));
  if (!session.get("auth-cookie"))
    throw (0, import_node3.redirect)("/401");
  let user = await getMe(session);
  if (!(user != null && user.uuid))
    throw (0, import_node3.redirect)("/401");
  if (!request.url.includes("what-s-your-name") && (user == null ? void 0 : user.fullname) === "")
    throw (0, import_node3.redirect)("/dashboard/what-s-your-name");
  return user;
};

// app/modules/projects/contexts/ProjectsContext.ts
var import_react18 = require("react"), ProjectsContext = (0, import_react18.createContext)({
  projects: []
});

// app/modules/projects/contexts/ProjectsProvider.tsx
var import_jsx_runtime32 = require("react/jsx-runtime"), ProjectsProvider = ({
  children,
  projects
}) => /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(ProjectsContext.Provider, { value: { projects }, children });

// app/modules/projects/services/getProjects.ts
var getProjects = (accessToken) => fetch(`${Constants.BackendUrl}/projects`, {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
}).then((res) => {
  if (!res.ok)
    throw new Error("Woops! Something went wrong in the server.");
  return res.json();
});

// app/modules/user/contexts/UserContext.ts
var import_react19 = require("react"), UserContext = (0, import_react19.createContext)({});

// app/modules/user/contexts/UserProvider.tsx
var import_jsx_runtime33 = require("react/jsx-runtime"), UserProvider = ({ children, user }) => /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(UserContext.Provider, { value: { user }, children });

// app/routes/dashboard.tsx
var import_jsx_runtime34 = require("react/jsx-runtime"), handle = {
  breadcrumb: () => ({
    link: "/dashboard",
    label: "Projects",
    isRoot: !0
  })
}, loader2 = async ({
  request
}) => {
  let user = await authGuard(request), authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie"), projects = await getProjects(authCookie);
  return { user, projects };
};
function DashboardLayout() {
  let { user, projects } = (0, import_react20.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(ProjectsProvider, { projects, children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(UserProvider, { user, children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_react20.Outlet, {}) }) });
}

// app/routes/dashboard/what-s-your-name.tsx
var what_s_your_name_exports = {};
__export(what_s_your_name_exports, {
  action: () => action4,
  default: () => WhatsYourNamePage,
  meta: () => meta3
});
var import_node4 = require("@remix-run/node"), import_react21 = require("@remix-run/react");

// app/modules/user/services/changeFullname.ts
var changeFullname = (fullname, accessToken) => fetch(`${Constants.BackendUrl}/users/me`, {
  method: "PUT",
  body: JSON.stringify({ fullname }),
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  }
}).then((res) => res.json());

// app/modules/user/validators/validate-user-fullname.ts
var validateUserFullname = (fullname) => {
  let errors = {};
  return fullname || (errors.fullname = "The fullname field is required, make sure to have one."), errors;
};

// app/routes/dashboard/what-s-your-name.tsx
var import_jsx_runtime35 = require("react/jsx-runtime"), meta3 = () => ({
  title: "Progressively | What's your name?"
}), action4 = async ({
  request
}) => {
  var _a;
  let fullname = ((_a = (await request.formData()).get("fullname")) == null ? void 0 : _a.toString()) || "", session = await getSession(request.headers.get("Cookie")), errors = validateUserFullname(fullname);
  return errors != null && errors.fullname ? { errors } : (await changeFullname(fullname, session.get("auth-cookie")), (0, import_node4.redirect)("/dashboard"));
};
function WhatsYourNamePage() {
  let data = (0, import_react21.useActionData)(), errors = data == null ? void 0 : data.errors;
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(NotAuthenticatedLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("div", { className: "mt-8 md:mt-36", children: /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(Stack, { spacing: 4, children: [
    /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("div", { className: "text-center motion-safe:animate-fade-enter-top", children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
      "h1",
      {
        className: "font-bold text-4xl md:text-5xl dark:text-slate-100",
        id: "page-title",
        children: "What's your name?"
      }
    ) }),
    (errors == null ? void 0 : errors.fullname) && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(ErrorBox, { list: errors }),
    /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
      "div",
      {
        className: "motion-safe:animate-fade-enter-bottom motion-safe:opacity-0",
        style: {
          animationDelay: "500ms"
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react21.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)("div", { className: "flex flex-col md:flex-row gap-4 items-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("div", { className: "flex-1", children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
            TextInput,
            {
              isInvalid: Boolean(errors == null ? void 0 : errors.fullname),
              label: "Fullname",
              name: "fullname",
              placeholder: "e.g: John Doe",
              hiddenLabel: !0
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(SubmitButton, { type: "submit", children: "Set my fullname" })
        ] }) })
      }
    )
  ] }) }) });
}

// app/routes/dashboard/projects/create.tsx
var create_exports = {};
__export(create_exports, {
  action: () => action5,
  default: () => CreateProjectPage,
  meta: () => meta4
});

// app/modules/projects/services/createProject.ts
var createProject = (name, accessToken) => fetch(`${Constants.BackendUrl}/projects`, {
  method: "POST",
  body: JSON.stringify({ name }),
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  }
}).then((res) => res.json());

// app/modules/projects/validators/validateProjectName.ts
var validateProjectName = (values) => {
  let errors = {};
  return values.name || (errors.name = "The name field is required, make sure to have one."), errors;
};

// app/routes/dashboard/projects/create.tsx
var import_node5 = require("@remix-run/node"), import_react22 = require("@remix-run/react");

// app/layouts/CreateEntityLayout.tsx
var import_jsx_runtime36 = require("react/jsx-runtime"), CreateEntityLayout = ({
  children,
  error,
  status,
  titleSlot,
  submitSlot,
  backLinkSlot
}) => /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)("main", { className: "mx-auto max-w-2xl lg:pt-20", "aria-labelledby": "page-title", children: [
  error,
  /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(Spacer, { size: 4 }),
  status && /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)("div", { children: [
    status,
    /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(Spacer, { size: 4 })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("div", { className: "inline-block motion-safe:animate-fade-enter-bottom motion-safe:opacity-0", children: backLinkSlot }),
  /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(Spacer, { size: 2 }),
  /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
    "div",
    {
      className: "motion-safe:animate-fade-enter-bottom motion-safe:opacity-0",
      style: {
        animationDelay: "300ms"
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(CardContent, { children: [
          titleSlot,
          /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(Spacer, { size: 8 }),
          children
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("div", { className: "flex justify-end px-8 py-4 bg-gray-100 dark:bg-slate-700", children: submitSlot })
      ] })
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(Spacer, { size: 6 })
] });

// app/layouts/CreateEntityTitle.tsx
var import_jsx_runtime37 = require("react/jsx-runtime"), CreateEntityTitle = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("h1", { className: "text-3xl font-semibold dark:text-slate-100", id: "page-title", children });

// app/routes/dashboard/projects/create.tsx
var import_jsx_runtime38 = require("react/jsx-runtime"), meta4 = () => ({
  title: "Progressively | Create a project"
}), action5 = async ({
  request
}) => {
  var _a;
  let projectName = (_a = (await request.formData()).get("name")) == null ? void 0 : _a.toString(), errors = validateProjectName({ name: projectName });
  if (errors != null && errors.name)
    return { errors };
  let session = await getSession(request.headers.get("Cookie")), userProject = await createProject(
    projectName,
    session.get("auth-cookie")
  );
  return (0, import_node5.redirect)(
    `/dashboard?newProjectId=${userProject.projectId}#project-added`
  );
};
function CreateProjectPage() {
  let data = (0, import_react22.useActionData)(), transition = (0, import_react22.useTransition)(), errors = data == null ? void 0 : data.errors;
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_react22.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
    CreateEntityLayout,
    {
      status: (errors == null ? void 0 : errors.name) && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(ErrorBox, { list: errors }),
      titleSlot: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(CreateEntityTitle, { children: "Create a project" }),
      submitSlot: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
        SubmitButton,
        {
          type: "submit",
          isLoading: transition.state === "submitting",
          loadingText: "Creating the project, please wait...",
          children: "Create the project"
        }
      ),
      backLinkSlot: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(BackLink, { to: "/dashboard", children: "Back to projects" }),
      children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
        TextInput,
        {
          isInvalid: Boolean(errors == null ? void 0 : errors.name),
          label: "Project name",
          name: "name",
          placeholder: "e.g: My super project"
        }
      )
    }
  ) });
}

// app/routes/dashboard/projects/$id.tsx
var id_exports = {};
__export(id_exports, {
  default: () => ProjectIdLayout,
  handle: () => handle2,
  loader: () => loader3
});
var import_react25 = require("@remix-run/react");

// app/components/Icons/ProjectIcon.tsx
var import_tb = require("react-icons/tb");

// app/modules/projects/contexts/ProjectContext.ts
var import_react23 = require("react"), ProjectContext = (0, import_react23.createContext)({});

// app/modules/projects/contexts/ProjectProvider.tsx
var import_jsx_runtime39 = require("react/jsx-runtime"), ProjectProvider = ({
  children,
  project,
  userRole
}) => /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(ProjectContext.Provider, { value: { project, userRole }, children });

// app/modules/projects/services/getProject.ts
var getProject = (projectId, accessToken, populate) => {
  let url = new URL(`${Constants.BackendUrl}/projects/${projectId}`);
  return populate && url.searchParams.set("populate", "true"), fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` }
  }).then((res) => {
    if (res.ok)
      return res.json();
    throw res;
  });
};

// app/modules/user/contexts/useUser.ts
var import_react24 = require("react");
var useUser = () => (0, import_react24.useContext)(UserContext);

// app/routes/dashboard/projects/$id.tsx
var import_jsx_runtime40 = require("react/jsx-runtime"), handle2 = {
  breadcrumb: (match, allData) => {
    let routeWithProjects = allData.find(
      (d) => d.id === "routes/dashboard"
    );
    return {
      link: `/dashboard/projects/${match.params.id}`,
      label: match.data.project.name,
      isProject: !0,
      menuItems: routeWithProjects.data.projects.map((p) => ({
        href: `/dashboard/projects/${p.project.uuid}`,
        label: p.project.name,
        icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_tb.TbFolder, { className: "text-indigo-700 dark:text-indigo-400" })
      })),
      menuLabel: "Change project"
    };
  }
}, loader3 = async ({
  request,
  params
}) => {
  let session = await getSession(request.headers.get("Cookie"));
  return { project: await getProject(
    params.id,
    session.get("auth-cookie"),
    !0
  ) };
};
function ProjectIdLayout() {
  var _a;
  let { project } = (0, import_react25.useLoaderData)(), { user } = useUser(), userProject = (_a = project.userProject) == null ? void 0 : _a.find(
    (userProject2) => userProject2.userId === user.uuid
  );
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(ProjectProvider, { project, userRole: userProject == null ? void 0 : userProject.role, children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_react25.Outlet, {}) });
}

// app/routes/dashboard/projects/$id/environments/create.tsx
var create_exports2 = {};
__export(create_exports2, {
  action: () => action6,
  default: () => CreateEnvironmentPage,
  meta: () => meta5
});

// app/modules/environments/services/createEnv.ts
var createEnv = (projectId, name, accessToken) => fetch(`${Constants.BackendUrl}/projects/${projectId}/environments`, {
  method: "POST",
  body: JSON.stringify({ name }),
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  }
}).then((res) => res.json());

// app/modules/environments/validators/validateEnvName.ts
var validateEnvName = (values) => {
  let errors = {};
  return values.name || (errors.name = "The name field is required, make sure to have one."), errors;
};

// app/routes/dashboard/projects/$id/environments/create.tsx
var import_node6 = require("@remix-run/node"), import_react27 = require("@remix-run/react");

// app/modules/projects/contexts/useProject.ts
var import_react26 = require("react");
var useProject = () => (0, import_react26.useContext)(ProjectContext);

// app/modules/projects/services/getProjectMetaTitle.ts
var getProjectMetaTitle = (parentsData) => {
  var _a;
  let project = (_a = parentsData == null ? void 0 : parentsData["routes/dashboard/projects/$id"]) == null ? void 0 : _a.project;
  return (project == null ? void 0 : project.name) || "";
};

// app/routes/dashboard/projects/$id/environments/create.tsx
var import_jsx_runtime41 = require("react/jsx-runtime"), meta5 = ({ parentsData }) => ({
  title: `Progressively | ${getProjectMetaTitle(parentsData)} | Create an environment`
}), action6 = async ({
  request,
  params
}) => {
  var _a;
  let projectId = params.id, projectName = (_a = (await request.formData()).get("env-name")) == null ? void 0 : _a.toString(), errors = validateEnvName({ name: projectName });
  if (errors != null && errors.name)
    return { errors };
  let session = await getSession(request.headers.get("Cookie")), env = await createEnv(
    projectId,
    projectName,
    session.get("auth-cookie")
  );
  return (0, import_node6.redirect)(
    `/dashboard/projects/${projectId}?newEnvId=${env.uuid}#env-added`
  );
};
function CreateEnvironmentPage() {
  let transition = (0, import_react27.useTransition)(), data = (0, import_react27.useActionData)(), { project } = useProject(), errors = data == null ? void 0 : data.errors;
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(import_react27.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
    CreateEntityLayout,
    {
      status: (errors == null ? void 0 : errors.name) && /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(ErrorBox, { list: errors }),
      titleSlot: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(CreateEntityTitle, { children: "Create an environment" }),
      submitSlot: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
        SubmitButton,
        {
          type: "submit",
          isLoading: transition.state === "submitting",
          loadingText: "Creating the environment, please wait...",
          children: "Create the environment"
        }
      ),
      backLinkSlot: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(BackLink, { to: `/dashboard/projects/${project.uuid}`, children: "Back to project" }),
      children: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
        TextInput,
        {
          isInvalid: Boolean(errors == null ? void 0 : errors.name),
          name: "env-name",
          placeholder: "e.g: Staging",
          label: "Environment name"
        }
      )
    }
  ) });
}

// app/routes/dashboard/projects/$id/environments/$env.tsx
var env_exports = {};
__export(env_exports, {
  default: () => EnvIdLayout,
  handle: () => handle3
});
var import_react29 = require("@remix-run/react");

// app/components/Icons/EnvIcon.tsx
var import_fi2 = require("react-icons/fi");

// app/modules/environments/contexts/EnvContext.ts
var import_react28 = require("react"), EnvContext = (0, import_react28.createContext)({});

// app/modules/environments/contexts/EnvProvider.tsx
var import_jsx_runtime42 = require("react/jsx-runtime"), EnvProvider = ({
  children,
  environment
}) => /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(EnvContext.Provider, { value: { environment }, children });

// app/modules/misc/utils/stringToColor.ts
var PredefinedBgColors = {
  A: "hsl(10, 100%, 75%)",
  B: "hsl(265, 100%, 75%)",
  C: "hsl(122, 100%, 75%)"
}, PredefinedTextColor = {
  A: "hsl(10, 100%, 25%)",
  B: "hsl(265, 100%, 25%)",
  C: "hsl(122, 100%, 25%)"
}, PredefinedShapeColor = {
  A: "hsl(10, 100%, 90%)",
  B: "hsl(265, 100%, 90%)",
  C: "hsl(122, 100%, 90%)"
}, getPredefinedColor = (str, lightness) => lightness === 90 ? PredefinedShapeColor[str] : lightness === 25 ? PredefinedTextColor[str] : PredefinedBgColors[str], stringToColor = (str, lightness = 75, saturation = 100) => {
  let maybeColor = getPredefinedColor(str, lightness);
  if (maybeColor)
    return maybeColor;
  let hash = 0;
  for (let i = 0; i < str.length; i++)
    hash = str.charCodeAt(i) + ((hash << 5) - hash), hash = hash & hash;
  return `hsl(${hash % 360}, ${saturation}%, ${lightness}%)`;
};

// app/routes/dashboard/projects/$id/environments/$env.tsx
var import_jsx_runtime43 = require("react/jsx-runtime"), handle3 = {
  breadcrumb: (match, matches) => {
    let parentProjectMatch = matches.find(
      (d) => d.id === "routes/dashboard/projects/$id"
    ), environment = parentProjectMatch.data.project.environments.find(
      (env) => env.uuid === match.params.env
    ), currentPath = matches[matches.length - 1].pathname;
    return {
      link: `/dashboard/projects/${match.params.id}/environments/${match.params.env}`,
      label: environment.name,
      isEnv: !0,
      menuItems: parentProjectMatch.data.project.environments.map((env) => {
        let nextPath = currentPath.replace(
          `/environments/${match.params.env}`,
          `/environments/${env.uuid}`
        ), href = nextPath[nextPath.length - 1] === "/" ? nextPath.slice(0, -1) : nextPath;
        return {
          label: env.name,
          href,
          icon: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_fi2.FiLayers, { style: { color: stringToColor(env.name, 75) } })
        };
      }),
      menuLabel: "Change environment"
    };
  }
};
function EnvIdLayout() {
  let params = (0, import_react29.useParams)(), { project } = useProject(), environment = project.environments.find(
    (env) => env.uuid === params.env
  );
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(EnvProvider, { environment, children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_react29.Outlet, {}) });
}

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId.tsx
var flagId_exports = {};
__export(flagId_exports, {
  default: () => FlagEnvByIdLayout,
  handle: () => handle4,
  loader: () => loader4
});
var import_react31 = require("@remix-run/react");

// app/modules/flags/contexts/FlagEnvContext.ts
var import_react30 = require("react"), FlagEnvContext = (0, import_react30.createContext)({});

// app/modules/flags/contexts/FlagEnvProvider.tsx
var import_jsx_runtime44 = require("react/jsx-runtime"), FlagEnvProvider = ({
  children,
  flagEnv
}) => /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(FlagEnvContext.Provider, { value: { flagEnv }, children });

// app/modules/flags/services/getFlagsByProjectEnv.ts
var getFlagsByProjectEnv = async (envId, accessToken) => fetch(`${Constants.BackendUrl}/environments/${envId}/flags`, {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
}).then((res) => res.json());

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId.tsx
var import_jsx_runtime45 = require("react/jsx-runtime"), handle4 = {
  breadcrumb: (match) => ({
    link: `/dashboard/projects/${match.params.id}/environments/${match.params.env}/flags/${match.params.flagId}`,
    label: match.data.flagEnv.flag.name,
    isFlag: !0
  })
}, loader4 = async ({
  request,
  params
}) => {
  let authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie");
  return {
    flagEnv: (await getFlagsByProjectEnv(
      params.env,
      authCookie
    )).find(
      (flagEnv) => flagEnv.flagId === params.flagId
    )
  };
};
function FlagEnvByIdLayout() {
  let { flagEnv } = (0, import_react31.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(FlagEnvProvider, { flagEnv, children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(import_react31.Outlet, {}) });
}

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/eligibilities/$eligibilityId/delete.tsx
var delete_exports = {};
__export(delete_exports, {
  action: () => action7,
  default: () => DeleteEligibilityPage,
  meta: () => meta6
});

// app/layouts/DeleteEntityLayout.tsx
var import_jsx_runtime46 = require("react/jsx-runtime"), DeleteEntityLayout = ({
  children,
  error,
  confirmAction,
  cancelAction,
  titleSlot,
  backLinkSlot
}) => {
  let { userRole } = useProject();
  return userRole !== "admin" /* Admin */ ? /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(ForbiddenPage, {}) : /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("main", { className: "mx-auto max-w-2xl lg:pt-20", "aria-labelledby": "page-title", children: [
    error,
    /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(Spacer, { size: 4 }),
    /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("div", { className: "inline-block motion-safe:animate-fade-enter-bottom motion-safe:opacity-0", children: backLinkSlot }),
    /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(Spacer, { size: 2 }),
    /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
      "div",
      {
        className: "motion-safe:animate-fade-enter-bottom motion-safe:opacity-0",
        style: {
          animationDelay: "300ms"
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)(Card, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)(CardContent, { children: [
            titleSlot,
            /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(Spacer, { size: 8 }),
            children
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("div", { className: "flex justify-between px-8 py-4 bg-red-50 gap-8 dark:bg-slate-700", children: [
            cancelAction,
            confirmAction
          ] })
        ] })
      }
    )
  ] });
};

// app/components/Buttons/DeleteButton.tsx
var import_fi3 = require("react-icons/fi");
var import_jsx_runtime47 = require("react/jsx-runtime"), DeleteButton = ({ children, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(Button, { scheme: "danger", icon: /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(import_fi3.FiTrash, { "aria-hidden": !0 }), ...props, children });

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/eligibilities/$eligibilityId/delete.tsx
var import_node7 = require("@remix-run/node"), import_react34 = require("@remix-run/react");

// app/modules/environments/contexts/useEnvironment.ts
var import_react32 = require("react");
var useEnvironment = () => (0, import_react32.useContext)(EnvContext);

// app/modules/environments/services/getEnvMetaTitle.ts
var getEnvMetaTitle = (parentsData, envId) => {
  var _a;
  let project = (_a = parentsData == null ? void 0 : parentsData["routes/dashboard/projects/$id"]) == null ? void 0 : _a.project, environment = project == null ? void 0 : project.environments.find((env) => env.uuid === envId);
  return (environment == null ? void 0 : environment.name) || "";
};

// app/modules/flags/contexts/useFlagEnv.ts
var import_react33 = require("react");
var useFlagEnv = () => (0, import_react33.useContext)(FlagEnvContext);

// app/modules/flags/services/getFlagMetaTitle.ts
var getFlagMetaTitle = (parentsData) => {
  var _a, _b;
  let flagEnv = (_a = parentsData == null ? void 0 : parentsData["routes/dashboard/projects/$id/environments/$env/flags/$flagId"]) == null ? void 0 : _a.flagEnv;
  return ((_b = flagEnv == null ? void 0 : flagEnv.flag) == null ? void 0 : _b.name) || "";
};

// app/modules/eligibility/services/deleteEligibility.ts
var deleteEligibility = (eligibilityId, accessToken) => fetch(`${Constants.BackendUrl}/eligibilities/${eligibilityId}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  }
}).then((res) => {
  if (!res.ok)
    throw new Error("You are not authorized to remove this eligibility.");
  return res.json();
});

// app/layouts/DeleteEntityTitle.tsx
var import_jsx_runtime48 = require("react/jsx-runtime"), DeleteEntityTitle = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("h1", { className: "text-2xl font-semibold dark:text-slate-100", id: "page-title", children });

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/eligibilities/$eligibilityId/delete.tsx
var import_jsx_runtime49 = require("react/jsx-runtime"), meta6 = ({ parentsData, params }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env), flagName = getFlagMetaTitle(parentsData);
  return {
    title: `Progressively | ${projectName} | ${envName} | ${flagName} | Eligibility | Delete`
  };
}, action7 = async ({
  request,
  params
}) => {
  let session = await getSession(request.headers.get("Cookie")), projectId = params.id, envId = params.env, flagId = params.flagId, eligibilityId = params.eligibilityId;
  try {
    await deleteEligibility(eligibilityId, session.get("auth-cookie"));
  } catch (error) {
    return error instanceof Error ? { errors: { backendError: error.message } } : { errors: { backendError: "An error ocurred" } };
  }
  return (0, import_node7.redirect)(
    `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}?eligibilityRemoved=true#eligibility-removed`
  );
};
function DeleteEligibilityPage() {
  let transition = (0, import_react34.useTransition)(), { project } = useProject(), { environment } = useEnvironment(), { flagEnv } = useFlagEnv(), data = (0, import_react34.useActionData)(), currentFlag = flagEnv.flag;
  return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
    DeleteEntityLayout,
    {
      titleSlot: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(DeleteEntityTitle, { children: "Deleting an elegibility restriction" }),
      error: (data == null ? void 0 : data.errors) && data.errors.backendError && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(ErrorBox, { list: data.errors }),
      cancelAction: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
        Button,
        {
          variant: "tertiary",
          scheme: "danger",
          to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`,
          children: "Cancel"
        }
      ),
      confirmAction: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(import_react34.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
        DeleteButton,
        {
          type: "submit",
          isLoading: transition.state === "submitting",
          loadingText: "Deleting the strategy, please wait...",
          children: "Yes, delete the eligibility restriction"
        }
      ) }),
      backLinkSlot: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
        BackLink,
        {
          to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`,
          children: "Back to flag"
        }
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(Stack, { spacing: 4, children: [
        /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(Typography, { children: "The eligibility restriction will be removed from the feature flag." }),
        /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(Typography, { children: "This means that the flag resolution will become more permissive." })
      ] })
    }
  );
}

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/scheduling/$scheduleId/delete.tsx
var delete_exports2 = {};
__export(delete_exports2, {
  action: () => action8,
  default: () => DeleteSchedulePage,
  meta: () => meta7
});
var import_node8 = require("@remix-run/node"), import_react35 = require("@remix-run/react");

// app/modules/scheduling/services/deleteSchedule.ts
var deleteSchedule = (scheduleId, accessToken) => fetch(`${Constants.BackendUrl}/scheduling/${scheduleId}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  }
}).then((res) => {
  if (!res.ok)
    throw new Error("You are not authorized to remove this flag.");
  return res.json();
});

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/scheduling/$scheduleId/delete.tsx
var import_jsx_runtime50 = require("react/jsx-runtime"), meta7 = ({ parentsData, params }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env), flagName = getFlagMetaTitle(parentsData);
  return {
    title: `Progressively | ${projectName} | ${envName} | ${flagName} | Scheduling | Delete`
  };
}, action8 = async ({
  request,
  params
}) => {
  let session = await getSession(request.headers.get("Cookie")), projectId = params.id, envId = params.env, flagId = params.flagId;
  try {
    await deleteSchedule(params.scheduleId, session.get("auth-cookie"));
  } catch (error) {
    return error instanceof Error ? { errors: { backendError: error.message } } : { errors: { backendError: "An error ocurred" } };
  }
  return (0, import_node8.redirect)(
    `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/scheduling?scheduleRemoved=true#schedule-removed`
  );
};
function DeleteSchedulePage() {
  let transition = (0, import_react35.useTransition)(), data = (0, import_react35.useActionData)(), { project } = useProject(), { environment } = useEnvironment(), { flagEnv } = useFlagEnv(), currentFlag = flagEnv.flag;
  return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
    DeleteEntityLayout,
    {
      titleSlot: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(DeleteEntityTitle, { children: "Deleting a schedule" }),
      error: (data == null ? void 0 : data.errors) && data.errors.backendError && /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(ErrorBox, { list: data.errors }),
      cancelAction: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
        Button,
        {
          variant: "tertiary",
          scheme: "danger",
          to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/scheduling`,
          children: "Cancel"
        }
      ),
      confirmAction: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(import_react35.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
        DeleteButton,
        {
          type: "submit",
          isLoading: transition.state === "submitting",
          loadingText: "Deleting the schedule, please wait...",
          children: "Yes, delete the schedule"
        }
      ) }),
      backLinkSlot: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
        BackLink,
        {
          to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/scheduling`,
          children: "Back to scheduling"
        }
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)(Stack, { spacing: 4, children: [
        /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)(Typography, { children: [
          "The schedule will be removed from the ",
          /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("strong", { children: "feature flag" }),
          "."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(Typography, { children: "It will not change the flag status at the specified date anymore." })
      ] })
    }
  );
}

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/webhooks/$webhookId/delete.tsx
var delete_exports3 = {};
__export(delete_exports3, {
  action: () => action9,
  default: () => DeleteWebhookPage,
  meta: () => meta8
});
var import_node9 = require("@remix-run/node"), import_react36 = require("@remix-run/react");

// app/modules/webhooks/services/deleteWebhook.ts
var deleteWebhook = (webhookId, accessToken) => fetch(`${Constants.BackendUrl}/webhooks/${webhookId}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  }
}).then((res) => {
  if (!res.ok)
    throw new Error("You are not authorized to remove this webhook.");
  return res.json();
});

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/webhooks/$webhookId/delete.tsx
var import_jsx_runtime51 = require("react/jsx-runtime"), meta8 = ({ parentsData, params }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env), flagName = getFlagMetaTitle(parentsData);
  return {
    title: `Progressively | ${projectName} | ${envName} | ${flagName} | Webhooks | Delete`
  };
}, action9 = async ({
  request,
  params
}) => {
  let session = await getSession(request.headers.get("Cookie")), projectId = params.id, envId = params.env, flagId = params.flagId;
  try {
    await deleteWebhook(params.webhookId, session.get("auth-cookie"));
  } catch (error) {
    return error instanceof Error ? { errors: { backendError: error.message } } : { errors: { backendError: "An error ocurred" } };
  }
  return (0, import_node9.redirect)(
    `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/webhooks?webhookRemoved=true#webhook-removed`
  );
};
function DeleteWebhookPage() {
  let transition = (0, import_react36.useTransition)(), data = (0, import_react36.useActionData)(), { project } = useProject(), { environment } = useEnvironment(), { flagEnv } = useFlagEnv(), currentFlag = flagEnv.flag;
  return /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
    DeleteEntityLayout,
    {
      titleSlot: /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(DeleteEntityTitle, { children: "Deleting a webhook" }),
      error: (data == null ? void 0 : data.errors) && data.errors.backendError && /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(ErrorBox, { list: data.errors }),
      cancelAction: /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
        Button,
        {
          variant: "tertiary",
          scheme: "danger",
          to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/webhooks`,
          children: "Cancel"
        }
      ),
      confirmAction: /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(import_react36.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
        DeleteButton,
        {
          type: "submit",
          isLoading: transition.state === "submitting",
          loadingText: "Deleting the webhook, please wait...",
          children: "Yes, delete the webhook"
        }
      ) }),
      backLinkSlot: /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
        BackLink,
        {
          to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/webhooks`,
          children: "Back to webhooks"
        }
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(Stack, { spacing: 4, children: /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(Typography, { children: "The webhook will not be triggered anymore when the associated event will occur." }) })
    }
  );
}

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/metrics/$metricId/delete.tsx
var delete_exports4 = {};
__export(delete_exports4, {
  action: () => action10,
  default: () => DeleteMetricPage,
  meta: () => meta9
});
var import_node10 = require("@remix-run/node"), import_react37 = require("@remix-run/react");

// app/modules/flags/services/deleteMetric.ts
var deleteMetric = (envId, flagId, metricId, accessToken) => fetch(
  `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/metrics/${metricId}`,
  {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  }
).then((res) => {
  if (!res.ok)
    throw new Error("You are not authorized to remove this metric.");
  return res.json();
});

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/metrics/$metricId/delete.tsx
var import_jsx_runtime52 = require("react/jsx-runtime"), meta9 = ({ parentsData, params }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env), flagName = getFlagMetaTitle(parentsData);
  return {
    title: `Progressively | ${projectName} | ${envName} | ${flagName} | Metrics | Delete`
  };
}, action10 = async ({
  request,
  params
}) => {
  let session = await getSession(request.headers.get("Cookie")), projectId = params.id, envId = params.env, flagId = params.flagId;
  try {
    await deleteMetric(
      envId,
      flagId,
      params.metricId,
      session.get("auth-cookie")
    );
  } catch (error) {
    return error instanceof Error ? { errors: { backendError: error.message } } : { errors: { backendError: "An error ocurred" } };
  }
  return (0, import_node10.redirect)(
    `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/metrics?metricRemoved=true#metric-removed`
  );
};
function DeleteMetricPage() {
  let transition = (0, import_react37.useTransition)(), data = (0, import_react37.useActionData)(), { project } = useProject(), { environment } = useEnvironment(), { flagEnv } = useFlagEnv(), currentFlag = flagEnv.flag;
  return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
    DeleteEntityLayout,
    {
      error: (data == null ? void 0 : data.errors) && data.errors.backendError && /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(ErrorBox, { list: data.errors }),
      titleSlot: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(DeleteEntityTitle, { children: "Deleting a metric" }),
      cancelAction: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
        Button,
        {
          variant: "tertiary",
          scheme: "danger",
          to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/metrics`,
          children: "Cancel"
        }
      ),
      confirmAction: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(import_react37.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
        DeleteButton,
        {
          type: "submit",
          isLoading: transition.state === "submitting",
          loadingText: "Deleting the metric, please wait...",
          children: "Yes, delete the metric"
        }
      ) }),
      backLinkSlot: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
        BackLink,
        {
          to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/metrics`,
          children: "Back to metrics"
        }
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)(Stack, { spacing: 4, children: [
        /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)(Typography, { children: [
          "The metric will be removed from the ",
          /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("strong", { children: "feature flag" }),
          "."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)(Typography, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("strong", { children: "All the metric related data (including events)" }),
          " will be removed and not available anymore."
        ] })
      ] })
    }
  );
}

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/eligibilities/create.tsx
var create_exports3 = {};
__export(create_exports3, {
  action: () => action11,
  default: () => StrategyCreatePage,
  meta: () => meta10
});
var import_react40 = require("react");
var import_node11 = require("@remix-run/node"), import_react41 = require("@remix-run/react");

// app/modules/eligibility/services/createEligibility.ts
var createEligibility = (envId, flagId, eligibility, accessToken) => fetch(
  `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/eligibilities`,
  {
    method: "POST",
    body: JSON.stringify(eligibility),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  }
).then((res) => {
  if (!res.ok)
    throw new Error(
      "Woops! Something went wrong when trying to create the eligibility."
    );
  return res.json();
});

// app/modules/eligibility/components/EligibilityForm.tsx
var import_react39 = require("react"), import_fa = require("react-icons/fa"), import_tb2 = require("react-icons/tb"), import_io = require("react-icons/io");

// app/components/Fields/SelectField.tsx
var import_react38 = require("react");
var import_jsx_runtime53 = require("react/jsx-runtime"), SelectField = ({
  isInvalid,
  name,
  defaultValue,
  label,
  options,
  ...props
}) => {
  var _a;
  let [selected, setSelected] = (0, import_react38.useState)(((_a = options[0]) == null ? void 0 : _a.value) || ""), inputClasses = isInvalid ? "h-10 rounded px-4 border border-red-500 dark:text-slate-100 dark:bg-slate-700" : "h-10 rounded px-4 border border-gray-200 bg-white dark:border-slate-700 dark:text-slate-100 dark:bg-slate-700", icon = options.find((opt) => opt.value === selected);
  return /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)(Stack, { spacing: 2, children: [
    /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(Label, { htmlFor: name, children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("div", { className: inputClasses, children: /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)("div", { className: "flex flex-row gap-2 h-full items-center", children: [
      (icon == null ? void 0 : icon.icon) && /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("span", { "aria-hidden": !0, children: icon == null ? void 0 : icon.icon }),
      /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(
        "select",
        {
          name,
          id: name,
          defaultValue,
          "aria-describedby": isInvalid ? `error-${name}` : void 0,
          className: "w-full h-full bg-transparent text-gray-600 dark:text-slate-100 px-2",
          onChange: (e) => setSelected(e.target.value),
          ...props,
          children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("option", { value: opt.value, children: opt.label }, `${name}-${opt.value}`))
        }
      )
    ] }) })
  ] });
};

// app/components/Tag.tsx
var import_jsx_runtime54 = require("react/jsx-runtime"), sizeStyle = {
  S: "px-2 py-1",
  M: "px-4 py-2"
}, variants = {
  DEFAULT: "bg-gray-100 dark:bg-slate-900 dark:text-slate-100 rounded-full",
  PRIMARY: "bg-indigo-100 text-indigo-700 rounded-full",
  SUCCESS: "bg-green-100 text-green-700 rounded-full"
}, Tag = ({
  children,
  size,
  className = "",
  variant,
  ...props
}) => {
  let sharedClasses = variants[variant || "DEFAULT"], sizesClasses = sizeStyle[size || "M"];
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
    "span",
    {
      className: className + " " + sharedClasses + " " + sizesClasses,
      ...props,
      children
    }
  );
};

// app/modules/eligibility/components/EligibilityForm.tsx
var import_jsx_runtime55 = require("react/jsx-runtime"), EligibilityForm = ({
  errors,
  initialFieldName,
  initialFieldValue,
  initialFieldComparator
}) => {
  let [chips, setChips] = (0, import_react39.useState)([]), handleSubmit = (e) => {
    var _a;
    e.preventDefault();
    let nextChip = ((_a = new FormData(e.currentTarget).get("field-value-parent")) == null ? void 0 : _a.toString()) || "";
    if (!chips.includes(nextChip)) {
      setChips((s) => [...s, nextChip]);
      let input = e.target["field-value-parent"];
      e.currentTarget.reset(), input.focus();
    }
  }, handleRemoval = (idx) => {
    setChips((s) => s.filter((_, index) => idx !== index));
    let input = document.querySelector('[name="field-value-parent"]');
    input == null || input.focus();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(FormGroup, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(HStack, { spacing: 4, children: [
      /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
        TextInput,
        {
          isInvalid: Boolean(errors["field-name"]),
          label: "Field name",
          placeholder: "e.g: email",
          defaultValue: initialFieldName,
          name: "field-name",
          form: "eligibility-form"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
        SelectField,
        {
          isInvalid: Boolean(errors["field-comparator"]),
          name: "field-comparator",
          label: "Field comparator",
          defaultValue: initialFieldComparator,
          options: [
            {
              value: "eq" /* Equals */,
              label: "Equals",
              icon: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(import_fa.FaEquals, {})
            },
            {
              value: "contains" /* Contains */,
              label: "Contains",
              icon: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(import_tb2.TbBox, {})
            }
          ],
          form: "eligibility-form"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { className: "flex flex-row gap-4 items-end", children: [
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { className: "flex-1", children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
          TextInput,
          {
            isInvalid: Boolean(errors["field-value"]),
            label: "Values matching the previous field",
            name: "field-value-parent",
            defaultValue: initialFieldValue,
            placeholder: "e.g: marvin.frachet@something.com"
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(Button, { type: "submit", variant: "secondary", children: "Add value" })
      ] }),
      chips.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(Spacer, { size: 4 }),
      /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("ul", { className: "flex flex-row gap-2 flex-wrap", children: chips.map((chip, index) => /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("li", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(Tag, { className: "text-sm flex flex-row gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("span", { children: chip }),
          /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
            "button",
            {
              "aria-label": `Remove ${chip}`,
              type: "button",
              name: "delete",
              onClick: () => handleRemoval(index),
              children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(import_io.IoMdClose, {})
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
          "input",
          {
            type: "hidden",
            name: "field-value",
            value: chip,
            form: "eligibility-form"
          }
        )
      ] }, index)) })
    ] })
  ] });
};

// app/modules/eligibility/validators/validateEligibilityForm.ts
var validateEligibilityForm = (formData) => {
  let errors = {}, fieldName = formData.get("field-name"), fieldValue = formData.getAll("field-value"), fieldComparator = formData.get("field-comparator");
  return fieldName || (errors["field-name"] = "The field name is required."), (!fieldValue || (fieldValue == null ? void 0 : fieldValue.length) === 0) && (errors["field-value"] = "The field values are required."), fieldComparator || (errors["field-comparator"] = "The field comparator is required."), errors;
};

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/eligibilities/create.tsx
var import_jsx_runtime56 = require("react/jsx-runtime"), meta10 = ({ parentsData, params }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env), flagName = getFlagMetaTitle(parentsData);
  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Eligibility | Create`
  };
}, action11 = async ({
  request,
  params
}) => {
  var _a;
  let formData = await request.formData(), session = await getSession(request.headers.get("Cookie")), fieldValue = formData.getAll("field-value").join(`
`), errors = validateEligibilityForm(formData);
  if (Object.keys(errors).length > 0)
    return { errors };
  let fieldName = ((_a = formData.get("field-name")) == null ? void 0 : _a.toString()) || "", eligibility = {
    fieldComparator: formData.get(
      "field-comparator"
    ) || void 0,
    fieldName,
    fieldValue
  };
  try {
    return await createEligibility(
      params.env,
      params.flagId,
      eligibility,
      session.get("auth-cookie")
    ), (0, import_node11.redirect)(
      `/dashboard/projects/${params.id}/environments/${params.env}/flags/${params.flagId}?newEligibility=true#eligibility-added`
    );
  } catch (error) {
    return error instanceof Error ? { errors: { backendError: error.message } } : { errors: { backendError: "An error ocurred" } };
  }
};
function StrategyCreatePage() {
  let transition = (0, import_react40.useTransition)(), { flagEnv } = useFlagEnv(), { project } = useProject(), { environment } = useEnvironment(), actionData = (0, import_react41.useActionData)(), currentFlag = flagEnv.flag, errors = (actionData == null ? void 0 : actionData.errors) || {};
  return /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(
    CreateEntityLayout,
    {
      backLinkSlot: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
        BackLink,
        {
          to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`,
          children: "Back to flag"
        }
      ),
      status: (actionData == null ? void 0 : actionData.errors) && /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(ErrorBox, { list: actionData.errors }),
      titleSlot: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(CreateEntityTitle, { children: "Create an eligibility restriction" }),
      submitSlot: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
        SubmitButton,
        {
          form: "eligibility-form",
          isLoading: transition.state === "submitting",
          loadingText: "Saving the eligibility restriction, please wait...",
          children: "Save the restriction"
        }
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react41.Form, { method: "post", id: "eligibility-form" }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(EligibilityForm, { errors })
      ]
    }
  );
}

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/$stratId.tsx
var stratId_exports = {};
__export(stratId_exports, {
  default: () => StratIdLayout,
  loader: () => loader5
});
var import_react43 = require("@remix-run/react");

// app/modules/strategies/contexts/StrategyContext.ts
var import_react42 = require("react"), StrategyContext = (0, import_react42.createContext)({});

// app/modules/strategies/contexts/StrategyProvider.tsx
var import_jsx_runtime57 = require("react/jsx-runtime"), StrategyProvider = ({
  children,
  strategy
}) => /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(StrategyContext.Provider, { value: { strategy }, children });

// app/modules/strategies/services/getStrategy.ts
var getStrategy = (stratId, accessToken) => fetch(`${Constants.BackendUrl}/strategies/${stratId}`, {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
}).then((res) => {
  if (!res.ok)
    throw res;
  return res.json();
});

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/$stratId.tsx
var import_jsx_runtime58 = require("react/jsx-runtime"), loader5 = async ({
  request,
  params
}) => {
  let authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie");
  return {
    strategy: await getStrategy(
      params.stratId,
      authCookie
    )
  };
};
function StratIdLayout() {
  let { strategy } = (0, import_react43.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(StrategyProvider, { strategy, children: /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(import_react43.Outlet, {}) });
}

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/$stratId/delete.tsx
var delete_exports5 = {};
__export(delete_exports5, {
  action: () => action12,
  default: () => DeleteStrategyPage,
  meta: () => meta11
});

// app/modules/strategies/services/deleteStrategy.ts
var deleteStrategy = (stratId, accessToken) => fetch(`${Constants.BackendUrl}/strategies/${stratId}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  }
}).then((res) => {
  if (!res.ok)
    throw new Error("You are not authorized to remove this flag.");
  return res.json();
});

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/$stratId/delete.tsx
var import_node12 = require("@remix-run/node"), import_react44 = require("@remix-run/react");
var import_jsx_runtime59 = require("react/jsx-runtime"), meta11 = ({ parentsData, params }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env), flagName = getFlagMetaTitle(parentsData);
  return {
    title: `Progressively | ${projectName} | ${envName} | ${flagName} | Additional audience | Delete`
  };
}, action12 = async ({
  request,
  params
}) => {
  let session = await getSession(request.headers.get("Cookie")), projectId = params.id, envId = params.env, flagId = params.flagId, stratId = params.stratId;
  try {
    await deleteStrategy(stratId, session.get("auth-cookie"));
  } catch (error) {
    return error instanceof Error ? { errors: { backendError: error.message } } : { errors: { backendError: "An error ocurred" } };
  }
  return (0, import_node12.redirect)(
    `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}?stratRemoved=true#strat-removed`
  );
};
function DeleteStrategyPage() {
  let transition = (0, import_react44.useTransition)(), { project } = useProject(), { environment } = useEnvironment(), { flagEnv } = useFlagEnv(), data = (0, import_react44.useActionData)(), currentFlag = flagEnv.flag;
  return /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
    DeleteEntityLayout,
    {
      titleSlot: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(DeleteEntityTitle, { children: "Deleting an additional audience" }),
      error: (data == null ? void 0 : data.errors) && data.errors.backendError && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(ErrorBox, { list: data.errors }),
      cancelAction: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
        Button,
        {
          variant: "tertiary",
          scheme: "danger",
          to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`,
          children: "Cancel"
        }
      ),
      confirmAction: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_react44.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
        DeleteButton,
        {
          type: "submit",
          isLoading: transition.state === "submitting",
          loadingText: "Deleting the additional audience, please wait...",
          children: "Yes, delete the additional audience"
        }
      ) }),
      backLinkSlot: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
        BackLink,
        {
          to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`,
          children: "Back to flag"
        }
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Stack, { spacing: 4, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Typography, { children: [
          "The additional audience will be removed from the",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { children: "feature flag" }),
          "."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Typography, { children: "When a user will resolve a feature flag, this additional audience rule will NOT apply anymore." })
      ] })
    }
  );
}

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/scheduling/create.tsx
var create_exports4 = {};
__export(create_exports4, {
  action: () => action13,
  default: () => SchedulingCreatePage,
  handle: () => handle5,
  meta: () => meta12
});
var import_node13 = require("@remix-run/node"), import_react48 = require("@remix-run/react");

// app/modules/strategies/components/CreateSchedulingForm.tsx
var import_react47 = require("react");

// app/components/Fields/DateTimeInput.tsx
var import_react45 = require("react");
var import_jsx_runtime60 = require("react/jsx-runtime"), completeWithZero = (n) => n < 10 ? `0${n}` : String(n), getFormattedToday = () => {
  let now = new Date();
  return `${now.getFullYear()}-${completeWithZero(
    now.getMonth() + 1
  )}-${completeWithZero(now.getDate())}`;
}, DateTimeInput = ({
  isInvalid,
  name,
  label,
  description
}) => {
  let [date, setDate] = (0, import_react45.useState)(getFormattedToday()), [time, setTime] = (0, import_react45.useState)("00:00"), ariaDescription;
  isInvalid ? ariaDescription = `error-${name}` : description && (ariaDescription = `hint-${name}`);
  let utc;
  if (date && time) {
    let [hours, minutes] = time.split(":"), d = new Date(date);
    try {
      d.setHours(Number(hours)), d.setMinutes(Number(minutes)), utc = d.toISOString();
    } catch {
    }
  }
  let inputClasses = isInvalid ? "h-10 rounded px-4 border border-red-500 text-gray-700 dark:text-slate-100 dark:bg-slate-700" : "h-10 rounded px-4 border border-gray-200 bg-white text-gray-700 dark:border-slate-700 dark:text-slate-100 dark:bg-slate-700";
  return /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(Stack, { spacing: 2, children: /* @__PURE__ */ (0, import_jsx_runtime60.jsx)("fieldset", { "aria-describedby": ariaDescription, children: /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)(Stack, { spacing: 2, children: [
    /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(Label, { as: "legend", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime60.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)("div", { className: "flex flex-col md:flex-row gap-3 items-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(
        "input",
        {
          type: "date",
          name: `date-${name}`,
          id: `date-${name}`,
          placeholder: "",
          onChange: (e) => setDate(e.target.value),
          value: date,
          className: inputClasses
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(
        "input",
        {
          type: "time",
          name: `time-${name}`,
          id: `time-${name}`,
          placeholder: "aaaa",
          onChange: (e) => setTime(e.target.value),
          value: time,
          className: inputClasses
        }
      )
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime60.jsx)("input", { type: "hidden", name: `utc-${name}`, value: utc || "" }),
    description && /* @__PURE__ */ (0, import_jsx_runtime60.jsx)("p", { id: `hint-${name}`, children: description })
  ] }) }) });
};

// app/modules/theme/useTheme.ts
var import_react46 = require("react");
var useTheme = () => (0, import_react46.useContext)(ThemeContext);

// app/components/Fields/SliderInput.tsx
var import_jsx_runtime61 = require("react/jsx-runtime"), SliderInput = ({
  percentageValue,
  name,
  id,
  label,
  hiddenLabel,
  onChange,
  bgColor,
  fgColor
}) => {
  let { theme } = useTheme(), currentId = id || name;
  return /* @__PURE__ */ (0, import_jsx_runtime61.jsx)("div", { style: bgColor ? { "--input-range-track": bgColor } : void 0, children: /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(Stack, { spacing: 2, children: [
    hiddenLabel ? /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(VisuallyHidden, { children: /* @__PURE__ */ (0, import_jsx_runtime61.jsx)("label", { htmlFor: currentId, children: label }) }) : /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(Label, { htmlFor: currentId, children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(HStack, { spacing: 2, children: [
      /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(
        "input",
        {
          autoComplete: "off",
          type: "range",
          min: 0,
          max: 100,
          step: 1,
          value: percentageValue,
          id: currentId,
          name,
          onChange: (e) => onChange(Number(e.target.value)),
          className: "appearance h-10 w-52",
          style: {
            "--input-range-bg": theme === "dark" ? "#64748b" : "#e5e7eb"
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(HStack, { "aria-hidden": !0, children: [
        /* @__PURE__ */ (0, import_jsx_runtime61.jsx)("span", { className: "triangle mt-2" }),
        /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(
          "span",
          {
            className: `px-2 py-1 rounded w-14 text-center ${fgColor ? "" : "text-white bg-indigo-600"}`,
            style: {
              color: fgColor,
              background: bgColor
            },
            children: [
              percentageValue,
              "%"
            ]
          }
        )
      ] })
    ] })
  ] }) });
};

// app/components/Switch.tsx
var import_bs = require("react-icons/bs");
var import_jsx_runtime62 = require("react/jsx-runtime"), Switch = ({
  checked,
  type = "submit",
  onClick,
  label,
  onLabel,
  offLabel,
  form,
  ...props
}) => {
  let thumnailCheckedClasses = checked ? "translate-x-full text-emerald-200" : "", wrapperCheckedClasses = checked ? "bg-emerald-300" : "bg-gray-300 dark:bg-slate-600", thumnailTransitionClasses = checked ? "group-active:-ml-4" : "";
  return /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
    "button",
    {
      "aria-checked": checked,
      type,
      role: "switch",
      "aria-label": label,
      onClick,
      form,
      className: "h-10 px-1 flex items-center gap-2 group",
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Typography, { as: "span", className: "text-sm", children: offLabel || "Off" }),
        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
          "span",
          {
            className: "transition-all ease-in-out duration-200 h-7 w-12 rounded-full inline-block p-1 " + wrapperCheckedClasses,
            children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
              "span",
              {
                "aria-hidden": !0,
                className: "transition-all ease-in-out duration-100 w-5 h-full bg-white block rounded-full group-active:w-7 flex items-center justify-center text-md " + thumnailCheckedClasses + " " + thumnailTransitionClasses,
                children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                  import_bs.BsCheck,
                  {
                    "aria-hidden": !0,
                    className: `transition-all ${checked ? "opacity-1" : "opacity-0"}`
                  }
                )
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Typography, { as: "span", className: "text-sm", children: onLabel || "On" })
      ]
    }
  );
};

// app/modules/scheduling/types.ts
var SchedulingTypes = [
  "UpdatePercentage" /* UpdatePercentage */,
  "UpdateVariantPercentage" /* UpdateVariantPercentage */
];

// app/modules/strategies/components/CreateSchedulingForm.tsx
var import_jsx_runtime63 = require("react/jsx-runtime"), CreateSchedulingFrom = () => {
  let [percentage, setPercentage] = (0, import_react47.useState)(100), [nextStatus, setNextStatus] = (0, import_react47.useState)("NOT_ACTIVATED" /* NOT_ACTIVATED */);
  return /* @__PURE__ */ (0, import_jsx_runtime63.jsxs)(FormGroup, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(
      DateTimeInput,
      {
        label: "When should the flag change status",
        name: "dateTime"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime63.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(Label, { as: "span", id: "next-schedule", children: "What should be the next status" }),
      /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(Spacer, { size: 1 }),
      /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(
        Switch,
        {
          "aria-labelledby": "next-schedule",
          type: "button",
          checked: "ACTIVATED" /* ACTIVATED */ === nextStatus,
          onClick: () => setNextStatus(
            (p) => p === "ACTIVATED" /* ACTIVATED */ ? "NOT_ACTIVATED" /* NOT_ACTIVATED */ : "ACTIVATED" /* ACTIVATED */
          )
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime63.jsx)("input", { type: "hidden", name: "nextStatus", value: nextStatus }),
    /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(
      SliderInput,
      {
        onChange: setPercentage,
        percentageValue: percentage,
        label: "What should be the next rollout percentage",
        name: "rolloutPercentage"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(
      "input",
      {
        type: "hidden",
        name: "type",
        value: "UpdatePercentage" /* UpdatePercentage */
      }
    )
  ] });
};

// app/modules/scheduling/services/createScheduling.ts
var createScheduling = (envId, flagId, scheduling, accessToken) => fetch(
  `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/scheduling`,
  {
    method: "POST",
    body: JSON.stringify(scheduling),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  }
).then((res) => {
  if (!res.ok)
    throw new Error(
      "Woops! Something went wrong when trying to create the scheduling."
    );
  return res.json();
});

// app/modules/scheduling/validators/validateScheduling.ts
var validateScheduling = (values) => {
  var _a, _b;
  let errors = {};
  return (!values.type || !SchedulingTypes.includes(values.type)) && (errors.type = "The type is invalid"), values.utc || (errors.utc = "The provided date is invalid"), (((_a = values.data) == null ? void 0 : _a.rolloutPercentage) === void 0 || ((_b = values.data) == null ? void 0 : _b.rolloutPercentage) === null) && (errors.rolloutPercentage = "The rollout percentage is invalid"), errors;
};

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/scheduling/create.tsx
var import_jsx_runtime64 = require("react/jsx-runtime"), handle5 = {
  breadcrumb: (match) => ({
    link: `/dashboard/projects/${match.params.id}/environments/${match.params.env}/flags/${match.params.flagId}/scheduling/create`,
    label: "Create a scheduling"
  })
}, meta12 = ({ parentsData, params }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env), flagName = getFlagMetaTitle(parentsData);
  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Scheduling | Create`
  };
}, action13 = async ({
  request,
  params
}) => {
  var _a, _b, _c;
  let formData = await request.formData(), session = await getSession(request.headers.get("Cookie")), utc = (_a = formData.get("utc-dateTime")) == null ? void 0 : _a.toString(), type = (_b = formData.get("type")) == null ? void 0 : _b.toString(), status = formData.get("nextStatus") || void 0, rolloutPercentageFormData = (_c = formData.get("rolloutPercentage")) == null ? void 0 : _c.toString(), rolloutPercentage = rolloutPercentageFormData ? Number(rolloutPercentageFormData) : void 0, errors = validateScheduling({
    utc,
    status,
    data: { rolloutPercentage },
    type
  });
  if (Object.keys(errors).length > 0)
    return { errors };
  let scheduling = {
    utc,
    status,
    data: { rolloutPercentage },
    type
  };
  try {
    return await createScheduling(
      params.env,
      params.flagId,
      scheduling,
      session.get("auth-cookie")
    ), (0, import_node13.redirect)(
      `/dashboard/projects/${params.id}/environments/${params.env}/flags/${params.flagId}/scheduling?newSchedule=true#schedule-added`
    );
  } catch (error) {
    return error instanceof Error ? { errors: { backendError: error.message } } : { errors: { backendError: "An error ocurred" } };
  }
};
function SchedulingCreatePage() {
  let { project } = useProject(), { flagEnv } = useFlagEnv(), { environment } = useEnvironment(), transition = (0, import_react48.useTransition)(), currentFlag = flagEnv.flag, actionData = (0, import_react48.useActionData)();
  return /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(import_react48.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(
    CreateEntityLayout,
    {
      status: (actionData == null ? void 0 : actionData.errors) && /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(ErrorBox, { list: actionData.errors }),
      titleSlot: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(CreateEntityTitle, { children: "Create a scheduling" }),
      submitSlot: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(
        SubmitButton,
        {
          isLoading: transition.state === "submitting",
          loadingText: "Saving the scheduling, please wait...",
          children: "Save the schedule"
        }
      ),
      backLinkSlot: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(
        BackLink,
        {
          to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/scheduling`,
          children: "Back to scheduling"
        }
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(CreateSchedulingFrom, {})
    }
  ) });
}

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/create.tsx
var create_exports5 = {};
__export(create_exports5, {
  action: () => action14,
  default: () => StrategyCreatePage2,
  loader: () => loader6,
  meta: () => meta13
});
var import_react50 = require("react");

// app/modules/strategies/validators/validateStrategyForm.ts
var validateStrategyForm = (formData) => {
  let errors = {}, fieldName = formData.get("field-name"), fieldValue = formData.get("field-value"), fieldComparator = formData.get("field-comparator"), valueToServe = formData.get("value-to-serve");
  return fieldName || (errors["field-name"] = "The field name is required."), fieldValue || (errors["field-value"] = "The field values are required."), fieldComparator || (errors["field-comparator"] = "The field comparator is required."), valueToServe || (errors["value-to-serve"] = "The value to serve field is required"), errors;
};

// app/modules/strategies/services/createStrategy.ts
var createStrategy = (envId, flagId, strategy, accessToken) => fetch(
  `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/strategies`,
  {
    method: "POST",
    body: JSON.stringify(strategy),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  }
).then((res) => {
  if (!res.ok)
    throw new Error(
      "Woops! Something went wrong when trying to create the strategy."
    );
  return res.json();
});

// app/modules/strategies/components/AudienceFields.tsx
var import_react49 = require("react"), import_fa2 = require("react-icons/fa"), import_io2 = require("react-icons/io"), import_tb3 = require("react-icons/tb");

// app/components/Fields/Radio.tsx
var import_jsx_runtime65 = require("react/jsx-runtime"), Radio = (props) => /* @__PURE__ */ (0, import_jsx_runtime65.jsx)("input", { type: "radio", className: "appearance-none m-0 w-6 h-6 border border-gray-200 rounded-full flex items-center justify-center before:content-[''] before:h-2 before:w-2 before:rounded-full before:transition-all hover:before:bg-gray-500 checked:hover:before:bg-indigo-500 active:before:scale-150 checked:before:bg-indigo-500 checked:border-indigo-500 checked:before:h-4 checked:before:w-4", ...props });

// app/components/Fields/RadioField.tsx
var import_jsx_runtime66 = require("react/jsx-runtime"), RadioField = ({
  name,
  value,
  onChange,
  options,
  title
}) => /* @__PURE__ */ (0, import_jsx_runtime66.jsxs)("fieldset", { children: [
  /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(Label, { as: "legend", children: title }),
  /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(Spacer, { size: 2 }),
  /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(HStack, { spacing: 2, children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime66.jsxs)(HStack, { spacing: 2, children: [
    /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(
      Radio,
      {
        id: opt.value,
        name,
        value: opt.value,
        checked: opt.value === value,
        onChange: (e) => onChange(e.target.value)
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(Label, { htmlFor: opt.value, children: opt.label })
  ] }, opt.value)) })
] });

// app/components/Fields/TextareaInput.tsx
var import_jsx_runtime67 = require("react/jsx-runtime"), TextareaInput = ({
  isInvalid,
  name,
  defaultValue,
  label,
  placeholder
}) => {
  let inputClasses = isInvalid ? "h-20 rounded px-4 border border-red-500 dark:text-slate-100 dark:bg-slate-700" : "h-20 rounded px-4 border border-gray-200 bg-white dark:border-slate-700 dark:text-slate-100 dark:bg-slate-700";
  return /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)(Stack, { spacing: 2, children: [
    /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(Label, { htmlFor: name, children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(
      "textarea",
      {
        name,
        id: name,
        defaultValue,
        placeholder,
        "aria-describedby": isInvalid ? `error-${name}` : void 0,
        className: inputClasses
      }
    )
  ] });
};

// app/components/Icons/VariantIcon.tsx
var import_ai6 = require("react-icons/ai");

// app/modules/strategies/components/AudienceFields.tsx
var import_jsx_runtime68 = require("react/jsx-runtime"), AudienceFields = ({
  errors,
  initialFieldName,
  initialFieldValue,
  initialFieldComparator,
  variants: variants2
}) => {
  let [status, setStatus] = (0, import_react49.useState)("Boolean" /* Boolean */), valueOptions = [
    {
      value: "Boolean" /* Boolean */,
      label: "A boolean",
      icon: /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(import_io2.IoMdSwitch, {})
    },
    {
      value: "String" /* String */,
      label: "A string"
    }
  ];
  return variants2.length > 0 && valueOptions.push({
    value: "Variant" /* Variant */,
    label: "A variant value",
    icon: /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(import_ai6.AiOutlineAppstore, {})
  }), /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(FormGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)(FormGroup, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)(HStack, { spacing: 4, children: [
      /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
        TextInput,
        {
          isInvalid: Boolean(errors["field-name"]),
          label: "Field name",
          placeholder: "e.g: email",
          defaultValue: initialFieldName,
          name: "field-name"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
        SelectField,
        {
          isInvalid: Boolean(errors["field-comparator"]),
          name: "field-comparator",
          label: "Field comparator",
          defaultValue: initialFieldComparator,
          options: [
            {
              value: "eq" /* Equals */,
              label: "Equals",
              icon: /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(import_fa2.FaEquals, {})
            },
            {
              value: "contains" /* Contains */,
              label: "Contains",
              icon: /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(import_tb3.TbBox, {})
            }
          ]
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
      TextareaInput,
      {
        isInvalid: Boolean(errors["field-value"]),
        label: "Values matching the previous field (one per line)",
        name: "field-value",
        defaultValue: initialFieldValue,
        placeholder: "e.g: marvin.frachet@something.com"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
      RadioField,
      {
        title: "What value to you want to serve?",
        options: valueOptions,
        name: "value-to-serve-type",
        value: status,
        onChange: setStatus
      }
    ),
    status === "Variant" /* Variant */ && /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
      SelectField,
      {
        isInvalid: Boolean(errors["value-to-serve"]),
        name: "value-to-serve",
        label: "Variant value to serve",
        defaultValue: variants2[0].value,
        options: variants2.map((v) => ({
          label: v.value,
          value: v.value,
          icon: /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(import_ai6.AiOutlineAppstore, {})
        }))
      }
    ),
    status === "Boolean" /* Boolean */ && /* @__PURE__ */ (0, import_jsx_runtime68.jsx)("div", { className: "flex", children: /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
      SelectField,
      {
        isInvalid: Boolean(errors["value-to-serve"]),
        name: "value-to-serve",
        label: "Boolean value to serve",
        defaultValue: initialFieldComparator,
        options: [
          { value: "true", label: "True", icon: /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(import_io2.IoMdSwitch, {}) },
          { value: "false", label: "False", icon: /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(import_io2.IoMdSwitch, {}) }
        ]
      }
    ) }),
    status === "String" /* String */ && /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
      TextInput,
      {
        isInvalid: Boolean(errors["value-to-serve"]),
        label: "String value to serve",
        placeholder: "e.g: A",
        name: "value-to-serve"
      }
    )
  ] }) });
};

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/create.tsx
var import_node14 = require("@remix-run/node"), import_react51 = require("@remix-run/react");

// app/modules/variants/services/getVariants.ts
var getVariants = (envId, flagId, accessToken) => fetch(
  `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/variants`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }
).then((res) => {
  if (!res.ok)
    throw new Error("Woops! Something went wrong in the server.");
  return res.json();
});

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/create.tsx
var import_jsx_runtime69 = require("react/jsx-runtime"), meta13 = ({ parentsData, params }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env), flagName = getFlagMetaTitle(parentsData);
  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Strategies | Create`
  };
}, loader6 = async ({
  request,
  params
}) => {
  let authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie");
  return {
    variants: await getVariants(
      params.env,
      params.flagId,
      authCookie
    )
  };
}, action14 = async ({
  request,
  params
}) => {
  var _a;
  let formData = await request.formData(), session = await getSession(request.headers.get("Cookie")), errors = validateStrategyForm(formData);
  if (Object.keys(errors).length > 0)
    return { errors };
  let fieldName = formData.get("field-name") || "", fieldValue = formData.get("field-value") || "", valueToServeType = ((_a = formData.get("value-to-serve-type")) == null ? void 0 : _a.toString()) === "Boolean" /* Boolean */ ? "Boolean" /* Boolean */ : "String" /* String */, valueToServe = formData.get("value-to-serve") || "false", strategy = {
    fieldComparator: formData.get(
      "field-comparator"
    ) || void 0,
    fieldName,
    fieldValue,
    valueToServeType,
    valueToServe
  };
  try {
    return await createStrategy(
      params.env,
      params.flagId,
      strategy,
      session.get("auth-cookie")
    ), (0, import_node14.redirect)(
      `/dashboard/projects/${params.id}/environments/${params.env}/flags/${params.flagId}?newStrategy=true#strategy-added`
    );
  } catch (error) {
    return error instanceof Error ? { errors: { backendError: error.message } } : { errors: { backendError: "An error ocurred" } };
  }
};
function StrategyCreatePage2() {
  let { variants: variants2 } = (0, import_react51.useLoaderData)(), transition = (0, import_react50.useTransition)(), { flagEnv } = useFlagEnv(), { project } = useProject(), { environment } = useEnvironment(), actionData = (0, import_react51.useActionData)(), currentFlag = flagEnv.flag, errors = (actionData == null ? void 0 : actionData.errors) || {};
  return /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(import_react51.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(
    CreateEntityLayout,
    {
      status: (actionData == null ? void 0 : actionData.errors) && /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(ErrorBox, { list: actionData.errors }),
      titleSlot: /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(CreateEntityTitle, { children: "Create an additional audience" }),
      submitSlot: /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(
        SubmitButton,
        {
          isLoading: transition.state === "submitting",
          loadingText: "Saving the strategy, please wait...",
          children: "Save the additional audience"
        }
      ),
      backLinkSlot: /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(
        BackLink,
        {
          to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`,
          children: "Back to flag"
        }
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(FormGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(AudienceFields, { errors, variants: variants2 }) })
    }
  ) });
}

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/scheduling/index.tsx
var scheduling_exports = {};
__export(scheduling_exports, {
  action: () => action15,
  default: () => SchedulingOfFlag,
  loader: () => loader7,
  meta: () => meta14
});
var import_react64 = require("@remix-run/react"), import_ai11 = require("react-icons/ai");

// app/components/Boxes/WarningBox.tsx
var import_ai7 = require("react-icons/ai");
var import_jsx_runtime70 = require("react/jsx-runtime"), WarningBox = ({ list, title }) => {
  let warnings = list ? Object.keys(list) : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(
    "figure",
    {
      tabIndex: -1,
      className: "warning-box p-4 bg-orange-100 text-orange-700 rounded border-l-8 border-l-orange-600",
      children: /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)(HStack, { spacing: 2, children: [
          /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(import_ai7.AiOutlineWarning, { "aria-hidden": !0 }),
          /* @__PURE__ */ (0, import_jsx_runtime70.jsx)("figcaption", { children: /* @__PURE__ */ (0, import_jsx_runtime70.jsx)("strong", { children: title }) })
        ] }),
        warnings && list && warnings.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)(import_jsx_runtime70.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(Spacer, { size: 4 }),
          /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(Ul, { children: warnings.map((warningKey) => /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(Li, { id: `warning-${warningKey}`, children: list[warningKey] }, `warning-${warningKey}`)) })
        ] }) : null
      ] })
    }
  );
};

// app/components/Buttons/CreateButton.tsx
var import_io3 = require("react-icons/io"), import_jsx_runtime71 = require("react/jsx-runtime"), CreateButton = ({ children, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(Button, { variant: "primary", icon: /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(import_io3.IoMdCreate, { "aria-hidden": !0 }), ...props, children });

// app/components/Icons/EmptyBoxIcon.tsx
var import_jsx_runtime72 = require("react/jsx-runtime"), EmptyBoxIcon = () => /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
  "svg",
  {
    className: "empty-box-icon",
    "aria-hidden": !0,
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    x: "0px",
    y: "0px",
    viewBox: "0 0 1000 1000",
    enableBackground: "new 0 0 1000 1000",
    xmlSpace: "preserve",
    children: /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("g", { children: /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("path", { d: "M860.3,374.7l124.4-124.4c4-3.9,5.8-9.4,5.2-14.8c-0.8-5.6-4-10.4-8.7-13.2L645.7,28.5c-6.9-4-15.7-2.8-21.3,2.9L500,155.8L375.6,31.5c-5.7-5.7-14.4-6.9-21.4-2.9L18.8,222.4c-4.9,2.8-8,7.6-8.7,13.2c-0.7,5.3,1,10.9,4.9,14.8l124.4,124.4L15.1,499.3c-3.9,3.9-5.7,9.4-4.9,14.8c0.6,5.4,3.8,10.3,8.7,13l128,74v161.2c0,6.4,3.4,12.2,8.8,15.4l335.5,193.9c2.7,1.7,5.8,2.3,8.8,2.3c3,0,6.1-0.7,8.8-2.3l335.4-193.9c5.4-3.2,8.8-9,8.8-15.4V601.1l128.1-74c4.7-2.8,7.9-7.6,8.7-13c0.7-5.5-1.2-10.9-5.2-14.8L860.3,374.7L860.3,374.7z M799.9,372.5L500,545.8L200,372.5l224.9-130l75.1-43.3l271.3,156.6L799.9,372.5L799.9,372.5z M639.8,63.8l303.6,175.6l-111,111l-18.2-10.5L528.7,174.9L639.8,63.8L639.8,63.8z M360.2,63.8l111.1,111.1L167.5,350.3l-111.1-111L360.2,63.8L360.2,63.8z M167.5,394.6l303.6,175.6l-111,111L173.3,573.2c-0.1,0-0.1,0-0.1,0L56.4,505.7L167.5,394.6L167.5,394.6z M182.2,619.3l172,99.3c2.8,1.7,5.8,2.4,8.8,2.4c0.4,0,0.6-0.4,1-0.4c4.1-0.1,8.3-1.5,11.5-4.7l106.8-106.8v314.2L182.2,749.8L182.2,619.3L182.2,619.3z M817.6,749.8l-300,173.4V609.1l106.6,106.8c3.1,3.1,7.2,4.4,11.4,4.7c0.4,0,0.7,0.4,1,0.4c3.1,0,6.1-0.7,8.8-2.4l172-99.3V749.8L817.6,749.8z M639.7,681.1l-111-111l303.7-175.6l111,111.1L639.7,681.1L639.7,681.1z" }) })
  }
);

// app/components/EmptyState.tsx
var import_jsx_runtime73 = require("react/jsx-runtime"), EmptyState = ({
  title,
  description,
  titleAs = "h3",
  id,
  action: action37
}) => /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)("div", { className: "flex flex-col items-center lg:py-10", children: [
  /* @__PURE__ */ (0, import_jsx_runtime73.jsx)("div", { className: "h-32 w-32 fill-gray-200", children: /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(EmptyBoxIcon, {}) }),
  /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(Spacer, { size: 6 }),
  /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    titleAs,
    {
      id,
      className: "text-2xl text-gray-500 dark:text-slate-200",
      children: title
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(Spacer, { size: 2 }),
  /* @__PURE__ */ (0, import_jsx_runtime73.jsx)("div", { className: "max-w-lg text-center", children: /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(Typography, { className: "text-gray-500 dark:text-slate-400", children: description }) }),
  /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(Spacer, { size: 2 }),
  action37 && /* @__PURE__ */ (0, import_jsx_runtime73.jsx)("div", { className: "inline-block", children: action37 })
] });

// app/components/Header.tsx
var import_jsx_runtime74 = require("react/jsx-runtime"), Header = ({
  title,
  description,
  tagline,
  action: action37
}) => /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("header", { className: "flex flex-row gap-4", "aria-labelledby": "header-title", children: [
  /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("div", { children: [
    tagline,
    /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(Spacer, { size: 1 }),
    /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(HStack, { spacing: 6, children: /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(
      "p",
      {
        id: "header-title",
        className: "text-xl font-bold dark:text-slate-100",
        children: title
      }
    ) }),
    description
  ] }),
  action37
] });

// app/components/Icons/FlagIcon.tsx
var import_tb4 = require("react-icons/tb"), import_jsx_runtime75 = require("react/jsx-runtime"), FlagIcon = () => /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(import_tb4.TbFlag3, {});

// app/components/PageTitle.tsx
var import_jsx_runtime76 = require("react/jsx-runtime"), PageTitle = ({
  value,
  icon,
  action: action37,
  description,
  endAction
}) => /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)("div", { className: "flex flex-col md:flex-row md:justify-between gap-3 items-center", children: [
  /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)(HStack, { spacing: 3, children: [
      icon && /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
        "span",
        {
          "aria-hidden": !0,
          className: "text-indigo-700 dark:text-indigo-400 text-4xl",
          children: icon
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
        "h1",
        {
          className: "font-bold text-4xl md:text-5xl dark:text-white",
          id: "page-title",
          children: /* @__PURE__ */ (0, import_jsx_runtime76.jsx)("span", { children: value })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime76.jsx)("div", { className: "h-12", children: endAction })
    ] }),
    description && /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(Spacer, { size: 2 }),
      description
    ] })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime76.jsx)("div", { children: action37 })
] });

// app/components/Section.tsx
var import_react52 = require("react");
var import_jsx_runtime77 = require("react/jsx-runtime"), SectionContext = (0, import_react52.createContext)(void 0), Section = ({ children, id, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(SectionContext.Provider, { value: id, children: /* @__PURE__ */ (0, import_jsx_runtime77.jsx)("section", { "aria-labelledby": id, ...props, children }) }), SectionHeader = ({
  title,
  titleAs = "h2",
  description,
  action: action37,
  status,
  name,
  ...props
}) => {
  let id = (0, import_react52.useContext)(SectionContext);
  return /* @__PURE__ */ (0, import_jsx_runtime77.jsx)("div", { ...props, children: /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)(Stack, { spacing: 4, children: [
    /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)("div", { className: "flex flex-col md:flex-row md:justify-between gap-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(
          titleAs,
          {
            as: titleAs,
            className: "text-2xl font-medium dark:text-white",
            id,
            name,
            children: title
          }
        ),
        description && /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)(import_jsx_runtime77.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(Spacer, { size: 1 }),
          description && /* @__PURE__ */ (0, import_jsx_runtime77.jsx)("div", { className: "text-gray-500 dark:text-slate-400 max-w-2xl", children: description })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime77.jsx)("div", { children: action37 })
    ] }),
    status
  ] }) });
};

// app/components/Tagline.tsx
var import_jsx_runtime78 = require("react/jsx-runtime"), TagLine = ({ icon, children }) => /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("div", { className: "text-sm text-indigo-700 dark:text-indigo-400", children: /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)(HStack, { spacing: 1, children: [
  icon && /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("span", { "aria-hidden": !0, children: icon }),
  /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(Typography, { children })
] }) });

// app/components/Container.tsx
var import_jsx_runtime79 = require("react/jsx-runtime"), Container = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime79.jsx)("div", { className: "px-4 md:px-8", children });

// app/components/Breadcrumbs/providers/NavProvider.tsx
var import_react53 = require("react");
var import_jsx_runtime80 = require("react/jsx-runtime"), NavProvider = ({ children }) => {
  let [isNavOpened, setIsNavOpened] = (0, import_react53.useState)(!1), toggleNav = (0, import_react53.useCallback)(() => {
    setIsNavOpened((s) => !s);
  }, [setIsNavOpened]);
  return (0, import_react53.useEffect)(() => {
    document.body.style.overflow = isNavOpened ? "hidden" : "revert";
  }, [isNavOpened]), /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(NavContext.Provider, { value: { isNavOpened, toggleNav }, children });
};

// app/components/Breadcrumbs/InertWhenNavOpened.tsx
var import_jsx_runtime81 = require("react/jsx-runtime"), InertWhenNavOpened = ({
  children,
  ...props
}) => {
  let { isNavOpened } = useNavToggle();
  return /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("div", { "aria-hidden": isNavOpened, ...props, children });
};

// app/components/Avatar.tsx
var import_jsx_runtime82 = require("react/jsx-runtime"), Avatar = ({ children }) => {
  let firstLetter = children[0];
  return /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(
    "div",
    {
      className: "rounded-full uppercase flex items-center bg-indigo-600 h-8 w-8 justify-center text-white",
      "aria-hidden": !0,
      children: firstLetter
    }
  );
};

// app/components/HideMobile.tsx
var import_jsx_runtime83 = require("react/jsx-runtime"), HideDesktop = ({ as: Component = "span", ...props }) => /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Component, { className: "lg:hidden", ...props }), HideTablet = ({
  as: Component = "span",
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Component, { className: "hidden lg:block " + className, ...props }), HideMobile = ({ as: Component = "span", ...props }) => /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Component, { className: "hidden md:block", ...props });

// app/components/ThemeSwitch.tsx
var import_bs2 = require("react-icons/bs"), import_fi4 = require("react-icons/fi");
var import_jsx_runtime84 = require("react/jsx-runtime"), ThemeSwitch = () => {
  let { theme, toggleTheme } = useTheme();
  if (!theme)
    return null;
  let checked = theme === "dark", thumnailCheckedClasses = checked ? "translate-x-full text-slate-900 bg-slate-200" : "text-orange-400 bg-white", wrapperCheckedClasses = checked ? "bg-slate-700" : "bg-orange-200", thumnailTransitionClasses = checked ? "group-active:-ml-4" : "";
  return /* @__PURE__ */ (0, import_jsx_runtime84.jsxs)(
    "button",
    {
      "aria-checked": checked,
      type: "button",
      role: "switch",
      "aria-label": "Toggle theme",
      onClick: toggleTheme,
      className: "h-10 px-1 flex items-center gap-2 group",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(Typography, { as: "span", className: "text-xs", children: "Light" }),
        /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(
          "span",
          {
            className: "transition-all ease-in-out duration-200 h-7 w-12 rounded-full inline-block p-1 " + wrapperCheckedClasses,
            children: /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(
              "span",
              {
                "aria-hidden": !0,
                className: "transition-all ease-in-out duration-100 w-5 h-full block rounded-full group-active:w-7 flex items-center justify-center " + thumnailCheckedClasses + " " + thumnailTransitionClasses,
                children: checked ? /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(import_fi4.FiMoon, {}) : /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(import_bs2.BsSun, {})
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(Typography, { as: "span", className: "text-xs", children: "Dark" })
      ]
    }
  );
};

// app/modules/user/components/UserDropdown.tsx
var import_jsx_runtime85 = require("react/jsx-runtime"), UseDropdown = ({ user }) => /* @__PURE__ */ (0, import_jsx_runtime85.jsxs)("nav", { "aria-label": "User related", className: "flex flex-row gap-2 ", children: [
  /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(ThemeSwitch, {}),
  /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(
    Button,
    {
      to: "/profile",
      className: "text-sm",
      icon: /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(Avatar, { "aria-hidden": !0, children: user.fullname }),
      variant: "tertiary",
      "aria-label": user.fullname,
      children: /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(HideMobile, { children: user.fullname })
    }
  )
] });

// app/layouts/DashboardLayout.tsx
var import_react60 = require("@remix-run/react");

// app/components/Link.tsx
var import_react54 = require("@remix-run/react"), import_react55 = require("react"), import_jsx_runtime86 = require("react/jsx-runtime"), Link4 = (0, import_react55.forwardRef)(
  ({ to, children, href, target, rel, className = "", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime86.jsx)(
    href ? "a" : import_react54.Link,
    {
      href,
      ref,
      to: href ? void 0 : to,
      target,
      rel,
      className: "underline hover:text-gray-600 hover:dark:text-slate-100 active:text-black " + className,
      ...props,
      children
    }
  )
);
Link4.displayName = "Link";

// app/components/MenuButton.tsx
var import_react56 = require("@headlessui/react"), import_react57 = require("@remix-run/react"), import_react58 = require("react"), import_md3 = require("react-icons/md"), import_jsx_runtime87 = require("react/jsx-runtime"), MenuButton = ({ items, label }) => /* @__PURE__ */ (0, import_jsx_runtime87.jsx)("div", { className: "relative", children: /* @__PURE__ */ (0, import_jsx_runtime87.jsxs)(import_react56.Menu, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime87.jsx)(
    import_react56.Menu.Button,
    {
      className: "w-8 h-8 flex justify-center items-center hover:bg-gray-100 hover:dark:bg-slate-800 transition-all rounded text-gray-700 dark:text-slate-200",
      children: /* @__PURE__ */ (0, import_jsx_runtime87.jsx)(import_md3.MdOutlineKeyboardArrowDown, { "aria-label": label })
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime87.jsx)(
    import_react56.Transition,
    {
      as: import_react58.Fragment,
      enter: "transition ease-out duration-100",
      enterFrom: "transform opacity-0 scale-95",
      enterTo: "transform opacity-100 scale-100",
      leave: "transition ease-in duration-75",
      leaveFrom: "transform opacity-100 scale-100",
      leaveTo: "transform opacity-0 scale-95",
      children: /* @__PURE__ */ (0, import_jsx_runtime87.jsx)(import_react56.Menu.Items, { className: "absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-slate-700 rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5", children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime87.jsx)(import_react56.Menu.Item, { children: ({ active }) => /* @__PURE__ */ (0, import_jsx_runtime87.jsxs)(
        import_react57.NavLink,
        {
          className: `flex gap-2 w-full items-center first:rounded-t-md last:rounded-b-md px-3 py-3 text-sm text-gray-700 dark:text-slate-200 font-normal focus:bg-gray-100 ${active ? "bg-gray-100 dark:bg-slate-700" : ""}`,
          to: item.href,
          children: [
            item.icon,
            item.label
          ]
        }
      ) }, item.href)) })
    }
  )
] }) });

// app/components/Breadcrumbs/CrumbIcon.tsx
var import_tb5 = require("react-icons/tb");
var import_jsx_runtime88 = require("react/jsx-runtime"), IconWrapper = ({ children, color }) => /* @__PURE__ */ (0, import_jsx_runtime88.jsx)("span", { className: `flex ${color || ""}`, children }), CrumbIcon = ({
  crumb,
  color
}) => crumb.isRoot ? /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(IconWrapper, { color, children: /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(import_tb5.TbFolders, {}) }) : crumb.isEnv ? /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(IconWrapper, { color, children: /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(import_fi2.FiLayers, {}) }) : crumb.isFlag ? /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(IconWrapper, { color, children: /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(FlagIcon, {}) }) : crumb.isProject ? /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(IconWrapper, { color, children: /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(import_tb.TbFolder, {}) }) : null;

// app/components/Breadcrumbs/DesktopNav.tsx
var import_jsx_runtime89 = require("react/jsx-runtime"), DesktopNav = ({ crumbs }) => {
  let lastItemIndex = crumbs.length - 1;
  return /* @__PURE__ */ (0, import_jsx_runtime89.jsx)("nav", { "aria-label": "Breadcrumbs", children: /* @__PURE__ */ (0, import_jsx_runtime89.jsx)("ol", { className: "flex h-12 items-center", children: crumbs.map((crumb, index) => {
    let currentPage = index === lastItemIndex;
    return /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)(
      "li",
      {
        className: "flex items-center last-of-type:text-indigo-700 last-of-type:font-bold",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(
            Link4,
            {
              "aria-current": currentPage ? "page" : void 0,
              to: crumb.link,
              className: `transition-all px-2 -mx-1 py-1 rounded hover:text-black hover:dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 active:bg-gray-200 dark:active:bg-slate-700 active:text-indigo-700 no-underline text-xs ${currentPage ? "text-black dark:text-slate-100" : "text-gray-500 dark:text-slate-200"}`,
              children: /* @__PURE__ */ (0, import_jsx_runtime89.jsx)("div", { className: "rounded px-2 -mx-1 py-1", children: /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(HStack, { spacing: 2, children: crumb.isRoot ? /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(Logo, { "aria-label": crumb.label }) : /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)(import_jsx_runtime89.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(
                  CrumbIcon,
                  {
                    crumb,
                    color: currentPage ? "text-indigo-700 dark:text-indigo-400" : ""
                  }
                ),
                crumb.label
              ] }) }) })
            }
          ),
          crumb.menuItems ? /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(MenuButton, { items: crumb.menuItems, label: crumb.menuLabel }) : null,
          !currentPage && /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(
            "div",
            {
              className: "flex text-gray-200 dark:text-slate-500 px-2",
              "aria-hidden": !0,
              children: "/"
            }
          )
        ]
      },
      crumb.link
    );
  }) }) });
};

// app/components/Breadcrumbs/MobileNav.tsx
var import_ai8 = require("react-icons/ai"), import_io4 = require("react-icons/io");

// app/components/FocusTrap.tsx
var import_react59 = require("react");

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
var import_jsx_runtime90 = require("react/jsx-runtime"), FocusTrap = ({ children, isActive, initialElementSelector }) => {
  let trappedRef = (0, import_react59.useRef)(null);
  return (0, import_react59.useEffect)(() => {
    if (!isActive)
      return;
    let currentFocus = document.activeElement;
    return () => {
      currentFocus == null || currentFocus.focus();
    };
  }, [isActive]), (0, import_react59.useEffect)(() => {
    if (!isActive || !trappedRef.current)
      return;
    if (initialElementSelector) {
      let focusableElement = trappedRef.current.querySelector(`#${initialElementSelector}`);
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
  }, [isActive, initialElementSelector]), /* @__PURE__ */ (0, import_jsx_runtime90.jsx)("div", { ref: trappedRef, onKeyDown: isActive ? (e) => {
    if (e.key !== KeyboardKeys.TAB)
      return;
    let focusableChildren = getFocusableNodes(trappedRef.current);
    if (focusableChildren.length > 0) {
      let firstElement = focusableChildren[0], lastElement = focusableChildren[focusableChildren.length - 1];
      e.shiftKey ? firstElement === document.activeElement && (e.preventDefault(), lastElement == null || lastElement.focus()) : lastElement === document.activeElement && (e.preventDefault(), firstElement == null || firstElement.focus());
    }
  } : void 0, children });
};

// app/components/Breadcrumbs/MobileNav.tsx
var import_jsx_runtime91 = require("react/jsx-runtime"), MobileNav = ({ crumbs }) => {
  let { toggleNav, isNavOpened } = useNavToggle(), lastItemIndex = crumbs.length - 1;
  return /* @__PURE__ */ (0, import_jsx_runtime91.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime91.jsxs)(
      Button,
      {
        variant: "tertiary",
        onClick: toggleNav,
        tabIndex: isNavOpened ? -1 : 0,
        "aria-hidden": isNavOpened,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime91.jsx)(import_ai8.AiOutlineMenu, {}),
          /* @__PURE__ */ (0, import_jsx_runtime91.jsx)(VisuallyHidden, { children: "Toggle menu" })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime91.jsx)(
      "div",
      {
        className: "absolute z-20 h-full w-full bg-white dark:bg-slate-800 top-0 bottom-0 left-0 transition-transform ease-in-out duration-200 " + (isNavOpened ? "translate-x-0" : "-translate-x-full"),
        children: /* @__PURE__ */ (0, import_jsx_runtime91.jsx)(FocusTrap, { isActive: isNavOpened, children: /* @__PURE__ */ (0, import_jsx_runtime91.jsxs)("div", { className: "p-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime91.jsx)(
            Button,
            {
              variant: "primary",
              onClick: toggleNav,
              icon: /* @__PURE__ */ (0, import_jsx_runtime91.jsx)(import_io4.IoMdClose, {}),
              tabIndex: isNavOpened ? 0 : -1,
              "aria-hidden": !isNavOpened,
              children: "Close menu"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime91.jsx)(Spacer, { size: 12 }),
          /* @__PURE__ */ (0, import_jsx_runtime91.jsx)(
            "nav",
            {
              "aria-label": "Application breadcrumbs",
              "aria-hidden": !isNavOpened,
              children: /* @__PURE__ */ (0, import_jsx_runtime91.jsx)("ol", { children: crumbs.map((crumb, index) => {
                let currentPage = index === lastItemIndex;
                return /* @__PURE__ */ (0, import_jsx_runtime91.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime91.jsx)(
                  Link4,
                  {
                    tabIndex: isNavOpened ? 0 : -1,
                    "aria-hidden": !isNavOpened,
                    "aria-current": crumb.forceNotCurrent ? void 0 : currentPage ? "page" : void 0,
                    to: crumb.link,
                    className: "h-10 block flex items-center dark:text-slate-200 text-xl",
                    children: /* @__PURE__ */ (0, import_jsx_runtime91.jsxs)(HStack, { spacing: 2, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime91.jsx)(CrumbIcon, { crumb }),
                      crumb.label
                    ] })
                  }
                ) }, crumb.link);
              }) })
            }
          )
        ] }) })
      }
    )
  ] });
};

// app/components/Breadcrumbs/index.tsx
var import_jsx_runtime92 = require("react/jsx-runtime"), BreadCrumbs = ({ crumbs }) => /* @__PURE__ */ (0, import_jsx_runtime92.jsxs)(import_jsx_runtime92.Fragment, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime92.jsx)(HideDesktop, { children: /* @__PURE__ */ (0, import_jsx_runtime92.jsx)(MobileNav, { crumbs }) }),
  /* @__PURE__ */ (0, import_jsx_runtime92.jsx)(HideTablet, { children: /* @__PURE__ */ (0, import_jsx_runtime92.jsx)(DesktopNav, { crumbs }) })
] });

// app/layouts/DashboardLayout.tsx
var import_jsx_runtime93 = require("react/jsx-runtime"), DashboardLayout2 = ({
  user,
  children,
  header,
  subNav,
  status
}) => {
  let matches = (0, import_react60.useMatches)(), crumbs = matches.filter((match) => match.handle && match.handle.breadcrumb).map((match) => match.handle.breadcrumb(match, matches));
  return /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)(NavProvider, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(SkipNavLink, { children: "Skip to content" }),
    /* @__PURE__ */ (0, import_jsx_runtime93.jsx)("div", { className: "bg-gray-50/95 dark:bg-slate-900/95 z-10 lg:sticky top-0", children: /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)("div", { className: "flex justify-between h-14 items-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(BreadCrumbs, { crumbs }),
      /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(UseDropdown, { user })
    ] }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(InertWhenNavOpened, { className: "h-full", children: /* @__PURE__ */ (0, import_jsx_runtime93.jsx)("div", { className: "px-4 md:px-12 h-full", children: /* @__PURE__ */ (0, import_jsx_runtime93.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)("div", { className: "max-w-6xl w-full mx-auto", children: [
      header && /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(Spacer, { size: 12 }),
        header,
        /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(Spacer, { size: 4 })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime93.jsx)("div", { className: "lg:sticky lg:top-16 drop-shadow-xl z-10", children: subNav }),
      /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(Spacer, { size: 8 }),
      /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(Main, { children: /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)("div", { className: "flex flex-col gap-2 md:gap-6", children: [
        status,
        children
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(Spacer, { size: 10 })
    ] }) }) }) })
  ] });
};

// app/modules/flags/components/FlagMenu.tsx
var import_ai9 = require("react-icons/ai"), import_bi = require("react-icons/bi"), import_tb6 = require("react-icons/tb");

// app/components/HorizontalNav.tsx
var import_react61 = require("@remix-run/react");
var import_jsx_runtime94 = require("react/jsx-runtime"), HorizontalNav = ({ children, label }) => /* @__PURE__ */ (0, import_jsx_runtime94.jsx)(
  "nav",
  {
    "aria-label": label,
    className: "w-full dark:bg-slate-800 bg-white p-2 rounded-full border border-gray-100 dark:border-none dark:drop-shadow-xl",
    children: /* @__PURE__ */ (0, import_jsx_runtime94.jsx)("ul", { className: "overflow-x-scroll flex flex-row gap-4", children })
  }
), NavItem = ({ children, to, icon }) => /* @__PURE__ */ (0, import_jsx_runtime94.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime94.jsx)(
  import_react61.NavLink,
  {
    to,
    end: !0,
    className: ({ isActive }) => isActive ? "h-10 block flex items-center rounded-full px-4 font-bold bg-indigo-100 text-indigo-700 dark:bg-slate-600 dark:text-slate-100" : "h-10 block flex items-center rounded-full px-4 hover:bg-gray-100 hover:dark:bg-slate-700 active:bg-gray-200 active:dark:bg-slate-600 text-gray-500 dark:text-gray-300",
    children: /* @__PURE__ */ (0, import_jsx_runtime94.jsxs)(HStack, { spacing: 2, children: [
      /* @__PURE__ */ (0, import_jsx_runtime94.jsx)("span", { "aria-hidden": !0, children: icon }),
      /* @__PURE__ */ (0, import_jsx_runtime94.jsx)("span", { children })
    ] })
  }
) });

// app/components/Icons/MetricIcon.tsx
var import_md4 = require("react-icons/md");

// app/modules/flags/components/FlagMenu.tsx
var import_jsx_runtime95 = require("react/jsx-runtime"), FlagMenu = ({ projectId, envId, flagId }) => /* @__PURE__ */ (0, import_jsx_runtime95.jsxs)(HorizontalNav, { label: "Flag related", children: [
  /* @__PURE__ */ (0, import_jsx_runtime95.jsx)(
    NavItem,
    {
      to: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}`,
      icon: /* @__PURE__ */ (0, import_jsx_runtime95.jsx)(import_bi.BiGroup, {}),
      children: "Audience"
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime95.jsx)(
    NavItem,
    {
      to: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/insights`,
      icon: /* @__PURE__ */ (0, import_jsx_runtime95.jsx)(import_ai9.AiOutlineBarChart, {}),
      children: "Insights"
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime95.jsx)(
    NavItem,
    {
      to: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/variants`,
      icon: /* @__PURE__ */ (0, import_jsx_runtime95.jsx)(import_ai6.AiOutlineAppstore, {}),
      children: "Variants"
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime95.jsx)(
    NavItem,
    {
      to: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/metrics`,
      icon: /* @__PURE__ */ (0, import_jsx_runtime95.jsx)(import_md4.MdBubbleChart, {}),
      children: "Metrics"
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime95.jsx)(
    NavItem,
    {
      to: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/scheduling`,
      icon: /* @__PURE__ */ (0, import_jsx_runtime95.jsx)(import_ai9.AiOutlineClockCircle, {}),
      children: "Scheduling"
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime95.jsx)(
    NavItem,
    {
      to: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/webhooks`,
      icon: /* @__PURE__ */ (0, import_jsx_runtime95.jsx)(import_tb6.TbSend, {}),
      children: "Webhooks"
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime95.jsx)(
    NavItem,
    {
      to: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/settings`,
      icon: /* @__PURE__ */ (0, import_jsx_runtime95.jsx)(import_ai9.AiOutlineSetting, {}),
      children: "Settings"
    }
  )
] });

// app/modules/flags/components/ToggleFlag.tsx
var import_jsx_runtime96 = require("react/jsx-runtime"), ToggleFlag = ({
  flagId,
  isFlagActivated,
  flagName,
  onClick
}) => {
  let formId = `form-${flagId}`;
  return /* @__PURE__ */ (0, import_jsx_runtime96.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime96.jsx)("input", { type: "hidden", name: "flagId", value: flagId, form: formId }),
    /* @__PURE__ */ (0, import_jsx_runtime96.jsx)("input", { type: "hidden", name: "_type", value: "toggle-flag", form: formId }),
    /* @__PURE__ */ (0, import_jsx_runtime96.jsx)(
      "input",
      {
        type: "hidden",
        name: "nextStatus",
        form: formId,
        value: isFlagActivated ? "NOT_ACTIVATED" /* NOT_ACTIVATED */ : "ACTIVATED" /* ACTIVATED */
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime96.jsx)(
      Switch,
      {
        form: formId,
        label: `Toggle ${flagName} flag status`,
        type: "submit",
        checked: isFlagActivated,
        onClick
      }
    )
  ] });
};

// app/modules/flags/services/activateFlag.ts
var activateFlag = (envId, flagId, status, accessToken) => fetch(`${Constants.BackendUrl}/environments/${envId}/flags/${flagId}`, {
  method: "PUT",
  body: JSON.stringify({ status }),
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  }
}).then((res) => res.json());

// app/modules/flags/form-actions/toggleFlagAction.ts
var toggleFlagAction = (formData, params, authCookie) => {
  let envId = String(params.env), nextStatus = formData.get("nextStatus"), flagId = formData.get("flagId");
  return nextStatus && flagId ? activateFlag(
    envId,
    String(flagId),
    nextStatus,
    authCookie
  ) : null;
};

// app/modules/scheduling/components/SchedulingList.tsx
var import_react63 = require("react"), import_ai10 = require("react-icons/ai");

// app/components/RawTable.tsx
var import_react62 = require("react"), import_jsx_runtime97 = require("react/jsx-runtime"), RawTable = (0, import_react62.forwardRef)(
  ({ children, caption, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime97.jsx)("div", { className: "overflow-x-auto overflow-y-clip", children: /* @__PURE__ */ (0, import_jsx_runtime97.jsxs)(
    "table",
    {
      ref,
      className: "w-full border-separate border-spacing-0",
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime97.jsx)("caption", { className: "sr-only", children: caption }),
        children
      ]
    }
  ) })
), Tr = ({
  onClick,
  className,
  ...props
}) => {
  let classNameTr = Boolean(onClick) ? "border-l-8 border-l-transparent hover:bg-gray-50 hover:dark:bg-slate-700 hover:border-l-indigo-500 hover:cursor-pointer active:bg-gray-100 active:dark:bg-slate-600 border-b border-b-gray-100" : "border-b border-b-gray-100";
  return /* @__PURE__ */ (0, import_jsx_runtime97.jsx)(
    "tr",
    {
      onClick,
      className: classNameTr + " " + className || "",
      ...props
    }
  );
}, Td = ({
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime97.jsx)(
  "td",
  {
    className: `py-4 px-8 dark:text-gray-200 whitespace-nowrap ${className || ""}`,
    ...props
  }
), Th = ({
  className = "",
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime97.jsx)(
  "th",
  {
    className: "py-3 px-8 bg-gray-100 dark:bg-slate-800 text-left text-sm text-gray-600 dark:text-slate-200 tracking-wide whitespace-nowrap " + className,
    ...props
  }
);
RawTable.displayName = "RawTable";

// app/modules/scheduling/components/SchedulingList.tsx
var import_jsx_runtime98 = require("react/jsx-runtime"), formatDate = (utc) => {
  let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: !1
  };
  return new Intl.DateTimeFormat("default", options).format(new Date(utc));
}, DateCell = ({ utc }) => {
  let [formatted, setFormatted] = (0, import_react63.useState)();
  return (0, import_react63.useEffect)(() => {
    setFormatted(formatDate(utc));
  }, []), formatted ? /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(Typography, { className: "text-sm", children: formatted }) : null;
}, SchedulingList = ({
  scheduling,
  projectId,
  envId,
  flagId
}) => /* @__PURE__ */ (0, import_jsx_runtime98.jsxs)(RawTable, { caption: "Scheduling list", children: [
  /* @__PURE__ */ (0, import_jsx_runtime98.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime98.jsxs)(Tr, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(Th, { children: "Date" }),
    /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(Th, { children: "Flag status" }),
    /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(Th, { children: "Percentage" }),
    /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(Th, { children: "Has run" }),
    /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(Th, { children: "Actions" })
  ] }) }),
  /* @__PURE__ */ (0, import_jsx_runtime98.jsx)("tbody", { children: scheduling.map((schedule, index) => {
    var _a, _b;
    return /* @__PURE__ */ (0, import_jsx_runtime98.jsxs)(
      Tr,
      {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(Td, { width: "20%", children: /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(DateCell, { utc: schedule.utc }) }),
          /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(
            Switch,
            {
              label: "Next flag status",
              type: "submit",
              checked: schedule.status === "ACTIVATED" /* ACTIVATED */
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(
            SliderInput,
            {
              onChange: () => {
              },
              percentageValue: ((_b = schedule.data) == null ? void 0 : _b.rolloutPercentage) || 0,
              label: "",
              hiddenLabel: !0,
              name: "not-important-" + index
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(Td, { className: "text-center py-4 px-8 flex justify-center", children: schedule.schedulingStatus === "HAS_RUN" /* HAS_RUN */ && /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(
            import_ai10.AiFillCheckCircle,
            {
              "aria-label": "The scheduled update has already run",
              className: "text-2xl text-indigo-500 dark:text-indigo-20"
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime98.jsx)("div", { className: "inline-block", children: /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(
            DeleteButton,
            {
              size: "S",
              variant: "secondary",
              to: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/scheduling/${schedule.uuid}/delete`,
              children: "Remove"
            }
          ) }) })
        ]
      },
      `${schedule.utc}-${(_a = schedule.data) == null ? void 0 : _a.rolloutPercentage}-${index}`
    );
  }) })
] });

// app/modules/scheduling/services/getScheduling.ts
var getScheduling = (envId, flagId, accessToken) => fetch(
  `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/scheduling`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }
).then((res) => {
  if (!res.ok)
    throw new Error("Woops! Something went wrong in the server.");
  return res.json();
});

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/scheduling/index.tsx
var import_jsx_runtime99 = require("react/jsx-runtime"), meta14 = ({ parentsData, params }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env), flagName = getFlagMetaTitle(parentsData);
  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Scheduling`
  };
}, loader7 = async ({
  request,
  params
}) => {
  let authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie");
  return {
    scheduling: await getScheduling(
      params.env,
      params.flagId,
      authCookie
    )
  };
}, action15 = async ({
  request,
  params
}) => {
  let authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie"), formData = await request.formData();
  return formData.get("_type") === "toggle-flag" ? toggleFlagAction(formData, params, authCookie) : null;
};
function SchedulingOfFlag() {
  let [searchParams] = (0, import_react64.useSearchParams)(), { user } = useUser(), { project } = useProject(), { environment } = useEnvironment(), { flagEnv } = useFlagEnv(), isScheduleRemoved = searchParams.get("scheduleRemoved") || void 0, isScheduleAdded = searchParams.get("newSchedule") || void 0, { scheduling } = (0, import_react64.useLoaderData)(), currentFlag = flagEnv.flag, hasScheduling = scheduling.length > 0, isFlagActivated = flagEnv.status === "ACTIVATED" /* ACTIVATED */;
  return /* @__PURE__ */ (0, import_jsx_runtime99.jsxs)(
    DashboardLayout2,
    {
      user,
      header: /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(
        Header,
        {
          tagline: /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(TagLine, { icon: /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(FlagIcon, {}), children: "Feature flag" }),
          title: currentFlag.name,
          action: /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(
            import_react64.Form,
            {
              method: "post",
              id: `form-${currentFlag.uuid}`,
              style: { marginTop: 12 },
              children: /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(
                ToggleFlag,
                {
                  isFlagActivated,
                  flagId: currentFlag.uuid,
                  flagName: currentFlag.name
                }
              )
            }
          )
        }
      ),
      subNav: /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(
        FlagMenu,
        {
          projectId: project.uuid,
          envId: environment.uuid,
          flagId: currentFlag.uuid
        }
      ),
      status: isScheduleRemoved ? /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(SuccessBox, { id: "schedule-removed", children: "The schedule has been successfully removed." }) : isScheduleAdded ? /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(SuccessBox, { id: "schedule-added", children: "The schedule has been successfully added." }) : null,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(
          PageTitle,
          {
            value: "Scheduling",
            icon: /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(import_ai11.AiOutlineClockCircle, {}),
            description: /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(Typography, { children: "The additional audience rules that you have defined will apply at the given dates." }),
            action: hasScheduling && /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(
              CreateButton,
              {
                to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/scheduling/create`,
                children: "Create a schedule"
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime99.jsxs)(Section, { "aria-label": "List of schedules", children: [
          flagEnv.variants.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime99.jsxs)(import_jsx_runtime99.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(
              WarningBox,
              {
                title: /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(import_jsx_runtime99.Fragment, { children: "Only flag without variants are concerned by the scheduling. However, multi variants scheduling may come in the future." })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(Spacer, { size: 4 })
          ] }),
          !hasScheduling && /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(
            EmptyState,
            {
              titleAs: "h2",
              title: "No schedule found",
              description: "There are no scheduling for this flag.",
              action: flagEnv.variants.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(
                CreateButton,
                {
                  to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/scheduling/create`,
                  children: "Create a schedule"
                }
              )
            }
          ) }) }),
          hasScheduling && /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(
            SchedulingList,
            {
              scheduling,
              projectId: project.uuid,
              envId: environment.uuid,
              flagId: currentFlag.uuid
            }
          ) })
        ] })
      ]
    }
  );
}

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/variants/create.tsx
var create_exports6 = {};
__export(create_exports6, {
  action: () => action16,
  default: () => CteateVariantPage,
  meta: () => meta15
});
var import_node15 = require("@remix-run/node"), import_react65 = require("@remix-run/react");

// app/modules/variants/services/createVariant.ts
var createVariant = (envId, flagId, variant, accessToken) => fetch(
  `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/variants`,
  {
    method: "POST",
    body: JSON.stringify(variant),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  }
).then((res) => {
  if (!res.ok)
    throw new Error(
      "Woops! Something went wrong when trying to create the variant."
    );
  return res.json();
});

// app/modules/variants/form-actions/addVariantAction.ts
var addVariantAction = async (formData, params, authCookie) => {
  let flagId = String(params.flagId), envId = String(params.env), value = String(formData.get("value"));
  if (!value)
    return {
      errors: {
        value: "The variant value is not valid. Make sure to fill one."
      }
    };
  try {
    return await createVariant(envId, flagId, {
      rolloutPercentage: 0,
      value
    }, authCookie), {
      successCreated: !0
    };
  } catch (error) {
    return error instanceof Error ? { errors: { backendError: error.message } } : { errors: { backendError: "An error ocurred" } };
  }
};

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/variants/create.tsx
var import_jsx_runtime100 = require("react/jsx-runtime"), meta15 = ({ parentsData, params }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env), flagName = getFlagMetaTitle(parentsData);
  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Variants | Create`
  };
}, action16 = async ({
  request,
  params
}) => {
  let formData = await request.formData(), authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie"), variantCreated = await addVariantAction(formData, params, authCookie);
  return Object.keys(variantCreated.errors || {}).length > 0 ? { errors: variantCreated.errors } : (0, import_node15.redirect)(
    `/dashboard/projects/${params.id}/environments/${params.env}/flags/${params.flagId}/variants?newVariant=true#variant-added`
  );
};
function CteateVariantPage() {
  let { project } = useProject(), { flagEnv } = useFlagEnv(), { environment } = useEnvironment(), transition = (0, import_react65.useTransition)(), currentFlag = flagEnv.flag, actionData = (0, import_react65.useActionData)(), errors = actionData == null ? void 0 : actionData.errors;
  return /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(import_react65.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(
    CreateEntityLayout,
    {
      status: (actionData == null ? void 0 : actionData.errors) && /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(ErrorBox, { list: actionData.errors }),
      titleSlot: /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(CreateEntityTitle, { children: "Create a variant" }),
      submitSlot: /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(
        SubmitButton,
        {
          type: "submit",
          isLoading: transition.state === "submitting",
          loadingText: "Creating the variant, please wait...",
          children: "Create the variant"
        }
      ),
      backLinkSlot: /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(
        BackLink,
        {
          to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/variants`,
          children: "Back to variants"
        }
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(
        TextInput,
        {
          isInvalid: Boolean(errors == null ? void 0 : errors.name),
          label: "Variant name",
          name: "value",
          placeholder: "e.g: My super variant"
        }
      )
    }
  ) });
}

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/webhooks/create.tsx
var create_exports7 = {};
__export(create_exports7, {
  action: () => action17,
  default: () => CreateWebhookPage,
  meta: () => meta16
});
var import_node16 = require("@remix-run/node"), import_react66 = require("@remix-run/react");

// app/modules/webhooks/services/createWebhook.ts
var createWebhook = (envId, flagId, webhook, accessToken) => fetch(
  `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/webhooks`,
  {
    method: "POST",
    body: JSON.stringify(webhook),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  }
).then((res) => {
  if (!res.ok)
    throw new Error(
      "Woops! Something went wrong when trying to create the webhook."
    );
  return res.json();
});

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/webhooks/create.tsx
var import_jsx_runtime101 = require("react/jsx-runtime"), meta16 = ({ parentsData, params }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env), flagName = getFlagMetaTitle(parentsData);
  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Webhooks | Create`
  };
}, action17 = async ({
  request,
  params
}) => {
  var _a;
  let formData = await request.formData(), session = await getSession(request.headers.get("Cookie")), event = formData.get("event") || void 0, endpoint = (_a = formData.get("endpoint")) == null ? void 0 : _a.toString();
  if (!event)
    return {
      errors: {
        event: "The provided event is invalid"
      }
    };
  if (!endpoint)
    return {
      errors: {
        endpoint: "The provided endpoint is invalid"
      }
    };
  let webhook = {
    event,
    endpoint
  };
  try {
    return await createWebhook(
      params.env,
      params.flagId,
      webhook,
      session.get("auth-cookie")
    ), (0, import_node16.redirect)(
      `/dashboard/projects/${params.id}/environments/${params.env}/flags/${params.flagId}/webhooks?newWebhook=true#webhook-added`
    );
  } catch (error) {
    return error instanceof Error ? { errors: { backendError: error.message } } : { errors: { backendError: "An error ocurred" } };
  }
};
function CreateWebhookPage() {
  var _a;
  let { project } = useProject(), { flagEnv } = useFlagEnv(), { environment } = useEnvironment(), transition = (0, import_react66.useTransition)(), currentFlag = flagEnv.flag, actionData = (0, import_react66.useActionData)();
  return /* @__PURE__ */ (0, import_jsx_runtime101.jsx)(import_react66.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime101.jsx)(
    CreateEntityLayout,
    {
      status: (actionData == null ? void 0 : actionData.errors) && /* @__PURE__ */ (0, import_jsx_runtime101.jsx)(ErrorBox, { list: actionData.errors }),
      titleSlot: /* @__PURE__ */ (0, import_jsx_runtime101.jsx)(CreateEntityTitle, { children: "Create a webhook" }),
      submitSlot: /* @__PURE__ */ (0, import_jsx_runtime101.jsx)(
        SubmitButton,
        {
          isLoading: transition.state === "submitting",
          loadingText: "Saving the webhook, please wait...",
          children: "Save the webhook"
        }
      ),
      backLinkSlot: /* @__PURE__ */ (0, import_jsx_runtime101.jsx)(
        BackLink,
        {
          to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/webhooks`,
          children: "Back to webhooks"
        }
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime101.jsxs)(FormGroup, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime101.jsx)(
          TextInput,
          {
            isInvalid: Boolean((_a = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a.endpoint),
            label: "Endpoint:",
            placeholder: "e.g: https://api.progressively.app/refresh",
            name: "endpoint"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime101.jsx)(
          SelectField,
          {
            name: "event",
            label: "Event:",
            options: [
              {
                value: "ACTIVATION" /* ACTIVATION */,
                label: "Flag activation"
              },
              {
                value: "DEACTIVATION" /* DEACTIVATION */,
                label: "Flag deactivation"
              }
            ]
          }
        )
      ] })
    }
  ) });
}

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/metrics/create.tsx
var create_exports8 = {};
__export(create_exports8, {
  action: () => action18,
  default: () => MetricCreatePage,
  loader: () => loader8,
  meta: () => meta17
});
var import_node17 = require("@remix-run/node"), import_react67 = require("@remix-run/react");

// app/modules/flags/services/createMetric.ts
var createMetric = (envId, flagId, accessToken, name, variantId) => fetch(
  `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/metrics`,
  {
    method: "POST",
    body: JSON.stringify({ name, variantId }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  }
).then((res) => {
  if (!res.ok)
    throw new Error(
      "Woops! Something went wrong when trying to create the metric."
    );
  return res.json();
});

// app/modules/flags/components/VariantDot.tsx
var import_jsx_runtime102 = require("react/jsx-runtime"), sizeClasses2 = {
  M: "h-4 w-4",
  L: "h-6 w-6"
}, VariantDot = ({ variant, size = "M" }) => {
  let color = stringToColor(variant, 75), sizeClass = sizeClasses2[size];
  return /* @__PURE__ */ (0, import_jsx_runtime102.jsx)("div", { className: "rounded " + sizeClass, style: { background: color } });
};

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/metrics/create.tsx
var import_jsx_runtime103 = require("react/jsx-runtime"), meta17 = ({ parentsData, params }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env), flagName = getFlagMetaTitle(parentsData);
  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Metrics | Create`
  };
}, action18 = async ({
  request,
  params
}) => {
  var _a, _b;
  let formData = await request.formData(), session = await getSession(request.headers.get("Cookie")), name = (_a = formData.get("name")) == null ? void 0 : _a.toString(), optionalVariant = (_b = formData.get("variant")) == null ? void 0 : _b.toString();
  if (!name)
    return {
      errors: {
        name: "The name field is required"
      }
    };
  try {
    return await createMetric(
      params.env,
      params.flagId,
      session.get("auth-cookie"),
      name,
      optionalVariant || void 0
    ), (0, import_node17.redirect)(
      `/dashboard/projects/${params.id}/environments/${params.env}/flags/${params.flagId}/metrics?newMetric=true#metric-added`
    );
  } catch (error) {
    return error instanceof Error ? { errors: { backendError: error.message } } : { errors: { backendError: "An error ocurred" } };
  }
}, loader8 = async ({
  request,
  params
}) => {
  let authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie"), url = new URL(request.url), search = new URLSearchParams(url.search);
  return {
    variants: await getVariants(
      params.env,
      params.flagId,
      authCookie
    ),
    initialVariantUuid: search.get("variant") || void 0
  };
};
function MetricCreatePage() {
  let { project } = useProject(), { flagEnv } = useFlagEnv(), { environment } = useEnvironment(), { variants: variants2, initialVariantUuid } = (0, import_react67.useLoaderData)(), transition = (0, import_react67.useTransition)(), currentFlag = flagEnv.flag, actionData = (0, import_react67.useActionData)(), errors = actionData == null ? void 0 : actionData.errors, options = [
    { value: "", label: "No variant", icon: void 0 }
  ];
  for (let variant of variants2)
    options.push({
      value: variant.uuid,
      label: variant.value,
      icon: /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(VariantDot, { variant: variant.value })
    });
  return /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(import_react67.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(
    CreateEntityLayout,
    {
      status: (actionData == null ? void 0 : actionData.errors) && /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(ErrorBox, { list: actionData.errors }),
      titleSlot: /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(CreateEntityTitle, { children: "Create a metric" }),
      submitSlot: /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(
        SubmitButton,
        {
          type: "submit",
          isLoading: transition.state === "submitting",
          loadingText: "Creating the metric, please wait...",
          children: "Create the metric"
        }
      ),
      backLinkSlot: /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(
        BackLink,
        {
          to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/metrics`,
          children: "Back to metrics"
        }
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime103.jsxs)(FormGroup, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(
          TextInput,
          {
            isInvalid: Boolean(errors == null ? void 0 : errors.name),
            label: "Metric name",
            name: "name",
            placeholder: "e.g: My super metric"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(
          SelectField,
          {
            name: "variant",
            label: "Variant (optional):",
            options,
            defaultValue: initialVariantUuid
          }
        )
      ] })
    }
  ) });
}

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/variants/index.tsx
var variants_exports = {};
__export(variants_exports, {
  action: () => action19,
  default: () => VariantsOfFlag,
  loader: () => loader9,
  meta: () => meta18
});
var import_react70 = require("@remix-run/react");

// app/modules/variants/components/VariantList.tsx
var import_react68 = require("@remix-run/react"), import_react69 = require("react");
var import_jsx_runtime104 = require("react/jsx-runtime"), FormSliderInput = ({
  name,
  label,
  id,
  initialPercentage,
  bgColor,
  fgColor
}) => {
  let [percentage, setPercentage] = (0, import_react69.useState)(initialPercentage);
  return /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(
    SliderInput,
    {
      id,
      name,
      hiddenLabel: !0,
      percentageValue: percentage,
      onChange: setPercentage,
      label,
      bgColor,
      fgColor
    }
  );
}, VariantList = ({ variants: variants2, errors }) => /* @__PURE__ */ (0, import_jsx_runtime104.jsxs)("div", { children: [
  variants2.map((variant) => /* @__PURE__ */ (0, import_jsx_runtime104.jsxs)(
    import_react68.Form,
    {
      method: "post",
      id: `delete-form-${variant.uuid}`,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime104.jsx)("input", { type: "hidden", name: "uuid", value: variant.uuid }),
        /* @__PURE__ */ (0, import_jsx_runtime104.jsx)("input", { type: "hidden", name: "_type", value: "delete-variant" })
      ]
    },
    `delete-form-variant-${variant.uuid}`
  )),
  /* @__PURE__ */ (0, import_jsx_runtime104.jsxs)(import_react68.Form, { method: "post", id: "edit-variant", children: [
    /* @__PURE__ */ (0, import_jsx_runtime104.jsx)("input", { type: "hidden", name: "_type", value: "edit-variant" }),
    /* @__PURE__ */ (0, import_jsx_runtime104.jsxs)(RawTable, { caption: "Variant list", children: [
      /* @__PURE__ */ (0, import_jsx_runtime104.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime104.jsxs)(Tr, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(Th, { children: "Variant" }),
        /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(Th, { children: "Rollout percentage" }),
        /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(Th, { className: "text-center", children: "Is control" }),
        /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(Th, { children: "Actions" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime104.jsx)("tbody", { children: variants2.map((variant, index) => {
        let background = stringToColor(variant.value, 90), color = stringToColor(variant.value, 25);
        return /* @__PURE__ */ (0, import_jsx_runtime104.jsxs)(Tr, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(
            Td,
            {
              className: `border-l-8 pl-6 ${variant.isControl ? "" : "border-l-transparent"}`,
              style: variant.isControl ? { borderColor: background } : void 0,
              children: /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(
                TextInput,
                {
                  hiddenLabel: !0,
                  id: `name-${index}`,
                  name: "name",
                  defaultValue: variant.value,
                  label: `Variant ${index + 1} value`,
                  isInvalid: Boolean(errors == null ? void 0 : errors[`name-${index}`])
                }
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(
            FormSliderInput,
            {
              id: `rolloutPercentage-${index}`,
              name: "rolloutPercentage",
              label: `Variant ${index + 1} rollout percentage`,
              initialPercentage: variant.rolloutPercentage,
              bgColor: background,
              fgColor: color
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime104.jsxs)(Td, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime104.jsx)("input", { type: "hidden", name: "uuid", value: variant.uuid }),
            /* @__PURE__ */ (0, import_jsx_runtime104.jsx)("div", { className: "flex justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(
              Radio,
              {
                type: "radio",
                name: "isControl",
                value: variant.uuid,
                defaultChecked: variant.isControl,
                "aria-label": `Is variant at position ${index + 1} the control variant?`,
                readOnly: !0
              }
            ) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime104.jsxs)("div", { className: "flex flex-row gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(
              Button,
              {
                variant: "secondary",
                size: "S",
                icon: /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(import_md4.MdBubbleChart, {}),
                to: `../metrics/create?variant=${variant.uuid}`,
                children: "Attach metric"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(
              DeleteButton,
              {
                size: "S",
                variant: "secondary",
                type: "submit",
                form: `delete-form-${variant.uuid}`,
                children: "Remove"
              }
            )
          ] }) })
        ] }, `variant-${variant.uuid}`);
      }) })
    ] })
  ] })
] });

// app/modules/variants/services/deleteVariant.ts
var deleteVariant = (envId, flagId, variantId, accessToken) => fetch(
  `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/variants/${variantId}`,
  {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  }
).then((res) => {
  if (!res.ok)
    throw new Error("You are not authorized to remove this flag.");
  return res.json();
});

// app/modules/variants/form-actions/deleteVariantAction.ts
var deleteVariantAction = async (formData, params, authCookie) => {
  let flagId = String(params.flagId), envId = String(params.env);
  try {
    let uuid = formData.getAll("uuid");
    return await deleteVariant(envId, flagId, String(uuid), authCookie), { successDelete: !0 };
  } catch (error) {
    return error instanceof Error ? { errors: { backendError: error.message } } : { errors: { backendError: "An error ocurred" } };
  }
};

// app/modules/variants/services/editVariant.ts
var editVariant = async (envId, flagId, variants2, accessToken) => {
  let res = await fetch(
    `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/variants`,
    {
      method: "PUT",
      body: JSON.stringify(variants2),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
  ), data = await res.json();
  if (!res.ok)
    throw new Error(data.message);
  return data;
};

// app/modules/variants/form-actions/editVariantAction.ts
var editVariantAction = async (formData, params, authCookie) => {
  let flagId = String(params.flagId), envId = String(params.env), uuids = formData.getAll("uuid"), names = formData.getAll("name"), rolloutPercentages = formData.getAll("rolloutPercentage"), controlId = formData.get("isControl"), errors = {};
  for (let [index, name] of names.entries())
    name || (errors[`name-${index}`] = `The variant value on line ${index + 1} is invalid.`);
  if (Object.keys(errors).length > 0)
    return { errors };
  try {
    let variants2 = uuids.map((uuid, index) => {
      let id = uuid.toString();
      return {
        uuid: id,
        value: names[index].toString(),
        rolloutPercentage: Number(rolloutPercentages[index]),
        isControl: controlId === id
      };
    });
    return await editVariant(envId, flagId, variants2, authCookie), { successEdit: !0 };
  } catch (error) {
    return error instanceof Error ? { errors: { backendError: error.message } } : { errors: { backendError: "An error ocurred" } };
  }
};

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/variants/index.tsx
var import_jsx_runtime105 = require("react/jsx-runtime"), meta18 = ({ parentsData, params }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env), flagName = getFlagMetaTitle(parentsData);
  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Variants`
  };
}, loader9 = async ({
  request,
  params
}) => {
  let authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie");
  return {
    variants: await getVariants(
      params.env,
      params.flagId,
      authCookie
    )
  };
}, action19 = async ({
  request,
  params
}) => {
  let authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie"), formData = await request.formData(), type = formData.get("_type");
  return type === "edit-variant" ? editVariantAction(formData, params, authCookie) : type === "delete-variant" ? deleteVariantAction(formData, params, authCookie) : type === "toggle-flag" ? toggleFlagAction(formData, params, authCookie) : null;
};
function VariantsOfFlag() {
  let { user } = useUser(), { project } = useProject(), { environment } = useEnvironment(), { flagEnv } = useFlagEnv(), { variants: variants2 } = (0, import_react70.useLoaderData)(), [searchParams] = (0, import_react70.useSearchParams)(), isVariantAdded = searchParams.get("newVariant") || void 0, actionData = (0, import_react70.useActionData)(), currentFlag = flagEnv.flag, hasVariants = variants2.length > 0, isFlagActivated = flagEnv.status === "ACTIVATED" /* ACTIVATED */;
  return /* @__PURE__ */ (0, import_jsx_runtime105.jsxs)(
    DashboardLayout2,
    {
      user,
      header: /* @__PURE__ */ (0, import_jsx_runtime105.jsx)(
        Header,
        {
          tagline: /* @__PURE__ */ (0, import_jsx_runtime105.jsx)(TagLine, { icon: /* @__PURE__ */ (0, import_jsx_runtime105.jsx)(FlagIcon, {}), children: "Feature flag" }),
          title: currentFlag.name,
          action: /* @__PURE__ */ (0, import_jsx_runtime105.jsx)(
            import_react70.Form,
            {
              method: "post",
              id: `form-${currentFlag.uuid}`,
              style: { marginTop: 12 },
              children: /* @__PURE__ */ (0, import_jsx_runtime105.jsx)(
                ToggleFlag,
                {
                  isFlagActivated,
                  flagId: currentFlag.uuid,
                  flagName: currentFlag.name
                }
              )
            }
          )
        }
      ),
      subNav: /* @__PURE__ */ (0, import_jsx_runtime105.jsx)(
        FlagMenu,
        {
          projectId: project.uuid,
          envId: environment.uuid,
          flagId: currentFlag.uuid
        }
      ),
      status: actionData != null && actionData.errors ? /* @__PURE__ */ (0, import_jsx_runtime105.jsx)(ErrorBox, { list: actionData == null ? void 0 : actionData.errors }) : actionData != null && actionData.successEdit ? /* @__PURE__ */ (0, import_jsx_runtime105.jsx)(SuccessBox, { id: "variant-edited", children: "The variants have been successfully edited." }) : actionData != null && actionData.successDelete ? /* @__PURE__ */ (0, import_jsx_runtime105.jsx)(SuccessBox, { id: "variant-deleted", children: "The variant has been successfully deleted." }) : isVariantAdded ? /* @__PURE__ */ (0, import_jsx_runtime105.jsx)(SuccessBox, { id: "variant-added", children: "The variant has been successfully created." }) : null,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime105.jsx)(
          PageTitle,
          {
            value: "Variants",
            icon: /* @__PURE__ */ (0, import_jsx_runtime105.jsx)(import_ai6.AiOutlineAppstore, {}),
            description: /* @__PURE__ */ (0, import_jsx_runtime105.jsx)(Typography, { children: "The variants that will be shown to a portion of your audience." }),
            action: /* @__PURE__ */ (0, import_jsx_runtime105.jsx)(CreateButton, { to: "create", variant: "secondary", children: "Create a variant" })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime105.jsxs)(Section, { "aria-label": "List of variants", children: [
          /* @__PURE__ */ (0, import_jsx_runtime105.jsxs)(Card, { children: [
            !hasVariants && /* @__PURE__ */ (0, import_jsx_runtime105.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime105.jsx)(
              EmptyState,
              {
                titleAs: "h2",
                title: "No variants found",
                description: "There are no variants found for this flag.",
                action: /* @__PURE__ */ (0, import_jsx_runtime105.jsx)(CreateButton, { to: "create", variant: "primary", children: "Create a variant" })
              }
            ) }),
            hasVariants && /* @__PURE__ */ (0, import_jsx_runtime105.jsx)(VariantList, { variants: variants2, errors: actionData == null ? void 0 : actionData.errors })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime105.jsx)(Spacer, { size: 8 }),
          /* @__PURE__ */ (0, import_jsx_runtime105.jsx)("div", { className: "flex justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime105.jsx)(SubmitButton, { form: "edit-variant", children: "Edit variants" }) })
        ] })
      ]
    }
  );
}

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/webhooks/index.tsx
var webhooks_exports = {};
__export(webhooks_exports, {
  action: () => action20,
  default: () => WebhooksPage,
  loader: () => loader10,
  meta: () => meta19
});
var import_react73 = require("@remix-run/react");
var import_tb8 = require("react-icons/tb");

// app/modules/webhooks/services/getWebhooks.ts
var getWebhooks = (envId, flagId, accessToken) => fetch(
  `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/webhooks`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }
).then((res) => {
  if (!res.ok)
    throw new Error("Woops! Something went wrong in the server.");
  return res.json();
});

// app/components/ButtonCopy.tsx
var import_react72 = require("react"), import_react_copy_to_clipboard = require("react-copy-to-clipboard"), import_tb7 = require("react-icons/tb");

// app/modules/misc/hooks/useHydrated.ts
var import_react71 = require("react"), hydrated = !1, useHydrated = () => {
  let [isHydrated, setIsHydrated] = (0, import_react71.useState)(hydrated);
  return (0, import_react71.useEffect)(() => {
    hydrated = !0, setIsHydrated(!0);
  }, []), isHydrated;
};

// app/components/ButtonCopy.tsx
var import_jsx_runtime106 = require("react/jsx-runtime"), ButtonCopy = ({ toCopy, children, ...props }) => {
  let timerIdRef = (0, import_react72.useRef)(), [isCopied, setIsCopied] = (0, import_react72.useState)(!1), isHydrated = useHydrated();
  return (0, import_react72.useEffect)(() => {
    isCopied && (timerIdRef.current && clearTimeout(timerIdRef.current), timerIdRef.current = setTimeout(() => {
      setIsCopied(!1);
    }, 3e3));
    let timerId = timerIdRef.current;
    return () => {
      timerId && clearTimeout(timerId);
    };
  }, [isCopied]), isHydrated ? /* @__PURE__ */ (0, import_jsx_runtime106.jsx)(import_react_copy_to_clipboard.CopyToClipboard, { text: toCopy, children: /* @__PURE__ */ (0, import_jsx_runtime106.jsx)(
    Button,
    {
      size: "S",
      type: "button",
      onClick: (e) => {
        e.stopPropagation(), setIsCopied(!0);
      },
      "aria-live": "polite",
      icon: isCopied ? /* @__PURE__ */ (0, import_jsx_runtime106.jsx)(import_tb7.TbClipboardCheck, { "aria-hidden": !0 }) : /* @__PURE__ */ (0, import_jsx_runtime106.jsx)(import_tb7.TbClipboardText, { "aria-hidden": !0 }),
      variant: "secondary",
      onKeyDown: (e) => {
        e.key === KeyboardKeys.ENTER && e.stopPropagation();
      },
      ...props,
      children: isCopied ? /* @__PURE__ */ (0, import_jsx_runtime106.jsxs)("span", { children: [
        "Copied ",
        /* @__PURE__ */ (0, import_jsx_runtime106.jsx)(VisuallyHidden, { children: toCopy })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime106.jsxs)("span", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime106.jsx)(VisuallyHidden, { children: "Copy " }),
        children
      ] })
    }
  ) }) : /* @__PURE__ */ (0, import_jsx_runtime106.jsx)(
    Button,
    {
      size: "S",
      as: "span",
      "aria-live": "polite",
      icon: /* @__PURE__ */ (0, import_jsx_runtime106.jsx)(import_tb7.TbClipboardText, { "aria-hidden": !0 }),
      variant: "secondary",
      ...props,
      children
    }
  );
};

// app/modules/webhooks/components/WebhookEvent.tsx
var import_jsx_runtime107 = require("react/jsx-runtime"), WebhookEvent = ({ value }) => value === "ACTIVATION" /* ACTIVATION */ ? /* @__PURE__ */ (0, import_jsx_runtime107.jsx)(Tag, { children: "Activation" }) : value === "DEACTIVATION" /* DEACTIVATION */ ? /* @__PURE__ */ (0, import_jsx_runtime107.jsx)(Tag, { children: "Deactivation" }) : null;

// app/modules/webhooks/components/WebhooksList.tsx
var import_jsx_runtime108 = require("react/jsx-runtime"), WebhooksList = ({
  webhooks,
  projectId,
  envId,
  flagId
}) => /* @__PURE__ */ (0, import_jsx_runtime108.jsxs)(RawTable, { caption: "Webhook list", children: [
  /* @__PURE__ */ (0, import_jsx_runtime108.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime108.jsxs)(Tr, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime108.jsx)(Th, { children: "End point" }),
    /* @__PURE__ */ (0, import_jsx_runtime108.jsx)(Th, { children: "Event" }),
    /* @__PURE__ */ (0, import_jsx_runtime108.jsx)(Th, { children: "Secret" }),
    /* @__PURE__ */ (0, import_jsx_runtime108.jsx)(Th, { children: "Actions" })
  ] }) }),
  /* @__PURE__ */ (0, import_jsx_runtime108.jsx)("tbody", { children: webhooks.map((webhook) => /* @__PURE__ */ (0, import_jsx_runtime108.jsxs)(Tr, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime108.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime108.jsx)(
      Link4,
      {
        href: webhook.endpoint,
        target: "blank",
        rel: "noopener noreferer",
        children: webhook.endpoint
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime108.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime108.jsx)(WebhookEvent, { value: webhook.event }) }),
    /* @__PURE__ */ (0, import_jsx_runtime108.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime108.jsx)(
      ButtonCopy,
      {
        toCopy: webhook.secret,
        "aria-label": "This is a hidden secret. Press to copy.",
        children: "******"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime108.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime108.jsx)("div", { className: "inline-block", children: /* @__PURE__ */ (0, import_jsx_runtime108.jsx)(
      DeleteButton,
      {
        size: "S",
        variant: "secondary",
        to: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/webhooks/${webhook.uuid}/delete`,
        children: "Remove"
      }
    ) }) })
  ] }, webhook.uuid)) })
] });

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/webhooks/index.tsx
var import_jsx_runtime109 = require("react/jsx-runtime"), meta19 = ({ parentsData, params }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env), flagName = getFlagMetaTitle(parentsData);
  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Webhooks`
  };
}, loader10 = async ({
  request,
  params
}) => {
  let authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie");
  return {
    webhooks: await getWebhooks(
      params.env,
      params.flagId,
      authCookie
    )
  };
}, action20 = async ({
  request,
  params
}) => {
  let authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie"), formData = await request.formData();
  return formData.get("_type") === "toggle-flag" ? toggleFlagAction(formData, params, authCookie) : null;
};
function WebhooksPage() {
  let [searchParams] = (0, import_react73.useSearchParams)(), { user } = useUser(), { project } = useProject(), { environment } = useEnvironment(), { flagEnv } = useFlagEnv(), isWebhookRemoved = searchParams.get("webhookRemoved") || void 0, isWebhookAdded = searchParams.get("newWebhook") || void 0, { webhooks } = (0, import_react73.useLoaderData)(), currentFlag = flagEnv.flag, hasWebhooks = webhooks.length > 0, isFlagActivated = flagEnv.status === "ACTIVATED" /* ACTIVATED */;
  return /* @__PURE__ */ (0, import_jsx_runtime109.jsxs)(
    DashboardLayout2,
    {
      user,
      header: /* @__PURE__ */ (0, import_jsx_runtime109.jsx)(
        Header,
        {
          tagline: /* @__PURE__ */ (0, import_jsx_runtime109.jsx)(TagLine, { icon: /* @__PURE__ */ (0, import_jsx_runtime109.jsx)(FlagIcon, {}), children: "Feature flag" }),
          title: currentFlag.name,
          action: /* @__PURE__ */ (0, import_jsx_runtime109.jsx)(
            import_react73.Form,
            {
              method: "post",
              id: `form-${currentFlag.uuid}`,
              style: { marginTop: 12 },
              children: /* @__PURE__ */ (0, import_jsx_runtime109.jsx)(
                ToggleFlag,
                {
                  isFlagActivated,
                  flagId: currentFlag.uuid,
                  flagName: currentFlag.name
                }
              )
            }
          )
        }
      ),
      subNav: /* @__PURE__ */ (0, import_jsx_runtime109.jsx)(
        FlagMenu,
        {
          projectId: project.uuid,
          envId: environment.uuid,
          flagId: currentFlag.uuid
        }
      ),
      status: isWebhookRemoved ? /* @__PURE__ */ (0, import_jsx_runtime109.jsx)(SuccessBox, { id: "webhook-removed", children: "The webhook has been successfully removed." }) : isWebhookAdded ? /* @__PURE__ */ (0, import_jsx_runtime109.jsx)(SuccessBox, { id: "webhook-added", children: "The webhook has been successfully added." }) : null,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime109.jsx)(
          PageTitle,
          {
            value: "Webhooks",
            icon: /* @__PURE__ */ (0, import_jsx_runtime109.jsx)(import_tb8.TbSend, {}),
            description: /* @__PURE__ */ (0, import_jsx_runtime109.jsx)(Typography, { children: "The different webhooks to request when specific events occur." }),
            action: hasWebhooks && /* @__PURE__ */ (0, import_jsx_runtime109.jsx)(
              CreateButton,
              {
                to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/webhooks/create`,
                children: "Create a webhook"
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime109.jsxs)(Section, { "aria-label": "List of webhooks", children: [
          !hasWebhooks && /* @__PURE__ */ (0, import_jsx_runtime109.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime109.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime109.jsx)(
            EmptyState,
            {
              titleAs: "h2",
              title: "No webhooks found",
              description: "There are no webhooks for this flag.",
              action: /* @__PURE__ */ (0, import_jsx_runtime109.jsx)(
                CreateButton,
                {
                  to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/webhooks/create`,
                  children: "Create a webhook"
                }
              )
            }
          ) }) }),
          hasWebhooks && /* @__PURE__ */ (0, import_jsx_runtime109.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime109.jsx)(
            WebhooksList,
            {
              webhooks,
              projectId: project.uuid,
              envId: environment.uuid,
              flagId: currentFlag.uuid
            }
          ) })
        ] })
      ]
    }
  );
}

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/metrics/index.tsx
var metrics_exports = {};
__export(metrics_exports, {
  action: () => action21,
  default: () => Metrics,
  loader: () => loader11,
  meta: () => meta20
});
var import_react74 = require("@remix-run/react"), import_md5 = require("react-icons/md");

// app/modules/flags/components/MetricList.tsx
var import_jsx_runtime110 = require("react/jsx-runtime"), MetricList = ({
  metrics,
  projectId,
  envId,
  flagId
}) => /* @__PURE__ */ (0, import_jsx_runtime110.jsxs)(RawTable, { caption: "Metrics list", children: [
  /* @__PURE__ */ (0, import_jsx_runtime110.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime110.jsxs)(Tr, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime110.jsx)(Th, { children: "Name" }),
    /* @__PURE__ */ (0, import_jsx_runtime110.jsx)(Th, { children: "Attached variant (optional)" }),
    /* @__PURE__ */ (0, import_jsx_runtime110.jsx)(Th, { children: "Actions" })
  ] }) }),
  /* @__PURE__ */ (0, import_jsx_runtime110.jsx)("tbody", { children: metrics.map((metric) => {
    var _a;
    return /* @__PURE__ */ (0, import_jsx_runtime110.jsxs)(Tr, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime110.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime110.jsx)("div", { children: metric.name }) }),
      /* @__PURE__ */ (0, import_jsx_runtime110.jsx)(Td, { children: ((_a = metric.variant) == null ? void 0 : _a.value) && /* @__PURE__ */ (0, import_jsx_runtime110.jsx)(
        Link4,
        {
          to: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/variants`,
          className: "no-underline",
          children: /* @__PURE__ */ (0, import_jsx_runtime110.jsxs)("span", { className: "flex flex-row gap-3 items-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime110.jsx)(VariantDot, { variant: metric.variant.value }),
            metric.variant.value
          ] })
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime110.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime110.jsx)("div", { className: "inline-block", children: /* @__PURE__ */ (0, import_jsx_runtime110.jsx)(
        DeleteButton,
        {
          size: "S",
          variant: "secondary",
          to: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/metrics/${metric.uuid}/delete`,
          children: "Remove"
        }
      ) }) })
    ] }, metric.uuid);
  }) })
] });

// app/modules/flags/services/getMetrics.ts
var getMetrics = (envId, flagId, accessToken) => fetch(
  `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/metrics`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }
).then((res) => {
  if (!res.ok)
    throw new Error("Woops! Something went wrong in the server.");
  return res.json();
});

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/metrics/index.tsx
var import_jsx_runtime111 = require("react/jsx-runtime"), meta20 = ({ parentsData, params }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env), flagName = getFlagMetaTitle(parentsData);
  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Metrics`
  };
}, loader11 = async ({
  request,
  params
}) => {
  let authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie");
  return {
    metrics: await getMetrics(
      params.env,
      params.flagId,
      authCookie
    )
  };
}, action21 = async ({
  request,
  params
}) => {
  let authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie"), formData = await request.formData();
  return formData.get("_type") === "toggle-flag" ? toggleFlagAction(formData, params, authCookie) : null;
};
function Metrics() {
  let [searchParams] = (0, import_react74.useSearchParams)(), { user } = useUser(), { project } = useProject(), { environment } = useEnvironment(), { flagEnv } = useFlagEnv(), isMetricRemoved = searchParams.get("metricRemoved") || void 0, isMetricAdded = searchParams.get("newMetric") || void 0, { metrics } = (0, import_react74.useLoaderData)(), currentFlag = flagEnv.flag, hasMetrics = metrics.length > 0, isFlagActivated = flagEnv.status === "ACTIVATED" /* ACTIVATED */;
  return /* @__PURE__ */ (0, import_jsx_runtime111.jsxs)(
    DashboardLayout2,
    {
      user,
      header: /* @__PURE__ */ (0, import_jsx_runtime111.jsx)(
        Header,
        {
          tagline: /* @__PURE__ */ (0, import_jsx_runtime111.jsx)(TagLine, { icon: /* @__PURE__ */ (0, import_jsx_runtime111.jsx)(FlagIcon, {}), children: "Feature flag" }),
          title: currentFlag.name,
          action: /* @__PURE__ */ (0, import_jsx_runtime111.jsx)(
            import_react74.Form,
            {
              method: "post",
              id: `form-${currentFlag.uuid}`,
              style: { marginTop: 12 },
              children: /* @__PURE__ */ (0, import_jsx_runtime111.jsx)(
                ToggleFlag,
                {
                  isFlagActivated,
                  flagId: currentFlag.uuid,
                  flagName: currentFlag.name
                }
              )
            }
          )
        }
      ),
      subNav: /* @__PURE__ */ (0, import_jsx_runtime111.jsx)(
        FlagMenu,
        {
          projectId: project.uuid,
          envId: environment.uuid,
          flagId: currentFlag.uuid
        }
      ),
      status: isMetricRemoved ? /* @__PURE__ */ (0, import_jsx_runtime111.jsx)(SuccessBox, { id: "metric-removed", children: "The metric has been successfully removed." }) : isMetricAdded ? /* @__PURE__ */ (0, import_jsx_runtime111.jsx)(SuccessBox, { id: "metric-added", children: "The metric has been successfully added." }) : null,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime111.jsx)(
          PageTitle,
          {
            value: "Metrics",
            icon: /* @__PURE__ */ (0, import_jsx_runtime111.jsx)(import_md5.MdBubbleChart, {}),
            description: /* @__PURE__ */ (0, import_jsx_runtime111.jsx)(Typography, { children: "The metrics that you have to measure the impact of your flags." }),
            action: hasMetrics && /* @__PURE__ */ (0, import_jsx_runtime111.jsx)(
              CreateButton,
              {
                to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/metrics/create`,
                children: "Create a metric"
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime111.jsxs)(Section, { "aria-label": "List of metrics", children: [
          !hasMetrics && /* @__PURE__ */ (0, import_jsx_runtime111.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime111.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime111.jsx)(
            EmptyState,
            {
              titleAs: "h2",
              title: "No metrics found",
              description: "There are no metrics for this flag.",
              action: /* @__PURE__ */ (0, import_jsx_runtime111.jsx)(
                CreateButton,
                {
                  to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/metrics/create`,
                  children: "Create a metric"
                }
              )
            }
          ) }) }),
          hasMetrics && /* @__PURE__ */ (0, import_jsx_runtime111.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime111.jsx)(
            MetricList,
            {
              metrics,
              projectId: project.uuid,
              envId: environment.uuid,
              flagId: currentFlag.uuid
            }
          ) })
        ] })
      ]
    }
  );
}

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/insights.tsx
var insights_exports = {};
__export(insights_exports, {
  action: () => action22,
  default: () => FlagInsights,
  loader: () => loader12,
  meta: () => meta21
});

// app/modules/flags/services/getFlagHits.ts
var getFlagHits = async (envId, flagId, startDate, endDate, accessToken) => {
  let url = new URL(`${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/hits`);
  return url.searchParams.set("startDate", startDate.toISOString()), url.searchParams.set("endDate", endDate.toISOString()), fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then((res) => res.json());
};

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/insights.tsx
var import_react76 = require("@remix-run/react");

// app/modules/flags/MetricPerVariantList.tsx
var import_jsx_runtime112 = require("react/jsx-runtime"), MetricPerVariantList = ({ items }) => /* @__PURE__ */ (0, import_jsx_runtime112.jsxs)(RawTable, { caption: "Metrics per variant list", children: [
  /* @__PURE__ */ (0, import_jsx_runtime112.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime112.jsxs)(Tr, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime112.jsx)(Th, { children: "Metric" }),
    /* @__PURE__ */ (0, import_jsx_runtime112.jsx)(Th, { children: "Variant (optional)" }),
    /* @__PURE__ */ (0, import_jsx_runtime112.jsx)(Th, { children: "Hits" }),
    /* @__PURE__ */ (0, import_jsx_runtime112.jsx)(Th, { children: "Variant eval." }),
    /* @__PURE__ */ (0, import_jsx_runtime112.jsx)(Th, { children: "Ratio (hit/variant eval.)" })
  ] }) }),
  /* @__PURE__ */ (0, import_jsx_runtime112.jsx)("tbody", { children: items.map((mHit) => /* @__PURE__ */ (0, import_jsx_runtime112.jsxs)(Tr, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime112.jsx)(Td, { children: mHit.metric }),
    /* @__PURE__ */ (0, import_jsx_runtime112.jsx)(Td, { children: mHit.variant && /* @__PURE__ */ (0, import_jsx_runtime112.jsxs)("span", { className: "flex flex-row gap-3 items-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime112.jsx)(VariantDot, { variant: mHit.variant }),
      mHit.variant
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime112.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime112.jsx)("strong", { children: mHit.count }) }),
    /* @__PURE__ */ (0, import_jsx_runtime112.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime112.jsx)("strong", { children: mHit.variantCount }) }),
    /* @__PURE__ */ (0, import_jsx_runtime112.jsx)(Td, { children: mHit.variantCount ? /* @__PURE__ */ (0, import_jsx_runtime112.jsx)(Tag, { variant: "SUCCESS", children: `${(mHit.count / mHit.variantCount * 100).toFixed(2)}%` }) : null })
  ] }, mHit.metric)) })
] });

// app/components/BarChart.tsx
var import_recharts = require("recharts");
var import_jsx_runtime113 = require("react/jsx-runtime"), CustomTooltip = ({ active, payload, label }) => active && payload && payload.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime113.jsxs)(
  "div",
  {
    className: "bg-white text-black p-4 rounded-md",
    style: { background: payload[0].fill },
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime113.jsx)("span", { className: "text-xs text-gray-600 font-semibold", children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime113.jsx)(Spacer, { size: 2 }),
      /* @__PURE__ */ (0, import_jsx_runtime113.jsx)("div", { children: payload.map((pld) => /* @__PURE__ */ (0, import_jsx_runtime113.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime113.jsxs)("span", { className: "flex flex-row gap-3 items-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime113.jsxs)("span", { className: "text-gray-700", children: [
          pld.dataKey,
          ":"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime113.jsxs)("span", { className: "font-semibold", children: [
          pld.value,
          "%"
        ] })
      ] }) }, `${label}-${pld.value}-${pld.dataKey}`)) })
    ]
  }
) : null, BarChart = ({ data }) => {
  let { theme } = useTheme(), legendColor = theme === "dark" ? "#ccc" : "#aaa";
  return /* @__PURE__ */ (0, import_jsx_runtime113.jsx)(import_recharts.ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ (0, import_jsx_runtime113.jsxs)(
    import_recharts.BarChart,
    {
      width: 500,
      height: 300,
      data,
      margin: {
        top: 20,
        right: 10,
        bottom: 40
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime113.jsx)(import_recharts.CartesianGrid, { vertical: !1, stroke: legendColor }),
        /* @__PURE__ */ (0, import_jsx_runtime113.jsx)(
          import_recharts.XAxis,
          {
            axisLine: !1,
            dataKey: "name",
            tick: { fill: legendColor },
            tickLine: { stroke: legendColor }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime113.jsx)(import_recharts.YAxis, { axisLine: !1, tick: { fill: legendColor }, tickLine: !1 }),
        /* @__PURE__ */ (0, import_jsx_runtime113.jsx)(import_recharts.Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime113.jsx)(CustomTooltip, {}), cursor: !1 }),
        /* @__PURE__ */ (0, import_jsx_runtime113.jsx)(import_recharts.Bar, { dataKey: "value", unit: "%", children: data.map((entry2, index) => /* @__PURE__ */ (0, import_jsx_runtime113.jsx)(
          import_recharts.Cell,
          {
            fill: data[index].color,
            style: {
              filter: `drop-shadow(0px 0px 14px ${data[index].color})`
            }
          },
          entry2.value
        )) })
      ]
    }
  ) });
};

// app/components/LineChart.tsx
var import_react75 = require("react"), import_recharts2 = require("recharts");
var import_jsx_runtime114 = require("react/jsx-runtime"), CustomizedAxisTick = ({ color, ...props }) => {
  let { x, y, payload } = props, [date, setDate] = (0, import_react75.useState)("");
  return (0, import_react75.useEffect)(() => {
    let formatter = new Intl.DateTimeFormat();
    setDate(formatter.format(new Date(payload.value)));
  }, [payload.value]), /* @__PURE__ */ (0, import_jsx_runtime114.jsx)("g", { transform: `translate(${x},${y})`, children: /* @__PURE__ */ (0, import_jsx_runtime114.jsx)("text", { x: 0, y: 0, dy: 16, textAnchor: "middle", fill: color, children: date }) });
}, CustomTooltip2 = ({ active, payload, label }) => {
  let formatter = new Intl.DateTimeFormat();
  return active && payload && payload.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime114.jsxs)("div", { className: "bg-white text-black p-4 rounded-md", children: [
    /* @__PURE__ */ (0, import_jsx_runtime114.jsx)("span", { className: "text-xs text-gray-600 font-semibold", children: label ? formatter.format(new Date(label)) : "" }),
    /* @__PURE__ */ (0, import_jsx_runtime114.jsx)(Spacer, { size: 2 }),
    /* @__PURE__ */ (0, import_jsx_runtime114.jsx)("div", { children: payload.map((pld) => /* @__PURE__ */ (0, import_jsx_runtime114.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime114.jsxs)("span", { className: "flex flex-row gap-3 items-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime114.jsx)(
        "span",
        {
          "aria-hidden": !0,
          style: { background: stringToColor(pld.dataKey, 75) },
          className: "h-4 w-4 block rounded"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime114.jsxs)("span", { className: "text-gray-700", children: [
        pld.dataKey,
        ":"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime114.jsx)(
        "span",
        {
          style: { color: stringToColor(pld.dataKey, 75) },
          className: "font-semibold",
          children: pld.value
        }
      )
    ] }) }, `${label}-${pld.value}-${pld.dataKey}`)) })
  ] }) : null;
}, LineChart = ({ data }) => {
  let { theme } = useTheme(), legendColor = theme === "dark" ? "#ccc" : "#aaa", glowEffect = (key) => theme === "dark" ? stringToColor(key, 25) : stringToColor(key, 90), keysDict = {};
  for (let d of data)
    for (let k of Object.keys(d))
      k !== "date" && (keysDict[k] = !0);
  let lineKeys = Object.keys(keysDict);
  return /* @__PURE__ */ (0, import_jsx_runtime114.jsx)(import_recharts2.ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ (0, import_jsx_runtime114.jsxs)(
    import_recharts2.LineChart,
    {
      width: 500,
      height: 300,
      data,
      margin: {
        top: 20,
        right: 10,
        bottom: 40
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime114.jsx)(import_recharts2.CartesianGrid, { vertical: !1, stroke: legendColor }),
        /* @__PURE__ */ (0, import_jsx_runtime114.jsx)(
          import_recharts2.Legend,
          {
            verticalAlign: "top",
            wrapperStyle: {
              paddingTop: "16px",
              paddingBottom: "20px"
            },
            formatter: (value, entry2, index) => /* @__PURE__ */ (0, import_jsx_runtime114.jsx)("span", { className: stringToColor(lineKeys[index], 75), children: value })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime114.jsx)(
          import_recharts2.XAxis,
          {
            dataKey: "date",
            axisLine: !1,
            tick: /* @__PURE__ */ (0, import_jsx_runtime114.jsx)(CustomizedAxisTick, { color: legendColor })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime114.jsx)(
          import_recharts2.YAxis,
          {
            tick: { stroke: legendColor },
            axisLine: !1,
            tickLine: !1
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime114.jsx)(import_recharts2.Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime114.jsx)(CustomTooltip2, {}) }),
        lineKeys.map((key) => /* @__PURE__ */ (0, import_jsx_runtime114.jsx)(
          import_recharts2.Line,
          {
            style: {
              filter: `drop-shadow(0px 0px 14px ${glowEffect(key)})`
            },
            type: "monotone",
            dataKey: key,
            stroke: stringToColor(key, 75),
            activeDot: { r: 8 },
            strokeWidth: 4
          },
          key
        ))
      ]
    }
  ) });
};

// app/modules/insights/components/VariantCard.tsx
var import_jsx_runtime115 = require("react/jsx-runtime"), VariantCard = ({ variant, hit, ratio }) => {
  let color = stringToColor(variant, 75), formatter = Intl.NumberFormat("en", { notation: "compact" });
  return /* @__PURE__ */ (0, import_jsx_runtime115.jsxs)("div", { className: "border border-gray-100 rounded-md bg-white dark:border-slate-700 dark:bg-slate-800 p-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime115.jsxs)("div", { className: "flex flex-row items-center gap-2 font-bold pb-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime115.jsx)(VariantDot, { variant, size: "L" }),
      /* @__PURE__ */ (0, import_jsx_runtime115.jsx)("p", { style: { color }, children: variant })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime115.jsxs)("div", { className: "dark:text-white text-slate-900 pb-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime115.jsx)("span", { className: "text-6xl font-bold", children: formatter.format(hit) }),
      /* @__PURE__ */ (0, import_jsx_runtime115.jsx)("span", { className: "dark:text-slate-300 text-slate-900 pl-2", children: "eval." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime115.jsxs)(Tag, { style: { background: color }, className: "!text-slate-900", children: [
      ratio,
      "%"
    ] })
  ] });
};

// app/modules/insights/components/EvalCard.tsx
var import_jsx_runtime116 = require("react/jsx-runtime"), EvalCard = ({ count }) => {
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  return /* @__PURE__ */ (0, import_jsx_runtime116.jsxs)(
    "div",
    {
      className: "border border-gray-100 rounded-md dark:border-slate-700 p-4 flex flex-col items-center justify-center bg-gradient-to-t from-indigo-600 to-pink-400",
      style: { height: 300 },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime116.jsx)("div", { className: "text-6xl text-slate-100 font-bold", children: formatter.format(count) }),
        /* @__PURE__ */ (0, import_jsx_runtime116.jsx)("p", { className: "text-lg text-slate-100 text-xl", children: "evaluations" })
      ]
    }
  );
};

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/insights.tsx
var import_jsx_runtime117 = require("react/jsx-runtime"), meta21 = ({ parentsData, params }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env), flagName = getFlagMetaTitle(parentsData);
  return {
    title: `Progressively | ${projectName} | ${envName} | ${flagName} | Insights`
  };
}, loader12 = async ({
  request,
  params
}) => {
  let session = await getSession(request.headers.get("Cookie")), url = new URL(request.url), search = new URLSearchParams(url.search), startDateForm = search.get("startDate"), endDateForm = search.get("endDate"), start = new Date();
  start.setDate(start.getDate() - 7);
  let end = new Date();
  end.setDate(end.getDate() + 1);
  let startDate = startDateForm ? new Date(startDateForm) : start, endDate = endDateForm ? new Date(endDateForm) : end, authCookie = session.get("auth-cookie"), {
    hitsPerVariantPerDate,
    flagEvaluationsCount,
    metricsByVariantCount,
    flagEvaluations
  } = await getFlagHits(
    params.env,
    params.flagId,
    startDate,
    endDate,
    authCookie
  ), computedMetricsByVariantCount = metricsByVariantCount.map((nbv) => {
    var _a;
    return {
      count: nbv.count,
      metric: nbv.metric,
      variant: nbv.variant,
      variantCount: (_a = flagEvaluations.find((f) => f.valueResolved === nbv.variant)) == null ? void 0 : _a._count
    };
  }), barChartData = computedMetricsByVariantCount.filter((mbv) => Boolean(mbv.variantCount)).map((mbv) => ({
    name: `${mbv.metric} (${mbv.variant})`,
    value: Math.round(mbv.count / Number(mbv.variantCount) * 100 * 100) / 100,
    color: stringToColor(mbv.variant)
  }));
  return {
    flagEvaluations,
    hitsPerVariantPerDate,
    barChartData,
    flagEvaluationsCount,
    metricsByVariantCount: computedMetricsByVariantCount,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString()
  };
}, formatDefaultDate = (isoDate) => isoDate.slice(0, 10), action22 = async ({
  request,
  params
}) => {
  let authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie"), formData = await request.formData();
  return formData.get("_type") === "toggle-flag" ? toggleFlagAction(formData, params, authCookie) : null;
};
function FlagInsights() {
  let {
    startDate,
    endDate,
    metricsByVariantCount,
    flagEvaluationsCount,
    barChartData,
    hitsPerVariantPerDate,
    flagEvaluations
  } = (0, import_react76.useLoaderData)(), { flagEnv } = useFlagEnv(), { user } = useUser(), { project } = useProject(), { environment } = useEnvironment(), currentFlag = flagEnv.flag, isFlagActivated = flagEnv.status === "ACTIVATED" /* ACTIVATED */;
  return /* @__PURE__ */ (0, import_jsx_runtime117.jsxs)(
    DashboardLayout2,
    {
      user,
      header: /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(
        Header,
        {
          tagline: /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(TagLine, { icon: /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(FlagIcon, {}), children: "Feature flag" }),
          title: currentFlag.name,
          action: /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(
            import_react76.Form,
            {
              method: "post",
              id: `form-${currentFlag.uuid}`,
              style: { marginTop: 12 },
              children: /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(
                ToggleFlag,
                {
                  isFlagActivated,
                  flagId: currentFlag.uuid,
                  flagName: currentFlag.name
                }
              )
            }
          )
        }
      ),
      subNav: /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(
        FlagMenu,
        {
          projectId: project.uuid,
          envId: environment.uuid,
          flagId: currentFlag.uuid
        }
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime117.jsx)("div", { className: "sr-only", children: /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(
          PageTitle,
          {
            value: "Insights",
            description: /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(Typography, { children: "Information about variants hits per date on the feature flag." })
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(import_react76.Form, { action: ".", children: /* @__PURE__ */ (0, import_jsx_runtime117.jsxs)("div", { className: "flex flex-col md:flex-row gap-3 md:items-end", children: [
          /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(
            TextInput,
            {
              type: "date",
              name: "startDate",
              label: "Start date",
              defaultValue: formatDefaultDate(startDate)
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(
            TextInput,
            {
              type: "date",
              name: "endDate",
              label: "End date",
              defaultValue: formatDefaultDate(endDate)
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(SubmitButton, { children: "Filter" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime117.jsxs)(Section, { id: "variants-hits", children: [
          /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(
            SectionHeader,
            {
              title: "Flag evaluations",
              description: "These are the number of hit on each metrics and the associated variant (if applicable). The chart shows the ratio between the variant evaluation and the metric hit."
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(Spacer, { size: 4 }),
          /* @__PURE__ */ (0, import_jsx_runtime117.jsxs)("div", { className: "grid grid-cols-4 gap-8", children: [
            /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(EvalCard, { count: flagEvaluationsCount }),
            /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(
              "div",
              {
                className: "w-full col-span-3 border border-gray-100 rounded-md bg-white dark:border-slate-700 dark:bg-slate-800 pr-6",
                style: { height: 300 },
                children: hitsPerVariantPerDate.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(LineChart, { data: hitsPerVariantPerDate }) : /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(
                  EmptyState,
                  {
                    title: "No data",
                    description: "There are no flag evaluations for this period."
                  }
                )
              }
            ),
            flagEvaluations.map((fe) => /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(
              VariantCard,
              {
                variant: fe.valueResolved,
                hit: fe._count,
                ratio: Math.round(fe._count / flagEvaluationsCount * 1e4) / 100
              },
              `variant-card-${fe.valueResolved}`
            ))
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime117.jsxs)(Section, { id: "metrics-variant", children: [
          /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(
            SectionHeader,
            {
              title: "Hit on metrics",
              description: "These are the number of hit on each metrics and the associated variant (if applicable). The chart shows the ratio between the variant evaluation and the metric hit."
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(Spacer, { size: 4 }),
          /* @__PURE__ */ (0, import_jsx_runtime117.jsxs)(Card, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(MetricPerVariantList, { items: metricsByVariantCount }),
            /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(
              "div",
              {
                className: "w-full bg-gray-50 dark:bg-slate-700 pt-8 pb-6",
                style: { height: 300 },
                children: barChartData.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(BarChart, { data: barChartData }) : /* @__PURE__ */ (0, import_jsx_runtime117.jsx)(
                  EmptyState,
                  {
                    title: "No data",
                    description: "There are no metric hits for this period."
                  }
                )
              }
            )
          ] })
        ] })
      ]
    }
  );
}

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/settings.tsx
var settings_exports = {};
__export(settings_exports, {
  action: () => action23,
  default: () => FlagSettingPage,
  meta: () => meta22
});
var import_ai12 = require("react-icons/ai");
var import_react77 = require("@remix-run/react");
var import_jsx_runtime118 = require("react/jsx-runtime"), meta22 = ({ parentsData, params }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env), flagName = getFlagMetaTitle(parentsData);
  return {
    title: `Progressively | ${projectName} | ${envName} | ${flagName} | Settings`
  };
}, action23 = async ({
  request,
  params
}) => {
  let authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie"), formData = await request.formData();
  return formData.get("_type") === "toggle-flag" ? toggleFlagAction(formData, params, authCookie) : null;
};
function FlagSettingPage() {
  let { project, userRole } = useProject(), { user } = useUser(), { flagEnv } = useFlagEnv(), { environment } = useEnvironment(), currentFlag = flagEnv.flag, isFlagActivated = flagEnv.status === "ACTIVATED" /* ACTIVATED */;
  return /* @__PURE__ */ (0, import_jsx_runtime118.jsxs)(
    DashboardLayout2,
    {
      user,
      header: /* @__PURE__ */ (0, import_jsx_runtime118.jsx)(
        Header,
        {
          tagline: /* @__PURE__ */ (0, import_jsx_runtime118.jsx)(TagLine, { icon: /* @__PURE__ */ (0, import_jsx_runtime118.jsx)(FlagIcon, {}), children: "Feature flag" }),
          title: currentFlag.name,
          action: /* @__PURE__ */ (0, import_jsx_runtime118.jsx)(
            import_react77.Form,
            {
              method: "post",
              id: `form-${currentFlag.uuid}`,
              style: { marginTop: 12 },
              children: /* @__PURE__ */ (0, import_jsx_runtime118.jsx)(
                ToggleFlag,
                {
                  isFlagActivated,
                  flagId: currentFlag.uuid,
                  flagName: currentFlag.name
                }
              )
            }
          )
        }
      ),
      subNav: /* @__PURE__ */ (0, import_jsx_runtime118.jsx)(
        FlagMenu,
        {
          projectId: project.uuid,
          envId: environment.uuid,
          flagId: currentFlag.uuid
        }
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime118.jsx)(PageTitle, { value: "Settings", icon: /* @__PURE__ */ (0, import_jsx_runtime118.jsx)(import_ai12.AiOutlineSetting, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime118.jsxs)(Stack, { spacing: 8, children: [
          /* @__PURE__ */ (0, import_jsx_runtime118.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime118.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime118.jsxs)(Section, { id: "general", children: [
            /* @__PURE__ */ (0, import_jsx_runtime118.jsx)(
              SectionHeader,
              {
                title: "General",
                description: "The following is the flag key to use inside your application to get the flag variation"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime118.jsx)(Spacer, { size: 4 }),
            /* @__PURE__ */ (0, import_jsx_runtime118.jsx)(ButtonCopy, { toCopy: currentFlag.key, children: currentFlag.key })
          ] }) }) }),
          userRole === "admin" /* Admin */ && /* @__PURE__ */ (0, import_jsx_runtime118.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime118.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime118.jsxs)(Section, { id: "danger", children: [
            /* @__PURE__ */ (0, import_jsx_runtime118.jsx)(
              SectionHeader,
              {
                title: "Danger zone",
                titleAs: "h3",
                description: "You can delete a feature flag at any time, but you  won't be able to access its insights anymore and false will be served to the application using it."
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime118.jsx)(Spacer, { size: 4 }),
            /* @__PURE__ */ (0, import_jsx_runtime118.jsx)("div", { className: "inline-block", children: /* @__PURE__ */ (0, import_jsx_runtime118.jsxs)(
              DeleteButton,
              {
                variant: "secondary",
                to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/delete`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime118.jsxs)("span", { "aria-hidden": !0, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime118.jsx)("span", { children: "Delete " }),
                    /* @__PURE__ */ (0, import_jsx_runtime118.jsxs)("span", { className: "hidden md:inline", children: [
                      currentFlag.name,
                      " forever"
                    ] })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime118.jsx)(VisuallyHidden, { children: `Delete ${currentFlag.name} forever` })
                ]
              }
            ) })
          ] }) }) })
        ] })
      ]
    }
  );
}

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/delete.tsx
var delete_exports6 = {};
__export(delete_exports6, {
  action: () => action24,
  default: () => DeleteFlagPage,
  meta: () => meta23
});

// app/modules/flags/services/deleteFlag.ts
var deleteFlag = (flagId, accessToken) => fetch(`${Constants.BackendUrl}/flags/${flagId}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  }
}).then((res) => {
  if (!res.ok)
    throw new Error("You are not authorized to remove this flag.");
  return res.json();
});

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/delete.tsx
var import_node18 = require("@remix-run/node"), import_react78 = require("@remix-run/react");
var import_jsx_runtime119 = require("react/jsx-runtime"), meta23 = ({ parentsData, params }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env), flagName = getFlagMetaTitle(parentsData);
  return {
    title: `Progressively | ${projectName} | ${envName} | ${flagName} | Delete`
  };
}, action24 = async ({
  request,
  params
}) => {
  let session = await getSession(request.headers.get("Cookie")), projectId = params.id, envId = params.env, flagId = params.flagId;
  try {
    await deleteFlag(flagId, session.get("auth-cookie"));
  } catch (error) {
    return error instanceof Error ? { errors: { backendError: error.message } } : { errors: { backendError: "An error ocurred" } };
  }
  return (0, import_node18.redirect)(
    `/dashboard/projects/${projectId}/environments/${envId}?flagRemoved=true#flag-removed`
  );
};
function DeleteFlagPage() {
  let transition = (0, import_react78.useTransition)(), { project } = useProject(), { flagEnv } = useFlagEnv(), data = (0, import_react78.useActionData)(), { environment } = useEnvironment(), currentFlag = flagEnv.flag;
  return /* @__PURE__ */ (0, import_jsx_runtime119.jsx)(
    DeleteEntityLayout,
    {
      error: (data == null ? void 0 : data.errors) && data.errors.backendError && /* @__PURE__ */ (0, import_jsx_runtime119.jsx)(ErrorBox, { list: data.errors }),
      titleSlot: /* @__PURE__ */ (0, import_jsx_runtime119.jsxs)(DeleteEntityTitle, { children: [
        "Are you sure you want to delete",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime119.jsx)("span", { className: "text-red-700 font-semibold dark:text-red-400", children: currentFlag.name }),
        "?"
      ] }),
      cancelAction: /* @__PURE__ */ (0, import_jsx_runtime119.jsx)(
        Button,
        {
          variant: "tertiary",
          scheme: "danger",
          to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/settings`,
          children: "Cancel"
        }
      ),
      confirmAction: /* @__PURE__ */ (0, import_jsx_runtime119.jsx)(import_react78.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime119.jsx)(
        DeleteButton,
        {
          type: "submit",
          isLoading: transition.state === "submitting",
          loadingText: "Deleting the environment, please wait...",
          children: "Delete"
        }
      ) }),
      backLinkSlot: /* @__PURE__ */ (0, import_jsx_runtime119.jsx)(
        BackLink,
        {
          to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}`,
          children: "Back to environment"
        }
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime119.jsxs)(Stack, { spacing: 4, children: [
        /* @__PURE__ */ (0, import_jsx_runtime119.jsxs)(Typography, { children: [
          "The flag will be removed from all the ",
          /* @__PURE__ */ (0, import_jsx_runtime119.jsx)("strong", { children: "environments" }),
          " of the ",
          /* @__PURE__ */ (0, import_jsx_runtime119.jsx)("strong", { children: project.name }),
          " project."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime119.jsxs)(Typography, { children: [
          "You won't have access to the ",
          /* @__PURE__ */ (0, import_jsx_runtime119.jsx)("strong", { children: "flags analytics" }),
          " anymore."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime119.jsx)(Typography, { children: "There will be no way to get the data back." })
      ] })
    }
  );
}

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/index.tsx
var flagId_exports2 = {};
__export(flagId_exports2, {
  action: () => action25,
  default: () => FlagById,
  loader: () => loader13,
  meta: () => meta24
});
var import_bi2 = require("react-icons/bi");

// app/modules/strategies/services/getStrategies.ts
var getStrategies = (envId, flagId, accessToken) => fetch(
  `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/strategies`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }
).then((res) => {
  if (!res.ok)
    throw new Error("Woops! Something went wrong in the server.");
  return res.json();
});

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/index.tsx
var import_react83 = require("@remix-run/react");

// app/modules/flags/components/SliderFlag.tsx
var import_react79 = require("@remix-run/react"), import_react80 = require("react");
var import_jsx_runtime120 = require("react/jsx-runtime"), SliderFlag = ({ initialRolloutPercentage }) => {
  let [rolloutPercentage, setRolloutPercentage] = (0, import_react80.useState)(
    initialRolloutPercentage
  );
  return (0, import_react80.useEffect)(() => {
    setRolloutPercentage(initialRolloutPercentage);
  }, [initialRolloutPercentage]), /* @__PURE__ */ (0, import_jsx_runtime120.jsxs)(import_react79.Form, { method: "post", children: [
    /* @__PURE__ */ (0, import_jsx_runtime120.jsxs)(Stack, { spacing: 4, children: [
      /* @__PURE__ */ (0, import_jsx_runtime120.jsx)(
        SliderInput,
        {
          percentageValue: rolloutPercentage,
          name: "rolloutPercentage",
          label: "Percentage of the audience",
          hiddenLabel: !0,
          onChange: setRolloutPercentage
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime120.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime120.jsx)(SubmitButton, { children: "Adjust" }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime120.jsx)("input", { type: "hidden", name: "_type", value: "percentage" })
  ] });
};

// app/modules/flags/services/changePercentageFlag.ts
var changePercentageFlag = (envId, flagId, rolloutPercentage, accessToken) => fetch(
  `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/percentage`,
  {
    method: "PUT",
    body: JSON.stringify({ rolloutPercentage }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  }
).then((res) => res.json());

// app/modules/misc/components/Comparator.tsx
var import_jsx_runtime121 = require("react/jsx-runtime"), Comparator = ({ comparator }) => comparator === "eq" /* Equals */ ? /* @__PURE__ */ (0, import_jsx_runtime121.jsx)("span", { children: "equals" }) : comparator === "contains" /* Contains */ ? /* @__PURE__ */ (0, import_jsx_runtime121.jsx)("span", { children: "contains" }) : null;

// app/modules/strategies/components/AdditionalAudienceList.tsx
var import_jsx_runtime122 = require("react/jsx-runtime"), AdditionalAudienceList = ({
  items,
  projectId,
  envId,
  flagId
}) => /* @__PURE__ */ (0, import_jsx_runtime122.jsxs)(RawTable, { caption: "Strategies applied on this flag", children: [
  /* @__PURE__ */ (0, import_jsx_runtime122.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime122.jsxs)(Tr, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime122.jsx)(Th, { children: "Field" }),
    /* @__PURE__ */ (0, import_jsx_runtime122.jsx)(Th, { children: "Comparator" }),
    /* @__PURE__ */ (0, import_jsx_runtime122.jsx)(Th, { children: "Field value (one of them)" }),
    /* @__PURE__ */ (0, import_jsx_runtime122.jsx)(Th, { children: "Value to serve" }),
    /* @__PURE__ */ (0, import_jsx_runtime122.jsx)(Th, { children: "Actions" })
  ] }) }),
  /* @__PURE__ */ (0, import_jsx_runtime122.jsx)("tbody", { children: items.map((strat) => /* @__PURE__ */ (0, import_jsx_runtime122.jsxs)(Tr, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime122.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime122.jsx)(Typography, { children: strat.fieldName }) }),
    /* @__PURE__ */ (0, import_jsx_runtime122.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime122.jsx)(Typography, { children: /* @__PURE__ */ (0, import_jsx_runtime122.jsx)(Comparator, { comparator: strat.fieldComparator }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime122.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime122.jsx)("div", { className: "flex flex-row gap-2 flex-wrap", children: strat.fieldValue.split(`
`).map((entry2, index) => /* @__PURE__ */ (0, import_jsx_runtime122.jsx)(
      Tag,
      {
        variant: "PRIMARY",
        size: "S",
        children: entry2
      },
      `${strat.uuid}-${entry2}-${index}`
    )) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime122.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime122.jsx)(Tag, { children: strat.valueToServe }) }),
    /* @__PURE__ */ (0, import_jsx_runtime122.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime122.jsx)("div", { className: "inline-block", children: /* @__PURE__ */ (0, import_jsx_runtime122.jsx)(
      DeleteButton,
      {
        variant: "secondary",
        to: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/strategies/${strat.uuid}/delete`,
        children: "Remove"
      }
    ) }) })
  ] }, strat.uuid)) })
] });

// app/modules/eligibility/services/getEligibilities.ts
var getEligibilities = (envId, flagId, accessToken) => fetch(
  `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/eligibilities`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }
).then((res) => {
  if (!res.ok)
    throw new Error("Woops! Something went wrong in the server.");
  return res.json();
});

// app/modules/eligibility/components/EligibilityList.tsx
var import_jsx_runtime123 = require("react/jsx-runtime"), EligibilityList = ({
  items,
  projectId,
  envId,
  flagId
}) => /* @__PURE__ */ (0, import_jsx_runtime123.jsxs)(RawTable, { caption: "Strategies applied on this flag", children: [
  /* @__PURE__ */ (0, import_jsx_runtime123.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime123.jsxs)(Tr, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime123.jsx)(Th, { children: "Field" }),
    /* @__PURE__ */ (0, import_jsx_runtime123.jsx)(Th, { children: "Comparator" }),
    /* @__PURE__ */ (0, import_jsx_runtime123.jsx)(Th, { children: "Field value (one of them)" }),
    /* @__PURE__ */ (0, import_jsx_runtime123.jsx)(Th, { children: "Actions" })
  ] }) }),
  /* @__PURE__ */ (0, import_jsx_runtime123.jsx)("tbody", { children: items.map((eligibility) => /* @__PURE__ */ (0, import_jsx_runtime123.jsxs)(Tr, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime123.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime123.jsx)(Typography, { children: eligibility.fieldName }) }),
    /* @__PURE__ */ (0, import_jsx_runtime123.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime123.jsx)(Typography, { children: /* @__PURE__ */ (0, import_jsx_runtime123.jsx)(Comparator, { comparator: eligibility.fieldComparator }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime123.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime123.jsx)("div", { className: "flex flex-row gap-2 flex-wrap", children: eligibility.fieldValue.split(`
`).map((entry2, index) => /* @__PURE__ */ (0, import_jsx_runtime123.jsx)(
      Tag,
      {
        variant: "PRIMARY",
        size: "S",
        children: entry2
      },
      `${eligibility.uuid}-${entry2}-${index}`
    )) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime123.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime123.jsx)("div", { className: "inline-block", children: /* @__PURE__ */ (0, import_jsx_runtime123.jsx)(
      DeleteButton,
      {
        size: "S",
        variant: "secondary",
        to: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/eligibilities/${eligibility.uuid}/delete`,
        children: "Remove"
      }
    ) }) })
  ] }, eligibility.uuid)) })
] });

// app/modules/variants/components/VariantTable.tsx
var import_react81 = require("@remix-run/react"), import_react82 = require("react");
var import_ai13 = require("react-icons/ai");
var import_jsx_runtime124 = require("react/jsx-runtime"), FormSliderInput2 = ({
  name,
  label,
  id,
  initialPercentage,
  bgColor,
  fgColor
}) => {
  let [percentage, setPercentage] = (0, import_react82.useState)(initialPercentage);
  return /* @__PURE__ */ (0, import_jsx_runtime124.jsx)(
    SliderInput,
    {
      id,
      name,
      hiddenLabel: !0,
      percentageValue: percentage,
      onChange: setPercentage,
      label,
      bgColor,
      fgColor
    }
  );
}, VariantTable = ({ variants: variants2 }) => /* @__PURE__ */ (0, import_jsx_runtime124.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime124.jsxs)(import_react81.Form, { method: "post", id: "edit-variant", children: [
  /* @__PURE__ */ (0, import_jsx_runtime124.jsx)("input", { type: "hidden", name: "_type", value: "edit-variant" }),
  /* @__PURE__ */ (0, import_jsx_runtime124.jsxs)(RawTable, { caption: "Variant list", children: [
    /* @__PURE__ */ (0, import_jsx_runtime124.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime124.jsxs)(Tr, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime124.jsx)(Th, { children: "Variant" }),
      /* @__PURE__ */ (0, import_jsx_runtime124.jsx)(Th, { children: "Rollout percentage" }),
      /* @__PURE__ */ (0, import_jsx_runtime124.jsx)(Th, { className: "text-center", children: "Is control" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime124.jsx)("tbody", { children: variants2.map((variant, index) => {
      let background = stringToColor(variant.value, 75), color = stringToColor(variant.value, 25);
      return /* @__PURE__ */ (0, import_jsx_runtime124.jsxs)(Tr, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime124.jsxs)(
          Td,
          {
            className: `border-l-8 pl-6 ${variant.isControl ? "" : "border-l-transparent"}`,
            style: variant.isControl ? { borderColor: background } : void 0,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime124.jsx)("input", { type: "hidden", value: variant.value, name: "name" }),
              /* @__PURE__ */ (0, import_jsx_runtime124.jsxs)("span", { className: "flex flex-row gap-3 items-center", children: [
                /* @__PURE__ */ (0, import_jsx_runtime124.jsx)(VariantDot, { variant: variant.value }),
                variant.value
              ] })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime124.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime124.jsx)(
          FormSliderInput2,
          {
            id: `rolloutPercentage-${index}`,
            name: "rolloutPercentage",
            label: `Variant ${index + 1} rollout percentage`,
            initialPercentage: variant.rolloutPercentage,
            bgColor: background,
            fgColor: color
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime124.jsxs)(Td, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime124.jsx)("input", { type: "hidden", name: "uuid", value: variant.uuid }),
          variant.isControl && /* @__PURE__ */ (0, import_jsx_runtime124.jsx)(
            "input",
            {
              type: "hidden",
              name: "isControl",
              value: variant.uuid
            }
          ),
          variant.isControl && /* @__PURE__ */ (0, import_jsx_runtime124.jsx)("div", { className: "flex justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime124.jsx)(
            import_ai13.AiFillCheckCircle,
            {
              "aria-label": "This is the control version",
              className: "text-2xl",
              style: { color: background }
            }
          ) })
        ] })
      ] }, `variant-${variant.uuid}`);
    }) })
  ] })
] }) });

// app/routes/dashboard/projects/$id/environments/$env/flags/$flagId/index.tsx
var import_jsx_runtime125 = require("react/jsx-runtime"), meta24 = ({ parentsData, params }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env), flagName = getFlagMetaTitle(parentsData);
  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName}`
  };
}, action25 = async ({
  request,
  params
}) => {
  let authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie"), flagId = params.flagId, formData = await request.formData(), type = formData.get("_type");
  if (type === "percentage") {
    let rolloutPercentage = formData.get("rolloutPercentage");
    if (rolloutPercentage != null && flagId)
      return await changePercentageFlag(
        params.env,
        flagId,
        Number(rolloutPercentage),
        authCookie
      ), { successChangePercentage: !0 };
  }
  return type === "edit-variant" ? editVariantAction(formData, params, authCookie) : type === "toggle-flag" ? toggleFlagAction(formData, params, authCookie) : null;
}, loader13 = async ({
  request,
  params
}) => {
  let authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie"), strategies = await getStrategies(
    params.env,
    params.flagId,
    authCookie
  ), eligibilities = await getEligibilities(
    params.env,
    params.flagId,
    authCookie
  );
  return {
    strategies,
    eligibilities
  };
};
function FlagById() {
  let actionData = (0, import_react83.useActionData)(), { project } = useProject(), { user } = useUser(), { environment } = useEnvironment(), { flagEnv } = useFlagEnv(), [searchParams] = (0, import_react83.useSearchParams)(), { strategies, eligibilities } = (0, import_react83.useLoaderData)(), hasPercentageChanged = Boolean(actionData == null ? void 0 : actionData.successChangePercentage), currentFlag = flagEnv.flag, isFlagActivated = flagEnv.status === "ACTIVATED" /* ACTIVATED */, hasStrategies = strategies.length > 0, hasEligibility = eligibilities.length > 0, hasErrors = Object.keys((actionData == null ? void 0 : actionData.errors) || {}).length > 0, isMultiVariants = flagEnv.variants.length > 0, isStrategyAdded = searchParams.get("newStrategy") || void 0, isStrategyUpdated = searchParams.get("strategyUpdated") || void 0, isStrategyRemoved = searchParams.get("stratRemoved") || void 0, isEligibilityAdded = searchParams.get("newEligibility") || void 0, isEligibilityRemoved = searchParams.get("eligibilityRemoved") || void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime125.jsxs)(
    DashboardLayout2,
    {
      user,
      header: /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(
        Header,
        {
          tagline: /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(TagLine, { icon: /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(FlagIcon, {}), children: "Feature flag" }),
          title: currentFlag.name,
          action: /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(
            import_react83.Form,
            {
              method: "post",
              id: `form-${currentFlag.uuid}`,
              style: { marginTop: 12 },
              children: /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(
                ToggleFlag,
                {
                  isFlagActivated,
                  flagId: currentFlag.uuid,
                  flagName: currentFlag.name
                }
              )
            }
          )
        }
      ),
      subNav: /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(
        FlagMenu,
        {
          projectId: project.uuid,
          envId: environment.uuid,
          flagId: currentFlag.uuid
        }
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(PageTitle, { value: "Audience", icon: /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(import_bi2.BiGroup, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(Section, { id: "rollout-target", children: /* @__PURE__ */ (0, import_jsx_runtime125.jsxs)(Card, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime125.jsxs)(CardContent, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(
              SectionHeader,
              {
                title: "Percentage of the audience",
                action: isMultiVariants && /* @__PURE__ */ (0, import_jsx_runtime125.jsx)("div", { className: "flex items-center flex-row h-full", children: /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(SubmitButton, { form: "edit-variant", children: "Adjust" }) }),
                status: hasPercentageChanged ? /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(SuccessBox, { id: "percentage-changed", children: "Percentage adjusted." }) : actionData != null && actionData.successEdit ? /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(SuccessBox, { id: "variant-edited", children: "The variants have been successfully edited." }) : hasErrors ? /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(ErrorBox, { list: (actionData == null ? void 0 : actionData.errors) || {} }) : null
              }
            ),
            !isMultiVariants && /* @__PURE__ */ (0, import_jsx_runtime125.jsxs)(import_jsx_runtime125.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(Spacer, { size: 2 }),
              /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(
                SliderFlag,
                {
                  initialRolloutPercentage: flagEnv.rolloutPercentage
                }
              )
            ] })
          ] }),
          isMultiVariants && /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(VariantTable, { variants: flagEnv.variants })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(Section, { id: "eligibility", children: /* @__PURE__ */ (0, import_jsx_runtime125.jsxs)(Card, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(
            SectionHeader,
            {
              title: "Audience eligibility",
              description: !hasEligibility && "Only people matching at least one of the following rules (and the additional audience) will resolve the flag.",
              status: isEligibilityAdded ? /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(SuccessBox, { id: "eligibility-added", children: "The eligibility audience has been successfully set." }) : isEligibilityRemoved ? /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(SuccessBox, { id: "eligibility-removed", children: "The eligibility audience has been successfully removed." }) : null,
              action: hasEligibility && /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(
                CreateButton,
                {
                  variant: "secondary",
                  to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/eligibilities/create`,
                  children: "Create an eligibility restriction"
                }
              )
            }
          ) }),
          !hasEligibility && /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(
            EmptyState,
            {
              titleAs: "h2",
              title: "No restrictions",
              description: "There are no eligibility restrictions. Every users will resolve the flag.",
              action: /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(
                CreateButton,
                {
                  to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/eligibilities/create`,
                  variant: "secondary",
                  children: "Create an eligibility restriction"
                }
              )
            }
          ) }),
          hasEligibility && /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(
            EligibilityList,
            {
              items: eligibilities,
              projectId: project.uuid,
              envId: environment.uuid,
              flagId: currentFlag.uuid
            }
          )
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(Section, { id: "additional-audience", children: /* @__PURE__ */ (0, import_jsx_runtime125.jsxs)(Card, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(
            SectionHeader,
            {
              title: "Additional audience",
              description: !hasStrategies && "The users matching at least one of the following condition will resolve the flag even if they are not targeted because of the eligibility restrictions",
              status: isStrategyUpdated ? /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(SuccessBox, { id: "strategy-updated", children: "The additional audience has been updated." }) : isStrategyAdded ? /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(SuccessBox, { id: "strategy-added", children: "The additional audience has been successfully set." }) : isStrategyRemoved ? /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(SuccessBox, { id: "strategy-removed", children: "The additional audience has been successfully removed." }) : null,
              action: hasStrategies && /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(
                CreateButton,
                {
                  variant: "secondary",
                  to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/strategies/create`,
                  children: "Create an additional audience"
                }
              )
            }
          ) }),
          !hasStrategies && /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(
            EmptyState,
            {
              titleAs: "h2",
              title: "No additional audience",
              description: "There are no additional audience for this flag.",
              action: /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(
                CreateButton,
                {
                  variant: "secondary",
                  to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/strategies/create`,
                  children: "Create an additional audience"
                }
              )
            }
          ) }),
          hasStrategies && /* @__PURE__ */ (0, import_jsx_runtime125.jsx)(
            AdditionalAudienceList,
            {
              items: strategies,
              projectId: project.uuid,
              envId: environment.uuid,
              flagId: currentFlag.uuid
            }
          )
        ] }) })
      ]
    }
  );
}

// app/routes/dashboard/projects/$id/environments/$env/flags/create.tsx
var create_exports9 = {};
__export(create_exports9, {
  action: () => action26,
  default: () => CreateFlagPage,
  meta: () => meta25
});
var import_node19 = require("@remix-run/node"), import_react84 = require("@remix-run/react");

// app/modules/flags/services/createFlag.ts
var createFlag = (envId, name, description, accessToken) => fetch(`${Constants.BackendUrl}/environments/${envId}/flags`, {
  method: "POST",
  body: JSON.stringify({ name, description }),
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  }
}).then((res) => {
  if (!res.ok)
    throw new Error("The flag name is already used.");
  return res.json();
});

// app/modules/flags/validators/validateFlagShape.ts
var validateFlagShape = (values) => {
  let errors = {};
  return values.name || (errors.name = "The name field is required, make sure to have one."), values.description || (errors.description = "The description field is required, make sure to have one."), errors;
};

// app/routes/dashboard/projects/$id/environments/$env/flags/create.tsx
var import_react85 = require("react"), import_camelcase = __toESM(require("camelcase"));
var import_jsx_runtime126 = require("react/jsx-runtime"), meta25 = ({ params, parentsData }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env);
  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | Create`
  };
}, action26 = async ({
  request,
  params
}) => {
  var _a, _b;
  let projectId = params.id, envId = params.env, formData = await request.formData(), name = (_a = formData.get("flag-name")) == null ? void 0 : _a.toString(), description = (_b = formData.get("flag-desc")) == null ? void 0 : _b.toString(), errors = validateFlagShape({ name, description });
  if ((errors == null ? void 0 : errors.name) || (errors == null ? void 0 : errors.description))
    return { errors };
  let session = await getSession(request.headers.get("Cookie"));
  try {
    let newFlag = await createFlag(
      envId,
      name,
      description,
      session.get("auth-cookie")
    );
    return (0, import_node19.redirect)(
      `/dashboard/projects/${projectId}/environments/${envId}?newFlagId=${newFlag.uuid}#flag-added`
    );
  } catch (error) {
    return error instanceof Error ? { errors: { name: error.message } } : { errors: { name: "An error ocurred" } };
  }
};
function CreateFlagPage() {
  let [value, setValue] = (0, import_react85.useState)(""), { project } = useProject(), data = (0, import_react84.useActionData)(), transition = (0, import_react84.useTransition)(), { environment } = useEnvironment(), errors = data == null ? void 0 : data.errors, camelValue = (0, import_camelcase.default)(value);
  return /* @__PURE__ */ (0, import_jsx_runtime126.jsx)(import_react84.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime126.jsx)(
    CreateEntityLayout,
    {
      status: ((errors == null ? void 0 : errors.name) || (errors == null ? void 0 : errors.description)) && /* @__PURE__ */ (0, import_jsx_runtime126.jsx)(ErrorBox, { list: errors }),
      titleSlot: /* @__PURE__ */ (0, import_jsx_runtime126.jsx)(CreateEntityTitle, { children: "Create a feature flag" }),
      submitSlot: /* @__PURE__ */ (0, import_jsx_runtime126.jsx)(
        SubmitButton,
        {
          type: "submit",
          isLoading: transition.state === "submitting",
          loadingText: "Creating the feature flag, please wait...",
          children: "Create the feature flag"
        }
      ),
      backLinkSlot: /* @__PURE__ */ (0, import_jsx_runtime126.jsx)(
        BackLink,
        {
          to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}`,
          children: "Back to environment"
        }
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime126.jsxs)(FormGroup, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime126.jsxs)("div", { className: "flex flex-row gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime126.jsx)(
            TextInput,
            {
              name: "flag-name",
              isInvalid: Boolean(errors == null ? void 0 : errors.name),
              label: "Flag name",
              placeholder: "e.g: New Homepage",
              onChange: (e) => setValue(e.target.value)
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime126.jsxs)("div", { className: "text-gray-500 dark:text-slate-200 flex gap-2 flex-col", children: [
            /* @__PURE__ */ (0, import_jsx_runtime126.jsx)("div", { children: "Flag key" }),
            /* @__PURE__ */ (0, import_jsx_runtime126.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime126.jsx)(ButtonCopy, { toCopy: camelValue, children: camelValue || "N/A" }) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime126.jsx)(
          TextInput,
          {
            name: "flag-desc",
            isInvalid: Boolean(errors == null ? void 0 : errors.description),
            label: "Flag description",
            placeholder: "e.g: The new homepage"
          }
        )
      ] })
    }
  ) });
}

// app/routes/dashboard/projects/$id/environments/$env/settings.tsx
var settings_exports2 = {};
__export(settings_exports2, {
  default: () => EnvSettingsPage,
  meta: () => meta26
});

// app/modules/environments/components/EnvNavbar.tsx
var import_ai14 = require("react-icons/ai");
var import_jsx_runtime127 = require("react/jsx-runtime"), EnvNavBar = ({ projectId, envId }) => {
  let rootEnvPath = `/dashboard/projects/${projectId}/environments/${envId}`;
  return /* @__PURE__ */ (0, import_jsx_runtime127.jsxs)(HorizontalNav, { label: "Environment related", children: [
    /* @__PURE__ */ (0, import_jsx_runtime127.jsx)(NavItem, { to: `${rootEnvPath}`, icon: /* @__PURE__ */ (0, import_jsx_runtime127.jsx)(FlagIcon, {}), children: "Feature flags" }),
    /* @__PURE__ */ (0, import_jsx_runtime127.jsx)(NavItem, { to: `${rootEnvPath}/settings`, icon: /* @__PURE__ */ (0, import_jsx_runtime127.jsx)(import_ai14.AiOutlineSetting, {}), children: "Settings" })
  ] });
};

// app/routes/dashboard/projects/$id/environments/$env/settings.tsx
var import_ai15 = require("react-icons/ai");
var import_jsx_runtime128 = require("react/jsx-runtime"), meta26 = ({ parentsData, params }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env);
  return {
    title: `Progressively | ${projectName} | ${envName} | Settings`
  };
};
function EnvSettingsPage() {
  let { user } = useUser(), { project, userRole } = useProject(), { environment } = useEnvironment();
  return /* @__PURE__ */ (0, import_jsx_runtime128.jsxs)(
    DashboardLayout2,
    {
      user,
      header: /* @__PURE__ */ (0, import_jsx_runtime128.jsx)(
        Header,
        {
          title: environment.name,
          tagline: /* @__PURE__ */ (0, import_jsx_runtime128.jsx)(TagLine, { icon: /* @__PURE__ */ (0, import_jsx_runtime128.jsx)(import_fi2.FiLayers, {}), children: "Environment" })
        }
      ),
      subNav: /* @__PURE__ */ (0, import_jsx_runtime128.jsx)(EnvNavBar, { projectId: project.uuid, envId: environment.uuid }),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime128.jsx)(PageTitle, { value: "Settings", icon: /* @__PURE__ */ (0, import_jsx_runtime128.jsx)(import_ai15.AiOutlineSetting, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime128.jsxs)(Stack, { spacing: 8, children: [
          /* @__PURE__ */ (0, import_jsx_runtime128.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime128.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime128.jsxs)(Section, { id: "general", children: [
            /* @__PURE__ */ (0, import_jsx_runtime128.jsx)(
              SectionHeader,
              {
                title: "General",
                description: "The following is the client key to use inside your application to retrieve the flags"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime128.jsx)(Spacer, { size: 4 }),
            /* @__PURE__ */ (0, import_jsx_runtime128.jsx)(ButtonCopy, { toCopy: environment.clientKey, children: environment.clientKey })
          ] }) }) }),
          userRole === "admin" /* Admin */ && /* @__PURE__ */ (0, import_jsx_runtime128.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime128.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime128.jsxs)(Section, { id: "danger", children: [
            /* @__PURE__ */ (0, import_jsx_runtime128.jsx)(
              SectionHeader,
              {
                title: "Danger zone",
                titleAs: "h3",
                description: "You can delete an environment at any time, but you won't be able to access its flags will be removed and be falsy in your applications. Be sure to know what you're doing before removing an environment."
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime128.jsx)(Spacer, { size: 4 }),
            /* @__PURE__ */ (0, import_jsx_runtime128.jsx)("div", { className: "inline-block", children: /* @__PURE__ */ (0, import_jsx_runtime128.jsxs)(
              DeleteButton,
              {
                variant: "secondary",
                to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/delete`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime128.jsxs)("span", { "aria-hidden": !0, children: [
                    "Delete",
                    " ",
                    /* @__PURE__ */ (0, import_jsx_runtime128.jsxs)("span", { className: "hidden md:inline", children: [
                      `"${environment.name}"`,
                      " forever"
                    ] })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime128.jsxs)(VisuallyHidden, { children: [
                    "Delete ",
                    `"${environment.name}"`,
                    " forever"
                  ] })
                ]
              }
            ) })
          ] }) }) })
        ] })
      ]
    }
  );
}

// app/routes/dashboard/projects/$id/environments/$env/delete.tsx
var delete_exports7 = {};
__export(delete_exports7, {
  action: () => action27,
  default: () => DeleteEnvPage,
  meta: () => meta27
});

// app/modules/environments/services/deleteEnvironment.ts
var deleteEnvironment = (envId, accessToken) => fetch(`${Constants.BackendUrl}/environments/${envId}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  }
}).then((res) => {
  if (!res.ok)
    throw new Error("You are not authorized to remove this project.");
  return res.json();
});

// app/routes/dashboard/projects/$id/environments/$env/delete.tsx
var import_node20 = require("@remix-run/node"), import_react86 = require("@remix-run/react");
var import_jsx_runtime129 = require("react/jsx-runtime"), meta27 = ({ parentsData, params }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env);
  return {
    title: `Progressively | ${projectName} | ${envName} | Settings | Delete`
  };
}, action27 = async ({
  request,
  params
}) => {
  let session = await getSession(request.headers.get("Cookie")), projectId = params.id, envId = params.env;
  try {
    await deleteEnvironment(envId, session.get("auth-cookie"));
  } catch (error) {
    return error instanceof Error ? { errors: { backendError: error.message } } : { errors: { backendError: "An error ocurred" } };
  }
  return (0, import_node20.redirect)(
    `/dashboard/projects/${projectId}?envRemoved=true#env-removed`
  );
};
function DeleteEnvPage() {
  let transition = (0, import_react86.useTransition)(), data = (0, import_react86.useActionData)(), { project } = useProject(), { environment } = useEnvironment();
  return /* @__PURE__ */ (0, import_jsx_runtime129.jsx)(
    DeleteEntityLayout,
    {
      titleSlot: /* @__PURE__ */ (0, import_jsx_runtime129.jsxs)(DeleteEntityTitle, { children: [
        "Are you sure you want to delete",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime129.jsx)("span", { className: "text-red-700 font-semibold dark:text-red-400", children: environment.name }),
        "?"
      ] }),
      error: (data == null ? void 0 : data.errors) && data.errors.backendError && /* @__PURE__ */ (0, import_jsx_runtime129.jsx)(ErrorBox, { list: data.errors }),
      cancelAction: /* @__PURE__ */ (0, import_jsx_runtime129.jsx)(
        Button,
        {
          variant: "tertiary",
          scheme: "danger",
          to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/settings`,
          children: "Cancel"
        }
      ),
      confirmAction: /* @__PURE__ */ (0, import_jsx_runtime129.jsx)(import_react86.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime129.jsx)(
        DeleteButton,
        {
          type: "submit",
          isLoading: transition.state === "submitting",
          loadingText: "Deleting the environment, please wait...",
          children: "Yes, delete the environment"
        }
      ) }),
      backLinkSlot: /* @__PURE__ */ (0, import_jsx_runtime129.jsx)(BackLink, { to: `/dashboard/projects/${project.uuid}`, children: "Back to project" }),
      children: /* @__PURE__ */ (0, import_jsx_runtime129.jsxs)(Stack, { spacing: 4, children: [
        /* @__PURE__ */ (0, import_jsx_runtime129.jsxs)(Typography, { children: [
          "All the associated ",
          /* @__PURE__ */ (0, import_jsx_runtime129.jsx)("strong", { children: "feature flags" }),
          " will be removed."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime129.jsxs)(Typography, { children: [
          "You won't have access to the ",
          /* @__PURE__ */ (0, import_jsx_runtime129.jsx)("strong", { children: "flags analytics" }),
          " anymore."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime129.jsx)(Typography, { children: "There will be no way to get the data back." })
      ] })
    }
  );
}

// app/routes/dashboard/projects/$id/environments/$env/index.tsx
var env_exports2 = {};
__export(env_exports2, {
  action: () => action28,
  default: () => FlagsByEnvPage,
  loader: () => loader14,
  meta: () => meta28
});

// app/modules/flags/components/FlagList.tsx
var import_react87 = require("@remix-run/react"), import_react88 = require("react");
var import_jsx_runtime130 = require("react/jsx-runtime"), FlagRow = ({ flagEnv, projectId, envId }) => {
  let linkRef = (0, import_react88.useRef)(null);
  return /* @__PURE__ */ (0, import_jsx_runtime130.jsxs)(Tr, { onClick: () => {
    var _a;
    return (_a = linkRef.current) == null ? void 0 : _a.click();
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime130.jsxs)(Td, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime130.jsx)(
        Link4,
        {
          ref: linkRef,
          to: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}`,
          children: flagEnv.flag.name
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime130.jsx)(Typography, { className: "text-sm", children: flagEnv.flag.description })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime130.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime130.jsx)(
      ToggleFlag,
      {
        isFlagActivated: flagEnv.status === "ACTIVATED" /* ACTIVATED */,
        flagId: flagEnv.flagId,
        flagName: flagEnv.flag.name,
        onClick: (e) => e.stopPropagation()
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime130.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime130.jsx)(ButtonCopy, { toCopy: flagEnv.flag.key, children: flagEnv.flag.key }) })
  ] });
}, FlagList = ({ flags, projectId, envId }) => /* @__PURE__ */ (0, import_jsx_runtime130.jsxs)("div", { children: [
  flags.map((flagEnv) => /* @__PURE__ */ (0, import_jsx_runtime130.jsx)(
    import_react87.Form,
    {
      method: "post",
      id: `form-${flagEnv.flagId}`
    },
    `form-${flagEnv.flagId}`
  )),
  /* @__PURE__ */ (0, import_jsx_runtime130.jsxs)(RawTable, { caption: "Flags available in the environment", children: [
    /* @__PURE__ */ (0, import_jsx_runtime130.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime130.jsxs)(Tr, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime130.jsx)(Th, { children: "Name" }),
      /* @__PURE__ */ (0, import_jsx_runtime130.jsx)(Th, { className: "px-14", children: "Status" }),
      /* @__PURE__ */ (0, import_jsx_runtime130.jsx)(Th, { children: "Flag key" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime130.jsx)("tbody", { children: flags.map((flagEnv) => /* @__PURE__ */ (0, import_jsx_runtime130.jsx)(
      FlagRow,
      {
        flagEnv,
        projectId,
        envId
      },
      flagEnv.flagId
    )) })
  ] })
] });

// app/routes/dashboard/projects/$id/environments/$env/index.tsx
var import_react90 = require("@remix-run/react");

// app/layouts/SearchLayout.tsx
var import_jsx_runtime131 = require("react/jsx-runtime"), SearchLayout = ({ children, actions }) => /* @__PURE__ */ (0, import_jsx_runtime131.jsxs)("div", { className: "flex flex-col md:flex-row gap-4", children: [
  /* @__PURE__ */ (0, import_jsx_runtime131.jsx)("div", { className: "flex-1", children }),
  actions
] });

// app/components/SearchBar.tsx
var import_react89 = require("@remix-run/react"), import_io5 = require("react-icons/io");
var import_jsx_runtime132 = require("react/jsx-runtime"), SearchBar = ({ placeholder, label, count }) => /* @__PURE__ */ (0, import_jsx_runtime132.jsxs)("div", { className: "max-w-md", children: [
  /* @__PURE__ */ (0, import_jsx_runtime132.jsx)(VisuallyHidden, { children: /* @__PURE__ */ (0, import_jsx_runtime132.jsx)("label", { htmlFor: "search", children: label }) }),
  /* @__PURE__ */ (0, import_jsx_runtime132.jsx)(import_react89.Form, { role: "search", children: /* @__PURE__ */ (0, import_jsx_runtime132.jsxs)("div", { className: "flex flex-row items-center h-10 rounded pl-4 border border-gray-200 gap-2 bg-white overflow-hidden w-full dark:border-slate-800 dark:bg-slate-800", children: [
    /* @__PURE__ */ (0, import_jsx_runtime132.jsx)(import_io5.IoIosSearch, { className: "text-xl text-gray-500 dark:text-slate-300" }),
    /* @__PURE__ */ (0, import_jsx_runtime132.jsx)(
      "input",
      {
        type: "text",
        name: "search",
        id: "search",
        placeholder,
        className: "flex-1 dark:text-slate-100 dark:bg-slate-800"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime132.jsx)(
      "button",
      {
        type: "submit",
        className: "bg-indigo-100 text-indigo-700 text-indigo-700 hover:bg-indigo-50 active:bg-indigo-100 h-full px-4 dark:bg-slate-700 dark:text-slate-100 dark:active:bg-slate-800",
        children: "Search"
      }
    )
  ] }) }),
  count === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime132.jsx)(Spacer, { size: 1 }),
  /* @__PURE__ */ (0, import_jsx_runtime132.jsx)(Typography, { "aria-live": "polite", "aria-atomic": "true", "aria-relevant": "all", children: count === void 0 ? null : `${count} results for this search` })
] });

// app/routes/dashboard/projects/$id/environments/$env/index.tsx
var import_jsx_runtime133 = require("react/jsx-runtime"), meta28 = ({ params, parentsData }) => {
  let projectName = getProjectMetaTitle(parentsData), envName = getEnvMetaTitle(parentsData, params.env);
  return {
    title: `Progressively | ${projectName} | ${envName} | Flags`
  };
}, action28 = async ({
  request,
  params
}) => {
  let authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie"), formData = await request.formData();
  return formData.get("_type") === "toggle-flag" ? toggleFlagAction(formData, params, authCookie) : null;
}, loader14 = async ({
  request,
  params
}) => {
  let authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie");
  return { flagsByEnv: await getFlagsByProjectEnv(
    params.env,
    authCookie
  ) };
};
function FlagsByEnvPage() {
  let { flagsByEnv } = (0, import_react90.useLoaderData)(), { user } = useUser(), { project } = useProject(), { environment } = useEnvironment(), [searchParams] = (0, import_react90.useSearchParams)(), search = searchParams.get("search"), newFlagId = searchParams.get("newFlagId") || void 0, isFlagRemoved = searchParams.get("flagRemoved") || void 0, isSearching = Boolean(searchParams.get("search") || void 0), filteredFlags = flagsByEnv.filter(
    (flag) => flag.flag.name.toLocaleLowerCase().includes(search || "")
  ), hasFlags = flagsByEnv.length > 0;
  return /* @__PURE__ */ (0, import_jsx_runtime133.jsxs)(
    DashboardLayout2,
    {
      user,
      header: /* @__PURE__ */ (0, import_jsx_runtime133.jsx)(
        Header,
        {
          tagline: /* @__PURE__ */ (0, import_jsx_runtime133.jsx)(TagLine, { icon: /* @__PURE__ */ (0, import_jsx_runtime133.jsx)(import_fi2.FiLayers, {}), children: "Environment" }),
          title: environment.name
        }
      ),
      subNav: /* @__PURE__ */ (0, import_jsx_runtime133.jsx)(EnvNavBar, { projectId: project.uuid, envId: environment.uuid }),
      status: isFlagRemoved ? /* @__PURE__ */ (0, import_jsx_runtime133.jsx)(SuccessBox, { id: "flag-removed", children: "The flag has been successfully deleted." }) : newFlagId ? /* @__PURE__ */ (0, import_jsx_runtime133.jsx)(SuccessBox, { id: "flag-added", children: "The flag has been successfully created." }) : null,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime133.jsx)(PageTitle, { value: "Feature flags", icon: /* @__PURE__ */ (0, import_jsx_runtime133.jsx)(FlagIcon, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime133.jsx)(Section, { "aria-label": "List of feature flags", children: hasFlags ? /* @__PURE__ */ (0, import_jsx_runtime133.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime133.jsx)(
            SearchLayout,
            {
              actions: /* @__PURE__ */ (0, import_jsx_runtime133.jsx)(
                CreateButton,
                {
                  to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/create`,
                  children: "Create a feature flag"
                }
              ),
              children: /* @__PURE__ */ (0, import_jsx_runtime133.jsx)(
                SearchBar,
                {
                  label: "Search for flags",
                  placeholder: "e.g: The flag",
                  count: isSearching ? filteredFlags.length : void 0
                }
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime133.jsx)(Spacer, { size: 4 }),
          /* @__PURE__ */ (0, import_jsx_runtime133.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime133.jsx)(
            FlagList,
            {
              flags: filteredFlags,
              envId: environment.uuid,
              projectId: project.uuid
            }
          ) })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime133.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime133.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime133.jsx)(
          EmptyState,
          {
            titleAs: "h2",
            title: "No flags found",
            description: "There are no flags yet on this environment.",
            action: /* @__PURE__ */ (0, import_jsx_runtime133.jsx)(
              CreateButton,
              {
                to: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/create`,
                children: "Create a feature flag"
              }
            )
          }
        ) }) }) })
      ]
    }
  );
}

// app/routes/dashboard/projects/$id/add-member.tsx
var add_member_exports = {};
__export(add_member_exports, {
  action: () => action29,
  default: () => CreateProjectPage2,
  handle: () => handle6,
  meta: () => meta29
});

// app/modules/projects/services/addMemberToProject.ts
var addMemberToProject = (projectId, memberEmail, accessToken) => fetch(`${Constants.BackendUrl}/projects/${projectId}/members`, {
  method: "POST",
  body: JSON.stringify({ email: memberEmail }),
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  }
}).then((res) => res.ok ? res.json() : res.json().then((res2) => {
  throw new Error(res2.message);
}));

// app/routes/dashboard/projects/$id/add-member.tsx
var import_react91 = require("@remix-run/react");
var import_jsx_runtime134 = require("react/jsx-runtime"), handle6 = {
  breadcrumb: (match) => ({
    link: `/dashboard/projects/${match.params.id}/add-member`,
    label: "Add member"
  })
}, meta29 = ({ parentsData }) => ({
  title: `Progressively | ${getProjectMetaTitle(parentsData)} | Add member`
}), action29 = async ({
  request,
  params
}) => {
  var _a;
  let memberEmail = (_a = (await request.formData()).get("email")) == null ? void 0 : _a.toString(), emailError = validateEmail(memberEmail);
  if (emailError)
    return { errors: { email: emailError } };
  let session = await getSession(request.headers.get("Cookie"));
  try {
    return await addMemberToProject(
      params.id,
      memberEmail,
      session.get("auth-cookie")
    ), { success: !0 };
  } catch (error) {
    return error instanceof Error ? { errors: { backendError: error.message } } : { errors: { backendError: "An error ocurred" } };
  }
};
function CreateProjectPage2() {
  var _a;
  let data = (0, import_react91.useActionData)(), transition = (0, import_react91.useTransition)(), { project, userRole } = useProject(), { user } = useUser(), adminOfProject = (_a = (project == null ? void 0 : project.userProject) || []) == null ? void 0 : _a.filter((up) => up.role === "admin" /* Admin */).map((up) => up.user), errors = data == null ? void 0 : data.errors;
  if (userRole !== "admin" /* Admin */)
    return /* @__PURE__ */ (0, import_jsx_runtime134.jsxs)(
      DashboardLayout2,
      {
        user,
        header: /* @__PURE__ */ (0, import_jsx_runtime134.jsx)(
          Header,
          {
            tagline: /* @__PURE__ */ (0, import_jsx_runtime134.jsx)(TagLine, { icon: /* @__PURE__ */ (0, import_jsx_runtime134.jsx)(import_tb.TbFolder, {}), children: "Project" }),
            title: project.name
          }
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime134.jsx)(PageTitle, { value: "You are not allowed to add members to projects." }),
          /* @__PURE__ */ (0, import_jsx_runtime134.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime134.jsxs)("figure", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime134.jsx)(Typography, { as: "figcaption", children: "If you think this is an error, make sure to contact one of the project administrators:" }),
            /* @__PURE__ */ (0, import_jsx_runtime134.jsx)(Ul, { children: adminOfProject.map((user2) => /* @__PURE__ */ (0, import_jsx_runtime134.jsxs)(Li, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime134.jsx)(Typography, { children: user2.fullname }),
              /* @__PURE__ */ (0, import_jsx_runtime134.jsx)(ButtonCopy, { toCopy: user2.email, children: user2.email })
            ] }, user2.uuid)) })
          ] }) })
        ]
      }
    );
  let errorsToDisplay = errors || {}, hasError = Object.keys(errorsToDisplay).length > 0;
  return /* @__PURE__ */ (0, import_jsx_runtime134.jsxs)(
    DashboardLayout2,
    {
      user,
      header: /* @__PURE__ */ (0, import_jsx_runtime134.jsx)(
        Header,
        {
          tagline: /* @__PURE__ */ (0, import_jsx_runtime134.jsx)(TagLine, { icon: /* @__PURE__ */ (0, import_jsx_runtime134.jsx)(import_tb.TbFolder, {}), children: "Project" }),
          title: project.name
        }
      ),
      status: data != null && data.success ? /* @__PURE__ */ (0, import_jsx_runtime134.jsx)(SuccessBox, { id: "member-added", children: "The user has been invited invited to join the project." }) : hasError ? /* @__PURE__ */ (0, import_jsx_runtime134.jsx)(ErrorBox, { list: errorsToDisplay }) : null,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime134.jsx)(PageTitle, { value: "Add member" }),
        /* @__PURE__ */ (0, import_jsx_runtime134.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime134.jsx)(import_react91.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime134.jsxs)(FormGroup, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime134.jsx)(
            TextInput,
            {
              isInvalid: Boolean(errors == null ? void 0 : errors.email),
              name: "email",
              label: "Member email",
              placeholder: "e.g: john.doe@gmail.com"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime134.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime134.jsx)(
            SubmitButton,
            {
              isLoading: transition.state === "submitting",
              loadingText: "Adding the member, please wait...",
              children: "Add the member"
            }
          ) })
        ] }) }) })
      ]
    }
  );
}

// app/routes/dashboard/projects/$id/settings.tsx
var settings_exports3 = {};
__export(settings_exports3, {
  action: () => action30,
  default: () => SettingsPage,
  meta: () => meta30
});
var import_ai16 = require("react-icons/ai");

// app/modules/projects/services/removeMember.ts
var removeMember = (projectId, memberId, accessToken) => fetch(`${Constants.BackendUrl}/projects/${projectId}/members/${memberId}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  }
}).then((res) => res.json());

// app/modules/user/components/UserTable.tsx
var import_react98 = require("react");

// app/modules/a11y/Table/Cell.tsx
var import_jsx_runtime135 = require("react/jsx-runtime"), Cell2 = (props) => /* @__PURE__ */ (0, import_jsx_runtime135.jsx)(Td, { tabIndex: -1, ...props });

// app/modules/a11y/Table/Col.tsx
var import_jsx_runtime136 = require("react/jsx-runtime"), Col = ({ children, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime136.jsx)(Th, { tabIndex: -1, ...props, children });

// app/modules/a11y/Table/Row.tsx
var import_react94 = __toESM(require("react"));

// app/components/Checkbox.tsx
var import_react92 = require("react"), import_jsx_runtime137 = require("react/jsx-runtime"), Checkbox = (0, import_react92.forwardRef)(
  ({ checked, disabled, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime137.jsx)(
    "input",
    {
      ref,
      "aria-disabled": disabled,
      type: "checkbox",
      checked,
      className: "w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 ",
      ...props
    }
  )
);
Checkbox.displayName = "ForwardedCheckbox";

// app/modules/a11y/Table/TableContext.tsx
var import_react93 = require("react"), import_jsx_runtime138 = require("react/jsx-runtime"), TableContext = (0, import_react93.createContext)({
  onSelectAll: () => {
  },
  onSelect: () => {
  },
  selections: [],
  indeterminate: !1
}), TableProvider = ({
  children,
  onSelect,
  onSelectAll,
  selections,
  indeterminate
}) => /* @__PURE__ */ (0, import_jsx_runtime138.jsx)(
  TableContext.Provider,
  {
    value: { onSelect, selections, onSelectAll, indeterminate },
    children
  }
), useSelections = () => (0, import_react93.useContext)(TableContext);

// app/modules/a11y/Table/Row.tsx
var import_jsx_runtime139 = require("react/jsx-runtime"), Row = ({ children, selection, disabled, ...props }) => {
  let checkboxRef = (0, import_react94.useRef)(null), { onSelect, selections } = useSelections(), handleClick = (e) => {
    !checkboxRef.current || e.target === checkboxRef.current || checkboxRef.current.click();
  }, handleKeyDown = (e) => {
    switch (e.key) {
      case KeyboardKeys.SPACE: {
        if (!checkboxRef.current)
          return;
        e.preventDefault(), checkboxRef.current.click();
        break;
      }
      case KeyboardKeys.ENTER: {
        if (!checkboxRef.current || e.target === checkboxRef.current)
          return;
        e.preventDefault(), checkboxRef.current.click();
        break;
      }
    }
  }, labelledby = `col-${selection}`, childrenClone = import_react94.default.Children.toArray(children).map(
    (node, index) => import_react94.default.isValidElement(node) ? import_react94.default.cloneElement(node, {
      "aria-colindex": index + 2,
      id: index === 0 ? labelledby : void 0
    }) : null
  ), isChecked = selections.includes(selection), handleChange = () => {
    disabled || onSelect(selection);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime139.jsxs)(
    Tr,
    {
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      ...props,
      className: isChecked ? "row-selected" : void 0,
      children: [
        !disabled && /* @__PURE__ */ (0, import_jsx_runtime139.jsxs)(Td, { "aria-colindex": 1, children: [
          /* @__PURE__ */ (0, import_jsx_runtime139.jsx)(VisuallyHidden, { children: /* @__PURE__ */ (0, import_jsx_runtime139.jsx)("span", { id: `select-col-${selection}`, children: "Select" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime139.jsx)(
            Checkbox,
            {
              name: `checkbox-${selection}`,
              ref: checkboxRef,
              "aria-labelledby": `select-col-${selection} ${labelledby}`,
              tabIndex: -1,
              checked: isChecked,
              onChange: handleChange,
              value: selection
            }
          )
        ] }),
        childrenClone
      ]
    }
  );
};

// app/modules/a11y/Table/Table.tsx
var import_react95 = __toESM(require("react"));

// app/modules/misc/utils/closestFocusable.ts
var closestFocusable = (el, selector) => {
  let nextRow = el.querySelector(selector);
  return nextRow ? nextRow.getAttribute("tabindex") ? nextRow : nextRow.querySelector("[tabindex]") : null;
};

// app/modules/misc/utils/closestWithAttribute.ts
var closestWithAttribute = (el, attribute) => el.getAttribute(attribute) ? el : el.closest(`[${attribute}]`);

// app/modules/a11y/Table/utils.ts
var moveToRow = (el, root, position) => {
  let closestCol = closestWithAttribute(el, "aria-colindex"), colIndex = (closestCol == null ? void 0 : closestCol.getAttribute("aria-colindex")) || "0", closestRow = closestWithAttribute(el, "aria-rowindex"), rowIndex = (closestRow == null ? void 0 : closestRow.getAttribute("aria-rowindex")) || "0", nextRowIndex = Number.parseInt(rowIndex) + position, nextRow = root.querySelector(
    `[aria-rowindex="${nextRowIndex}"]`
  );
  return nextRow ? closestFocusable(nextRow, `[aria-colindex="${colIndex}"]`) : null;
}, moveToCol = (el, position) => {
  let closestCol = closestWithAttribute(el, "aria-colindex"), colIndex = (closestCol == null ? void 0 : closestCol.getAttribute("aria-colindex")) || "0", closestRow = closestWithAttribute(el, "aria-rowindex"), nextColIndex = Number.parseInt(colIndex) + position;
  return closestRow ? closestFocusable(
    closestRow,
    `[aria-colindex="${nextColIndex}"]`
  ) : null;
};

// app/modules/a11y/Table/Table.tsx
var import_jsx_runtime140 = require("react/jsx-runtime"), Table = ({
  children,
  onSelect,
  selected,
  caption
}) => {
  let tableRef = (0, import_react95.useRef)(null), colCount = 0, rowCount = 0;
  for (let rawNode of import_react95.default.Children.toArray(children)) {
    let node = rawNode;
    node.type.name.includes("Thead") ? colCount = import_react95.default.Children.toArray(node.props.children).length + 1 : node.type.name.includes("Tbody") && (rowCount = import_react95.default.Children.toArray(node.props.children).length + 1);
  }
  let handleKeyDown = (e) => {
    switch (e.key) {
      case KeyboardKeys.DOWN: {
        if (!tableRef.current)
          return;
        let target = e.target, nextFocusable = moveToRow(target, tableRef.current, 1);
        nextFocusable && (e.preventDefault(), target.setAttribute("tabindex", "-1"), nextFocusable.setAttribute("tabindex", "0"), nextFocusable.focus());
        break;
      }
      case KeyboardKeys.UP: {
        if (!tableRef.current)
          return;
        let target = e.target, nextFocusable = moveToRow(target, tableRef.current, -1);
        nextFocusable && (e.preventDefault(), target.setAttribute("tabindex", "-1"), nextFocusable.setAttribute("tabindex", "0"), nextFocusable.focus());
        break;
      }
      case KeyboardKeys.RIGHT: {
        let target = e.target, nextFocusable = moveToCol(target, 1);
        nextFocusable && (e.preventDefault(), target.setAttribute("tabindex", "-1"), nextFocusable.setAttribute("tabindex", "0"), nextFocusable.focus());
        break;
      }
      case KeyboardKeys.LEFT: {
        let target = e.target, nextFocusable = moveToCol(target, -1);
        nextFocusable && (e.preventDefault(), target.setAttribute("tabindex", "-1"), nextFocusable.setAttribute("tabindex", "0"), nextFocusable.focus());
        break;
      }
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime140.jsx)(
    TableProvider,
    {
      selections: selected,
      onSelect: (nextSelection) => selected.indexOf(nextSelection) > -1 ? onSelect(selected.filter((sel) => sel !== nextSelection)) : onSelect([...selected, nextSelection]),
      onSelectAll: () => {
        if (selected.length > 0)
          return onSelect([]);
        let nextSelections = [];
        for (let rawNode of import_react95.default.Children.toArray(children)) {
          let node = rawNode;
          if (node.type.name.includes("Tbody")) {
            let rows = import_react95.default.Children.toArray(node.props.children);
            for (let row of rows)
              import_react95.default.isValidElement(row) && !row.props.disabled && nextSelections.push(row.props.selection);
          }
        }
        return onSelect(nextSelections);
      },
      indeterminate: selected.length > 0 && selected.length < rowCount - 1,
      children: /* @__PURE__ */ (0, import_jsx_runtime140.jsx)(
        RawTable,
        {
          ref: tableRef,
          role: "grid",
          "aria-rowcount": rowCount,
          "aria-colcount": colCount,
          caption,
          onKeyDown: handleKeyDown,
          children
        }
      )
    }
  );
};

// app/modules/a11y/Table/Tbody.tsx
var import_react96 = __toESM(require("react")), import_jsx_runtime141 = require("react/jsx-runtime"), Tbody = ({ children, ...props }) => {
  let childrenClone = import_react96.default.Children.toArray(children).map(
    (node, index) => import_react96.default.isValidElement(node) ? import_react96.default.cloneElement(node, {
      "aria-rowindex": index + 2
    }) : null
  );
  return /* @__PURE__ */ (0, import_jsx_runtime141.jsx)("tbody", { ...props, children: childrenClone });
};

// app/modules/a11y/Table/Thead.tsx
var import_react97 = __toESM(require("react"));
var import_jsx_runtime142 = require("react/jsx-runtime"), Thead = ({ children, disabled }) => {
  let checkboxRef = (0, import_react97.useRef)(null), isHydrated = useHydrated(), { selections, onSelectAll, indeterminate } = useSelections();
  (0, import_react97.useEffect)(() => {
    !checkboxRef.current || (checkboxRef.current.indeterminate = !!indeterminate);
  }, [indeterminate]);
  let childrenClone = import_react97.default.Children.toArray(children).map(
    (node, index) => import_react97.default.isValidElement(node) ? import_react97.default.cloneElement(node, {
      "aria-colindex": index + 2
    }) : null
  );
  return /* @__PURE__ */ (0, import_jsx_runtime142.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime142.jsxs)(Tr, { "aria-rowindex": 1, children: [
    !disabled && /* @__PURE__ */ (0, import_jsx_runtime142.jsxs)(Th, { "aria-colindex": 1, children: [
      /* @__PURE__ */ (0, import_jsx_runtime142.jsx)(VisuallyHidden, { children: /* @__PURE__ */ (0, import_jsx_runtime142.jsxs)("span", { id: "select-all", children: [
        "Select ",
        isHydrated ? "all" : "an element"
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime142.jsx)(
        Checkbox,
        {
          ref: checkboxRef,
          checked: selections.length > 0,
          "aria-labelledby": "select-all",
          tabIndex: 0,
          onChange: onSelectAll,
          value: "select-all",
          name: "select-all"
        }
      )
    ] }),
    childrenClone
  ] }) });
};

// app/modules/user/components/UserTable.tsx
var import_jsx_runtime143 = require("react/jsx-runtime"), UserTable = ({ userProjects, canEdit }) => {
  let [selected, setSelected] = (0, import_react98.useState)([]);
  return /* @__PURE__ */ (0, import_jsx_runtime143.jsxs)(
    Table,
    {
      caption: "Members of the project",
      onSelect: setSelected,
      selected,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime143.jsxs)(Thead, { disabled: !canEdit, children: [
          /* @__PURE__ */ (0, import_jsx_runtime143.jsx)(Col, { children: "Full name" }),
          /* @__PURE__ */ (0, import_jsx_runtime143.jsx)(Col, { children: "Email" }),
          /* @__PURE__ */ (0, import_jsx_runtime143.jsx)(Col, { children: "Role" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime143.jsx)(Tbody, { children: userProjects.map((userProject) => {
          var _a, _b, _c;
          return /* @__PURE__ */ (0, import_jsx_runtime143.jsxs)(
            Row,
            {
              selection: userProject.userId,
              disabled: !canEdit,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime143.jsx)(Cell2, { children: /* @__PURE__ */ (0, import_jsx_runtime143.jsx)(Typography, { as: "span", children: (_a = userProject.user) == null ? void 0 : _a.fullname }) }),
                /* @__PURE__ */ (0, import_jsx_runtime143.jsx)(Cell2, { children: /* @__PURE__ */ (0, import_jsx_runtime143.jsx)(ButtonCopy, { toCopy: ((_b = userProject.user) == null ? void 0 : _b.email) || "", children: (_c = userProject.user) == null ? void 0 : _c.email }) }),
                /* @__PURE__ */ (0, import_jsx_runtime143.jsx)(Cell2, { children: /* @__PURE__ */ (0, import_jsx_runtime143.jsx)(Tag, { children: userProject.role }) })
              ]
            },
            userProject.userId
          );
        }) })
      ]
    }
  );
};

// app/routes/dashboard/projects/$id/settings.tsx
var import_react99 = require("@remix-run/react");
var import_jsx_runtime144 = require("react/jsx-runtime"), meta30 = ({ parentsData }) => ({
  title: `Progressively | ${getProjectMetaTitle(parentsData)} | Settings`
}), action30 = async ({
  request,
  params
}) => {
  let session = await getSession(request.headers.get("Cookie")), formData = await request.formData(), promiseOfMembersToRemove = [];
  for (let d of formData.values())
    d !== "delete-member" && d !== "select-all" && promiseOfMembersToRemove.push(
      removeMember(params.id, d.toString(), session.get("auth-cookie"))
    );
  let result = await Promise.all(promiseOfMembersToRemove), successful = result.filter((res) => (res == null ? void 0 : res.statusCode) !== 401);
  return {
    errors: {
      unauthorized: successful.length === result.length ? void 0 : "You have attempted to remove an admin user! No worries, we got your back!"
    },
    success: successful.length > 0,
    removedCount: successful.length
  };
};
function SettingsPage() {
  let { user } = useUser(), { project, userRole } = useProject(), data = (0, import_react99.useActionData)(), transition = (0, import_react99.useTransition)();
  return /* @__PURE__ */ (0, import_jsx_runtime144.jsxs)(
    DashboardLayout2,
    {
      user,
      header: /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(
        Header,
        {
          tagline: /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(TagLine, { icon: /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(import_tb.TbFolder, {}), children: "Project" }),
          title: /* @__PURE__ */ (0, import_jsx_runtime144.jsx)("span", { children: project.name })
        }
      ),
      subNav: /* @__PURE__ */ (0, import_jsx_runtime144.jsxs)(HorizontalNav, { label: "Project related", children: [
        /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(
          NavItem,
          {
            to: `/dashboard/projects/${project.uuid}`,
            icon: /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(import_fi2.FiLayers, {}),
            children: "Environments"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(
          NavItem,
          {
            to: `/dashboard/projects/${project.uuid}/settings`,
            icon: /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(import_ai16.AiOutlineSetting, {}),
            children: "Settings"
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(PageTitle, { value: "Settings", icon: /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(import_ai16.AiOutlineSetting, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime144.jsxs)(Stack, { spacing: 8, children: [
          /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(Section, { id: "members", children: /* @__PURE__ */ (0, import_jsx_runtime144.jsxs)(import_react99.Form, { method: "post", children: [
            /* @__PURE__ */ (0, import_jsx_runtime144.jsxs)(CardContent, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(
                SectionHeader,
                {
                  title: "Project members",
                  action: userRole === "admin" /* Admin */ && /* @__PURE__ */ (0, import_jsx_runtime144.jsxs)("div", { className: "flex flex-col md:flex-row gap-3", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(
                      CreateButton,
                      {
                        variant: "secondary",
                        to: `/dashboard/projects/${project.uuid}/add-member`,
                        children: "Add member"
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(
                      DeleteButton,
                      {
                        variant: "secondary",
                        type: "submit",
                        isLoading: transition.state === "submitting",
                        loadingText: "Deleting the member(s), please wait...",
                        children: "Remove from project"
                      }
                    )
                  ] })
                }
              ),
              (data == null ? void 0 : data.errors.unauthorized) && /* @__PURE__ */ (0, import_jsx_runtime144.jsxs)(import_jsx_runtime144.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(Spacer, { size: 4 }),
                /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(ErrorBox, { list: data.errors })
              ] }),
              (data == null ? void 0 : data.success) && /* @__PURE__ */ (0, import_jsx_runtime144.jsxs)(import_jsx_runtime144.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(Spacer, { size: 4 }),
                /* @__PURE__ */ (0, import_jsx_runtime144.jsxs)(SuccessBox, { id: "member-deleted", children: [
                  data == null ? void 0 : data.removedCount,
                  " user have been successfully removed from the project."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(
              UserTable,
              {
                userProjects: project.userProject || [],
                canEdit: userRole === "admin" /* Admin */
              }
            )
          ] }) }) }),
          userRole === "admin" /* Admin */ && /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime144.jsxs)(Section, { id: "danger", children: [
            /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(
              SectionHeader,
              {
                title: "Danger zone",
                description: "You can delete a project at any time, but you won't be able to access its environments and all the related flags will be removed and be falsy in your applications. Be sure to know what you're doing before removing a project."
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime144.jsx)(Spacer, { size: 4 }),
            /* @__PURE__ */ (0, import_jsx_runtime144.jsx)("div", { className: "inline-block", children: /* @__PURE__ */ (0, import_jsx_runtime144.jsxs)(
              DeleteButton,
              {
                variant: "secondary",
                to: `/dashboard/projects/${project.uuid}/delete`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime144.jsxs)("span", { "aria-hidden": !0, children: [
                    "Delete",
                    " ",
                    /* @__PURE__ */ (0, import_jsx_runtime144.jsxs)("span", { className: "hidden md:inline", children: [
                      `"${project.name}"`,
                      " forever"
                    ] })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime144.jsxs)(VisuallyHidden, { children: [
                    "Delete ",
                    `"${project.name}"`,
                    " forever"
                  ] })
                ]
              }
            ) })
          ] }) }) })
        ] })
      ]
    }
  );
}

// app/routes/dashboard/projects/$id/delete.tsx
var delete_exports8 = {};
__export(delete_exports8, {
  action: () => action31,
  default: () => DeleteProjectPage,
  meta: () => meta31
});

// app/modules/projects/services/deleteProject.ts
var deleteProject = (projectId, accessToken) => fetch(`${Constants.BackendUrl}/projects/${projectId}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  }
}).then((res) => {
  if (!res.ok)
    throw new Error("You are not authorized to remove this project.");
  return res.json();
});

// app/routes/dashboard/projects/$id/delete.tsx
var import_node21 = require("@remix-run/node"), import_react100 = require("@remix-run/react");
var import_jsx_runtime145 = require("react/jsx-runtime"), meta31 = ({ parentsData }) => ({
  title: `Progressively | ${getProjectMetaTitle(parentsData)} | Delete`
}), action31 = async ({
  request,
  params
}) => {
  let session = await getSession(request.headers.get("Cookie"));
  try {
    await deleteProject(params.id, session.get("auth-cookie"));
  } catch (error) {
    return error instanceof Error ? {
      errors: {
        backendError: error.message
      }
    } : { errors: { backendError: "An error ocurred" } };
  }
  return (0, import_node21.redirect)("/dashboard?projectRemoved=true#project-removed");
};
function DeleteProjectPage() {
  let transition = (0, import_react100.useTransition)(), { project } = useProject(), data = (0, import_react100.useActionData)();
  return /* @__PURE__ */ (0, import_jsx_runtime145.jsx)(
    DeleteEntityLayout,
    {
      error: (data == null ? void 0 : data.errors) && data.errors.backendError && /* @__PURE__ */ (0, import_jsx_runtime145.jsx)(ErrorBox, { list: data.errors }),
      titleSlot: /* @__PURE__ */ (0, import_jsx_runtime145.jsxs)(DeleteEntityTitle, { children: [
        "Are you sure you want to delete",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime145.jsx)("span", { className: "text-red-700 dark:text-red-400 font-semibold", children: project.name }),
        "?"
      ] }),
      cancelAction: /* @__PURE__ */ (0, import_jsx_runtime145.jsx)(
        Button,
        {
          to: `/dashboard/projects/${project.uuid}/settings`,
          variant: "tertiary",
          scheme: "danger",
          children: "Cancel"
        }
      ),
      confirmAction: /* @__PURE__ */ (0, import_jsx_runtime145.jsx)(import_react100.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime145.jsx)(
        DeleteButton,
        {
          type: "submit",
          isLoading: transition.state === "submitting",
          loadingText: "Deleting the project, please wait...",
          children: "Yes, delete the project"
        }
      ) }),
      backLinkSlot: /* @__PURE__ */ (0, import_jsx_runtime145.jsx)(BackLink, { to: "/dashboard", children: "Back to projects" }),
      children: /* @__PURE__ */ (0, import_jsx_runtime145.jsxs)(Stack, { spacing: 4, children: [
        /* @__PURE__ */ (0, import_jsx_runtime145.jsxs)(Typography, { children: [
          "All the ",
          /* @__PURE__ */ (0, import_jsx_runtime145.jsx)("strong", { children: "environments" }),
          " of the project, and all the associated ",
          /* @__PURE__ */ (0, import_jsx_runtime145.jsx)("strong", { children: "feature flags" }),
          " will be removed."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime145.jsxs)(Typography, { children: [
          "You won't have access to the ",
          /* @__PURE__ */ (0, import_jsx_runtime145.jsx)("strong", { children: "flags analytics" }),
          " anymore."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime145.jsx)(Typography, { children: "There will be no way to get the data back." })
      ] })
    }
  );
}

// app/routes/dashboard/projects/$id/index.tsx
var id_exports2 = {};
__export(id_exports2, {
  default: () => ProjectDetailPage,
  meta: () => meta32
});
var import_ai17 = require("react-icons/ai");
var import_react102 = require("@remix-run/react");

// app/modules/environments/components/EnvList.tsx
var import_react101 = require("react");
var import_jsx_runtime146 = require("react/jsx-runtime"), EnvRow = ({ env, projectId }) => {
  let linkRef = (0, import_react101.useRef)(null);
  return /* @__PURE__ */ (0, import_jsx_runtime146.jsxs)(Tr, { onClick: () => {
    var _a;
    return (_a = linkRef.current) == null ? void 0 : _a.click();
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime146.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime146.jsx)(
      Link4,
      {
        ref: linkRef,
        to: `/dashboard/projects/${projectId}/environments/${env.uuid}`,
        children: env.name
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime146.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime146.jsx)(ButtonCopy, { toCopy: env.clientKey, children: env.clientKey }) })
  ] });
}, EnvList = ({ environments, projectId }) => /* @__PURE__ */ (0, import_jsx_runtime146.jsxs)(RawTable, { caption: "Environments available for the project", children: [
  /* @__PURE__ */ (0, import_jsx_runtime146.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime146.jsxs)(Tr, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime146.jsx)(Th, { children: "Name" }),
    /* @__PURE__ */ (0, import_jsx_runtime146.jsx)(Th, { children: "Client key" })
  ] }) }),
  /* @__PURE__ */ (0, import_jsx_runtime146.jsx)("tbody", { children: environments.map((env) => /* @__PURE__ */ (0, import_jsx_runtime146.jsx)(EnvRow, { env, projectId }, env.uuid)) })
] });

// app/routes/dashboard/projects/$id/index.tsx
var import_jsx_runtime147 = require("react/jsx-runtime"), meta32 = ({ parentsData }) => ({
  title: `Progressively | ${getProjectMetaTitle(parentsData)}`
});
function ProjectDetailPage() {
  let { user } = useUser(), { project } = useProject(), [searchParams] = (0, import_react102.useSearchParams)(), search = searchParams.get("search"), newEnvId = searchParams.get("newEnvId") || void 0, envRemoved = searchParams.get("envRemoved") || void 0, isSearching = Boolean(searchParams.get("search") || void 0), hasEnvironments = project.environments.length > 0, filteredEnvironments = project.environments.filter(
    (env) => env.name.toLowerCase().includes(search || "")
  );
  return /* @__PURE__ */ (0, import_jsx_runtime147.jsxs)(
    DashboardLayout2,
    {
      user,
      header: /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(
        Header,
        {
          tagline: /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(TagLine, { icon: /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(import_tb.TbFolder, {}), children: "Project" }),
          title: project.name
        }
      ),
      subNav: /* @__PURE__ */ (0, import_jsx_runtime147.jsxs)(HorizontalNav, { label: "Project related", children: [
        /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(
          NavItem,
          {
            to: `/dashboard/projects/${project.uuid}`,
            icon: /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(import_fi2.FiLayers, {}),
            children: "Environments"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(
          NavItem,
          {
            to: `/dashboard/projects/${project.uuid}/settings`,
            icon: /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(import_ai17.AiOutlineSetting, {}),
            children: "Settings"
          }
        )
      ] }),
      status: newEnvId ? /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(SuccessBox, { id: "env-added", children: "The environment has been successfully created." }) : envRemoved ? /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(SuccessBox, { id: "env-removed", children: "The environment has been successfully deleted." }) : null,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(PageTitle, { value: "Environments", icon: /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(import_fi2.FiLayers, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(Section, { "aria-label": "List of environments", children: hasEnvironments ? /* @__PURE__ */ (0, import_jsx_runtime147.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(
            SearchLayout,
            {
              actions: /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(
                CreateButton,
                {
                  to: `/dashboard/projects/${project.uuid}/environments/create`,
                  children: "Create an environment"
                }
              ),
              children: /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(
                SearchBar,
                {
                  label: "Search for environments",
                  placeholder: "e.g: The environment",
                  count: isSearching ? filteredEnvironments.length : void 0
                }
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(Spacer, { size: 4 }),
          /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(
            EnvList,
            {
              environments: filteredEnvironments,
              projectId: project.uuid
            }
          ) })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(
          EmptyState,
          {
            title: "No environments found",
            description: "There are no environments yet on this project.",
            action: /* @__PURE__ */ (0, import_jsx_runtime147.jsx)(
              CreateButton,
              {
                to: `/dashboard/projects/${project.uuid}/environments/create`,
                children: "Create an environment"
              }
            )
          }
        ) }) }) })
      ]
    }
  );
}

// app/routes/dashboard/onboarding.tsx
var onboarding_exports = {};
__export(onboarding_exports, {
  action: () => action32,
  default: () => OnboardingPage,
  meta: () => meta33
});
var import_node22 = require("@remix-run/node"), import_react103 = require("@remix-run/react");

// app/components/Boxes/TipBox.tsx
var import_md6 = require("react-icons/md");
var import_jsx_runtime148 = require("react/jsx-runtime"), TipBox = ({ children, title, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime148.jsx)(
  "div",
  {
    className: "success-box p-4 bg-blue-50 text-blue-600 rounded border-l-8 border-l-blue-500",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime148.jsxs)("div", { className: "flex flex-row gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime148.jsx)(import_md6.MdOutlineTipsAndUpdates, { "aria-hidden": !0, className: "-mt-1 h-8 w-8" }),
      /* @__PURE__ */ (0, import_jsx_runtime148.jsxs)("div", { children: [
        title,
        /* @__PURE__ */ (0, import_jsx_runtime148.jsx)(Spacer, { size: 2 }),
        children
      ] })
    ] })
  }
);

// app/routes/dashboard/onboarding.tsx
var import_jsx_runtime149 = require("react/jsx-runtime"), meta33 = () => ({
  title: "Progressively | Onboarding"
}), action32 = async ({
  request
}) => {
  var _a;
  let projectName = (_a = (await request.formData()).get("name")) == null ? void 0 : _a.toString(), errors = validateProjectName({ name: projectName });
  if (errors != null && errors.name)
    return { errors };
  let session = await getSession(request.headers.get("Cookie")), project = await createProject(
    projectName,
    session.get("auth-cookie")
  );
  return (0, import_node22.redirect)(`/dashboard?newProjectId=${project.uuid}#project-added`);
};
function OnboardingPage() {
  let data = (0, import_react103.useActionData)(), { user } = useUser(), errors = data == null ? void 0 : data.errors;
  return /* @__PURE__ */ (0, import_jsx_runtime149.jsxs)(NotAuthenticatedLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime149.jsx)("div", { className: "mt-8 md:mt-36", children: /* @__PURE__ */ (0, import_jsx_runtime149.jsxs)(Stack, { spacing: 4, children: [
      /* @__PURE__ */ (0, import_jsx_runtime149.jsxs)("div", { className: "text-center motion-safe:animate-fade-enter-top", children: [
        /* @__PURE__ */ (0, import_jsx_runtime149.jsxs)("h1", { className: "font-bold text-4xl md:text-5xl", id: "page-title", children: [
          /* @__PURE__ */ (0, import_jsx_runtime149.jsx)("span", { className: "dark:text-slate-100", children: "Welcome aboard" }),
          /* @__PURE__ */ (0, import_jsx_runtime149.jsx)(Spacer, { size: 2 }),
          /* @__PURE__ */ (0, import_jsx_runtime149.jsx)("span", { className: "text-indigo-700 dark:text-indigo-400", children: user.fullname })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime149.jsx)(Spacer, { size: 2 }),
        /* @__PURE__ */ (0, import_jsx_runtime149.jsxs)(Typography, { children: [
          "Before being fully operational, you will need to create",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime149.jsx)("strong", { children: "a project" }),
          ". In general, a project is the name of your application."
        ] })
      ] }),
      (errors == null ? void 0 : errors.name) && /* @__PURE__ */ (0, import_jsx_runtime149.jsx)(ErrorBox, { list: errors }),
      /* @__PURE__ */ (0, import_jsx_runtime149.jsx)(
        "div",
        {
          className: "motion-safe:animate-fade-enter-bottom motion-safe:opacity-0",
          style: {
            animationDelay: "500ms"
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime149.jsx)(import_react103.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime149.jsxs)("div", { className: "flex flex-col md:flex-row gap-4 items-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime149.jsx)(import_tb.TbFolder, { className: "text-indigo-600" }),
            /* @__PURE__ */ (0, import_jsx_runtime149.jsx)("div", { className: "flex-1", children: /* @__PURE__ */ (0, import_jsx_runtime149.jsx)(
              TextInput,
              {
                isInvalid: Boolean(errors == null ? void 0 : errors.name),
                label: "Project name",
                name: "name",
                placeholder: "e.g: My super project",
                hiddenLabel: !0
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime149.jsx)(SubmitButton, { children: "Create the project" })
          ] }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime149.jsx)(Spacer, { size: 2 }),
    /* @__PURE__ */ (0, import_jsx_runtime149.jsx)(
      "div",
      {
        className: "motion-safe:animate-fade-enter-bottom motion-safe:opacity-0",
        style: {
          animationDelay: "800ms"
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime149.jsxs)(
          TipBox,
          {
            title: /* @__PURE__ */ (0, import_jsx_runtime149.jsx)(Typography, { className: "font-bold text-inherit dark:text-inherit", children: "The welcome tips" }),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime149.jsx)(Typography, { className: "text-inherit dark:text-inherit", children: "Progressively is built with 3 main entities:" }),
              /* @__PURE__ */ (0, import_jsx_runtime149.jsxs)(Ul, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime149.jsx)(Li, { children: /* @__PURE__ */ (0, import_jsx_runtime149.jsxs)(HStack, { spacing: 2, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime149.jsx)(import_tb.TbFolder, {}),
                  /* @__PURE__ */ (0, import_jsx_runtime149.jsx)("span", { children: "Projects" })
                ] }) }),
                /* @__PURE__ */ (0, import_jsx_runtime149.jsx)(Li, { children: /* @__PURE__ */ (0, import_jsx_runtime149.jsxs)(HStack, { spacing: 2, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime149.jsx)(import_fi2.FiLayers, {}),
                  /* @__PURE__ */ (0, import_jsx_runtime149.jsx)("span", { children: "Environments" })
                ] }) }),
                /* @__PURE__ */ (0, import_jsx_runtime149.jsx)(Li, { children: /* @__PURE__ */ (0, import_jsx_runtime149.jsxs)(HStack, { spacing: 2, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime149.jsx)(FlagIcon, {}),
                  /* @__PURE__ */ (0, import_jsx_runtime149.jsx)("span", { children: "Feature flags" })
                ] }) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime149.jsx)(Spacer, { size: 2 }),
              /* @__PURE__ */ (0, import_jsx_runtime149.jsxs)(Typography, { className: "text-inherit dark:text-inherit", children: [
                "You can recognize them in the application with their icons. You can learn more on",
                " ",
                /* @__PURE__ */ (0, import_jsx_runtime149.jsx)(
                  "a",
                  {
                    href: "https://progressively.app/docs/features/hierarchical-structure",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "underline",
                    children: "the associated documentation page"
                  }
                ),
                "."
              ] })
            ]
          }
        )
      }
    )
  ] });
}

// app/routes/dashboard/index.tsx
var dashboard_exports2 = {};
__export(dashboard_exports2, {
  default: () => DashboardRoot,
  loader: () => loader15,
  meta: () => meta34
});
var import_node23 = require("@remix-run/node"), import_react105 = require("@remix-run/react");

// app/modules/projects/components/ProjectList.tsx
var import_react104 = require("react");
var import_jsx_runtime150 = require("react/jsx-runtime"), ProjectRow = ({ userProject }) => {
  let linkRef = (0, import_react104.useRef)(null);
  return /* @__PURE__ */ (0, import_jsx_runtime150.jsxs)(Tr, { onClick: () => {
    var _a;
    return (_a = linkRef.current) == null ? void 0 : _a.click();
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime150.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime150.jsx)(Link4, { ref: linkRef, to: `/dashboard/projects/${userProject.projectId}`, children: userProject.project.name }) }),
    /* @__PURE__ */ (0, import_jsx_runtime150.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime150.jsx)(Tag, { children: userProject.role }) })
  ] });
}, ProjectList = ({ projects }) => /* @__PURE__ */ (0, import_jsx_runtime150.jsxs)(RawTable, { caption: "Projects you are part of", children: [
  /* @__PURE__ */ (0, import_jsx_runtime150.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime150.jsxs)(Tr, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime150.jsx)(Th, { children: "Name" }),
    /* @__PURE__ */ (0, import_jsx_runtime150.jsx)(Th, { children: "Role" })
  ] }) }),
  /* @__PURE__ */ (0, import_jsx_runtime150.jsx)("tbody", { children: projects.map((userProject) => /* @__PURE__ */ (0, import_jsx_runtime150.jsx)(ProjectRow, { userProject }, userProject.projectId)) })
] });

// app/routes/dashboard/index.tsx
var import_tb9 = require("react-icons/tb");
var import_jsx_runtime151 = require("react/jsx-runtime"), meta34 = () => ({
  title: "Progressively | Projects list"
}), loader15 = async ({
  request
}) => {
  let authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie"), projects = await getProjects(authCookie);
  if (projects.length === 0)
    return (0, import_node23.redirect)("/dashboard/onboarding");
  let search = new URL(request.url).searchParams.get("search");
  return { projects: projects.filter(
    (project) => project.project.name.toLowerCase().includes(search || "")
  ) };
};
function DashboardRoot() {
  let [searchParams] = (0, import_react105.useSearchParams)(), { projects } = (0, import_react105.useLoaderData)(), { user } = useUser(), newProjectId = searchParams.get("newProjectId") || void 0, hasRemovedProject = searchParams.get("projectRemoved") || void 0, isSearching = Boolean(searchParams.get("search") || void 0);
  return /* @__PURE__ */ (0, import_jsx_runtime151.jsxs)(
    DashboardLayout2,
    {
      user,
      status: newProjectId ? /* @__PURE__ */ (0, import_jsx_runtime151.jsx)(SuccessBox, { id: "project-added", children: "The project has been successfully created." }) : hasRemovedProject ? /* @__PURE__ */ (0, import_jsx_runtime151.jsx)(SuccessBox, { id: "project-removed", children: "The project has been successfully removed." }) : null,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime151.jsx)(PageTitle, { icon: /* @__PURE__ */ (0, import_jsx_runtime151.jsx)(import_tb9.TbFolders, {}), value: "Projects" }),
        /* @__PURE__ */ (0, import_jsx_runtime151.jsx)(
          SearchLayout,
          {
            actions: /* @__PURE__ */ (0, import_jsx_runtime151.jsx)(CreateButton, { to: "/dashboard/projects/create", children: "Create a project" }),
            children: /* @__PURE__ */ (0, import_jsx_runtime151.jsx)(
              SearchBar,
              {
                label: "Search for projects",
                placeholder: "e.g: The project",
                count: isSearching ? projects.length : void 0
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime151.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime151.jsx)(ProjectList, { projects }) })
      ]
    }
  );
}

// app/routes/register.tsx
var register_exports = {};
__export(register_exports, {
  action: () => action33,
  default: () => CreateAccountPage,
  loader: () => loader16,
  meta: () => meta35
});

// app/modules/user/components/RegisterForm.tsx
var import_react106 = require("@remix-run/react");

// app/modules/user/services/createUser.ts
var createUser = (fullname, email, password) => fetch(`${Constants.BackendUrl}/auth/register`, {
  method: "POST",
  body: JSON.stringify({ fullname, email, password }),
  headers: { "Content-Type": "application/json" }
}).then((res) => {
  if (!res.ok)
    throw res.status === 400 ? new Error("This email is already used.") : new Error("Woops! Something went wrong in the server.");
  return res.json();
});

// app/modules/user/validators/validate-registration-form.ts
var validateRegistrationForm = (values) => {
  let errors = {}, emailError = validateEmail(values.email), passwordError = validatePassword(values.password);
  return values.fullname || (errors.fullname = "The fullname field is required."), emailError && (errors.email = emailError), passwordError && (errors.password = passwordError), values.confirmPassword ? values.password && values.password !== values.confirmPassword && (errors.confirmPassword = "The two passwords are not the same.") : errors.confirmPassword = "The confirm password field is required.", errors;
};

// app/modules/user/components/RegisterForm.tsx
var import_jsx_runtime152 = require("react/jsx-runtime"), registerAction = async ({
  request
}) => {
  var _a, _b, _c, _d;
  let formData = await request.formData(), fullname = (_a = formData.get("fullname")) == null ? void 0 : _a.toString(), email = (_b = formData.get("email")) == null ? void 0 : _b.toString(), password = (_c = formData.get("password")) == null ? void 0 : _c.toString(), confirmPassword = (_d = formData.get("confirmPassword")) == null ? void 0 : _d.toString(), errors = validateRegistrationForm({
    email,
    password,
    fullname,
    confirmPassword
  });
  if ((errors == null ? void 0 : errors.fullname) || (errors == null ? void 0 : errors.email) || (errors == null ? void 0 : errors.password) || (errors == null ? void 0 : errors.confirmPassword))
    return { errors };
  try {
    return { newUser: await createUser(fullname, email, password) };
  } catch (error) {
    return error instanceof Error ? {
      errors: {
        backend: error.message
      }
    } : { errors: { backend: "An error ocurred" } };
  }
}, RegisterForm = ({ errors, actionLabel }) => {
  let transition = (0, import_react106.useTransition)();
  return /* @__PURE__ */ (0, import_jsx_runtime152.jsx)(import_react106.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime152.jsxs)(FormGroup, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime152.jsx)(
      TextInput,
      {
        isInvalid: Boolean(errors == null ? void 0 : errors.fullname),
        label: "Fullname",
        name: "fullname",
        placeholder: "e.g: James Bond"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime152.jsx)(
      TextInput,
      {
        isInvalid: Boolean(errors == null ? void 0 : errors.email),
        label: "Email",
        name: "email",
        placeholder: "e.g: james.bond@mi6.com"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime152.jsx)(
      TextInput,
      {
        isInvalid: Boolean(errors == null ? void 0 : errors.password),
        label: "Password",
        name: "password",
        type: "password",
        placeholder: "************"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime152.jsx)(
      TextInput,
      {
        isInvalid: Boolean(errors == null ? void 0 : errors.confirmPassword),
        label: "Confirm your password",
        name: "confirmPassword",
        type: "password",
        placeholder: "************"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime152.jsx)(
      SubmitButton,
      {
        className: "w-full justify-center",
        isLoading: transition.state === "submitting",
        loadingText: "Creation in progress, please wait...",
        children: actionLabel || "Sign up"
      }
    )
  ] }) });
};

// app/routes/register.tsx
var import_node24 = require("@remix-run/node"), import_react107 = require("@remix-run/react");
var import_jsx_runtime153 = require("react/jsx-runtime"), meta35 = () => ({
  title: "Progressively| Sign up"
}), action33 = ({
  request
}) => registerAction({ request }), loader16 = () => process.env.ALLOW_REGISTRATION === "true" ? null : (0, import_node24.redirect)("/signin");
function CreateAccountPage() {
  let data = (0, import_react107.useActionData)(), newUser = data == null ? void 0 : data.newUser, errors = data == null ? void 0 : data.errors;
  return /* @__PURE__ */ (0, import_jsx_runtime153.jsx)(
    NotAuthenticatedLayout,
    {
      size: "S",
      nav: /* @__PURE__ */ (0, import_jsx_runtime153.jsx)(BackLink, { to: "/signin", children: "Back to signin" }),
      status: errors && Object.keys(errors).length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime153.jsx)(ErrorBox, { list: errors }) : newUser != null && newUser.uuid ? /* @__PURE__ */ (0, import_jsx_runtime153.jsx)(SuccessBox, { id: "user-created", children: "The user has been created! Take a look at your inbox, there should be a link to activate it :)." }) : null,
      children: /* @__PURE__ */ (0, import_jsx_runtime153.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime153.jsxs)(CardContent, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime153.jsx)(H1Logo, { children: "Sign up" }),
        /* @__PURE__ */ (0, import_jsx_runtime153.jsx)(Spacer, { size: 16 }),
        /* @__PURE__ */ (0, import_jsx_runtime153.jsx)(RegisterForm, { errors })
      ] }) })
    }
  );
}

// app/routes/profile.tsx
var profile_exports = {};
__export(profile_exports, {
  action: () => action34,
  default: () => ProfilePage,
  handle: () => handle7,
  loader: () => loader17,
  meta: () => meta36
});
var import_react108 = require("@remix-run/react");

// app/modules/user/services/changePassword.ts
var changePassword = (password, confirmationPassword, accessToken) => fetch(`${Constants.BackendUrl}/users/change-password`, {
  method: "POST",
  body: JSON.stringify({ password, confirmationPassword }),
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  }
}).then((res) => {
  if (!res.ok)
    throw res.status === 400 ? new Error("An information is missing") : new Error("Woops! Something went wrong in the server.");
  return res.json();
});

// app/components/Icons/UserIcon.tsx
var import_tb10 = require("react-icons/tb"), import_jsx_runtime154 = require("react/jsx-runtime"), UserIcon = () => /* @__PURE__ */ (0, import_jsx_runtime154.jsx)(import_tb10.TbUser, {});

// app/modules/user/components/UserMenu.tsx
var import_fa3 = require("react-icons/fa");
var import_jsx_runtime155 = require("react/jsx-runtime"), UserMenu = () => /* @__PURE__ */ (0, import_jsx_runtime155.jsxs)(HorizontalNav, { label: "Flag related", children: [
  /* @__PURE__ */ (0, import_jsx_runtime155.jsx)(NavItem, { to: "#password", icon: /* @__PURE__ */ (0, import_jsx_runtime155.jsx)(import_fa3.FaToggleOff, {}), children: "Password" }),
  /* @__PURE__ */ (0, import_jsx_runtime155.jsx)(NavItem, { to: "#logout", icon: /* @__PURE__ */ (0, import_jsx_runtime155.jsx)(import_ai6.AiOutlineAppstore, {}), children: "Logout" })
] });

// app/routes/profile.tsx
var import_jsx_runtime156 = require("react/jsx-runtime"), handle7 = {
  breadcrumb: () => ({
    link: "/dashboard",
    label: "Projects",
    isRoot: !0,
    forceNotCurrent: !0
  })
}, meta36 = () => ({
  title: "Progressively | Profile"
}), action34 = async ({
  request
}) => {
  var _a, _b;
  let formData = await request.formData(), password = (_a = formData.get("password")) == null ? void 0 : _a.toString(), confirmationPassword = (_b = formData.get("confirmationPassword")) == null ? void 0 : _b.toString(), passwordError = validatePassword(password), confirmationPasswordError = validateConfirmationPassword(confirmationPassword);
  if (passwordError || confirmationPasswordError)
    return {
      errors: {
        password: passwordError,
        confirmationPassword: confirmationPasswordError
      }
    };
  if (password !== confirmationPassword)
    return {
      errors: {
        password: "The two passwords are not the same."
      }
    };
  let authCookie = (await getSession(request.headers.get("Cookie"))).get("auth-cookie");
  return await changePassword(password, confirmationPassword, authCookie), { passwordUpdated: !0 };
}, loader17 = async ({
  request
}) => ({ user: await authGuard(request) });
function ProfilePage() {
  let transition = (0, import_react108.useTransition)(), data = (0, import_react108.useActionData)(), { user } = (0, import_react108.useLoaderData)(), passwordUpdated = data == null ? void 0 : data.passwordUpdated, errors = data == null ? void 0 : data.errors;
  return /* @__PURE__ */ (0, import_jsx_runtime156.jsxs)(
    DashboardLayout2,
    {
      user,
      subNav: /* @__PURE__ */ (0, import_jsx_runtime156.jsx)(UserMenu, {}),
      status: errors && Object.keys(errors).length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime156.jsx)(ErrorBox, { list: errors }) : passwordUpdated ? /* @__PURE__ */ (0, import_jsx_runtime156.jsx)(SuccessBox, { id: "password-changed", children: "The password has been successfully changed." }) : null,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime156.jsx)(PageTitle, { value: "My profile", icon: /* @__PURE__ */ (0, import_jsx_runtime156.jsx)(UserIcon, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime156.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime156.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime156.jsxs)(CardContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime156.jsx)(SectionHeader, { title: "Change password", name: "password" }),
          /* @__PURE__ */ (0, import_jsx_runtime156.jsx)(import_react108.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime156.jsxs)(FormGroup, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime156.jsx)(
              TextInput,
              {
                label: "New password",
                name: "password",
                isInvalid: Boolean(errors == null ? void 0 : errors.password),
                placeholder: "**********",
                type: "password"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime156.jsx)(
              TextInput,
              {
                label: "Confirmation password",
                name: "confirmationPassword",
                isInvalid: Boolean(errors == null ? void 0 : errors.confirmationPassword),
                placeholder: "**********",
                type: "password"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime156.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime156.jsx)(
              SubmitButton,
              {
                variant: "secondary",
                isLoading: transition.state === "submitting",
                loadingText: "Password changing in progress, please wait...",
                children: "Change password"
              }
            ) })
          ] }) })
        ] }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime156.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime156.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime156.jsxs)(CardContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime156.jsx)(
            SectionHeader,
            {
              title: "Logout",
              name: "logout",
              description: /* @__PURE__ */ (0, import_jsx_runtime156.jsx)(Typography, { children: "Click the following link to disconnect from the application and to get back to the sign in page." })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime156.jsx)(Spacer, { size: 4 }),
          /* @__PURE__ */ (0, import_jsx_runtime156.jsx)("div", { className: "inline-block", children: /* @__PURE__ */ (0, import_jsx_runtime156.jsx)(Button, { variant: "secondary", to: "/logout", children: "Logout" }) })
        ] }) }) })
      ]
    }
  );
}

// app/routes/signout.tsx
var signout_exports = {};
__export(signout_exports, {
  default: () => SignoutPage,
  loader: () => loader18
});
var import_node25 = require("@remix-run/node");
var loader18 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));
  return (0, import_node25.redirect)("/signin", {
    headers: {
      "Set-Cookie": await destroySession(session)
    }
  });
};
function SignoutPage() {
  return null;
}

// app/routes/welcome.tsx
var welcome_exports = {};
__export(welcome_exports, {
  action: () => action35,
  default: () => WelcomePage,
  meta: () => meta37
});
var import_node26 = require("@remix-run/node"), import_react109 = require("@remix-run/react");
var import_jsx_runtime157 = require("react/jsx-runtime"), meta37 = () => ({
  title: "Progressively | Welcome"
}), action35 = async ({
  request
}) => {
  let data = await registerAction({ request });
  return data != null && data.errors ? data : (0, import_node26.redirect)("/signin?userCreated=true");
};
function WelcomePage() {
  let data = (0, import_react109.useActionData)(), errors = data == null ? void 0 : data.errors;
  return /* @__PURE__ */ (0, import_jsx_runtime157.jsx)(NotAuthenticatedLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime157.jsxs)(Stack, { spacing: 4, children: [
    /* @__PURE__ */ (0, import_jsx_runtime157.jsxs)("div", { className: "text-center motion-safe:animate-fade-enter-top", children: [
      /* @__PURE__ */ (0, import_jsx_runtime157.jsx)(
        "h1",
        {
          className: "font-bold text-4xl md:text-5xl dark:text-slate-100",
          id: "page-title",
          children: "Congratulations!"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime157.jsx)(Spacer, { size: 2 }),
      /* @__PURE__ */ (0, import_jsx_runtime157.jsxs)(Typography, { children: [
        "You've",
        " successfully run your Progressively instance. ",
        "It's",
        " ",
        "time to create ",
        /* @__PURE__ */ (0, import_jsx_runtime157.jsx)("strong", { children: "your admin user." })
      ] })
    ] }),
    errors && Object.keys(errors).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime157.jsx)(ErrorBox, { list: errors }),
    /* @__PURE__ */ (0, import_jsx_runtime157.jsx)(
      "div",
      {
        className: "motion-safe:animate-fade-enter-bottom motion-safe:opacity-0",
        style: {
          animationDelay: "500ms"
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime157.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime157.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime157.jsx)(
          RegisterForm,
          {
            errors,
            actionLabel: "Create my admin user"
          }
        ) }) })
      }
    )
  ] }) });
}

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  default: () => LogoutPage,
  loader: () => loader19
});
var import_node27 = require("@remix-run/node"), import_react110 = require("@remix-run/react"), import_react111 = require("react");
var loader19 = async ({ request }) => {
  let oktaConfig = getOktaConfig(), session = await getSession(request.headers.get("Cookie"));
  return oktaConfig.isOktaActivated ? (0, import_node27.json)(
    {
      oktaConfig: getOktaConfig()
    },
    {
      headers: {
        "Set-Cookie": await destroySession(session)
      }
    }
  ) : (0, import_node27.redirect)("/signin", {
    headers: {
      "Set-Cookie": await destroySession(session)
    }
  });
};
function LogoutPage() {
  let { oktaConfig } = (0, import_react110.useLoaderData)(), okta = useOkta(oktaConfig);
  return (0, import_react111.useEffect)(() => {
    (async () => {
      if (oktaConfig.isOktaActivated && okta) {
        let urlToRedirect = await okta.logout();
        window.location.href = urlToRedirect;
      }
    })();
  }, [okta, oktaConfig.isOktaActivated]), null;
}

// app/routes/signin.tsx
var signin_exports = {};
__export(signin_exports, {
  action: () => action36,
  default: () => Signin,
  loader: () => loader20,
  meta: () => meta38
});
var import_node28 = require("@remix-run/node"), import_react112 = require("@remix-run/react");

// app/modules/auth/services/authenticate.ts
var authenticate = (username, password) => fetch(`${Constants.BackendUrl}/auth/login`, {
  method: "POST",
  body: JSON.stringify({ username, password }),
  headers: { "Content-Type": "application/json" }
});

// app/modules/auth/validators/validate-signin-form.ts
var validateSigninForm = (values) => {
  let errors = {}, emailError = validateEmail(values.email), passwordError = validatePassword(values.password);
  return emailError && (errors.email = emailError), passwordError && (errors.password = passwordError), errors;
};

// app/routes/signin.tsx
var import_si = require("react-icons/si");

// app/components/Separator.tsx
var import_jsx_runtime158 = require("react/jsx-runtime"), Separator = () => /* @__PURE__ */ (0, import_jsx_runtime158.jsx)("hr", {});

// app/routes/signin.tsx
var import_jsx_runtime159 = require("react/jsx-runtime"), meta38 = () => ({
  title: "Progressively |\xA0Sign in"
}), action36 = async ({
  request
}) => {
  var _a, _b;
  let session = await getSession(request.headers.get("Cookie")), formData = await request.formData(), email = (_a = formData.get("email")) == null ? void 0 : _a.toString(), password = (_b = formData.get("password")) == null ? void 0 : _b.toString(), errors = validateSigninForm({ email, password });
  if ((errors == null ? void 0 : errors.email) || (errors == null ? void 0 : errors.password))
    return { errors };
  let res = await authenticate(email, password), authenticationSucceed = await res.json();
  return !authenticationSucceed.access_token || !res.headers.get("set-cookie") ? {
    errors: {
      badUser: "Woops! Looks the credentials are not valid."
    }
  } : (session.set("auth-cookie", authenticationSucceed.access_token), session.set("refresh-token-cookie", res.headers.get("set-cookie")), (0, import_node28.redirect)("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  }));
}, loader20 = () => ({
  showRegister: process.env.ALLOW_REGISTRATION === "true",
  oktaConfig: getOktaConfig()
});
function Signin() {
  let { showRegister, oktaConfig } = (0, import_react112.useLoaderData)(), okta = useOkta(oktaConfig), transition = (0, import_react112.useTransition)(), [searchParams] = (0, import_react112.useSearchParams)(), userActivated = searchParams.get("userActivated"), userCreated = searchParams.get("userCreated"), oauthFailed = searchParams.get("oauthFailed"), data = (0, import_react112.useActionData)(), errors = data == null ? void 0 : data.errors;
  return /* @__PURE__ */ (0, import_jsx_runtime159.jsx)(
    NotAuthenticatedLayout,
    {
      size: "S",
      status: oauthFailed ? /* @__PURE__ */ (0, import_jsx_runtime159.jsx)(
        ErrorBox,
        {
          list: {
            oauth: "An error appeared during the authentication. Please try again or contact your system administrator."
          }
        }
      ) : (errors == null ? void 0 : errors.password) || (errors == null ? void 0 : errors.email) || (errors == null ? void 0 : errors.badUser) ? /* @__PURE__ */ (0, import_jsx_runtime159.jsx)(ErrorBox, { list: errors }) : userActivated ? /* @__PURE__ */ (0, import_jsx_runtime159.jsx)(SuccessBox, { id: "user-activated", children: "The account has been activated, you can now log in" }) : userCreated ? /* @__PURE__ */ (0, import_jsx_runtime159.jsx)(SuccessBox, { id: "user-created", children: "The account has been created, you can now log in" }) : null,
      children: /* @__PURE__ */ (0, import_jsx_runtime159.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime159.jsxs)(CardContent, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime159.jsxs)("div", { className: "flex flex-row justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_runtime159.jsx)(H1Logo, { children: "Signin" }),
          showRegister && /* @__PURE__ */ (0, import_jsx_runtime159.jsx)(
            Button,
            {
              className: "justify-center",
              to: "/register",
              variant: "tertiary",
              children: "Sign up"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime159.jsx)(Spacer, { size: 16 }),
        /* @__PURE__ */ (0, import_jsx_runtime159.jsx)(import_react112.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime159.jsxs)(FormGroup, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime159.jsx)(
            TextInput,
            {
              isInvalid: Boolean(errors == null ? void 0 : errors.email),
              name: "email",
              label: "Email",
              placeholder: "e.g: james.bond@mi6.com",
              autoComplete: "username"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime159.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime159.jsx)(
              TextInput,
              {
                isInvalid: Boolean(errors == null ? void 0 : errors.password),
                name: "password",
                label: "Password",
                type: "password",
                placeholder: "************",
                autoComplete: "current-password"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime159.jsx)("div", { className: "pt-1 flex justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime159.jsx)(
              Link4,
              {
                to: "/forgot-password",
                className: "text-xs text-gray-500 dark:text-slate-300",
                children: "I forgot my password"
              }
            ) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime159.jsx)(
            SubmitButton,
            {
              className: "justify-center",
              isLoading: transition.state === "submitting",
              loadingText: "Signin in progress, please wait...",
              children: "Sign in"
            }
          )
        ] }) }),
        oktaConfig.isOktaActivated && /* @__PURE__ */ (0, import_jsx_runtime159.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime159.jsx)(Spacer, { size: 12 }),
          /* @__PURE__ */ (0, import_jsx_runtime159.jsx)(Separator, {}),
          /* @__PURE__ */ (0, import_jsx_runtime159.jsx)("div", { className: "flex justify-center -mt-3", children: /* @__PURE__ */ (0, import_jsx_runtime159.jsx)(Typography, { className: "text-sm px-3 bg-white dark:bg-slate-800", children: "Or signin with" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime159.jsx)(Spacer, { size: 4 }),
          /* @__PURE__ */ (0, import_jsx_runtime159.jsx)(
            Button,
            {
              type: "button",
              className: "justify-center w-full",
              variant: "secondary",
              icon: /* @__PURE__ */ (0, import_jsx_runtime159.jsx)(import_si.SiOkta, { "aria-hidden": !0 }),
              onClick: okta == null ? void 0 : okta.openLoginPage,
              children: "Sign in with Okta"
            }
          )
        ] })
      ] }) })
    }
  );
}

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Homepage,
  loader: () => loader21
});
var import_node29 = require("@remix-run/node"), loader21 = async () => (0, import_node29.redirect)("/signin");
function Homepage() {
  return null;
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "81b8c470", entry: { module: "/build/entry.client-KM5U3HCU.js", imports: ["/build/_shared/chunk-HDLKHOFJ.js", "/build/_shared/chunk-57BVP6JT.js", "/build/_shared/chunk-ZYXGHD3T.js", "/build/_shared/chunk-ADMCF34Z.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-PWVGVFMD.js", imports: ["/build/_shared/chunk-A7MMCH3U.js", "/build/_shared/chunk-5UUWH6C2.js", "/build/_shared/chunk-KQAUEW2N.js", "/build/_shared/chunk-BDYQEUNI.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/401": { id: "routes/401", parentId: "root", path: "401", index: void 0, caseSensitive: void 0, module: "/build/routes/401-4K2ETMEC.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/403": { id: "routes/403", parentId: "root", path: "403", index: void 0, caseSensitive: void 0, module: "/build/routes/403-57DSIVOE.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/404": { id: "routes/404", parentId: "root", path: "404", index: void 0, caseSensitive: void 0, module: "/build/routes/404-VSNYB5KZ.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard": { id: "routes/dashboard", parentId: "root", path: "dashboard", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard-33XOIPY6.js", imports: ["/build/_shared/chunk-3TPGCJMW.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/index": { id: "routes/dashboard/index", parentId: "routes/dashboard", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/dashboard/index-W4J3DUAD.js", imports: ["/build/_shared/chunk-VBDNM474.js", "/build/_shared/chunk-VAKJXRPC.js", "/build/_shared/chunk-B4IIY73I.js", "/build/_shared/chunk-GUFIHDDX.js", "/build/_shared/chunk-UZYHWQHV.js", "/build/_shared/chunk-4JUH7CNV.js", "/build/_shared/chunk-BCUCKG5G.js", "/build/_shared/chunk-IGPF2A3B.js", "/build/_shared/chunk-JOZJAEXW.js", "/build/_shared/chunk-O5A67D3B.js", "/build/_shared/chunk-VS7LLZT3.js", "/build/_shared/chunk-E4RYRFGP.js", "/build/_shared/chunk-HDFWVF7N.js", "/build/_shared/chunk-472P3FCP.js", "/build/_shared/chunk-KQAUEW2N.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-VGCVW2JD.js", "/build/_shared/chunk-QMBT5NQV.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-RBA2GSEU.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/onboarding": { id: "routes/dashboard/onboarding", parentId: "routes/dashboard", path: "onboarding", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/onboarding-4Z5O2HIR.js", imports: ["/build/_shared/chunk-4JUH7CNV.js", "/build/_shared/chunk-VS7LLZT3.js", "/build/_shared/chunk-E4RYRFGP.js", "/build/_shared/chunk-HDFWVF7N.js", "/build/_shared/chunk-472P3FCP.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-ZRDRCE77.js", "/build/_shared/chunk-RBA2GSEU.js", "/build/_shared/chunk-YE3I23XW.js", "/build/_shared/chunk-6E2BC2TF.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id": { id: "routes/dashboard/projects/$id", parentId: "routes/dashboard", path: "projects/:id", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id-XETX3ITB.js", imports: ["/build/_shared/chunk-VS7LLZT3.js", "/build/_shared/chunk-E4RYRFGP.js", "/build/_shared/chunk-HDFWVF7N.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/add-member": { id: "routes/dashboard/projects/$id/add-member", parentId: "routes/dashboard/projects/$id", path: "add-member", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/add-member-XAVEOMCX.js", imports: ["/build/_shared/chunk-TIRBVWLE.js", "/build/_shared/chunk-XHWTZMXI.js", "/build/_shared/chunk-SU4DSDGV.js", "/build/_shared/chunk-UZYHWQHV.js", "/build/_shared/chunk-4JUH7CNV.js", "/build/_shared/chunk-BCUCKG5G.js", "/build/_shared/chunk-IGPF2A3B.js", "/build/_shared/chunk-JOZJAEXW.js", "/build/_shared/chunk-O5A67D3B.js", "/build/_shared/chunk-472P3FCP.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-KQAUEW2N.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-VGCVW2JD.js", "/build/_shared/chunk-QMBT5NQV.js", "/build/_shared/chunk-6B6KUMSW.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-3TPGCJMW.js", "/build/_shared/chunk-RBA2GSEU.js", "/build/_shared/chunk-YE3I23XW.js", "/build/_shared/chunk-6E2BC2TF.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/delete": { id: "routes/dashboard/projects/$id/delete", parentId: "routes/dashboard/projects/$id", path: "delete", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/delete-6EE4SCRJ.js", imports: ["/build/_shared/chunk-4RNG56E5.js", "/build/_shared/chunk-L7G5ZWNK.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-BDYQEUNI.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-QDOQYDAS.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env": { id: "routes/dashboard/projects/$id/environments/$env", parentId: "routes/dashboard/projects/$id", path: "environments/:env", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env-O7L5QBBI.js", imports: ["/build/_shared/chunk-3OTRNBWA.js", "/build/_shared/chunk-472P3FCP.js", "/build/_shared/chunk-V75AER2W.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-YMS4S6QG.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/delete": { id: "routes/dashboard/projects/$id/environments/$env/delete", parentId: "routes/dashboard/projects/$id/environments/$env", path: "delete", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/delete-HBQUGKMH.js", imports: ["/build/_shared/chunk-4RNG56E5.js", "/build/_shared/chunk-L7G5ZWNK.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-BDYQEUNI.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-QDOQYDAS.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/$flagId": { id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId", parentId: "routes/dashboard/projects/$id/environments/$env", path: "flags/:flagId", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/$flagId-45LE6N5J.js", imports: ["/build/_shared/chunk-D4MFD6BG.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/$flagId/delete": { id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/delete", parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId", path: "delete", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/$flagId/delete-YWRSHAYT.js", imports: ["/build/_shared/chunk-4RNG56E5.js", "/build/_shared/chunk-L7G5ZWNK.js", "/build/_shared/chunk-XNB4PJE3.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-V75AER2W.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-BDYQEUNI.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-QDOQYDAS.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/$flagId/eligibilities/$eligibilityId/delete": { id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/eligibilities/$eligibilityId/delete", parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId", path: "eligibilities/:eligibilityId/delete", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/$flagId/eligibilities/$eligibilityId/delete-ZGSDVGA6.js", imports: ["/build/_shared/chunk-4RNG56E5.js", "/build/_shared/chunk-L7G5ZWNK.js", "/build/_shared/chunk-XNB4PJE3.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-V75AER2W.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-BDYQEUNI.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-QDOQYDAS.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/$flagId/eligibilities/create": { id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/eligibilities/create", parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId", path: "eligibilities/create", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/$flagId/eligibilities/create-QIFSIIOL.js", imports: ["/build/_shared/chunk-VAKJXRPC.js", "/build/_shared/chunk-CKNNVLWY.js", "/build/_shared/chunk-O5A67D3B.js", "/build/_shared/chunk-LPHVFBTQ.js", "/build/_shared/chunk-HDFWVF7N.js", "/build/_shared/chunk-XNB4PJE3.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-V75AER2W.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-6B6KUMSW.js", "/build/_shared/chunk-4UEEDTOG.js", "/build/_shared/chunk-QDOQYDAS.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-YE3I23XW.js", "/build/_shared/chunk-6E2BC2TF.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/$flagId/index": { id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/index", parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/$flagId/index-RS5AWJYC.js", imports: ["/build/_shared/chunk-EOCHJGE4.js", "/build/_shared/chunk-VAKJXRPC.js", "/build/_shared/chunk-B4IIY73I.js", "/build/_shared/chunk-J27QJUOF.js", "/build/_shared/chunk-GUFIHDDX.js", "/build/_shared/chunk-WW7LPD3S.js", "/build/_shared/chunk-6LB774RU.js", "/build/_shared/chunk-45ADKFFY.js", "/build/_shared/chunk-XHWTZMXI.js", "/build/_shared/chunk-SU4DSDGV.js", "/build/_shared/chunk-UZYHWQHV.js", "/build/_shared/chunk-4JUH7CNV.js", "/build/_shared/chunk-BCUCKG5G.js", "/build/_shared/chunk-IGPF2A3B.js", "/build/_shared/chunk-F7HZRPYG.js", "/build/_shared/chunk-PRE7DAHT.js", "/build/_shared/chunk-JOZJAEXW.js", "/build/_shared/chunk-XP3XYCDR.js", "/build/_shared/chunk-O5A67D3B.js", "/build/_shared/chunk-VS7LLZT3.js", "/build/_shared/chunk-E4RYRFGP.js", "/build/_shared/chunk-HDFWVF7N.js", "/build/_shared/chunk-3OTRNBWA.js", "/build/_shared/chunk-472P3FCP.js", "/build/_shared/chunk-L7G5ZWNK.js", "/build/_shared/chunk-XNB4PJE3.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-V75AER2W.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-KQAUEW2N.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-VGCVW2JD.js", "/build/_shared/chunk-QMBT5NQV.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-3TPGCJMW.js", "/build/_shared/chunk-RBA2GSEU.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-6E2BC2TF.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/$flagId/insights": { id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/insights", parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId", path: "insights", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/$flagId/insights-VTCWSCDF.js", imports: ["/build/_shared/chunk-EOCHJGE4.js", "/build/_shared/chunk-VAKJXRPC.js", "/build/_shared/chunk-J27QJUOF.js", "/build/_shared/chunk-GUFIHDDX.js", "/build/_shared/chunk-WW7LPD3S.js", "/build/_shared/chunk-6LB774RU.js", "/build/_shared/chunk-45ADKFFY.js", "/build/_shared/chunk-XHWTZMXI.js", "/build/_shared/chunk-SU4DSDGV.js", "/build/_shared/chunk-UZYHWQHV.js", "/build/_shared/chunk-4JUH7CNV.js", "/build/_shared/chunk-BCUCKG5G.js", "/build/_shared/chunk-IGPF2A3B.js", "/build/_shared/chunk-PRE7DAHT.js", "/build/_shared/chunk-JOZJAEXW.js", "/build/_shared/chunk-XP3XYCDR.js", "/build/_shared/chunk-O5A67D3B.js", "/build/_shared/chunk-VS7LLZT3.js", "/build/_shared/chunk-E4RYRFGP.js", "/build/_shared/chunk-HDFWVF7N.js", "/build/_shared/chunk-3OTRNBWA.js", "/build/_shared/chunk-472P3FCP.js", "/build/_shared/chunk-XNB4PJE3.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-V75AER2W.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-KQAUEW2N.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-QMBT5NQV.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-3TPGCJMW.js", "/build/_shared/chunk-RBA2GSEU.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-YE3I23XW.js", "/build/_shared/chunk-6E2BC2TF.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/$flagId/metrics/$metricId/delete": { id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/metrics/$metricId/delete", parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId", path: "metrics/:metricId/delete", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/$flagId/metrics/$metricId/delete-SI5WTRR5.js", imports: ["/build/_shared/chunk-4RNG56E5.js", "/build/_shared/chunk-L7G5ZWNK.js", "/build/_shared/chunk-XNB4PJE3.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-V75AER2W.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-BDYQEUNI.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-QDOQYDAS.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/$flagId/metrics/create": { id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/metrics/create", parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId", path: "metrics/create", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/$flagId/metrics/create-RFYLNZSL.js", imports: ["/build/_shared/chunk-EOCHJGE4.js", "/build/_shared/chunk-LPHVFBTQ.js", "/build/_shared/chunk-3OTRNBWA.js", "/build/_shared/chunk-XNB4PJE3.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-V75AER2W.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-6B6KUMSW.js", "/build/_shared/chunk-4UEEDTOG.js", "/build/_shared/chunk-QDOQYDAS.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-YE3I23XW.js", "/build/_shared/chunk-6E2BC2TF.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/$flagId/metrics/index": { id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/metrics/index", parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId", path: "metrics", index: !0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/$flagId/metrics/index-MPJFEWNX.js", imports: ["/build/_shared/chunk-EOCHJGE4.js", "/build/_shared/chunk-B4IIY73I.js", "/build/_shared/chunk-J27QJUOF.js", "/build/_shared/chunk-GUFIHDDX.js", "/build/_shared/chunk-WW7LPD3S.js", "/build/_shared/chunk-6LB774RU.js", "/build/_shared/chunk-45ADKFFY.js", "/build/_shared/chunk-XHWTZMXI.js", "/build/_shared/chunk-SU4DSDGV.js", "/build/_shared/chunk-UZYHWQHV.js", "/build/_shared/chunk-4JUH7CNV.js", "/build/_shared/chunk-BCUCKG5G.js", "/build/_shared/chunk-IGPF2A3B.js", "/build/_shared/chunk-PRE7DAHT.js", "/build/_shared/chunk-JOZJAEXW.js", "/build/_shared/chunk-XP3XYCDR.js", "/build/_shared/chunk-O5A67D3B.js", "/build/_shared/chunk-VS7LLZT3.js", "/build/_shared/chunk-E4RYRFGP.js", "/build/_shared/chunk-HDFWVF7N.js", "/build/_shared/chunk-3OTRNBWA.js", "/build/_shared/chunk-472P3FCP.js", "/build/_shared/chunk-L7G5ZWNK.js", "/build/_shared/chunk-XNB4PJE3.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-V75AER2W.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-KQAUEW2N.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-VGCVW2JD.js", "/build/_shared/chunk-QMBT5NQV.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-3TPGCJMW.js", "/build/_shared/chunk-RBA2GSEU.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/$flagId/scheduling/$scheduleId/delete": { id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/scheduling/$scheduleId/delete", parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId", path: "scheduling/:scheduleId/delete", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/$flagId/scheduling/$scheduleId/delete-5Z7VU2TX.js", imports: ["/build/_shared/chunk-4RNG56E5.js", "/build/_shared/chunk-L7G5ZWNK.js", "/build/_shared/chunk-XNB4PJE3.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-V75AER2W.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-BDYQEUNI.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-QDOQYDAS.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/$flagId/scheduling/create": { id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/scheduling/create", parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId", path: "scheduling/create", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/$flagId/scheduling/create-EJA7J5EZ.js", imports: ["/build/_shared/chunk-F7HZRPYG.js", "/build/_shared/chunk-PRE7DAHT.js", "/build/_shared/chunk-JOZJAEXW.js", "/build/_shared/chunk-XNB4PJE3.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-V75AER2W.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-KQAUEW2N.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-6B6KUMSW.js", "/build/_shared/chunk-4UEEDTOG.js", "/build/_shared/chunk-QDOQYDAS.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-6E2BC2TF.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/$flagId/scheduling/index": { id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/scheduling/index", parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId", path: "scheduling", index: !0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/$flagId/scheduling/index-RIMHVJD3.js", imports: ["/build/_shared/chunk-B4IIY73I.js", "/build/_shared/chunk-J27QJUOF.js", "/build/_shared/chunk-GUFIHDDX.js", "/build/_shared/chunk-WW7LPD3S.js", "/build/_shared/chunk-6LB774RU.js", "/build/_shared/chunk-45ADKFFY.js", "/build/_shared/chunk-XHWTZMXI.js", "/build/_shared/chunk-SU4DSDGV.js", "/build/_shared/chunk-UZYHWQHV.js", "/build/_shared/chunk-4JUH7CNV.js", "/build/_shared/chunk-BCUCKG5G.js", "/build/_shared/chunk-IGPF2A3B.js", "/build/_shared/chunk-F7HZRPYG.js", "/build/_shared/chunk-PRE7DAHT.js", "/build/_shared/chunk-JOZJAEXW.js", "/build/_shared/chunk-XP3XYCDR.js", "/build/_shared/chunk-O5A67D3B.js", "/build/_shared/chunk-VS7LLZT3.js", "/build/_shared/chunk-E4RYRFGP.js", "/build/_shared/chunk-HDFWVF7N.js", "/build/_shared/chunk-472P3FCP.js", "/build/_shared/chunk-L7G5ZWNK.js", "/build/_shared/chunk-XNB4PJE3.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-V75AER2W.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-KQAUEW2N.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-VGCVW2JD.js", "/build/_shared/chunk-QMBT5NQV.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-3TPGCJMW.js", "/build/_shared/chunk-RBA2GSEU.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/$flagId/settings": { id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/settings", parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId", path: "settings", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/$flagId/settings-VOPI2DF5.js", imports: ["/build/_shared/chunk-TIRBVWLE.js", "/build/_shared/chunk-WW7LPD3S.js", "/build/_shared/chunk-6LB774RU.js", "/build/_shared/chunk-45ADKFFY.js", "/build/_shared/chunk-XHWTZMXI.js", "/build/_shared/chunk-SU4DSDGV.js", "/build/_shared/chunk-UZYHWQHV.js", "/build/_shared/chunk-4JUH7CNV.js", "/build/_shared/chunk-BCUCKG5G.js", "/build/_shared/chunk-IGPF2A3B.js", "/build/_shared/chunk-PRE7DAHT.js", "/build/_shared/chunk-JOZJAEXW.js", "/build/_shared/chunk-XP3XYCDR.js", "/build/_shared/chunk-O5A67D3B.js", "/build/_shared/chunk-VS7LLZT3.js", "/build/_shared/chunk-E4RYRFGP.js", "/build/_shared/chunk-HDFWVF7N.js", "/build/_shared/chunk-472P3FCP.js", "/build/_shared/chunk-L7G5ZWNK.js", "/build/_shared/chunk-XNB4PJE3.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-V75AER2W.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-KQAUEW2N.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-QMBT5NQV.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-3TPGCJMW.js", "/build/_shared/chunk-RBA2GSEU.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/$stratId": { id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/$stratId", parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId", path: "strategies/:stratId", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/$stratId-47BDTGI3.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/$stratId/delete": { id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/$stratId/delete", parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/$stratId", path: "delete", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/$stratId/delete-YDNVQODF.js", imports: ["/build/_shared/chunk-4RNG56E5.js", "/build/_shared/chunk-L7G5ZWNK.js", "/build/_shared/chunk-XNB4PJE3.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-V75AER2W.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-D4MFD6BG.js", "/build/_shared/chunk-BDYQEUNI.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-QDOQYDAS.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/create": { id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/create", parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId", path: "strategies/create", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/create-IGX3EKVD.js", imports: ["/build/_shared/chunk-RVROKWEL.js", "/build/_shared/chunk-CKNNVLWY.js", "/build/_shared/chunk-XP3XYCDR.js", "/build/_shared/chunk-O5A67D3B.js", "/build/_shared/chunk-LPHVFBTQ.js", "/build/_shared/chunk-HDFWVF7N.js", "/build/_shared/chunk-XNB4PJE3.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-V75AER2W.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-6B6KUMSW.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-4UEEDTOG.js", "/build/_shared/chunk-QDOQYDAS.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-YE3I23XW.js", "/build/_shared/chunk-6E2BC2TF.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/$flagId/variants/create": { id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/variants/create", parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId", path: "variants/create", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/$flagId/variants/create-WEJ5LW3X.js", imports: ["/build/_shared/chunk-XNB4PJE3.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-V75AER2W.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-4UEEDTOG.js", "/build/_shared/chunk-QDOQYDAS.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-YE3I23XW.js", "/build/_shared/chunk-6E2BC2TF.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/$flagId/variants/index": { id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/variants/index", parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId", path: "variants", index: !0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/$flagId/variants/index-FOZ24MQH.js", imports: ["/build/_shared/chunk-RVROKWEL.js", "/build/_shared/chunk-B4IIY73I.js", "/build/_shared/chunk-J27QJUOF.js", "/build/_shared/chunk-GUFIHDDX.js", "/build/_shared/chunk-WW7LPD3S.js", "/build/_shared/chunk-6LB774RU.js", "/build/_shared/chunk-45ADKFFY.js", "/build/_shared/chunk-XHWTZMXI.js", "/build/_shared/chunk-SU4DSDGV.js", "/build/_shared/chunk-UZYHWQHV.js", "/build/_shared/chunk-4JUH7CNV.js", "/build/_shared/chunk-BCUCKG5G.js", "/build/_shared/chunk-IGPF2A3B.js", "/build/_shared/chunk-F7HZRPYG.js", "/build/_shared/chunk-PRE7DAHT.js", "/build/_shared/chunk-JOZJAEXW.js", "/build/_shared/chunk-XP3XYCDR.js", "/build/_shared/chunk-O5A67D3B.js", "/build/_shared/chunk-VS7LLZT3.js", "/build/_shared/chunk-E4RYRFGP.js", "/build/_shared/chunk-HDFWVF7N.js", "/build/_shared/chunk-3OTRNBWA.js", "/build/_shared/chunk-472P3FCP.js", "/build/_shared/chunk-L7G5ZWNK.js", "/build/_shared/chunk-XNB4PJE3.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-V75AER2W.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-KQAUEW2N.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-VGCVW2JD.js", "/build/_shared/chunk-QMBT5NQV.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-3TPGCJMW.js", "/build/_shared/chunk-RBA2GSEU.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-YE3I23XW.js", "/build/_shared/chunk-6E2BC2TF.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/$flagId/webhooks/$webhookId/delete": { id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/webhooks/$webhookId/delete", parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId", path: "webhooks/:webhookId/delete", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/$flagId/webhooks/$webhookId/delete-DMZY42MQ.js", imports: ["/build/_shared/chunk-4RNG56E5.js", "/build/_shared/chunk-L7G5ZWNK.js", "/build/_shared/chunk-XNB4PJE3.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-V75AER2W.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-BDYQEUNI.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-QDOQYDAS.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/$flagId/webhooks/create": { id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/webhooks/create", parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId", path: "webhooks/create", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/$flagId/webhooks/create-SYBSXEAS.js", imports: ["/build/_shared/chunk-LPHVFBTQ.js", "/build/_shared/chunk-XNB4PJE3.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-V75AER2W.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-6B6KUMSW.js", "/build/_shared/chunk-4UEEDTOG.js", "/build/_shared/chunk-QDOQYDAS.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-YE3I23XW.js", "/build/_shared/chunk-6E2BC2TF.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/$flagId/webhooks/index": { id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/webhooks/index", parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId", path: "webhooks", index: !0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/$flagId/webhooks/index-S4G3VHMP.js", imports: ["/build/_shared/chunk-TIRBVWLE.js", "/build/_shared/chunk-VAKJXRPC.js", "/build/_shared/chunk-B4IIY73I.js", "/build/_shared/chunk-J27QJUOF.js", "/build/_shared/chunk-GUFIHDDX.js", "/build/_shared/chunk-WW7LPD3S.js", "/build/_shared/chunk-6LB774RU.js", "/build/_shared/chunk-45ADKFFY.js", "/build/_shared/chunk-XHWTZMXI.js", "/build/_shared/chunk-SU4DSDGV.js", "/build/_shared/chunk-UZYHWQHV.js", "/build/_shared/chunk-4JUH7CNV.js", "/build/_shared/chunk-BCUCKG5G.js", "/build/_shared/chunk-IGPF2A3B.js", "/build/_shared/chunk-PRE7DAHT.js", "/build/_shared/chunk-JOZJAEXW.js", "/build/_shared/chunk-XP3XYCDR.js", "/build/_shared/chunk-O5A67D3B.js", "/build/_shared/chunk-VS7LLZT3.js", "/build/_shared/chunk-E4RYRFGP.js", "/build/_shared/chunk-HDFWVF7N.js", "/build/_shared/chunk-472P3FCP.js", "/build/_shared/chunk-L7G5ZWNK.js", "/build/_shared/chunk-XNB4PJE3.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-V75AER2W.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-KQAUEW2N.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-VGCVW2JD.js", "/build/_shared/chunk-QMBT5NQV.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-3TPGCJMW.js", "/build/_shared/chunk-RBA2GSEU.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/flags/create": { id: "routes/dashboard/projects/$id/environments/$env/flags/create", parentId: "routes/dashboard/projects/$id/environments/$env", path: "flags/create", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/flags/create-CFQJFCEW.js", imports: ["/build/_shared/chunk-TIRBVWLE.js", "/build/_shared/chunk-IGPF2A3B.js", "/build/_shared/chunk-HDFWVF7N.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-6B6KUMSW.js", "/build/_shared/chunk-4UEEDTOG.js", "/build/_shared/chunk-QDOQYDAS.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-YE3I23XW.js", "/build/_shared/chunk-6E2BC2TF.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/index": { id: "routes/dashboard/projects/$id/environments/$env/index", parentId: "routes/dashboard/projects/$id/environments/$env", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/index-XCKERHYG.js", imports: ["/build/_shared/chunk-XKBE4M5E.js", "/build/_shared/chunk-VBDNM474.js", "/build/_shared/chunk-TIRBVWLE.js", "/build/_shared/chunk-B4IIY73I.js", "/build/_shared/chunk-J27QJUOF.js", "/build/_shared/chunk-GUFIHDDX.js", "/build/_shared/chunk-6LB774RU.js", "/build/_shared/chunk-45ADKFFY.js", "/build/_shared/chunk-XHWTZMXI.js", "/build/_shared/chunk-SU4DSDGV.js", "/build/_shared/chunk-UZYHWQHV.js", "/build/_shared/chunk-4JUH7CNV.js", "/build/_shared/chunk-BCUCKG5G.js", "/build/_shared/chunk-IGPF2A3B.js", "/build/_shared/chunk-PRE7DAHT.js", "/build/_shared/chunk-JOZJAEXW.js", "/build/_shared/chunk-O5A67D3B.js", "/build/_shared/chunk-VS7LLZT3.js", "/build/_shared/chunk-E4RYRFGP.js", "/build/_shared/chunk-HDFWVF7N.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-KQAUEW2N.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-VGCVW2JD.js", "/build/_shared/chunk-QMBT5NQV.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-3TPGCJMW.js", "/build/_shared/chunk-RBA2GSEU.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/$env/settings": { id: "routes/dashboard/projects/$id/environments/$env/settings", parentId: "routes/dashboard/projects/$id/environments/$env", path: "settings", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/$env/settings-XI6HSOZQ.js", imports: ["/build/_shared/chunk-XKBE4M5E.js", "/build/_shared/chunk-TIRBVWLE.js", "/build/_shared/chunk-45ADKFFY.js", "/build/_shared/chunk-XHWTZMXI.js", "/build/_shared/chunk-SU4DSDGV.js", "/build/_shared/chunk-UZYHWQHV.js", "/build/_shared/chunk-4JUH7CNV.js", "/build/_shared/chunk-BCUCKG5G.js", "/build/_shared/chunk-IGPF2A3B.js", "/build/_shared/chunk-JOZJAEXW.js", "/build/_shared/chunk-O5A67D3B.js", "/build/_shared/chunk-VS7LLZT3.js", "/build/_shared/chunk-E4RYRFGP.js", "/build/_shared/chunk-HDFWVF7N.js", "/build/_shared/chunk-L7G5ZWNK.js", "/build/_shared/chunk-ZQVNOGCB.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-NPTFSALW.js", "/build/_shared/chunk-KQAUEW2N.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-QMBT5NQV.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-3TPGCJMW.js", "/build/_shared/chunk-RBA2GSEU.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/environments/create": { id: "routes/dashboard/projects/$id/environments/create", parentId: "routes/dashboard/projects/$id", path: "environments/create", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/environments/create-BB5OC2HR.js", imports: ["/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-4UEEDTOG.js", "/build/_shared/chunk-QDOQYDAS.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-YE3I23XW.js", "/build/_shared/chunk-6E2BC2TF.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/index": { id: "routes/dashboard/projects/$id/index", parentId: "routes/dashboard/projects/$id", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/index-M7HOOFZ2.js", imports: ["/build/_shared/chunk-VBDNM474.js", "/build/_shared/chunk-TIRBVWLE.js", "/build/_shared/chunk-B4IIY73I.js", "/build/_shared/chunk-J27QJUOF.js", "/build/_shared/chunk-GUFIHDDX.js", "/build/_shared/chunk-45ADKFFY.js", "/build/_shared/chunk-XHWTZMXI.js", "/build/_shared/chunk-SU4DSDGV.js", "/build/_shared/chunk-UZYHWQHV.js", "/build/_shared/chunk-4JUH7CNV.js", "/build/_shared/chunk-BCUCKG5G.js", "/build/_shared/chunk-IGPF2A3B.js", "/build/_shared/chunk-JOZJAEXW.js", "/build/_shared/chunk-O5A67D3B.js", "/build/_shared/chunk-472P3FCP.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-KQAUEW2N.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-VGCVW2JD.js", "/build/_shared/chunk-QMBT5NQV.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-3TPGCJMW.js", "/build/_shared/chunk-RBA2GSEU.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/$id/settings": { id: "routes/dashboard/projects/$id/settings", parentId: "routes/dashboard/projects/$id", path: "settings", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/$id/settings-TP7JV2TZ.js", imports: ["/build/_shared/chunk-TIRBVWLE.js", "/build/_shared/chunk-VAKJXRPC.js", "/build/_shared/chunk-B4IIY73I.js", "/build/_shared/chunk-GUFIHDDX.js", "/build/_shared/chunk-45ADKFFY.js", "/build/_shared/chunk-XHWTZMXI.js", "/build/_shared/chunk-SU4DSDGV.js", "/build/_shared/chunk-UZYHWQHV.js", "/build/_shared/chunk-4JUH7CNV.js", "/build/_shared/chunk-BCUCKG5G.js", "/build/_shared/chunk-IGPF2A3B.js", "/build/_shared/chunk-JOZJAEXW.js", "/build/_shared/chunk-O5A67D3B.js", "/build/_shared/chunk-472P3FCP.js", "/build/_shared/chunk-L7G5ZWNK.js", "/build/_shared/chunk-Q4WB6RAC.js", "/build/_shared/chunk-2GDHKKOL.js", "/build/_shared/chunk-KQAUEW2N.js", "/build/_shared/chunk-CZESYIQY.js", "/build/_shared/chunk-VGCVW2JD.js", "/build/_shared/chunk-QMBT5NQV.js", "/build/_shared/chunk-YP7ULMET.js", "/build/_shared/chunk-3TPGCJMW.js", "/build/_shared/chunk-RBA2GSEU.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/projects/create": { id: "routes/dashboard/projects/create", parentId: "routes/dashboard", path: "projects/create", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/projects/create-7STXGRD4.js", imports: ["/build/_shared/chunk-4UEEDTOG.js", "/build/_shared/chunk-QDOQYDAS.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-YE3I23XW.js", "/build/_shared/chunk-6E2BC2TF.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/what-s-your-name": { id: "routes/dashboard/what-s-your-name", parentId: "routes/dashboard", path: "what-s-your-name", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/what-s-your-name-CEMGWK4X.js", imports: ["/build/_shared/chunk-ZRDRCE77.js", "/build/_shared/chunk-RBA2GSEU.js", "/build/_shared/chunk-YE3I23XW.js", "/build/_shared/chunk-6E2BC2TF.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-XCNZPMZL.js", "/build/_shared/chunk-WEU6IWBJ.js", "/build/_shared/chunk-7U2BXBF7.js", "/build/_shared/chunk-42G3PM4Y.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/forgot-password": { id: "routes/forgot-password", parentId: "root", path: "forgot-password", index: void 0, caseSensitive: void 0, module: "/build/routes/forgot-password-DIWMR5XS.js", imports: ["/build/_shared/chunk-PXK2MLUW.js", "/build/_shared/chunk-VGCVW2JD.js", "/build/_shared/chunk-QMBT5NQV.js", "/build/_shared/chunk-6B6KUMSW.js", "/build/_shared/chunk-ZRDRCE77.js", "/build/_shared/chunk-RBA2GSEU.js", "/build/_shared/chunk-QDOQYDAS.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-YE3I23XW.js", "/build/_shared/chunk-6E2BC2TF.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-WEU6IWBJ.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-2EEEYFTV.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-PBWARGDB.js", imports: ["/build/_shared/chunk-S4SL7HIW.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/oauth2.callback": { id: "routes/oauth2.callback", parentId: "root", path: "oauth2/callback", index: void 0, caseSensitive: void 0, module: "/build/routes/oauth2.callback-7X4WOZAI.js", imports: ["/build/_shared/chunk-S4SL7HIW.js", "/build/_shared/chunk-WEU6IWBJ.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/profile": { id: "routes/profile", parentId: "root", path: "profile", index: void 0, caseSensitive: void 0, module: "/build/routes/profile-3O7R4QY6.js", imports: ["/build/_shared/chunk-CKNNVLWY.js", "/build/_shared/chunk-45ADKFFY.js", "/build/_shared/chunk-SU4DSDGV.js", "/build/_shared/chunk-UZYHWQHV.js", "/build/_shared/chunk-4JUH7CNV.js", "/build/_shared/chunk-BCUCKG5G.js", "/build/_shared/chunk-IGPF2A3B.js", "/build/_shared/chunk-JOZJAEXW.js", "/build/_shared/chunk-XP3XYCDR.js", "/build/_shared/chunk-O5A67D3B.js", "/build/_shared/chunk-E4RYRFGP.js", "/build/_shared/chunk-HDFWVF7N.js", "/build/_shared/chunk-472P3FCP.js", "/build/_shared/chunk-VGCVW2JD.js", "/build/_shared/chunk-QMBT5NQV.js", "/build/_shared/chunk-6B6KUMSW.js", "/build/_shared/chunk-RBA2GSEU.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-YE3I23XW.js", "/build/_shared/chunk-6E2BC2TF.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-WEU6IWBJ.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/register": { id: "routes/register", parentId: "root", path: "register", index: void 0, caseSensitive: void 0, module: "/build/routes/register-BJSQHBXR.js", imports: ["/build/_shared/chunk-XFX4NH64.js", "/build/_shared/chunk-PXK2MLUW.js", "/build/_shared/chunk-VGCVW2JD.js", "/build/_shared/chunk-QMBT5NQV.js", "/build/_shared/chunk-6B6KUMSW.js", "/build/_shared/chunk-ZRDRCE77.js", "/build/_shared/chunk-RBA2GSEU.js", "/build/_shared/chunk-QDOQYDAS.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-YE3I23XW.js", "/build/_shared/chunk-6E2BC2TF.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-WEU6IWBJ.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/reset-password": { id: "routes/reset-password", parentId: "root", path: "reset-password", index: void 0, caseSensitive: void 0, module: "/build/routes/reset-password-CJE7EXSO.js", imports: ["/build/_shared/chunk-PXK2MLUW.js", "/build/_shared/chunk-VGCVW2JD.js", "/build/_shared/chunk-QMBT5NQV.js", "/build/_shared/chunk-6B6KUMSW.js", "/build/_shared/chunk-ZRDRCE77.js", "/build/_shared/chunk-RBA2GSEU.js", "/build/_shared/chunk-QDOQYDAS.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-YE3I23XW.js", "/build/_shared/chunk-6E2BC2TF.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-WEU6IWBJ.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/signin": { id: "routes/signin", parentId: "root", path: "signin", index: void 0, caseSensitive: void 0, module: "/build/routes/signin-P33NXHBU.js", imports: ["/build/_shared/chunk-BCUCKG5G.js", "/build/_shared/chunk-S4SL7HIW.js", "/build/_shared/chunk-PXK2MLUW.js", "/build/_shared/chunk-VGCVW2JD.js", "/build/_shared/chunk-QMBT5NQV.js", "/build/_shared/chunk-6B6KUMSW.js", "/build/_shared/chunk-ZRDRCE77.js", "/build/_shared/chunk-RBA2GSEU.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-YE3I23XW.js", "/build/_shared/chunk-6E2BC2TF.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-WEU6IWBJ.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/signout": { id: "routes/signout", parentId: "root", path: "signout", index: void 0, caseSensitive: void 0, module: "/build/routes/signout-5RGBG3WT.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/welcome": { id: "routes/welcome", parentId: "root", path: "welcome", index: void 0, caseSensitive: void 0, module: "/build/routes/welcome-ZAGBD3PE.js", imports: ["/build/_shared/chunk-XFX4NH64.js", "/build/_shared/chunk-6B6KUMSW.js", "/build/_shared/chunk-ZRDRCE77.js", "/build/_shared/chunk-RBA2GSEU.js", "/build/_shared/chunk-GAS4IICN.js", "/build/_shared/chunk-YE3I23XW.js", "/build/_shared/chunk-6E2BC2TF.js", "/build/_shared/chunk-UWBMR75P.js", "/build/_shared/chunk-CBIO4Z5G.js", "/build/_shared/chunk-WCQTO7BZ.js", "/build/_shared/chunk-AA3BCCK5.js", "/build/_shared/chunk-L2PQTVLQ.js", "/build/_shared/chunk-L2MPLTUD.js", "/build/_shared/chunk-YMS4S6QG.js", "/build/_shared/chunk-WEU6IWBJ.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, url: "/build/manifest-81B8C470.js" };

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
  "routes/forgot-password": {
    id: "routes/forgot-password",
    parentId: "root",
    path: "forgot-password",
    index: void 0,
    caseSensitive: void 0,
    module: forgot_password_exports
  },
  "routes/oauth2.callback": {
    id: "routes/oauth2.callback",
    parentId: "root",
    path: "oauth2/callback",
    index: void 0,
    caseSensitive: void 0,
    module: oauth2_callback_exports
  },
  "routes/reset-password": {
    id: "routes/reset-password",
    parentId: "root",
    path: "reset-password",
    index: void 0,
    caseSensitive: void 0,
    module: reset_password_exports
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "root",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: dashboard_exports
  },
  "routes/dashboard/what-s-your-name": {
    id: "routes/dashboard/what-s-your-name",
    parentId: "routes/dashboard",
    path: "what-s-your-name",
    index: void 0,
    caseSensitive: void 0,
    module: what_s_your_name_exports
  },
  "routes/dashboard/projects/create": {
    id: "routes/dashboard/projects/create",
    parentId: "routes/dashboard",
    path: "projects/create",
    index: void 0,
    caseSensitive: void 0,
    module: create_exports
  },
  "routes/dashboard/projects/$id": {
    id: "routes/dashboard/projects/$id",
    parentId: "routes/dashboard",
    path: "projects/:id",
    index: void 0,
    caseSensitive: void 0,
    module: id_exports
  },
  "routes/dashboard/projects/$id/environments/create": {
    id: "routes/dashboard/projects/$id/environments/create",
    parentId: "routes/dashboard/projects/$id",
    path: "environments/create",
    index: void 0,
    caseSensitive: void 0,
    module: create_exports2
  },
  "routes/dashboard/projects/$id/environments/$env": {
    id: "routes/dashboard/projects/$id/environments/$env",
    parentId: "routes/dashboard/projects/$id",
    path: "environments/:env",
    index: void 0,
    caseSensitive: void 0,
    module: env_exports
  },
  "routes/dashboard/projects/$id/environments/$env/flags/$flagId": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId",
    parentId: "routes/dashboard/projects/$id/environments/$env",
    path: "flags/:flagId",
    index: void 0,
    caseSensitive: void 0,
    module: flagId_exports
  },
  "routes/dashboard/projects/$id/environments/$env/flags/$flagId/eligibilities/$eligibilityId/delete": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/eligibilities/$eligibilityId/delete",
    parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId",
    path: "eligibilities/:eligibilityId/delete",
    index: void 0,
    caseSensitive: void 0,
    module: delete_exports
  },
  "routes/dashboard/projects/$id/environments/$env/flags/$flagId/scheduling/$scheduleId/delete": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/scheduling/$scheduleId/delete",
    parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId",
    path: "scheduling/:scheduleId/delete",
    index: void 0,
    caseSensitive: void 0,
    module: delete_exports2
  },
  "routes/dashboard/projects/$id/environments/$env/flags/$flagId/webhooks/$webhookId/delete": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/webhooks/$webhookId/delete",
    parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId",
    path: "webhooks/:webhookId/delete",
    index: void 0,
    caseSensitive: void 0,
    module: delete_exports3
  },
  "routes/dashboard/projects/$id/environments/$env/flags/$flagId/metrics/$metricId/delete": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/metrics/$metricId/delete",
    parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId",
    path: "metrics/:metricId/delete",
    index: void 0,
    caseSensitive: void 0,
    module: delete_exports4
  },
  "routes/dashboard/projects/$id/environments/$env/flags/$flagId/eligibilities/create": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/eligibilities/create",
    parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId",
    path: "eligibilities/create",
    index: void 0,
    caseSensitive: void 0,
    module: create_exports3
  },
  "routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/$stratId": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/$stratId",
    parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId",
    path: "strategies/:stratId",
    index: void 0,
    caseSensitive: void 0,
    module: stratId_exports
  },
  "routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/$stratId/delete": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/$stratId/delete",
    parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/$stratId",
    path: "delete",
    index: void 0,
    caseSensitive: void 0,
    module: delete_exports5
  },
  "routes/dashboard/projects/$id/environments/$env/flags/$flagId/scheduling/create": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/scheduling/create",
    parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId",
    path: "scheduling/create",
    index: void 0,
    caseSensitive: void 0,
    module: create_exports4
  },
  "routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/create": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/create",
    parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId",
    path: "strategies/create",
    index: void 0,
    caseSensitive: void 0,
    module: create_exports5
  },
  "routes/dashboard/projects/$id/environments/$env/flags/$flagId/scheduling/index": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/scheduling/index",
    parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId",
    path: "scheduling",
    index: !0,
    caseSensitive: void 0,
    module: scheduling_exports
  },
  "routes/dashboard/projects/$id/environments/$env/flags/$flagId/variants/create": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/variants/create",
    parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId",
    path: "variants/create",
    index: void 0,
    caseSensitive: void 0,
    module: create_exports6
  },
  "routes/dashboard/projects/$id/environments/$env/flags/$flagId/webhooks/create": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/webhooks/create",
    parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId",
    path: "webhooks/create",
    index: void 0,
    caseSensitive: void 0,
    module: create_exports7
  },
  "routes/dashboard/projects/$id/environments/$env/flags/$flagId/metrics/create": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/metrics/create",
    parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId",
    path: "metrics/create",
    index: void 0,
    caseSensitive: void 0,
    module: create_exports8
  },
  "routes/dashboard/projects/$id/environments/$env/flags/$flagId/variants/index": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/variants/index",
    parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId",
    path: "variants",
    index: !0,
    caseSensitive: void 0,
    module: variants_exports
  },
  "routes/dashboard/projects/$id/environments/$env/flags/$flagId/webhooks/index": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/webhooks/index",
    parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId",
    path: "webhooks",
    index: !0,
    caseSensitive: void 0,
    module: webhooks_exports
  },
  "routes/dashboard/projects/$id/environments/$env/flags/$flagId/metrics/index": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/metrics/index",
    parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId",
    path: "metrics",
    index: !0,
    caseSensitive: void 0,
    module: metrics_exports
  },
  "routes/dashboard/projects/$id/environments/$env/flags/$flagId/insights": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/insights",
    parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId",
    path: "insights",
    index: void 0,
    caseSensitive: void 0,
    module: insights_exports
  },
  "routes/dashboard/projects/$id/environments/$env/flags/$flagId/settings": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/settings",
    parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId",
    path: "settings",
    index: void 0,
    caseSensitive: void 0,
    module: settings_exports
  },
  "routes/dashboard/projects/$id/environments/$env/flags/$flagId/delete": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/delete",
    parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId",
    path: "delete",
    index: void 0,
    caseSensitive: void 0,
    module: delete_exports6
  },
  "routes/dashboard/projects/$id/environments/$env/flags/$flagId/index": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/$flagId/index",
    parentId: "routes/dashboard/projects/$id/environments/$env/flags/$flagId",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: flagId_exports2
  },
  "routes/dashboard/projects/$id/environments/$env/flags/create": {
    id: "routes/dashboard/projects/$id/environments/$env/flags/create",
    parentId: "routes/dashboard/projects/$id/environments/$env",
    path: "flags/create",
    index: void 0,
    caseSensitive: void 0,
    module: create_exports9
  },
  "routes/dashboard/projects/$id/environments/$env/settings": {
    id: "routes/dashboard/projects/$id/environments/$env/settings",
    parentId: "routes/dashboard/projects/$id/environments/$env",
    path: "settings",
    index: void 0,
    caseSensitive: void 0,
    module: settings_exports2
  },
  "routes/dashboard/projects/$id/environments/$env/delete": {
    id: "routes/dashboard/projects/$id/environments/$env/delete",
    parentId: "routes/dashboard/projects/$id/environments/$env",
    path: "delete",
    index: void 0,
    caseSensitive: void 0,
    module: delete_exports7
  },
  "routes/dashboard/projects/$id/environments/$env/index": {
    id: "routes/dashboard/projects/$id/environments/$env/index",
    parentId: "routes/dashboard/projects/$id/environments/$env",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: env_exports2
  },
  "routes/dashboard/projects/$id/add-member": {
    id: "routes/dashboard/projects/$id/add-member",
    parentId: "routes/dashboard/projects/$id",
    path: "add-member",
    index: void 0,
    caseSensitive: void 0,
    module: add_member_exports
  },
  "routes/dashboard/projects/$id/settings": {
    id: "routes/dashboard/projects/$id/settings",
    parentId: "routes/dashboard/projects/$id",
    path: "settings",
    index: void 0,
    caseSensitive: void 0,
    module: settings_exports3
  },
  "routes/dashboard/projects/$id/delete": {
    id: "routes/dashboard/projects/$id/delete",
    parentId: "routes/dashboard/projects/$id",
    path: "delete",
    index: void 0,
    caseSensitive: void 0,
    module: delete_exports8
  },
  "routes/dashboard/projects/$id/index": {
    id: "routes/dashboard/projects/$id/index",
    parentId: "routes/dashboard/projects/$id",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: id_exports2
  },
  "routes/dashboard/onboarding": {
    id: "routes/dashboard/onboarding",
    parentId: "routes/dashboard",
    path: "onboarding",
    index: void 0,
    caseSensitive: void 0,
    module: onboarding_exports
  },
  "routes/dashboard/index": {
    id: "routes/dashboard/index",
    parentId: "routes/dashboard",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: dashboard_exports2
  },
  "routes/register": {
    id: "routes/register",
    parentId: "root",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: register_exports
  },
  "routes/profile": {
    id: "routes/profile",
    parentId: "root",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: profile_exports
  },
  "routes/signout": {
    id: "routes/signout",
    parentId: "root",
    path: "signout",
    index: void 0,
    caseSensitive: void 0,
    module: signout_exports
  },
  "routes/welcome": {
    id: "routes/welcome",
    parentId: "root",
    path: "welcome",
    index: void 0,
    caseSensitive: void 0,
    module: welcome_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/signin": {
    id: "routes/signin",
    parentId: "root",
    path: "signin",
    index: void 0,
    caseSensitive: void 0,
    module: signin_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/401": {
    id: "routes/401",
    parentId: "root",
    path: "401",
    index: void 0,
    caseSensitive: void 0,
    module: __exports
  },
  "routes/403": {
    id: "routes/403",
    parentId: "root",
    path: "403",
    index: void 0,
    caseSensitive: void 0,
    module: __exports2
  },
  "routes/404": {
    id: "routes/404",
    parentId: "root",
    path: "404",
    index: void 0,
    caseSensitive: void 0,
    module: __exports3
  }
};

// server.js
var server_default = (0, import_vercel.createRequestHandler)({ build: server_build_exports, mode: "production" });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
