(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[598],{1850:function(e,s,a){Promise.resolve().then(a.bind(a,3144))},3144:function(e,s,a){"use strict";a.r(s);var l=a(7437),r=a(2265),t=a(7138);s.default=()=>{let[e,s]=(0,r.useState)([]),[a,c]=(0,r.useState)(!0),[i,n]=(0,r.useState)(null);return((0,r.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/microcms");if(!e.ok)throw Error("Failed to fetch blogs");let a=await e.json();s(a)}catch(e){e instanceof Error?n(e.message):n("An unknown error occurred")}finally{c(!1)}})()},[]),a)?(0,l.jsx)("div",{children:"Loading..."}):i?(0,l.jsxs)("div",{children:["Error: ",i]}):0===e.length?(0,l.jsx)("div",{children:"No blogs available."}):(0,l.jsxs)("div",{className:"container mx-auto px-4",children:[(0,l.jsx)("div",{children:(0,l.jsx)("h1",{children:"ブログ記事"})}),(0,l.jsx)("div",{className:"flex flex-wrap -mx-2",children:e.map(e=>(0,l.jsx)("div",{className:"w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4",children:(0,l.jsxs)("div",{className:"card bg-base-100 shadow-xl",children:[(0,l.jsx)("figure",{children:(0,l.jsx)("img",{src:e.eyecatch.url,alt:e.title,className:"w-full h-48 object-cover"})}),(0,l.jsxs)("div",{className:"card-body",children:[(0,l.jsx)("h2",{className:"card-title",children:e.title}),(0,l.jsx)("p",{children:new Date(e.publishedAt).toLocaleDateString()}),(0,l.jsx)("div",{className:"card-actions justify-end",children:(0,l.jsx)(t.default,{href:"/blog/".concat(e.id),className:"btn btn-primary",children:(0,l.jsx)("button",{className:"btn btn-primary",children:"詳細を見る"})})})]})]})},e.id))}),(0,l.jsx)("div",{className:"text-center mt-4",children:(0,l.jsx)(t.default,{href:"/blog-all",passHref:!0,children:(0,l.jsx)("button",{className:"btn btn-primary",children:"もっと見る"})})})]})}}},function(e){e.O(0,[138,971,23,744],function(){return e(e.s=1850)}),_N_E=e.O()}]);