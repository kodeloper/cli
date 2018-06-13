'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var path = require('path');

var FileSystem = function () {
    function FileSystem() {
        _classCallCheck(this, FileSystem);
    }

    _createClass(FileSystem, null, [{
        key: 'getDirFiles',
        value: function getDirFiles(dir) {
            console.log(dir);
            /*  return fs.readdirSync(dir)
                 .reduce((files, file) =>
                     fs.statSync(path.join(dir, file)).isDirectory() ?
                         files.concat(this.getDirFiles(path.join(dir, file))) :
                         files.concat(path.join(dir, file)),
                 []); */
        }
    }]);

    return FileSystem;
}();

exports.default = FileSystem;