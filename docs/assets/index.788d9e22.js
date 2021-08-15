var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,o=(t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,l=(e,t)=>{for(var n in t||(t={}))a.call(t,n)&&o(e,n,t[n]);if(r)for(var n of r(t))s.call(t,n)&&o(e,n,t[n]);return e},c=(e,r)=>t(e,n(r));import("data:text/javascript;base64,Cg==");/* empty css                      */import{r as i,R as m,L as d,S as u,h as p,i as h,u as f,j as E,B as y,b as g}from"./vendor.4b7fa229.js";import{A as v,_ as x,w as b,u as _,c as w,a as k,s as j,B as O,M as S,S as N,n as C,m as I,L as P,D as T,F as B,I as L}from"./antd.c7b5e5db.js";import{R as M,a as A,b as $,c as R,d as D}from"./recoil.e2eff219.js";import{l as U}from"./qs.864f1e8a.js";var F={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M464 720a48 48 0 1096 0 48 48 0 10-96 0zm16-304v184c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V416c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8zm475.7 440l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zm-783.5-27.9L512 239.9l339.8 588.2H172.2z"}}]},name:"warning",theme:"outlined"},z=function(e,t){return i.exports.createElement(v,Object.assign({},e,{ref:t,icon:F}))};z.displayName="WarningOutlined";var K=i.exports.forwardRef(z),V=i.exports.forwardRef((function(e,t){var n=e.className,r=e.component,a=e.viewBox,s=e.spin,o=e.rotate,l=e.tabIndex,c=e.onClick,m=e.children,d=x(e,["className","component","viewBox","spin","rotate","tabIndex","onClick","children"]);b(Boolean(r||m),"Should have `component` prop or `children`."),_();var u=w("anticon",n),p=w({"anticon-spin":!!s}),h=o?{msTransform:"rotate(".concat(o,"deg)"),transform:"rotate(".concat(o,"deg)")}:void 0,f=k(k({},j),{},{className:p,style:h,viewBox:a});a||delete f.viewBox;var E=l;return void 0===E&&c&&(E=-1),i.exports.createElement("span",Object.assign({role:"img"},d,{ref:t,tabIndex:E,onClick:c,className:u}),r?i.exports.createElement(r,Object.assign({},f),m):m?(b(Boolean(a)||1===i.exports.Children.count(m)&&i.exports.isValidElement(m)&&"use"===i.exports.Children.only(m).type,"Make sure that you provide correct `viewBox` prop (default `0 0 1024 1024`) to the icon."),i.exports.createElement("svg",Object.assign({},f,{viewBox:a}),m)):null)}));V.displayName="AntdIcon";var H=V,J=new Set;function q(e){return Boolean("string"==typeof e&&e.length&&!J.has(e))}function Q(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=e[t];if(q(n)){var r=document.createElement("script");r.setAttribute("src",n),r.setAttribute("data-namespace",n),e.length>t+1&&(r.onload=function(){Q(e,t+1)},r.onerror=function(){Q(e,t+1)}),J.add(n),document.body.appendChild(r)}}var W="errorBoundary_3AFZg6",X="errorIcon_ibixCb";class Y extends m.PureComponent{constructor(e){super(e),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(e,t){console.log(e,t)}render(){return this.state.hasError?m.createElement("div",{className:W},m.createElement(K,{className:X}),m.createElement("div",null,"加载出错,请刷新页面")):this.props.children}}var G={403:{img:"/assets/403.62d6c08d.svg",title:"403",desc:"抱歉，你无权访问该页面"},404:{img:"/assets/404.f60a3ed3.svg",title:"404",desc:"抱歉，你访问的页面不存在"},500:{img:"/assets/500.cc43d5a3.svg",title:"500",desc:"抱歉，服务器出错了"}};var Z="exception_1XGYBB",ee="imgBlock_2xLrUK",te="imgEle_32oimp",ne="content_3VQX0h",re="desc_3aYJX3",ae="actions_VQxyLy";function se(e){const{type:t}=e,n=G[t in G?t:"404"];return m.createElement("div",{className:Z},m.createElement("div",{className:ee},m.createElement("div",{className:te,style:{backgroundImage:`url(${n.img})`}})),m.createElement("div",{className:ne},m.createElement("h1",null,n.title),m.createElement("div",{className:re},n.desc),m.createElement("div",{className:ae},m.createElement(d,{to:"/"},m.createElement(O,{type:"primary"},"返回首页")))))}const oe=M({key:"userInfo",default:{}}),le=A({key:"userPermissions",get:({get:e})=>e(oe).permissions||[]});function ce(e=""){return $(le).includes(e)}function ie(e){const{authcode:t="",fallback:n=null,children:r}=e,a=$(le),s=""===t||a.includes(t);return m.createElement(m.Fragment,null,s?r:n)}const me=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.scriptUrl,n=e.extraCommonProps,r=void 0===n?{}:n;t&&"undefined"!=typeof document&&"undefined"!=typeof window&&"function"==typeof document.createElement&&(Array.isArray(t)?Q(t.reverse()):Q([t]));var a=i.exports.forwardRef((function(e,t){var n=e.type,a=e.children,s=x(e,["type","children"]),o=null;return e.type&&(o=i.exports.createElement("use",{xlinkHref:"#".concat(n)})),a&&(o=a),i.exports.createElement(H,Object.assign({},r,s,{ref:t}),o)}));return a.displayName="Iconfont",a}({scriptUrl:"//at.alicdn.com/t/font_2727509_fa5jm8jxp8v.js"});function de(e){return m.createElement(me,{type:e.type})}var ue="menuList_3k7Dl2";const pe=S.Item,{SubMenu:he}=S;function fe(e){const t=e,{list:n,openKeys:o=[],selectedKeys:u=[]}=t,p=((e,t)=>{var n={};for(var o in e)a.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&r)for(var o of r(e))t.indexOf(o)<0&&s.call(e,o)&&(n[o]=e[o]);return n})(t,["list","openKeys","selectedKeys"]),[h,f]=i.exports.useState(o),[E,y]=i.exports.useState(u);return i.exports.useEffect((()=>{o.join(",")===h.join(",")&&u.join(",")===E.join(",")||(f(o),y(u))}),[o,u]),m.createElement(S,c(l({},p),{className:ue,openKeys:h,selectedKeys:E,onOpenChange:e=>{f(e)},onSelect:({selectedKeys:e})=>{y(e)}}),n.filter((e=>ce(e.authcode))).map((e=>{const t=e.children||[];return 0===t.length?m.createElement(pe,{key:e.key},m.createElement(d,{title:e.label,to:e.link},e.icon&&m.createElement(de,{type:e.icon}),m.createElement("span",null,e.label))):m.createElement(he,{key:e.key,title:m.createElement("span",null,e.icon&&m.createElement(de,{type:e.icon}),m.createElement("span",null,e.label))},t.filter((e=>ce(e.authcode))).map((e=>m.createElement(pe,{key:e.key},m.createElement(d,{to:e.link},e.label)))))})))}function Ee(e){const{list:t}=e,n=i.exports.useMemo((()=>m.createElement("div",{style:{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}},m.createElement(N,{spinning:!0}))),[]);return m.createElement(i.exports.Suspense,{fallback:n},m.createElement(u,null,t.map(((e,t)=>{if(void 0!==e.redirect)return m.createElement(p,{key:t,to:e.redirect});{const n=e.component;return m.createElement(h,{key:t,path:e.path,exact:e.exact,render:t=>m.createElement(ie,{authcode:e.authcode,fallback:m.createElement(se,{type:403})},m.createElement(n,l({},t)))})}}))))}var ye={BASE_API:"http://xxx.dev.com/api"};const ge={200:"服务器成功返回请求的数据。",201:"新建或修改数据成功。",202:"一个请求已经进入后台排队（异步任务）。",204:"删除数据成功。",400:"发出的请求有错误，服务器没有进行新建或修改数据的操作。",401:"用户没有权限（令牌、用户名、密码错误）。",403:"用户得到授权，但是访问是被禁止的。",404:"发出的请求针对的是不存在的记录，服务器没有进行操作。",406:"请求的格式不可得。",410:"请求的资源被永久删除，且不会再得到的。",422:"当创建一个对象时，发生一个验证错误。",500:"服务器发生错误，请检查服务器。",502:"网关错误。",503:"服务不可用，服务器暂时过载或维护。",504:"网关超时。"};var ve=new class{constructor(){this.serverUrl=ye.BASE_API,this.fetch=(e,t={})=>{const n=e.match(/^(http)|(\/\/)/)?e:`${this.serverUrl}${e}`,r=[window.fetch(n,c(l({},t),{headers:l({},t.headers?t.headers:{})})),new Promise(((e,t)=>{setTimeout((()=>t(new Error("请求超时"))),6e4)}))];return Promise.race(r).then((e=>e)).then(this.checkHttpStatus).then(this.parseResponseResult).then((e=>{if("object"==typeof e&&void 0!==e.code&&!this.checkBusinessCode(e))throw new Error(`请求异常: ${e.code}-${e.message}\n${n}`);return e})).catch((e=>Promise.reject(e&&`${e.toString()} : ${n}`)))},this.toLogin=()=>{window.location.href=`/login?from_page=${encodeURIComponent(location.href)}`},this.checkHttpStatus=e=>{const t=e.status;if(t>=200&&t<300)return e;const n=ge[e.status]||e.statusText,r=new Error(n);throw r.name=`${e.status}`,r.response=e,C.error({message:`请求错误 ${e.status}: ${e.url}`,description:n}),r},this.parseResponseResult=e=>{const t=e.headers.get("Content-Type");return t&&t.indexOf("json")>-1?e.json():t&&t.indexOf("octet-stream")>-1||t&&t.indexOf("image")>-1?e.blob():e.text()},this.checkBusinessCode=e=>{const t=e.status,n=e.message;if(200===t)return!0;if(9009===t||9010===t||9011===t)this.toLogin();else if(9040===t)return I.error(n),!0;return I.error(n),!1},this.get=e=>this.fetch(e,{method:"GET"}),this.post=(e,t)=>this.fetch(e,{headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},method:"POST",body:U.stringify(t)}),this.postJson=(e,t)=>this.fetch(e,{headers:{"Content-Type":"application/json;charset=UTF-8"},method:"POST",body:JSON.stringify(t)}),this.postFormData=(e,t)=>{const n=new FormData;return Object.keys(t).forEach((e=>{n.append(e,t[e])})),this.fetch(e,{method:"POST",body:n})},this.putJson=(e,t)=>this.fetch(e,{headers:{"Content-Type":"application/json;charset=UTF-8"},method:"PUT",body:JSON.stringify(t)}),this.delete=e=>this.fetch(e,{method:"DELETE"})}};let xe;const be={},_e=function(e,t){if(!t||0===t.length)return e();if(void 0===xe){const e=document.createElement("link").relList;xe=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if((e=`/${e}`)in be)return;be[e]=!0;const t=e.endsWith(".css"),n=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${n}`))return;const r=document.createElement("link");return r.rel=t?"stylesheet":xe,t||(r.as="script",r.crossOrigin=""),r.href=e,document.head.appendChild(r),t?new Promise(((e,t)=>{r.addEventListener("load",e),r.addEventListener("error",t)})):void 0}))).then((()=>e()))},we=i.exports.lazy((()=>_e((()=>import("./index.66785821.js")),["assets/index.66785821.js","assets/index.fdec775f.css","assets/normalize.css.e029987c.css","assets/vendor.4b7fa229.js","assets/antd.c7b5e5db.js","assets/recoil.e2eff219.js","assets/qs.864f1e8a.js"]))),ke=i.exports.lazy((()=>_e((()=>import("./index.949d2b24.js")),["assets/index.949d2b24.js","assets/index.dfc2260b.css","assets/vendor.4b7fa229.js"]))),je=[{key:"l1",label:"主菜单111",link:"/l1/testMenu1/testMenu1_1/list",authcode:"l1"},{key:"l2",label:"主菜单222",link:"/l2/xxx/list",authcode:"l2"}],Oe=[{path:"/l1",component:we,authcode:"l1"},{path:"/l2",component:ke,authcode:"l2"},{redirect:"/l1"}];var Se="basicLayout_32MWTf",Ne="header_398AOr",Ce="header__left_3_uNZz",Ie="logo_3ViiOH",Pe="header__right_l9ydQR",Te="userName_1xbuLd",Be="content_bAY9U9";const{Header:Le}=P;function Me(){const e=f(),t=E(),[n,r]=i.exports.useState([]),[a,s]=i.exports.useState(!1),[o,l]=R(oe),c=()=>{localStorage.clear(),e.push("/login")},d=i.exports.useMemo((()=>m.createElement(S,null,m.createElement(S.Item,null,"个人中心"),m.createElement(S.Divider,null),m.createElement(S.Item,null,"修改密码"),m.createElement(S.Item,{onClick:c},"退出登录"))),[]),u=i.exports.useCallback((()=>{s(!0),(ve.get("/userInfo"),new Promise((e=>{setTimeout((()=>{e({name:"张三丰",permissions:["l1","l2","l1_testMenu1","l1_testMenu1_1","l1_testMenu1_2","l1_testMenu3"]})}),2e3)}))).then((e=>{l(e)})).finally((()=>{s(!1)}))}),[]);return i.exports.useEffect((()=>{u()}),[]),i.exports.useEffect((()=>{r([t.pathname.split("/")[1]])}),[t]),m.createElement(P,{className:Se},m.createElement(N,{spinning:a},m.createElement(Le,{className:Ne},m.createElement("div",{className:Ce},m.createElement("div",{className:Ie},m.createElement("img",{src:"/assets/logo.32a70972.svg",alt:"logo"}),m.createElement("div",null,"xx管理系统")),m.createElement(fe,{theme:"dark",mode:"horizontal",selectedKeys:n,list:je})),m.createElement("div",{className:Pe},m.createElement(T,{overlay:d},m.createElement("div",{className:Te},o.name)))),m.createElement(P,{className:Be},m.createElement(Ee,{list:Oe}))))}var Ae="loginPage_3Msf_l",$e="container_4uEVJ3";function Re(){const[e,t]=i.exports.useState(!1);return m.createElement("div",{className:Ae},m.createElement("div",{className:$e},m.createElement("h2",{style:{textAlign:"center"}},"xx管理系统"),m.createElement("br",null),m.createElement(B,{name:"basic",labelCol:{span:6},wrapperCol:{span:16},initialValues:{},onFinish:e=>{console.log("Login Success:",e),t(!0),new Promise((e=>{setTimeout((()=>{e(`token____${Math.random()}`)}),1500)})).then((e=>{!function(e){localStorage.setItem("auth_token",e)}(e),location.href="/"})).finally((()=>t(!1)))}},m.createElement(B.Item,{label:"账号",name:"username",rules:[{required:!0,message:"请输入账号"}]},m.createElement(L,{placeholder:"admin"})),m.createElement(B.Item,{label:"密码",name:"password",rules:[{required:!0,message:"请输入密码"}]},m.createElement(L.Password,{placeholder:"123456"})),m.createElement(B.Item,{wrapperCol:{offset:8,span:16}},m.createElement(O,{type:"primary",htmlType:"submit",loading:e},"登录")))))}function De(){const e=!!localStorage.getItem("auth_token");return i.exports.useEffect((()=>{}),[]),m.createElement(D,null,m.createElement(y,null,m.createElement(u,null,m.createElement(h,{path:"/login",exact:!0,component:Re}),m.createElement(h,{render:({location:t})=>e?m.createElement(h,{location:t,component:Me}):m.createElement(p,{to:"/login"})}),m.createElement(h,{render:()=>m.createElement(se,{type:404})}))))}g.render(m.createElement(m.StrictMode,null,m.createElement(Y,null,m.createElement(De,null))),document.getElementById("root"));export{fe as M,Ee as R,_e as _,ve as r};
