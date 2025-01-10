(()=>{"use strict";var e,t={4531:()=>{const e=window.wp.blocks,t=window.React,r=window.wp.primitives,i=(0,t.createElement)(r.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,t.createElement)(r.Path,{d:"M16.375 4.5H4.625a.125.125 0 0 0-.125.125v8.254l2.859-1.54a.75.75 0 0 1 .68-.016l2.384 1.142 2.89-2.074a.75.75 0 0 1 .874 0l2.313 1.66V4.625a.125.125 0 0 0-.125-.125Zm.125 9.398-2.75-1.975-2.813 2.02a.75.75 0 0 1-.76.067l-2.444-1.17L4.5 14.583v1.792c0 .069.056.125.125.125h11.75a.125.125 0 0 0 .125-.125v-2.477ZM4.625 3C3.728 3 3 3.728 3 4.625v11.75C3 17.273 3.728 18 4.625 18h11.75c.898 0 1.625-.727 1.625-1.625V4.625C18 3.728 17.273 3 16.375 3H4.625ZM20 8v11c0 .69-.31 1-.999 1H6v1.5h13.001c1.52 0 2.499-.982 2.499-2.5V8H20Z",fillRule:"evenodd",clipRule:"evenodd"})),o=window.wp.blockEditor,a=window.wp.components,n=window.wp.data,c=window.wp.element,l=window.wp.i18n,s=(0,window.wp.compose.compose)([(0,n.withSelect)(((e,t)=>({innerBlocks:e("core/block-editor").getBlock(t.clientId).innerBlocks}))),(0,n.withDispatch)(((t,r)=>({onClick(i){const o=(0,e.createBlock)(r.allowedBlock);t("core/block-editor").insertBlock(o,r.innerBlocks.length,r.clientId).then((()=>{i()}))}})))])((({onClick:e,onClickAfter:r,clientId:i,allowedBlock:o,innerBlocks:n,isEnabled:c=!0,...l})=>{if(c)return(0,t.createElement)(a.Button,{onClick:()=>e(r),...l})}));function m(e){var t,r,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(r=m(e[t]))&&(i&&(i+=" "),i+=r)}else for(r in e)e[r]&&(i&&(i+=" "),i+=r);return i}const h=function(){for(var e,t,r=0,i="",o=arguments.length;r<o;r++)(e=arguments[r])&&(t=m(e))&&(i&&(i+=" "),i+=t);return i},g=["core/image"];function d({clientId:r,name:i,setAttributes:a}){const{blockType:c,defaultVariation:s,variations:m}=(0,n.useSelect)((t=>{const{getBlockVariations:r,getBlockType:o,getDefaultBlockVariation:a}=t(e.store);return{blockType:o(i),defaultVariation:a(i,"block"),variations:r(i,"block")}}),[i]),{replaceInnerBlocks:h}=(0,n.useDispatch)(o.store),g=(0,o.useBlockProps)();return(0,t.createElement)("div",{...g},(0,t.createElement)(o.__experimentalBlockVariationPicker,{icon:c?.icon?.src,label:c?.title,variations:m,instructions:(0,l.__)("Select a layout:"),onSelect:(t=s)=>{t.attributes&&a(t.attributes),t.innerBlocks&&h(r,(0,e.createBlocksFromInnerBlocksTemplate)(t.innerBlocks),!0)}}))}const w=[{name:"one",title:(0,l.__)("One"),description:(0,l.__)("One item"),icon:(0,t.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",viewBox:"0 0 48 48"},(0,t.createElement)(a.Rect,{y:"8",width:"48",height:"32",rx:"2"})),innerBlocks:[["core/image"]],scope:["block"],attributes:{gridItems:1}},{name:"two",title:(0,l.__)("Two"),description:(0,l.__)("Two items"),icon:(0,t.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",viewBox:"0 0 48 48"},(0,t.createElement)(a.Path,{d:"M0 10a2 2 0 0 1 2-2h19a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10Zm25 0a2 2 0 0 1 2-2h19a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H27a2 2 0 0 1-2-2V10Z"})),innerBlocks:[["core/image"],["core/image"]],scope:["block"],attributes:{gridItems:2}},{name:"three",title:(0,l.__)("Three"),description:(0,l.__)("Three items"),icon:(0,t.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",viewBox:"0 0 48 48"},(0,t.createElement)(a.Rect,{y:"8",width:"23",height:"32",rx:"2"}),(0,t.createElement)(a.Rect,{x:"25",y:"8",width:"23",height:"15",rx:"2"}),(0,t.createElement)(a.Rect,{x:"25",y:"25",width:"23",height:"15",rx:"2"})),innerBlocks:[["core/image"],["core/image"],["core/image"]],scope:["block"],attributes:{gridItems:3}},{name:"four",title:(0,l.__)("Four"),description:(0,l.__)("Four items"),icon:(0,t.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",viewBox:"0 0 48 48"},(0,t.createElement)(a.Rect,{y:"8",width:"23",height:"18",rx:"2"}),(0,t.createElement)(a.Rect,{y:"28",width:"23",height:"12",rx:"2"}),(0,t.createElement)(a.Rect,{x:"25",y:"8",width:"23",height:"12",rx:"2"}),(0,t.createElement)(a.Rect,{x:"25",y:"22",width:"23",height:"18",rx:"2"})),innerBlocks:[["core/image"],["core/image"],["core/image"],["core/image"]],scope:["block"],attributes:{gridItems:4}},{name:"five",title:(0,l.__)("Five"),description:(0,l.__)("Five items"),icon:(0,t.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",viewBox:"0 0 48 48"},(0,t.createElement)(a.Rect,{y:"8",width:"14.6667",height:"18",rx:"2"}),(0,t.createElement)(a.Rect,{y:"28",width:"14.6667",height:"12",rx:"2"}),(0,t.createElement)(a.Rect,{x:"16.6667",y:"8",width:"14.6667",height:"32",rx:"2"}),(0,t.createElement)(a.Rect,{x:"33.3333",y:"8",width:"14.6667",height:"12",rx:"2"}),(0,t.createElement)(a.Rect,{x:"33.3333",y:"22",width:"14.6667",height:"18",rx:"2"})),innerBlocks:[["core/image"],["core/image"],["core/image"],["core/image"],["core/image"]],scope:["block"],attributes:{gridItems:5}},{name:"six",title:(0,l.__)("Six"),description:(0,l.__)("Six items"),icon:(0,t.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",viewBox:"0 0 48 48"},(0,t.createElement)(a.Rect,{y:"8",width:"14.6667",height:"18",rx:"2"}),(0,t.createElement)(a.Rect,{y:"28",width:"14.6667",height:"12",rx:"2"}),(0,t.createElement)(a.Rect,{x:"31.3333",y:"40",width:"14.6667",height:"18",rx:"2",transform:"rotate(180 31.3333 40)"}),(0,t.createElement)(a.Rect,{x:"31.3333",y:"20",width:"14.6667",height:"12",rx:"2",transform:"rotate(180 31.3333 20)"}),(0,t.createElement)(a.Rect,{x:"48",y:"40",width:"14.6667",height:"12",rx:"2",transform:"rotate(180 48 40)"}),(0,t.createElement)(a.Rect,{x:"48",y:"26",width:"14.6667",height:"18",rx:"2",transform:"rotate(180 48 26)"})),innerBlocks:[["core/image"],["core/image"],["core/image"],["core/image"],["core/image"],["core/image"]],scope:["block"],attributes:{gridItems:6}},{name:"seven",title:(0,l.__)("Seven"),description:(0,l.__)("Seven items"),icon:(0,t.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",viewBox:"0 0 48 48"},(0,t.createElement)(a.Rect,{x:"10.5",y:"23",width:"10.5",height:"15",rx:"2",transform:"rotate(180 10.5 23)"}),(0,t.createElement)(a.Rect,{x:"23",y:"23",width:"10.5",height:"15",rx:"2",transform:"rotate(180 23 23)"}),(0,t.createElement)(a.Rect,{x:"35.5",y:"23",width:"10.5",height:"15",rx:"2",transform:"rotate(180 35.5 23)"}),(0,t.createElement)(a.Rect,{x:"48",y:"23",width:"10.5",height:"15",rx:"2",transform:"rotate(180 48 23)"}),(0,t.createElement)(a.Rect,{x:"14.6667",y:"40",width:"14.6667",height:"15",rx:"2",transform:"rotate(180 14.6667 40)"}),(0,t.createElement)(a.Rect,{x:"31.3333",y:"40",width:"14.6667",height:"15",rx:"2",transform:"rotate(180 31.3333 40)"}),(0,t.createElement)(a.Rect,{x:"48",y:"40",width:"14.6667",height:"15",rx:"2",transform:"rotate(180 48 40)"})),innerBlocks:[["core/image"],["core/image"],["core/image"],["core/image"],["core/image"],["core/image"],["core/image"]],scope:["block"],attributes:{gridItems:7}},{name:"eight",title:(0,l.__)("Eight"),description:(0,l.__)("Eight items"),icon:(0,t.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",viewBox:"0 0 48 48"},(0,t.createElement)(a.Rect,{x:"10.5",y:"23.3333",width:"10.5",height:"15.3333",rx:"2",transform:"rotate(180 10.5 23.3333)"}),(0,t.createElement)(a.Rect,{x:"23",y:"23.3333",width:"10.5",height:"15.3333",rx:"2",transform:"rotate(180 23 23.3333)"}),(0,t.createElement)(a.Rect,{x:"35.5",y:"23.3333",width:"10.5",height:"15.3333",rx:"2",transform:"rotate(180 35.5 23.3333)"}),(0,t.createElement)(a.Rect,{x:"48",y:"23.3333",width:"10.5",height:"15.3333",rx:"2",transform:"rotate(180 48 23.3333)"}),(0,t.createElement)(a.Rect,{x:"10.5",y:"40",width:"10.5",height:"15.3333",rx:"2",transform:"rotate(180 10.5 40)"}),(0,t.createElement)(a.Rect,{x:"23",y:"40",width:"10.5",height:"15.3333",rx:"2",transform:"rotate(180 23 40)"}),(0,t.createElement)(a.Rect,{x:"35.5",y:"40",width:"10.5",height:"15.3333",rx:"2",transform:"rotate(180 35.5 40)"}),(0,t.createElement)(a.Rect,{x:"48",y:"40",width:"10.5",height:"15.3333",rx:"2",transform:"rotate(180 48 40)"})),innerBlocks:[["core/image"],["core/image"],["core/image"],["core/image"],["core/image"],["core/image"],["core/image"],["core/image"]],scope:["block"],attributes:{gridItems:8}}],p=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"pulsar/gallery-grid","version":"0.1.0","title":"Gallery Grid","category":"media","description":"A grid of media, with additional media available in a lightbox.","supports":{"html":false,"align":["wide","full"],"spacing":{"blockGap":"true"},"layout":{"type":"grid","allowEditing":false}},"attributes":{"media":{"type":"array"},"gridItems":{"type":"number","default":5},"align":{"type":"string","default":"wide"}},"textdomain":"pulsar-blocks","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}');(0,e.registerBlockType)(p,{icon:i,variations:w,edit:function({attributes:{gridItems:e},setAttributes:r,clientId:i,isSelected:m}){const[w,p]=(0,c.useState)(!1),x=(0,n.useSelect)((e=>e("core/block-editor").hasSelectedInnerBlock(i,!0))),u=(0,o.useBlockProps)({className:h(`has-items-${e}`,{"is-editing":w&&(m||x)})}),{children:k,...y}=(0,o.useInnerBlocksProps)(u,{orientation:"horizontal",allowedBlocks:g,renderAppender:!1}),b=(0,n.useSelect)((e=>e("core/block-editor").getBlock(i)?e("core/block-editor").getBlock(i).innerBlocks:[])),E=b.length>0;return(0,t.createElement)("div",{...y},!E&&(0,t.createElement)(d,{clientId:i,name:"pulsar/gallery-grid",setAttributes:r}),E&&(0,t.createElement)(t.Fragment,null,(0,t.createElement)(o.InspectorControls,null,(0,t.createElement)(a.PanelBody,{title:(0,l.__)("Settings","pulsar-blocks")},(0,t.createElement)(a.RangeControl,{label:(0,l.__)("Grid items","pulsar-blocks"),value:e,help:(0,l.__)("Number of items to display in the grid. Additional items will be displayed in a lightbox.","pulsar-blocks"),onChange:e=>r({gridItems:e}),min:1,max:8}))),(0,t.createElement)(o.BlockControls,{group:"other"},(0,t.createElement)(a.ToolbarGroup,null,(0,t.createElement)(a.ToolbarButton,{onClick:()=>{p(!w)}},w?(0,l.__)("Finish Editing","pulsar-blocks"):(0,l.__)("Edit Gallery","pulsar-blocks")))),(0,t.createElement)("div",{className:"wp-block-pulsar-gallery-grid__items"},k),(0,t.createElement)(s,{onClickAfter:()=>{},variant:"secondary",text:(0,l.__)("Add item","pulsar-blocks"),allowedBlock:"core/image",style:{width:"100%",justifyContent:"center"},clientId:i,isEnabled:w&&(m||x)}),b&&e<b.length&&!w&&(0,t.createElement)("button",{className:"wp-block-pulsar-gallery-grid__view-all"},(0,l.__)("View Gallery","pulsar-blocks"))))},save:()=>(0,t.createElement)(o.InnerBlocks.Content,null)})}},r={};function i(e){var o=r[e];if(void 0!==o)return o.exports;var a=r[e]={exports:{}};return t[e](a,a.exports,i),a.exports}i.m=t,e=[],i.O=(t,r,o,a)=>{if(!r){var n=1/0;for(m=0;m<e.length;m++){r=e[m][0],o=e[m][1],a=e[m][2];for(var c=!0,l=0;l<r.length;l++)(!1&a||n>=a)&&Object.keys(i.O).every((e=>i.O[e](r[l])))?r.splice(l--,1):(c=!1,a<n&&(n=a));if(c){e.splice(m--,1);var s=o();void 0!==s&&(t=s)}}return t}a=a||0;for(var m=e.length;m>0&&e[m-1][2]>a;m--)e[m]=e[m-1];e[m]=[r,o,a]},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={623:0,223:0};i.O.j=t=>0===e[t];var t=(t,r)=>{var o,a,n=r[0],c=r[1],l=r[2],s=0;if(n.some((t=>0!==e[t]))){for(o in c)i.o(c,o)&&(i.m[o]=c[o]);if(l)var m=l(i)}for(t&&t(r);s<n.length;s++)a=n[s],i.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return i.O(m)},r=self.webpackChunkpulsar_blocks=self.webpackChunkpulsar_blocks||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var o=i.O(void 0,[223],(()=>i(4531)));o=i.O(o)})();