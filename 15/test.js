"use strict";

var fs = require('fs');

fs.readFile("./input.txt", 'utf8', function (err, data) {
    var reg = /(\w+): capacity (\d), durability (-?\d), flavor (-?\d), texture (-?\d), calories (\d)/g;
    var greds = [];
    var match;
    while ((match = reg.exec(data)) !== null){
       greds.push(match.slice(1)); 
    }

    console.log(greds);
});
