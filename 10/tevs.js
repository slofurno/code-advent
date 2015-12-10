
var input = "1113222113";

for(var i = 0; i < 50; i++){
    var look = input.match(/(\d)(\1)*/g);
   
    var say = look.map(x => x.length + x[0]);
    input = say.reduce((a,c) => a + c);

}

console.log(input.length);
