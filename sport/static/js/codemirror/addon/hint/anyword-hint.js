// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  var WORD = /[\w$]+/, RANGE = 500;
  var WORDG;

  CodeMirror.registerHelper("hint", "anyword", function(editor, options) {
    var word = options && options.word || WORD;
    var range = options && options.range || RANGE;
    var cur = editor.getCursor(), curLine = editor.getLine(cur.line);
    var end = cur.ch, start = end;
    while (start && word.test(curLine.charAt(start - 1))) --start;// 从光标处往前找所有的\w
    var curWord = start != end && curLine.slice(start, end);// 截取出当前的word
    var list = options && options.list || [], seen = {};
    var re;
    if(WORDG){
      re = WORDG;
    }else{
      re = new RegExp(word.source, "g");
      WORDG = re;
    }
    for (var dir = -1; dir <= 1; dir += 2) {// dir[-1,1]，当前行往前、后各range行
      var line = cur.line, endLine = Math.min(Math.max(line + dir * range, editor.firstLine()), editor.lastLine()) + dir;
      for (; line != endLine; line += dir) {
        var text = editor.getLine(line), m;
        let commentIdx;
        if((commentIdx=text.indexOf('//')) > -1){
          text = text.substring(0, commentIdx);
        }
        while (m = re.exec(text)) {// 找出所有的\w+
          if (line == cur.line && m[0] === curWord) continue;
          if ((!curWord || m[0].lastIndexOf(curWord, 0) == 0) && !Object.prototype.hasOwnProperty.call(seen, m[0])) {
            seen[m[0]] = true;
            list.push(m[0]);
          }
        }
      }
    }

    let defaultWords = ['log','List','return',{text:'if(){}',offset:3},{text:'else{}',offset:1},{text:'else if(){}',offset:3},{text:'while(){\n  \n}',upOffset:2,offset:2},{text:'for(){}',offset:3},'def','break','context','continue','continueInvoke','params','JSON','SqlUtil','ResultType','SpringUtil','HttpUtil','JsonUtil'];
    let stillHint=false;
    function aiDotSug(keyw,mustWords){
      let keywIdx = curLine.indexOf(keyw+'.');
      if(keywIdx > -1){// 如果该行含关键字了，且当前从keyw.处到光标的midWord全是字符
        let midWord;
        if(!(keywIdx + keyw.length+1 <= end && /^[a-zA-Z]*$/.test((midWord=curLine.substring(keywIdx + keyw.length+1, end))))){
          return;
        }
        stillHint=true;
        let curIdx=list.indexOf(keyw);
        if(curIdx > -1){
          list.splice(curIdx,1);
        }
        defaultWords=[];
        let mustUseWords = [];
        for (let i = 0; i < mustWords.length; i++) {
          if(typeof mustWords[i] === 'string'){
            mustWords[i] = {text:mustWords[i]};
          }
          mustWords[i].className='default-picker';
          let item = mustWords[i].text;
          let needPush=false;
          if(list.indexOf(item) === -1){
            if(keywIdx + keyw.length+1 == end || item.startsWith(curWord)){
              needPush = true;
            }
          }
          if(needPush){
            mustUseWords.push(mustWords[i]);
          }
        }
        list = [...mustUseWords, ...list];
      }
    }
    aiDotSug('context', [{text:"saveParam('',v)",offset:4},{text:'saveParams([k:v])',offset:4},'suspendFlow()','resultContext','flowBizOrderId',{text:"error('errCode','errMsg')",offset:11},'serviceId','groupId','nodeKey','nodeText']);
    aiDotSug('ResultType',['FAIL','PROCESSING','SUCCESS']);
    aiDotSug('SqlUtil',[{text:'list("select * from ",wheres)',offset:9},{text:'map("select * from  where id=:id",[id:1])',offset:22},{text:"object('select count(1) from ',[:],Long.class)",offset:17},{text:"insertByMap('t', fields)",offset:10},{text:"updateByMap('t', fields)",offset:10},{text:"updateByMapPrimaryKey('t',fields,'id')",offset:14},{text:"updateByMap('t',fields,wheres)",offset:16},"update(sql,params)",'startTransaction()','commit()','rollback()','list(sql,wheres,true)','map(sql,wheres,true)',{text:"init(SpringUtil.getBean())",offset:2},{text:"init('dsKey',{})",offset:5},{text:'exeTx({\n  \n})',upOffset:1},{text:"eq(sql,params,'col')",offset:2},{text:"lte(sql,params,'col','key')",offset:8},{text:"gte(sql,params,'col','key')",offset:8},{text:"in(sql,params,'col')",offset:2},{text:"notIn(sql,params,'col')",offset:2},{text:"limit(sql,params)",offset:0}]);
    aiDotSug('SpringUtil',[{text:"getBean()",offset:1},'getApplicationContext()']);
    aiDotSug('EnvUtil',['isProd()']);
    aiDotSug('HttpUtil',[{text:"get('')",offset:2},{text:"get('',[header:''])",offset:14},{text:"get('',[header:''],3000)",offset:18},{text:"get([url:'',headers:[:],isLog:true])",offset:26},{text:"post('',[:])",offset:6},{text:"post('',[header:''],[:])",offset:18},{text:"post('',[header:''],[:],3000)",offset:23},{text:"post([url:'',body:[:],isLog:true])",offset:23}]);
    aiDotSug('log',[{text:"i()",offset:1},{text:"w()",offset:1},{text:"e()",offset:1},{text:"f()",offset:1},{text:"log()",offset:1},{text:"d()",offset:1}]);
    aiDotSug('JsonUtil',[{text:"toJSONString()",offset:1},{text:"convert2JSONObject(map)",offset:1},{text:"toJavaObject(map,.class)",offset:8},{text:"parse(text)",offset:1},{text:"parseObject(text)",offset:1},{text:"parseObject(text,.class)",offset:8}]);
    aiDotSug('JSON',[{text:"parseObject(str,clazz)",offset:7},{text:"toJavaObject(json,.class)",offset:8},{text:"toJSON(javaObj)",offset:1}, {text:"parseArray(str)",offset:1}, "toJSONString不建议(groovy有坑)，请使用JsonUtil.toJSONString"]);
    aiDotSug('resultContext',[{text:"resultBody",offset:0},{text:"put('',)",offset:3},{text:"putAll([:])",offset:3},"resultType","errCode","failMessage"]);
    aiDotSug('FlowEngine',[{text:"syncInvokeNodeStep('',[:])",offset:6},{text:"startFlow('serviceId','groupId',[:])",offset:16},{text:"continueFlow('serviceId','groupId',[:])",offset:16}]);
    
    for (let i = 0; i < defaultWords.length; i++) {
      let item = typeof defaultWords[i] == 'string' ? defaultWords[i] : defaultWords[i].text;
      if(curWord&&item.startsWith(curWord)){
        if(list.indexOf(item) === -1){
          list.push(defaultWords[i]);
        }
      }
    }
    return {list: list, from: CodeMirror.Pos(cur.line, start), to: CodeMirror.Pos(cur.line, end), stillHint};
  });
});
