import chalk from 'chalk';
import dayjs from 'dayjs';
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import yaml from 'js-yaml';
import { FRONT_MATTER_SEPARATOR } from './constant';

// eslint-disable-next-line import/no-cycle
import { MarkdownPost, loadMarkdownFile, IFrontMatter, PostStatus } from './MarkdownPost';
import {
  CURR_PATH, DRINK_YAML, CONTENT_JSON, SUMMARY_MD,
} from './constant';
import { generateMarkdonwContent } from './MarkdonwContent';
import { generateJSONContent } from './JSONContent';


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

export interface IMarkdonwPost extends IFrontMatter {
 content: string;
}

export interface IContentItem extends IFrontMatter {
  filepath: string;
  filename: string;
}

export interface IJSONContent {
  title: string;
  content: IContentItem[];
}

export function hasFrontMatter(content: string) {
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

function isRoot(filepath: string) {
  return filepath === '/' || /^[a-zA-Z]:\\$/.test(filepath);
}

let drinkConfig: IDrinkConfig;
export function getConfig(): IDrinkConfig {
  if (drinkConfig) {
    return drinkConfig;
  }

  const currDir = CURR_PATH;


  function loadDrinkFile(currPath: string) {
    const drinkFilePath = path.resolve(currPath, DRINK_YAML);
    if (fs.existsSync(drinkFilePath)) {
      drinkConfig = yaml.load(fs.readFileSync(drinkFilePath).toString('utf-8'));
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


export function getAllMDFilePath(): string[] | undefined {
  const { directories, configPath } = getConfig();
  if (directories && Array.isArray(directories) && directories.length) {
    const filePaths: string[] = [];
    directories.forEach(dir => {
      const currPath = path.join(CURR_PATH, dir);
      if (fs.existsSync(currPath) && fs.statSync(currPath).isDirectory()) {
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
    `${path.relative(CURR_PATH, configPath)} must have a Array property: 'directories'`,
  );
  return;
}

