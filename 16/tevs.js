"use strict";

var fs = require('fs');

fs.readFile("./input.txt", 'utf8', function (err, data) {
    var lines = data.match(/.+/g);
    
    var aunts = lines.map(parse);
//    var match = {children:3,
//cats:7, samoyeds:2, pomeranians:3, akitas:0, vizslas:0,goldfish:5, trees:3, cars:2, perfumes:1};

    var match = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1};

    var matches = aunts.filter(x => check(x, match));
    console.log(matches);
});


function check (aunt, match)
{
    var keys = Object.keys(match);

    var props = keys.filter(x => typeof(aunt[x]) !== "undefined");
    

    for(var i = 0; i < props.length; i++){
        var prop = props[i];
        if ((prop === "cats" || prop === "trees") && aunt[prop] <= match[prop]){
            return false;
        }

        if ((prop === "pomeranians" || prop === "goldfish") && aunt[prop] >= match[prop]){
            return false;
        }


        if (aunt[prop] !== match[prop]){
            if (prop !== "pomeranians" && prop !== "goldfish" && prop !== "cats" && prop !== "trees"){
                return false;
                }
        }
    }
    
    return true;
}

function parse (line)
{
    var colon = line.indexOf(":");
    var att = line.slice(colon + 1);

    console.log(att);
    var attrs = att.match(/([a-z]+): (\d+)/g);
    
    var res = {name:line.slice(0,colon)};
    
    attrs.map(x => x.split(":")).forEach(x => res[x[0]] = x[1]|0);    
    return res;
}
