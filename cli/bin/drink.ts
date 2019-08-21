/**
 * generate SUMMARY.md file just like gitbook.
 * .gitignore file will works.
 *
 */

// TODO: check filename if duplicate or not

import program from 'commander';

program.version('0.0.1', '-v, --version', 'blog tool kit')
  .command('init', 'init SUMMARY.md/content.json')
  .command('new [post name]', 'create a new posts')
  .command('update [type] [files...]', 'update SUMMARY.md/content.json')
  .parse(process.argv);
