import{e as u,f as h,h as b,c as m}from"./web.c6b95cf4.js";var y=r=>(n,s,o,{client:a})=>{if(window._$HY||(window._$HY={events:[],completed:new WeakSet,r:{}}),!r.hasAttribute("ssr"))return;const d=a==="only"?h:b;let t={};if(Object.keys(o).length>0)if(u.context)r.querySelectorAll("astro-slot").forEach(e=>{t[e.getAttribute("name")||"default"]=e.cloneNode(!0)});else for(const[e,i]of Object.entries(o))t[e]=document.createElement("astro-slot"),e!=="default"&&t[e].setAttribute("name",e),t[e].innerHTML=i;const{default:l,...c}=t,f=r.dataset.solidRenderId;d(()=>m(n,{...s,...c,children:l}),r,{renderId:f})};export{y as default};
