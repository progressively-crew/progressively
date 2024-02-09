/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, j as renderSlot, m as maybeRenderHead, h as addAttribute, k as renderHead } from '../astro_kRyFBomu.mjs';
import { $ as $$Image } from './generic_4iGCxdVM.mjs';

const $$Astro$o = createAstro();
const $$Button = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$o, $$props, $$slots);
  Astro2.self = $$Button;
  const { variant, size, href, id, target } = Astro2.props;
  const sizeStyles = {
    L: "py-3 px-9 text-xl border-2",
    S: "py-1 px-4 text-sm border",
    M: "py-2 px-6 text-base border"
  };
  const variantStyles = {
    primary: "bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white border-transparent",
    secondary: "border-slate-900 text-slate-900 hover:border-slate-800 hover:text-slate-800 active:border-slate-700 active:text-slate-700 hover:opacity-70 active:opacity-50",
    tertiary: "text-slate-900 hover:text-slate-800 active:text-slate-700 border-transparent hover:bg-slate-50 active:bg-slate-100"
  };
  const sharedStyles = "rounded-full ";
  const styles = `${sharedStyles} ${variantStyles[variant || "primary"]} ${sizeStyles[size || "L"]}`;
  const El = href ? "a" : "button";
  return renderTemplate`${renderComponent($$result, "El", El, { "class": styles, "href": href, "id": id, "target": target }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/components/Button.astro", void 0);

const $$Astro$n = createAstro();
const $$Twitter = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$n, $$props, $$slots);
  Astro2.self = $$Twitter;
  return renderTemplate`${maybeRenderHead()}<svg stroke="currentColor" height="12px" width="12px" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg>`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/components/Icons/Twitter.astro", void 0);

const $$Astro$m = createAstro();
const $$Github = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$Github;
  return renderTemplate`${maybeRenderHead()}<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" height="12px" width="12px" xmlns="http://www.w3.org/2000/svg"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/components/Icons/Github.astro", void 0);

const $$Astro$l = createAstro();
const $$Discord = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$Discord;
  return renderTemplate`${maybeRenderHead()}<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="12px" width="12px" xmlns="http://www.w3.org/2000/svg"><path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path></svg>`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/components/Icons/Discord.astro", void 0);

const $$Astro$k = createAstro();
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$Navbar;
  return renderTemplate`${maybeRenderHead()}<nav class="py-2 bg-white w-full"> <div class="px-4 max-w-6xl w-full mx-auto flex flex-row justify-between items-center overflow-auto"> <div class="flex flex-row gap-2 items-center shrink-0"> <img src="/favicon.svg" alt="Progressively" class="w-8 h-8 block"> <div class="font-bold text-lg hidden md:block">Progressively</div> </div> <ul class="flex flex-row justify-end gap-2 items-center shrink-0 border-r border-l border-slate-200 px-4"> <li class="hidden md:block"> <a href="https://www.producthunt.com/posts/progressively-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-progressively-2" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=432705&theme=light" alt="Progressively - Craft Key Features for Your Audience | Product Hunt" style="width: 138px; height: 30px;" width="138" height="30"></a> </li> <li class="shrink-0"> <a href="https://twitter.com/_progressively" target="_blank" class="hidden md:flex h-6 flex-row gap-2 text-xs font-bold text-white bg-slate-900 rounded-full items-center px-3 hover:bg-slate-800 active:bg-slate-700"> ${renderComponent($$result, "Twitter", $$Twitter, {})} <span>@_progressively</span> </a> <a href="https://twitter.com/_progressively" target="_blank" aria-label="Follow on X" class="md:hidden h-8 w-8 flex flex-row text-white bg-slate-900 rounded items-center justify-center active:bg-slate-700"> ${renderComponent($$result, "Twitter", $$Twitter, {})} </a> </li> <li class="shrink-0"> <a href="https://discord.gg/BcrsFRSA" target="_blank" class="text-white bg-indigo-700 hidden md:flex h-6 flex-row gap-2 text-xs font-bold text-slate-900 rounded-full items-center px-3 hover:bg-indigo-600 active:bg-indigo-500"> ${renderComponent($$result, "Discord", $$Discord, {})} <span>Discord</span> </a> <a href="https://github.com/progressively-crew/progressively" target="_blank" aria-label="Follow on X" class="md:hidden h-8 w-8 flex flex-row text-white text-white bg-indigo-700 rounded items-center justify-center active:bg-indigo-700"> ${renderComponent($$result, "Discord", $$Discord, {})} </a> </li> <li class="shrink-0"> <a href="https://github.com/progressively-crew/progressively" target="_blank" class="bg-slate-100 hidden md:flex h-6 flex-row gap-2 text-xs font-bold text-slate-900 rounded-full items-center px-3"> ${renderComponent($$result, "Github", $$Github, {})} <span>Github</span> </a> <a href="https://github.com/progressively-crew/progressively" target="_blank" aria-label="Follow on X" class="md:hidden h-8 w-8 flex flex-row text-white bg-slate-900 rounded items-center justify-center active:bg-slate-700"> ${renderComponent($$result, "Github", $$Github, {})} </a> </li> </ul> <ul class="flex flex-row justify-end gap-1 items-center shrink-0"> <li class="shrink-0"> ${renderComponent($$result, "Button", $$Button, { "variant": "tertiary", "size": "S", "href": "https://il6hw4vp4rl.typeform.com/to/Ben1G63r", "id": "contact-us" }, { "default": ($$result2) => renderTemplate`
