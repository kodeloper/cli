import FTP from '../helpers/ftp';
require('dotenv').config();

const ftpClient = new FTP();
const upload = ( cmd ) => {
    const source = cmd.source || process.env.SOURCE_DIR;
    const dest = cmd.dest || process.env.DESTINATION_DIR;
    console.log('Uploading %s to  %s', source, dest);
    ftpClient.uploadDir(source, dest);
    ftpClient.end();
}

export default upload;