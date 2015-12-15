"use strict";

var fs = require('fs');

fs.readFile("./input.txt", 'utf8', function (err, data) {
    //var lines = data.match(/[^\r\n]+/g);
    var lines = data.match(/.+/g);
    var ingred = lines.map(parse);
    console.log(ingred);

    twist([], 0);

    console.log(results[656]);

//    results = results.filter(x => sum(x) === 100);


    var max = 0;
    var maxi = 0;    

    for(var i = 0; i < results.length; i++){
        let cap = 0;
        let dura = 0;
        let flavor = 0;
        let tex = 0;
        let cal = 0;


        for (var j = 0; j < 4; j++){
            var q = results[i][j];
            cap += q * ingred[j].cap;
            dura += q * ingred[j].dura;
            flavor += q * ingred[j].flavor;
            tex += q * ingred[j].tex;
            cal += q * ingred[j].cal;
        } 

        if (cap <= 0 || dura <= 0 || flavor <= 0 || tex <= 0){
            continue;
        }

        if (cal !== 500){
            continue;
        }

        var score = cap * dura * flavor * tex;

        if (score > max){
            max = score;
            maxi = i;
            console.log(q, cap, dura, flavor, tex);
        }
    }

    console.log(max, results[maxi]);
    /*var reg = /(\w+): capacity (-?\d+)
    while ((matches = reg.exec(data)) != null)  
    {  
        lines.push([].slice.call(matches, 1));
    }  
    */

    

});

function sum (list)
{
    if (list.length === 0) return 0;

    return list.reduce((a,c) => a + c);
}

var results = [];

function twist (list, n)
{
    if (n == 4){

        if (sum(list) === 100){
            results.push(list);
        }
        return;
    }

    var cur = sum(list);

    for(var i = 0; i < 100; i++){
        if (cur + i <= 100){
            var copy = list.slice();
            copy.push(i);
            twist(copy, n + 1);
        }
    } 
}

function parse (line)
{
    var items = line.split(" ");
    var name = items[0].slice(0, items[0].length - 1);
    var cap = items[2].slice(0, items[2].length - 1)|0;
    var dura = items[4].slice(0, items[4].length - 1)|0;
    var flavor = items[6].slice(0, items[6].length - 1)|0;
    var tex = items[8].slice(0, items[8].length - 1)|0;
    var cal = items[10]|0;

    return {name, cap, dura, flavor, tex, cal};
}
