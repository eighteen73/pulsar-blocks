(()=>{"use strict";class t{constructor({targetModal:t,triggers:e=[],dismissedDuration:s}){this.modalId=t,this.dismissedDuration=s,this.modal=document.querySelector(`[data-modal-id="${this.modalId}"]`),this.originalParent=this.modal.parentNode,this.portalContainer=document.getElementById("pulsar-modal-portal"),e.length>0&&this.registerTriggers(...e),this.modal.removeAttribute("data-modal-trigger-delay"),this.modal.removeAttribute("data-modal-trigger-selector"),this.modal.removeAttribute("data-modal-dismissed-duration"),this.onClick=this.onClick.bind(this),this.onKeydown=this.onKeydown.bind(this)}modal;modalId;openTrigger="data-trigger-modal";closeTrigger="wp-block-pulsar-modal__close";openClass="is-open";bodyOpenClass="modal-is-open";dismissedDuration=0;activeElement;focusableElements='a[href],area[href],input:not([disabled]):not([type="hidden"]):not([aria-hidden]),select:not([disabled]):not([aria-hidden]),textarea:not([disabled]):not([aria-hidden]),button:not([disabled]):not([aria-hidden]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])';registerTriggers(...t){t.filter(Boolean).forEach((t=>{t.addEventListener("click",(t=>{("A"===t.target.tagName||t.target.closest("a"))&&!this.modal.classList.contains(this.openClass)&&(t.preventDefault(),t.stopPropagation()),this.showModal(!0)})),t.addEventListener("keydown",(t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this.showModal(!0))}))}))}setStorage(){const t=(new Date).getTime()+60*this.dismissedDuration*1e3;window.localStorage.setItem("pulsar_modal_"+this.modalId,t)}getStorage(){const t=window.localStorage.getItem("pulsar_modal_"+this.modalId);return!!(t&&(new Date).getTime()<t)}showModal(t=!1){this.dismissedDuration&&this.getStorage()&&!1===t||(this.activeElement=this.modal.ownerDocument.activeElement,this.moveToPortal(),this.modal.classList.add(this.openClass),document.body.classList.add(this.bodyOpenClass),this.updateAriaExpanded("true"),this.addEventListeners(),this.setFocusToFirstNode())}closeModal(){this.removeEventListeners(),this.activeElement&&this.activeElement.focus&&this.activeElement.focus(),this.modal.classList.remove(this.openClass),document.body.classList.remove(this.bodyOpenClass),this.updateAriaExpanded("false"),this.restoreToOriginalParent(),this.dismissedDuration&&this.setStorage()}moveToPortal(){this.portalContainer&&this.modal.parentNode!==this.portalContainer&&this.portalContainer.appendChild(this.modal)}restoreToOriginalParent(){this.originalParent&&this.modal.parentNode===this.portalContainer&&this.originalParent.appendChild(this.modal)}addEventListeners(){this.modal.addEventListener("touchstart",this.onClick),this.modal.addEventListener("click",this.onClick),document.addEventListener("keydown",this.onKeydown)}removeEventListeners(){this.modal.removeEventListener("touchstart",this.onClick),this.modal.removeEventListener("click",this.onClick),document.removeEventListener("keydown",this.onKeydown)}onClick(t){(t.target.classList.contains(this.closeTrigger)||t.target.parentNode.classList.contains(this.closeTrigger)||t.target.classList.contains("wp-block-pulsar-modal")||t.target.classList.contains("wp-block-pulsar-modal__overlay"))&&(t.preventDefault(),t.stopPropagation(),this.closeModal(t))}updateAriaExpanded(t){document.querySelectorAll(`[data-trigger-modal="${this.modalId}"]`).forEach((e=>{e.setAttribute("aria-expanded",t)}))}onKeydown(t){27===t.keyCode&&this.closeModal(t),9===t.keyCode&&this.retainFocus(t)}getFocusableNodes(){const t=this.modal.querySelectorAll(this.focusableElements);return Array.from(t)}setFocusToFirstNode(){const t=this.getFocusableNodes();if(0===t.length)return;const e=t.filter((t=>!t.classList.contains(this.closeTrigger)));e.length>0&&e[0].focus(),0===e.length&&t[0].focus()}retainFocus(t){let e=this.getFocusableNodes();if(0===e.length)return;e=e.filter((t=>null!==t.offsetParent));const s=e.indexOf(this.modal.ownerDocument.activeElement);t.shiftKey&&0===s&&(e[e.length-1].focus(),t.preventDefault()),!t.shiftKey&&e.length>0&&s===e.length-1&&(e[0].focus(),t.preventDefault())}}window.pulsarBlocks=window.pulsarBlocks||{},window.pulsarBlocks.modals=new Map,window.addEventListener("DOMContentLoaded",(()=>{if(!document.getElementById("modal-portal")){const t=document.createElement("div");t.id="pulsar-modal-portal",t.classList.add("pulsar-modal-portal"),document.body.appendChild(t)}window.modalBlocks=new Map,document.querySelectorAll(".wp-block-pulsar-modal").forEach((e=>{const s=e.getAttribute("data-modal-id"),o=e.getAttribute("data-modal-trigger-selector"),a=parseInt(e.getAttribute("data-modal-trigger-delay")),i=e.getAttribute("data-modal-dismissed-duration")||0,n=i.toString().replace(/\d+/g,"");let d=i;if(n)switch(n){case"mins":d=parseInt(i);break;case"hrs":d=60*parseInt(i);break;case"days":d=1440*parseInt(i);break;default:console.warn(`Unknown dismissed unit: ${n}`)}const r=Object.assign({},{openTrigger:"data-trigger-modal"}),l=[...document.querySelectorAll(`[${r.openTrigger}="${s}"]`),...o?document.querySelectorAll(`${o}`):[]];r.targetModal=s,r.triggers=l,r.dismissedDuration=d,window.pulsarBlocks.modals.set(s,new t(r)),null===a||isNaN(a)||setTimeout((()=>window.pulsarBlocks.modals.get(s).showModal()),a)}))}))})();