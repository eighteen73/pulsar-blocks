!function(){"use strict";var e,t={444:function(){function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(t,r,n){return(r=function(t){var r=function(t){if("object"!=e(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!=e(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==e(r)?r:r+""}(r))in t?Object.defineProperty(t,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[r]=n,t}var r=window.wp.blocks;function n(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(-1!==t.indexOf(n))continue;r[n]=e[n]}return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],-1===t.indexOf(r)&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var o=window.wp.blockEditor,l=window.wp.components,c=window.wp.data,i=window.wp.element,s=window.wp.i18n,a=window.wp.compose,u=window.ReactJSXRuntime;const p=["onClick","onClickAfter","clientId","allowedBlock","innerBlocks","isEnabled"];function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var f=(0,a.compose)([(0,c.withSelect)(((e,t)=>({innerBlocks:e("core/block-editor").getBlock(t.clientId).innerBlocks}))),(0,c.withDispatch)(((e,t)=>({onClick(n){const o=(0,r.createBlock)(t.allowedBlock);e("core/block-editor").insertBlock(o,t.innerBlocks.length,t.clientId).then((()=>{n()}))}})))])((e=>{let{onClick:r,onClickAfter:o,clientId:c,allowedBlock:i,innerBlocks:s,isEnabled:a=!0}=e,f=n(e,p);if(a)return(0,u.jsx)(l.Button,function(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?b(Object(n),!0).forEach((function(r){t(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({onClick:()=>r(o)},f))}));let d=e=>crypto.getRandomValues(new Uint8Array(e)),h=(e,t=21)=>((e,t,r)=>{let n=(2<<Math.log(e.length-1)/Math.LN2)-1,o=-~(1.6*n*t/e.length);return(l=t)=>{let c="";for(;;){let t=r(o),i=0|o;for(;i--;)if(c+=e[t[i]&n]||"",c.length===l)return c}}})(e,t,d);const y=["children"];function v(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function k(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?v(Object(n),!0).forEach((function(r){t(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function w({clientId:e,isActiveTab:t,tabNumber:r,setActiveTab:n}){const{isTabBlockSelected:l,title:i}=(0,c.useSelect)((t=>{const{getBlock:r,hasSelectedInnerBlock:n,isBlockSelected:l}=t(o.store);return{isTabBlockSelected:l(e)||n(e,!0),title:r(e).attributes.title}}),[e]),{updateBlockAttributes:s}=(0,c.useDispatch)(o.store);return(0,u.jsx)("button",{className:"wp-block-pulsar-tabs__tab",id:`tab-${r}`,type:"button",role:"tab","aria-selected":l||t,"aria-controls":`tabpanel-${r}`,tabIndex:l||t?void 0:"-1",onClick:n,children:(0,u.jsx)(o.RichText,{tagName:"span",value:i,allowedFormats:[],onChange:t=>s(e,{title:t}),placeholder:`Tab ${r}`})})}function g({attributes:{id:e,activeTab:t,tabsCount:r,isVertical:a,inQueryLoop:p},clientId:b,setAttributes:d,isSelected:v}){const{getBlockParentsByBlockName:g}=(0,c.useSelect)((e=>({getBlockParentsByBlockName:e(o.store).getBlockParentsByBlockName})),[]);(0,i.useEffect)((()=>{e||d({id:h("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",11)()})}),[e,d]),(0,i.useEffect)((()=>{const e=g(b,"core/query").length>0;d({inQueryLoop:e})}),[b,p,g,d]);const m=(0,o.useBlockProps)({className:a?"is-vertical":"is-horizontal"}),O=(0,o.useInnerBlocksProps)(m,{orientation:"horizontal",renderAppender:!1}),{children:j}=O,P=n(O,y),{hasTabSelected:x,tabBlocks:B}=(0,c.useSelect)((e=>{const{getBlocks:t,hasSelectedInnerBlock:r}=e(o.store);return{tabBlocks:t(b),hasTabSelected:r(b,!0)}}),[b]),{__unstableMarkNextChangeAsNotPersistent:S}=(0,c.useDispatch)(o.store);return(0,i.useEffect)((()=>{B.length<t&&(S(),d({activeTab:1})),B.length!==r&&(S(),d({tabsCount:B.length}))}),[t,d,B,r,S]),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(o.InspectorControls,{children:(0,u.jsx)(l.PanelBody,{title:(0,s.__)("Settings","pulsar-blocks"),children:(0,u.jsx)(l.PanelRow,{children:(0,u.jsx)(l.ToggleControl,{label:(0,s.__)("Vertical","pulsar-blocks"),help:(0,s.__)("Display tabs vertically.","pulsar-blocks"),checked:a,onChange:e=>d({isVertical:e})})})})}),(0,u.jsxs)("div",k(k({},P),{},{children:[(0,u.jsx)("div",{className:"wp-block-pulsar-tabs__list",role:"tablist",children:B.map(((e,r)=>{const n=r+1;return(0,u.jsx)(w,{clientId:e.clientId,isActiveTab:!x&&t===n,tabNumber:n,setActiveTab:d.bind(null,{activeTab:n})},e.clientId)}))}),j,(0,u.jsx)(f,{onClickAfter:()=>{},variant:"secondary",text:(0,s.__)("Add tab","pulsar-blocks"),allowedBlock:"pulsar/tab",style:{width:"100%",justifyContent:"center"},clientId:b,isEnabled:v||x})]}))]})}function m({clientId:e}){const t=(0,o.useBlockProps)(),[n,a]=(0,i.useState)(2),{title:p,icon:b}=(0,o.useBlockDisplayInformation)(e),{replaceInnerBlocks:f}=(0,c.useDispatch)(o.store);return(0,u.jsx)("div",k(k({},t),{},{children:(0,u.jsx)(l.Placeholder,{label:p,icon:(0,u.jsx)(o.BlockIcon,{icon:b,showColors:!0}),instructions:(0,s.__)("Insert tabs to organise content.","pulsar-blocks"),children:(0,u.jsxs)("form",{onSubmit:function(t){t.preventDefault(),f(e,(0,r.createBlocksFromInnerBlocksTemplate)(function(e){const t=[];for(let r=0;r<e;r++)t.push(["pulsar/tab"]);return t}(n)),!0)},children:[(0,u.jsx)(l.TextControl,{__next40pxDefaultSize:!0,type:"number",label:(0,s.__)("Tabs count","pulsar-blocks"),min:"1",value:n,onChange:a}),(0,u.jsx)(l.Button,{__next40pxDefaultSize:!0,variant:"primary",type:"submit",children:(0,s.__)("Create Tabs","pulsar-blocks")})]})})}))}var O=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"pulsar/tabs","version":"0.1.0","title":"Tabs","category":"widgets","icon":"welcome-widgets-menus","description":"Organise content using tabs.","example":{},"allowedBlocks":["pulsar/tab"],"attributes":{"id":{"type":"string"},"tabsCount":{"type":"number"},"activeTab":{"type":"number","default":1},"templateLock":{"type":["string","boolean"],"enum":["all","insert","contentOnly",false]},"isVertical":{"type":"boolean","default":false},"inQueryLoop":{"type":"boolean","default":false}},"usesContext":["postId","postType","queryId"],"providesContext":{"tabs/id":"id","tabs/activeTab":"activeTab"},"supports":{"anchor":true,"align":["wide","full"],"html":false,"interactivity":true},"variations":[{"name":"two-tabs","title":"Tabs","isDefault":true,"scope":["inserter"],"innerBlocks":[["pulsar/tab"],["pulsar/tab"]]}],"textdomain":"pulsar-blocks","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js","render":"file:./render.php"}');l.SVG,l.Path,l.Path,l.Path,l.Path,l.Path,l.SVG,l.G,l.G,l.Path,l.Polygon,l.Rect,l.Rect,l.Polygon,l.Polygon,l.SVG,l.G,l.G,l.Path,l.Polygon,l.Rect,l.Rect,l.SVG,l.Path,l.SVG,l.Path,l.SVG,l.Path,l.SVG,l.Path,l.Path,l.SVG,l.Path;const j=(0,u.jsx)(l.SVG,{xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 -960 960 960",width:"24px",children:(0,u.jsx)(l.Path,{d:"M212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h535.38Q778-820 799-799q21 21 21 51.31v535.38Q820-182 799-161q-21 21-51.31 21H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-280H200v280q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM680-640q17 0 28.5-11.5T720-680q0-17-11.5-28.5T680-720H520q-17 0-28.5 11.5T480-680q0 17 11.5 28.5T520-640h160Z"})});function P(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function x(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?P(Object(n),!0).forEach((function(r){t(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}l.SVG,l.Path,l.Path,(0,r.registerBlockType)(O.name,x(x({},O),{},{edit:function(e){const t=(0,c.useSelect)((t=>t(o.store).getBlocks(e.clientId).length>0),[e.clientId])?g:m;return(0,u.jsx)(t,k({},e))},save:()=>(0,u.jsx)(o.InnerBlocks.Content,{}),icon:j}))}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var l=r[e]={exports:{}};return t[e](l,l.exports,n),l.exports}n.m=t,e=[],n.O=function(t,r,o,l){if(!r){var c=1/0;for(u=0;u<e.length;u++){r=e[u][0],o=e[u][1],l=e[u][2];for(var i=!0,s=0;s<r.length;s++)(!1&l||c>=l)&&Object.keys(n.O).every((function(e){return n.O[e](r[s])}))?r.splice(s--,1):(i=!1,l<c&&(c=l));if(i){e.splice(u--,1);var a=o();void 0!==a&&(t=a)}}return t}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[r,o,l]},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={534:0,186:0};n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,l,c=r[0],i=r[1],s=r[2],a=0;if(c.some((function(t){return 0!==e[t]}))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(s)var u=s(n)}for(t&&t(r);a<c.length;a++)l=c[a],n.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return n.O(u)},r=self.webpackChunkpulsar_blocks=self.webpackChunkpulsar_blocks||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var o=n.O(void 0,[186],(function(){return n(444)}));o=n.O(o)}();