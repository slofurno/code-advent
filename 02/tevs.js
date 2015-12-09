var fs = require('fs');
var input = fs.readFileSync("./input.txt", "utf8").match(/[^\r?\n]+/g);

function ribbon (line) {

    var d = line.split("x").map(x => x|0);
    var perm = [];
    perm[0] = 2 * d[0] + 2 * d[1];
    perm[1] = 2 * d[1] + 2 * d[2];
    perm[2] = 2 * d[2] + 2 * d[0];

    var min = Math.min(...perm);
    
    var vol = d[0] * d[1] * d[2];

    return min + vol;
}

function paperFeet (line)
{
    console.log(line);
    var d = line.split("x").map(x => x|0);
    var sides = [];
    sides[0] = d[0] * d[1];
    sides[1] = d[1] * d[2];
    sides[2] = d[2] * d[0];
    // l x w x h
    var extra = Math.min(...sides);  

    console.log(d, extra);
    var area = sides.reduce(function(a,c) {return a + 2*c;}, 0);
    return area + extra;
}


var paper = input.map(ribbon).reduce((a,c) => a + c);
console.log(paper);