Contact us
` })} </li> <li class="shrink-0"> ${renderComponent($$result, "Button", $$Button, { "variant": "tertiary", "size": "S", "href": "https://docs.progressively.app", "id": "nav-docs" }, { "default": ($$result2) => renderTemplate`
Docs
` })} </li> <li class="shrink-0"> ${renderComponent($$result, "Button", $$Button, { "variant": "secondary", "size": "S", "href": "https://docs.progressively.app/getting-started/", "id": "nav-getstarted" }, { "default": ($$result2) => renderTemplate`
Get started
` })} </li> </ul> </div> </nav>`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/components/Navbar.astro", void 0);

const $$Astro$j = createAstro();
const $$Banner = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$Banner;
  return renderTemplate`${maybeRenderHead()}<div class="text-center h-10 flex flex-row items-center justify-center px-4 bg-emerald-100 text-slate-900"> <div class="hidden" id="banner"> ${renderSlot($$result, $$slots["default"])} </div> </div>`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/components/Banner.astro", void 0);

const $$Astro$i = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description, keywords } = Astro2.props;
  const currentUrl = Astro2.url.toString();
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="keywords"${addAttribute(keywords, "content")}><meta name="viewport" content="width=device-width"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:url"${addAttribute(currentUrl, "content")}><meta property="og:image" content="/meta-img.png"><meta property="og:type" content="website"><meta property="og:description"${addAttribute(description, "content")}><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@_progressively"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image" content="/favicon.svg"><link rel="image_src" href="/meta-img.png"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="canonical"${addAttribute(currentUrl, "href")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> <header class="fixed top-0 z-20 w-full"> ${renderComponent($$result, "Banner", $$Banner, {}, { "default": ($$result2) => renderTemplate`
Thanks for your support on${" "}<a class="font-bold underline" href="https://www.producthunt.com/posts/progressively-2">
ProductHunt
</a>
! We've reached <strong>#7 of the day!</strong> 🥰
` })} ${renderComponent($$result, "Navbar", $$Navbar, {})} </header> ${renderSlot($$result, $$slots["default"])}  </body></html>`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/layouts/Layout.astro", void 0);

