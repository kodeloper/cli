const fs = require('fs');
const path = require('path');

class FileSystem {
    static getDirFiles(dir) {
        console.log(dir);
       /*  return fs.readdirSync(dir)
            .reduce((files, file) =>
                fs.statSync(path.join(dir, file)).isDirectory() ?
                    files.concat(this.getDirFiles(path.join(dir, file))) :
                    files.concat(path.join(dir, file)),
            []); */
    }
}   

export default FileSystem;