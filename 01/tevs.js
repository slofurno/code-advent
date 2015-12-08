var fs = require('fs');
var input = "";

fs.readFile('./input.txt', 'utf8', function (err, data) {
    if (err) throw err;
    console.log(data);
    input = data;
    basement();
});

function basement(){
    var floor = 0;
    for (var i = 0; i < input.length; i++){
        if (input[i]==='('){
            floor++;
        }else if (input[i]===')'){
            floor--;
        }

        if (floor === -1){
            console.log(i);
            return;
        }
    }
}

function tevs() {
    var up = /\(/g;
    var down = /\)/g;
    var upcount = input.match(/\(/g).length;
    var downcount = input.match(/\)/g).length;

    console.log(upcount, downcount);
}
