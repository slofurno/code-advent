"use strict";

var fs = require('fs');

fs.readFile("./input.txt", 'utf8', function (err, data) {

    var masked = maskOff(data);
    var digits = masked.match(/-?[\d]+/g);

    var sum = digits.map(x => x|0).reduce((a,c) => a+c);
    console.log(sum);

});


function maskOff (s){

    var stack = [];

    for(var i = 0; i < s.length; i++){
        if (s[i] == "{"){
            stack.push(i);
        }else if (s[i] == "}"){
            var start = stack.pop();
            var sub = s.substring(start, i+1);
            if (sub.indexOf(":\"red\"")>=0){
                s = mask(s, start, i);        
            } 
        }
    }

    return s;
}

function mask (s, start, end)
{
    var wtf = [].slice.call(s);

    for (var i = start; i <= end; i++){
        wtf[i] = "X";
    }

    return wtf.join("");
}
