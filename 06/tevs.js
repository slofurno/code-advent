var fs = require('fs');

var lights = [];

var WIDTH = 1000;
var HEIGHT = 1000;
var n = 1000 * 1000;

for (var i = 0; i < n; i++){
    lights[i] = 0;
}

function toggle (light){
    return light + 2;
}

function turnon (light){
    return ++light;
}

function turnoff (light){
    var n = light - 1;
    return n >= 0 ? n : 0;
}

function parseCoord (line){
    var p = line.split(",");
    return {x:p[0]|0, y:p[1]|0};
}

function parseLine (line){
    var words = line.split(" ");

    if (words[0] === "toggle"){
        var p1 = parseCoord(words[1]);
        var p2 = parseCoord(words[3]);
        return {func:toggle, p1:p1, p2:p2};
    }  

    var p1 = parseCoord(words[2]);
    var p2 = parseCoord(words[4]);
   
    if (words[1] === "off"){
        return {func:turnoff, p1:p1, p2:p2};
    } 

    return {func:turnon, p1:p1, p2:p2};
}

function dosomething (g){
    var f = g.func;

    for (var j = g.p1.y; j <= g.p2.y; j++){
        for (var i = g.p1.x; i <= g.p2.x; i++){
            var index = j*WIDTH + i;
            lights[index] = f(lights[index]);
        }
    }
}

fs.readFile("./input.txt", "utf8", function (err, data) {
    var lines = data.split("\n").map(x => x.trim()).filter(x => x.length > 0);
    for (var i = 0; i < lines.length; i++){
        dosomething(parseLine(lines[i]));
    }

    var brightness = lights.reduce((a,c) => a + c); 
    console.log(brightness);

});


function draw() {
    
    var color = Randomizer.nextColor();

    for (var i = 0; i < 10; i++){
        drawCircle(etc, color, etc, etc);
        counter++;
    }
}
