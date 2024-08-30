"use strict";(()=>{var e={};e.id=685,e.ids=[685],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},3274:(e,t,r)=>{r.r(t),r.d(t,{config:()=>f,default:()=>d,routeModule:()=>P});var n={};r.r(n),r.d(n,{default:()=>l,getAllArticles:()=>u,getArticle:()=>c});var o=r(1802),i=r(7153),s=r(6249);let a=(0,require("microcms-js-sdk").createClient)({serviceDomain:process.env.MICROCMS_API_URL??"",apiKey:process.env.MICROCMS_API_KEY??""});async function u(e,t){try{let e=await a.get({endpoint:"blogs"});t.status(200).json(e.contents||[])}catch(e){console.error("ブログの取得に失敗しました:",e),t.status(500).json({error:"ブログの取得に失敗しました"})}}async function c(e,t){let{id:r}=e.query;if(Array.isArray(r))return t.status(400).json({error:"Invalid ID format"});if(!r)return t.status(400).json({error:"Content ID is required"});try{let e=await a.get({endpoint:"blogs",contentId:r});t.status(200).json(e)}catch(e){console.error("Failed to fetch blog:",e),t.status(500).json({error:"Failed to fetch blog"})}}async function l(e,t){"GET"===e.method?e.query.id?await c(e,t):await u(e,t):(t.setHeader("Allow",["GET"]),t.status(405).end(`Method ${e.method} Not Allowed`))}let d=(0,s.l)(n,"default"),f=(0,s.l)(n,"config"),P=new o.PagesAPIRouteModule({definition:{kind:i.x.PAGES_API,page:"/api/microcms",pathname:"/api/microcms",bundlePath:"",filename:""},userland:n})},7153:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},1802:(e,t,r)=>{e.exports=r(145)}};var t=require("../../webpack-api-runtime.js");t.C(e);var r=t(t.s=3274);module.exports=r})();