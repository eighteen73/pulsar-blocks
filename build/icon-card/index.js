/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../../../node_modules/@humanmade/block-editor-components/dist/index.js":
/*!*********************************************************************************!*\
  !*** ../../../../node_modules/@humanmade/block-editor-components/dist/index.js ***!
  \*********************************************************************************/
/***/ (function(module) {

/*! For license information please see index.js.LICENSE.txt */
!function(e,t){ true?module.exports=t():0}(self,(()=>(()=>{var e={694:(e,t,n)=>{"use strict";var o=n(925);function r(){}function l(){}l.resetWarningCache=r,e.exports=function(){function e(e,t,n,r,l,a){if(a!==o){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:l,resetWarningCache:r};return n.PropTypes=n,n}},556:(e,t,n)=>{e.exports=n(694)()},925:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},942:(e,t)=>{var n;!function(){"use strict";var o={}.hasOwnProperty;function r(){for(var e="",t=0;t<arguments.length;t++){var n=arguments[t];n&&(e=a(e,l(n)))}return e}function l(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return r.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var t="";for(var n in e)o.call(e,n)&&e[n]&&(t=a(t,n));return t}function a(e,t){return t?e?e+" "+t:e+t:e}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(t,[]))||(e.exports=n)}()}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var l=t[o]={exports:{}};return e[o](l,l.exports,n),l.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};return(()=>{"use strict";n.r(o),n.d(o,{ConditionalComponent:()=>t,DateTimeControl:()=>E,FetchAllTermSelectControl:()=>m,FileControls:()=>f,GenericServerSideEdit:()=>h,ImageControl:()=>x,InnerBlockSlider:()=>j,InnerBlocksDisplaySingle:()=>O,LinkControl:()=>U,LinkToolbar:()=>W,PlainTextWithLimit:()=>z,PostPickerButton:()=>ue,PostPickerModal:()=>ce,PostPickerToolbarButton:()=>se,PostTitleControl:()=>G,PostTypeCheck:()=>Y,RichTextWithLimit:()=>K,TermSearchControl:()=>re,TermSelector:()=>le,createOptionFromPost:()=>Ce,createOptionFromTerm:()=>Te,createOptionsFromPosts:()=>Be,createOptionsFromPostsWithHierarchy:()=>xe,createOptionsFromTerms:()=>Ie,createOptionsFromTermsWithHierarchy:()=>Pe,findBlockByName:()=>ve,findInvalidBlock:()=>Ee,findInvalidBlocks:()=>Se,findValidBlock:()=>we,findValidBlocks:()=>_e,getImageDataForSize:()=>S,useActiveBlockStyle:()=>me,useBlockStyles:()=>pe,useDisallowedBlocks:()=>fe,useMeta:()=>ge,usePostThumbnail:()=>be,useRenderAppenderWithBlockLimit:()=>he,useSelectBlock:()=>ke,useSetAttribute:()=>ye,withActiveVariation:()=>Re});const e=window.React;function t(t){const{children:n=null,ComponentFalse:o=(()=>null),ComponentTrue:r=(()=>n),predicate:l,...a}=t,i=l(a)?r:o;return(0,e.createElement)(i,{...a})}const r=window.wp.apiFetch;var l=n.n(r);const a=window.wp.components,i=window.wp.data,c=window.wp.i18n,s=window.wp.url,u={label:"",value:""},d={disabled:!0,label:(0,c.__)("No items found!","block-editor-components"),value:""};const m=function(t){const{defaultOption:n=u,fallbackOption:o=d,taxonomy:r,...m}=t,[p,f]=(0,e.useState)(),[g,b]=(0,e.useState)(),h=(0,i.useSelect)((e=>e("core").getTaxonomy(r)?.rest_base),[r]);return(0,e.useEffect)((()=>{h&&(async()=>{try{const e=await l()({path:(0,s.addQueryArgs)(`/wp/v2/${h}`,{_fields:"id,name",context:"view",per_page:-1})});if(!e?.length)return void b(o?[o]:[]);b([...n?[n]:[],...Ie(e)])}catch(t){var e;f(null!==(e=t.message)&&void 0!==e?e:(0,c.__)("Unknown error.","block-editor-components"))}})()}),[h,n,o]),p?(0,e.createElement)(a.Notice,{isDismissible:!1,status:"error"},(0,e.createElement)("p",null,p)):g?(0,e.createElement)(a.SelectControl,{...m,options:g}):(0,e.createElement)(a.Spinner,null)},p=window.wp.blockEditor;function f(t){const{value:n,onChange:o,...r}=t;return(0,e.createElement)(p.MediaUploadCheck,null,(0,e.createElement)(p.MediaUpload,{title:(0,c.__)("Select or Upload File","block-editor-components"),...r,multiple:!1,render:({open:t})=>(0,e.createElement)(a.ToolbarGroup,null,(0,e.createElement)(a.ToolbarButton,{icon:"admin-links",label:n?(0,c.__)("Edit file","block-editor-components"):(0,c.__)("Select file","block-editor-components"),onClick:t}),n&&(0,e.createElement)(a.ToolbarButton,{icon:"editor-unlink",label:(0,c.__)("Deselect file","block-editor-components"),onClick:()=>o(null)})),value:n,onSelect:o}))}const g=window.wp.serverSideRender;var b=n.n(g);const h=function({attributes:t,context:n,name:o}){return(0,e.createElement)("div",{...(0,p.useBlockProps)()},(0,e.createElement)(a.Disabled,null,(0,e.createElement)(b(),{attributes:t,block:o,EmptyResponsePlaceholder:()=>(0,e.createElement)("div",{className:`wp-block-${o.replace("/","-")}`},o," ",(0,c.__)("Block rendered as empty.")),urlQueryArgs:"object"==typeof n&&Object.hasOwn(n,"postId")?{post_id:n.postId}:{}})))},k=window.wp.date,y=window.wp.element,v=()=>{const{timezone:t}=(0,k.getSettings)(),n=(new Date).getTimezoneOffset()/60*-1;if(Number(t.offset)===n)return null;const o=Number(t.offset)>=0?"+":"",r=""!==t.abbr&&isNaN(Number(t.abbr))?t.abbr:`UTC${o}${t.offsetFormatted}`,l=t.string.replace("_"," "),i="UTC"===t.string?(0,c.__)("Coordinated Universal Time"):`(${r}) ${l}`;return 0===l.trim().length?(0,e.createElement)(e.Fragment,null,r):(0,e.createElement)(a.Tooltip,{placement:"top",text:i},(0,e.createElement)("span",null,r))};const E=function({editButtonText:t,label:n,id:o,onChange:r,value:l}){const[i,s]=(0,y.useState)(!1),u=(0,k.getSettings)(),d=l?(0,c.__)("Edit date","block-editor-components"):(0,c.__)("Set date","block-editor-components"),m=(e,t="Y-m-d H:i:s")=>{const n=new Date(e+" +00:00");return n instanceof Date&&!isNaN(n)?(0,k.date)(t,n):null};return(0,e.createElement)(a.BaseControl,{id:o,label:n},l&&(0,e.createElement)("p",null,m(l,u.formats.datetime),(0,e.createElement)(v,null)),(0,e.createElement)(a.Button,{style:{display:"block"},variant:"link",onClick:()=>s(!i)},t||d),i&&(0,e.createElement)(a.Popover,{onFocusOutside:()=>s(!i)},(0,e.createElement)("div",{style:{padding:"1.5em"}},(0,e.createElement)(a.DateTimePicker,{currentDate:m(l)||"",is12Hour:!1,onChange:e=>r((e=>{const t=wp.date.getDate(e);return(0,k.gmdate)("Y-m-d H:i:s",t)})(e))}),(0,e.createElement)(a.Button,{size:"small",style:{marginTop:"1em"},variant:"primary",onClick:()=>s(!i)},(0,c.__)("Done","block-editor-components")))))};function S(e,t){var n;const o=null!==(n=e?.sizes)&&void 0!==n?n:e?.media_details?.sizes,r=o?.[t];return r?{src:r.url||r.source_url,width:r.width,height:r.height}:null}const w=["image"],_=(0,c.__)("Select Image","block-editor-components"),C=(0,c.__)("Select Image","block-editor-components"),T=(0,c.__)("Remove image","block-editor-components"),B=(0,c.__)("Replace Image","block-editor-components");function x(t){const{buttonText:n=_,className:o,help:r,id:l,label:c,modalTitle:s=C,removeButtonText:u=T,replaceButtonText:d=B,size:m,value:f,onChange:g}=t,b=(0,i.useSelect)((e=>{const t=e("core").getMedia(f,{context:"view"});return t?t.alt_text:""}),[f]),h=(0,i.useSelect)((e=>{const t=e("core").getMedia(f,{context:"view"});if(t){if(m){const e=S(t,m);if(e)return e.src}return t.source_url}}),[m,f]);return(0,e.createElement)(a.BaseControl,{className:o,help:r,id:l,label:c},(0,e.createElement)(p.MediaUploadCheck,null,(0,e.createElement)(p.MediaUpload,{allowedTypes:w,render:({open:t})=>(0,e.createElement)("div",null,f?h?(0,e.createElement)(a.Button,{isLink:!0,onClick:t},(0,e.createElement)("img",{alt:b,src:h})):(0,e.createElement)(a.Spinner,null):null,(0,e.createElement)(a.Button,{isSecondary:!0,onClick:t},f?d:n)),title:s,onSelect:g})),(0,e.createElement)("br",null),f?(0,e.createElement)(a.Button,{isDestructive:!0,isLink:!0,onClick:()=>g(null)},u):null)}var I=n(556),P=n.n(I);const R=window.wp.blocks;function N({className:t,allowedBlocks:n,template:o,currentItemIndex:r=0,parentBlockId:l,renderAppender:a=!1,captureToolbars:i=!0,perPage:c=1}){const s=(0,e.useRef)(),u=(0,p.useInnerBlocksProps)({id:`inner-block-display-single-${l}`,className:t},{__experimentalCaptureToolbars:i,allowedBlocks:n,orientation:"horizontal",renderAppender:a,template:o,templateLock:!1});return(0,e.useEffect)((()=>{if(!s.current)return;const e=`#inner-block-display-single-${l}`;let t="";c>1&&(t+=`${e} { display: grid; grid-template-columns: repeat(${c}, 1fr); gap: 1em; }`),t+=`${e} > *:not(`;for(let e=1;e<=c;e++)t+=`:nth-child(${r+e}), `;t=t.slice(0,-2)+")",t+="{ display: none; }",s.current.innerHTML=`${t}`}),[r,s,l,c]),(0,e.createElement)(e.Fragment,null,(0,e.createElement)("style",{ref:s}),(0,e.createElement)("div",{...u}))}N.propTypes={parentBlockId:P().string.isRequired,allowedBlocks:P().arrayOf(P().string).isRequired,template:P().array,className:P().string,currentItemIndex:P().number,renderAppender:P().oneOfType([P().bool,P().element]),perPage:P().number};const O=N;var F=n(942),M=n.n(F);function L({totalPages:t,currentPage:n,setCurrentPage:o,prevEnabled:r,nextEnabled:l,addSlide:i=(()=>{}),addSlideEnabled:c=!1}){return(0,e.createElement)("div",{className:"inner-block-slider__navigation"},(0,e.createElement)(a.IconButton,{disabled:!r,icon:"arrow-left-alt2",isSecondary:!0,isSmall:!0,onClick:()=>{r&&o(n-1)}}),[...Array(t).keys()].map((t=>(0,e.createElement)(a.Button,{key:t+1,"aria-label":`Slide ${t+1}`,className:M()("components-button","is-not-small",{"is-primary":n===t+1,"is-secondary":n!==t+1}),type:"button",onClick:()=>{o(t+1)}},t+1))),(0,e.createElement)(a.IconButton,{disabled:!l,icon:"arrow-right-alt2",isSecondary:!0,isSmall:!0,onClick:()=>{l&&o(n+1)}}),(0,e.createElement)(a.IconButton,{disabled:!c,icon:"plus-alt2",isSecondary:!0,isSmall:!0,onClick:()=>i()}))}L.propTypes={totalPages:P().number.isRequired,currentPage:P().number.isRequired,setCurrentPage:P().func.isRequired,prevEnabled:P().bool.isRequired,nextEnabled:P().bool.isRequired,addSlide:P().func,addSlideEnabled:P().bool};const A=L,D=({parentBlockId:t,allowedBlock:n,template:o,slideLimit:r=10,currentItemIndex:l,setCurrentItemIndex:a,showNavigation:c=!0,perPage:s=1})=>{const u=o||[[n]],{slideBlocks:d,selectedBlockId:m,getLowestCommonAncestorWithSelectedBlock:p}=(0,i.useSelect)((e=>{const n=e("core/block-editor");return{slideBlocks:n.getBlock(t).innerBlocks,selectedBlockId:n.getSelectedBlockClientId(),getLowestCommonAncestorWithSelectedBlock:n.getLowestCommonAncestorWithSelectedBlock}})),{selectBlock:f}=(0,i.useDispatch)("core/block-editor"),g=(0,e.useRef)(d.length),{insertBlock:b}=(0,i.useDispatch)("core/block-editor");return(0,e.useEffect)((()=>{if(d.length>g.current){const e=d.length-1;a(e),f(d[e].clientId)}else if(d.length<g.current&&l+1>d.length){const e=d.length-1;a(e),f(d[e].clientId)}g.current=d.length}),[d.length,l,g,a,f,d]),(0,e.useEffect)((()=>{const e=d.findIndex((e=>p(e.clientId)===e.clientId));e>=0&&a(e)}),[m,d,a,p]),(0,e.createElement)("div",{className:"inner-block-slider"},(0,e.createElement)(O,{allowedBlocks:[n],className:"slides",currentItemIndex:l,parentBlockId:t,perPage:s,template:u}),c&&(0,e.createElement)(A,{addSlide:()=>{const e=(0,R.createBlock)(n);b(e,void 0,t)},addSlideEnabled:d.length<r,currentPage:l+1,nextEnabled:l+1<d.length,prevEnabled:l+1>1,setCurrentPage:e=>{a(e-1),f(d[e-1].clientId)},totalPages:d.length}))};D.propTypes={parentBlockId:P().string.isRequired,allowedBlock:P().string.isRequired,template:P().array,showNavigation:P().bool,currentItemIndex:P().number.isRequired,setCurrentItemIndex:P().func.isRequired};const $=D,q=t=>{const[n,o]=(0,e.useState)(0);return(0,e.createElement)($,{...t,currentItemIndex:n,setCurrentItemIndex:o})};q.Controlled=$;const j=q;function H({label:t,id:n,help:o,onChange:r,value:l}){const i="hm-block-editor-components-link-control";return(0,e.useEffect)((()=>{const e=document.createElement("style");return e.innerHTML=`\n\t\t\t.${i} {\n\t\t\t\twidth: 100%;\n\t\t\t}\n\n\t\t\t.${i} .block-editor-url-input {\n\t\t\t\tmin-width: 0;\n\t\t\t\tmax-width: none;\n\t\t\t\tposition: relative;\n\t\t\t}\n\n\t\t\t.${i} .components-base-control__field,\n\t\t\t.${i} .components-input-control {\n\t\t\t\tmargin-bottom: 0;\n\t\t\t}\n\t\t`,document.head.appendChild(e),()=>{document.head.removeChild(e)}}),[i]),(0,e.createElement)(a.BaseControl,{className:i,help:o,id:n,label:t},(0,e.createElement)(p.URLInput,{value:l,onChange:r}))}H.propTypes={label:P().string.isRequired,help:P().string,id:P().string,onChange:P().func.isRequired,value:P().string};const U=H;function W(t){const{onChange:n,opensInNewTab:o,url:r}=t,[l,i]=(0,e.useState)(!1),s=(0,e.useMemo)((()=>[{icon:"admin-links",title:(0,c.__)("Link","block-editor-components"),isActive:r?.length>0,onClick:()=>i(!l)}]),[i,l,r]),u=(0,e.useMemo)((()=>({url:r,opensInNewTab:o})),[o,r]);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.ToolbarGroup,{controls:s}),l&&(0,e.createElement)(a.Popover,null,(0,e.createElement)(p.__experimentalLinkControl,{forceIsEditingLink:l,opensInNewTab:o,value:u,onChange:n})))}function z(t){const{className:n,limit:o=0,onChange:r,...l}=t,[a,i]=(0,e.useState)(o&&t.value?.length>o);return(0,e.createElement)(p.PlainText,{className:`${n} limit-text ${a?"invalid":""}`.trim(),onChange:e=>{o&&e.length>o?a||i(!0):(a&&i(!1),r(e))},...l})}const V=/[\r\n]+/g;function G(t){const{editPost:n}=(0,i.useDispatch)("core/editor"),o=(0,i.useSelect)((e=>e("core/editor").getEditedPostAttribute("title")),[]),r=(0,e.useCallback)((e=>n({title:e.replace(V," ")})),[n]);return(0,e.createElement)(p.RichText,{...t,allowedFormats:[],value:o,onChange:r})}function Y(e){var t;const{postType:n}=e;return(0,i.useSelect)((e=>e("core/editor").getCurrentPostType()),[])===n?e.children:null!==(t=e.fallback)&&void 0!==t?t:null}const Q=window.wp.dom,J=e=>{const t=document.createRange();t.selectNodeContents(e),t.collapse(!1);const n=window.getSelection();n.removeAllRanges(),n.addRange(t)};function K(t){const{className:n,limit:o=0,onChange:r,...l}=t,a=(0,e.useRef)(),[i,c]=(0,e.useState)(o&&t.value?.length>o),[s,u]=(0,e.useState)(!1);return(0,e.createElement)(p.RichText,{ref:a,className:`${n} limit-text ${i?"invalid":""}`.trim(),onChange:e=>{if(o&&(0,Q.__unstableStripHTML)(e).length>o)return u(!1),a.current.innerHTML=t.value,J(a.current),void(i||c(!0));s&&i&&c(!1),u(!0),r(e)},...l})}const X=window.wp.compose,Z=window.wp.coreData,ee=window.wp.htmlEntities,te=[],ne={order:"asc",_fields:"id,name",context:"view"},oe=(e,t)=>{const n=t?.id||e?.find((e=>e.name===t))?.id;if(n)return n;const o=t.toLocaleLowerCase();return e?.find((e=>e.name.toLocaleLowerCase()===o))?.id};const re=function({label:t,taxonomy:n,termIds:o,onChange:r}){const[l,s]=(0,y.useState)(""),[u,d]=(0,y.useState)(te),[m,p]=(0,y.useState)(te),f=(0,X.useDebounce)(s,250),g=(0,i.useSelect)((e=>e("core").getTaxonomy(n)),[n]),{searchResults:b,searchHasResolved:h}=(0,i.useSelect)((e=>{if(!l)return{searchResults:te,searchHasResolved:!0};const{getEntityRecords:t,hasFinishedResolution:r}=e(Z.store),a=["taxonomy",n,{...ne,search:l,orderby:"name",exclude:o,per_page:20}];return{searchResults:t(...a),searchHasResolved:r("getEntityRecords",a)}}),[l,o]),k=(0,i.useSelect)((e=>{if(!o?.length)return te;const{getEntityRecords:t}=e(Z.store);return t("taxonomy",n,{...ne,include:o,per_page:o.length})}),[o]);return(0,y.useEffect)((()=>{if(o?.length||d(te),!k?.length)return;const e=o.reduce(((e,t)=>{const n=k.find((e=>e.id===t));return n&&e.push({id:t,value:n.name}),e}),[]);d(e)}),[o,k]),(0,y.useEffect)((()=>{h&&p(b.map((e=>e.name)))}),[b,h]),(0,e.createElement)(a.FormTokenField,{displayTransform:ee.decodeEntities,label:t||(0,c.sprintf)((0,c.__)("Filter by %s","block-editor-components"),g?g?.labels?.singular_name:(0,c.__)("term","block-editor-components")),suggestions:m,value:u,onChange:e=>{const t=new Set;for(const n of e){const e=oe(b,n);e&&t.add(e)}p(te),r(Array.from(t))},onInputChange:f})};const le=function(t){const{taxonomy:n,value:o=[],onChange:r}=t,l=(0,i.useSelect)((e=>e("core").getTaxonomy(n)),[n]),{taxonomyTermsById:s,taxonomyTermsByTitle:u}=(0,i.useSelect)((e=>{var t;const o=null!==(t=e("core").getEntityRecords("taxonomy",n,{per_page:100}))&&void 0!==t?t:[],r=function(e){return e?e.reduce(((e,t)=>(e[t.id]=t.name,e)),{}):[]}(o),l=function(e){return e?e.reduce(((e,t)=>(e[t.name]=t.id,e)),{}):[]}(o);return{taxonomyTermsById:r,taxonomyTermsByTitle:l}}),[n]),d=o.map((e=>s[e])).filter(Boolean);return(0,e.createElement)(a.FormTokenField,{label:(0,c.sprintf)((0,c.__)("Filter by %s","block-editor-components"),l?l.labels.singular_name:""),suggestions:Object.values(s),value:d,onChange:e=>{r(e.map((e=>u[e])))}})};function ae(t){const{postType:n,queryArgs:o,onChange:r,values:l=[],isSortable:s=!1}=t,u=(0,i.useSelect)((e=>{var t;return null!==(t=e("core").getEntityRecords("postType",n,o))&&void 0!==t?t:[]}),[n,o]),d=(0,i.useSelect)((e=>e("core/data").isResolving("core","getEntityRecords",["postType",n,o])));return(0,e.createElement)("div",{style:{marginTop:-24,paddingTop:24,paddingLeft:4,marginLeft:-4}},d&&(0,e.createElement)(a.Spinner,null)||u.length<1&&(0,e.createElement)(a.Notice,{isDismissible:!1},(0,c.__)("No results found","block-editor-components"))||u.map((t=>(0,e.createElement)("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",marginRight:-2,paddingRight:2}},(0,e.createElement)(a.CheckboxControl,{key:t.id,checked:l.includes(t.id),label:t.title?.rendered||(0,c.__)("(No title)","block-editor-components"),onChange:e=>{r(e?[...l,t.id]:l.filter((e=>e!==t.id)))}}),s&&(0,e.createElement)(a.ButtonGroup,null,(0,e.createElement)(a.Button,{icon:"arrow-up-alt2",iconSize:12,isSmall:!0,label:(0,c.__)("Move up","block-editor-components"),variant:"secondary",onClick:()=>(e=>{const t=l.indexOf(e);-1!==t&&0!==t&&r([...l.slice(0,t-1),l[t],l[t-1],...l.slice(t+1)])})(t.id)}),(0,e.createElement)(a.Button,{icon:"arrow-down-alt2",iconSize:12,isSmall:!0,label:(0,c.__)("Move down","block-editor-components"),variant:"secondary",onClick:()=>(e=>{const t=l.indexOf(e);-1!==t&&t!==l.length-1&&r([...l.slice(0,t),l[t+1],l[t],...l.slice(t+2)])})(t.id)}))))))}function ie(t){const{postType:n,onChange:o,values:r,taxonomies:l}=t,[s,u]=(0,y.useState)(""),d=(0,i.useSelect)((e=>l.map((t=>e("core").getTaxonomy(t)))),[l]),[m,p]=(0,y.useState)([]),f=(0,e.useCallback)(((e,t)=>{const n=d.find((t=>t&&t.slug===e));n&&p({...m,[`${n.rest_base}`]:t})}),[m,d]);(0,e.useEffect)((()=>{d.forEach((e=>{e&&!m[e.rest_base]&&f(e.rest_base,[])}))}),[d,f,m]);const g={search:s||void 0,per_page:30,...m,context:"view"};return(0,e.createElement)(a.Flex,{align:"flex-start",style:{gap:24}},(0,e.createElement)(a.FlexItem,{style:{width:"35%"}},(0,e.createElement)(a.SearchControl,{label:(0,c.__)("Search Posts","block-editor-components"),style:{marginBottom:24},value:s,onChange:e=>u(e)}),l.map((t=>{const n=d.find((e=>e&&e.slug===t));return n?(0,e.createElement)(le,{taxonomy:t,value:m[n.rest_base],onChange:e=>f(t,e)}):null}))),(0,e.createElement)(a.FlexItem,{style:{width:"65%"}},(0,e.createElement)(ae,{postType:n,queryArgs:g,values:r,onChange:o})))}function ce(t){const{title:n,postType:o="post",taxonomies:r=[],values:l=[],onChange:i,setModalOpen:s}=t;return(0,e.createElement)(a.Modal,{style:{width:"800px",maxWidth:"100%"},title:n,onRequestClose:()=>s(!1)},(0,e.createElement)("div",{style:{marginTop:-16}},(0,e.createElement)(a.TabPanel,{tabs:[{name:"browse",title:(0,c.__)("Browse Posts","block-editor-components"),content:()=>(0,e.createElement)(e.Fragment,null,"Foo")},{name:"selection",title:(0,c.__)("Current Selection","block-editor-components")}]},(t=>(0,e.createElement)("div",{style:{marginTop:"calc( var(--wp-admin-border-width-focus) * -1 )",borderStyle:"none",borderTop:"var( --wp-admin-border-width-focus ) solid #ddd",paddingTop:24}},"browse"===t.name&&(0,e.createElement)(ie,{postType:o,taxonomies:r,values:l,onChange:i}),"selection"===t.name&&(0,e.createElement)(ae,{isSortable:!0,postType:o,queryArgs:{include:l,orderby:"include",per_page:l.length},values:l,onChange:i}))))))}function se(t){const{title:n=(0,c.__)("Select posts","block-editor-components"),icon:o="edit"}=t,[r,l]=(0,y.useState)(!1);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.ToolbarButton,{icon:o,label:n,onClick:()=>l(!0)},n),r&&(0,e.createElement)(ce,{...t,setModalOpen:l,title:n}))}function ue(t){const{title:n=(0,c.__)("Select posts","block-editor-components")}=t,[o,r]=(0,y.useState)(!1);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.Button,{variant:"primary",onClick:()=>r(!0)},n),o&&(0,e.createElement)(ce,{...t,setModalOpen:r,title:n}))}const de=/^is-style-/;function me(t){const{blockName:n,className:o}=(0,i.useSelect)((e=>{var n,o;const r=e("core/block-editor").getBlock(t);return{blockName:null!==(n=r?.name)&&void 0!==n?n:"",className:null!==(o=r?.attributes?.className)&&void 0!==o?o:""}}),[t]),{blockStyles:r,defaultStyle:l}=pe(n),a=(0,e.useMemo)((()=>r.map((({name:e})=>e))),[r]),c=(0,e.useMemo)((()=>function(e=""){return e.trim().replace(/\s+/," ").split(" ").map((e=>de.test(e)?e.replace(de,""):"")).filter(Boolean)}(o)),[o]);return(0,e.useMemo)((()=>{var e;return null!==(e=c.find((e=>a.includes(e))))&&void 0!==e?e:l}),[a,c,l])}function pe(t){const n=(0,i.useSelect)((e=>e("core/blocks").getBlockStyles(t)),[t]);return(0,e.useMemo)((()=>{var e;return{blockStyles:n,defaultStyle:null!==(e=n.find((({isDefault:e})=>e))?.name)&&void 0!==e?e:""}}),[n])}function fe(t){return(0,e.useMemo)((()=>{const e=(0,R.getBlockTypes)();return e?.length?e.filter((({name:e,parent:n})=>!n&&!t.includes(e))).map((({name:e})=>e)):[]}),[t])}function ge(t,n){var o;const{editPost:r}=(0,i.useDispatch)("core/editor"),l=(0,i.useSelect)((e=>e("core/editor").getEditedPostAttribute("meta"))),a=(0,e.useCallback)((e=>r({meta:{[t]:e}})),[r,t]);return[null!==(o=l?.[t])&&void 0!==o?o:n,a]}function be(){const{editPost:e}=(0,i.useDispatch)("core/editor"),t=(0,i.useSelect)((e=>e("core/editor").getEditedPostAttribute("featured_media"))),n=(0,i.useSelect)((e=>t?e("core").getMedia(t):null),[t]),o=(0,y.useCallback)((t=>{e({featured_media:t})}),[e]);return{postThumbnail:n,postThumbnailId:t,setPostThumbnail:o}}function he(e,t,n){return(0,i.useSelect)((o=>{const{innerBlocks:r}=o("core/block-editor").getBlock(e);return r?.length<t&&n}),[])}function ke(){const{selectBlock:t}=(0,i.useDispatch)("core/block-editor");return(0,e.useCallback)((e=>{const n=document.getElementById(`block-${e}`);n&&(t(e),setTimeout((()=>n.scrollIntoView({behavior:"smooth"})),200))}),[t])}function ye(t,n,o){return(0,e.useCallback)(((e=o)=>n({[t]:e})),[t,o,n])}function ve(e){const{getBlocks:t}=(0,i.select)("core/block-editor");return t().find((({name:t})=>t===e))}function Ee(e,t){return e.find((e=>!t(e)))}function Se(e,t){return e.filter((e=>!t(e)))}function we(e,t){return e.find((e=>t(e)))}function _e(e,t){return e.filter((e=>t(e)))}function Ce(e,t=""){const{id:n,title:o}=e;return{label:t+(0,ee.decodeEntities)(o.rendered||(0,c.sprintf)((0,c.__)("#%d (no title)","block-editor-components"),n)),value:n}}function Te(e,t=""){const{id:n,name:o}=e;return{label:t+(0,ee.decodeEntities)(o||(0,c.sprintf)((0,c.__)("#%d (no name)","block-editor-components"),n)),value:n}}function Be(e){return e.map((e=>Ce(e)))}function xe(e,t="\u2014 ",n=0){return e.map((({children:e=[],...o})=>[Ce(o,t.repeat(n)),...xe(e,t,n+1)])).flat()}function Ie(e){return e.map((e=>Te(e)))}function Pe(e,t="\u2014 ",n=0){return e.map((({children:e=[],...o})=>[Te(o,t.repeat(n)),...Pe(e,t,n+1)])).flat()}function Re(e,...t){if(e.variations?.length){const n=function(e){return(t,n)=>e.every((e=>t[e]===n[e]))}(t);e.variations=e.variations.map((e=>(e.isActive=n,e)))}return e}})(),o})()));