const $$Astro$h = createAstro();
const $$HeroBg = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$HeroBg;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" viewBox="0 0 1440 800" class="h-full w-full"> <g mask="url(&quot;#SvgjsMask1025&quot;)" fill="none"> <path d="M240.726,920.85C294.935,920.727,349.194,898.847,375.719,851.571C401.771,805.137,388.002,750.049,362.902,703.094C335.873,652.529,298.06,598.598,240.726,599.032C183.816,599.463,148.655,654.79,121.712,704.92C96.638,751.573,79.101,805.801,104.667,852.186C130.949,899.871,186.278,920.974,240.726,920.85" fill="rgba(241, 245, 249, 1)" class="triangle-float1"></path> <path d="M255.958,559.791C315.974,559.083,376.459,542.832,410.189,493.186C448.444,436.88,461.813,363.84,429.965,303.678C396.264,240.016,327.929,198.864,255.958,201.835C188.212,204.632,137.601,257.538,105.176,317.086C74.408,373.591,61.337,442.252,95.289,496.903C127.818,549.263,194.32,560.519,255.958,559.791" fill="rgba(241, 245, 249, 1)" class="triangle-float3"></path> <path d="M677.175,148.233C714.772,148.547,748.029,127.056,768.115,95.273C789.865,60.858,801.491,17.988,782.117,-17.819C761.975,-55.045,719.495,-73.534,677.175,-72.801C636.149,-72.09,597.576,-50.537,578.35,-14.288C560.175,19.98,568.673,60.634,588.826,93.777C608.09,125.458,640.098,147.924,677.175,148.233" fill="rgba(241, 245, 249, 1)" class="triangle-float2"></path> <path d="M880.517,511.773C928.561,513.275,961.781,468.378,983.947,425.727C1004.096,386.958,1010.801,341.242,988.748,303.524C966.881,266.124,923.824,250.029,880.517,248.829C834.592,247.557,783.313,256.858,761.375,297.225C740.022,336.516,766.007,380.495,787.717,419.59C810.405,460.445,833.808,510.312,880.517,511.773" fill="rgba(241, 245, 249, 1)" class="triangle-float3"></path> <path d="M793.944,643.763C828.264,642.981,855.643,619.45,873.793,590.311C893.326,558.952,909.736,520.013,890.774,488.305C872.102,457.082,830.273,454.862,793.944,456.792C761.721,458.504,730.621,470.418,713.434,497.728C695.06,526.923,690.875,563.893,707.529,594.102C724.72,625.285,758.345,644.575,793.944,643.763" fill="rgba(241, 245, 249, 1)" class="triangle-float1"></path> <path d="M1296.199,430.379C1358.381,429.669,1419.742,407.105,1452.827,354.451C1488.045,298.401,1490.966,227.945,1460.237,169.314C1427.134,106.154,1367.441,52.511,1296.199,55.601C1228.449,58.539,1187.244,122.845,1155.083,182.548C1125.11,238.191,1101.977,303.177,1133.25,358.1C1164.763,413.443,1232.517,431.106,1296.199,430.379" fill="rgba(241, 245, 249, 1)" class="triangle-float3"></path> <path d="M1130.78,489.543C1176.718,488.199,1214.391,454.872,1234.606,413.598C1252.528,377.004,1242.319,336.259,1223.573,300.08C1202.682,259.761,1176.187,213.737,1130.78,213.22C1084.902,212.698,1056.539,257.819,1034.252,297.924C1012.829,336.475,996.03,380.607,1015.872,419.996C1037.46,462.852,1082.815,490.946,1130.78,489.543" fill="rgba(241, 245, 249, 1)" class="triangle-float1"></path> <path d="M1467.404,650.809C1540.897,653.175,1613.909,619.209,1649.485,554.857C1684.104,492.237,1669.457,415.6,1630.686,355.461C1595.225,300.456,1532.849,272.607,1467.404,272.423C1401.596,272.238,1336.386,298.111,1302.52,354.536C1267.729,412.502,1271.676,484.681,1304.552,543.754C1338.411,604.594,1397.813,648.569,1467.404,650.809" fill="rgba(241, 245, 249, 1)" class="triangle-float1"></path> <path d="M431.766,788.969C477.33,791.015,530.068,788.228,552.932,748.763C575.828,709.242,550.893,662.766,527.663,623.441C504.994,585.066,476.241,546.56,431.766,543.649C382.873,540.448,334.341,566.016,311.34,609.28C289.46,650.436,302.137,699.947,328.086,738.667C351.007,772.868,390.636,787.122,431.766,788.969" fill="rgba(241, 245, 249, 1)" class="triangle-float2"></path> <path d="M408.103,480.037C438.623,480.094,465.467,461.974,481.194,435.818C497.468,408.754,502.251,375.69,487.699,347.663C471.99,317.409,442.192,295.025,408.103,295.046C374.046,295.067,344.317,317.509,328.679,347.763C314.235,375.707,319.288,408.578,335.481,435.546C351.144,461.632,377.676,479.98,408.103,480.037" fill="rgba(241, 245, 249, 1)" class="triangle-float1"></path> <path d="M1000.919,792.345C1029.081,794.326,1058.318,783.804,1072.834,759.59C1087.7,734.793,1085.14,702.751,1069.016,678.753C1054.479,657.116,1026.933,650.888,1000.919,652.554C978.007,654.021,957.852,666.694,946.418,686.603C935.032,706.428,934.153,730.247,944.627,750.569C956.101,772.83,975.937,790.587,1000.919,792.345" fill="rgba(241, 245, 249, 1)" class="triangle-float1"></path> <path d="M678.722,969.89C730.632,968.653,786.248,957.67,812.378,912.799C838.633,867.713,823.669,812.174,796.504,767.631C770.63,725.206,728.272,697.414,678.722,693.644C620.818,689.238,556.585,698.138,525.182,746.986C491.824,798.874,498.57,868.641,533.562,919.441C564.707,964.656,623.834,971.197,678.722,969.89" fill="rgba(241, 245, 249, 1)" class="triangle-float2"></path> </g> <defs> <mask id="SvgjsMask1025"> <rect width="1440" height="800" fill="#ffffff"></rect> </mask> <style>
      @keyframes float1 {
        0% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(-10px, 0);
        }
        100% {
          transform: translate(0, 0);
        }
      }

      .triangle-float1 {
        animation: float1 5s infinite;
      }

      @keyframes float2 {
        0% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(-5px, -5px);
        }
        100% {
          transform: translate(0, 0);
        }
      }

      .triangle-float2 {
        animation: float2 4s infinite;
      }

      @keyframes float3 {
        0% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(0, -10px);
        }
        100% {
          transform: translate(0, 0);
        }
      }

      .triangle-float3 {
        animation: float3 6s infinite;
      }
    </style> </defs> </svg>`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/components/HeroBg.astro", void 0);

const ffSrc = new Proxy({"src":"/_astro/ff.z3tmfTa3.png","width":1918,"height":1460,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							
							return target[name];
						}
					});

const aboveFoldSrc = new Proxy({"src":"/_astro/analytics.8JD1Y1-7.png","width":1918,"height":1460,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							
							return target[name];
						}
					});

const funnelsSrc = new Proxy({"src":"/_astro/funnels.cN-vrku1.png","width":1916,"height":1460,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							
							return target[name];
						}
					});

const $$Astro$g = createAstro();
const $$Title = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Title;
  const sizeStyles = {
    XL: "text-4xl md:text-6xl",
    L: "text-3xl md:text-5xl",
    M: "text-xl md:text-3xl",
    S: "text-base md:text-xl"
  };
  const themeColor = {
    light: "text-slate-900",
    dark: "text-slate-50"
  };
  const { size, tag: el, theme } = Astro2.props;
  const sharedStyle = "font-extrabold font-title";
  const styles = `${sharedStyle} ${themeColor[theme || "light"]} ${sizeStyles[size || "XL"]}`;
  const El = el || "p";
  return renderTemplate`${renderComponent($$result, "El", El, { "class": styles }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/components/Title.astro", void 0);

const $$Astro$f = createAstro();
const $$Text = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$Text;
  const sizeStyle = {
    M: "text-xs md:text-base",
    L: "text-base md:text-xl",
    XL: "text-base md:text-xl"
  };
  const themeColor = {
    light: "text-slate-600",
    dark: "text-slate-200"
  };
  const { size, theme } = Astro2.props;
  const sharedStyles = "leading-relaxed";
  const styles = `${sharedStyles} ${sizeStyle[size || "M"]}  ${themeColor[theme || "light"]}`;
  return renderTemplate`${maybeRenderHead()}<p${addAttribute(styles, "class")}>${renderSlot($$result, $$slots["default"])}</p>`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/components/Text.astro", void 0);

const $$Astro$e = createAstro();
const $$Browser = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Browser;
  return renderTemplate`${maybeRenderHead()}<div class="border border-slate-900 rounded-lg overflow-hidden"> <div class="flex flex-row justify-between items-center py-3 px-4 bg-slate-900"> <div class="flex flex-row items-center gap-1"> <div class="w-2 h-2 rounded-full bg-green-500"></div> <div class="w-2 h-2 rounded-full bg-yellow-500"></div> <div class="w-2 h-2 rounded-full bg-red-500"></div> </div> </div> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/components/Browser.astro", void 0);

const $$Astro$d = createAstro();
const $$AboveTheFold = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$AboveTheFold;
  return renderTemplate`${maybeRenderHead()}<div class="relative px-4 pt-48 md:pt-64 flex flex-col justify-center text-center"> <div class="max-w-2xl mx-auto relative z-10"> ${renderComponent($$result, "Title", $$Title, { "tag": "h1", "size": "XL" }, { "default": ($$result2) => renderTemplate`Craft Key Features for Your Audience` })} <div class="py-6"> ${renderComponent($$result, "Text", $$Text, { "size": "L" }, { "default": ($$result2) => renderTemplate`
The <strong>all in one toolbox for feature flags, analytics & A/B testing</strong>. <br>All that anonymously, Open Source & self-hosted.
` })} </div> <div class="pt-2 flex flex-col md:flex-row md:gap-6 w-full justify-center items-center"> ${renderComponent($$result, "Button", $$Button, { "href": "https://app.cal.com/mfrachet/30min", "id": "above-the-fold-get-in-touch" }, { "default": ($$result2) => renderTemplate`
Get in touch
` })} ${renderComponent($$result, "Button", $$Button, { "href": "https://docs.progressively.app", "id": "above-the-fold-cta", "variant": "secondary" }, { "default": ($$result2) => renderTemplate`
Get me to the setup
` })} </div> </div> <div class="relative z-10 max-w-7xl mx-auto py-12"> <div class="grid md:grid-cols-3 gap-2 md:gap-8"> <div class="motion-safe:opacity-0 motion-safe:animate-fade-enter-bottom" style="animation-delay: 0.3s;"> ${renderComponent($$result, "Browser", $$Browser, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Image", $$Image, { "src": ffSrc, "alt": "Feature flags of progressively.app" })} ` })} ${renderComponent($$result, "Text", $$Text, {}, { "default": ($$result2) => renderTemplate`<strong>Feature flags</strong>` })} </div> <div class="motion-safe:opacity-0 motion-safe:animate-fade-enter-bottom" style="animation-delay: 0.6s;"> ${renderComponent($$result, "Browser", $$Browser, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Image", $$Image, { "src": aboveFoldSrc, "alt": "Analytics view of progressively.app" })} ` })} ${renderComponent($$result, "Text", $$Text, {}, { "default": ($$result2) => renderTemplate`<strong>Private Analytics</strong>` })} </div> <div class="motion-safe:opacity-0 motion-safe:animate-fade-enter-bottom" style="animation-delay: 0.9s;"> ${renderComponent($$result, "Browser", $$Browser, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Image", $$Image, { "src": funnelsSrc, "alt": "Funnels of progressively.app" })} ` })} ${renderComponent($$result, "Text", $$Text, {}, { "default": ($$result2) => renderTemplate`<strong>Funnels</strong>` })} </div> </div> </div> <div class="absolute inset-0 w-full h-full hidden md:block"> ${renderComponent($$result, "HeroBg", $$HeroBg, {})} </div> </div>`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/sections/AboveTheFold.astro", void 0);

const $$Astro$c = createAstro();
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Card;
  const variantStyles = {
    success: "bg-gradient-to-b from-emerald-100 to-emerald-50",
    default: "bg-white",
    dark: "bg-slate-800"
  };
  const { variant } = Astro2.props;
  const sharedStyles = "rounded-2xl shadow-lg p-4";
  const styles = `${sharedStyles} ${variantStyles[variant || "default"]}`;
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(styles, "class")}> ${renderSlot($$result, $$slots["default"])} </article>`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/components/Card/Card.astro", void 0);

