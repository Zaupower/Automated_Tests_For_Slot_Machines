const fs = require('fs');
const Path = require('path');

function processFile(path) {
  console.log(path);
}

function buildTree(startPath) {
  fs.readdir(startPath, (err, entries) => {
    entries.forEach((file) => {
      const path = Path.join(startPath, file);

      if (fs.lstatSync(path).isDirectory()) {
          console.log("path: "+path);
        buildTree(path);
      } else if (file.match(/\.php$/)) {
        processFile(path);
      }
    });
  });
}
buildTree("/home/marcelocarvalho/Desktop");
