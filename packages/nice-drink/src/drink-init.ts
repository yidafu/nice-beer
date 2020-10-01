import program from 'commander';
import { genContent, getAllMDFilePath } from './utils';

program
  .option('-f, --force', 'force to init SUMMARY.md')
  .parse(process.argv);

// TODO: init if SUMMARY.md doesn't exsit.
const mdFilepaths = getAllMDFilePath();
if (mdFilepaths) {
  genContent(mdFilepaths);
}