const $$Astro$b = createAstro();
const $$CardTitle = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$CardTitle;
  const { theme } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="pb-2"> ${renderComponent($$result, "Title", $$Title, { "tag": "h3", "size": "S", "theme": theme }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })} </div>`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/components/Card/CardTitle.astro", void 0);

const $$Astro$a = createAstro();
const $$Cta = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Cta;
  const { title, actionTxt, href, actionId } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Card", $$Card, { "variant": "success" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="p-2 md:p-12"> ${renderSlot($$result2, $$slots["default"])} <div class="pt-16 md:pt-8 max-w-2xl text-center md:text-left"> ${renderComponent($$result2, "Title", $$Title, { "tag": "h2", "size": "L" }, { "default": ($$result3) => renderTemplate`${title}` })} <div class="py-8 md:pt-12 md:pb-0"> ${renderComponent($$result2, "Button", $$Button, { "variant": "secondary", "href": href, "id": actionId }, { "default": ($$result3) => renderTemplate`${actionTxt}` })} </div> </div> </div> ` })}`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/components/Cta.astro", void 0);

const $$Astro$9 = createAstro();
const $$QuoteMark = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$QuoteMark;
  return renderTemplate`${maybeRenderHead()}<svg class="h-12 text-emerald-300" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"></path> </svg>`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/components/Quote/QuoteMark.astro", void 0);

