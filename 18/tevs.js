"use strict";

var fs = require('fs');

fs.readFile("./input.txt", 'utf8', function (err, data) {
    var lines = data.match(/.+/g);

    var lights = []
    for (var i = 0; i < 100; i++){
        lights[i] = [];
    }

    for (var j = 0; j < lines.length; j++){
        var line = lines[j];
        for (var i = 0; i < line.length; i++){
            lights[j][i] = 0;
            if (line[i] == '#'){
                lights[j][i] = 1;
            }
        }
    }    

    for (var i = 0; i < 100; i++){
        lights = step(lights);
    }

    var c = 0;
    for (var j = 0; j < 100; j++){
        for (var i = 0; i < 100; i++){
            if (lights[j][i] === 1){
                c++;
            }
        }
    }

    console.log(c);
});

function step (lights)
{
    var next = [];

    for (var j = 0; j < 100; j++){
        next[j] = [];
        for (var i = 0; i < 100; i++){
            var cur = lights[j][i];
            var n = neighbors(j, i, lights);
            if (cur == 1) {
                if (n == 2 || n == 3){
                    next[j][i] = 1;
                }else{
                    next[j][i] = 0;
                } 
            }else{
                if (n == 3){
                    next[j][i] = 1;
                }else{
                    next[j][i] = 0;
                }

            }         
        }
    }

    next[0][0] = 1;
    next[99][0] = 1;
    next[0][99] = 1;
    next[99][99] = 1;
    return next;
}

function neighbors (row, col, lights)
{
    var n = 0;
    for (var j = -1; j <= 1; j++){
        for (var i = -1; i <= 1; i++){
            var r = row + j;
            var c = col + i;

            if (r < 0 || r >= 100 || c < 0 || c >= 100){
                continue;
            }

            if (i == 0 && j == 0){
                continue;
            }
            if (lights[r][c] == 1) n++;
        }
    }

    return n;
}