/***/ }),

/***/ "./node_modules/@10up/block-components/dist/components/media-toolbar/index.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@10up/block-components/dist/components/media-toolbar/index.js ***!
  \************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./hooks/use-media/index.ts":
/*!**********************************!*\
  !*** ./hooks/use-media/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_324__) {

__nested_webpack_require_324__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_324__.d(__nested_webpack_exports__, {
/* harmony export */   useMedia: function() { return /* binding */ useMedia; }
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_324__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_324__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_324__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__nested_webpack_require_324__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__);


function useMedia(id) {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    // @ts-ignore-next-line - The type definitions for the core store are incomplete.
    const {
      getMedia,
      isResolving,
      hasFinishedResolution
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__.store);
    const mediaParameters = [id, {
      context: 'view'
    }];
    return {
      media: getMedia(...mediaParameters),
      isResolvingMedia: isResolving('getMedia', mediaParameters),
      hasResolvedMedia: hasFinishedResolution('getMedia', mediaParameters)
    };
  }, [id]);
}

/***/ }),

/***/ "@wordpress/block-editor":
/*!******************************************!*\
  !*** external "@wordpress/block-editor" ***!
  \******************************************/
/***/ (function(module) {

module.exports = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");

/***/ }),

/***/ "@wordpress/components":
/*!****************************************!*\
  !*** external "@wordpress/components" ***!
  \****************************************/
