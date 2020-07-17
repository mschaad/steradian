const fs = require('fs');
const path = require('path');

const directory = 'docs';

fs.readdir(directory, { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  for (const dirent of files) {
    let file = dirent.name;
    let filePath = path.join(directory, file);
    if (dirent.isFile()) {
        fs.unlink(filePath, err => {
            if (err) throw err;
          });
    } else if (dirent.isDirectory()) {
        fs.rmdir(
            filePath, 
            {
                recursive: true
            },
            err => {
                if (err) throw err;
            }
        );
    } else {
        throw new Error('unexpected directory entry type');
    }
  }
});