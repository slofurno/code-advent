"use strict";

var fs = require('fs');


var lookup = {};
var rlookup = {};
var reg = /[A-Z][a-z]?/g;

fs.readFile("./input.txt", 'utf8', function (err, data) {
    var lines = data.match(/.+/g);
    var mol = "CRnCaSiRnBSiRnFArTiBPTiTiBFArPBCaSiThSiRnTiBPBPMgArCaSiRnTiMgArCaSiThCaSiRnFArRnSiRnFArTiTiBFArCaCaSiRnSiThCaCaSiRnMgArFYSiRnFYCaFArSiThCaSiThPBPTiMgArCaPRnSiAlArPBCaCaSiRnFYSiThCaRnFArArCaCaSiRnPBSiRnFArMgYCaCaCaCaSiThCaCaSiAlArCaCaSiRnPBSiAlArBCaCaCaCaSiThCaPBSiThPBPBCaSiRnFYFArSiThCaSiRnFArBCaCaSiRnFYFArSiThCaPBSiThCaSiRnPMgArRnFArPTiBCaPRnFArCaCaCaCaSiRnCaCaSiRnFYFArFArBCaSiThFArThSiThSiRnTiRnPMgArFArCaSiThCaPBCaSiRnBFArCaCaPRnCaCaPMgArSiRnFYFArCaSiThRnPBPMgAr";
    var start = "e";

    var convs = {};
    var kvp = lines.map(parse);
    kvp.sort((a,b) => b.v.length - a.v.length);
    kvp.forEach(x => convs[x.v] = x.k);
    console.log(kvp);

    var gen = 0;
    var cur = [mol];
    var seen = {};

    start:
    while(true){
        gen++;
        var res = [];
        for (var j = 0; j < cur.length; j++){
            var cmol = cur[j];

            if (cmol === "HF" || cmol === "NAl" || cmol === "OMg"){
                console.log("answer:", gen);
                break start;
            }

            for (var i = 0; i < kvp.length; i++){

                var v = kvp[i].v;
                var index = cmol.indexOf(v);
                    
                if (index >= 0){
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

function parse (line)
{
    var split = line.split(" ");
    return {k:split[0], v:split[2]};
}
