'use strict';

var _package = require('../package');

var _filesystem = require('./helpers/filesystem');

var _filesystem2 = _interopRequireDefault(_filesystem);

var _upload = require('./commands/upload');

var _upload2 = _interopRequireDefault(_upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var kodeloper = require('commander');

// commands

// console.log(FileSystem.getDirFiles('/Users/leon/dystrito_angular/'));

kodeloper.version(_package.version, '-v --version');

kodeloper.command('upload').option('-s, --source <dir>', 'source directory').option('-d, --dest <dir>', 'destination directory').description('Upload the given directory content').action(_upload2.default);

kodeloper.parse(process.argv);