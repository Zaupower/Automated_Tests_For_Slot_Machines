import { exec } from 'child_process';

/**
 * Execute simple shell command (async wrapper).
 * @param {String} cmd
 * @return {Object} { stdout: String, stderr: String }
 */

async function sh(cmd) {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function main() {
  let { stdout } = await sh('ssh machine@172.21.28.106');
 // for (let line of stdout.split('\n')) {
    //writeToFile(line);
    let line = stdout.split('\n');
    console.log(line);
    if(stdout == "machine@172.21.28.106's password: "){
    console.log("Valido");
    }else{
      console.log("error")
    }
//  }

}

// function writeToFile(in) {
//     var fs = require('fs');
//     var stream = fs.createWriteStream("my_file.txt");
//     stream.once('open', function (fd) {
//         stream.write(in);
//         stream.end();
//     });
// }


main();


