(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-API-choose-location-choose-location"],{"0714":function(t,n,i){"use strict";var e=i("ac48"),o=i.n(e);o.a},"834a":function(t,n,i){"use strict";i.r(n);var e=i("b50d"),o=i.n(e);for(var a in e)"default"!==a&&function(t){i.d(n,t,(function(){return e[t]}))}(a);n["default"]=o.a},"89c6":function(t,n,i){"use strict";i.r(n);var e=i("e828"),o=i("834a");for(var a in o)"default"!==a&&function(t){i.d(n,t,(function(){return o[t]}))}(a);i("0714");var r,u=i("f0c5"),c=Object(u["a"])(o["default"],e["b"],e["c"],!1,null,"720c61b4",null,!1,e["a"],r);n["default"]=c.exports},ac48:function(t,n,i){var e=i("cf5d");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var o=i("4f06").default;o("64d89148",e,!0,{sourceMap:!1,shadowMode:!1})},b50d:function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=i("ddb07"),o=e.formatLocation,a={data:function(){return{title:"chooseLocation",hasLocation:!1,location:{},locationAddress:""}},methods:{chooseLocation:function(){var t=this;uni.chooseLocation({success:function(n){t.hasLocation=!0,t.location=o(n.longitude,n.latitude),t.locationAddress=n.address}})},clear:function(){this.hasLocation=!1}}};n.default=a},cf5d:function(t,n,i){var e=i("24fb");n=e(!1),n.push([t.i,".page-body-info[data-v-720c61b4]{padding-bottom:0;height:%?440?%}",""]),t.exports=n},ddb07:function(t,n,i){function e(t){if("number"!==typeof t||t<0)return t;var n=parseInt(t/3600);t%=3600;var i=parseInt(t/60);t%=60;var e=t;return[n,i,e].map((function(t){return t=t.toString(),t[1]?t:"0"+t})).join(":")}function o(t,n){return"string"===typeof t&&"string"===typeof n&&(t=parseFloat(t),n=parseFloat(n)),t=t.toFixed(2),n=n.toFixed(2),{longitude:t.toString().split("."),latitude:n.toString().split(".")}}i("a15b"),i("d81d"),i("b680"),i("d3b7"),i("acd8"),i("e25e"),i("ac1f"),i("25f0"),i("1276");var a={UNITS:{"年":315576e5,"月":26298e5,"天":864e5,"小时":36e5,"分钟":6e4,"秒":1e3},humanize:function(t){var n="";for(var i in this.UNITS)if(t>=this.UNITS[i]){n=Math.floor(t/this.UNITS[i])+i+"前";break}return n||"刚刚"},format:function(t){var n=this.parse(t),i=Date.now()-n.getTime();if(i<this.UNITS["天"])return this.humanize(i);var e=function(t){return t<10?"0"+t:t};return n.getFullYear()+"/"+e(n.getMonth()+1)+"/"+e(n.getDate())+"-"+e(n.getHours())+":"+e(n.getMinutes())},parse:function(t){var n=t.split(/[^0-9]/);return new Date(n[0],n[1]-1,n[2],n[3],n[4],n[5])}};t.exports={formatTime:e,formatLocation:o,dateUtils:a}},e828:function(t,n,i){"use strict";i.d(n,"b",(function(){return o})),i.d(n,"c",(function(){return a})),i.d(n,"a",(function(){return e}));var e={pageHead:i("829f").default},o=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("v-uni-view",[i("page-head",{attrs:{title:t.title}}),i("v-uni-view",{staticClass:"uni-padding-wrap"},[i("v-uni-view",{staticStyle:{background:"#FFFFFF",padding:"40rpx"}},[i("v-uni-view",{staticClass:"uni-hello-text uni-center"},[t._v("当前位置信息")]),!1===t.hasLocation?[i("v-uni-view",{staticClass:"uni-h2 uni-center uni-common-mt"},[t._v("未选择位置")])]:t._e(),!0===t.hasLocation?[i("v-uni-view",{staticClass:"uni-hello-text uni-center",staticStyle:{"margin-top":"10px"}},[t._v(t._s(t.locationAddress))]),i("v-uni-view",{staticClass:"uni-h2 uni-center uni-common-mt"},[i("v-uni-text",[t._v("E: "+t._s(t.location.longitude[0])+"°"+t._s(t.location.longitude[1])+"′")]),i("v-uni-text",[t._v("\\nN: "+t._s(t.location.latitude[0])+"°"+t._s(t.location.latitude[1])+"′")])],1)]:t._e()],2),i("v-uni-view",{staticClass:"uni-btn-v"},[i("v-uni-button",{attrs:{type:"primary"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.chooseLocation.apply(void 0,arguments)}}},[t._v("选择位置")]),i("v-uni-button",{on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.clear.apply(void 0,arguments)}}},[t._v("清空")])],1)],1)],1)},a=[]}}]);