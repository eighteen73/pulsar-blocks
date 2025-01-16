(()=>{"use strict";var e,t={1912:()=>{const e=window.wp.blocks,t=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"pulsar/linked-carousels","version":"0.1.0","title":"Linked Carousels","description":"Links two carousels together so one can control the other.","category":"design","attributes":{"isLinked":{"type":"boolean","default":true}},"providesContext":{"isLinked":"isLinked"},"textdomain":"pulsar-blocks","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js","render":"file:./render.php"}'),l=window.React,n=window.wp.blockEditor,o=window.wp.data,r=window.wp.primitives,c=(0,l.createElement)(r.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,l.createElement)(r.Path,{d:"M18 11.2h-5.2V6h-1.6v5.2H6v1.6h5.2V18h1.6v-5.2H18z"})),i=window.wp.i18n,s=window.wp.components,a=(0,window.wp.compose.compose)([(0,o.withSelect)(((e,t)=>({innerBlocks:e("core/block-editor").getBlock(t.clientId).innerBlocks}))),(0,o.withDispatch)(((t,l)=>({onClick(n){const o=(0,e.createBlock)(l.allowedBlock);t("core/block-editor").insertBlock(o,l.innerBlocks.length,l.clientId).then((()=>{n()}))}})))])((({onClick:e,onClickAfter:t,clientId:n,allowedBlock:o,innerBlocks:r,isEnabled:c=!0,...i})=>{if(c)return(0,l.createElement)(s.Button,{onClick:()=>e(t),...i})})),h=["pulsar/carousel"],w=(0,l.createElement)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",fillRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:"2",clipRule:"evenodd",viewBox:"0 0 24 24"},(0,l.createElement)(s.Path,{d:"M18.003 19.399H5.931a.11.11 0 0 0-.11.11v1.537c0 .06.049.11.11.11h12.072a.11.11 0 0 0 .11-.11v-1.537a.11.11 0 0 0-.11-.11ZM5.931 18.082c-.788 0-1.427.639-1.427 1.427v1.537c0 .788.639 1.427 1.427 1.427h12.072c.789 0 1.427-.639 1.427-1.427v-1.537c0-.788-.638-1.427-1.427-1.427H5.931Z"}),(0,l.createElement)(s.Path,{fillRule:"nonzero",d:"M17.837 3.191v11.647H6.19V3.191h11.647Zm0-1.664H6.19c-.915 0-1.663.749-1.663 1.664v11.647c0 .915.748 1.663 1.663 1.663h11.647c.915 0 1.664-.748 1.664-1.663V3.191a1.67 1.67 0 0 0-1.664-1.664Z"}),(0,l.createElement)(s.Path,{fillRule:"nonzero",d:"m13.794 9.014-2.496 3.132-1.78-2.096-2.496 3.124h9.983l-3.211-4.16Z"}),(0,l.createElement)(s.Path,{d:"M7.022 6.519h9.983v.832H7.022zM7.022 4.855h9.983v.832H7.022z"}),(0,l.createElement)(s.Path,{fillRule:"nonzero",d:"M22.476 9.014 19.98 11.51V6.519l2.496 2.495ZM1.524 9.014 4.02 6.519v4.991L1.524 9.014Z"})),{name:d}=((0,l.createElement)(s.SVG,{className:"icon-carousel",width:"26px",height:"18px",viewBox:"0 0 26 18",version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},(0,l.createElement)(s.G,{strokeWidth:"1"},(0,l.createElement)(s.G,{transform:"translate(0.000000, -3.000000)"},(0,l.createElement)(s.Path,{d:"M20,5 L20,19 L6,19 L6,5 L20,5 L20,5 Z M20,3 L6,3 C4.9,3 4,3.9 4,5 L4,19 C4,20.1 4.9,21 6,21 L20,21 C21.1,21 22,20.1 22,19 L22,5 C22,3.9 21.1,3 20,3 Z",fillRule:"nonzero"}),(0,l.createElement)(s.Polygon,{fillRule:"nonzero",points:"15.14 12 12.14 15.7645914 10 13.2451362 7 17 19 17"}),(0,l.createElement)(s.Rect,{x:"7",y:"9",width:"12",height:"1"}),(0,l.createElement)(s.Rect,{x:"7",y:"7",width:"12",height:"1"}),(0,l.createElement)(s.Polygon,{transform:"translate(24.500000, 12.000000) rotate(-270.000000) translate(-24.500000, -12.000000) ",points:"24.5 10.5 27.5 13.5 21.5 13.5"}),(0,l.createElement)(s.Polygon,{transform:"translate(1.500000, 12.000000) rotate(-90.000000) translate(-1.500000, -12.000000) ",points:"1.5 10.5 4.5 13.5 -1.5 13.5"})))),(0,l.createElement)(s.SVG,{className:"icon-carousel-slide",width:"26px",height:"18px",viewBox:"0 0 26 18",version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},(0,l.createElement)(s.G,{strokeWidth:"1"},(0,l.createElement)(s.G,{transform:"translate(0.000000, -3.000000)"},(0,l.createElement)(s.Path,{d:"M20,5 L20,19 L6,19 L6,5 L20,5 L20,5 Z M20,3 L6,3 C4.9,3 4,3.9 4,5 L4,19 C4,20.1 4.9,21 6,21 L20,21 C21.1,21 22,20.1 22,19 L22,5 C22,3.9 21.1,3 20,3 Z",fillRule:"nonzero"}),(0,l.createElement)(s.Polygon,{fillRule:"nonzero",points:"15.14 12 12.14 15.7645914 10 13.2451362 7 17 19 17"}),(0,l.createElement)(s.Rect,{x:"7",y:"9",width:"12",height:"1"}),(0,l.createElement)(s.Rect,{x:"7",y:"7",width:"12",height:"1"})))),(0,l.createElement)(s.SVG,{fill:"none",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24"},(0,l.createElement)(s.Path,{clipRule:"evenodd",d:"m19 7c0-.27614-.2239-.5-.5-.5h-13c-.27614 0-.5.22386-.5.5v4.5c0 .2761.22386.5.5.5h13c.2761 0 .5-.2239.5-.5zm-.125 10h-13.75c-.06904 0-.125.056-.125.125v1.75c0 .069.05596.125.125.125h13.75c.069 0 .125-.056.125-.125v-1.75c0-.069-.056-.125-.125-.125zm-13.75-13.5c-.89746 0-1.625.72754-1.625 1.625v6.75c0 .8975.72754 1.625 1.625 1.625h13.75c.8975 0 1.625-.7275 1.625-1.625v-6.75c0-.89746-.7275-1.625-1.625-1.625zm0 12c-.89746 0-1.625.7275-1.625 1.625v1.75c0 .8975.72754 1.625 1.625 1.625h13.75c.8975 0 1.625-.7275 1.625-1.625v-1.75c0-.8975-.7275-1.625-1.625-1.625z",fill:"currentColor",fillRule:"evenodd"})),(0,l.createElement)(s.SVG,{fill:"none",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24"},(0,l.createElement)(s.Path,{d:"m19 9c0-.27614-.2239-.5-.5-.5h-13c-.27614 0-.5.22386-.5.5v7.5c0 .2761.22386.5.5.5h13c.2761 0 .5-.2239.5-.5zm-13.875-3.5c-.89746 0-1.625.72754-1.625 1.625v9.75c0 .8975.72754 1.625 1.625 1.625h13.75c.8975 0 1.625-.7275 1.625-1.625v-9.75c0-.89746-.7275-1.625-1.625-1.625z",fill:"currentColor",fillRule:"evenodd"})),(0,l.createElement)(s.SVG,{width:"24px",height:"24px",viewBox:"0 0 24 24",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},(0,l.createElement)(s.Path,{d:"M20,12 L4,12 L4,13.5 L20,13.5 L20,12 Z M10,6.5 L4,6.5 L4,8 L10,8 L10,6.5 Z M20,17.5 L4,17.5 L4,19 L20,19 L20,17.5 Z M20,5.62462724 L16.000015,9 L12,5.62462724 L12.9791165,4.5 L16.000015,7.04920972 L19.0208935,4.5 L20,5.62462724 Z"})),(0,l.createElement)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},(0,l.createElement)(s.Path,{d:"M6.4 12.1h11.2v1.5H6.4zM6.5 15.5h11.2V17H6.5z"}),(0,l.createElement)(s.Path,{d:"M23.2 4.5c0-2.1-1.7-3.7-3.7-3.7-1 0-2 .4-2.7 1.2-.3.3-.5.7-.7 1H5c-1.1 0-1.9.9-1.9 2v14c0 1.1.8 2 1.9 2h14.1c1.1 0 1.9-.9 1.9-1.9V7.9c1.3-.5 2.2-1.8 2.2-3.4zM19.5 19c0 .2-.2.4-.4.4H5c-.2 0-.4-.2-.4-.4V5c0-.2.2-.4.4-.4h10.8c0 2.1 1.7 3.7 3.7 3.7V19zm0-12.2c-1.2 0-2.2-1-2.2-2.2 0-.6.2-1.1.6-1.5.4-.5 1-.7 1.6-.7 1.2 0 2.2 1 2.2 2.2s-1 2.2-2.2 2.2z"})),(0,l.createElement)(s.SVG,{width:"24",height:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,l.createElement)(s.Path,{d:"M22.663 4.79382C22.663 5.07294 22.8893 5.29922 23.1684 5.29922C23.4476 5.29922 23.6738 5.07294 23.6738 4.79382V0.505396C23.6738 0.226273 23.4476 -1.49012e-07 23.1684 0L18.88 7.45059e-08C18.6009 -2.68221e-07 18.3746 0.226273 18.3746 0.505396C18.3746 0.784518 18.6009 1.01079 18.88 1.01079L22.663 1.01079V4.79382ZM18.4014 3.30688H5.19369C4.15594 3.30688 3.30688 4.15594 3.30688 5.19369V18.4014C3.30688 19.4391 4.15594 20.2882 5.19369 20.2882H18.4014C19.4391 20.2882 20.2882 19.4391 20.2882 18.4014V5.19369C20.2882 4.15594 19.4391 3.30688 18.4014 3.30688ZM5.19369 4.72199H18.4014C18.6844 4.72199 18.8731 4.91067 18.8731 5.19369V13.1183L16.0429 10.3824C15.7598 10.0994 15.2881 10.0994 15.0994 10.3824L11.7032 13.6843L8.96731 11.7975C8.68429 11.6088 8.40127 11.6088 8.21259 11.7975L4.81633 14.2504V5.19369C4.72199 4.91067 4.91067 4.72199 5.19369 4.72199ZM18.4014 18.8731H5.19369C4.91067 18.8731 4.72199 18.6844 4.72199 18.4014V16.1372L8.58995 13.307L11.4202 15.0994C11.7032 15.2881 12.0805 15.2881 12.2692 15.0051L15.5712 11.7975L18.8731 15.0051V18.4014C18.8731 18.6844 18.6844 18.8731 18.4014 18.8731ZM0.505396 18.3749C0.784518 18.3749 1.01079 18.6011 1.01079 18.8803V22.6633H4.79382C5.07294 22.6633 5.29922 22.8896 5.29922 23.1687C5.29922 23.4478 5.07294 23.6741 4.79382 23.6741H0.505396C0.226273 23.6741 -1.49012e-07 23.4478 0 23.1687V18.8803C-1.49012e-07 18.6011 0.226273 18.3749 0.505396 18.3749Z"})),t);(0,e.registerBlockType)(d,{...t,icon:w,edit:function({clientId:e,isSelected:t}){const r=(0,o.useSelect)((t=>t("core/block-editor").getBlock(e).innerBlocks)).length<2,s=(0,n.useBlockProps)(),{children:w,...d}=(0,n.useInnerBlocksProps)(s,{orientation:"vertical",allowedBlocks:h,renderAppender:()=>!1});return(0,l.createElement)("div",{...d},w,(0,l.createElement)(a,{onClickAfter:()=>{},variant:"secondary",icon:c,iconPosition:"left",text:(0,i.__)("Add carousel","pulsar-blocks"),allowedBlock:"pulsar/carousel",style:{width:"100%",justifyContent:"center"},clientId:e,isEnabled:t&&r}))},save:()=>(0,l.createElement)(n.InnerBlocks.Content,null)})}},l={};function n(e){var o=l[e];if(void 0!==o)return o.exports;var r=l[e]={exports:{}};return t[e](r,r.exports,n),r.exports}n.m=t,e=[],n.O=(t,l,o,r)=>{if(!l){var c=1/0;for(h=0;h<e.length;h++){l=e[h][0],o=e[h][1],r=e[h][2];for(var i=!0,s=0;s<l.length;s++)(!1&r||c>=r)&&Object.keys(n.O).every((e=>n.O[e](l[s])))?l.splice(s--,1):(i=!1,r<c&&(c=r));if(i){e.splice(h--,1);var a=o();void 0!==a&&(t=a)}}return t}r=r||0;for(var h=e.length;h>0&&e[h-1][2]>r;h--)e[h]=e[h-1];e[h]=[l,o,r]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={175:0,479:0};n.O.j=t=>0===e[t];var t=(t,l)=>{var o,r,c=l[0],i=l[1],s=l[2],a=0;if(c.some((t=>0!==e[t]))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(s)var h=s(n)}for(t&&t(l);a<c.length;a++)r=c[a],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(h)},l=self.webpackChunkpulsar_blocks=self.webpackChunkpulsar_blocks||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var o=n.O(void 0,[479],(()=>n(1912)));o=n.O(o)})();