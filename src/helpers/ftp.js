const Client = require('ftp');
import FileSystem from './filesystem';
require('dotenv').config();


class FTP {
    constructor() {
        this.client = new Client();
    }
    connect() {
        this.client.connect({
            host: process.env.HOST || '',
            user: process.env.USER || '',
            port: process.env.PORT || 21,
            password: process.env.PASSWORD || '',
        });
    }
    uploadDir(source_dir, destionation_dir) {
        this.connect();
        this.client.on('ready', () => {
            this.client.cwd('destionation_dir',(error,currentDir)=>console.log({error,currentDir}));
            FileSystem.getDirFiles(source_dir).forEach(file => {
                this.client.put(file, file.replace(source_dir,''), function(err) {
                    if (err) throw err;
                    this.end();
                });
            });
        });
    }
    end() {
        return this.client.end;
    }
}

export default FTP;