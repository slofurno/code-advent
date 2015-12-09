"use strict";
var fs = require('fs');
var lines = fs.readFileSync("./input.txt", "utf8").match(/[^\r?\n]+/g);

var ops = {
    "AND": (a,b,d) => {if (checkSignals([a,b])) wires[d] = wires[a] & wires[b]},
    "OR": (a,b,d) => {if (checkSignals([a,b])) wires[d] = wires[a] | wires[b]},
    "LSHIFT": (a,b,d) => {if (checkSignals([a])) wires[d] = wires[a] << (b|0)},
    "RSHIFT": (a,b,d) => {if (checkSignals([a])) wires[d] = wires[a] >> (b|0)},
    "NOT": (a,d) => {if (checkSignals([a])) wires[d] = ~wires[a]}
};

function checkSignals (ids)
{
    var ok = true;
    ids.forEach(x => {
        if (typeof(wires[x]) === "undefined") {
            ok = false;
        };
    }); 

    return ok;
}

function maybeParseInt(w)
{
    var n = parseInt(w);

    if (n === NaN){
        return w;
    }

    return n;
}

var wires;
wires = {};
wires["0"] = 0;
wires["1"] = 1;
wires["44430"] = 44430;

function reset()
{
    wires = {};
    wires["0"] = 0;
    wires["1"] = 1;
}

function parse (line)
{
    var sides = line.split(" -> ");

    var args = sides[0].match(/\w+/g);
    var dst = sides[1].trim();

    if (args.length > 2){
        let f = ops[args[1]];
        f(args[0], args[2], dst);
        return;
    }

    if (args.length > 1){
        let f = ops[args[0]];
        f(args[1], dst);
        return;
    }

    console.log(args[0]);
    if (checkSignals([args[0]])){
        wires[dst] = wires[args[0]];
    }
}

reset();
wires["b"] = 3176;

for(var i = 0; i < 500; i++){
    lines.forEach(parse);
}

console.log(wires["a"]);
