import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import {
  CURR_PATH, DRINK_YAML,
} from './constant';
import { logErrorAndExit, isRoot } from './utils';

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
