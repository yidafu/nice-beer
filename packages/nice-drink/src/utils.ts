import chalk from 'chalk';
import dayjs from 'dayjs';


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
