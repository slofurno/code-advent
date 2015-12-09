var fs = require('fs');


fs.readFile("./input.txt", "utf8", function (err, data) {

    var lines = data.split('\n').map(x => x.trim()).filter(x => x.length > 0);

    var chars = 0;
    var bytes = 0;

    lines.forEach(x => {
        bytes += x.length;
        chars += parse(x);
    });

    console.log(bytes, chars, bytes - chars);
    var encoded = lines.map(x => encode(x));

    var encodedlen = encoded.map(x => x.length).reduce((a,c) => a + c);
    console.log(encodedlen, encodedlen - bytes);


});

function encode (str)
{
    var encoded = "\"";
    for (var i = 0; i < str.length; i++) {
       if (str[i] === '\"' || str[i] === '\\'){
           encoded += '\\'; 
       } 

       encoded += str[i];
    }
    encoded += "\"";

    console.log(str, encoded);
    return encoded;
}

function parse (str){

    str = str.substr(1, str.length - 2);
    var escaped = false;
    var c = 0;

    for (var i = 0; i < str.length; i++) {
        if (!escaped && str[i] === '\\') { 
            escaped = true; 
            c++;
            continue;
        }

        if (escaped && str[i] === 'x'){
            i+=2;
            escaped = false;
            continue;
        }

        if (escaped) {
            escaped = false;
            continue;
        } 

        c++;
    }

    return c;
}
