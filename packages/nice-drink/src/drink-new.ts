import program from 'commander';
import fs from 'fs';
import {
  logErrorAndExit, formatDate, success,
} from './utils';
import { CURR_PATH } from './constant';
import { getConfig } from './config';

const fsp = fs.promises;

program
  .option('-t --tag', 'tags')
  .parse(process.argv);

const { args }: { args: string[]} = program;

let fileName: string = '';
switch (args.length) {
  case 0: {
    logErrorAndExit('plase enter post name!');
    break;
  }
  case 1: {
    fileName = args[0].toLowerCase();
    break;
  }
  default: {
    fileName = args.map(s => s.toLowerCase()).join('-');
  }
}

const config = getConfig();

function capitalization(str: string): string {
  return str[0].toUpperCase() + str.substring(1);
}
const today = formatDate(new Date());
const postTpl = `
---
title: ${fileName}
excerpt: void
date: ${today}
tags: 
  - void
author: ${config.author}
status: draft
---

# ${fileName.split('-').map(capitalization).join(' ')}

/* content here */
`;

const filePath = `${CURR_PATH}/${today}-${fileName}.md`;

// TODO: if file exist
fsp.writeFile(filePath, postTpl)
  .then(() => {
    success(`Create a new post: ${filePath}`);
  }).catch(err => {
    logErrorAndExit(err);
  });
