const readline = require('readline');
const fs = require('fs');
var countStart = 0;
var foundCombinations = new Array (50);
foundCombinations.fill(-1);

function readOcurrencies(){
    const readInterface = readline.createInterface({
        input: fs.createReadStream('/home/marcelocarvalho/Documents/Logs/GameLog_20210310.txt'),
        //output: process.stdout,
        console: false
    });
    
    readInterface.on('line', function(line) {
        for( i =1; i< 50; i++){
            if(line.includes('line '+i+': [')){
               // console.log(foundCombinations[i])
                foundCombinations[i] += i ;
                console.log(i);
            }
        }
    });
}

readOcurrencies();




















// const lineReader = require('line-reader');

// lineReader.open("/home/marcelocarvalho/Documents/Logs/GameLog_20210310.txt", function(reader) {
//     if (reader.hasNextLine()) {
//         reader.nextLine(function(line) {
//             console.log(line);
//         });
//     }
// });