// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

// Depends on jsonlint.js from https://github.com/zaach/jsonlint

// declare global: jsonlint
function removeCommentFromJSON(json){
  if(json){
    let lines = json.split('\n');
    for (let i=0;i<lines.length;i++) {
      let line = lines[i];
      if(line){
        let quotCount = 0;
        for (let k=0;k<line.length;k++) {
          if(line[k] === '"'){
            quotCount++;
          }
          if(line[k] === '/'&&line[k+1] === '/'){// 碰到//
            if(quotCount%2===0){// 不在双引号里面，则认为是注释
              line = line.substring(0,k);
              break;
            }
          }
        }
      }
      lines[i] = line;
    }
    return lines.join('\r\n');
  }
  return json;
}
(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.registerHelper("lint", "json", function(text) {
  var found = [];
  if (!window.jsonlint) {
    if (window.console) {
      window.console.error("Error: window.jsonlint not defined, CodeMirror JSON linting cannot run.");
    }
    return found;
  }
  if(!text||!text.trim())return found;
  if(text.trim().startsWith('<'))return found;
  text=removeCommentFromJSON(text);
  jsonlint.parseError = function(str, hash) {
    if(text&&(text.trim().startsWith('{') || text.trim().startsWith('['))){// 支持js格式的简化JSON
      let hasEr=false;
      try{
        eval('('+text+')');
      }catch(e){
        hasEr=true;
      }
      if(!hasEr)return;
    }
    var loc = hash.loc;
    found.push({from: CodeMirror.Pos(loc.first_line - 1, loc.first_column),
                to: CodeMirror.Pos(loc.last_line - 1, loc.last_column),
                message: str});
  };
  try { jsonlint.parse(text); }
  catch(e) {}
  return found;
});

});
