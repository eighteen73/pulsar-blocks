(()=>{"use strict";var e,t={7853:()=>{const e=window.wp.blocks,t=window.React,l=window.wp.blockEditor,n=window.wp.components,c=window.wp.data,r=window.wp.element,o=window.wp.i18n,a=(0,window.wp.compose.compose)([(0,c.withSelect)(((e,t)=>({innerBlocks:e("core/block-editor").getBlock(t.clientId).innerBlocks}))),(0,c.withDispatch)(((t,l)=>({onClick(n){const c=(0,e.createBlock)(l.allowedBlock);t("core/block-editor").insertBlock(c,l.innerBlocks.length,l.clientId).then((()=>{n()}))}})))])((({onClick:e,onClickAfter:l,clientId:c,allowedBlock:r,innerBlocks:o,isEnabled:a=!0,...i})=>{if(a)return(0,t.createElement)(n.Button,{onClick:()=>e(l),...i})}));let i=e=>crypto.getRandomValues(new Uint8Array(e));const s=()=>((e,t=21)=>((e,t,l)=>{let n=(2<<Math.log(e.length-1)/Math.LN2)-1,c=-~(1.6*n*t/e.length);return(r=t)=>{let o="";for(;;){let t=l(c),a=c;for(;a--;)if(o+=e[t[a]&n]||"",o.length===r)return o}}})(e,t,i))("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",11)(),h="pulsar/tab";function m({clientId:e,isActiveTab:n,tabNumber:r,setActiveTab:o}){const{isTabBlockSelected:a,title:i}=(0,c.useSelect)((t=>{const{getBlock:n,hasSelectedInnerBlock:c,isBlockSelected:r}=t(l.store);return{isTabBlockSelected:r(e)||c(e,!0),title:n(e).attributes.title}}),[e]),{updateBlockAttributes:s}=(0,c.useDispatch)(l.store);return(0,t.createElement)("button",{className:"wp-block-pulsar-tabs__tab",id:`tab-${r}`,type:"button",role:"tab","aria-selected":a||n,"aria-controls":`tabpanel-${r}`,tabIndex:a||n?void 0:"-1",onClick:o},(0,t.createElement)(l.RichText,{tagName:"span",value:i,allowedFormats:[],onChange:t=>s(e,{title:t}),placeholder:`Tab ${r}`}))}function d({attributes:{id:e,activeTab:i,tabsCount:d,isVertical:u},clientId:w,setAttributes:p,isSelected:v}){const b=(0,l.useBlockProps)({className:u?"is-vertical":"is-horizontal"}),{children:k,...g}=(0,l.useInnerBlocksProps)(b,{orientation:"horizontal",renderAppender:!1}),{hasTabSelected:E,tabBlocks:f}=(0,c.useSelect)((e=>{const{getBlocks:t,hasSelectedInnerBlock:n}=e(l.store);return{tabBlocks:t(w),hasTabSelected:n(w,!0)}}),[w]),{__unstableMarkNextChangeAsNotPersistent:x}=(0,c.useDispatch)(l.store),B=[h];return(0,r.useEffect)((()=>{f.length<i&&(x(),p({activeTab:1})),f.length!==d&&(x(),p({tabsCount:f.length}))}),[i,p,f,d,x]),(0,r.useEffect)((()=>{e||p({id:s()})}),[e,p]),(0,t.createElement)(t.Fragment,null,(0,t.createElement)(l.InspectorControls,null,(0,t.createElement)(n.PanelBody,{title:(0,o.__)("Settings","pulsar-blocks")},(0,t.createElement)(n.PanelRow,null,(0,t.createElement)(n.ToggleControl,{label:(0,o.__)("Vertical","pulsar-blocks"),help:(0,o.__)("Display tabs vertically.","pulsar-blocks"),checked:u,onChange:e=>p({isVertical:e})})))),(0,t.createElement)("div",{...g},(0,t.createElement)("div",{className:"wp-block-pulsar-tabs__list",role:"tablist"},f.map(((e,l)=>{const n=l+1;return(0,t.createElement)(m,{key:e.clientId,clientId:e.clientId,isActiveTab:!E&&i===n,tabNumber:n,setActiveTab:p.bind(null,{activeTab:n})})}))),k,(0,t.createElement)(a,{onClickAfter:()=>{},variant:"secondary",text:(0,o.__)("Add tab","pulsar-blocks"),allowedBlock:B,style:{width:"100%",justifyContent:"center"},clientId:w,isEnabled:v||E})))}function u({clientId:a}){const i=(0,l.useBlockProps)(),[s,m]=(0,r.useState)(2),{title:d,icon:u}=(0,l.useBlockDisplayInformation)(a),{replaceInnerBlocks:w}=(0,c.useDispatch)(l.store);return(0,t.createElement)("div",{...i},(0,t.createElement)(n.Placeholder,{label:d,icon:(0,t.createElement)(l.BlockIcon,{icon:u,showColors:!0}),instructions:(0,o.__)("Insert tabs to organise content.","pulsar-blocks")},(0,t.createElement)("form",{onSubmit:function(t){t.preventDefault(),w(a,(0,e.createBlocksFromInnerBlocksTemplate)(function(e){const t=[];for(let l=0;l<e;l++)t.push([h]);return t}(s)),!0)}},(0,t.createElement)(n.TextControl,{__next40pxDefaultSize:!0,type:"number",label:(0,o.__)("Tabs count","pulsar-blocks"),min:"1",value:s,onChange:m}),(0,t.createElement)(n.Button,{__next40pxDefaultSize:!0,variant:"primary",type:"submit"},(0,o.__)("Create Tabs","pulsar-blocks")))))}const w=((0,t.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",fillRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:"2",clipRule:"evenodd",viewBox:"0 0 24 24"},(0,t.createElement)(n.Path,{d:"M18.003 19.399H5.931a.11.11 0 0 0-.11.11v1.537c0 .06.049.11.11.11h12.072a.11.11 0 0 0 .11-.11v-1.537a.11.11 0 0 0-.11-.11ZM5.931 18.082c-.788 0-1.427.639-1.427 1.427v1.537c0 .788.639 1.427 1.427 1.427h12.072c.789 0 1.427-.639 1.427-1.427v-1.537c0-.788-.638-1.427-1.427-1.427H5.931Z"}),(0,t.createElement)(n.Path,{fillRule:"nonzero",d:"M17.837 3.191v11.647H6.19V3.191h11.647Zm0-1.664H6.19c-.915 0-1.663.749-1.663 1.664v11.647c0 .915.748 1.663 1.663 1.663h11.647c.915 0 1.664-.748 1.664-1.663V3.191a1.67 1.67 0 0 0-1.664-1.664Z"}),(0,t.createElement)(n.Path,{fillRule:"nonzero",d:"m13.794 9.014-2.496 3.132-1.78-2.096-2.496 3.124h9.983l-3.211-4.16Z"}),(0,t.createElement)(n.Path,{d:"M7.022 6.519h9.983v.832H7.022zM7.022 4.855h9.983v.832H7.022z"}),(0,t.createElement)(n.Path,{fillRule:"nonzero",d:"M22.476 9.014 19.98 11.51V6.519l2.496 2.495ZM1.524 9.014 4.02 6.519v4.991L1.524 9.014Z"})),(0,t.createElement)(n.SVG,{className:"icon-carousel",width:"26px",height:"18px",viewBox:"0 0 26 18",version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},(0,t.createElement)(n.G,{strokeWidth:"1"},(0,t.createElement)(n.G,{transform:"translate(0.000000, -3.000000)"},(0,t.createElement)(n.Path,{d:"M20,5 L20,19 L6,19 L6,5 L20,5 L20,5 Z M20,3 L6,3 C4.9,3 4,3.9 4,5 L4,19 C4,20.1 4.9,21 6,21 L20,21 C21.1,21 22,20.1 22,19 L22,5 C22,3.9 21.1,3 20,3 Z",fillRule:"nonzero"}),(0,t.createElement)(n.Polygon,{fillRule:"nonzero",points:"15.14 12 12.14 15.7645914 10 13.2451362 7 17 19 17"}),(0,t.createElement)(n.Rect,{x:"7",y:"9",width:"12",height:"1"}),(0,t.createElement)(n.Rect,{x:"7",y:"7",width:"12",height:"1"}),(0,t.createElement)(n.Polygon,{transform:"translate(24.500000, 12.000000) rotate(-270.000000) translate(-24.500000, -12.000000) ",points:"24.5 10.5 27.5 13.5 21.5 13.5"}),(0,t.createElement)(n.Polygon,{transform:"translate(1.500000, 12.000000) rotate(-90.000000) translate(-1.500000, -12.000000) ",points:"1.5 10.5 4.5 13.5 -1.5 13.5"})))),(0,t.createElement)(n.SVG,{className:"icon-carousel-slide",width:"26px",height:"18px",viewBox:"0 0 26 18",version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},(0,t.createElement)(n.G,{strokeWidth:"1"},(0,t.createElement)(n.G,{transform:"translate(0.000000, -3.000000)"},(0,t.createElement)(n.Path,{d:"M20,5 L20,19 L6,19 L6,5 L20,5 L20,5 Z M20,3 L6,3 C4.9,3 4,3.9 4,5 L4,19 C4,20.1 4.9,21 6,21 L20,21 C21.1,21 22,20.1 22,19 L22,5 C22,3.9 21.1,3 20,3 Z",fillRule:"nonzero"}),(0,t.createElement)(n.Polygon,{fillRule:"nonzero",points:"15.14 12 12.14 15.7645914 10 13.2451362 7 17 19 17"}),(0,t.createElement)(n.Rect,{x:"7",y:"9",width:"12",height:"1"}),(0,t.createElement)(n.Rect,{x:"7",y:"7",width:"12",height:"1"})))),(0,t.createElement)(n.SVG,{fill:"none",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24"},(0,t.createElement)(n.Path,{clipRule:"evenodd",d:"m19 7c0-.27614-.2239-.5-.5-.5h-13c-.27614 0-.5.22386-.5.5v4.5c0 .2761.22386.5.5.5h13c.2761 0 .5-.2239.5-.5zm-.125 10h-13.75c-.06904 0-.125.056-.125.125v1.75c0 .069.05596.125.125.125h13.75c.069 0 .125-.056.125-.125v-1.75c0-.069-.056-.125-.125-.125zm-13.75-13.5c-.89746 0-1.625.72754-1.625 1.625v6.75c0 .8975.72754 1.625 1.625 1.625h13.75c.8975 0 1.625-.7275 1.625-1.625v-6.75c0-.89746-.7275-1.625-1.625-1.625zm0 12c-.89746 0-1.625.7275-1.625 1.625v1.75c0 .8975.72754 1.625 1.625 1.625h13.75c.8975 0 1.625-.7275 1.625-1.625v-1.75c0-.8975-.7275-1.625-1.625-1.625z",fill:"currentColor",fillRule:"evenodd"})),(0,t.createElement)(n.SVG,{fill:"none",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24"},(0,t.createElement)(n.Path,{d:"m19 9c0-.27614-.2239-.5-.5-.5h-13c-.27614 0-.5.22386-.5.5v7.5c0 .2761.22386.5.5.5h13c.2761 0 .5-.2239.5-.5zm-13.875-3.5c-.89746 0-1.625.72754-1.625 1.625v9.75c0 .8975.72754 1.625 1.625 1.625h13.75c.8975 0 1.625-.7275 1.625-1.625v-9.75c0-.89746-.7275-1.625-1.625-1.625z",fill:"currentColor",fillRule:"evenodd"})),(0,t.createElement)(n.SVG,{width:"24px",height:"24px",viewBox:"0 0 24 24",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},(0,t.createElement)(n.Path,{d:"M20,12 L4,12 L4,13.5 L20,13.5 L20,12 Z M10,6.5 L4,6.5 L4,8 L10,8 L10,6.5 Z M20,17.5 L4,17.5 L4,19 L20,19 L20,17.5 Z M20,5.62462724 L16.000015,9 L12,5.62462724 L12.9791165,4.5 L16.000015,7.04920972 L19.0208935,4.5 L20,5.62462724 Z"})),(0,t.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},(0,t.createElement)(n.Path,{d:"M6.4 12.1h11.2v1.5H6.4zM6.5 15.5h11.2V17H6.5z"}),(0,t.createElement)(n.Path,{d:"M23.2 4.5c0-2.1-1.7-3.7-3.7-3.7-1 0-2 .4-2.7 1.2-.3.3-.5.7-.7 1H5c-1.1 0-1.9.9-1.9 2v14c0 1.1.8 2 1.9 2h14.1c1.1 0 1.9-.9 1.9-1.9V7.9c1.3-.5 2.2-1.8 2.2-3.4zM19.5 19c0 .2-.2.4-.4.4H5c-.2 0-.4-.2-.4-.4V5c0-.2.2-.4.4-.4h10.8c0 2.1 1.7 3.7 3.7 3.7V19zm0-12.2c-1.2 0-2.2-1-2.2-2.2 0-.6.2-1.1.6-1.5.4-.5 1-.7 1.6-.7 1.2 0 2.2 1 2.2 2.2s-1 2.2-2.2 2.2z"})),(0,t.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 -960 960 960",width:"24px"},(0,t.createElement)(n.Path,{d:"M212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h535.38Q778-820 799-799q21 21 21 51.31v535.38Q820-182 799-161q-21 21-51.31 21H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-280H200v280q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM680-640q17 0 28.5-11.5T720-680q0-17-11.5-28.5T680-720H520q-17 0-28.5 11.5T480-680q0 17 11.5 28.5T520-640h160Z"})));(0,t.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"},(0,t.createElement)(n.Path,{d:"M19.409 13.946c-.524.524-1.173.786-1.947.786H6.536c-.774 0-1.422-.262-1.946-.786-.524-.523-.785-1.172-.785-1.946s.261-1.423.785-1.946c.524-.524 1.172-.785 1.946-.785h10.926c.774 0 1.423.261 1.947.785.523.523.785 1.172.785 1.946s-.262 1.423-.785 1.946Z"}),(0,t.createElement)(n.Path,{d:"M23.321 9.962c0-2.208-1.792-4-4-4H4.679c-2.208 0-4 1.792-4 4v4.076c0 2.208 1.792 4 4 4h14.642c2.208 0 4-1.792 4-4V9.962Zm-1.4 0v4.076c0 1.435-1.165 2.6-2.6 2.6H4.679a2.601 2.601 0 0 1-2.6-2.6V9.962c0-1.435 1.165-2.6 2.6-2.6h14.642c1.435 0 2.6 1.165 2.6 2.6Z"})),(0,e.registerBlockType)("pulsar/tabs",{edit:function(e){const n=(0,c.useSelect)((t=>t(l.store).getBlocks(e.clientId).length>0),[e.clientId])?d:u;return(0,t.createElement)(n,{...e})},save:()=>(0,t.createElement)(l.InnerBlocks.Content,null),icon:w})}},l={};function n(e){var c=l[e];if(void 0!==c)return c.exports;var r=l[e]={exports:{}};return t[e](r,r.exports,n),r.exports}n.m=t,e=[],n.O=(t,l,c,r)=>{if(!l){var o=1/0;for(h=0;h<e.length;h++){l=e[h][0],c=e[h][1],r=e[h][2];for(var a=!0,i=0;i<l.length;i++)(!1&r||o>=r)&&Object.keys(n.O).every((e=>n.O[e](l[i])))?l.splice(i--,1):(a=!1,r<o&&(o=r));if(a){e.splice(h--,1);var s=c();void 0!==s&&(t=s)}}return t}r=r||0;for(var h=e.length;h>0&&e[h-1][2]>r;h--)e[h]=e[h-1];e[h]=[l,c,r]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={68:0,370:0};n.O.j=t=>0===e[t];var t=(t,l)=>{var c,r,o=l[0],a=l[1],i=l[2],s=0;if(o.some((t=>0!==e[t]))){for(c in a)n.o(a,c)&&(n.m[c]=a[c]);if(i)var h=i(n)}for(t&&t(l);s<o.length;s++)r=o[s],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(h)},l=self.webpackChunkpulsar_blocks=self.webpackChunkpulsar_blocks||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var c=n.O(void 0,[370],(()=>n(7853)));c=n.O(c)})();