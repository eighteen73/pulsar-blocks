!function(){var e,o={613:function(e,o,t){"use strict";var n=window.wp.blocks,r=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"pulsar/carousel-slide","version":"0.1.0","title":"Carousel slide","category":"design","parent":["pulsar/carousel"],"attributes":{"backgroundType":{"type":"string","default":"none"},"backgroundImageId":{"type":"number"},"focalPoint":{"type":"object","default":{"x":0.5,"y":0.5}},"overlayColor":{"type":"string"},"overlayOpacity":{"type":"number","default":50},"backgroundColor":{"type":"string"},"contentPosition":{"type":"string","default":"center center"}},"supports":{"spacing":{"blockGap":true,"padding":true}},"selectors":{"spacing":{"blockGap":".wp-block-pulsar-carousel-slide__content"}},"textdomain":"pulsar","editorStyle":"file:./index.css","editorScript":"file:./index.js","style":"file:./style-index.css","render":"file:./render.php"}'),a=window.wp.element,l=window.wp.blockEditor,i=window.wp.components,c=window.wp.data,s=t(184),u=t.n(s);const p=(0,a.forwardRef)((({children:e,className:o,...t},n)=>(0,a.createElement)("li",{className:u()("splide__slide",o),ref:n,...t},e)));var g=window.wp.coreData;const d={"top left":"is-position-top-left","top center":"is-position-top-center","top right":"is-position-top-right","center left":"is-position-center-left","center center":"is-position-center-center","center right":"is-position-center-right","bottom left":"is-position-bottom-left","bottom center":"is-position-bottom-center","bottom right":"is-position-bottom-right"};function m(e){return d[e]}var v=window.wp.i18n,y=e=>{const{contentPosition:o,onContentPositionChange:t,isDisabled:n}=e;return(0,a.createElement)(l.BlockControls,{group:"block"},(0,a.createElement)(l.__experimentalBlockAlignmentMatrixControl,{label:(0,v.__)("Change content position"),value:o,onChange:t,isDisabled:n}))},f=e=>{const{imageUrl:o,palette:t,backgroundType:n,backgroundImageId:r,backgroundColor:c,overlayColor:s,overlayOpacity:u,focalPoint:p,onBackgroundTypeChange:g,onBackgroundImageSelect:d,onBackgroundImageRemove:m,onBackgroundColorChange:y,onOverlayColorChange:f,onOverlayOpacityChange:h,onFocalPointChange:b}=e;return(0,a.createElement)(l.InspectorControls,null,(0,a.createElement)(i.PanelBody,{title:(0,v.__)("Background settings")},(0,a.createElement)(i.__experimentalToggleGroupControl,{label:(0,v.__)("Background type"),onChange:g,value:n,isBlock:!0},(0,a.createElement)(i.__experimentalToggleGroupControlOption,{value:"none",label:(0,v.__)("None")}),(0,a.createElement)(i.__experimentalToggleGroupControlOption,{value:"image",label:(0,v.__)("Image")}),(0,a.createElement)(i.__experimentalToggleGroupControlOption,{value:"color",label:(0,v.__)("Color")})),"image"===n&&(0,a.createElement)(a.Fragment,null,(0,a.createElement)(i.BaseControl,null,(0,a.createElement)(l.MediaUploadCheck,null,(0,a.createElement)(l.MediaUpload,{allowedTypes:"image",title:(0,v.__)("Select background image"),render:({open:e})=>(0,a.createElement)(a.Fragment,null,r?(0,a.createElement)(a.Fragment,null,(0,a.createElement)(i.FocalPointPicker,{label:(0,v.__)("Focal point picker"),url:o,value:p,onChange:b}),(0,a.createElement)(i.ButtonGroup,null,(0,a.createElement)(i.Button,{variant:"secondary",onClick:e},(0,v.__)("Replace image")),(0,a.createElement)(i.Button,{variant:"secondary",onClick:m},(0,v.__)("Remove image")))):(0,a.createElement)(i.Button,{variant:"primary",onClick:e},(0,v.__)("Select image"))),onSelect:d}))),(0,a.createElement)(i.BaseControl,{label:"Overlay color"},(0,a.createElement)(i.ColorPalette,{colors:t,disableCustomColors:!0,value:s,onChange:f})),(0,a.createElement)(i.RangeControl,{__nextHasNoMarginBottom:!0,label:(0,v.__)("Overlay opacity"),value:u,currentInput:u,onChange:h,min:0,max:100,step:10,required:!0})),"color"===n&&(0,a.createElement)(i.BaseControl,{label:"Background color"},(0,a.createElement)(i.ColorPalette,{colors:t,disableCustomColors:!0,value:c,onChange:y}))))},h=(0,a.createElement)(i.SVG,{className:"icon-carousel-slide",width:"26px",height:"18px",viewBox:"0 0 26 18",version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},(0,a.createElement)(i.G,{strokeWidth:"1"},(0,a.createElement)(i.G,{transform:"translate(0.000000, -3.000000)"},(0,a.createElement)(i.Path,{d:"M20,5 L20,19 L6,19 L6,5 L20,5 L20,5 Z M20,3 L6,3 C4.9,3 4,3.9 4,5 L4,19 C4,20.1 4.9,21 6,21 L20,21 C21.1,21 22,20.1 22,19 L22,5 C22,3.9 21.1,3 20,3 Z",fillRule:"nonzero"}),(0,a.createElement)(i.Polygon,{fillRule:"nonzero",points:"15.14 12 12.14 15.7645914 10 13.2451362 7 17 19 17"}),(0,a.createElement)(i.Rect,{x:"7",y:"9",width:"12",height:"1"}),(0,a.createElement)(i.Rect,{x:"7",y:"7",width:"12",height:"1"}))));const{name:b}=r;(0,n.registerBlockType)(b,{...r,icon:h,edit:function(e){var o;const{attributes:t,setAttributes:n,clientId:r}=e,{contentPosition:s,backgroundType:d,backgroundImageId:v,overlayColor:h,overlayOpacity:b,focalPoint:C,backgroundColor:k}=t,_=(0,c.useSelect)((e=>e(l.store).getBlock(r).innerBlocks.length>0),[r]),w={"--overlay-color":h,"--overlay-opacity":b,"--background-color":k},E={objectPosition:`${100*C.x}% ${100*C.y}%`},{media:x,isResolvingMedia:O}=(B=v,(0,c.useSelect)((e=>{const{getMedia:o,isResolving:t,hasFinishedResolution:n}=e(g.store),r=[B,{context:"view"}];return{media:o(...r),isResolvingMedia:t("getMedia",r),hasResolvedMedia:n("getMedia",r)}}),[B]));var B;const P=null!==(o=x?.media_details?.sizes.full?.source_url)&&void 0!==o?o:x?.source_url,I=x?.alt_text,S=(0,l.useSetting)("color.palette"),R=(0,l.useBlockProps)({className:u()("splide__slide",m(s),{"has-overlay":h,"has-overlay-opacity":b,"has-background":k}),style:w}),{children:M,ref:T,...j}=(0,l.useInnerBlocksProps)(R);return(0,a.createElement)(p,{...j,ref:T},(0,a.createElement)(y,{contentPosition:s,onContentPositionChange:e=>{n({contentPosition:e})},isDisabled:!_}),(0,a.createElement)(f,{imageUrl:P,palette:S,backgroundType:d,backgroundImageId:v,backgroundColor:k,overlayColor:h,overlayOpacity:h,focalPoint:C,onBackgroundTypeChange:e=>{n({backgroundType:e}),"image"===e&&n({backgroundColor:void 0}),"color"===e&&n({backgroundImageId:void 0,overlayColor:void 0,overlayOpacity:void 0,focalPoint:{x:.5,y:.5}})},onBackgroundImageSelect:e=>{n({backgroundImageId:e?.id})},onBackgroundImageRemove:()=>{n({backgroundImageId:void 0})},onBackgroundColorChange:e=>{n({backgroundColor:e})},onOverlayColorChange:e=>{n({overlayColor:e})},onOverlayOpacityChange:e=>{n({overlayOpacity:e})},onFocalPointChange:e=>{n({focalPoint:e})}}),(0,a.createElement)("div",{className:"wp-block-pulsar-carousel-slide__content"},M),"image"===d&&(0,a.createElement)("figure",{className:"wp-block-pulsar-carousel-slide__background-image"},v&&P&&!O?(0,a.createElement)("img",{style:E,src:P,alt:I}):(0,a.createElement)(i.Placeholder,{withIllustration:!0})))},save:()=>(0,a.createElement)(l.InnerBlocks.Content,null)})},184:function(e,o){var t;!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var e=[],o=0;o<arguments.length;o++){var t=arguments[o];if(t){var a=typeof t;if("string"===a||"number"===a)e.push(t);else if(Array.isArray(t)){if(t.length){var l=r.apply(null,t);l&&e.push(l)}}else if("object"===a){if(t.toString!==Object.prototype.toString&&!t.toString.toString().includes("[native code]")){e.push(t.toString());continue}for(var i in t)n.call(t,i)&&t[i]&&e.push(i)}}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(t=function(){return r}.apply(o,[]))||(e.exports=t)}()}},t={};function n(e){var r=t[e];if(void 0!==r)return r.exports;var a=t[e]={exports:{}};return o[e](a,a.exports,n),a.exports}n.m=o,e=[],n.O=function(o,t,r,a){if(!t){var l=1/0;for(u=0;u<e.length;u++){t=e[u][0],r=e[u][1],a=e[u][2];for(var i=!0,c=0;c<t.length;c++)(!1&a||l>=a)&&Object.keys(n.O).every((function(e){return n.O[e](t[c])}))?t.splice(c--,1):(i=!1,a<l&&(l=a));if(i){e.splice(u--,1);var s=r();void 0!==s&&(o=s)}}return o}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[t,r,a]},n.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(o,{a:o}),o},n.d=function(e,o){for(var t in o)n.o(o,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:o[t]})},n.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},function(){var e={880:0,511:0};n.O.j=function(o){return 0===e[o]};var o=function(o,t){var r,a,l=t[0],i=t[1],c=t[2],s=0;if(l.some((function(o){return 0!==e[o]}))){for(r in i)n.o(i,r)&&(n.m[r]=i[r]);if(c)var u=c(n)}for(o&&o(t);s<l.length;s++)a=l[s],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(u)},t=self.webpackChunkcarousel=self.webpackChunkcarousel||[];t.forEach(o.bind(null,0)),t.push=o.bind(null,t.push.bind(t))}();var r=n.O(void 0,[511],(function(){return n(613)}));r=n.O(r)}();