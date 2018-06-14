const kodeloper = require('commander');
import { version } from '../package';
import FileSystem from './helpers/filesystem';
const CFonts = require('cfonts');
 
CFonts.say('Kodeloper', {
    font: 'block',              // define the font face
    align: 'center',              // define text alignment
    colors: ['blue','black'],         // define all colors
});

// commands
import upload from './commands/upload';
import jira from './commands/jira';
import bitbucket from './commands/bitbucket';

kodeloper
  .version(version, '-v --version');

kodeloper
  .command('upload')
  .option('-s, --source <dir>', 'source directory')
  .option('-d, --dest <dir>', 'destination directory')
  .description('Upload the given directory content')
  .action(upload);

kodeloper
  .command('jira')
  .description('Jira info')
  .action(jira);

kodeloper
  .command('bitbucket')
  .description('Bitbuckets info')
  .action(bitbucket);
  
kodeloper.parse(process.argv);
 