(this["webpackJsonpnice-beer"]=this["webpackJsonpnice-beer"]||[]).push([[0],{140:function(e,t,n){},141:function(e,t,n){},142:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(26),o=n.n(c),s=n(13),i=n(16),u=n(6),l=n(30),p=n(31),f=n(33),d=n(32);function m(e){return{type:"SET_DRINK_CONFIG",payload:e}}function b(){return{type:"GET_DRINK_CONFIG_REQ"}}function h(){return{type:"GET_CONTENT_JSON_REQ"}}function O(e){return{type:"SET_CONTENT",payload:e}}var E=n(62),v=n(39),_=n.n(v),j=function(e){return r.a.createElement("div",{className:"post__list-item",key:e.filepath},r.a.createElement("h1",null,r.a.createElement(i.b,{to:"post/".concat(e.filename)},e.title)),r.a.createElement("p",null,r.a.createElement(E.a,{size:16})," ",_()(e.created).format("YYYY-MM-DD")))},y=Object(s.b)((function(e){return{posts:e.posts.list}}))((function(e){return a.createElement("div",{className:"post post__body"},e.posts.map((function(e){return a.createElement(j,Object.assign({key:e.title},e),e.title)})))})),g="yidafu",w="yidafu.github.io",x="default",T=Object(s.b)((function(e){return{config:e.config}}))((function(e){return r.a.createElement("header",{className:"navbar navbar__top-bar--shadow"},r.a.createElement("div",{className:"navbar__box"},r.a.createElement("div",{className:"navbar__logo"},r.a.createElement("h1",{className:"navbar__title--large"},r.a.createElement(i.b,{to:"/"},e.config.title))),r.a.createElement("div",{className:"navbar__append"},r.a.createElement(i.b,{to:"/"},"Home"),r.a.createElement("a",{href:"https://www.github.com/".concat(g)},"Github"))))})),N=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(T,null),e.children)},k=function(e){Object(f.a)(n,e);var t=Object(d.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"render",value:function(){return a.createElement(N,null,a.createElement(y,null))}}]),n}(a.Component),P=Object(s.b)((function(e){return{config:e.config,posts:e.posts.list}}),{getContent:h,getConfig:b})(k),S=n(34),C=n.n(S);function G(){return"".concat("https://cdn.jsdelivr.net/gh/","/").concat(g,"/").concat(w,"@").concat(x)}var I=function(e){var t=function(e){var t=C.a.lexer(e),n=/!\[\]\((.+?)\)/;return t.forEach((function(e){"paragraph"===e.type&&(e.text=e.text.replace(n,(function(e,t){return"![](".concat(G(),"/posts").concat(t.substring(1),")")})))})),C.a.Parser.parse(t,C.a.getDefaults())}(e.content||"");return Object(a.useEffect)((function(){window.Prism&&window.Prism.highlightAll()})),r.a.createElement("article",{className:"markdown-body article article__markdown",dangerouslySetInnerHTML:{__html:t}})},R=(n(77),function(e){Object(f.a)(n,e);var t=Object(d.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"componentDidMount",value:function(){this.props.getPost(this.props.match.params.filename)}},{key:"render",value:function(){var e=this.props.post;return a.createElement(N,null,e||"undefined"!==typeof e.title?a.createElement(I,e):a.createElement(u.a,{to:"/404"}))}}]),n}(a.Component)),D=Object(s.b)((function(e){return{post:e.posts.currentPost}}),{getPost:function(e){return{type:"GET_POST_REQ",payload:e}}})(R),F=(n(78),function(){var e=Object(s.c)();return e({type:"GET_DRINK_CONFIG_REQ"}),e({type:"GET_CONTENT_JSON_REQ"}),r.a.createElement(i.a,null,r.a.createElement(u.b,{path:"/",exact:!0,component:P}),r.a.createElement(u.b,{path:"/post/:filename",component:D}))}),Q=n(15),M=n(66),J=n(63),K=n.n(J),Y=n(64),B=n(7),W=n.n(B),A=n(5),H=n(35),U=n.n(H),z=n(29),L=n.n(z);function $(){var e=G();return U.a.get("".concat(e,"/").concat("drink.yaml"),{responseType:"text"}).then((function(e){return e&&e.data?L.a.load(e.data):{}}))}function q(){var e=G();return U.a.get("".concat(e,"/").concat("content.json"),{responseType:"text"}).then((function(e){return e&&e.data?e.data.content:[]}))}function V(e){var t=G();return U.a.get("".concat(t,"/").concat(e),{responseType:"text"}).then((function(e){return e&&e.data?e.data:""}))}var X=n(65),Z=W.a.mark(ae),ee=W.a.mark(re),te=W.a.mark(ce),ne=W.a.mark(oe);function ae(){var e;return W.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(A.b)(q);case 2:return e=t.sent,t.next=5,Object(A.e)(O(e));case 5:case"end":return t.stop()}}),Z)}function re(e){var t,n,a,r;return W.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Object(A.f)((function(e){return e.posts.loaded}));case 2:if(c.sent){c.next=6;break}return c.next=6,Object(A.c)(500);case 6:return c.next=8,Object(A.f)((function(e){return e.posts.list}));case 8:if(t=c.sent,n=t.find((function(t){return t.filename===e.payload})),console.log(t,e),!n){c.next=27;break}if(a={},n.content){c.next=22;break}return c.next=16,Object(A.b)(V,n.filepath);case 16:r=c.sent,(a=new X.MarkdownPost("",r).toObject()).filepath=n.filepath,a.filename=e.payload,c.next=23;break;case 22:a=n;case 23:return c.next=25,Object(A.e)({type:"SET_POST",payload:a});case 25:c.next=29;break;case 27:return c.next=29,Object(A.e)({type:"NOT_FOUND_POST"});case 29:case"end":return c.stop()}}),ee)}function ce(){return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(A.g)("GET_CONTENT_JSON_REQ",ae);case 2:case"end":return e.stop()}}),te)}function oe(){return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(A.g)("GET_POST_REQ",re);case 2:case"end":return e.stop()}}),ne)}var se=W.a.mark(pe),ie=W.a.mark(fe),ue=W.a.mark(de),le=W.a.mark(me);function pe(){var e;return W.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(A.b)($);case 2:return e=t.sent,t.next=5,Object(A.e)(m(e));case 5:case"end":return t.stop()}}),se)}function fe(){return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,$();case 2:return e.next=4,ae();case 4:case"end":return e.stop()}}),ie)}function de(){return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(A.g)("GET_DRINK_CONFIG_REQ",pe);case 2:case"end":return e.stop()}}),ue)}function me(){return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(A.g)("INIT_APP",fe);case 2:case"end":return e.stop()}}),le)}var be=W.a.mark(he);function he(){return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(A.a)([Object(A.d)(de),Object(A.d)(me),Object(A.d)(ce),Object(A.d)(oe)]);case 2:case"end":return e.stop()}}),be)}var Oe=n(43),Ee={title:"",author:"",directories:[],mode:"gitbook",sortBy:"created",github:{user:"",repo:""}};var ve={currentPost:{title:"",author:"",created:"",modified:"",filename:"",filepath:""},list:[],loaded:!1};var _e=Object(Q.combineReducers)({posts:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ve,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_CONTENT":return{currentPost:e.currentPost,list:t.payload,loaded:!0};case"SET_POST":return{currentPost:t.payload,loaded:e.loaded,list:e.list.map((function(e){return e.filepath===t.payload.filepath?t.payload:e}))};case"NOT_FOUND_POST":return{loaded:e.loaded,list:e.list,currentPost:{notFound:!0}};default:return e}},config:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ee,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_DRINK_CONFIG":return Object(Oe.a)(Object(Oe.a)({},e),t.payload);default:return e}}}),je=Object(M.a)(),ye=Object(Q.createStore)(_e,Object(Y.composeWithDevTools)(Object(Q.applyMiddleware)(je,K.a)));je.run(he);var ge=ye;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(139),n(140),n(141);o.a.render(r.a.createElement(s.a,{store:ge},r.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},67:function(e,t,n){e.exports=n(142)},78:function(e,t,n){}},[[67,1,2]]]);
//# sourceMappingURL=main.bf1d9bde.chunk.js.map