const $$Astro$8 = createAstro();
const $$Quote = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Quote;
  const { authorJob, authorName, authorPict } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<figure class="flex flex-col lg:flex-row gap-4 md:gap-8"> <blockquote class="flex-1 shrink-0"> ${renderComponent($$result, "Card", $$Card, {}, { "default": ($$result2) => renderTemplate` <div class="p-6"> ${renderComponent($$result2, "QuoteMark", $$QuoteMark, {})} ${renderSlot($$result2, $$slots["default"])} <div class="flex items-end rotate-180"> ${renderComponent($$result2, "QuoteMark", $$QuoteMark, {})} </div> </div> ` })} </blockquote> <figcaption class="flex justify-center mt-2 md:mt-6 gap-4"> <img class="h-12 w-12 md:w-32 md:h-32 rounded-full object-cover border-4 border-white"${addAttribute(authorPict, "src")}${addAttribute(authorName, "alt")}> <div class=""> <div class="text-slate-900 text-xl md:text-3xl font-semibold"> ${authorName} </div> <div class="text-slate-700 text-base md:text-xl"> ${authorJob} </div> </div> </figcaption> </figure>`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/components/Quote/Quote.astro", void 0);

const $$Astro$7 = createAstro();
const $$Relevance = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Relevance;
  const whatProgressivelyBrings = [
    {
      title: "You want to ship faster",
      content: "Timely delivery is challenging, especially when deploying code and rolling out features are intertwined complexities."
    },
    {
      title: "You don't want your data to be stored somewhere else",
      content: "Securing data in unknown realms raises concerns. Privacy matters."
    },
    {
      title: "You don't want an overly complicated solution.",
      content: "Not everyone needs a tool with 1 billion charts. Embrace simplicity."
    },
    {
      title: "You don't want to multiply your tooling",
      content: "Juggling 20+ tools in a daily job is a hassle. Minimize context and experience switching."
    },
    {
      title: "You don't have time to build your own solution",
      content: "Building your own applications is your priority. We couldn't agree more."
    },
    {
      title: "You want to be part of a community",
      content: "Engaging in a community means influencing both the tool and the people involved."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="bg-slate-100 px-4"> <div class="max-w-6xl w-full mx-auto py-12"> <div class="text-center"> ${renderComponent($$result, "Title", $$Title, { "tag": "h2", "size": "L" }, { "default": ($$result2) => renderTemplate`Who is Progressively for?` })} <div class="pt-2"> ${renderComponent($$result, "Text", $$Text, {}, { "default": ($$result2) => renderTemplate`
No matter if you are a small team or a big company, <strong>Progressively</strong> can help if...
` })} </div> </div> <div class="grid md:grid-cols-3 pt-6 pb-12 gap-4 md:gap-8"> ${whatProgressivelyBrings.map((wpb) => renderTemplate`${renderComponent($$result, "Card", $$Card, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardTitle", $$CardTitle, {}, { "default": ($$result3) => renderTemplate`${wpb.title}` })} ${renderComponent($$result2, "Text", $$Text, {}, { "default": ($$result3) => renderTemplate`${wpb.content}` })} ` })}`)} </div> ${renderComponent($$result, "Cta", $$Cta, { "title": "Join the journey, set up your instance.", "actionTxt": "Get started", "href": "https://docs.progressively.app", "actionId": "relevance-cta" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Quote", $$Quote, { "authorName": "Marvin Frachet", "authorJob": "Frontend Eng @Proton", "authorPict": "https://avatars.githubusercontent.com/u/3874873?v=4" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Text", $$Text, { "size": "XL" }, { "default": ($$result4) => renderTemplate`
When creating Progressively, my goal was an easy-to-use feature flags
          tool for developers and product teams.
` })} <br> ${renderComponent($$result3, "Text", $$Text, { "size": "XL" }, { "default": ($$result4) => renderTemplate`
In the process, I discovered the synergy of <strong>feature flags, A/B tests, and analytics</strong>. I'm now certain its future lies in <strong>delivering meaningful data</strong> for informed feature shipping decisions.
` })} ` })} ` })} </div> </section>`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/sections/Relevance.astro", void 0);

const $$Astro$6 = createAstro();
const $$Feature = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Feature;
  const { title, reversed, imageSrc, noSizeConstraints } = Astro2.props;
  const styles = `flex items-center justify-center ${reversed ? "md:order-last" : "md:order-first"}`;
  return renderTemplate`${maybeRenderHead()}<article class="grid md:grid-cols-[1fr_1fr] items-center"> <div> ${renderComponent($$result, "Title", $$Title, { "tag": "h3", "size": "M" }, { "default": ($$result2) => renderTemplate`${title}` })} <div class="h-4"></div> ${renderSlot($$result, $$slots["default"])} </div> <div${addAttribute(styles, "class")}> ${renderComponent($$result, "Image", $$Image, { "src": imageSrc, "alt": "", "class": noSizeConstraints ? "" : "md:w-96" })} </div> </article>`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/components/Feature.astro", void 0);

const toggleSrc = new Proxy({"src":"/_astro/toggle.ZNnBP_iC.jpg","width":2000,"height":2000,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							
							return target[name];
						}
					});

