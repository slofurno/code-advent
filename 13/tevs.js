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
    console.log(lines);

    lines.forEach(x => names[x[0]] = true);

    var n = Object.keys(names);

    var mylines = n.map(x => ["Me", "gain", 0, x]);
    var mylines2 = n.map(x => [x, "gain", 0, "Me"]);

    lines = lines.concat(mylines);
    lines = lines.concat(mylines2);
    n.push("Me");

    console.log(lines, n);
    perm(n, 0);        

    console.log(res.length);

    var maxcost = 0;
  
    for(var j = 0; j < res.length; j++){
        var x = res[j];

        x.push(x[0]);
        x.push(x[1]);

        var cost = 0;

        for(var i = 1; i < x.length-1; i++){
            var right = lines.filter(s => s[0] == x[i] && s[3] == x[i+1])[0];
            var left = lines.filter(s => s[0] == x[i] && s[3] == x[i-1])[0];
            cost += getCost(right) + getCost(left); 
        }


        if (cost > maxcost){
            maxcost = cost;
        }
    }
    console.log(maxcost);

//    console.log(Math.max(...costs));

});

function getCost (line)
{
    var op = 1;
    if (line[1] == "lose"){
        op = -1;
    }

    return op * line[2];
}


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
