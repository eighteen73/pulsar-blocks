(()=>{"use strict";var e,t={290:()=>{const e=window.wp.blocks,t=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"pulsar/accordion","version":"0.1.0","title":"Accordion","category":"design","attributes":{"openMultiple":{"type":"boolean","default":true},"startOpen":{"type":"boolean","default":false},"level":{"type":"number","default":3},"hasSchema":{"type":"boolean","default":false}},"providesContext":{"level":"level"},"textdomain":"pulsar-blocks","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js","render":"file:./render.php"}'),l=window.React,n=window.wp.blockEditor,o=window.wp.components,r=window.wp.data,c=window.wp.i18n,a=window.wp.primitives,i=(0,l.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,l.createElement)(a.Path,{d:"M18 11.2h-5.2V6h-1.6v5.2H6v1.6h5.2V18h1.6v-5.2H18z"})),s=(0,window.wp.compose.compose)([(0,r.withSelect)(((e,t)=>({innerBlocks:e("core/block-editor").getBlock(t.clientId).innerBlocks}))),(0,r.withDispatch)(((t,l)=>({onClick(n){const o=(0,e.createBlock)(l.allowedBlock);t("core/block-editor").insertBlock(o,l.innerBlocks.length,l.clientId).then((()=>{n()}))}})))])((({onClick:e,onClickAfter:t,clientId:n,allowedBlock:r,innerBlocks:c,isEnabled:a=!0,...i})=>{if(a)return(0,l.createElement)(o.Button,{onClick:()=>e(t),...i})})),p=["pulsar/accordion-item"],h=((0,l.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",fillRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:"2",clipRule:"evenodd",viewBox:"0 0 24 24"},(0,l.createElement)(o.Path,{d:"M18.003 19.399H5.931a.11.11 0 0 0-.11.11v1.537c0 .06.049.11.11.11h12.072a.11.11 0 0 0 .11-.11v-1.537a.11.11 0 0 0-.11-.11ZM5.931 18.082c-.788 0-1.427.639-1.427 1.427v1.537c0 .788.639 1.427 1.427 1.427h12.072c.789 0 1.427-.639 1.427-1.427v-1.537c0-.788-.638-1.427-1.427-1.427H5.931Z"}),(0,l.createElement)(o.Path,{fillRule:"nonzero",d:"M17.837 3.191v11.647H6.19V3.191h11.647Zm0-1.664H6.19c-.915 0-1.663.749-1.663 1.664v11.647c0 .915.748 1.663 1.663 1.663h11.647c.915 0 1.664-.748 1.664-1.663V3.191a1.67 1.67 0 0 0-1.664-1.664Z"}),(0,l.createElement)(o.Path,{fillRule:"nonzero",d:"m13.794 9.014-2.496 3.132-1.78-2.096-2.496 3.124h9.983l-3.211-4.16Z"}),(0,l.createElement)(o.Path,{d:"M7.022 6.519h9.983v.832H7.022zM7.022 4.855h9.983v.832H7.022z"}),(0,l.createElement)(o.Path,{fillRule:"nonzero",d:"M22.476 9.014 19.98 11.51V6.519l2.496 2.495ZM1.524 9.014 4.02 6.519v4.991L1.524 9.014Z"})),(0,l.createElement)(o.SVG,{className:"icon-carousel",width:"26px",height:"18px",viewBox:"0 0 26 18",version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},(0,l.createElement)(o.G,{strokeWidth:"1"},(0,l.createElement)(o.G,{transform:"translate(0.000000, -3.000000)"},(0,l.createElement)(o.Path,{d:"M20,5 L20,19 L6,19 L6,5 L20,5 L20,5 Z M20,3 L6,3 C4.9,3 4,3.9 4,5 L4,19 C4,20.1 4.9,21 6,21 L20,21 C21.1,21 22,20.1 22,19 L22,5 C22,3.9 21.1,3 20,3 Z",fillRule:"nonzero"}),(0,l.createElement)(o.Polygon,{fillRule:"nonzero",points:"15.14 12 12.14 15.7645914 10 13.2451362 7 17 19 17"}),(0,l.createElement)(o.Rect,{x:"7",y:"9",width:"12",height:"1"}),(0,l.createElement)(o.Rect,{x:"7",y:"7",width:"12",height:"1"}),(0,l.createElement)(o.Polygon,{transform:"translate(24.500000, 12.000000) rotate(-270.000000) translate(-24.500000, -12.000000) ",points:"24.5 10.5 27.5 13.5 21.5 13.5"}),(0,l.createElement)(o.Polygon,{transform:"translate(1.500000, 12.000000) rotate(-90.000000) translate(-1.500000, -12.000000) ",points:"1.5 10.5 4.5 13.5 -1.5 13.5"})))),(0,l.createElement)(o.SVG,{className:"icon-carousel-slide",width:"26px",height:"18px",viewBox:"0 0 26 18",version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},(0,l.createElement)(o.G,{strokeWidth:"1"},(0,l.createElement)(o.G,{transform:"translate(0.000000, -3.000000)"},(0,l.createElement)(o.Path,{d:"M20,5 L20,19 L6,19 L6,5 L20,5 L20,5 Z M20,3 L6,3 C4.9,3 4,3.9 4,5 L4,19 C4,20.1 4.9,21 6,21 L20,21 C21.1,21 22,20.1 22,19 L22,5 C22,3.9 21.1,3 20,3 Z",fillRule:"nonzero"}),(0,l.createElement)(o.Polygon,{fillRule:"nonzero",points:"15.14 12 12.14 15.7645914 10 13.2451362 7 17 19 17"}),(0,l.createElement)(o.Rect,{x:"7",y:"9",width:"12",height:"1"}),(0,l.createElement)(o.Rect,{x:"7",y:"7",width:"12",height:"1"})))),(0,l.createElement)(o.SVG,{fill:"none",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24"},(0,l.createElement)(o.Path,{clipRule:"evenodd",d:"m19 7c0-.27614-.2239-.5-.5-.5h-13c-.27614 0-.5.22386-.5.5v4.5c0 .2761.22386.5.5.5h13c.2761 0 .5-.2239.5-.5zm-.125 10h-13.75c-.06904 0-.125.056-.125.125v1.75c0 .069.05596.125.125.125h13.75c.069 0 .125-.056.125-.125v-1.75c0-.069-.056-.125-.125-.125zm-13.75-13.5c-.89746 0-1.625.72754-1.625 1.625v6.75c0 .8975.72754 1.625 1.625 1.625h13.75c.8975 0 1.625-.7275 1.625-1.625v-6.75c0-.89746-.7275-1.625-1.625-1.625zm0 12c-.89746 0-1.625.7275-1.625 1.625v1.75c0 .8975.72754 1.625 1.625 1.625h13.75c.8975 0 1.625-.7275 1.625-1.625v-1.75c0-.8975-.7275-1.625-1.625-1.625z",fill:"currentColor",fillRule:"evenodd"}))),{name:d}=((0,l.createElement)(o.SVG,{fill:"none",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24"},(0,l.createElement)(o.Path,{d:"m19 9c0-.27614-.2239-.5-.5-.5h-13c-.27614 0-.5.22386-.5.5v7.5c0 .2761.22386.5.5.5h13c.2761 0 .5-.2239.5-.5zm-13.875-3.5c-.89746 0-1.625.72754-1.625 1.625v9.75c0 .8975.72754 1.625 1.625 1.625h13.75c.8975 0 1.625-.7275 1.625-1.625v-9.75c0-.89746-.7275-1.625-1.625-1.625z",fill:"currentColor",fillRule:"evenodd"})),(0,l.createElement)(o.SVG,{width:"24px",height:"24px",viewBox:"0 0 24 24",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},(0,l.createElement)(o.Path,{d:"M20,12 L4,12 L4,13.5 L20,13.5 L20,12 Z M10,6.5 L4,6.5 L4,8 L10,8 L10,6.5 Z M20,17.5 L4,17.5 L4,19 L20,19 L20,17.5 Z M20,5.62462724 L16.000015,9 L12,5.62462724 L12.9791165,4.5 L16.000015,7.04920972 L19.0208935,4.5 L20,5.62462724 Z"})),t);(0,e.registerBlockType)(d,{...t,icon:h,edit:function({attributes:{openMultiple:e,startOpen:t,level:a,hasSchema:h},setAttributes:d,clientId:m,isSelected:w}){const u=[["pulsar/accordion-item",{},[["core/paragraph",{placeholder:(0,c.__)("Add content…","pulsar-blocks")}]]]],v=(0,r.useSelect)((e=>e("core/block-editor").hasSelectedInnerBlock(m,!0))),g=(0,n.useBlockProps)(),{children:k,...f}=(0,n.useInnerBlocksProps)(g,{orientation:"vertical",allowedBlocks:p,template:u,renderAppender:()=>!1});return(0,l.createElement)("div",{...f},(0,l.createElement)(n.InspectorControls,{group:"settings"},(0,l.createElement)(o.PanelBody,{title:(0,c.__)("Settings","pulsar-blocks")},(0,l.createElement)(o.ToggleControl,{label:(0,c.__)("Multiple items can be opened","pulsar-blocks"),checked:e,onChange:e=>d({openMultiple:e})}),(0,l.createElement)(o.ToggleControl,{label:(0,c.__)("First item open by default","pulsar-blocks"),checked:t,onChange:e=>d({startOpen:e})}),(0,l.createElement)(o.__experimentalToggleGroupControl,{label:(0,c.__)("Heading level","pulsar-blocks"),onChange:e=>{d({level:e})},value:a,isBlock:!0,help:(0,c.__)("Set the appropriate heading level for your content.","pulsar-blocks")},(0,l.createElement)(o.__experimentalToggleGroupControlOption,{value:2,label:(0,c.__)("H2","pulsar-blocks")}),(0,l.createElement)(o.__experimentalToggleGroupControlOption,{value:3,label:(0,c.__)("H3","pulsar-blocks")}),(0,l.createElement)(o.__experimentalToggleGroupControlOption,{value:4,label:(0,c.__)("H4","pulsar-blocks")}))),(0,l.createElement)(o.PanelBody,{title:(0,c.__)("Schema settings","pulsar-blocks")},(0,l.createElement)(o.ToggleControl,{label:(0,c.__)("Output schema for FAQs","pulsar-blocks"),help:(0,c.__)("If using for FAQs, enable this for SEO.","pulsar-blocks"),checked:h,onChange:e=>d({hasSchema:e})}))),k,(0,l.createElement)(s,{onClickAfter:()=>{},variant:"secondary",icon:i,iconPosition:"left",text:(0,c.__)("Add item","pulsar-blocks"),allowedBlock:"pulsar/accordion-item",style:{width:"100%",justifyContent:"center"},clientId:m,isEnabled:w||v}))},save:()=>(0,l.createElement)(n.InnerBlocks.Content,null)})}},l={};function n(e){var o=l[e];if(void 0!==o)return o.exports;var r=l[e]={exports:{}};return t[e](r,r.exports,n),r.exports}n.m=t,e=[],n.O=(t,l,o,r)=>{if(!l){var c=1/0;for(p=0;p<e.length;p++){l=e[p][0],o=e[p][1],r=e[p][2];for(var a=!0,i=0;i<l.length;i++)(!1&r||c>=r)&&Object.keys(n.O).every((e=>n.O[e](l[i])))?l.splice(i--,1):(a=!1,r<c&&(c=r));if(a){e.splice(p--,1);var s=o();void 0!==s&&(t=s)}}return t}r=r||0;for(var p=e.length;p>0&&e[p-1][2]>r;p--)e[p]=e[p-1];e[p]=[l,o,r]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={166:0,82:0};n.O.j=t=>0===e[t];var t=(t,l)=>{var o,r,c=l[0],a=l[1],i=l[2],s=0;if(c.some((t=>0!==e[t]))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(i)var p=i(n)}for(t&&t(l);s<c.length;s++)r=c[s],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(p)},l=self.webpackChunkpulsar_blocks=self.webpackChunkpulsar_blocks||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var o=n.O(void 0,[82],(()=>n(290)));o=n.O(o)})();