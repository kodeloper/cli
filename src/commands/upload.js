import FTP from '../helpers/ftp';
require('dotenv').config();

const upload = ( cmd) => {
    const source = cmd.source || process.env.DESTINATION_DIR;
    const dest = cmd.dest || process.env.DESTINATION_DIR;
    console.log('Uploading %s to  %s', source, dest);
    FTP.uploadDir(source, dest);
    FTO.end();
}

export default upload;