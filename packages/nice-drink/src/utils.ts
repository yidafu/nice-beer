import chalk from 'chalk';
import dayjs from 'dayjs';
import { execSync } from 'child_process';
import debug from 'debug';

const log = debug('nice-drink:utils');

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

export function isRoot(filepath: string) {
  return filepath === '/' || /^[a-zA-Z]:\\$/.test(filepath);
}

export function idNodeEnv(): boolean {
  return false;
}

export function getUpdatedAt(filePath: string): Date {
  const command = `git log --pretty="format:%ci" ${filePath} | head -1`;
  log(`getCreatedAt: ${command}`);
  const dateStr = execSync(`git log --pretty="format:%ci" ${filePath} | head -1`).toString();
  log(`create string: ${dateStr}`);
  return new Date(dateStr);
}


export function getCreatedAt(filePath: string): Date {
  const command = `git log --reverse --pretty="format:%ci" ${filePath} | head -1`;
  log(`getUpdatedAt: ${command}`);
  const dateStr = execSync(command).toString();
  log(`update string: ${dateStr}`);
  return new Date(dateStr);
}
