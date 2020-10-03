import program from 'commander';
import { generateContent } from './ContentGenerator'

program
  .option('-f, --force', 'force to init SUMMARY.md')
  .parse(process.argv);

generateContent(true);