/***/ (function(module) {

module.exports = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");

/***/ }),

/***/ "@wordpress/core-data":
/*!***************************************!*\
  !*** external "@wordpress/core-data" ***!
  \***************************************/
/***/ (function(module) {

module.exports = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");

/***/ }),

/***/ "@wordpress/data":
/*!**********************************!*\
  !*** external "@wordpress/data" ***!
  \**********************************/
/***/ (function(module) {

module.exports = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");

/***/ }),

/***/ "@wordpress/element":
/*!*************************************!*\
  !*** external "@wordpress/element" ***!
  \*************************************/
/***/ (function(module) {

module.exports = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");

/***/ }),

/***/ "@wordpress/i18n":
/*!**********************************!*\
  !*** external "@wordpress/i18n" ***!
  \**********************************/
/***/ (function(module) {

module.exports = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_3512__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_3512__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nested_webpack_require_3512__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__nested_webpack_require_3512__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_3512__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_3512__.o(definition, key) && !__nested_webpack_require_3512__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_3512__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_3512__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __nested_webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
!function() {
/*!********************************************!*\
  !*** ./components/media-toolbar/index.tsx ***!
  \********************************************/
__nested_webpack_require_3512__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_3512__.d(__nested_webpack_exports__, {
/* harmony export */   MediaToolbar: function() { return /* binding */ MediaToolbar; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_3512__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_3512__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_3512__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__nested_webpack_require_3512__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_3512__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__nested_webpack_require_3512__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_3512__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__nested_webpack_require_3512__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hooks_use_media__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_3512__(/*! ../../hooks/use-media */ "./hooks/use-media/index.ts");
var _jsxFileName = "/Users/fabiankaegy/Developer/10up/block-components/components/media-toolbar/index.tsx";


// @ts-ignore-next-line - The types for this package are incorrect.



const DEFAULT_LABELS = {
  add: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add Image', '10up-block-components'),
  remove: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove Image', '10up-block-components'),
  replace: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Replace Image', '10up-block-components')
};

/*
 * MediaToolbar
 *
 * This is a helper component that adds the Media Replace Flow
 * with some buttons to add or remove an image.
 *
 * This should be used on components that have optional images.
 */
const MediaToolbar = ({
  onSelect,
  onRemove,
  isOptional = false,
  id,
  labels = {}
}) => {
  const hasImage = !!id;
  const {
    media
  } = (0,_hooks_use_media__WEBPACK_IMPORTED_MODULE_4__.useMedia)(id);
  const mergedLabels = {
    ...DEFAULT_LABELS,
    ...labels
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarGroup, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 3
    }
  }, hasImage ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaReplaceFlow, {
    mediaId: id,
    mediaUrl: media?.source_url,
    onSelect: onSelect,
    name: mergedLabels.replace,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 6
    }
  }), !!isOptional && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarButton, {
    onClick: onRemove,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 7
    }
  }, mergedLabels.remove)) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 5
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    onSelect: onSelect,
    render: ({
      open
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarButton, {
      onClick: open,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 83,
        columnNumber: 8
      }
    }, mergedLabels.add),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 6
    }
  })));
};
}();
module.exports = __nested_webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@10up/block-components/dist/hooks/use-media/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@10up/block-components/dist/hooks/use-media/index.js ***!
  \***************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/core-data":
