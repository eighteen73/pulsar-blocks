!function(){class t{constructor(t){this.tablistNode=t,this.tabs=[],this.firstTab=null,this.lastTab=null,this.tabs=Array.from(this.tablistNode.querySelectorAll(".wp-block-pulsar-tab-title")),this.tabpanels=[];for(var e=0;e<this.tabs.length;e++){var s=this.tabs[e],a=s.id.replace("tab-",""),i=document.querySelector("#tabpanel-"+a);s.tabIndex=-1,s.setAttribute("aria-selected","false"),this.tabpanels.push(i),s.addEventListener("keydown",this.onKeydown.bind(this)),s.addEventListener("click",this.onClick.bind(this)),this.firstTab||(this.firstTab=s),this.lastTab=s}this.setSelectedTab(this.firstTab,!1)}setSelectedTab(t,e){"boolean"!=typeof e&&(e=!0);for(var s=0;s<this.tabs.length;s+=1){var a=this.tabs[s];t===a?(a.setAttribute("aria-selected","true"),a.removeAttribute("tabindex"),this.tabpanels[s].classList.remove("is-hidden"),e&&a.focus()):(a.setAttribute("aria-selected","false"),a.tabIndex=-1,this.tabpanels[s].classList.add("is-hidden"))}}setSelectedToPreviousTab(t){var e;t===this.firstTab?this.setSelectedTab(this.lastTab):(e=this.tabs.indexOf(t),this.setSelectedTab(this.tabs[e-1]))}setSelectedToNextTab(t){var e;t===this.lastTab?this.setSelectedTab(this.firstTab):(e=this.tabs.indexOf(t),this.setSelectedTab(this.tabs[e+1]))}onKeydown(t){var e=t.currentTarget,s=!1;switch(t.key){case"ArrowLeft":this.setSelectedToPreviousTab(e),s=!0;break;case"ArrowRight":this.setSelectedToNextTab(e),s=!0;break;case"Home":this.setSelectedTab(this.firstTab),s=!0;break;case"End":this.setSelectedTab(this.lastTab),s=!0}s&&(t.stopPropagation(),t.preventDefault())}onClick(t){this.setSelectedTab(t.currentTarget)}}window.addEventListener("load",(function(){for(var e=document.querySelectorAll("[role=tablist].automatic"),s=0;s<e.length;s++)new t(e[s])}))}();