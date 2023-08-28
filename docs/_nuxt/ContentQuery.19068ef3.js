import{u as q,q as c}from"./query.921812c6.js";import{h as g}from"./preview.809672a4.js";import{j as C,S,m as b,J as k,C as N,Q}from"./entry.532d491b.js";import"./utils.10201b9d.js";const _=C({name:"ContentQuery",props:{path:{type:String,required:!1,default:void 0},only:{type:Array,required:!1,default:void 0},without:{type:Array,required:!1,default:void 0},where:{type:Object,required:!1,default:void 0},sort:{type:Object,required:!1,default:void 0},limit:{type:Number,required:!1,default:void 0},skip:{type:Number,required:!1,default:void 0},locale:{type:String,required:!1,default:void 0},find:{type:String,required:!1,default:void 0}},async setup(i){const{path:t,only:r,without:n,where:a,sort:l,limit:o,skip:f,locale:s,find:d}=S(i),h=b(()=>{var e;return(e=t.value)==null?void 0:e.includes("/_")});k(()=>i,()=>p(),{deep:!0});const{data:y,refresh:p}=await q(`content-query-${g(i)}`,()=>{let e;return t.value?e=c(t.value):e=c(),r.value&&(e=e.only(r.value)),n.value&&(e=e.without(n.value)),a.value&&(e=e.where(a.value)),l.value&&(e=e.sort(l.value)),o.value&&(e=e.limit(o.value)),f.value&&(e=e.skip(f.value)),s.value&&(e=e.where({_locale:s.value})),d.value==="one"?e.findOne():d.value==="surround"?t.value?e.findSurround(t.value):(console.warn("[Content] Surround queries requires `path` prop to be set."),console.warn("[Content] Query without `path` will return regular `find()` results."),e.find()):e.find()});return{isPartial:h,data:y,refresh:p}},render(i){var v;const t=N(),{data:r,refresh:n,isPartial:a,path:l,only:o,without:f,where:s,sort:d,limit:h,skip:y,locale:p,find:e}=i,u={path:l,only:o,without:f,where:s,sort:d,limit:h,skip:y,locale:p,find:e};if(u.find==="one"){if(!r&&(t!=null&&t["not-found"]))return t["not-found"]({props:u,...this.$attrs});if(t!=null&&t.empty&&(r==null?void 0:r._type)==="markdown"&&!((v=r==null?void 0:r.body)!=null&&v.children.length))return t.empty({props:u,...this.$attrs})}else if((!r||!r.length)&&t!=null&&t["not-found"])return t["not-found"]({props:u,...this.$attrs});return t!=null&&t.default?t.default({data:r,refresh:n,isPartial:a,props:u,...this.$attrs}):((m,w)=>Q("pre",null,JSON.stringify({message:"You should use slots with <ContentQuery>!",slot:m,data:w},null,2)))("default",{data:r,props:u,isPartial:a})}}),P=_;export{P as default};
