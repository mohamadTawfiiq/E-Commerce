import './polyfills.server.mjs';
import{a as y}from"./chunk-HBY4X5KQ.mjs";import{a as _}from"./chunk-56NGNGEP.mjs";import"./chunk-GTSSCL6B.mjs";import"./chunk-QKIAIGA6.mjs";import{e as h}from"./chunk-RAJTPVA5.mjs";import"./chunk-TLHJX3RA.mjs";import"./chunk-UNDE556V.mjs";import{$ as m,Db as f,Eb as u,Kb as S,La as p,Mb as C,Pa as o,X as c,gb as s,mb as l,nb as g,ob as a,pb as d,qb as v}from"./chunk-EDBUG26B.mjs";import"./chunk-VVCT4QZE.mjs";var b=(t,e)=>e._id,k=t=>["/catdetails",t];function L(t,e){if(t&1&&(a(0,"div",2)(1,"div",3),v(2,"img",4),a(3,"div",5)(4,"h2",6),f(5),d()()()()),t&2){let n=e.$implicit;o(),s("routerLink",C(4,k,n._id)),o(),s("src",n.image,p)("alt",n.name),o(3),u(n.name)}}var E=(()=>{let e=class e{constructor(){this._CategoriesService=c(y),this._ToastrService=c(_)}ngOnInit(){this._CategoriesService.getAllCategories().subscribe({next:r=>{console.log(r.data),this.categoriesList=r.data}})}getSpecificCat(r){this._CategoriesService.getSpecificCategory(r).subscribe({next:i=>{console.log(i),this._ToastrService.info(`${i.data.name}`,"Specific Category")}})}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=m({type:e,selectors:[["app-categories"]],standalone:!0,features:[S],decls:4,vars:0,consts:[[1,"container","py-2","my-5"],[1,"row","g-4","my-3"],[1,"col-md-4","cr"],["routerLinkActive","router-link-active",1,"card-img","inner","border","shadow",3,"routerLink"],["height","350px",1,"w-100",3,"src","alt"],[1,"card-footer","py-3","bg-info-subtle"],[1,"text-main","text-center"]],template:function(i,x){i&1&&(a(0,"div",0)(1,"div",1),l(2,L,6,6,"div",2,b),d()()),i&2&&(o(2),g(x.categoriesList))},dependencies:[h]});let t=e;return t})();export{E as CategoriesComponent};
