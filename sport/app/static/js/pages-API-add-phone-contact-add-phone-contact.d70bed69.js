(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-API-add-phone-contact-add-phone-contact"],{"2a22":function(n,t,e){"use strict";var a=e("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,e("96cf");var i=a(e("1da1")),u={data:function(){return{title:"addPhoneContact",name:"",phone:""}},methods:{nameChange:function(n){this.name=n.detail.value},phoneChange:function(n){this.phone=n.detail.value},add:function(){var n=this;return(0,i.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:uni.addPhoneContact({firstName:n.name,mobilePhoneNumber:n.phone,success:function(){uni.showModal({content:"已成功添加联系人！",showCancel:!1})},fail:function(){uni.showModal({content:"添加联系人失败！",showCancel:!1})}});case 1:case"end":return t.stop()}}),t)})))()}}};t.default=u},"4cda":function(n,t,e){"use strict";e.r(t);var a=e("2a22"),i=e.n(a);for(var u in a)"default"!==u&&function(n){e.d(t,n,(function(){return a[n]}))}(u);t["default"]=i.a},"67dd":function(n,t,e){"use strict";e.d(t,"b",(function(){return i})),e.d(t,"c",(function(){return u})),e.d(t,"a",(function(){return a}));var a={pageHead:e("829f").default},i=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-view",[e("page-head",{attrs:{title:n.title}}),e("v-uni-view",{staticClass:"uni-common-mt"},[e("v-uni-view",{staticClass:"uni-list"},[e("v-uni-view",{staticClass:"uni-list-cell"},[e("v-uni-view",{staticClass:"uni-list-cell-left"},[e("v-uni-view",{staticClass:"uni-label"},[n._v("名称")])],1),e("v-uni-view",{staticClass:"uni-list-cell-db"},[e("v-uni-input",{staticClass:"uni-input",attrs:{type:"text",placeholder:"请输入联系人名称",name:"name",value:n.name},on:{input:function(t){arguments[0]=t=n.$handleEvent(t),n.nameChange.apply(void 0,arguments)}}})],1)],1),e("v-uni-view",{staticClass:"uni-list-cell"},[e("v-uni-view",{staticClass:"uni-list-cell-left"},[e("v-uni-view",{staticClass:"uni-label"},[n._v("手机号")])],1),e("v-uni-view",{staticClass:"uni-list-cell-db"},[e("v-uni-input",{staticClass:"uni-input",attrs:{type:"text",placeholder:"请输入联系人手机号",name:"phone",value:n.phone},on:{input:function(t){arguments[0]=t=n.$handleEvent(t),n.phoneChange.apply(void 0,arguments)}}})],1)],1)],1),e("v-uni-view",{staticClass:"uni-padding-wrap"},[e("v-uni-view",{staticClass:"uni-btn-v"},[e("v-uni-button",{staticClass:"btn-setstorage",attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.add.apply(void 0,arguments)}}},[n._v("添加联系人")])],1)],1)],1)],1)},u=[]},"921e":function(n,t,e){"use strict";e.r(t);var a=e("67dd"),i=e("4cda");for(var u in i)"default"!==u&&function(n){e.d(t,n,(function(){return i[n]}))}(u);var s,l=e("f0c5"),c=Object(l["a"])(i["default"],a["b"],a["c"],!1,null,"225f0a22",null,!1,a["a"],s);t["default"]=c.exports}}]);