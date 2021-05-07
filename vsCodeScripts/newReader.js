
const fs = require('fs');
var foundCombinations = new Array (50);
foundCombinations.fill(-1);
var porceN = new Array ();
var linesArray = fs.readFileSync('/home/marcelocarvalho/Documents/Logs/GameLog_20210310.txt')

var porceN = linesArray.toString().split('\n');
//console.log(linesArray.toString());
for(i =0; i < porceN.length;i++){
    for( i =1; i< 50; i++){
        if(porceN.includes('line '+i+': [')){
            console.log(porceN[i]);
           // console.log(foundCombinations[i])
            //foundCombinations[i] += i ;
            //console.log(line);
        }
    }
    //console.log(porceN[i]);
}