(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-extUI-card-card"],{"1d7a":function(t,e,i){"use strict";i.r(e);var n=i("6bab"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},"1f63":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n\n/* 头条小程序组件内不能引入字体 */\nuni-page-body[data-v-493d61b0]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;box-sizing:border-box;background-color:#efeff4;min-height:100%;height:auto}uni-view[data-v-493d61b0]{font-size:14px;line-height:inherit}.example[data-v-493d61b0]{padding:0 15px 15px}.example-info[data-v-493d61b0]{padding:15px;color:#3b4144;background:#fff}.example-body[data-v-493d61b0]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;padding:0;font-size:14px;background-color:#fff}\n.example[data-v-493d61b0]{padding:0 15px}.example-info[data-v-493d61b0]{\ndisplay:block;\npadding:15px;color:#3b4144;background-color:#fff;font-size:14px;line-height:20px}.example-info-text[data-v-493d61b0]{font-size:14px;line-height:20px;color:#3b4144}.example-body[data-v-493d61b0]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;padding:15px;background-color:#fff}.word-btn-white[data-v-493d61b0]{font-size:18px;color:#fff}.word-btn[data-v-493d61b0]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;border-radius:6px;height:48px;margin:15px;background-color:#007aff}.word-btn--hover[data-v-493d61b0]{background-color:#4ca2ff}.example-body[data-v-493d61b0]{\ndisplay:block;\npadding:1px 0}.example-box[data-v-493d61b0]{margin:12px 0}.image-box[data-v-493d61b0]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;\nheight:%?350?%;overflow:hidden}.image[data-v-493d61b0]{\nwidth:100%;height:100%;\n-webkit-box-flex:1;-webkit-flex:1;flex:1}.content-box[data-v-493d61b0]{padding-top:%?20?%}.content-box-text[data-v-493d61b0]{font-size:12px;line-height:22px}.footer-box[data-v-493d61b0]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}.footer-box__item[data-v-493d61b0]{-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:2px 0;font-size:12px;color:#666}body.?%PAGE?%[data-v-493d61b0]{background-color:#efeff4}',""]),t.exports=e},"350f":function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var n={uniSection:i("8e7e").default,uniCard:i("871f").default},o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-text",{staticClass:"example-info"},[t._v("卡片组件通用来显示完整独立的一段信息，同时让用户理解他的作用。例如一篇文章的预览图、作者信息、时间等，卡片通常是更复杂和更详细信息的入口点。")]),i("uni-section",{attrs:{title:"基础卡片",type:"line"}}),i("v-uni-view",{staticClass:"example-body"},[i("uni-card",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickCard.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"content-box-text"},[t._v("这是一个基础卡片示例，内容较少，此示例不带边框阴影。")])],1),i("uni-card",{attrs:{title:"标题文字",isShadow:!0},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickCard.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"content-box-text"},[t._v("这是一个基础卡片示例，内容比较多，内容样式可自定义，卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、时间等，此示例带边框阴影。")])],1),i("uni-card",{attrs:{title:"标题文字",extra:"额外信息",isShadow:!0,note:"Tips"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickCard.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"content-box-text"},[t._v("这是一个相对比较完整的基础卡片示例，带有标题、额外信息以及底部信息，内容样式可自定义。")])],1)],1),i("uni-section",{attrs:{title:"通栏卡片",type:"line"}}),i("v-uni-view",{staticClass:"example-body"},[i("v-uni-view",{staticClass:"example-box"},[i("uni-card",{attrs:{title:"标题文字",isFull:!0,isShadow:"true",note:"额外信息",extra:"额外信息"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickCard.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"content-box-text"},[t._v("通栏卡片，左右上下没有间距，用户可自定义卡片距离等信息")])],1)],1)],1),i("uni-section",{attrs:{title:"图文卡片",type:"line"}}),i("v-uni-view",{staticClass:"example-body"},[i("uni-card",{attrs:{"is-shadow":!0,title:"标题文字",mode:"style",thumbnail:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",extra:"额外信息",note:"true"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickCard.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"content-box-text"},[t._v("图文卡片支持传入一张图片，在最上方显示，标题作为图片描述，额外信息作为内容标题，通常作用为作者信息或发布时间描述，自行配置是否需要底部信息")]),i("template",{attrs:{slot:"footer"},slot:"footer"},[i("v-uni-view",{staticClass:"footer-box"},[i("v-uni-view",{on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.footerClick("喜欢")}}},[i("v-uni-text",{staticClass:"footer-box__item"},[t._v("喜欢")])],1),i("v-uni-view",{on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.footerClick("评论")}}},[i("v-uni-text",{staticClass:"footer-box__item"},[t._v("评论")])],1),i("v-uni-view",{on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.footerClick("分享")}}},[i("v-uni-text",{staticClass:"footer-box__item"},[t._v("分享")])],1)],1)],1)],2)],1),i("uni-section",{attrs:{title:"标题卡片",type:"line"}}),i("v-uni-view",{staticClass:"example-body"},[i("uni-card",{attrs:{isShadow:!0,title:"标题内容",subTitle:"副标题",mode:"title",thumbnail:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",extra:"技术没有上限",note:"true"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickCard.apply(void 0,arguments)}}},[i("v-uni-view",[i("v-uni-view",{staticClass:"image-box"},[i("v-uni-image",{staticClass:"image",attrs:{mode:"aspectFill",src:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/094a9dc0-50c0-11eb-b680-7980c8a877b8.jpg"}})],1),i("v-uni-view",{staticClass:"content-box"},[i("v-uni-text",{staticClass:"content-box-text"},[t._v("标题卡片带有一个双标题头部，右侧为额外描述信息 ，内容可自定义实现")])],1)],1),i("template",{slot:"footer"},[i("v-uni-view",{staticClass:"footer-box"},[i("v-uni-view",{on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.footerClick("喜欢")}}},[i("v-uni-text",{staticClass:"footer-box__item"},[t._v("喜欢")])],1),i("v-uni-view",{on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.footerClick("评论")}}},[i("v-uni-text",{staticClass:"footer-box__item"},[t._v("评论")])],1),i("v-uni-view",{on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.footerClick("分享")}}},[i("v-uni-text",{staticClass:"footer-box__item"},[t._v("分享")])],1)],1)],1)],2)],1)],1)},a=[]},"46da":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".uni-section[data-v-83509928]{position:relative;\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\nmargin-top:10px;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:0 10px;height:50px;background-color:#f8f8f8;\n\nfont-weight:400}\n.uni-section__head[data-v-83509928]{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-right:10px}.line[data-v-83509928]{height:15px;background-color:silver;border-radius:5px;width:3px}.circle[data-v-83509928]{width:8px;height:8px;border-top-right-radius:50px;border-top-left-radius:50px;border-bottom-left-radius:50px;border-bottom-right-radius:50px;background-color:silver}.uni-section__content[data-v-83509928]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#333}.uni-section__content-title[data-v-83509928]{font-size:14px;color:#333}.distraction[data-v-83509928]{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.uni-section__content-sub[data-v-83509928]{font-size:12px;color:#999}",""]),t.exports=e},"499c":function(t,e,i){var n=i("46da");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("6f5b3d5a",n,!0,{sourceMap:!1,shadowMode:!1})},"4e98":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={components:{},data:function(){return{list:[{id:0,title:"",content:"",shadow:!1,note:"",extra:"",thumbnail:""},{id:1,title:"标题文字",content:"",shadow:!0,note:"",extra:"额外信息",thumbnail:""},{id:2,title:"标题文字",content:"",shadow:!0,note:"Tips",extra:"额外信息",thumbnail:""},{id:3,title:"标题文字",content:"这是一个完整配置的基础卡片示例。内容样式可自定义。",shadow:!0,note:"Tips",extra:"额外信息",thumbnail:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"}],Tips:["喜欢","评论","分享"]}},methods:{clickCard:function(){uni.showToast({title:"点击卡片",icon:"none"})},footerClick:function(t){uni.showToast({title:t,icon:"none"})}}};e.default=n},5581:function(t,e,i){"use strict";var n=i("6e5b"),o=i.n(n);o.a},"6bab":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"UniCard",props:{title:{type:String,default:""},subTitle:{type:String,default:""},extra:{type:String,default:""},note:{type:String,default:""},thumbnail:{type:String,default:""},mode:{type:String,default:"basic"},isFull:{type:Boolean,default:!1},isShadow:{type:[Boolean,String],default:!1}},methods:{onClick:function(){this.$emit("click")}}};e.default=n},"6e5b":function(t,e,i){var n=i("92b3");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("d2a8b4a2",n,!0,{sourceMap:!1,shadowMode:!1})},"871f":function(t,e,i){"use strict";i.r(e);var n=i("e2c4"),o=i("1d7a");for(var a in o)"default"!==a&&function(t){i.d(e,t,(function(){return o[t]}))}(a);i("5581");var r,l=i("f0c5"),c=Object(l["a"])(o["default"],n["b"],n["c"],!1,null,"b2196482",null,!1,n["a"],r);e["default"]=c.exports},"8e7e":function(t,e,i){"use strict";i.r(e);var n=i("9a5b"),o=i("cea3");for(var a in o)"default"!==a&&function(t){i.d(e,t,(function(){return o[t]}))}(a);i("95a7");var r,l=i("f0c5"),c=Object(l["a"])(o["default"],n["b"],n["c"],!1,null,"83509928",null,!1,n["a"],r);e["default"]=c.exports},"92b3":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'.uni-card[data-v-b2196482]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-flex:1;-webkit-flex:1;flex:1;box-shadow:0 0 0 transparent;\nmargin:12px 15px;background-color:#fff;position:relative;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;border-radius:5px;overflow:hidden;\ncursor:pointer\n}.uni-border[data-v-b2196482]{position:relative;\n\nz-index:1}\n.uni-border[data-v-b2196482]:after{content:"";position:absolute;bottom:0;left:0;top:0;right:0;border:1px solid #e5e5e5;border-radius:10px;box-sizing:border-box;width:200%;height:200%;-webkit-transform:scale(.5);transform:scale(.5);-webkit-transform-origin:left top;transform-origin:left top;z-index:-1}\n.uni-border-bottom[data-v-b2196482]{position:relative;\n\nz-index:1}\n.uni-border-bottom[data-v-b2196482]:after{content:"";position:absolute;bottom:0;left:0;top:0;right:0;border-bottom:1px solid #e5e5e5;box-sizing:border-box;width:200%;height:200%;-webkit-transform:scale(.5);transform:scale(.5);-webkit-transform-origin:left top;transform-origin:left top;z-index:-1}\n.uni-border-top[data-v-b2196482]{position:relative;\n\nz-index:1}\n.uni-border-top[data-v-b2196482]:after{content:"";position:absolute;bottom:0;left:0;top:0;right:0;border-top:1px solid #e5e5e5;box-sizing:border-box;width:200%;height:200%;-webkit-transform:scale(.5);transform:scale(.5);-webkit-transform-origin:left top;transform-origin:left top;z-index:-1}\n.uni-card__thumbnailimage[data-v-b2196482]{position:relative;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;height:150px;overflow:hidden}.uni-card__thumbnailimage-box[data-v-b2196482]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;overflow:hidden}.uni-card__thumbnailimage-image[data-v-b2196482]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.uni-card__thumbnailimage-title[data-v-b2196482]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\nposition:absolute;bottom:0;left:0;right:0;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;padding:8px 12px;background-color:rgba(0,0,0,.4)}.uni-card__thumbnailimage-title-text[data-v-b2196482]{-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:14px;color:#fff}.uni-card__title[data-v-b2196482]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:10px}.uni-card__title-box[data-v-b2196482]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;overflow:hidden}.uni-card__title-header[data-v-b2196482]{width:40px;height:40px;overflow:hidden;border-radius:5px}.uni-card__title-header-image[data-v-b2196482]{width:40px;height:40px}.uni-card__title-content[data-v-b2196482]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-flex:1;-webkit-flex:1;flex:1;padding-left:10px;height:40px;overflow:hidden}.uni-card__title-content-title[data-v-b2196482]{font-size:14px;line-height:22px}.uni-card__title-content-extra[data-v-b2196482]{font-size:12px;line-height:27px;color:#999}.uni-card__header[data-v-b2196482]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\nposition:relative;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;padding:12px;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.uni-card__header-title[data-v-b2196482]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;margin-right:8px;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.uni-card__header-title-text[data-v-b2196482]{font-size:16px;-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#333}.uni-card__header-extra-img[data-v-b2196482]{height:20px;width:20px;margin-right:8px}.uni-card__header-extra-text[data-v-b2196482]{-webkit-box-flex:1;-webkit-flex:1;flex:1;margin-left:8px;font-size:12px;text-align:right;color:#999}.uni-card__content[data-v-b2196482]{color:#333}.uni-card__content--pd[data-v-b2196482]{padding:12px}.uni-card__content-extra[data-v-b2196482]{font-size:14px;padding-bottom:10px;color:#999}.uni-card__footer[data-v-b2196482]{-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:12px}.uni-card__footer-text[data-v-b2196482]{color:#999;font-size:12px}.uni-card--shadow[data-v-b2196482]{position:relative;\nbox-shadow:0 0 5px 1px rgba(0,0,0,.1)\n}.uni-card--full[data-v-b2196482]{margin:0;border-radius:0}\n.uni-card--full[data-v-b2196482]:after{border-radius:0}\n.uni-ellipsis[data-v-b2196482]{\noverflow:hidden;white-space:nowrap;text-overflow:ellipsis;\n}',""]),t.exports=e},"95a7":function(t,e,i){"use strict";var n=i("499c"),o=i.n(n);o.a},9979:function(t,e,i){"use strict";i.r(e);var n=i("4e98"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},"9a5b":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"uni-section",attrs:{nvue:!0}},[t.type?i("v-uni-view",{staticClass:"uni-section__head"},[i("v-uni-view",{staticClass:"uni-section__head-tag",class:t.type})],1):t._e(),i("v-uni-view",{staticClass:"uni-section__content"},[i("v-uni-text",{staticClass:"uni-section__content-title",class:{distraction:!t.subTitle}},[t._v(t._s(t.title))]),t.subTitle?i("v-uni-text",{staticClass:"uni-section__content-sub"},[t._v(t._s(t.subTitle))]):t._e()],1),t._t("default")],2)},a=[]},c94d:function(t,e,i){var n=i("1f63");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("74a48d82",n,!0,{sourceMap:!1,shadowMode:!1})},cea3:function(t,e,i){"use strict";i.r(e);var n=i("e1a3"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},d0ad:function(t,e,i){"use strict";i.r(e);var n=i("350f"),o=i("9979");for(var a in o)"default"!==a&&function(t){i.d(e,t,(function(){return o[t]}))}(a);i("ed6b");var r,l=i("f0c5"),c=Object(l["a"])(o["default"],n["b"],n["c"],!1,null,"493d61b0",null,!1,n["a"],r);e["default"]=c.exports},e1a3:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"UniSection",props:{type:{type:String,default:""},title:{type:String,default:""},subTitle:{type:String,default:""}},data:function(){return{}},watch:{title:function(t){uni.report&&""!==t&&uni.report("title",t)}},methods:{onClick:function(){this.$emit("click")}}};e.default=n},e2c4:function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"uni-card uni-border",class:{"uni-card--full":!0===t.isFull||"true"===t.isFull,"uni-card--shadow":!0===t.isShadow||"true"===t.isShadow}},["basic"===t.mode&&t.title?i("v-uni-view",{staticClass:"uni-card__header uni-border-bottom",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.onClick.apply(void 0,arguments)}}},[t.thumbnail?i("v-uni-view",{staticClass:"uni-card__header-extra-img-view"},[i("v-uni-image",{staticClass:"uni-card__header-extra-img",attrs:{src:t.thumbnail}})],1):t._e(),i("v-uni-text",{staticClass:"uni-card__header-title-text"},[t._v(t._s(t.title))]),t.extra?i("v-uni-text",{staticClass:"uni-card__header-extra-text"},[t._v(t._s(t.extra))]):t._e()],1):t._e(),"title"===t.mode?i("v-uni-view",{staticClass:"uni-card__title uni-border-bottom",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.onClick.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"uni-card__title-box"},[i("v-uni-view",{staticClass:"uni-card__title-header"},[i("v-uni-image",{staticClass:"uni-card__title-header-image",attrs:{src:t.thumbnail,mode:"scaleToFill"}})],1),i("v-uni-view",{staticClass:"uni-card__title-content"},[i("v-uni-text",{staticClass:"uni-card__title-content-title uni-ellipsis"},[t._v(t._s(t.title))]),i("v-uni-text",{staticClass:"uni-card__title-content-extra uni-ellipsis"},[t._v(t._s(t.subTitle))])],1)],1),t.extra?i("v-uni-view",[i("v-uni-text",{staticClass:"uni-card__header-extra-text"},[t._v(t._s(t.extra))])],1):t._e()],1):t._e(),"style"===t.mode?i("v-uni-view",{staticClass:"uni-card__thumbnailimage",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.onClick.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"uni-card__thumbnailimage-box"},[i("v-uni-image",{staticClass:"uni-card__thumbnailimage-image",attrs:{src:t.thumbnail,mode:"aspectFill"}})],1),t.title?i("v-uni-view",{staticClass:"uni-card__thumbnailimage-title"},[i("v-uni-text",{staticClass:"uni-card__thumbnailimage-title-text"},[t._v(t._s(t.title))])],1):t._e()],1):t._e(),i("v-uni-view",{staticClass:"uni-card__content uni-card__content--pd",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.onClick.apply(void 0,arguments)}}},["style"===t.mode&&t.extra?i("v-uni-view",{},[i("v-uni-text",{staticClass:"uni-card__content-extra"},[t._v(t._s(t.extra))])],1):t._e(),t._t("default")],2),t.note?i("v-uni-view",{staticClass:"uni-card__footer uni-border-top"},[t._t("footer",[i("v-uni-text",{staticClass:"uni-card__footer-text"},[t._v(t._s(t.note))])])],2):t._e()],1)},a=[]},ed6b:function(t,e,i){"use strict";var n=i("c94d"),o=i.n(n);o.a}}]);