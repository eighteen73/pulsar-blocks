!function(){"use strict";var e=window.wp.blocks,t=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"pulsar/accordion-item","version":"0.1.0","title":"Accordion Item","category":"design","parent":["pulsar/accordion"],"supports":{"inserter":false,"reusable":false,"html":false},"textdomain":"pulsar","attributes":{"title":{"type":"string","selector":".wp-block-pulsar-accordion__heading"},"id":{"type":"string"}},"usesContext":["level"],"editorScript":"file:./index.js","render":"file:./render.php"}'),l=window.wp.element,n=window.wp.blockEditor,o=window.wp.url,r=window.wp.i18n,c=window.wp.components,a=(0,l.createElement)(c.SVG,{fill:"none",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24"},(0,l.createElement)(c.Path,{d:"m19 9c0-.27614-.2239-.5-.5-.5h-13c-.27614 0-.5.22386-.5.5v7.5c0 .2761.22386.5.5.5h13c.2761 0 .5-.2239.5-.5zm-13.875-3.5c-.89746 0-1.625.72754-1.625 1.625v9.75c0 .8975.72754 1.625 1.625 1.625h13.75c.8975 0 1.625-.7275 1.625-1.625v-9.75c0-.89746-.7275-1.625-1.625-1.625z",fill:"currentColor",fillRule:"evenodd"}));const{name:s}=t;(0,e.registerBlockType)(s,{...t,icon:a,edit:function({attributes:e,setAttributes:t,context:c}){const{title:a,id:s}=e,{level:i}=c,p="h"+i,d=(0,n.useBlockProps)({className:"wp-block-pulsar-accordion__item"});(0,l.useEffect)((()=>{t({id:(0,o.cleanForSlug)(a)})}),[a,s,t]);const m=(0,n.useInnerBlocksProps)({className:"wp-block-pulsar-accordion__panel"},{orientation:"vertical",__experimentalCaptureToolbars:!0,templateInsertUpdatesSelection:!1});return(0,l.createElement)("div",{...d},(0,l.createElement)(p,{className:"wp-block-pulsar-accordion__heading"},(0,l.createElement)("button",{className:"wp-block-pulsar-accordion__trigger"},(0,l.createElement)(n.RichText,{tagName:"span",className:"wp-block-pulsar-accordion__title",allowedFormats:["core/bold","core/italic"],onChange:e=>t({title:e}),value:a,placeholder:(0,r.__)("Add a title…")}),(0,l.createElement)("span",{className:"wp-block-pulsar-accordion__icon",dangerouslySetInnerHTML:{__html:"&plus;"}}))),(0,l.createElement)("div",{...m}))},save:()=>(0,l.createElement)(n.InnerBlocks.Content,null)})}();