import 'babel-polyfill';
import program from 'commander';
import { generateContent, getAllMDFilePath } from './utils';

program
  .option('-f, --force', 'force to init SUMMARY.md')
  .parse(process.argv);

// TODO: init if SUMMARY.md doesn't exsit.
// const { args }: { args: string[]} = program;

const mdFilepaths = getAllMDFilePath();
if (mdFilepaths) {
  generateContent(mdFilepaths, program.force);
}
