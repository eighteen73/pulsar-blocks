!function(){"use strict";var e,t={681:function(){var e=window.wp.blocks,t=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"pulsar/accordion","version":"0.1.0","title":"Accordion","category":"design","attributes":{"openMultiple":{"type":"boolean","default":true},"startOpen":{"type":"boolean","default":false},"level":{"type":"number","default":3},"hasSchema":{"type":"boolean","default":false}},"providesContext":{"level":"level"},"textdomain":"pulsar","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js","render":"file:./render.php"}'),n=window.wp.element,l=window.wp.blockEditor,o=window.wp.components,r=window.wp.data,c=window.wp.i18n,i=window.wp.primitives,a=(0,n.createElement)(i.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,n.createElement)(i.Path,{d:"M18 11.2h-5.2V6h-1.6v5.2H6v1.6h5.2V18h1.6v-5.2H18z"})),s=(0,window.wp.compose.compose)([(0,r.withSelect)(((e,t)=>({innerBlocks:e("core/block-editor").getBlock(t.clientId).innerBlocks}))),(0,r.withDispatch)(((t,n)=>({onClick(){const l=(0,e.createBlock)(n.allowedBlock);t("core/block-editor").insertBlock(l,n.innerBlocks.length,n.clientId)}})))])((({onClick:e,clientId:t,allowedBlock:l,innerBlocks:r,isSelected:c=!0,...i})=>{if(c)return(0,n.createElement)(o.Button,{onClick:e,...i})}));const p=["pulsar/accordion-item"];var d=(0,n.createElement)(o.SVG,{fill:"none",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24"},(0,n.createElement)(o.Path,{clipRule:"evenodd",d:"m19 7c0-.27614-.2239-.5-.5-.5h-13c-.27614 0-.5.22386-.5.5v4.5c0 .2761.22386.5.5.5h13c.2761 0 .5-.2239.5-.5zm-.125 10h-13.75c-.06904 0-.125.056-.125.125v1.75c0 .069.05596.125.125.125h13.75c.069 0 .125-.056.125-.125v-1.75c0-.069-.056-.125-.125-.125zm-13.75-13.5c-.89746 0-1.625.72754-1.625 1.625v6.75c0 .8975.72754 1.625 1.625 1.625h13.75c.8975 0 1.625-.7275 1.625-1.625v-6.75c0-.89746-.7275-1.625-1.625-1.625zm0 12c-.89746 0-1.625.7275-1.625 1.625v1.75c0 .8975.72754 1.625 1.625 1.625h13.75c.8975 0 1.625-.7275 1.625-1.625v-1.75c0-.8975-.7275-1.625-1.625-1.625z",fill:"currentColor",fillRule:"evenodd"}));const{name:u}=t;(0,e.registerBlockType)(u,{...t,icon:d,edit:function({attributes:{openMultiple:e,startOpen:t,level:i,hasSchema:d},setAttributes:u,clientId:h,isSelected:m}){const v=[["pulsar/accordion-item",{},[["core/paragraph",{placeholder:(0,c.__)("Add content…")}]]]],w=(0,r.useSelect)((e=>e("core/block-editor").hasSelectedInnerBlock(h,!0))),f=(0,l.useBlockProps)(),{children:g,..._}=(0,l.useInnerBlocksProps)(f,{orientation:"vertical",allowedBlocks:p,template:v,renderAppender:()=>(0,n.createElement)(s,{variant:"secondary",icon:a,iconPosition:"left",text:(0,c.__)("Add item"),allowedBlock:"pulsar/accordion-item",style:{width:"100%",justifyContent:"center"},clientId:h,isSelected:m||w})});return(0,n.createElement)("div",{..._},(0,n.createElement)(l.InspectorControls,{group:"settings"},(0,n.createElement)(o.PanelBody,{title:(0,c.__)("Settings")},(0,n.createElement)(o.ToggleControl,{label:(0,c.__)("Open multiple items"),help:(0,c.__)("Allow multiple items to be opened at once."),checked:e,onChange:e=>u({openMultiple:e})}),(0,n.createElement)(o.ToggleControl,{label:(0,c.__)("Start open"),help:(0,c.__)("Load the page with the first item already open."),checked:t,onChange:e=>u({startOpen:e})}),(0,n.createElement)(o.__experimentalToggleGroupControl,{label:(0,c.__)("Heading level"),onChange:e=>{u({level:e})},value:i,isBlock:!0,help:(0,c.__)("Set the appropriate heading level for your content.")},(0,n.createElement)(o.__experimentalToggleGroupControlOption,{value:2,label:(0,c.__)("H2")}),(0,n.createElement)(o.__experimentalToggleGroupControlOption,{value:3,label:(0,c.__)("H3")}),(0,n.createElement)(o.__experimentalToggleGroupControlOption,{value:4,label:(0,c.__)("H4")}))),(0,n.createElement)(o.PanelBody,{title:(0,c.__)("Schema settings")},(0,n.createElement)(o.ToggleControl,{label:(0,c.__)("Output schema for FAQs"),help:(0,c.__)("If the accordion will be used to display FAQs, then enable this option to display schema data for search engines."),checked:d,onChange:e=>u({hasSchema:e})}))),g)},save:()=>(0,n.createElement)(l.InnerBlocks.Content,null)})}},n={};function l(e){var o=n[e];if(void 0!==o)return o.exports;var r=n[e]={exports:{}};return t[e](r,r.exports,l),r.exports}l.m=t,e=[],l.O=function(t,n,o,r){if(!n){var c=1/0;for(p=0;p<e.length;p++){n=e[p][0],o=e[p][1],r=e[p][2];for(var i=!0,a=0;a<n.length;a++)(!1&r||c>=r)&&Object.keys(l.O).every((function(e){return l.O[e](n[a])}))?n.splice(a--,1):(i=!1,r<c&&(c=r));if(i){e.splice(p--,1);var s=o();void 0!==s&&(t=s)}}return t}r=r||0;for(var p=e.length;p>0&&e[p-1][2]>r;p--)e[p]=e[p-1];e[p]=[n,o,r]},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={166:0,82:0};l.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,r,c=n[0],i=n[1],a=n[2],s=0;if(c.some((function(t){return 0!==e[t]}))){for(o in i)l.o(i,o)&&(l.m[o]=i[o]);if(a)var p=a(l)}for(t&&t(n);s<c.length;s++)r=c[s],l.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return l.O(p)},n=self.webpackChunkcarousel=self.webpackChunkcarousel||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var o=l.O(void 0,[82],(function(){return l(681)}));o=l.O(o)}();