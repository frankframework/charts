import{h,J as g,f as d,N as C,u as w,O as v,j as D,C as x,P as S,Q as r}from"./entry.616e624b.js";import _ from"./d259d322.mjs";import q from"./a9be21ea.mjs";import"./3468b775.mjs";import"./a6ef77ff.mjs";import"./8b4f899c.mjs";import"./0c453bf7.mjs";import"./4a5232c3.mjs";const y=(u,e=d())=>{const f=h(u),p=v();g(()=>h(u),(t=f)=>{if(!e.path||!t)return;const n=Object.assign({},(t==null?void 0:t.head)||{});n.meta=[...n.meta||[]],n.link=[...n.link||[]];const c=n.title||(t==null?void 0:t.title);c&&(n.title=c),p.public.content.host;const s=(n==null?void 0:n.description)||(t==null?void 0:t.description);s&&n.meta.filter(o=>o.name==="description").length===0&&n.meta.push({name:"description",content:s}),n!=null&&n.image||(t==null||t.image),C(()=>w(n))},{immediate:!0})},H=D({name:"ContentDoc",props:{tag:{type:String,required:!1,default:"div"},excerpt:{type:Boolean,default:!1},path:{type:String,required:!1,default:void 0},query:{type:Object,required:!1,default:void 0},head:{type:Boolean,required:!1,default:!0}},render(u){const e=x(),{tag:f,excerpt:p,path:m,query:t,head:n}=u,c={...t||{},path:m||(t==null?void 0:t.path)||S(d().path),find:"one"},s=(o,i)=>r("pre",null,JSON.stringify({message:"You should use slots with <ContentDoc>",slot:o,data:i},null,2));return r(q,c,{default:e!=null&&e.default?({data:o,refresh:i,isPartial:a})=>{var l;return n&&y(o),(l=e.default)==null?void 0:l.call(e,{doc:o,refresh:i,isPartial:a,excerpt:p,...this.$attrs})}:({data:o})=>(n&&y(o),r(_,{value:o,excerpt:p,tag:f,...this.$attrs},{empty:i=>e!=null&&e.empty?e.empty(i):s("default",o)})),empty:o=>{var i;return((i=e==null?void 0:e.empty)==null?void 0:i.call(e,o))||r("p",null,"Document is empty, overwrite this content with #empty slot in <ContentDoc>.")},"not-found":o=>{var i;return((i=e==null?void 0:e["not-found"])==null?void 0:i.call(e,o))||r("p",null,"Document not found, overwrite this content with #not-found slot in <ContentDoc>.")}})}}),J=H;export{J as default};
