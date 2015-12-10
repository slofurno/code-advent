"use strict";
var fs = require('fs');

var paths = {};
var _cities = {};
var perms = [];

fs.readFile("./input.txt", 'utf8', function (err, data) {
    var lines = data.match(/[^\r\n]+/g);
    lines.forEach(parse);

    var cities = Object.keys(_cities);
    console.log(cities);
    walk(cities, 0);

    var dists = [];
    console.log(perms); 
    perms.forEach(perm => {
        var dist = 0;
        for (var i = 0; i < perm.length - 1; i++){
            if (paths[perm[i]] && paths[perm[i]][perm[i+1]]){
                dist += paths[perm[i]][perm[i+1]]; 
            }else{
                return;
            }
        }
        dists.push(dist);
    });

    console.log(Math.min(...dists));

    console.log(Math.max(...dists));
});


function walk (cities, i)
{
    console.log(i, cities.length);
    if (i == cities.length){
        perms.push(cities.slice());
        return;
    }
    for (var j = i; j < cities.length; j++){
        swap(cities, i, j); 
        walk(cities, i + 1);
        swap(cities, i, j);
    }      

}

function swap (arr, a, b)
{
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function parse (str)
{
    var path = str.match(/(\w+)\sto\s(\w+)\s=\s(\w+)/);
    paths[path[1]] = paths[path[1]] || {};
    paths[path[2]] = paths[path[2]] || {};
    paths[path[1]][path[2]] = path[3]|0; //{dst:path[1], cost:path[2]|0};
    paths[path[2]][path[1]] = path[3]|0;
    _cities[path[1]] = true;
    _cities[path[2]] = true;
}


