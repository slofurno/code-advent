"use strict";

var fs = require('fs');

fs.readFile("./input.txt", 'utf8', function (err, data) {
    /*
    var digits = data.match(/-?[\d]+/g);
    console.log(digits);
    var sum = digits.map(x => x|0).reduce((a,c) => a+c);
    console.log(sum);
    */

    var masked = maskOff(data);

    var digits = masked.match(/-?[\d]+/g);
    console.log(digits);
    var sum = digits.map(x => x|0).reduce((a,c) => a+c);
    console.log(sum);

});


function maskOff (s){

    var original = s;
    var stack = [];
    var astack = [];

    var ok = "\x01";
    var bad = "\x02"; 

    for(var i = 0; i < s.length; i++){
        if (s[i] == "{"){
            stack.push(i);
        }else if (s[i] == "}"){
            var start = stack.pop();
            var sub = s.substring(start, i+1);
            if (sub.indexOf(":\"red\"")>=0){
                s = mask(s, start, i, bad);        
            } else{
            //    s = mask(s, start, i, ok);        
            } 

        }
    }

    return s;
    var res = [];
    for(var i = 0; i < original.length; i++){
        if (s[i] != bad){
            res.push(original[i]);
        }else{
            res.push("X");
        }
    }
    return res.join("");
}

function mask (s, start, end, c){

    var wtf = [].slice.call(s);
    var bad = "\x02"; 

    for (var i = start; i <= end; i++){
        wtf[i] = "X";
    }

    return wtf.join("");
}
/*
function bracket (s)
{
    var depth = 0;
    s = "x" + s;
    var totalSum;
    var localSum;

    var localBlocked;
    var tmp = "";

    while(s.length > 1)
    {
        s = s.slice(1);

        if (s[i].match(/{/)){
            depth++;
            continue;
        }

        if(s[i].match(/}/){
            depth--;
            continue;
        }
        
        tmp = s[i].match(/-?[\d]/); 
        tmp = tmp ? tmp[0] : tmp;

        if(tmp){
            var s =
            var amt = 
        }
    }

}

function cycle (o){
    var it = o;

    if (typeof(o) === "object"){
        var keys = Object.keys(o);
        var red = keys.filter(x => x === "red");  
         
    }
}
*/

