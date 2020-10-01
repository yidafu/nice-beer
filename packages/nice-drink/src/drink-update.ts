import 'babel-polyfill';
import program from 'commander';
import { genContent, getAllMDFilePath } from './utils';

program
  .option('-f, --force', 'force to init SUMMARY.md')
  .parse(process.argv);

// TODO: init if SUMMARY.md doesn't exsit.
// const { args }: { args: string[]} = program;

const mdFilepaths = getAllMDFilePath();
if (mdFilepaths) {
  genContent(mdFilepaths, program.force);
}
