(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-API-websocket-socketTask-websocket-socketTask"],{"02a3":function(n,t,e){var o=e("5846");"string"===typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);var s=e("4f06").default;s("0a8f8b96",o,!0,{sourceMap:!1,shadowMode:!1})},"4c91":function(n,t,e){"use strict";var o=e("02a3"),s=e.n(o);s.a},5846:function(n,t,e){var o=e("24fb");t=o(!1),t.push([n.i,".uni-btn-v[data-v-1b5e77b8]{padding:%?10?% 0}.uni-btn-v uni-button[data-v-1b5e77b8]{margin:%?20?% 0}.websocket-msg[data-v-1b5e77b8]{padding:40px 0;text-align:center;font-size:14px;line-height:40px;color:#666}.websocket-tips[data-v-1b5e77b8]{padding:40px 0;text-align:center;font-size:14px;line-height:24px;color:#666}",""]),n.exports=t},"63e6":function(n,t,e){"use strict";e("d3b7"),e("e25e"),e("25f0"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=uni.getSystemInfoSync().platform,s={data:function(){return{connected:!1,connecting:!1,socketTask:!1,msg:!1}},computed:{showMsg:function(){return this.connected?this.msg?"收到消息："+this.msg:"等待接收消息":"尚未连接"}},onUnload:function(){uni.hideLoading(),this.socketTask&&this.socketTask.close&&this.socketTask.close()},methods:{connect:function(){var n=this;if(this.connected||this.connecting)return uni.showModal({content:"正在连接或者已经连接，请勿重复连接",showCancel:!1}),!1;this.connecting=!0,uni.showLoading({title:"连接中..."}),this.socketTask=uni.connectSocket({url:"wss://echo.websocket.org",data:function(){return{msg:"Hello"}},success:function(n){},fail:function(n){}}),console.log(this.socketTask),this.socketTask.onOpen((function(t){n.connecting=!1,n.connected=!0,uni.hideLoading(),uni.showToast({icon:"none",title:"连接成功"}),console.log("onOpen",t)})),this.socketTask.onError((function(t){n.connecting=!1,n.connected=!1,uni.hideLoading(),uni.showModal({content:"连接失败，可能是websocket服务不可用，请稍后再试",showCancel:!1}),console.log("onError",t)})),this.socketTask.onMessage((function(t){n.msg=t.data,console.log("onMessage",t)})),this.socketTask.onClose((function(t){n.connected=!1,n.startRecive=!1,n.socketTask=!1,n.msg=!1,console.log("onClose",t)})),console.log("task",this.socketTask)},send:function(){this.socketTask.send({data:"from "+o+" : "+parseInt(1e4*Math.random()).toString(),success:function(n){console.log(n)},fail:function(n){console.log(n)}})},close:function(){this.socketTask&&this.socketTask.close&&this.socketTask.close()}}};t.default=s},"68c8":function(n,t,e){"use strict";e.r(t);var o=e("905b"),s=e("a65d");for(var c in s)"default"!==c&&function(n){e.d(t,n,(function(){return s[n]}))}(c);e("4c91");var i,a=e("f0c5"),u=Object(a["a"])(s["default"],o["b"],o["c"],!1,null,"1b5e77b8",null,!1,o["a"],i);t["default"]=u.exports},"905b":function(n,t,e){"use strict";e.d(t,"b",(function(){return s})),e.d(t,"c",(function(){return c})),e.d(t,"a",(function(){return o}));var o={pageHead:e("829f").default},s=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-view",[e("page-head",{attrs:{title:"websocket通讯示例"}}),e("v-uni-view",{staticClass:"uni-padding-wrap"},[e("v-uni-view",{staticClass:"uni-btn-v"},[e("v-uni-view",{staticClass:"websocket-msg"},[n._v(n._s(n.showMsg))]),e("v-uni-button",{attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.connect.apply(void 0,arguments)}}},[n._v("连接websocket服务")]),e("v-uni-button",{directives:[{name:"show",rawName:"v-show",value:n.connected,expression:"connected"}],attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.send.apply(void 0,arguments)}}},[n._v("发送一条消息")]),e("v-uni-button",{attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.close.apply(void 0,arguments)}}},[n._v("断开websocket服务")]),e("v-uni-view",{staticClass:"websocket-tips"},[n._v("发送消息后会收到一条服务器返回的消息（与发送的消息内容一致）")])],1)],1)],1)},c=[]},a65d:function(n,t,e){"use strict";e.r(t);var o=e("63e6"),s=e.n(o);for(var c in o)"default"!==c&&function(n){e.d(t,n,(function(){return o[n]}))}(c);t["default"]=s.a}}]);