const kodeloper = require('commander');
import { version } from '../package';
import FileSystem from './helpers/filesystem';

// commands
import upload from './commands/upload';
// console.log(FileSystem.getDirFiles('/Users/leon/dystrito_angular/'));

kodeloper
  .version(version, '-v --version');

kodeloper
  .command('upload')
  .option('-s, --source <dir>', 'source directory')
  .option('-d, --dest <dir>', 'destination directory')
  .description('Upload the given directory content')
  .action(upload);

kodeloper.parse(process.argv);
 