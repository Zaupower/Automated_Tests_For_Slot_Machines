const lineReader = require('line-reader');

lineReader.eachLine('~/Documents/Logs/GameLog_20210310.txt', function(line) {
    console.log(line);
});

// lineReader.eachLine('path/to/file', function(line) {
//     console.log(line);
//     if (line.includes('STOP') ){
//         return false; // stop reading
//     }
// });

lineReader.open('/path/to/file', function(reader) {
    if (reader.hasNextLine()) {
        reader.nextLine(function(line) {
            console.log(line);
        });
    }
});