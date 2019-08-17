#!/usr/bin/env node

/**
 * generate SUMMARY.md file just like gitbook.
 * .gitignore file will works.
 * 
 */
const program = require('commander');

program.version('0.0.1', '-v, --version', 'blog tool kit')
  .command('init [type] [dirs...]', 'init SUMMARY.md')
  .command('update [type] [files...]', 'update SUMMARY.md')
  .parse(process.argv);
