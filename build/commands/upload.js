'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ftp = require('../helpers/ftp');

var _ftp2 = _interopRequireDefault(_ftp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var ftpClient = new _ftp2.default();
var upload = function upload(cmd) {
    console.log(cmd.source);
    var source = cmd.source || process.env.SOURCE_DIR;
    var dest = cmd.dest || process.env.DESTINATION_DIR;
    console.log('Uploading %s to  %s', source, dest);
    /*  ftpClient.uploadDir(source, dest);
     ftpClient.end(); */
};

exports.default = upload;