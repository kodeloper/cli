'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ftp = require('../helpers/ftp');

var _ftp2 = _interopRequireDefault(_ftp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var upload = function upload(cmd) {
    var source = cmd.source || process.env.DESTINATION_DIR;
    var dest = cmd.dest || process.env.DESTINATION_DIR;
    console.log('Uploading %s to  %s', source, dest);
    _ftp2.default.uploadDir(source, dest);
    FTO.end();
};

exports.default = upload;