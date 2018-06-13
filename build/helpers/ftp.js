'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _filesystem = require('./filesystem');

var _filesystem2 = _interopRequireDefault(_filesystem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = require('ftp');

require('dotenv').config();

var FTP = function () {
    function FTP() {
        _classCallCheck(this, FTP);

        this.client = new Client();
    }

    _createClass(FTP, [{
        key: 'connect',
        value: function connect() {
            this.client.connect({
                host: process.env.HOST || '',
                user: process.env.USER || '',
                port: process.env.PORT || 21,
                password: process.env.PASSWORD || ''
            });
        }
    }, {
        key: 'uploadDir',
        value: function uploadDir(source_dir, destionation_dir) {
            var _this = this;

            this.connect();
            this.client.on('ready', function () {
                _this.client.cwd('destionation_dir', function (error, currentDir) {
                    return console.log({ error: error, currentDir: currentDir });
                });
                _filesystem2.default.getDirFiles(source_dir).forEach(function (file) {
                    _this.client.put(file, file.replace(source_dir, ''), function (err) {
                        if (err) throw err;
                        this.end();
                    });
                });
            });
        }
    }, {
        key: 'end',
        value: function end() {
            return this.client.end;
        }
    }]);

    return FTP;
}();

exports.default = FTP;