import chalk from 'chalk';
import dayjs from 'dayjs';
import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';
import glob from 'glob';
import yaml from 'js-yaml';
// eslint-disable-next-line import/no-cycle
import MarkdownPost from './MarkdownPost';
import {
  CURR_PATH, DRINK_YAML, CONTENT_JSON, SUMMARY_MD,
} from './constant';


const fsp = fs.promises;

export enum Mode {
  Gitbook = 'gitbook',
  JSON = 'json',
}

export interface IDrinkConfig {
  type: string;
  title: string;
  author: string;
  directories: string[];
  mode: 'gitbook' | 'json';
  sortBy: 'created' | 'modified';
  configPath: string;
}

export function hasFrontMatter(content) {
  return !content.trim().indexOf('---');
}

export const warning = chalk.keyword('orange');
export const error = chalk.keyword('red');
export const success = chalk.keyword('green');

export function logErrorAndExit(message: string) {
  console.error(error(message));
  process.exit(1);
}

export function formatDate(dataStr: Date) {
  return dayjs(dataStr).format('YYYY-MM-DD');
}

function isRoot(filepath) {
  return filepath === '/' || /^[a-zA-Z]:\\$/.test(filepath);
}

let drinkConfig: IDrinkConfig;
export function getConfig(): IDrinkConfig {
  if (drinkConfig) {
    return drinkConfig;
  }

  const currDir = CURR_PATH;


  function loadDrinkFile(currPath) {
    const drinkFilePath = path.resolve(currPath, DRINK_YAML);
    if (fs.existsSync(drinkFilePath)) {
      drinkConfig = yaml.load(fs.readFileSync(drinkFilePath).toString());
      drinkConfig.configPath = drinkFilePath;
    } else {
      const parentDir = path.resolve(currPath, '..');
      // determine if it is the root directory
      if (!isRoot(parentDir)) {
        loadDrinkFile(parentDir);
      } else {
        logErrorAndExit(`Can't find ${DRINK_YAML}. Place check if ${DRINK_YAML} file exists in your project directory!`);
      }
    }
  }

  loadDrinkFile(currDir);
  return drinkConfig;
}


export function getAllMDFilePath(): string[] {
  const { directories, configPath } = getConfig();
  if (directories && Array.isArray(directories) && directories.length) {
    const filePaths: string[] = [];
    directories.forEach(dir => {
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
    filePaths.forEach(filepath => {
      console.log('will read file: ', filepath);
    });
    return filePaths;
  }
  logErrorAndExit(
    `${path.relative(CURR_PATH, configPath)} must have 'directories' property and be Array!`,
  );
}


export function genSummaryMD(postPromises: Promise<MarkdownPost>[]) {
  const summaryMd = ['# SUMMARY\n'];
  Promise.all(postPromises).then(posts => {
    posts.sort((pre, next) => new Date(next.frontMatter.created).getTime()
        - new Date(pre.frontMatter.created).getTime()).forEach(post => {
      const url = (path.relative(CURR_PATH, post.filePath)).replace('\\', '/');
      summaryMd.push(`* [${post.frontMatter.title}](${url})`);
    });

    return fsp.writeFile(
      path.join(CURR_PATH, SUMMARY_MD),
      summaryMd.join('\n'),
    );
  }).catch(err => {
    console.error(err);
  });
}

export function genContentJSON(postPromises: Promise<MarkdownPost>[]) {
  const config = getConfig();
  const contentJSON = {
    title: config.title,
    content: [],
  };
  Promise.all(postPromises).then((posts: MarkdownPost[]) => {
    posts
      .sort(
        (pre, next) => new Date(next.frontMatter.created).getTime()
                        - new Date(pre.frontMatter.created).getTime(),
      )
      .filter(post => post.frontMatter.status === 'publish').forEach(post => {
        const url = (path.relative(CURR_PATH, post.filePath)).replace('\\', '/');
        const fileName = path.parse(url).name;
        contentJSON.content.push({ ...post.frontMatter, filePath: url, fileName });
      });

    return fse.writeJSON(
      path.join(CURR_PATH, CONTENT_JSON),
      contentJSON,
      { spaces: 2 },
    );
  });
}


/**
 *
 *
 * @export
 * @param {String[]} filePaths
 * @param {Object} {force = false}
 */
export function genContent(filePaths: string[], force: boolean) {
  const { mode } = getConfig();
  const postPromises = filePaths.map(
    // FIXME: async contructor type define
    filepath => new MarkdownPost(filepath, force) as unknown as Promise<MarkdownPost>,
  );
  if (mode.toLowerCase() === Mode.Gitbook) {
    genSummaryMD(postPromises);
  } else if (mode.toLowerCase() === Mode.JSON) {
    genContentJSON(postPromises as unknown as Promise<MarkdownPost>[]);
  }
}
