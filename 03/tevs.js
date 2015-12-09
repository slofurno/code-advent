var fs = require('fs');
var lines = fs.readFileSync("./input.txt", "utf8");//.match(/[^\r?\n]+/g);

var WIDTH = 500;
var HEIGHT = 500;
var houses = [];
for (var i = 0; i < WIDTH * HEIGHT; i++){
    houses[i] = 0;
}

var xs = [];
var ys = [];

xs[0] = 250;
xs[1] = 250;
ys[0] = 250;
ys[1] = 250;

function deliver (x, y){
    houses[y*WIDTH + x]++;
}

deliver (250, 250);

for (var i = 0; i < lines.length; i++){
    var who = i & 1;
    switch(lines[i]){
    case "^":
        ys[who]--;
        break;
    case "v":
        ys[who]++;
        break;
    case ">":
        xs[who]++;
        break;
    case "<":
        xs[who]--;
        break;
    default:
        continue;
    }
  
    deliver (xs[who], ys[who]); 
}

var gotem = houses.filter(x => x > 0);
console.log(gotem.length);
