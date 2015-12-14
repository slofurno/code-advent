"use strict";

var fs = require('fs');

fs.readFile("./input.txt", 'utf8', function (err, data) {
    var lines = data.match(/[^\r\n]+/g);
    var deer = lines.map(parse);
    deer.forEach(simulate);

    var points = {};
    deer.forEach(x => points[x.name] = 0);

    var winner = "";
    var max = 0;

    deer.forEach(x => console.log(x.records));

    for (var i = 0; i < 2503; i++){
       
        deer.forEach(x => {
            if (x.records[i] > max){
                max = x.records[i];
                console.log(x.name);
                winner = x.name;
            }
        }); 

        max = 0;
        points[winner]++;
    }    

//    deer.sort((a,b) => a.dist - b.dist);
    console.log(points);
});

function parse (line)
{
    var words = line.split(" ");
    var name = words[0];
    var speed = words[3];
    var duration = words[6];
    var rest = words[13];

    return {name:name, speed:speed|0, duration:duration|0, rest:rest|0};
}

function simulate (deer)
{
    
    var records = [];
    var dist = 0;
    var pos = 0;
    var t = 0;
    while(t < 2503){

        for(var i = 0; i < deer.duration; i++){
            pos+=deer.speed;         
            records.push(pos);
        }

        for(var i = 0; i < deer.rest; i++){
            records.push(pos);
        }
        t+= deer.duration + deer.rest;

/*        var d = Math.min(deer.duration, 2503 - t);
        dist += deer.speed * d;
        t += d + deer.rest; 
*/
    }

    deer.records = records;
    return deer;
}
