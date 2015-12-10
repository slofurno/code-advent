var fs = require('fs');
var vowel = /a|e|i|o|u/g;

var ng = ["ab", "cd", "pq", "xy"];

function hasRepeated (str){
    for (var i = 1; i < str.length; i++){
       if (str[i] === str[i-1]){
          return true;
       } 
    }
    return false;
}

function nice (str){

    var vowels = str.match(vowel) || [];
    if (vowels.length < 3){
       return false;
    }

    if (!hasRepeated(str)){
        return false;
    }

    var match = ng.map(x => str.indexOf(x)).filter(x => x >= 0);

    if (match.length > 0) {
        return false;
    }

    return true;
}

function hasPair (str){
    
    for (var i = 0; i < str.length - 1; i++){
        var bite = str.substr(i, 2); 
       // var rbite = [].slice.call(bite).reverse().join("");
        var tail = str.substr(i + 2);

        if (tail.indexOf(bite) >= 0){
            return true;
        }
    }
    return false;
}

function pairs2 (str){
    var count = {};

    [].slice.call(str).forEach(x => count[x] = count[x] + 1 || 1);
   
    var n = 0;

    Object.keys(count).map(x => count[x]).forEach(x => {
        if (x >= 4) {
            n+=2;
        }else if (x >= 2){
            n++;
        }
    }); 

    console.log(count);

    return n;
}

function sandwich (str){
    for (var i = 2; i < str.length; i++){
       if (str[i] === str[i-2]){
            return true;
       } 
    }
    return false;
}

function tryregex (str)
{
    return (str.match(/([\w])[\w](\1)/) && str.match(/([\w])([\w])[\w]*(\1)(\2)/));
}

    fs.readFile("./input.txt", 'utf8', function (err, data) {
        var lines = data.split("\n").map(x => x.trim()).filter(x => x.length > 0);

        //var isnice = lines.filter(x => hasPair(x) && sandwich(x));
        var isnice = lines.filter(tryregex);
        console.log(isnice.length);
    });


var tests = ["qjhvhtzxzqqjkmpb", "xxyxx", "uurcxstgmygtbstg", "ieodomkazucvgmuy"];

tests.forEach(x => console.log(hasPair(x) && sandwich(x)));

