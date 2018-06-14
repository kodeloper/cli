const kodeloper = require('commander');
import { version } from '../package';
import FileSystem from './helpers/filesystem';
const CFonts = require('cfonts');
const chalk = require('chalk');

CFonts.say('Kodeloper', {
    font: 'block',              // define the font face
    align: 'center',              // define text alignment
    colors: ['blue','black'],         // define all colors
});

// commands
import upload from './commands/upload';
import JiraCommand from './commands/jira';
import BitbucketCommand from './commands/bitbucket';

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
  .action((cmd) => {
    console.log(chalk.blue('Jira command'));
    const jira = new JiraCommand(cmd);
    jira.start();
  });

kodeloper
  .command('bitbucket')
  .description('Bitbuckets info')
  .action((cmd) => {
    console.log(chalk.blue('Bitbucket command'));
    const bitbucket = new BitbucketCommand(cmd);
    bitbucket.start();
  });

kodeloper.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', kodeloper.args.join(' '));
  process.exit(0);
});

kodeloper.parse(process.argv);
 