/*!***************************************!*\
  !*** external "@wordpress/core-data" ***!
  \***************************************/
/***/ (function(module) {

module.exports = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");

/***/ }),

/***/ "@wordpress/data":
/*!**********************************!*\
  !*** external "@wordpress/data" ***!
  \**********************************/
/***/ (function(module) {

module.exports = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_806__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_806__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nested_webpack_require_806__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__nested_webpack_require_806__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_806__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_806__.o(definition, key) && !__nested_webpack_require_806__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_806__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_806__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __nested_webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
!function() {
/*!**********************************!*\
  !*** ./hooks/use-media/index.ts ***!
  \**********************************/
__nested_webpack_require_806__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_806__.d(__nested_webpack_exports__, {
/* harmony export */   useMedia: function() { return /* binding */ useMedia; }
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_806__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_806__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_806__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__nested_webpack_require_806__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__);


function useMedia(id) {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    // @ts-ignore-next-line - The type definitions for the core store are incomplete.
    const {
      getMedia,
      isResolving,
      hasFinishedResolution
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__.store);
    const mediaParameters = [id, {
      context: 'view'
    }];
    return {
      media: getMedia(...mediaParameters),
      isResolvingMedia: isResolving('getMedia', mediaParameters),
      hasResolvedMedia: hasFinishedResolution('getMedia', mediaParameters)
    };
  }, [id]);
}
}();
module.exports = __nested_webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _defineProperty; }
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperty(e, r, t) {
  return (r = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _objectWithoutProperties; }
/* harmony export */ });
/* harmony import */ var _objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objectWithoutPropertiesLoose.js */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");

