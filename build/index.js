'use strict';

var _package = require('../package');

var _filesystem = require('./helpers/filesystem');

var _filesystem2 = _interopRequireDefault(_filesystem);

var _upload = require('./commands/upload');

var _upload2 = _interopRequireDefault(_upload);

var _jira = require('./commands/jira');

var _jira2 = _interopRequireDefault(_jira);

var _bitbucket = require('./commands/bitbucket');

var _bitbucket2 = _interopRequireDefault(_bitbucket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var kodeloper = require('commander');

var CFonts = require('cfonts');

CFonts.say('Kodeloper', {
  font: 'block', // define the font face
  align: 'center', // define text alignment
  colors: ['blue', 'black'] // define all colors
});

// commands


kodeloper.version(_package.version, '-v --version');

kodeloper.command('upload').option('-s, --source <dir>', 'source directory').option('-d, --dest <dir>', 'destination directory').description('Upload the given directory content').action(_upload2.default);

kodeloper.command('jira').description('Jira info').action(_jira2.default);

kodeloper.command('bitbucket').description('Bitbuckets info').action(_bitbucket2.default);

kodeloper.parse(process.argv);