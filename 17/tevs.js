"use strict";

var fs = require('fs');

fs.readFile("./input.txt", 'utf8', function (err, data) {
    var cons = data.match(/.+/g).map(x => x|0);
    cons.sort((a,b) => a - b);
    console.log(cons);

    fill(cons, 150, []);
    combs.sort((a,b) => a.length - b.length);

    var min = combs[0].length;
    
    var mins = combs.filter(x => x.length === min);

    console.log(c, mins.length);
    console.log(mins);
});


var c = 0;
var combs = [];

function fill (cons, left, used)
{
    if (left < 0) return;
    if (left == 0){
        combs.push(used);
        c++;
        return;
    }
   
    var rest = cons.slice(); 
    while(rest.length > 0){
        var aa = used.slice();
        var head = rest.pop();
        aa.push(head);
        
        fill (rest, left - head, aa);
    }
}

