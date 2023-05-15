import{r as c}from"./index.ed373d49.js";const p=12;var u={exports:{}},i={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d=c,f=Symbol.for("react.element"),v=Symbol.for("react.fragment"),_=Object.prototype.hasOwnProperty,h=d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,b={key:!0,ref:!0,__self:!0,__source:!0};function x(n,e,l){var t,r={},o=null,a=null;l!==void 0&&(o=""+l),e.key!==void 0&&(o=""+e.key),e.ref!==void 0&&(a=e.ref);for(t in e)_.call(e,t)&&!b.hasOwnProperty(t)&&(r[t]=e[t]);if(n&&n.defaultProps)for(t in e=n.defaultProps,e)r[t]===void 0&&(r[t]=e[t]);return{$$typeof:f,type:n,key:o,ref:a,props:r,_owner:h.current}}i.Fragment=v;i.jsx=x;i.jsxs=x;u.exports=i;var s=u.exports;const y=()=>{const n=c.useId(),[e,l]=c.useState(1e4),t=`flagcount-${n}`,r="block pb-2",o="text-slate-500 font semibold",a=p*(e/1e4);return s.jsxs("div",{children:[s.jsxs("div",{"aria-live":"polite",className:"text-center pb-16",children:[s.jsxs("strong",{className:"text-7xl",children:["€",a]}),s.jsx("span",{className:"text-4xl text-slate-500",children:"/month"})]}),s.jsxs("div",{children:[s.jsxs("label",{htmlFor:t,className:r,children:[s.jsx("span",{className:o,children:"Flag evaluations/month*"}),s.jsx("span",{className:"block font-bold text-4xl",children:e})]}),s.jsx("input",{name:"evaluationCount",type:"range",min:1e4,step:1e4,max:8e4,id:t,value:e,onChange:m=>l(Number(m.target.value))})]})]})};export{y as PricingCalculator};
