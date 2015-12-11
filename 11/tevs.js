"use strict";
var fs = require('fs');
/*
fs.readFile("./input.txt", 'utf8', function (err, data) {
    var lines = data.match(/[^\r\n]+/g);

});
*/
var a = 'a'.charCodeAt(0);
var z = 'z'.charCodeAt(0);

var input = "hxbxwxba";
var code = [].slice.call(input).map(x => x.charCodeAt(0));

var s = "";
var len = code.length;

start:
while(true){
    code[len-1] = code[len-1] + 1;

    for (var i = len-1; i >= 0; i--){
        if (code[i] <= z) {
            break;
        }
        code[i] = a;
        code[i - 1] = code[i-1] + 1;
    }


    if (!ascending(code)){
        continue;
    }
    s = String.fromCharCode(...code);

    if (s.match(/[iol]/)){
        continue;
    }

    var pairs = s.match(/(\w)(\1)/g);

    if (pairs && pairs.length >= 2){
        console.log(s);
    }
}

function ascending (code)
{
    for (var i = 2; i < code.length; i++){
        if (code[i-2]+2 === code[i] && code[i-1]+1 === code[i]){
           return true; 
        }
    }
    return false;

}

console.log(s);