function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = (0,_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _objectWithoutPropertiesLoose; }
/* harmony export */ });
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ toPrimitive; }
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");

function toPrimitive(t, r) {
  if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ toPropertyKey; }
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js");


function toPropertyKey(t) {
  var i = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__["default"])(t, "string");
  return "symbol" == (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i) ? i : i + "";
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _typeof; }
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}


/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/link-off.js":
/*!************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/link-off.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const linkOff = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M17.031 4.703 15.576 4l-1.56 3H14v.03l-2.324 4.47H9.5V13h1.396l-1.502 2.889h-.95a3.694 3.694 0 0 1 0-7.389H10V7H8.444a5.194 5.194 0 1 0 0 10.389h.17L7.5 19.53l1.416.719L15.049 8.5h.507a3.694 3.694 0 0 1 0 7.39H14v1.5h1.556a5.194 5.194 0 0 0 .273-10.383l1.202-2.304Z"
  })
});
/* harmony default export */ __webpack_exports__["default"] = (linkOff);
//# sourceMappingURL=link-off.js.map

/***/ }),

/***/ "./src/icon-card/block.json":
/*!**********************************!*\
  !*** ./src/icon-card/block.json ***!
  \**********************************/
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"pulsar/icon-card","version":"0.1.0","title":"Icon Card","category":"media","icon":"image-filter","attributes":{"imageId":{"type":"number"},"url":{"type":"string"},"openInNewTab":{"type":"boolean","default":false}},"styles":[{"name":"default","label":"Default","isDefault":true}],"supports":{"html":false},"textdomain":"pulsar","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}');

