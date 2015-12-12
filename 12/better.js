"use strict";

var fs = require('fs');

fs.readFile("./input.txt", 'utf8', function (err, data) {

    var masked = mask(data);
    var digits = masked.match(/-?[\d]+/g);

    var sum = digits.map(x => x|0).reduce((a,c) => a+c);
    console.log(sum);

});

function mask (s){

    var stack = [];

    for(var i = 0; i < s.length; i++){
        if (s[i] == "{"){
            stack.push(i);
        }else if (s[i] == "}"){
            var start = stack.pop();
            var sub = s.substring(start, i+1);
            if (sub.indexOf(":\"red\"")>=0){
                s = s.substring(0, start) + s.substring(i + 1);
                i -= sub.length;
            } 
        }
    }
    
    return s;
}

