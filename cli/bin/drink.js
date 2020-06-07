#!/usr/bin/env node
require('@babel/register')({
  cwd: __dirname,

  babelrc: false,

  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
  ],

  extensions: ['.ts'],

  cache: false,
});

require('./drink.ts');
