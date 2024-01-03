(()=>{"use strict";const e=window.wp.blocks,t=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"pulsar/accordion-item","version":"0.1.0","title":"Accordion Item","category":"design","parent":["pulsar/accordion"],"supports":{"inserter":false,"reusable":false,"html":false},"attributes":{"title":{"type":"string","selector":".wp-block-pulsar-accordion__heading"},"id":{"type":"string"}},"usesContext":["level"],"textdomain":"pulsar-blocks","editorScript":"file:./index.js","render":"file:./render.php"}'),l=window.React,n=window.wp.blockEditor,r=window.wp.url,o=window.wp.element,c=window.wp.i18n,a=window.wp.components,i=((0,l.createElement)(a.SVG,{className:"icon-carousel",width:"26px",height:"18px",viewBox:"0 0 26 18",version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},(0,l.createElement)(a.G,{strokeWidth:"1"},(0,l.createElement)(a.G,{transform:"translate(0.000000, -3.000000)"},(0,l.createElement)(a.Path,{d:"M20,5 L20,19 L6,19 L6,5 L20,5 L20,5 Z M20,3 L6,3 C4.9,3 4,3.9 4,5 L4,19 C4,20.1 4.9,21 6,21 L20,21 C21.1,21 22,20.1 22,19 L22,5 C22,3.9 21.1,3 20,3 Z",fillRule:"nonzero"}),(0,l.createElement)(a.Polygon,{fillRule:"nonzero",points:"15.14 12 12.14 15.7645914 10 13.2451362 7 17 19 17"}),(0,l.createElement)(a.Rect,{x:"7",y:"9",width:"12",height:"1"}),(0,l.createElement)(a.Rect,{x:"7",y:"7",width:"12",height:"1"}),(0,l.createElement)(a.Polygon,{transform:"translate(24.500000, 12.000000) rotate(-270.000000) translate(-24.500000, -12.000000) ",points:"24.5 10.5 27.5 13.5 21.5 13.5"}),(0,l.createElement)(a.Polygon,{transform:"translate(1.500000, 12.000000) rotate(-90.000000) translate(-1.500000, -12.000000) ",points:"1.5 10.5 4.5 13.5 -1.5 13.5"})))),(0,l.createElement)(a.SVG,{className:"icon-carousel-slide",width:"26px",height:"18px",viewBox:"0 0 26 18",version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},(0,l.createElement)(a.G,{strokeWidth:"1"},(0,l.createElement)(a.G,{transform:"translate(0.000000, -3.000000)"},(0,l.createElement)(a.Path,{d:"M20,5 L20,19 L6,19 L6,5 L20,5 L20,5 Z M20,3 L6,3 C4.9,3 4,3.9 4,5 L4,19 C4,20.1 4.9,21 6,21 L20,21 C21.1,21 22,20.1 22,19 L22,5 C22,3.9 21.1,3 20,3 Z",fillRule:"nonzero"}),(0,l.createElement)(a.Polygon,{fillRule:"nonzero",points:"15.14 12 12.14 15.7645914 10 13.2451362 7 17 19 17"}),(0,l.createElement)(a.Rect,{x:"7",y:"9",width:"12",height:"1"}),(0,l.createElement)(a.Rect,{x:"7",y:"7",width:"12",height:"1"})))),(0,l.createElement)(a.SVG,{fill:"none",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24"},(0,l.createElement)(a.Path,{clipRule:"evenodd",d:"m19 7c0-.27614-.2239-.5-.5-.5h-13c-.27614 0-.5.22386-.5.5v4.5c0 .2761.22386.5.5.5h13c.2761 0 .5-.2239.5-.5zm-.125 10h-13.75c-.06904 0-.125.056-.125.125v1.75c0 .069.05596.125.125.125h13.75c.069 0 .125-.056.125-.125v-1.75c0-.069-.056-.125-.125-.125zm-13.75-13.5c-.89746 0-1.625.72754-1.625 1.625v6.75c0 .8975.72754 1.625 1.625 1.625h13.75c.8975 0 1.625-.7275 1.625-1.625v-6.75c0-.89746-.7275-1.625-1.625-1.625zm0 12c-.89746 0-1.625.7275-1.625 1.625v1.75c0 .8975.72754 1.625 1.625 1.625h13.75c.8975 0 1.625-.7275 1.625-1.625v-1.75c0-.8975-.7275-1.625-1.625-1.625z",fill:"currentColor",fillRule:"evenodd"})),(0,l.createElement)(a.SVG,{fill:"none",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24"},(0,l.createElement)(a.Path,{d:"m19 9c0-.27614-.2239-.5-.5-.5h-13c-.27614 0-.5.22386-.5.5v7.5c0 .2761.22386.5.5.5h13c.2761 0 .5-.2239.5-.5zm-13.875-3.5c-.89746 0-1.625.72754-1.625 1.625v9.75c0 .8975.72754 1.625 1.625 1.625h13.75c.8975 0 1.625-.7275 1.625-1.625v-9.75c0-.89746-.7275-1.625-1.625-1.625z",fill:"currentColor",fillRule:"evenodd"}))),{name:s}=t;(0,e.registerBlockType)(s,{...t,icon:i,edit:function({attributes:e,setAttributes:t,context:a}){const{title:i,id:s}=e,{level:m}=a,w="h"+m,p=(0,n.useBlockProps)({className:"wp-block-pulsar-accordion__item"});(0,o.useEffect)((()=>{t({id:(0,r.cleanForSlug)(i)})}),[i,s,t]);const d=(0,n.useInnerBlocksProps)({className:"wp-block-pulsar-accordion__panel"},{orientation:"vertical",__experimentalCaptureToolbars:!0,templateInsertUpdatesSelection:!1});return(0,l.createElement)("div",{...p},(0,l.createElement)(w,{className:"wp-block-pulsar-accordion__heading"},(0,l.createElement)("button",{className:"wp-block-pulsar-accordion__trigger"},(0,l.createElement)(n.RichText,{tagName:"span",className:"wp-block-pulsar-accordion__title",allowedFormats:["core/bold","core/italic"],onChange:e=>t({title:e}),value:i,placeholder:(0,c.__)("Add a title…","pulsar-blocks")}),(0,l.createElement)("span",{className:"wp-block-pulsar-accordion__icon",dangerouslySetInnerHTML:{__html:"&plus;"}}))),(0,l.createElement)("div",{...d}))},save:()=>(0,l.createElement)(n.InnerBlocks.Content,null)})})();