const gradualSrc = new Proxy({"src":"/_astro/gradual.fU0Ik3wI.jpg","width":8000,"height":4602,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							
							return target[name];
						}
					});

const qaSrc = new Proxy({"src":"/_astro/qa.v1Pnp_gm.jpg","width":4793,"height":3751,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							
							return target[name];
						}
					});

const clockSrc = new Proxy({"src":"/_astro/clock.EfL3wEDX.jpg","width":3000,"height":2000,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							
							return target[name];
						}
					});

const analyticsSrc = new Proxy({"src":"/_astro/analytics.wqsgOYIR.jpg","width":6000,"height":4000,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							
							return target[name];
						}
					});

const $$Astro$5 = createAstro();
const $$Value = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Value;
  const features = [
    {
      title: "Instant feature deployments",
      content: [
        "With a straightforward activation, gradually reveals concealed features to users.",
        "Experience issues with your new feature? Toggle the activation in the opposite direction to disable it."
      ],
      imageSrc: toggleSrc
    },
    {
      title: "Gradual deployments",
      content: [
        "Hesitant about unveiling your latest feature? Dip your toe in the water by introducing it to just 1% or 2% of your audience.",
        "If your error tracking system raises an alarm, swiftly deactivate the feature and proceed with your release plan, taking it one step at a time."
      ],
      imageSrc: gradualSrc
    },
    {
      title: "Scheduled deployments",
      content: [
        "Getting ready for a product or feature launch is a mammoth undertaking, often bound by time constraints.",
        "To lighten your load and avoid adding another item to your pre-release checklist, consider scheduling the release deployments \u2013 one less box to check off your list."
      ],
      imageSrc: clockSrc
    },
    {
      title: "QA directly in production",
      content: [
        "Skip the hassle of intermediate staging environments that deviate from your production setup. Opt for a smarter approach by concealing your features with a feature flag, directing them to users based on qualitative criteria.",
        "For example, grant access to the feature for users with email addresses ending in X. Rest assured, we prioritize your privacy \u2013 no storing of user data."
      ],
      imageSrc: qaSrc
    },
    {
      title: "Privacy-Focused Analytics",
      content: [
        "In the journey of scaling a product or business, the compass is set by insightful data, guiding decisions with purpose.",
        "Within this narrative, the threads of feature flags, A/B testing, and analytics are tightly woven, with the promise of responsibly built-in progress shaping each step of the tale."
      ],
      imageSrc: analyticsSrc
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="max-w-6xl w-full mx-auto py-12 px-4"> <div class="text-center"> ${renderComponent($$result, "Title", $$Title, { "tag": "h2", "size": "L" }, { "default": ($$result2) => renderTemplate`What can you expect from it?` })} </div> <ul class="pt-8 md:pt-12 flex flex-col gap-12 pb-8"> ${features.map((feat, i) => renderTemplate`<li> ${renderComponent($$result, "Feature", $$Feature, { "title": feat.title, "imageSrc": feat.imageSrc, "reversed": i % 2 !== 0 }, { "default": ($$result2) => renderTemplate` <div class="flex flex-col gap-4"> ${feat.content.map((c) => renderTemplate`${renderComponent($$result2, "Text", $$Text, { "size": "L" }, { "default": ($$result3) => renderTemplate`${c}` })}`)} </div> ` })} </li>`)} </ul> <div class="text-center py-4 bg-slate-100 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-center"> ${renderComponent($$result, "Title", $$Title, { "size": "S", "tag": "p" }, { "default": ($$result2) => renderTemplate`Not sure it's for you?` })} <div class="flex flex-col md:flex-row gap-4"> ${renderComponent($$result, "Button", $$Button, { "href": "https://app.cal.com/mfrachet/30min", "variant": "secondary", "id": "value-cta-schedule" }, { "default": ($$result2) => renderTemplate`
Let's discuss
` })} ${renderComponent($$result, "Button", $$Button, { "href": "https://il6hw4vp4rl.typeform.com/to/Ben1G63r", "variant": "secondary", "id": "value-cta-contact" }, { "default": ($$result2) => renderTemplate`
Contact us
` })} </div> </div> </section>`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/sections/Value.astro", void 0);

const $$Astro$4 = createAstro();
const $$DifferenciatorBg = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$DifferenciatorBg;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" viewBox="0 0 1440 800"> <g mask="url(&quot;#SvgjsMask1014&quot;)" fill="none"> <path d="M79.99999999999997-53.33333333333335L-53.333333333333314 186.6666666666667 186.6666666666667 186.66666666666666z" fill="rgba(30, 41, 59, 1)" class="triangle-float1"></path> <path d="M252.25978347233357 156.69499692692023L166.2514755814615-67.36430543240823 28.20048111300511 242.7033048177923z" fill="rgba(30, 41, 59, 1)" class="triangle-float3"></path> <path d="M217.90337916493144 39.93904348227072L119.3975431128261-86.14267709480481-20.47211972673449 124.65693727189097z" fill="rgba(30, 41, 59, 1)" class="triangle-float1"></path> <path d="M1369.5207482857484-63.28844187268436L1217.3517056785238-13.845722772692767 1367.6003056321235 189.6864815881483z" fill="rgba(30, 41, 59, 1)" class="triangle-float2"></path> <path d="M1434.5590537960995 190.53834300733888L1410.8910999704592-82.98972820197073 1211.9220825572493 51.21656863100853z" fill="rgba(30, 41, 59, 1)" class="triangle-float2"></path> <path d="M1381.972929542697-61.91339820303752L1226.0737191770595-25.92122950801913 1358.011577402406 189.93150169292812z" fill="rgba(30, 41, 59, 1)" class="triangle-float1"></path> <path d="M223.43277831762396 727.0185701043425L171.34187360447882 575.7355980084519-29.53713218278463 729.5134411261149z" fill="rgba(30, 41, 59, 1)" class="triangle-float1"></path> <path d="M209.2881947682899 782.5042791797406L220.4492305673499 622.8940311381687-24.546659394537954 685.9576014603647z" fill="rgba(30, 41, 59, 1)" class="triangle-float1"></path> <path d="M206.8075355060205 761.2022659166596L19.756237511843267 560.2306517606518-54.40784113814411 788.4842156714886z" fill="rgba(30, 41, 59, 1)" class="triangle-float3"></path> <path d="M1173.2732622400877 693.7572684139674L1317.7088677965792 885.4297908253177 1364.9457846514379 549.3216628574758z" fill="rgba(30, 41, 59, 1)" class="triangle-float3"></path> <path d="M1222.0966208350685 760.0609565177293L1320.602456887174 886.1426770948049 1460.4721197267345 675.3430627281089z" fill="rgba(30, 41, 59, 1)" class="triangle-float1"></path> <path d="M1548.1024812284372 733.1534068309686L1390.6483142707154 552.0231075775033 1366.972181974972 890.6075737886904z" fill="rgba(30, 41, 59, 1)" class="triangle-float1"></path> </g> <defs> <mask id="SvgjsMask1014"> <rect width="1440" height="800" fill="#ffffff"></rect> </mask> <style>
      @keyframes float1 {
        0% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(-10px, 0);
        }
        100% {
          transform: translate(0, 0);
        }
      }

      .triangle-float1 {
        animation: float1 5s infinite;
      }

      @keyframes float2 {
        0% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(-5px, -5px);
        }
        100% {
          transform: translate(0, 0);
        }
      }

      .triangle-float2 {
        animation: float2 4s infinite;
      }

      @keyframes float3 {
        0% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(0, -10px);
        }
        100% {
          transform: translate(0, 0);
        }
      }

      .triangle-float3 {
        animation: float3 6s infinite;
      }
    </style> </defs> </svg>`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/components/DifferenciatorBg.astro", void 0);

const $$Astro$3 = createAstro();
const $$Differenciator = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Differenciator;
  const differentators = [
    {
      title: "Open Source",
      content: "We're all about community spirit. We're not just building the tool on our end; we're building it with you."
    },
    {
      title: "Self-hosted",
      content: "You grab the tool, install it on your machines, store data in your databases. We remain in the dark :).You get the tool and install it on your machines. Your store data on your databases. We know nothing :)."
    },
    {
      title: "Privacy matters",
      content: "We don't store any info about your audience. A cookie recognizes users on return visits, but identification remains elusive."
    },
    {
      title: "Server Side Rendering",
      content: "Compatible with your beloved tools like Next.js, Remix, etc., on both client and server sides."
    },
    {
      title: "The web library is small",
      content: "No impact on your webpage's performance, unlike other tools. For example, the React SDK is just 1.3kB."
    },
    {
      title: "Realtime updates",
      content: "It utilizes Websockets (optional) for real-time updates of user feature flags."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="bg-slate-900 relative overflow-hidden px-4"> <div class="max-w-6xl w-full mx-auto py-24 relative z-10"> ${renderComponent($$result, "Title", $$Title, { "theme": "dark", "tag": "h2", "size": "L" }, { "default": ($$result2) => renderTemplate`Why choose Progressively?` })} <div class="pt-2"> ${renderComponent($$result, "Text", $$Text, { "theme": "dark" }, { "default": ($$result2) => renderTemplate`
If you share the following values and ideas, you should give <strong>Progressively</strong> a try.
` })} </div> <div class="grid md:grid-cols-3 pt-6 gap-4 md:gap-8"> ${differentators.map((diff) => renderTemplate`${renderComponent($$result, "Card", $$Card, { "variant": "dark" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardTitle", $$CardTitle, { "theme": "dark" }, { "default": ($$result3) => renderTemplate`${diff.title}` })} ${renderComponent($$result2, "Text", $$Text, { "theme": "dark" }, { "default": ($$result3) => renderTemplate`${diff.content}` })} ` })}`)} </div> </div> <div class="absolute inset-0 w-full h-full"> ${renderComponent($$result, "DifferenciatorBg", $$DifferenciatorBg, {})} </div> </section>`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/sections/Differenciator.astro", void 0);

const welcomeSrc = new Proxy({"src":"/_astro/welcome.lgLdFuuD.png","width":1920,"height":1440,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							
							return target[name];
						}
					});

const reactSrc = new Proxy({"src":"/_astro/react.nHn5mZr8.png","width":1920,"height":1352,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							
							return target[name];
						}
					});

const audienceSrc = new Proxy({"src":"/_astro/audience.oVf2ngDS.png","width":1920,"height":1440,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							
							return target[name];
						}
					});