/***/ }),

/***/ "./src/icon-card/edit.js":
/*!*******************************!*\
  !*** ./src/icon-card/edit.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Edit; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/link-off.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./src/icon-card/editor.scss");
/* harmony import */ var _10up_block_components_components_media_toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @10up/block-components/components/media-toolbar */ "./node_modules/@10up/block-components/dist/components/media-toolbar/index.js");
/* harmony import */ var _10up_block_components_components_media_toolbar__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_10up_block_components_components_media_toolbar__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _10up_block_components_hooks_use_media__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @10up/block-components/hooks/use-media */ "./node_modules/@10up/block-components/dist/hooks/use-media/index.js");
/* harmony import */ var _10up_block_components_hooks_use_media__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_10up_block_components_hooks_use_media__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _humanmade_block_editor_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @humanmade/block-editor-components */ "../../../../node_modules/@humanmade/block-editor-components/dist/index.js");
/* harmony import */ var _humanmade_block_editor_components__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_humanmade_block_editor_components__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__);


const _excluded = ["children"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }










/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   param0
 * @param {Object}   param0.attributes
 * @param {Function} param0.setAttributes
 * @return {WPElement} Element to render.
 */

function Edit({
  attributes,
  setAttributes
}) {
  const {
    imageId,
    url,
    opensInNewTab
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)();
  const _useInnerBlocksProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useInnerBlocksProps)(blockProps, {
      allowedBlocks: ['core/heading', 'core/paragraph'],
      template: [['core/paragraph', {
        fontSize: 'md'
      }]],
      orientation: 'vertical'
    }),
    {
      children
    } = _useInnerBlocksProps,
    innerBlocksProps = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_useInnerBlocksProps, _excluded);
  const Icon = () => {
    const {
      media,
      hasResolvedMedia
    } = (0,_10up_block_components_hooks_use_media__WEBPACK_IMPORTED_MODULE_8__.useMedia)(imageId);
    const [svgContent, setSvgContent] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(null);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
      // If the media is an SVG, fetch and inline its content
      if ((media === null || media === void 0 ? void 0 : media.mime_type) === 'image/svg+xml') {
        fetch(media.source_url).then(response => response.text()).then(data => {
          setSvgContent(data);
        }).catch(error => {
          console.error('Error fetching SVG:', error);
          setSvgContent(null);
        });
      }
    });
    if (!hasResolvedMedia || !media) {
      return null;
    }

    // If it's an SVG and we have the content, inline it
    if (media.mime_type === 'image/svg+xml' && svgContent) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
        className: "wp-block-pulsar-icon-card__icon",
        dangerouslySetInnerHTML: {
          __html: svgContent
        }
      });
    }

    // Otherwise, display it as an image
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
      className: "wp-block-pulsar-icon-card__icon",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("img", {
        src: media.source_url,
        alt: media.alt_text
      })
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.BlockControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_10up_block_components_components_media_toolbar__WEBPACK_IMPORTED_MODULE_7__.MediaToolbar, {
        id: imageId,
        onSelect: image => setAttributes({
          imageId: image.id
        }),
        onRemove: () => setAttributes({
          imageId: null
        }),
        labels: {
          add: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Add Icon', 'pulsar-blocks'),
          replace: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Replace Icon', 'pulsar-blocks')
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_humanmade_block_editor_components__WEBPACK_IMPORTED_MODULE_9__.LinkToolbar, {
        opensInNewTab: opensInNewTab,
        url: url,
        onChange: ({
          opensInNewTab,
          url
        }) => setAttributes({
          opensInNewTab,
          url
        })
      }), url && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarGroup, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarButton, {
          icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_11__["default"],
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Remove Link', 'pulsar-blocks'),
          onClick: () => setAttributes({
            url: undefined,
            opensInNewTab: false
          })
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", _objectSpread(_objectSpread({}, innerBlocksProps), {}, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
        className: "wp-block-pulsar-icon-card__icon-container",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(Icon, {})
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
        className: "wp-block-pulsar-icon-card__content",
        children: children
      })]
    }))]
  });
}

/***/ }),

/***/ "./src/icon-card/editor.scss":
/*!***********************************!*\
  !*** ./src/icon-card/editor.scss ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/icon-card/index.js":
/*!********************************!*\
  !*** ./src/icon-card/index.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/icon-card/style.scss");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/icon-card/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/icon-card/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/icon-card/save.js");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */



const {
  name
} = _block_json__WEBPACK_IMPORTED_MODULE_2__;

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ }),

/***/ "./src/icon-card/save.js":
/*!*******************************!*\
  !*** ./src/icon-card/save.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const Save = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InnerBlocks.Content, {});
/* harmony default export */ __webpack_exports__["default"] = (Save);

/***/ }),

/***/ "./src/icon-card/style.scss":
/*!**********************************!*\
  !*** ./src/icon-card/style.scss ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ (function(module) {

"use strict";
module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"icon-card/index": 0,
/******/ 			"icon-card/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkpulsar_blocks"] = self["webpackChunkpulsar_blocks"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["icon-card/style-index"], function() { return __webpack_require__("./src/icon-card/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map