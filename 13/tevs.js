"use strict";

var fs = require('fs');
var res = [];

fs.readFile("./input.txt", 'utf8', function (err, data) {
    var reg = /(\w+) would (lose|gain) (\d+) happiness units by sitting next to (\w+)\./g;
   
    var lines = [];
    var matches; 
    while ((matches = reg.exec(data)) != null)  
    {  
        lines.push([].slice.call(matches, 1));
    }  
   

    var names = {};
    lines.forEach(x => names[x[0]] = true);
    var n = Object.keys(names);

    var mylines = n.map(x => ["Me", "gain", 0, x]);
    var mylines2 = n.map(x => [x, "gain", 0, "Me"]);

    lines = lines.concat(mylines);
    lines = lines.concat(mylines2);
    n.push("Me");

    var table = {};
    n.forEach(a => table[a] = {});

    var getSign = function(d, m) {
        if (d == "lose"){
            return -1 * m;
        }
        return m|0;
    };
    
    lines.forEach(a => table[a[0]][a[3]] = getSign(a[1], a[2]));

    perm(n, 0);        

    var maxcost = 0;
  
    for(var j = 0; j < res.length; j++){
        var x = res[j];

        x.push(x[0]);
        x.push(x[1]);

        var cost = 0;

        for(var i = 1; i < x.length-1; i++){
            var right = table[x[i]][x[i+1]];
            var left = table[x[i]][x[i-1]];
            cost += right + left;
        }


        if (cost > maxcost){
            maxcost = cost;
        }
    }
    console.log(maxcost);

});

function perm (guests, i)
{
    if (i == guests.length){
        res.push(guests.slice());        
        return;
    }

    for (var j = i ; j < guests.length; j++){
        swap(guests, i, j);
        perm(guests, i + 1);
        swap(guests, i, j);
    }
}

function swap (guests, i, j)
{
    var temp = guests[i];
    guests[i] = guests[j];
    guests[j] = temp;
}