const mfrachetSrc = new Proxy({"src":"/_astro/mfrachet.0gI3BNty.png","width":1920,"height":1440,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							
							return target[name];
						}
					});

const $$Astro$2 = createAstro();
const $$HowItWorks = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$HowItWorks;
  const howItWorks = [
    {
      title: "1. You setup your instance",
      imageSrc: welcomeSrc,
      content: [
        "At the outset, as Progressively is self-hosted, the initial step is setting up the tool.",
        "By following the get-started guide, you'll set up the dashboard, APIs, and database.",
        "Once done, you can create your admin user."
      ],
      ctaTitle: "Deploy an instance",
      ctaLink: "https://docs.progressively.app/guides/deployments/"
    },
    {
      title: "2. Configure your first feature flag",
      imageSrc: audienceSrc,
      content: [
        "After getting your instance up and running, dive in to create a project, set up environments, and craft your inaugural feature flag.",
        "Take a moment to tailor how your feature flag behaves, experiment with scheduling updates, and explore the dashboard."
      ]
    },
    {
      title: "3. Choose a SDK",
      imageSrc: reactSrc,
      content: [
        "Now, let's configure your codebase.",
        "Select an available SDK, install it, configure it, and deploy your project.",
        "Once a feature flag is assessed, track it through the insights panel."
      ],
      ctaTitle: "Check the React SDK",
      ctaLink: "https://docs.progressively.app/sdks/sdk-react/"
    },
    {
      title: "5. Your users will access your website",
      imageSrc: mfrachetSrc,
      content: [
        "As your users land on your webpage, the feature flag evaluation kicks off.",
        "This process checks user fields (provided by you), computes them against the feature flag rules, and ultimately determines a value.",
        "Based on this value, the UI adapts to display the intended variant."
      ]
    },
    {
      title: "5. Enjoy your insights",
      imageSrc: aboveFoldSrc,
      content: [
        "With that completed, you're all set and geared up to create incredible features and comprehend your audience's behavior."
      ]
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="bg-slate-100 px-4"> <div class="max-w-6xl w-full mx-auto py-12"> <div class="text-center pb-8 md:pb-12"> ${renderComponent($$result, "Title", $$Title, { "tag": "h2", "size": "L" }, { "default": ($$result2) => renderTemplate`How it works?` })} </div> ${renderComponent($$result, "Card", $$Card, {}, { "default": ($$result2) => renderTemplate` <ul class="px-6 flex flex-col"> ${howItWorks.map((feat, i) => renderTemplate`<li> ${renderComponent($$result2, "Feature", $$Feature, { "title": feat.title, "imageSrc": feat.imageSrc, "reversed": i % 2 !== 0, "noSizeConstraints": true }, { "default": ($$result3) => renderTemplate` <div> <div class="flex flex-col gap-4"> ${feat.content.map((c) => renderTemplate`${renderComponent($$result3, "Text", $$Text, { "size": "L" }, { "default": ($$result4) => renderTemplate`${c}` })}`)} </div> ${feat.ctaLink && renderTemplate`<div class="pt-8"> ${renderComponent($$result3, "Button", $$Button, { "size": "M", "href": feat.ctaLink, "variant": "secondary", "target": "_blank", "id": feat.ctaTitle }, { "default": ($$result4) => renderTemplate`${feat.ctaTitle}` })} </div>`} </div> ` })} </li>`)} </ul> ` })} </div> </section>`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/sections/HowItWorks.astro", void 0);

const $$Astro$1 = createAstro();
const $$Conclusion = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Conclusion;
  return renderTemplate`${maybeRenderHead()}<section class="bg-slate-100"> <div class="max-w-6xl w-full mx-auto pb-20"> <h2 class="sr-only">Conclusion</h2> ${renderComponent($$result, "Cta", $$Cta, { "title": "Join the journey, set up your instance.", "actionTxt": "Get started", "href": "https://docs.progressively.app", "actionId": "conclusion-cta" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Quote", $$Quote, { "authorName": "Marvin Frachet", "authorJob": "Frontend Eng @Proton", "authorPict": "https://avatars.githubusercontent.com/u/3874873?v=4" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Text", $$Text, { "size": "XL" }, { "default": ($$result4) => renderTemplate`
Thanks a bunch for making it to the end of the page, and here's my
          final shot at convincing you to click that big button
` })} <br> ${renderComponent($$result3, "Text", $$Text, { "size": "XL" }, { "default": ($$result4) => renderTemplate`
If you're not quite as excited about the product yet, I'd love to hear
          your thoughts! Feel free to share why on <a class="font-semibold border-b border-slate-900" href="https://il6hw4vp4rl.typeform.com/to/Ben1G63r">this form</a>. Cheers!
` })} ` })} ` })} </div> </section>`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/sections/Conclusion.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to Progressively, the next-gen feature flag solution.", "description": "Progressively makes it possible to build your features iteratively and to understand how your audience behaves when being exposed to them. Take decision based on data and not guts feelings.", "keywords": "feature flags, feature toggles, feature flipping, privacy, analytics, trunk based development, react, server side rendering, delivery, deployment" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "AboveTheFold", $$AboveTheFold, {})} ${renderComponent($$result2, "Relevance", $$Relevance, {})} ${renderComponent($$result2, "Value", $$Value, {})} ${renderComponent($$result2, "Differentiator", $$Differenciator, {})} ${renderComponent($$result2, "HowItWorks", $$HowItWorks, {})} ${renderComponent($$result2, "Conclusion", $$Conclusion, {})} </main> ` })}`;
}, "/Users/marvin/soft/progressively/websites/marketing/src/pages/index.astro", void 0);

const $$file = "/Users/marvin/soft/progressively/websites/marketing/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
