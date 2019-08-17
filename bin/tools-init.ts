#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const glob = require('glob');
const chalk = require('chalk');
const yaml = require('js-yaml');

const { promises: fsp } = fs;
const warning = chalk.keyword('orange');

program
  .option('-f, --force', 'force to init SUMMARY.md')
  .parse(process.argv);

const { args } = program;

const [type, ...dirs] = args;

function getAllMDFile(mdDirs) {
  const filePaths = [];
  if (!Array.isArray(mdDirs)) {
    return [];
  }
  const CURR_PATH = process.cwd();
  mdDirs.forEach(dir => {
    const currPath = path.join(CURR_PATH, dir);
    if (fse.pathExistsSync(currPath) && fs.statSync(currPath).isDirectory()) {
      Array.prototype.push.apply(
        filePaths,
        glob.sync('**/*.md', {
          cwd: currPath,
          absolute: true,
        }),
      );
    }
  });
  return filePaths;
}

let fullPaths;
if (dirs && dirs.length) {
  fullPaths = getAllMDFile(dirs);
} else {
  fullPaths = getAllMDFile(['posts']);
}


function hasFrontMatter(content) {
  // eslint-disable-next-line
  return !content.trim().indexOf('---'); 
}

function formatDate(str) {
  const date = new Date(str);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
function generateMarkdownFrontmatter(filepath) {
  fsp.readFile(filepath, { encoding: 'utf8' })
    .then(mardownFile => {
      if (hasFrontMatter(mardownFile)) {
        console.log(
          warning(`${path.relative(process.cwd(), filepath)} alreay has frontmatter. It will be ignore!`),
        );
      } else {
        fsp.stat(filepath).then(stats => {
          const { ctime, mtime } = stats;
          const filename = path.parse(filepath).name;
          const frontmatter = {};
          frontmatter.title = filename;
          frontmatter.author = 'dov yih';
          frontmatter.created = formatDate(ctime);
          frontmatter.modified = formatDate(mtime);

          const mardownFileWithFrontMatter = `---\n${yaml.dump(frontmatter)}---\n\n${mardownFile}`;

          fsp.writeFile(filepath, mardownFileWithFrontMatter)
            .catch(err => {
              console.log(err);
            });
        });
      }
    }).catch(err => {
      console.log(err);
    });
}


fullPaths.forEach(filepath => {
  generateMarkdownFrontmatter(filepath);
});
