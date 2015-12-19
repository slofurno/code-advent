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



    var mols = [["H", "F"], ["N", "Al"], ["O", "Mg"]];

    var targets = ["HF", "NAl", "OMg"];
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


/*
    var gen = 1;

    while(true){
        var res = [];    
        var seen = {};

        for (var j = 0; j < mols.length; j++){
            var atoms = mols[j];

            for (var i = 0; i < atoms.length; i++){
                var cur = atoms[i];
                var m = convs[cur];

                if (typeof(m) == "undefined")
                {
                    continue;   
                }

                m.forEach(a => {
                    var copy = atoms.slice();
                    copy[i] = a;
                    var j = copy.join("");

                    if (!seen[j]){
                        seen[j] = true;
                        var asdf = [].slice.call(j);
                        res.push(asdf);
                        
                        if (j == tar) {
                            console.log("match @ ", gen);
                        }
                    }
                }); 
            }
        }
        gen++;
        mols = res;
        console.log(gen, res.length);
        console.log(res[0]);
    }
*/
});

function convert (e)
{
    return lookup[e];
}

function revert (e)
{
    return rlookup[e];
}


function parse (line)
{
    var split = line.split(" ");
    return {k:split[0], v:split[2]};
}
