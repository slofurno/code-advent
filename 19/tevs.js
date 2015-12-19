"use strict";

var fs = require('fs');

var lookup = {};
var rlookup = {};
var reg = /[A-Z][a-z]?/g;

fs.readFile("./input.txt", 'utf8', function (err, data) {
    var lines = data.match(/.+/g);
    //var mol = "CRnCaSiRnBSiRnFArTiBPTiTiBFArPBCaSiThSiRnTiBPBPMgArCaSiRnTiMgArCaSiThCaSiRnFArRnSiRnFArTiTiBFArCaCaSiRnSiThCaCaSiRnMgArFYSiRnFYCaFArSiThCaSiThPBPTiMgArCaPRnSiAlArPBCaCaSiRnFYSiThCaRnFArArCaCaSiRnPBSiRnFArMgYCaCaCaCaSiThCaCaSiAlArCaCaSiRnPBSiAlArBCaCaCaCaSiThCaPBSiThPBPBCaSiRnFYFArSiThCaSiRnFArBCaCaSiRnFYFArSiThCaPBSiThCaSiRnPMgArRnFArPTiBCaPRnFArCaCaCaCaSiRnCaCaSiRnFYFArFArBCaSiThFArThSiThSiRnTiRnPMgArFArCaSiThCaPBCaSiRnBFArCaCaPRnCaCaPMgArSiRnFYFArCaSiThRnPBPMgAr";

    var mol ="ORnPBPMgArCaCaCaSiThCaCaSiThCaCaPBSiRnFArRnFArCaCaSiThCaCaSiThCaCaCaCaCaCaSiRnFYFArSiRnMgArCaSiRnPTiTiBFYPBFArSiRnCaSiRnTiRnFArSiAlArPTiBPTiRnCaSiAlArCaPTiTiBPMgYFArPTiRnFArSiRnCaCaFArRnCaFArCaSiRnSiRnMgArFYCaSiRnMgArCaCaSiThPRnFArPBCaSiRnMgArCaCaSiThCaSiRnTiMgArFArSiThSiThCaCaSiRnMgArCaCaSiRnFArTiBPTiRnCaSiAlArCaPTiRnFArPBPBCaCaSiThCaPBSiThPRnFArSiThCaSiThCaSiThCaPTiBSiRnFYFArCaCaPRnFArPBCaCaPBSiRnTiRnFArCaPRnFArSiRnCaCaCaSiThCaRnCaFArYCaSiRnFArBCaCaCaSiThFArPBFArCaSiRnFArRnCaCaCaFArSiRnFArTiRnPMgArF";

    var convs = {};
    var kvp = lines.map(parse);
    kvp.sort((a,b) => b.v.length - a.v.length);
    kvp.forEach(x => convs[x.v] = x.k);

    var gen = 0;
    var cur = [mol];
    var seen = {};

    start:
    while(true){
        gen++;
        console.log("gen", gen);
        var res = [];
        for (var j = 0; j < cur.length; j++){
            var cmol = cur[j];

            if (cmol === "HF" || cmol === "NAl" || cmol === "OMg"){
                console.log("answer:", gen);
                break start;
            }

            for (var i = 0; i < kvp.length; i++){

                var v = kvp[i].v;
                var indices = indices_of(cmol, v);

                for (var k = 0; k < indices.length; k++){
                    var index = indices[k];

                    var um = cmol.slice(0, index) + kvp[i].k + cmol.slice(index + v.length);
                     
                    if (!seen[um]){
                        seen[um] = true;
                        res.push(um);
                        cur = res;
                        continue start;
                    }

                }
            }

        }

        console.log("false start");
        gen = 0;
        cur = [mol];
    }
});

function indices_of (stack, needle)
{
    var i = 0;
    var res = [];
    var dx = -1;

    while ((dx = stack.indexOf(needle, i)) >= 0){
        res.push(dx);
        i = dx + needle.length;
    }

    return res;
}

function parse (line)
{
    var split = line.split(" ");
    return {k:split[0], v:split[2]};
}
