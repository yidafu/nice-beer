import program from 'commander';
import {logErrorAndExit, formatDate, getConfig, success} from './utils'
import { CURR_PATH } from './constant'
import fs from 'fs';

const fsp = fs.promises;

program
  .option('-t --tag', 'tags')
  .parse(process.argv);

const args: string[] = program.args;

let fileName: string;
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

function capitalization(str: string): string{
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
`

const filePath = `${CURR_PATH}/${today}-${fileName}.md`;

// TODO: if file exist
fsp.writeFile(filePath, postTpl)
  .then(value => {
    success('create a new post: ' + filePath);
  }).catch(err => {
    logErrorAndExit(err);
  });
