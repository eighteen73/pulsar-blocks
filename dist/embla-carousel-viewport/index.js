(()=>{"use strict";const e=window.wp.blocks,t=window.React,n=window.wp.blockEditor,o=JSON.parse('{"u2":"pulsar/embla-carousel-viewport"}');(0,e.registerBlockType)(o.u2,{edit:function(){const e=(0,n.useBlockProps)(),{children:o,...r}=(0,n.useInnerBlocksProps)(e,{orientation:"horizontal",templateLock:!1});return(0,t.createElement)("div",{...r},(0,t.createElement)("div",{className:"embla__container"},o))},save:()=>(0,t.createElement)(n.InnerBlocks.Content,null)})})();